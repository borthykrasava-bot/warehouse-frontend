import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import Topbar from '../components/sidebar/Topbar'

const titles = {
  '/':            'Dashboard',
  '/warehouse':   'Ombor Boshqaruvi',
  '/procurement': 'Xarid (Procurement)',
  '/sales':       'Sotuv (Sales)',
  '/finance':     'Moliya (Finance)',
  '/reports':     'Hisobotlar va Analitika',
  '/users':       'Foydalanuvchilar',
  '/settings':    'Sozlamalar',
}

export default function MainLayout({ children }) {
  const location = useLocation()
  const title = titles[location.pathname] || 'SAP Web Tizim'

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div style={{ marginLeft: 'var(--sidebar-w)' }}>
        <Topbar title={title} />
        <main style={{ paddingTop: 'var(--topbar-h)' }} className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
