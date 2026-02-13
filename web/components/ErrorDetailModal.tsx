'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Copy, CheckCircle, XCircle, Clock, Code } from 'lucide-react'
import { useState } from 'react'

interface ErrorDetailModalProps {
  isOpen: boolean
  onClose: () => void
  errorData: any
}

export default function ErrorDetailModal({ isOpen, onClose, errorData }: ErrorDetailModalProps) {
  const [copied, setCopied] = useState(false)

  if (!errorData) return null

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl border border-neon-blue/30 max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Code className="w-6 h-6 text-neon-blue" />
                  <h2 className="text-2xl font-bold text-neon-blue">Error Details</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Timestamp */}
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(errorData.timestamp).toLocaleString()}</span>
                </div>

                {/* Original Error */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-neon-purple">Original Error</h3>
                  <div className="bg-black/50 border border-gray-700 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap break-words">
                      {errorData.error}
                    </pre>
                  </div>
                </div>

                {/* AI Explanation */}
                {errorData.explanation?.explanation && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-neon-green">What's Happening?</h3>
                    <p className="text-gray-300 leading-relaxed bg-black/30 border border-gray-800 rounded-lg p-4">
                      {errorData.explanation.explanation}
                    </p>
                  </div>
                )}

                {/* Solutions */}
                {errorData.explanation?.solutions && errorData.explanation.solutions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-neon-blue">How to Fix It</h3>
                    <ol className="space-y-3">
                      {errorData.explanation.solutions.map((solution: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex gap-3 bg-black/30 border border-gray-800 rounded-lg p-4"
                        >
                          <span className="text-neon-blue font-bold flex-shrink-0">{idx + 1}.</span>
                          <span className="text-gray-300">{solution}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Suggested Fix */}
                {errorData.explanation?.fix && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-neon-purple">Suggested Code Fix</h3>
                      <button
                        onClick={() => copyToClipboard(errorData.explanation.fix.code)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        {copied ? 'Copied!' : 'Copy Code'}
                      </button>
                    </div>
                    <pre className="bg-black/70 border border-gray-700 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm text-neon-green font-mono">
                        {errorData.explanation.fix.code}
                      </code>
                    </pre>

                    {/* Pros/Cons */}
                    {(errorData.explanation.fix.pros || errorData.explanation.fix.cons) && (
                      <div className="mt-4 grid md:grid-cols-2 gap-4">
                        {errorData.explanation.fix.pros && (
                          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                            <h4 className="flex items-center gap-2 text-green-400 font-semibold mb-3">
                              <CheckCircle className="w-5 h-5" />
                              Pros
                            </h4>
                            <ul className="text-sm text-gray-300 space-y-2">
                              {errorData.explanation.fix.pros.map((pro: string, idx: number) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="text-green-400">•</span>
                                  <span>{pro}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {errorData.explanation.fix.cons && (
                          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                            <h4 className="flex items-center gap-2 text-red-400 font-semibold mb-3">
                              <XCircle className="w-5 h-5" />
                              Cons
                            </h4>
                            <ul className="text-sm text-gray-300 space-y-2">
                              {errorData.explanation.fix.cons.map((con: string, idx: number) => (
                                <li key={idx} className="flex gap-2">
                                  <span className="text-red-400">•</span>
                                  <span>{con}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 p-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-neon-blue text-black font-semibold rounded-lg hover:bg-neon-blue/90 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
