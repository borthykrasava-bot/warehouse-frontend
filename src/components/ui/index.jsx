import { statusClass, statusLabel } from '../../utils/helpers'
import { ChevronUp, ChevronDown, Minus } from 'lucide-react'

// ─── StatCard ───────────────────────────────────────────────────────────────
export function StatCard({ title, value, sub, growth, icon: Icon, color = 'navy' }) {
  const colors = {
    navy:    'bg-navy-50 text-navy-600',
    green:   'bg-green-50 text-green-600',
    amber:   'bg-amber-50 text-amber-600',
    red:     'bg-red-50 text-red-600',
    blue:    'bg-blue-50 text-blue-600',
  }
  const pos = growth > 0
  const neu = growth === 0

  return (
    <div className="stat-card animate-slide-up">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{title}</p>
        {Icon && (
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[color]}`}>
            <Icon size={15} />
          </div>
        )}
      </div>
      <p className="text-2xl font-display font-700 text-slate-900 mt-1 leading-tight">{value}</p>
      {(growth !== undefined || sub) && (
        <div className="flex items-center gap-2 mt-1">
          {growth !== undefined && (
            <span className={`flex items-center gap-0.5 text-xs font-medium ${pos ? 'text-green-600' : neu ? 'text-slate-400' : 'text-red-500'}`}>
              {pos ? <ChevronUp size={12} /> : neu ? <Minus size={12} /> : <ChevronDown size={12} />}
              {Math.abs(growth)}%
            </span>
          )}
          {sub && <span className="text-xs text-slate-400">{sub}</span>}
        </div>
      )}
    </div>
  )
}

// ─── Badge / Status ──────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  return (
    <span className={statusClass[status] || 'badge bg-slate-100 text-slate-600'}>
      {statusLabel[status] || status}
    </span>
  )
}

// ─── Table ───────────────────────────────────────────────────────────────────
export function Table({ headers, children, className = '' }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100">
            {headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">{children}</tbody>
      </table>
    </div>
  )
}

export function Tr({ children, onClick }) {
  return (
    <tr className={`table-row-hover ${onClick ? 'cursor-pointer' : ''}`} onClick={onClick}>
      {children}
    </tr>
  )
}

export function Td({ children, className = '' }) {
  return (
    <td className={`px-4 py-3 text-slate-700 whitespace-nowrap ${className}`}>
      {children}
    </td>
  )
}

// ─── Empty State ─────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, message = 'Ma\'lumot topilmadi' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      {Icon && <Icon size={36} className="mb-3 opacity-40" />}
      <p className="text-sm">{message}</p>
    </div>
  )
}

// ─── Modal ───────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-display font-700 text-base text-slate-900">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            ×
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Card ────────────────────────────────────────────────────────────────────
export function Card({ children, className = '', padding = true }) {
  return (
    <div className={`card ${padding ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  )
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="section-title mb-0">{title}</h2>
      {action}
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, max, color = 'navy' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  const colors = {
    navy:  'bg-navy-500',
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red:   'bg-red-500',
  }
  return (
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all ${colors[color]}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
export function Stars({ n }) {
  return (
    <span className="text-amber-400 text-sm">
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  )
}
