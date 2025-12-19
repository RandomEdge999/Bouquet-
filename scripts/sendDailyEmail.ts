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
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:ital,wght@1,600&display=swap');
            
            body { 
                margin: 0; 
                padding: 0; 
                background-color: #f2f2f7; /* iOS System Gray 6 */
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                -webkit-font-smoothing: antialiased;
                color: #1c1c1e;
            }
            
            .wrapper { 
                width: 100%; 
                background-color: #f2f2f7; 
                padding: 40px 0; 
            }
            
            .card { 
                max-width: 600px; 
                margin: 0 auto; 
                background-color: #ffffff; 
                border-radius: 28px; 
                overflow: hidden; 
                box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            }

            /* Header Section simulating Glass header */
            .header {
                padding: 40px 40px 20px;
                text-align: center;
                background: linear-gradient(180deg, #ffffff 0%, #f8f8fa 100%);
                border-bottom: 1px solid rgba(0,0,0,0.05);
            }

            .date {
                font-size: 13px;
                letter-spacing: 0.5px;
                text-transform: uppercase;
                color: #8e8e93; /* iOS Label Gray */
                font-weight: 600;
                margin-bottom: 10px;
            }

            .subject {
                font-family: 'Playfair Display', serif;
                font-style: italic;
                font-size: 32px;
                font-weight: 600;
                color: #1c1c1e;
                margin: 0;
                line-height: 1.2;
            }

            /* Image Section */
            .image-container {
                background-color: #ffffff;
                padding: 20px;
                text-align: center;
            }

            .bouquet-img {
                width: 100%;
                max-width: 500px;
                height: auto;
                border-radius: 16px;
                box-shadow: 0 8px 24px rgba(0,0,0,0.06);
            }

            /* Message Section */
            .message-container {
                padding: 10px 40px 50px;
                text-align: left;
                background-color: #ffffff;
            }

            .message-text {
                font-size: 17px;
                line-height: 1.6;
                color: #3a3a3c;
                white-space: pre-line;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            }

            .signature-block {
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #f2f2f7;
            }

            .signature-text {
                font-family: 'Playfair Display', serif;
                font-style: italic;
                font-size: 24px;
                color: #1c1c1e;
            }

            /* iOS Button Style */
            .action-btn {
                display: inline-block;
                background-color: #007aff;
                color: #ffffff !important;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 99px;
                font-size: 15px;
                font-weight: 600;
                margin-top: 20px;
            }

            /* Footer */
            .footer {
                text-align: center;
                padding: 30px;
                font-size: 12px;
                color: #aeaeb2;
            }
            
            .footer a {
                color: #aeaeb2;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="wrapper">
            <div class="card">
                <!-- Header -->
                <div class="header">
                    <div class="date">${dateStr}</div>
                    <h1 class="subject">${message.subject}</h1>
                </div>

                <!-- Main Image -->
                <div class="image-container">
                    <img src="cid:bouquet-daily" alt="Daily Bouquet" class="bouquet-img" />
                </div>

                <!-- Content -->
                <div class="message-container">
                    <div class="message-text">
                        ${message.text}
                    </div>

                    <div class="signature-block">
                        <div class="signature-text">${message.signature} ❤️</div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${env.SITE_URL}?seed=${seed}" class="action-btn">View in App</a>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="footer">
                Sent via Venooo (Aleem's Edition) <br/>
                <a href="${env.SITE_URL}">Unsubscribe</a>
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
