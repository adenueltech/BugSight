import * as vscode from 'vscode'
import { AIService } from './aiService'
import { HistoryProvider } from './historyProvider'

export class ErrorDetector {
  private disposables: vscode.Disposable[] = []
  private errorPatterns = [
    /error:/i,
    /exception:/i,
    /failed:/i,
    /cannot find/i,
    /undefined/i,
    /null reference/i,
    /syntax error/i,
  ]

  constructor(
    private context: vscode.ExtensionContext,
    private aiService: AIService,
    private historyProvider: HistoryProvider
  ) {}

  startMonitoring() {
    // Monitor diagnostic changes (errors in code)
    vscode.languages.onDidChangeDiagnostics(
      (e: vscode.DiagnosticChangeEvent) => this.handleDiagnostics(e),
      null,
      this.disposables
    )
  }

  private handleDiagnostics(event: vscode.DiagnosticChangeEvent) {
    for (const uri of event.uris) {
      const diagnostics = vscode.languages.getDiagnostics(uri)
      const errors = diagnostics.filter((d: vscode.Diagnostic) => d.severity === vscode.DiagnosticSeverity.Error)
      
      if (errors.length > 0) {
        const errorText = errors.map((e: vscode.Diagnostic) => e.message).join('\n')
        this.detectError(errorText)
      }
    }
  }

  private async detectError(errorText: string) {
    const config = vscode.workspace.getConfiguration('bugsight')
    const autoExplain = config.get('autoExplain', false)

    if (autoExplain) {
      const explanation = await this.aiService.explainError(errorText)
      this.historyProvider.addError(errorText, explanation)
      
      vscode.window.showInformationMessage(
        'BugSight detected an error',
        'View Explanation'
      ).then((selection: string | undefined) => {
        if (selection === 'View Explanation') {
          vscode.commands.executeCommand('bugsight.showHistory')
        }
      })
    }
  }

  dispose() {
    this.disposables.forEach(d => d.dispose())
  }
}
