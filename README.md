# BugSight 🔍✨

<div align="center">

![BugSight Logo](web/public/logo.svg)

**Know Your Bugs** - AI-powered error explanation and debugging assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)

[Quick Start](QUICKSTART.md) • [Features](FEATURES.md) • [Setup Guide](SETUP.md) • [Contributing](CONTRIBUTING.md)

</div>

---

## 🎯 What is BugSight?

BugSight transforms cryptic error messages into clear, actionable insights. Paste any error, get instant AI-powered explanations, step-by-step solutions, and suggested fixes - all in a beautiful neon-themed interface.

### Why BugSight?

- ⚡ **Instant Understanding**: No more googling stack traces
- 🎨 **Beautiful UI**: Neon-themed, smooth animations, dark/light modes
- 🔒 **Privacy First**: No accounts, local storage only
- 💻 **VSCode Integration**: Capture errors while you code
- 🤖 **Smart AI**: Powered by Google Gemini

## 🚀 Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/bugsight.git
cd bugsight

# 2. Setup web app
cd web
npm install
echo "GEMINI_API_KEY=your_key_here" > .env.local
npm run dev

# 3. Open http://localhost:3000
```

Get your Gemini API key: https://makersuite.google.com/app/apikey

## ✨ Features

### 🌐 Web App
- **Error Analysis**: Paste errors, upload logs, get AI explanations
- **Dashboard**: Track error history, view recurring patterns, visual charts
- **Extension Hub**: Download VSCode extension with instructions
- **Theme Toggle**: Seamless dark/light mode switching
- **Neon Aesthetics**: Black background with cyan/purple/pink accents

### 💻 VSCode Extension
- **Live Detection**: Auto-capture errors from terminal and diagnostics
- **AI Explanations**: Select error text, get instant analysis
- **Local History**: Track all errors in sidebar
- **One-Click Copy**: Copy suggested fixes instantly
- **Privacy Focused**: All data stored locally

## 📸 Screenshots

### Web App - Analyze Tab
Beautiful neon-themed interface for pasting and analyzing errors.

### Dashboard
Track error history with visual charts and statistics.

### VSCode Extension
Real-time error detection and AI explanations in your editor.

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, React, TypeScript |
| **Styling** | Tailwind CSS, Framer Motion |
| **Extension** | VSCode Extension API |
| **AI** | Google Gemini API |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Deployment** | Vercel (web), VSCode Marketplace (extension) |

## 📁 Project Structure

```
bugsight/
├── web/              # Next.js web application
├── extension/        # VSCode extension
├── shared/           # Shared TypeScript types
└── docs/            # Documentation
```

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for detailed breakdown.

## 🎨 Design Philosophy

- **Neon Aesthetics**: Inspired by cyberpunk and modern dev tools
- **Smooth Animations**: Every interaction feels fluid
- **Privacy First**: Your data stays on your machine
- **Developer Focused**: Built by developers, for developers

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Areas to Help
- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation and tutorials
- 🎨 UI/UX improvements
- 🧪 Testing and quality assurance

## 📚 Documentation

- [Quick Start Guide](QUICKSTART.md) - Get running in 3 minutes
- [Setup Guide](SETUP.md) - Detailed installation instructions
- [Features](FEATURES.md) - Complete feature list
- [Project Structure](PROJECT_STRUCTURE.md) - Codebase overview
- [Contributing](CONTRIBUTING.md) - How to contribute

## 🗺️ Roadmap

- [ ] Browser extension (Chrome, Firefox)
- [ ] Team collaboration features
- [ ] Error knowledge base
- [ ] Multi-language UI support
- [ ] Advanced analytics dashboard
- [ ] Slack/Discord integration
- [ ] PDF/Markdown export
- [ ] Custom AI prompts
- [ ] One-click fix application

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- Google Gemini for AI capabilities
- Next.js team for the amazing framework
- VSCode team for extension APIs
- All contributors and users

---

<div align="center">

**Built with ❤️ by developers, for developers**

[Report Bug](https://github.com/yourusername/bugsight/issues) • [Request Feature](https://github.com/yourusername/bugsight/issues) • [Join Discussion](https://github.com/yourusername/bugsight/discussions)

</div>
