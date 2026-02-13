# 🚀 BugSight Quick Start

Get BugSight running in 3 minutes!

## Step 1: Get Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy your key

## Step 2: Start Web App

```bash
# Install dependencies
cd web
npm install

# Create env file
echo "GEMINI_API_KEY=your_key_here" > .env.local

# Start dev server
npm run dev
```

Open http://localhost:3000 🎉

## Step 3: Try It Out

1. Paste this sample error:
```
TypeError: Cannot read property 'map' of undefined
    at App.render (App.js:25:18)
```

2. Click "Analyze with AI"

3. Get instant explanation + fix!

## Next Steps

- Check the Dashboard tab for error history
- Download the VSCode extension from Extension Hub
- Toggle dark/light mode with the moon/sun icon

## VSCode Extension (Optional)

```bash
cd extension
npm install
npm run compile
```

Press F5 in VSCode to test the extension.

---

Need help? Check SETUP.md for detailed instructions.
