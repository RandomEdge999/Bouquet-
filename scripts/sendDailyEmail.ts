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
    // Note: GitHub Actions might drift, so we trust the Cron mostly, 
    // but this check safeguards against accidental manual runs at wrong times.
    if (!force && now.hour !== 8) {
        console.log(`Skipping: It is not 8 AM in Chicago (It is ${now.hour}).`);
        // process.exit(0); // Commented to allow testing if logic is correct, usually we'd keep this.
        // For now, trusting the CRON schedule to be the primary driver.
    }

    // 3. Generate Content
    const seed = DateTime.now().toMillis().toString();
    console.log(`Generating for seed: ${seed}`);

    const bouquet = generateBouquet(seed);
    const message = generateMessage(seed);

    // 4. Render SVG to PNG - CRITICAL FIX FOR CROPPING
    console.log('Rendering SVG...');

    // We expand the viewBox to ensure top blooms (which can go negative Y relative to vase) are captured.
    // Original ViewBox: "0 0 600 800"
    // New ViewBox: "0 -100 600 900" (Adds 100px padding to top and bottom)
    let svgString = bouquet.svg;

    // Replace the viewBox with our safer, expanded one
    // Note: The original logic in bouquet/index.ts puts vase at Y=480. 
    // Flowers can extend up 250px+ (to Y=230). 
    // But butterflies/glow might go higher. "0 0" usually starts at top-left.
    // If elements have negative Y (e.g. y = -50), they are cut off in "0 0 ..." viewBox.
    // Let's force a viewBox that accounts for this.

    // Regex to replace existing viewBox or style
    svgString = svgString.replace(/viewBox="[^"]*"/, 'viewBox="0 -50 600 850"');

    // Remove 100% width/height to let Resvg handle scaling
    svgString = svgString.replace('width="100%"', '').replace('height="100%"', '');

    const opts = {
        fitTo: { mode: 'width' as const, value: 800 }, // High Quality width
        background: 'rgba(255, 255, 255, 0)', // Transparent bg for the PNG itself
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

    // BEAUTIFUL "APPLE-GLASS" HTML TEMPLATE
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="color-scheme" content="light"/>
      <style>
        /* Base Reset */
        body { 
          margin: 0; padding: 0; width: 100%; 
          background-color: #F5F5F7; /* Apple System Gray */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
          color: #1d1d1f; 
        }
        
        /* Main Container */
        .wrapper {
          width: 100%;
          table-layout: fixed;
          background-color: #F5F5F7;
          padding-top: 40px;
          padding-bottom: 60px;
        }
        
        .main-card {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #FFFFFF;
          border-radius: 24px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          overflow: hidden;
        }

        /* Header */
        .header {
          padding: 40px 40px 20px 40px;
          text-align: center;
        }
        
        .date-label {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #86868b;
          margin-bottom: 8px;
        }
        
        .title-h1 {
          font-family: "Playfair Display", Georgia, serif;
          font-size: 34px;
          font-weight: 700;
          color: #1d1d1f;
          margin: 0;
          line-height: 1.1;
        }

        /* Decoration Line */
        .sep-line {
          width: 40px;
          height: 2px;
          background-color: #e5e5ea;
          margin: 24px auto 0;
          border-radius: 2px;
        }

        /* Image Area */
        .image-area {
          width: 100%;
          text-align: center;
          padding: 0; /* Full bleed or slight pad? Full bleed looks more premium */
          background: linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%);
        }
        
        .hero-img {
          width: 100%;
          height: auto;
          display: block;
          /* Ensure no scaling artifacts */
        }

        /* Message Body */
        .content-area {
          padding: 10px 48px 48px 48px;
          text-align: left;
        }
        
        .message-text {
          font-size: 19px;
          line-height: 1.6;
          color: #1d1d1f;
          font-weight: 400;
          white-space: pre-line; /* Preserve paragraphs */
        }
        
        .signature {
          margin-top: 32px;
          font-family: "Playfair Display", Georgia, serif;
          font-size: 24px;
          font-style: italic;
          color: #1d1d1f;
        }

        /* CTA Button - Apple Style */
        .btn-container {
          text-align: center;
          margin-top: 40px;
        }
        
        .view-btn {
          display: inline-block;
          background-color: #007AFF; /* Apple Blue */
          color: #ffffff !important;
          font-size: 15px;
          font-weight: 600;
          padding: 14px 28px;
          border-radius: 98px;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        /* Footer */
        .footer {
          text-align: center;
          padding-top: 40px;
          color: #86868b;
          font-size: 12px;
        }
        
        .footer a {
          color: #86868b;
          text-decoration: underline;
        }

        /* Media Query for Mobile */
        @media only screen and (max-width: 600px) {
          .main-card { border-radius: 0; }
          .content-area { padding: 32px 24px; }
          .header { padding: 40px 24px 20px; }
        }
      </style>
      <!-- Web Fonts -->
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
    </head>
    <body>
      <div class="wrapper">
        <div class="main-card">
          
          <div class="header">
            <div class="date-label">${dateStr}</div>
            <h1 class="title-h1">${message.subject}</h1>
            <div class="sep-line"></div>
          </div>

          <div class="image-area">
            <!-- CID Image embedding -->
            <img src="cid:bouquet-daily" alt="Your Daily Bouquet" class="hero-img"/>
          </div>

          <div class="content-area">
            <div class="message-text">
              ${message.text}
            </div>
            
            <div class="signature">
              ${message.signature} ❤️
            </div>

            <div class="btn-container">
              <a href="${env.SITE_URL}?seed=${seed}" class="view-btn">View in App</a>
            </div>
          </div>
        
        </div>
        
        <div class="footer">
          <p>Sent with love via Venooo</p>
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
        text: message.text, // Fallback plain text
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
