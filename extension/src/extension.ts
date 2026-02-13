import * as vscode from 'vscode'
import { ErrorDetector } from './errorDetector'
import { HistoryProvider } from './historyProvider'
import { AIService } from './aiService'

let errorDetector: ErrorDetector
let historyProvider: HistoryProvider

export function activate(context: vscode.ExtensionContext) {
  console.log('BugSight extension activated')

  const aiService = new AIService()
  historyProvider = new HistoryProvider(context)
  errorDetector = new ErrorDetector(context, aiService, historyProvider)

  // Register tree view
  vscode.window.registerTreeDataProvider('bugsightHistory', historyProvider)

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('bugsight.explainError', async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) {
        vscode.window.showErrorMessage('No active editor')
        return
      }

      const selection = editor.selection
      const errorText = editor.document.getText(selection)

      if (!errorText) {
        vscode.window.showErrorMessage('Please select an error message')
        return
      }

      await explainError(errorText, aiService, historyProvider)
    })
  )

  // Right-click menu command
  context.subscriptions.push(
    vscode.commands.registerCommand('bugsight.explainSelection', async () => {
      const editor = vscode.window.activeTextEditor
      if (!editor) {
        return
      }

      const selection = editor.selection
      const errorText = editor.document.getText(selection)

      if (errorText) {
        await explainError(errorText, aiService, historyProvider)
      }
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('bugsight.showHistory', () => {
      historyProvider.refresh()
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('bugsight.clearHistory', () => {
      historyProvider.clear()
    })
  )

  // Start monitoring terminal
  errorDetector.startMonitoring()

  vscode.window.showInformationMessage('BugSight is now monitoring for errors!')
}

async function explainError(
  errorText: string,
  aiService: AIService,
  historyProvider: HistoryProvider
) {
  const panel = vscode.window.createWebviewPanel(
    'bugsightExplanation',
    'BugSight: Error Explanation',
    vscode.ViewColumn.Beside,
    { enableScripts: true }
  )

  panel.webview.html = getLoadingHtml()

  try {
    const explanation = await aiService.explainError(errorText)
    historyProvider.addError(errorText, explanation)
    panel.webview.html = getExplanationHtml(errorText, explanation)
  } catch (error) {
    panel.webview.html = getErrorHtml(String(error))
  }
}

function getLoadingHtml(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      background: #0a0a0a; 
      color: #fff; 
      font-family: system-ui; 
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .loader { 
      border: 4px solid #333;
      border-top: 4px solid #00f0ff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div>
    <div class="loader"></div>
    <p style="margin-top: 20px; text-align: center;">Analyzing error...</p>
  </div>
</body>
</html>`
}

function getExplanationHtml(error: string, explanation: any): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      background: #0a0a0a; 
      color: #fff; 
      font-family: system-ui; 
      padding: 20px;
      line-height: 1.6;
    }
    h2 { color: #00f0ff; text-shadow: 0 0 10px #00f0ff; }
    h3 { color: #b000ff; margin-top: 20px; }
    pre { 
      background: #1a1a1a; 
      padding: 15px; 
      border-radius: 8px;
      border: 1px solid #333;
      overflow-x: auto;
    }
    code { color: #00ff88; }
    .error-box {
      background: #1a1a1a;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #ff0055;
      margin-bottom: 20px;
    }
    .solution { 
      background: #1a1a1a;
      padding: 10px 15px;
      margin: 10px 0;
      border-radius: 8px;
      border-left: 3px solid #00f0ff;
    }
    button {
      background: #00f0ff;
      color: #000;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 10px;
    }
    button:hover { background: #00d4e6; }
  </style>
</head>
<body>
  <h2>🔍 Error Analysis</h2>
  
  <div class="error-box">
    <strong>Original Error:</strong><br>
    <code>${error.substring(0, 200)}...</code>
  </div>

  <h3>What's happening?</h3>
  <p>${explanation.explanation || 'No explanation available'}</p>

  ${explanation.solutions ? `
    <h3>How to fix it:</h3>
    ${explanation.solutions.map((sol: string, idx: number) => 
      `<div class="solution">${idx + 1}. ${sol}</div>`
    ).join('')}
  ` : ''}

  ${explanation.fix ? `
    <h3>Suggested Fix:</h3>
    <pre><code>${explanation.fix.code}</code></pre>
    <button onclick="copyCode()">Copy Fix</button>
  ` : ''}

  <script>
    function copyCode() {
      const code = ${JSON.stringify(explanation.fix?.code || '')};
      navigator.clipboard.writeText(code);
      alert('Code copied to clipboard!');
    }
  </script>
</body>
</html>`
}

function getErrorHtml(error: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      background: #0a0a0a; 
      color: #fff; 
      font-family: system-ui; 
      padding: 20px;
    }
    .error { color: #ff0055; }
  </style>
</head>
<body>
  <h2 class="error">Error</h2>
  <p>${error}</p>
</body>
</html>`
}

export function deactivate() {
  if (errorDetector) {
    errorDetector.dispose()
  }
}
