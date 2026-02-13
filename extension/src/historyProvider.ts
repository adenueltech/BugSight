import * as vscode from 'vscode'

interface ErrorItem {
  id: string
  error: string
  timestamp: string
  explanation: any
}

export class HistoryProvider implements vscode.TreeDataProvider<ErrorItem> {
  private _onDidChangeTreeData = new vscode.EventEmitter<ErrorItem | undefined>()
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event
  private history: ErrorItem[] = []

  constructor(private context: vscode.ExtensionContext) {
    this.loadHistory()
  }

  refresh(): void {
    this._onDidChangeTreeData.fire(undefined)
  }

  addError(error: string, explanation: any): void {
    const item: ErrorItem = {
      id: Date.now().toString(),
      error: error.substring(0, 100),
      timestamp: new Date().toISOString(),
      explanation
    }
    
    this.history.unshift(item)
    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50)
    }
    
    this.saveHistory()
    this.refresh()
  }

  clear(): void {
    this.history = []
    this.saveHistory()
    this.refresh()
  }

  getTreeItem(element: ErrorItem): vscode.TreeItem {
    const item = new vscode.TreeItem(
      element.error,
      vscode.TreeItemCollapsibleState.None
    )
    item.description = new Date(element.timestamp).toLocaleString()
    item.tooltip = element.error
    return item
  }

  getChildren(element?: ErrorItem): Promise<ErrorItem[]> {
    if (element) {
      return Promise.resolve([])
    }
    return Promise.resolve(this.history)
  }

  private loadHistory(): void {
    this.history = this.context.globalState.get('errorHistory', [])
  }

  private saveHistory(): void {
    this.context.globalState.update('errorHistory', this.history)
  }
}
