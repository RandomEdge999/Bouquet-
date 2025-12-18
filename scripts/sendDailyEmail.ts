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
    const env = EnvSchema.parse(process.env);

    // 2. Time Check
    // We want to send at 8 AM America/Chicago.
    // The workflow runs at 13:05 and 14:05 UTC.
    const now = DateTime.now().setZone('America/Chicago');
    console.log(`Current Chicago time: ${now.toString()}`);

    if (now.hour !== 8) {
        console.log(`It is not 8 AM in Chicago (it's ${now.hour}). Skipping.`);
        // Exit success so workflow doesn't fail
        process.exit(0);
    }

    // 3. Generate Content
    const seed = getTodaySeed();
    console.log(`Generating for seed: ${seed}`);

    const bouquet = generateBouquet(seed);
    const message = generateMessage(seed);

    // 4. Render SVG to PNG
    console.log('Rendering SVG...');
    // Resvg needs specific width/height or uses viewBox
    // Our SVG has width="100%" height="100%" and viewBox="0 0 500 800".
    // We need to set explicit dimensions for the renderer usually.

    // Strip the width="100%" height="100%" attributes to let Resvg use viewBox defaults or override
    let svgForRender = bouquet.svg.replace('width="100%"', '').replace('height="100%"', '');

    // Actually Resvg works best if we specify width
    const opts = {
        fitTo: { mode: 'width' as const, value: 800 }, // High res
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

    const htmlContent = `
    <div style="font-family: serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background: #fdfbf7;">
      <h1 style="text-align: center; font-size: 24px; color: ${bouquet.palette.flowerColors[0]};">
        ${message.subject}
      </h1>
      
      <div style="text-align: center; margin: 20px 0;">
        <img src="cid:bouquet-daily" alt="Your Bouquet" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
      </div>
      
      <div style="background: white; padding: 24px; border: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 18px; line-height: 1.6; white-space: pre-line;">
          ${message.text}
        </p>
        <p style="text-align: right; font-style: italic; margin-top: 16px;">
          — ${message.signature}
        </p>
      </div>
      
      <p style="text-align: center; font-size: 12px; color: #999; font-family: sans-serif;">
        <a href="${env.SITE_URL}?seed=${seed}" style="color: #666;">View purely in browser</a>
      </p>
    </div>
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
                cid: 'bouquet-daily', // same cid value as in the html img src
            },
        ],
    });

    console.log(`Email sent: ${info.messageId}`);
};

main().catch(err => {
    console.error(err);
    process.exit(1);
});
