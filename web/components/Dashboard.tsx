'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Clock, TrendingUp, AlertCircle } from 'lucide-react'
import ErrorDetailModal from './ErrorDetailModal'

export default function Dashboard() {
  const [history, setHistory] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, recurring: 0 })
  const [selectedError, setSelectedError] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleErrorClick = (error: any) => {
    setSelectedError(error)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedError(null), 300)
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bugHistory') || '[]')
    setHistory(data)
    
    // Calculate stats
    const errorCounts: Record<string, number> = {}
    data.forEach((item: any) => {
      const key = item.error.substring(0, 50)
      errorCounts[key] = (errorCounts[key] || 0) + 1
    })
    
    const recurring = Object.values(errorCounts).filter(count => count > 1).length
    setStats({ total: data.length, recurring })
  }, [])

  const chartData = history.slice(0, 10).map((item, idx) => ({
    name: `Error ${idx + 1}`,
    count: 1,
  }))

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-neon-blue/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-neon-blue" />
            <h3 className="text-lg font-semibold">Total Errors</h3>
          </div>
          <p className="text-4xl font-bold text-neon-blue">{stats.total}</p>
        </motion.div>

        <motion.div
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-neon-purple/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-neon-purple" />
            <h3 className="text-lg font-semibold">Recurring</h3>
          </div>
          <p className="text-4xl font-bold text-neon-purple">{stats.recurring}</p>
        </motion.div>

        <motion.div
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-neon-green/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-neon-green" />
            <h3 className="text-lg font-semibold">Last 24h</h3>
          </div>
          <p className="text-4xl font-bold text-neon-green">
            {history.filter(h => {
              const diff = Date.now() - new Date(h.timestamp).getTime()
              return diff < 24 * 60 * 60 * 1000
            }).length}
          </p>
        </motion.div>
      </div>

      {/* Chart */}
      {history.length > 0 && (
        <motion.div
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #00f0ff',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#00f0ff" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Recent Errors List */}
      <motion.div
        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold mb-4">Recent Errors</h3>
        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No errors analyzed yet</p>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 10).map((item, idx) => (
              <motion.div
                key={item.id}
                className="bg-black/30 rounded-lg p-4 border border-gray-800 hover:border-neon-blue/50 transition-colors cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleErrorClick(item)}
                whileHover={{ scale: 1.02, x: 5 }}
              >
                <p className="text-sm text-gray-400 mb-1">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
                <p className="text-gray-200 font-mono text-sm truncate">
                  {item.error}
                </p>
                <p className="text-xs text-neon-blue mt-2">Click to view details →</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Error Detail Modal */}
      <ErrorDetailModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        errorData={selectedError}
      />
    </div>
  )
}
