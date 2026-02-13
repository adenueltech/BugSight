# BugSight Setup Guide

## Prerequisites

- Node.js 18+ and npm
- Gemini API key (get from https://makersuite.google.com/app/apikey)

## Web App Setup

1. Navigate to web directory:
```bash
cd web
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

5. Run development server:
```bash
npm run dev
```

6. Open http://localhost:3000

## VSCode Extension Setup

1. Navigate to extension directory:
```bash
cd extension
```

2. Install dependencies:
```bash
npm install
```

3. Compile the extension:
```bash
npm run compile
```

4. Open the extension folder in VSCode

5. Press F5 to launch Extension Development Host

6. In the new VSCode window, configure your Gemini API key:
   - Open Settings (Ctrl+,)
   - Search for "bugsight"
   - Add your API key

## Building for Production

### Web App
```bash
cd web
npm run build
npm start
```

### VSCode Extension
```bash
cd extension
npm run package
```

This creates a `.vsix` file you can distribute.

## Deployment

### Web App
Deploy to Vercel:
```bash
cd web
vercel
```

### Extension
Publish to VSCode Marketplace or distribute the `.vsix` file directly.

## Features to Test

1. Web App:
   - Paste an error and click "Analyze with AI"
   - Check Dashboard for error history
   - Toggle dark/light mode
   - Download extension from Extension Hub

2. VSCode Extension:
   - Select error text and run "BugSight: Explain Error"
   - Check error history in sidebar
   - Terminal error auto-detection

## Troubleshooting

- If API calls fail, verify your Gemini API key
- Clear browser localStorage to reset error history
- For extension issues, check VSCode Developer Tools (Help > Toggle Developer Tools)
