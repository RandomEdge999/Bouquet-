import 'dotenv/config';
import { DateTime } from 'luxon';
import nodemailer from 'nodemailer';
import { Resvg } from '@resvg/resvg-js';
import { z } from 'zod';
import { generateBouquet } from '../src/lib/bouquet/index'; // Import directly from src
import { generateMessage } from '../src/lib/message/index';
import { getTodaySeed } from '../src/lib/seed';

// Environment Schema
const EnvSchema = z.object({
  SMTP_USER: z.string().email(),
  SMTP_APP_PASSWORD: z.string(),
  TO_EMAIL: z.string().email(),
  FROM_NAME: z.string().default('Bouquet Bot'),
  SITE_URL: z.string().url(),
});

const main = async () => {
  console.log('Starting daily email check...');

  // 1. Env Validation
  // 1. Env Validation
  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    console.error('\n❌ CONFIGURATION ERROR: Missing required secret(s) or variable(s).');
    console.error('The "Daily Love Email" workflow failed because it needs the following GitHub Secrets/Variables:\n');

    const formatName = (path: any[]) => path.join('.');

    result.error.issues.forEach(issue => {
      console.error(`  - ${formatName(issue.path)}: ${issue.message}`);
    });

    console.error('\n👉 FIX THIS: Go to GitHub Repo > Settings > Secrets and variables > Actions');
    console.error('   and add the missing keys listed above.\n');

    // Exit with 1 to mark failure, OR 0 if you want to suppress the "Action Failed" badge (but 1 is better for visibility)
    process.exit(1);
  }

  const env = result.data;

  // 2. Time Check
  // We want to send at 8 AM America/Chicago.
  // The workflow runs at 13:05 and 14:05 UTC.
  const now = DateTime.now().setZone('America/Chicago');
  console.log(`Current Chicago time: ${now.toString()}`);

  // Allow bypassing time check for testing
  const force = process.argv.includes('--force');

  if (!force && now.hour !== 8) {
    console.log(`It is not 8 AM in Chicago (it's ${now.hour}). Skipping.`);
    console.log('💡 TIP: Run with --force to test immediately: npx tsx scripts/sendDailyEmail.ts --force');
    // Exit success so workflow doesn't fail
    process.exit(0);
  }

  // 3. Generate Content
  // Change: Use Timestamp based seed for uniqueness per run
  const seed = DateTime.now().toMillis().toString();
  console.log(`Generating for seed: ${seed} (Unique per run)`);

  const bouquet = generateBouquet(seed);
  const message = generateMessage(seed);

  // 4. Render SVG to PNG
  console.log('Rendering SVG...');
  let svgForRender = bouquet.svg.replace('width="100%"', '').replace('height="100%"', '');
  const opts = {
    fitTo: { mode: 'width' as const, value: 800 },
    background: bouquet.palette.backgroundColor,
  };

  const resvg = new Resvg(svgForRender, opts);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  // 5. Build Email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_APP_PASSWORD,
    },
  });

  // Golden Luxury HTML Template
  const dateStr = DateTime.now().setZone('America/Chicago').toFormat('MMMM d, yyyy');
  const accentColor = bouquet.palette.flowerColors[0];

  // Choose a text color that matches the bouquet vibe but stays readable
  const textColor = "#57534e";
  const goldColor = "#d4af37";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Lato:wght@300;400&display=swap');
            body { margin: 0; padding: 0; background-color: #f4f1ea; font-family: 'Lato', 'Helvetica', sans-serif; -webkit-font-smoothing: antialiased; }
            .wrapper { width: 100%; table-layout: fixed; background-color: #f4f1ea; padding-bottom: 40px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 20px 50px rgba(0,0,0,0.08); border-radius: 4px; overflow: hidden; position: relative; }
            
            /* Golden Frame Effect */
            .gold-frame { border: 8px solid #ffffff; outline: 1px solid #eaddcf; margin: 10px; }
            .inner-content { padding: 40px 30px; border: 1px solid ${goldColor}; margin: 5px; position: relative; }
            
            /* Typography */
            .date { font-family: 'Playfair Display', Georgia, serif; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #a8a29e; text-align: center; margin-bottom: 15px; }
            .main-title { font-family: 'Playfair Display', Georgia, serif; font-size: 34px; line-height: 1.1; color: ${accentColor}; text-align: center; margin: 0 0 30px 0; font-weight: 700; }
            
            /* Polaroid Image Frame */
            .image-frame { background-color: #ffffff; padding: 15px 15px 40px 15px; box-shadow: 0 8px 20px rgba(0,0,0,0.12); transform: rotate(-1deg); margin: 20px auto 40px; max-width: 90%; width: 100%; border: 1px solid #eee; }
            .bouquet-img { width: 100%; display: block; }
            
            /* Decorative */
            .divider { width: 40px; height: 2px; background-color: ${goldColor}; margin: 30px auto; opacity: 0.6; }
            .quote { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-size: 16px; color: #888; text-align: center; margin-bottom: 40px; }
            
            /* Message Body */
            .message-body { font-family: 'Playfair Display', Georgia, serif; font-size: 19px; line-height: 1.8; color: ${textColor}; padding: 0 10px; text-align: center; white-space: pre-line; }
            
            /* Signature */
            .signature { font-family: 'Great Vibes', 'Brush Script MT', cursive; font-size: 32px; color: ${accentColor}; text-align: right; margin-top: 40px; padding-right: 20px; }
            
            /* Footer */
            .footer { background-color: #f4f1ea; padding: 30px; text-align: center; font-size: 11px; color: #9ca3af; letter-spacing: 1px; text-transform: uppercase; }
            .btn { text-decoration: none; color: ${goldColor}; border-bottom: 1px solid ${goldColor}; padding-bottom: 2px; transition: opacity 0.3s; }
            .btn:hover { opacity: 0.7; }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div style="height: 30px;"></div>
            <div class="container">
                <div class="gold-frame">
                    <div class="inner-content">
                        <!-- Header -->
                        <div class="date">${dateStr}</div>
                        <h1 class="main-title">${message.subject}</h1>
                        
                        <!-- Image -->
                        <div class="image-frame">
                            <img src="cid:bouquet-daily" alt="Bouquet" class="bouquet-img" />
                        </div>
                        
                        <!-- Divider -->
                        <div class="divider"></div>
                        
                        <!-- Message -->
                        <div class="message-body">
                            ${message.text}
                        </div>
                        
                        <!-- Signature -->
                        <div class="signature">
                            - ${message.signature}
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Minimal Footer -->
            <div class="footer">
                Made with ❤️ for Venooo • <a href="${env.SITE_URL}?seed=${seed}" class="btn">View in Browser</a>
            </div>
        </div>
    </body>
    </html>
    `;

  console.log('Sending email...');
  const info = await transporter.sendMail({
    from: `"${env.FROM_NAME}" <${env.SMTP_USER}>`,
    to: env.TO_EMAIL,
    subject: message.subject,
    html: htmlContent,
    attachments: [
      {
        filename: `bouquet-${seed}.png`,
        content: pngBuffer,
        cid: 'bouquet-daily',
      },
    ],
  });

  console.log(`Email sent: ${info.messageId}`);
};

main().catch(err => {
  console.error(err);
  process.exit(1);
});
