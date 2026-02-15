'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import ErrorInput from '@/components/ErrorInput'
import ErrorExplanation from '@/components/ErrorExplanation'
import Dashboard from '@/components/Dashboard'
import ExtensionHub from '@/components/ExtensionHub'
import DebuggingTips from '@/components/DebuggingTips'

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<'analyze' | 'dashboard' | 'extension'>('analyze')
  const [explanation, setExplanation] = useState<any>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-black dark:via-gray-900 dark:to-black transition-colors">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 pt-20 md:pt-24">
        <motion.div 
          className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8 justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {[
            { id: 'analyze', label: '🔍 Analyze' },
            { id: 'dashboard', label: '📊 Dashboard' },
            { id: 'extension', label: '💻 Extension' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                activeTab === tab.id
                  ? 'bg-neon-blue text-black'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'analyze' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                <ErrorInput onExplanation={setExplanation} />
                <ErrorExplanation explanation={explanation} />
              </div>
              <DebuggingTips />
            </>
          )}
          
          {activeTab === 'dashboard' && <Dashboard />}
          
          {activeTab === 'extension' && <ExtensionHub />}
        </motion.div>
      </div>
    </main>
  )
}
