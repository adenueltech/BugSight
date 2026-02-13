# Testing BugSight Extension

## Setup for Testing

1. **Install Dependencies**
   ```bash
   cd extension
   npm install
   ```

2. **Compile the Extension**
   ```bash
   npm run compile
   ```

3. **Configure API Key**
   - Open VSCode Settings (Ctrl+,)
   - Search for "bugsight"
   - Set your Gemini API key in `bugsight.geminiApiKey`

## Test the Extension

### Method 1: Run in Development Mode

1. Open the `extension` folder in VSCode
2. Press `F5` to launch Extension Development Host
3. A new VSCode window will open with the extension loaded

### Method 2: Install Locally

1. Package the extension:
   ```bash
   npm run package
   ```

2. Install the `.vsix` file:
   - Open VSCode
   - Go to Extensions (Ctrl+Shift+X)
   - Click the "..." menu → "Install from VSIX"
   - Select the generated `.vsix` file

## Testing Features

### 1. Explain Selected Error

1. Create a test file with an error:
   ```javascript
   // test.js
   console.log(undefinedVariable)
   ```

2. Select the error text or the line
3. Open Command Palette (Ctrl+Shift+P)
4. Run: `BugSight: Explain Error`
5. View the explanation in the side panel

### 2. Auto-Detect Errors

1. Enable auto-detection in settings:
   - Set `bugsight.autoExplain` to `true`

2. Write code with errors
3. BugSight will detect and notify you

### 3. View History

1. Click the BugSight icon in the Activity Bar (left sidebar)
2. Or run: `BugSight: Show Error History`
3. See all analyzed errors

### 4. Clear History

1. Run: `BugSight: Clear History`
2. Confirm the history is cleared

## Test Errors

Use these sample errors for testing:

**JavaScript Error:**
```
TypeError: Cannot read property 'map' of undefined
    at UserList (src/components/UserList.jsx:15:23)
```

**Python Error:**
```
Traceback (most recent call last):
  File "app.py", line 3, in <module>
    from flask import Flask
ModuleNotFoundError: No module named 'flask'
```

**Node.js Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1144:16)
```

## Troubleshooting

**Extension not activating:**
- Check the Output panel → "Extension Host"
- Look for BugSight activation messages

**API errors:**
- Verify your Gemini API key is correct
- Check internet connection
- View errors in Developer Tools (Help → Toggle Developer Tools)

**No explanation showing:**
- Check if the API key is set
- Look at the console for error messages
- Try with a simpler error message

## Publishing

To publish to VSCode Marketplace:

1. Get a publisher account at https://marketplace.visualstudio.com/
2. Create a Personal Access Token
3. Login: `vsce login <publisher-name>`
4. Publish: `vsce publish`
