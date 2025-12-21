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
  }

  // 3. Generate Content
  const seed = DateTime.now().toMillis().toString();
  console.log(`Generating for seed: ${seed}`);

  const bouquet = generateBouquet(seed);
  const message = generateMessage(seed);

  // 4. Render SVG to PNG - MASSIVE CANVAS FIX
  console.log('Rendering SVG...');

  let svgString = bouquet.svg;

  // CRITICAL FIX: The user reported petals getting cut off by margins.
  // We will dramatically expand the viewBox to create a "tall" canvas canvas.
  // Original Bouquet Width: 600, Vase Y: 480
  // We set a HUGE viewBox to capture everything + padding.
  // x=-50, y=-200 (top headroom), w=700, h=1000

  svgString = svgString.replace(/viewBox="[^"]*"/, 'viewBox="-50 -150 700 1000"');

  // Remove fixed dimensions to allow Resvg to scale using fitTo
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

  // --- THE PERFECT "APPLE LIQUID GLASS" EMAIL TEMPLATE ---
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="color-scheme" content="light"/>
      <title>${message.subject}</title>
      <style>
        /* Reset */
        body, table, td, div, p, a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          margin: 0; padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #1d1d1f;
        }
        
        body { 
          width: 100% !important; 
          height: 100% !important; 
          background-color: #F5F5F7; /* Apple System Gray */
        }
        
        /* Main Wrapper */
        .wrapper {
          width: 100%;
          background-color: #F5F5F7;
          padding: 60px 0;
        }

        /* Glass Card Container */
        .glass-card {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background: #FFFFFF;
          border-radius: 32px; /* Smooth Apple-like corners */
          box-shadow: 0 20px 40px rgba(0,0,0,0.08); /* Soft diffuse shadow */
          overflow: hidden;
        }

        /* Hero Image - Full Bleed, No Margins */
        .hero-image-container {
          width: 100%;
          background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
          text-align: center;
          padding-top: 20px;
          padding-bottom: 0px; /* Removed padding below to remove "gap" */
          line-height: 0; /* Fixes potential image font-size gap */
        }
        
        .hero-img {
          width: 100%;
          height: auto;
          display: block;
          max-width: 600px; /* Constrain max width but allow full bleed */
          margin: 0 auto;
        }

        /* Content Area */
        .content {
          padding: 40px 48px 60px 48px;
          text-align: center; /* Centered elegance */
        }

        /* Typography */
        .date {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #86868b; /* Apple Label Gray */
          margin-bottom: 12px;
          line-height: normal;
        }
        
        .title {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 42px; /* Large, bold, editorial */
          font-weight: 700;
          color: #1d1d1f;
          line-height: 1.1;
          margin-bottom: 32px;
        }
        
        .message {
          font-size: 20px;
          line-height: 1.6;
          color: #1d1d1f;
          font-weight: 400;
          white-space: pre-line;
          margin-bottom: 40px;
          text-align: left; /* Message aligned left for readability */
        }
        
        .signature {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 26px;
          font-style: italic;
          color: #1d1d1f;
          margin-top: 10px;
          text-align: left;
        }

        /* Glass Button */
        .btn-wrapper {
          margin-top: 50px;
          text-align: center;
        }
        
        .glass-btn {
          display: inline-block;
          background-color: #007AFF;
          color: #FFFFFF !important;
          text-decoration: none;
          font-size: 16px;
          font-weight: 600;
          padding: 16px 36px;
          border-radius: 99px;
          box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
        }

        /* Footer */
        .footer {
          text-align: center;
          padding-top: 40px;
          color: #86868b;
          font-size: 12px;
          line-height: 1.5;
        }
        
        .footer a {
          color: #86868b;
          text-decoration: none;
        }

        @media only screen and (max-width: 600px) {
           .content { padding: 32px 24px 48px 24px; }
           .title { font-size: 34px; }
           .glass-card { border-radius: 0; }
        }
      </style>
      
      <!-- Fonts -->
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="wrapper">
        <div class="glass-card">
          
          <!-- Image First for Impact -->
          <div class="hero-image-container">
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
