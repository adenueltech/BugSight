export interface ErrorAnalysis {
  id: number
  explanation: string
  solutions: string[]
  fix: {
    code: string
    pros: string[]
    cons: string[]
  } | null
}

export interface ErrorHistoryItem {
  id: number
  error: string
  timestamp: string
  explanation: ErrorAnalysis
}

export interface AnalyzeRequest {
  error: string
  language?: string
  framework?: string
}

export interface AnalyzeResponse extends ErrorAnalysis {}
