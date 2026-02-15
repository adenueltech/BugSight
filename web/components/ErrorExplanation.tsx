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
        className="bg-gray-900/30 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-gray-800 flex items-center justify-center h-full min-h-[300px] md:min-h-[400px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center text-gray-500">
          <Code className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 opacity-50" />
          <p className="text-sm md:text-base">Paste an error and click "Analyze with AI" to get started</p>
        </div>
      </motion.div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={explanation.id}
        className="bg-gray-900/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-neon-purple/30"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-neon-purple">
          AI Explanation
        </h2>

        {/* Plain English Explanation */}
        <div className="mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold mb-2 text-neon-green">What's happening?</h3>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            {explanation.explanation}
          </p>
        </div>

        {/* Manual Solutions */}
        {explanation.solutions && (
          <div className="mb-4 md:mb-6">
            <h3 className="text-base md:text-lg font-semibold mb-2 md:mb-3 text-neon-green">How to fix it:</h3>
            <ol className="space-y-2">
              {explanation.solutions.map((solution: string, idx: number) => (
                <motion.li
                  key={idx}
                  className="flex gap-2 md:gap-3 text-sm md:text-base text-gray-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="text-neon-blue font-bold flex-shrink-0">{idx + 1}.</span>
                  <span>{solution}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        )}

        {/* AI Fix Suggestion */}
        {explanation.fix && (
          <div className="mb-4 md:mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base md:text-lg font-semibold text-neon-blue">Suggested Fix:</h3>
              <button
                onClick={() => copyToClipboard(explanation.fix.code)}
                className="flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 py-1 md:py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs md:text-sm transition-colors"
              >
                <Copy className="w-3 h-3 md:w-4 md:h-4" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="bg-black/70 border border-gray-700 rounded-lg p-3 md:p-4 overflow-x-auto">
              <code className="text-xs md:text-sm text-neon-green font-mono">
                {explanation.fix.code}
              </code>
            </pre>
            
            {/* Pros/Cons */}
            {explanation.fix.pros && (
              <div className="mt-3 md:mt-4 grid md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <h4 className="flex items-center gap-1.5 md:gap-2 text-green-400 font-semibold mb-2 text-sm md:text-base">
                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Pros
                  </h4>
                  <ul className="text-xs md:text-sm text-gray-400 space-y-1">
                    {explanation.fix.pros.map((pro: string, idx: number) => (
                      <li key={idx}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-1.5 md:gap-2 text-red-400 font-semibold mb-2 text-sm md:text-base">
                    <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    Cons
                  </h4>
                  <ul className="text-xs md:text-sm text-gray-400 space-y-1">
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
