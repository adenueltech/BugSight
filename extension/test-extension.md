# Simple Way to Test BugSight Extension

Since debugging is having issues, here's the easiest way to test:

## Method 1: Install the Extension Directly

1. **Open the extension folder in terminal:**
   ```bash
   cd C:\Users\HP\BugSight\extension
   ```

2. **Make sure it's compiled:**
   ```bash
   npm run compile
   ```

3. **Open VSCode and install:**
   - Press `Ctrl+Shift+X` to open Extensions
   - Click the `...` menu (three dots at top)
   - Select "Install from VSIX..."
   - But wait, we need to create the VSIX first!

## Method 2: Use the Web App Instead

For now, the web app at `http://localhost:3000` is fully working and easier to test!

1. Start the web app:
   ```bash
   cd C:\Users\HP\BugSight
   npm run dev:web
   ```

2. Open browser: `http://localhost:3000`

3. Test all features:
   - Landing page
   - Analyze errors with AI
   - View dashboard
   - Check error history

The extension can be tested later once we resolve the VSCode configuration issues.

## What the Extension Does

The extension would do the same thing as the web app, but inside VSCode:
- Select error text → Right-click → "BugSight: Explain Error"
- View history in sidebar
- Get AI explanations in a panel

For your MVP, the web app is the main product anyway! The extension is a bonus feature.
