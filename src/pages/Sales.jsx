import { useState } from 'react'
import { Plus, Search, TrendingUp } from 'lucide-react'
import { Card, StatCard, Table, Tr, Td, StatusBadge, Modal, SectionHeader } from '../components/ui'
import { salesOrders, customers, products } from '../data/mockData'
import { fmtShort, fmt } from '../utils/helpers'

export default function Sales() {
  const [tab, setTab] = useState('orders')
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = salesOrders.filter(o =>
    o.customer.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  )

  const tabs = [
    { key: 'orders',    label: 'Sotuv Buyurtmalari' },
    { key: 'customers', label: 'Mijozlar' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Jami Buyurtmalar" value={salesOrders.length} sub="bu oy" color="navy" />
        <StatCard title="Jarayonda" value={salesOrders.filter(o => o.status === 'processing').length} color="amber" />
        <StatCard title="Yetkazilgan" value={salesOrders.filter(o => o.status === 'delivered' || o.status === 'completed').length} color="green" />
        <StatCard title="Mijozlar" value={customers.length} sub="faol" color="blue" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="btn-primary" onClick={() => setModal(true)}>
          <Plus size={15} /> Yangi Sales Order
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >{t.label}</button>
        ))}
      </div>

      {/* Orders */}
      {tab === 'orders' && (
        <Card padding={false}>
          <div className="p-5 pb-0 flex items-center justify-between gap-4">
            <SectionHeader title="Sales Orders" />
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="input pl-9 text-sm py-2 w-56" placeholder="Qidirish..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <Table headers={['SO Raqam', 'Mijoz', 'Sana', 'Yetkazish', 'Mahsulotlar', 'Jami', 'Holati', "To'lov"]}>
            {filtered.map(o => (
              <Tr key={o.id}>
                <Td><span className="font-mono text-xs font-medium text-navy-600">{o.id}</span></Td>
                <Td><span className="font-medium text-slate-800">{o.customer}</span></Td>
                <Td><span className="text-slate-500">{o.date}</span></Td>
                <Td><span className="text-slate-500">{o.delivery}</span></Td>
                <Td><span className="text-slate-600">{o.items} ta</span></Td>
                <Td><span className="font-medium text-navy-600">{fmtShort(o.total)}</span></Td>
                <Td><StatusBadge status={o.status} /></Td>
                <Td><StatusBadge status={o.payStatus} /></Td>
              </Tr>
            ))}
          </Table>
        </Card>
      )}

      {/* Customers */}
      {tab === 'customers' && (
        <Card padding={false}>
          <div className="p-5 pb-0">
            <SectionHeader title="Mijozlar Bazasi" />
          </div>
          <Table headers={['Kompaniya', 'Kontakt', 'Telefon', 'Email', 'Buyurtmalar', 'Balans', 'Holati']}>
            {customers.map(c => (
              <Tr key={c.id}>
                <Td>
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-navy-100 flex items-center justify-center text-navy-600 text-xs font-bold flex-shrink-0">
                      {c.name.charAt(0)}
                    </div>
                    <span className="font-medium text-slate-800">{c.name}</span>
                  </div>
                </Td>
                <Td><span className="text-slate-600">{c.contact}</span></Td>
                <Td><span className="text-slate-500 text-xs">{c.phone}</span></Td>
                <Td><span className="text-slate-500 text-xs">{c.email}</span></Td>
                <Td><span className="font-medium">{c.orders}</span></Td>
                <Td>
                  <span className={`font-medium ${c.balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {c.balance < 0 ? '-' : ''}{fmtShort(Math.abs(c.balance))}
                  </span>
                </Td>
                <Td><StatusBadge status={c.status} /></Td>
              </Tr>
            ))}
          </Table>
        </Card>
      )}

      {/* New SO Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Yangi Sales Order"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModal(false)}>Bekor</button>
            <button className="btn-primary" onClick={() => setModal(false)}>Yaratish</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mijoz</label>
            <select className="select">
              <option value="">Tanlang...</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mahsulot</label>
            <select className="select">
              <option value="">Tanlang...</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name} — {p.stock} ta mavjud</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Miqdor</label>
              <input type="number" className="input" placeholder="0" min="1" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Narx (so'm)</label>
              <input type="number" className="input" placeholder="0" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yetkazish sanasi</label>
            <input type="date" className="input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Chegirma (%)</label>
            <input type="number" className="input" placeholder="0" min="0" max="100" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Izoh</label>
            <textarea className="input resize-none h-16" placeholder="Qo'shimcha ma'lumot..." />
          </div>
        </div>
      </Modal>
    </div>
  )
}
