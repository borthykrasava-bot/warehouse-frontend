import { useState } from 'react'
import { Bell, Search, X, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { notifications as notifData } from '../data/mockData'

export default function Topbar({ title }) {
  const { user } = useAuth()
  const [showNotifs, setShowNotifs] = useState(false)
  const [notifs, setNotifs] = useState(notifData)
  const unread = notifs.filter(n => !n.read).length

  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })))

  const typeIcon = (t) => ({
    warning: <AlertTriangle size={14} className="text-amber-500" />,
    info:    <Info size={14} className="text-blue-500" />,
    success: <CheckCircle size={14} className="text-green-500" />,
  })[t] || <Info size={14} />

  return (
    <header className="topbar fixed top-0 right-0 z-20 px-6 gap-4"
      style={{ left: 'var(--sidebar-w)' }}>

      {/* Title */}
      <div className="flex-1">
        <h1 className="font-display text-lg font-700 text-slate-900">{title}</h1>
      </div>

      {/* Search */}
      <div className="relative hidden md:block">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          className="input pl-9 w-56 text-sm py-2"
          placeholder="Qidirish..."
        />
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
        >
          <Bell size={18} className="text-slate-600" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>

        {showNotifs && (
          <div className="absolute right-0 top-12 w-80 card shadow-xl z-50 overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-800">
                Bildirishnomalar {unread > 0 && <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-600 rounded-full text-xs">{unread}</span>}
              </span>
              <div className="flex gap-2">
                {unread > 0 && (
                  <button onClick={markAllRead} className="text-xs text-navy-500 hover:text-navy-700">
                    Barchasini o'qi
                  </button>
                )}
                <button onClick={() => setShowNotifs(false)}>
                  <X size={14} className="text-slate-400" />
                </button>
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
              {notifs.map(n => (
                <div key={n.id} className={`flex gap-3 px-4 py-3 ${n.read ? '' : 'bg-blue-50/40'}`}>
                  <div className="mt-0.5 flex-shrink-0">{typeIcon(n.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 leading-snug">{n.message}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-xl bg-navy-600 flex items-center justify-center text-white text-xs font-semibold cursor-pointer">
        {user?.avatar || 'U'}
      </div>
    </header>
  )
}
