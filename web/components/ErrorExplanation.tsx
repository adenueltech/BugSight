'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Copy, Code } from 'lucide-react'
import { useState } from 'react'

interface ErrorExplanationProps {
  explanation: any
}

export default function ErrorExplanation({ explanation }: ErrorExplanationProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!explanation) {
    return (
      <motion.div
        className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 flex items-center justify-center h-full min-h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center text-gray-500">
          <Code className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Paste an error and click "Analyze with AI" to get started</p>
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={explanation.id}
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-neon-purple/30 neon-border"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-neon-purple neon-text">
          AI Explanation
        </h2>

        {/* Plain English Explanation */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-neon-green">What's happening?</h3>
          <p className="text-gray-300 leading-relaxed">
            {explanation.explanation}
          </p>
        </div>

        {/* Manual Solutions */}
        {explanation.solutions && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-neon-green">How to fix it:</h3>
            <ol className="space-y-2">
              {explanation.solutions.map((solution: string, idx: number) => (
                <motion.li
                  key={idx}
                  className="flex gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-neon-blue font-bold">{idx + 1}.</span>
                  <span>{solution}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        )}

        {/* AI Fix Suggestion */}
        {explanation.fix && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-neon-blue">Suggested Fix:</h3>
              <button
                onClick={() => copyToClipboard(explanation.fix.code)}
                className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-black/70 border border-gray-700 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-neon-green font-mono">
                {explanation.fix.code}
              </code>
            </pre>
            
            {/* Pros/Cons */}
            {explanation.fix.pros && (
              <div className="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-2">
                    <CheckCircle className="w-4 h-4" />
                    Pros
                  </h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {explanation.fix.pros.map((pro: string, idx: number) => (
                      <li key={idx}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 text-red-400 font-semibold mb-2">
                    <XCircle className="w-4 h-4" />
                    Cons
                  </h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {explanation.fix.cons.map((con: string, idx: number) => (
                      <li key={idx}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
