import * as vscode from 'vscode'

export class AIService {
  private apiUrl: string

  constructor() {
    // Use the BugSight backend API
    // Production URL:
    this.apiUrl = 'https://bug-sight-web.vercel.app/api/analyze'
    // For local testing:
    // this.apiUrl = 'http://localhost:3000/api/analyze'
  }

  async explainError(errorText: string): Promise<any> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: errorText })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
      }

      const data: any = await response.json()
      
      return {
        explanation: data.explanation || 'No explanation available',
        solutions: data.solutions || [],
        fix: data.fix || null
      }
    } catch (error) {
      throw new Error(`Failed to analyze error: ${error}`)
    }
  }
}
