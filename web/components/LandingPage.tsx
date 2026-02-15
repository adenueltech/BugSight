'use client'

import { motion } from 'framer-motion'
import { Bug, Sparkles, Zap, Shield, TrendingUp, Download, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Analysis',
      description: 'Get instant, plain-English explanations of complex error messages using advanced AI.',
      color: 'text-neon-blue'
    },
    {
      icon: Zap,
      title: 'Instant Solutions',
      description: 'Receive step-by-step fixes and code suggestions to resolve bugs quickly.',
      color: 'text-neon-purple'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'No accounts required. Your data stays local. We respect your privacy.',
      color: 'text-neon-green'
    },
    {
      icon: TrendingUp,
      title: 'Track Your Progress',
      description: 'Monitor recurring errors and see your debugging patterns over time.',
      color: 'text-yellow-400'
    },
    {
      icon: Download,
      title: 'VSCode Extension',
      description: 'Capture errors directly from your IDE and get real-time debugging assistance.',
      color: 'text-pink-400'
    },
    {
      icon: Bug,
      title: 'Multi-Language Support',
      description: 'Works with JavaScript, Python, Java, and many more programming languages.',
      color: 'text-orange-400'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Subtle background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-neon-blue/10 rounded-full blur-3xl -top-48 -left-48" />
          <div className="absolute w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl -bottom-48 -right-48" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="flex justify-center mb-6 md:mb-8"
          >
            <Image 
              src="/logo.svg" 
              alt="BugSight Logo" 
              width={100} 
              height={100}
              className="w-20 h-20 md:w-28 md:h-28"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6"
          >
            <span className="text-neon-blue">Bug</span>
            <span className="text-neon-purple">Sight</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-3 md:mb-4 max-w-3xl mx-auto px-4"
          >
            Know Your Bugs. Fix Them Faster.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base md:text-lg text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto px-4"
          >
            AI-powered error analysis that turns cryptic stack traces into clear solutions. 
            Debug smarter, not harder.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
          >
            <Link href="/app">
              <motion.button
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-neon-blue text-black font-bold rounded-lg text-base md:text-lg flex items-center justify-center gap-2 hover:bg-neon-blue/90 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore BugSight
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>

            <Link href="/app">
              <motion.button
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-transparent border-2 border-neon-purple text-neon-purple font-bold rounded-lg text-base md:text-lg hover:bg-neon-purple/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Demo
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto px-4"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold text-neon-blue">Fast</div>
              <div className="text-xs md:text-sm text-gray-400">Instant Analysis</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-neon-purple">Private</div>
              <div className="text-xs md:text-sm text-gray-400">No Accounts</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-neon-green">Smart</div>
              <div className="text-xs md:text-sm text-gray-400">AI-Powered</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <div className="w-6 h-10 border-2 border-neon-blue rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-neon-blue rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="text-neon-blue">BugSight</span>?
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to debug faster and smarter
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-neon-blue/50 transition-all"
              >
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-neon-purple">Works</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Three simple steps to bug-free code
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                step: '01',
                title: 'Paste Your Error',
                description: 'Copy your error message, stack trace, or log file and paste it into BugSight.',
                color: 'text-neon-blue'
              },
              {
                step: '02',
                title: 'Get AI Analysis',
                description: 'Our AI instantly analyzes the error and provides a clear explanation in plain English.',
                color: 'text-neon-purple'
              },
              {
                step: '03',
                title: 'Apply the Fix',
                description: 'Follow step-by-step solutions or use our suggested code fix to resolve the issue.',
                color: 'text-neon-green'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex gap-6 items-start"
              >
                <div className={`text-6xl font-bold ${item.color} opacity-20`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-2xl p-12 border border-neon-blue/30"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Squash Some Bugs?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Start debugging smarter today. No signup required.
          </p>
          <Link href="/app">
            <motion.button
              className="px-10 py-5 bg-neon-blue text-black font-bold rounded-lg text-xl flex items-center gap-3 mx-auto neon-border hover:bg-neon-blue/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          <p>© 2026 BugSight. Built with ❤️ for developers.</p>
        </div>
      </footer>
    </div>
  )
}
