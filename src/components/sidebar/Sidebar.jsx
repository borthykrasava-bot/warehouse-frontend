import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Package, ShoppingCart, TrendingUp,
  Wallet, BarChart3, Settings, Users, LogOut,
  ChevronRight, Boxes
} from 'lucide-react'
import useAuth from "../../hooks/useAuth"

const navItems = [
  {
    group: 'Asosiy',
    items: [
      { path: '/',           label: 'Dashboard',   icon: LayoutDashboard },
    ]
  },
  {
    group: 'Modullar',
    items: [
      { path: '/warehouse',   label: 'Ombor',        icon: Boxes },
      { path: '/procurement', label: 'Xarid',         icon: ShoppingCart },
      { path: '/sales',       label: 'Sotuv',          icon: TrendingUp },
      { path: '/finance',     label: 'Moliya',         icon: Wallet },
      { path: '/reports',     label: 'Hisobotlar',     icon: BarChart3 },
    ]
  },
  {
    group: 'Tizim',
    items: [
      { path: '/users',    label: 'Foydalanuvchilar', icon: Users },
      { path: '/settings', label: 'Sozlamalar',       icon: Settings },
    ]
  }
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const location = useLocation()

  return (
    <aside className="sidebar fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-5 h-16 flex items-center gap-3 border-b border-slate-100">
        <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Package size={16} className="text-white" />
        </div>
        <div>
          <div className="font-display font-700 text-sm text-slate-900 leading-tight">SAP Web</div>
          <div className="text-xs text-slate-400 leading-tight">Tizim v1.0</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
        {navItems.map((group) => (
          <div key={group.group}>
            <div className="nav-group-title">{group.group}</div>
            <div className="space-y-0.5">
              {group.items.map(({ path, label, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon size={16} className="flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {location.pathname === path && (
                    <ChevronRight size={14} className="opacity-60" />
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
          <div className="w-8 h-8 rounded-lg bg-navy-600 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
            {user?.avatar || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-slate-800 truncate">{user?.name}</div>
            <div className="text-xs text-slate-400 truncate">{user?.role}</div>
          </div>
          <button
            onClick={logout}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-red-50 hover:text-red-500"
            title="Chiqish"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
