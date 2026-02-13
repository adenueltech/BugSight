'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, Sparkles, Loader2 } from 'lucide-react'

interface ErrorInputProps {
  onExplanation: (explanation: any) => void
}

export default function ErrorInput({ onExplanation }: ErrorInputProps) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleAnalyze = async () => {
    if (!error.trim()) return

    setLoading(true)
    setErrorMessage('')
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        setErrorMessage(data.error || 'Failed to analyze error')
        return
      }
      
      if (!data.explanation) {
        setErrorMessage('No explanation received from AI')
        return
      }
      
      onExplanation(data)
      
      // Save to local history
      const history = JSON.parse(localStorage.getItem('bugHistory') || '[]')
      history.unshift({
        id: Date.now(),
        error: error.substring(0, 100),
        timestamp: new Date().toISOString(),
        explanation: data,
      })
      localStorage.setItem('bugHistory', JSON.stringify(history.slice(0, 50)))
    } catch (err) {
      console.error('Analysis failed:', err)
      setErrorMessage('Network error: Failed to connect to API')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      const reader = new FileReader()
      reader.onload = (event) => {
        setError(event.target?.result as string)
      }
      reader.readAsText(uploadedFile)
    }
  }

  return (
    <motion.div
      className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-neon-blue/30 neon-border"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-neon-blue neon-text">
        Paste Your Error
      </h2>
      
      <textarea
        value={error}
        onChange={(e) => setError(e.target.value)}
        placeholder="Paste your error message, stack trace, or log here..."
        className="w-full h-64 bg-black/50 border border-gray-700 rounded-lg p-4 text-gray-100 placeholder-gray-500 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue/50 transition-all font-mono text-sm resize-none"
      />

      <div className="mt-4 flex gap-4">
        <label className="flex-1 cursor-pointer">
          <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700">
            <Upload className="w-5 h-5 text-neon-purple" />
            <span className="text-sm">Upload Log File</span>
          </div>
          <input
            type="file"
            accept=".log,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>

        <motion.button
          onClick={handleAnalyze}
          disabled={loading || !error.trim()}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-neon-blue text-black font-semibold rounded-lg hover:bg-neon-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all neon-border"
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze with AI
            </>
          )}
        </motion.button>
      </div>

      {file && (
        <p className="mt-2 text-sm text-gray-400">
          Loaded: {file.name}
        </p>
      )}
      
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
        >
          {errorMessage}
        </motion.div>
      )}
    </motion.div>
  )
}
