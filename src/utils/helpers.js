export const fmt = (n) =>
  new Intl.NumberFormat('uz-UZ').format(n) + " so'm"

export const fmtShort = (n) => {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + 'mlrd'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'mln'
  if (n >= 1_000) return (n / 1_000).toFixed(0) + 'k'
  return n.toString()
}

export const clsx = (...args) =>
  args.filter(Boolean).join(' ')

export const statusLabel = {
  active:     'Faol',
  inactive:   'Nofaol',
  low_stock:  'Kam qoldi',
  draft:      'Qoralama',
  approved:   'Tasdiqlangan',
  received:   'Qabul qilingan',
  completed:  'Yakunlangan',
  cancelled:  'Bekor qilingan',
  processing: 'Jarayonda',
  shipped:    'Yuborilgan',
  delivered:  'Yetkazilgan',
  paid:       "To'langan",
  unpaid:     "To'lanmagan",
  partial:    'Qisman',
  pending:    'Kutilmoqda',
  main:       'Asosiy',
  branch:     'Filial',
  transit:    'Tranzit',
  receipt:    'Kirim',
  issue:      'Chiqim',
  transfer:   "Ko'chirish",
}

export const statusClass = {
  active:     'status-active',
  low_stock:  'status-pending',
  draft:      'status-draft',
  approved:   'status-active',
  received:   'status-completed',
  completed:  'status-completed',
  cancelled:  'status-cancelled',
  processing: 'status-pending',
  shipped:    'status-pending',
  delivered:  'status-completed',
  paid:       'status-active',
  unpaid:     'status-cancelled',
  partial:    'status-pending',
  pending:    'status-pending',
  inactive:   'status-draft',
  receipt:    'badge bg-green-50 text-green-700',
  issue:      'badge bg-red-50 text-red-700',
  transfer:   'badge bg-blue-50 text-blue-700',
  sale:       'badge bg-blue-50 text-blue-700',
  purchase:   'badge bg-amber-50 text-amber-700',
}
