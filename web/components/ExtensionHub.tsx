'use client'

import { motion } from 'framer-motion'
import { Download, CheckCircle, Code2, MousePointer2 } from 'lucide-react'
import Image from 'next/image'

export default function ExtensionHub() {
  const handleDownload = () => {
    // Redirect to VSCode marketplace
    window.open('vscode:extension/bugsight.bugsight-vscode', '_blank')
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-neon-purple/30 neon-border"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="text-center mb-8">
          <Code2 className="w-16 h-16 mx-auto mb-4 text-neon-purple animate-float" />
          <h2 className="text-3xl font-bold mb-2 text-neon-purple neon-text">
            VSCode Extension
          </h2>
          <p className="text-gray-400">
            Debug faster directly in your IDE
          </p>
        </div>

        {/* Extension Preview Image */}
        <motion.div
          className="mb-8 rounded-xl overflow-hidden border border-neon-blue/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src="/dplay look.jpeg"
            alt="BugSight VSCode Extension Preview"
            width={1200}
            height={600}
            className="w-full h-auto"
          />
        </motion.div>

        {/* How to Use */}
        <div className="mb-8 bg-black/30 rounded-lg p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-neon-blue flex items-center gap-2">
            <MousePointer2 className="w-5 h-5" />
            How to Use:
          </h3>
          <ol className="space-y-3 text-gray-300">
            <li className="flex gap-3">
              <span className="text-neon-blue font-bold">1.</span>
              <span>Highlight or click on any error in your code</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-blue font-bold">2.</span>
              <span>Right-click and select "Explain with BugSight"</span>
            </li>
            <li className="flex gap-3">
              <span className="text-neon-blue font-bold">3.</span>
              <span>Get instant AI-powered explanations and fixes!</span>
            </li>
          </ol>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {[
            'Right-click to explain errors',
            'Instant AI explanations',
            'Step-by-step solutions',
            'Code fix suggestions',
            'Local error history',
            'No setup required',
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Download Button */}
        <motion.button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-neon-purple text-black font-bold text-lg rounded-lg hover:bg-neon-purple/90 transition-all neon-border"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-6 h-6" />
          Download Extension
        </motion.button>

        {/* Simple Installation */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Click the button above to open VSCode, then search for "BugSight" in the Extensions panel
          </p>
        </div>
      </motion.div>
    </div>
  )
}

