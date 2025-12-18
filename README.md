# Venooo - Procedural Bouquet & Daily Love

A premium, modern web experience that generates unique bouquets and sincere message cards.
Includes an automated daily email service that sends a fresh bouquet every morning at 8:00 AM.

## Features

- **Procedural Generation**: Unique flowers, colors, and arrangements every time.
- **Message Cards**: Sincere, non-repetitive messages generated from curated banks.
- **Modern UI**: Clean typography, Framer Motion animations, and responsive design.
- **Daily Email**: Automated via GitHub Actions + Gmail SMTP.

## Tech Stack

- **Frontend**: Vite, React, TypeScript, Tailwind CSS
- **Drawing**: SVG (Procedural generation using pure math/logic)
- **Backend (Script)**: Node.js, Nodemailer, @resvg/resvg-js
- **Automation**: GitHub Actions

## Setup & Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## GitHub Pages Deployment

This project includes a workflow to deploy to GitHub Pages automatically on push to `main`.

1. Go to repository **Settings** > **Pages**.
2. Set "Source" to **GitHub Actions**.
3. Push changes to `main`. The `Deploy to GitHub Pages` workflow will run.

**Note**: The base path is configured as `/Bouquet-/` in `vite.config.ts`. If your repository name is different, update this value.

## Daily Email Configuration

To enable the daily email at 8:00 AM (America/Chicago):

1. **Gmail Setup**:
   - Enable 2FA on your Google Account.
   - Generate an **App Password** (Search "App Passwords" in Google Account).

2. **GitHub Secrets**:
   Go to **Settings** > **Secrets and variables** > **Actions** and add:
   - `SMTP_USER`: Your Gmail address.
   - `SMTP_APP_PASSWORD`: The App Password you generated.
   - `TO_EMAIL`: The recipient's email address.

3. **Variables**:
   Add (under "Variables" tab):
   - `SITE_URL`: The URL of your deployed GitHub Pages site (e.g., `https://youruser.github.io/Bouquet-/`).
   - `FROM_NAME`: (Optional) Name to appear in "From" field.

4. **Testing**:
   - Go to "Actions" tab > "Daily Love Email".
   - Click "Run workflow" to test manually.

## Directory Structure

- `src/lib/bouquet`: Core procedural generation logic.
- `src/lib/message`: Message generation logic.
- `src/components`: UI components (`BouquetCanvas`, `MessageCard`).
- `scripts/sendDailyEmail.ts`: Script used by GitHub Actions.
