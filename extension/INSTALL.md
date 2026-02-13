# Install BugSight Extension - Step by Step

## Quick Install (Recommended)

1. **In the modal that pops up, click "Find 'JSON with Comments' extension"**
   - This installs a VSCode extension needed for debugging
   - Wait for it to install
   - Close VSCode

2. **Reopen ONLY the extension folder:**
   - Open VSCode
   - File → Open Folder
   - Select: `C:\Users\HP\BugSight\extension`
   - Click "Select Folder"

3. **Start debugging:**
   - Press `F5` (or your custom debug key)
   - OR: Run menu → Start Debugging
   - OR: Ctrl+Shift+P → "Debug: Start Debugging"

4. **A new VSCode window will open** - this is the Extension Development Host

5. **Configure your API key in the new window:**
   - Press `Ctrl+,` to open Settings
   - Search for "bugsight"
   - Enter your Gemini API key: `AIzaSyCanhRvVyJogLeAnR6tL9GRLkqfQAB9dmo`

6. **Test the extension:**
   - Create a new file with an error
   - Select the error text
   - Press `Ctrl+Shift+P`
   - Type: "BugSight: Explain Error"
   - See the AI explanation!

## Alternative: Manual Installation

If debugging still doesn't work, we can package and install manually:

1. **Install vsce globally:**
   ```bash
   npm install -g @vscode/vsce
   ```

2. **Package the extension:**
   ```bash
   cd C:\Users\HP\BugSight\extension
   vsce package --no-dependencies
   ```

3. **Install the .vsix file:**
   - Open VSCode
   - Press `Ctrl+Shift+X` (Extensions)
   - Click `...` menu → "Install from VSIX..."
   - Select the `bugsight-vscode-1.0.0.vsix` file

## Troubleshooting

**Modal keeps appearing:**
- Click "Find 'JSON with Comments' extension" and let it install
- Restart VSCode after installation

**Extension not found:**
- Make sure you opened the `extension` folder, not the root `BugSight` folder

**No API key:**
- Settings → Search "bugsight" → Enter your Gemini API key

**Commands not showing:**
- Press `Ctrl+Shift+P` and type "BugSight"
- You should see: Explain Error, Show History, Clear History
