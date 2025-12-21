import 'dotenv/config';
import { DateTime } from 'luxon';
import nodemailer from 'nodemailer';
import { Resvg } from '@resvg/resvg-js';
import { z } from 'zod';
import { generateBouquet } from '../src/lib/bouquet/index';
import { generateMessage } from '../src/lib/message/index';

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
  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    console.error('\n❌ CONFIGURATION ERROR: Missing required secets.');
    process.exit(1);
  }

  const env = result.data;

  // 2. Time Check
  const now = DateTime.now().setZone('America/Chicago');
  console.log(`Current Chicago time: ${now.toString()}`);
  const force = process.argv.includes('--force');

  // Attempt to send if hour is 8 OR if forced.
  if (!force && now.hour !== 8) {
    console.log(`Skipping: It is not 8 AM in Chicago (It is ${now.hour}).`);
    // process.exit(0);
  }

  // 3. Generate Content
  const seed = DateTime.now().toMillis().toString();
  console.log(`Generating for seed: ${seed}`);

  const bouquet = generateBouquet(seed);
  const message = generateMessage(seed);

  // 4. Render SVG to PNG - SMART CROP STRATEGY
  console.log('Rendering SVG...');

  let svgString = bouquet.svg;

  // SMART CROP: Tighter bounds to remove excess padding
  // Vase Y: 480. Vase Bottom: ~720 (height ~240).
  // Flowers Top: ~0-50.
  // Width: 600.
  // New ViewBox: x=-50 (buffer), y=-50 (top buffer), w=700 (width+buffer), h=800 (tight fit to vase bottom + shadow)

  svgString = svgString.replace(/viewBox="[^"]*"/, 'viewBox="-50 -50 700 850"');

  // Remove fixed dimensions
  svgString = svgString.replace('width="100%"', '').replace('height="100%"', '');

  // Force overflow visible
  svgString = svgString.replace('<svg', '<svg overflow="visible"');

  const opts = {
    fitTo: { mode: 'width' as const, value: 1200 }, // Ultra-HD Retina width
    background: 'rgba(255, 255, 255, 0)', // Transparent bg
  };

  const resvg = new Resvg(svgString, opts);
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

  const dateStr = DateTime.now().setZone('America/Chicago').toFormat('EEEE, MMMM d');

  // --- THE APPROVED "APPLE GLASS" DESIGN ---
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="color-scheme" content="light"/>
      <title>${message.subject}</title>
      <style>
        /* Modern Reset */
        body, table, td, div, p, a {
          margin: 0; padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1d1d1f;
          -webkit-font-smoothing: antialiased;
        }
        
        body { 
          width: 100% !important; 
          height: 100% !important; 
          background-color: #F5F5F7; /* Apple System Gray Surface */
        }
        
        .wrapper {
          width: 100%;
          background-color: #F5F5F7;
          padding: 40px 0 60px;
        }

        /* The Glass Card */
        .glass-card {
            width: 90%;
            max-width: 600px;
            margin: 0 auto;
            background: #FFFFFF;
            border-radius: 32px; /* iOS Standard Corner Radius */
            box-shadow: 0 12px 36px rgba(0,0,0,0.06); /* Soft diffuse shadow */
            overflow: hidden;
            display: block;
        }

        /* Hero Image Container - ZERO GAP */
        .hero {
            width: 100%;
            background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
            margin: 0;
            padding: 0;
            line-height: 0; /* Prevents inline-block spacing gaps */
        }
        
        .hero-img {
            width: 100%;
            height: auto;
            display: block;
        }

        /* Content Area */
        .content {
            padding: 48px 40px 56px;
            text-align: center;
        }

        /* Typography */
        .date {
            font-size: 13px;
            font-weight: 600;
            color: #86868b;
            text-transform: uppercase;
            letter-spacing: 0.8px;
            margin-bottom: 16px;
        }
        
        .title {
            font-family: "Playfair Display", Georgia, serif;
            font-size: 38px;
            font-weight: 700;
            line-height: 1.15;
            color: #1d1d1f;
            margin-bottom: 24px;
        }
        
        .message {
            font-size: 18px;
            line-height: 1.6;
            color: #1d1d1f;
            margin-bottom: 32px;
            text-align: left; /* Better readability */
        }
        
        .signature {
            font-family: "Playfair Display", Georgia, serif;
            font-size: 24px;
            font-style: italic;
            color: #1d1d1f;
            text-align: left;
            margin-top: 8px;
        }

        /* Button */
        .btn-wrapper {
            margin-top: 48px;
        }
        
        .glass-btn {
            display: inline-block;
            background-color: #007AFF; /* Apple Blue */
            color: #FFFFFF !important;
            text-decoration: none;
            font-size: 16px;
            font-weight: 600;
            padding: 14px 32px;
            border-radius: 99px;
            transition: opacity 0.2s;
        }

        .footer {
            margin-top: 40px;
            text-align: center;
            color: #86868b;
            font-size: 12px;
        }
        .footer a { color: #86868b; }

        @media only screen and (max-width: 600px) {
            .glass-card { width: 100%; border-radius: 0; max-width: 100%; }
            .content { padding: 40px 24px 48px; }
            .title { font-size: 32px; }
        }
      </style>
      
      <!-- Fonts -->
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="wrapper">
        <div class="glass-card">
          
          <!-- Full Bleed Hero -->
          <div class="hero">
             <img src="cid:bouquet-daily" alt="Daily Bouquet" class="hero-img"/>
          </div>

          <div class="content">
            <div class="date">${dateStr}</div>
            <h1 class="title">${message.subject}</h1>
            
            <div class="message">
              ${message.text}
            </div>
            
            <div class="signature">
              ${message.signature} ❤️
            </div>

            <div class="btn-wrapper">
              <a href="${env.SITE_URL}?seed=${seed}" class="glass-btn">View Full Experience</a>
            </div>
          </div>
          
        </div>
        
        <div class="footer">
          <p>Sent with love via Venooo</p>
          <p><a href="${env.SITE_URL}">Unsubscribe</a></p>
        </div>
      </div>
    </body>
    </html>
    `;

  console.log('Sending email...');
  const info = await transporter.sendMail({
    from: `"${env.FROM_NAME}" <${env.SMTP_USER}>`,
    to: env.TO_EMAIL,
    subject: `🌸 ${message.subject}`,
    text: message.text,
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
