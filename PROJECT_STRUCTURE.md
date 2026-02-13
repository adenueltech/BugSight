# BugSight Project Structure

```
bugsight/
│
├── web/                          # Next.js Web Application
│   ├── app/
│   │   ├── layout.tsx           # Root layout with theme provider
│   │   ├── page.tsx             # Main page with tabs
│   │   ├── globals.css          # Global styles + neon effects
│   │   └── api/
│   │       └── analyze/
│   │           └── route.ts     # Gemini AI API endpoint
│   │
│   ├── components/
│   │   ├── Header.tsx           # Top navigation with theme toggle
│   │   ├── ErrorInput.tsx       # Error paste + file upload
│   │   ├── ErrorExplanation.tsx # AI explanation display
│   │   ├── Dashboard.tsx        # Error history + charts
│   │   ├── ExtensionHub.tsx     # Extension download page
│   │   └── ThemeProvider.tsx    # Dark/light mode provider
│   │
│   ├── public/
│   │   └── logo.svg             # BugSight logo
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts       # Neon colors + animations
│   ├── next.config.js
│   ├── postcss.config.js
│   └── .env.local.example       # Environment variables template
│
├── extension/                    # VSCode Extension
│   ├── src/
│   │   ├── extension.ts         # Main extension entry point
│   │   ├── errorDetector.ts     # Terminal/diagnostic monitoring
│   │   ├── aiService.ts         # Gemini API integration
│   │   └── historyProvider.ts   # Error history tree view
│   │
│   ├── package.json             # Extension manifest
│   ├── tsconfig.json
│   ├── README.md
│   └── .vscodeignore
│
├── shared/                       # Shared TypeScript types
│   ├── types.ts                 # Common interfaces
│   └── package.json
│
├── README.md                     # Project overview
├── SETUP.md                      # Detailed setup guide
├── QUICKSTART.md                 # 3-minute quick start
├── FEATURES.md                   # Feature documentation
├── CONTRIBUTING.md               # Contribution guidelines
├── LICENSE                       # MIT License
├── .gitignore
└── package.json                  # Root workspace config
```

## Key Files Explained

### Web App

**app/page.tsx**
- Main application with 3 tabs: Analyze, Dashboard, Extension
- Manages state for error explanations
- Smooth tab transitions with Framer Motion

**components/ErrorInput.tsx**
- Textarea for pasting errors
- File upload for log files
- "Analyze with AI" button
- Saves to localStorage

**components/ErrorExplanation.tsx**
- Displays AI-generated explanation
- Shows step-by-step solutions
- Code fix with copy button
- Pros/cons comparison

**components/Dashboard.tsx**
- Stats cards (total, recurring, 24h)
- Bar chart of recent errors
- Error history list
- Reads from localStorage

**app/api/analyze/route.ts**
- Next.js API route
- Calls Gemini API
- Parses JSON response
- Returns structured data

**tailwind.config.ts**
- Custom neon colors (blue, purple, pink, green)
- Glow animations
- Float animations
- Slide-up transitions

### VSCode Extension

**extension.ts**
- Activates extension
- Registers commands
- Creates webview panels
- Manages error detection

**errorDetector.ts**
- Monitors terminal output
- Watches diagnostic changes
- Detects error patterns
- Triggers AI analysis

**aiService.ts**
- Gemini API integration
- Error analysis requests
- Response parsing
- Error handling

**historyProvider.ts**
- Tree view data provider
- Stores errors in globalState
- Refresh/clear functionality
- Limits to 50 items

## Data Flow

### Web App
1. User pastes error → ErrorInput
2. Click "Analyze" → API call to /api/analyze
3. API calls Gemini → Returns explanation
4. Save to localStorage
5. Display in ErrorExplanation
6. Show in Dashboard history

### VSCode Extension
1. Terminal outputs error → errorDetector
2. Pattern match detected
3. Call aiService.explainError()
4. Display in webview panel
5. Save to historyProvider
6. Show in sidebar tree view

## Styling System

### Neon Colors
- `neon-blue`: #00f0ff (primary)
- `neon-purple`: #b000ff (secondary)
- `neon-pink`: #ff00ff (accent)
- `neon-green`: #00ff88 (success)

### CSS Classes
- `.neon-text`: Text glow effect
- `.neon-border`: Border glow effect
- `.animate-glow`: Pulsing glow
- `.animate-float`: Floating animation

### Theme
- Dark mode: Black background (#0a0a0a)
- Light mode: White background (optional)
- Glassmorphism: backdrop-blur-sm
- Smooth transitions: 300ms

## API Integration

### Gemini API
- Endpoint: `generativelanguage.googleapis.com`
- Model: `gemini-pro`
- Method: POST with JSON
- Response: Structured explanation

### Request Format
```json
{
  "contents": [{
    "parts": [{
      "text": "Analyze this error..."
    }]
  }]
}
```

### Response Format
```json
{
  "explanation": "Plain English explanation",
  "solutions": ["Step 1", "Step 2"],
  "fix": {
    "code": "Suggested fix",
    "pros": ["Pro 1"],
    "cons": ["Con 1"]
  }
}
```

## Storage

### Web App (localStorage)
- Key: `bugHistory`
- Format: Array of ErrorHistoryItem
- Limit: 50 items
- Cleared manually or via browser

### VSCode Extension (globalState)
- Key: `errorHistory`
- Format: Array of ErrorItem
- Limit: 50 items
- Persists across sessions

## Build & Deploy

### Web App
- Development: `npm run dev`
- Build: `npm run build`
- Deploy: Vercel (`vercel`)

### Extension
- Compile: `npm run compile`
- Watch: `npm run watch`
- Package: `npm run package` (creates .vsix)
- Publish: VSCode Marketplace

## Environment Variables

### Web App (.env.local)
- `GEMINI_API_KEY`: Your Gemini API key
- `NEXT_PUBLIC_API_URL`: API base URL (optional)

### VSCode Extension (Settings)
- `bugsight.geminiApiKey`: API key
- `bugsight.autoExplain`: Auto-analyze errors (boolean)
