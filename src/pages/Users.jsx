import { useState } from 'react'
import { Plus, Search, Shield } from 'lucide-react'
import { Card, Table, Tr, Td, StatusBadge, Modal, SectionHeader } from '../components/ui'
import { users } from '../data/mockData'

const roles = ['Admin', 'Warehouse Manager', 'Sales Manager', 'Procurement Manager', 'Accountant']

const roleColor = {
  'Admin':                'badge bg-navy-100 text-navy-700',
  'Warehouse Manager':    'badge bg-blue-50 text-blue-700',
  'Sales Manager':        'badge bg-amber-50 text-amber-700',
  'Procurement Manager':  'badge bg-green-50 text-green-700',
  'Accountant':           'badge bg-purple-50 text-purple-700',
}

export default function Users() {
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stat row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="stat-card">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Jami</p>
          <p className="text-2xl font-display font-700 text-slate-900">{users.length}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Faol</p>
          <p className="text-2xl font-display font-700 text-green-600">{users.filter(u => u.status === 'active').length}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Nofaol</p>
          <p className="text-2xl font-display font-700 text-slate-400">{users.filter(u => u.status !== 'active').length}</p>
        </div>
        <div className="stat-card">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Rollar</p>
          <p className="text-2xl font-display font-700 text-slate-900">{roles.length}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9 text-sm py-2 w-64" placeholder="Qidirish..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn-primary" onClick={() => setModal(true)}>
          <Plus size={15} /> Yangi Foydalanuvchi
        </button>
      </div>

      {/* Users table */}
      <Card padding={false}>
        <div className="p-5 pb-0">
          <SectionHeader title="Foydalanuvchilar Ro'yxati" />
        </div>
        <Table headers={['Foydalanuvchi', 'Email', 'Rol', 'Oxirgi Kirish', 'Holati', 'Amallar']}>
          {filtered.map(u => (
            <Tr key={u.id}>
              <Td>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-navy-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <span className="font-medium text-slate-800">{u.name}</span>
                </div>
              </Td>
              <Td><span className="text-slate-500 text-sm">{u.email}</span></Td>
              <Td>
                <span className={roleColor[u.role] || 'badge bg-slate-100 text-slate-600'}>
                  {u.role}
                </span>
              </Td>
              <Td><span className="text-slate-400 text-xs">{u.lastLogin}</span></Td>
              <Td><StatusBadge status={u.status} /></Td>
              <Td>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-navy-500 hover:text-navy-700 font-medium">Tahrirlash</button>
                  <span className="text-slate-300">|</span>
                  <button className="text-xs text-red-400 hover:text-red-600 font-medium">O'chirish</button>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      {/* Roles info */}
      <Card>
        <SectionHeader title="Rollar va Huquqlar" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {[
            { role: 'Admin', perms: ['Barcha modullar', 'Foydalanuvchi boshqaruvi', 'Sozlamalar', 'Hisobotlar'] },
            { role: 'Warehouse Manager', perms: ['Ombor moduli', 'Goods Receipt/Issue', 'Transfer', 'Stock hisoboti'] },
            { role: 'Sales Manager', perms: ['Sotuv buyurtmalari', 'Mijozlar bazasi', 'Delivery', 'Sotuv hisoboti'] },
            { role: 'Procurement Manager', perms: ['Xarid buyurtmalari', 'Vendorlar bazasi', 'Goods Receipt', 'Xarid hisoboti'] },
            { role: 'Accountant', perms: ['Invoice', "To'lovlar", 'Moliya hisoboti', 'Cash flow'] },
          ].map((r, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={14} className="text-navy-500" />
                <span className={roleColor[r.role] || 'badge'}>{r.role}</span>
              </div>
              <ul className="space-y-1">
                {r.perms.map((p, j) => (
                  <li key={j} className="text-xs text-slate-600 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-navy-400 flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>

      {/* New User Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Yangi Foydalanuvchi"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModal(false)}>Bekor</button>
            <button className="btn-primary" onClick={() => setModal(false)}>Yaratish</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">To'liq Ism</label>
            <input type="text" className="input" placeholder="Ism Familiya" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
            <input type="email" className="input" placeholder="email@company.uz" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Rol</label>
            <select className="select">
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Parol</label>
            <input type="password" className="input" placeholder="Vaqtinchalik parol..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Parolni Tasdiqlash</label>
            <input type="password" className="input" placeholder="Qayta kiriting..." />
          </div>
        </div>
      </Modal>
    </div>
  )
}
