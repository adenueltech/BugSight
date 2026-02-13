'use client'

import { motion } from 'framer-motion'
import { Bug, Search, Terminal, FileText, GitBranch, TestTube } from 'lucide-react'

const debuggingSteps = [
  {
    icon: Search,
    title: 'Read the Error Message',
    description: 'Start by carefully reading the entire error message. Note the error type, line numbers, and file paths.',
    color: 'text-neon-blue'
  },
  {
    icon: Terminal,
    title: 'Reproduce the Bug',
    description: 'Try to consistently reproduce the error. Understanding when and how it occurs is half the battle.',
    color: 'text-neon-purple'
  },
  {
    icon: FileText,
    title: 'Check Recent Changes',
    description: 'Review what code was changed recently. Often bugs are introduced in the last modifications.',
    color: 'text-neon-green'
  },
  {
    icon: Bug,
    title: 'Isolate the Problem',
    description: 'Narrow down the issue by commenting out code or using console.log/print statements to track values.',
    color: 'text-yellow-400'
  },
  {
    icon: GitBranch,
    title: 'Check Dependencies',
    description: 'Verify package versions, imports, and environment variables. Outdated or missing dependencies cause many issues.',
    color: 'text-pink-400'
  },
  {
    icon: TestTube,
    title: 'Test Your Fix',
    description: 'After fixing, test thoroughly. Try edge cases and ensure you haven\'t introduced new bugs.',
    color: 'text-orange-400'
  }
]

export default function DebuggingTips() {
  return (
    <motion.div
      className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-white flex items-center gap-2">
        <Bug className="w-6 h-6 text-neon-blue" />
        Debugging Best Practices
      </h2>
      
      <p className="text-gray-400 mb-6 text-sm">
        Follow these engineering principles to debug effectively and efficiently.
      </p>

      <div className="space-y-4">
        {debuggingSteps.map((step, idx) => (
          <motion.div
            key={idx}
            className="flex gap-4 p-4 bg-black/30 rounded-lg border border-gray-800 hover:border-gray-700 transition-all"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            whileHover={{ scale: 1.02, x: 5 }}
          >
            <div className={`flex-shrink-0 ${step.color}`}>
              <step.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                {idx + 1}. {step.title}
              </h3>
              <p className="text-sm text-gray-400">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-6 p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-neon-blue">Pro Tip:</span> Use the AI analyzer above to get instant explanations and fixes. But understanding the debugging process makes you a better engineer!
        </p>
      </motion.div>
    </motion.div>
  )
}
