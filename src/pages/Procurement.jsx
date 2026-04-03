import { useState } from 'react'
import { Plus, Search, Star } from 'lucide-react'
import { Card, StatCard, Table, Tr, Td, StatusBadge, Modal, SectionHeader, Stars } from '../components/ui'
import { purchaseOrders, vendors, products } from '../data/mockData'
import { fmtShort, fmt } from '../utils/helpers'

export default function Procurement() {
  const [tab, setTab] = useState('orders')
  const [modal, setModal] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = purchaseOrders.filter(o =>
    o.vendor.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  )

  const tabs = [
    { key: 'orders',  label: 'Xarid Buyurtmalari' },
    { key: 'vendors', label: 'Vendorlar' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Jami Buyurtmalar" value={purchaseOrders.length} sub="bu oy" color="navy" />
        <StatCard title="Kutilmoqda" value={purchaseOrders.filter(o => o.status === 'approved').length} color="amber" />
        <StatCard title="Qabul Qilingan" value={purchaseOrders.filter(o => o.status === 'received').length} color="blue" />
        <StatCard title="Vendorlar" value={vendors.length} sub="faol" color="green" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="btn-primary" onClick={() => setModal(true)}>
          <Plus size={15} /> Yangi Purchase Order
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
            <SectionHeader title="Purchase Orders" />
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="input pl-9 text-sm py-2 w-56" placeholder="Qidirish..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <Table headers={['PO Raqam', 'Vendor', 'Sana', 'Yetkazish', 'Mahsulotlar', 'Jami', 'Holati', "To'lov"]}>
            {filtered.map(o => (
              <Tr key={o.id}>
                <Td><span className="font-mono text-xs font-medium text-navy-600">{o.id}</span></Td>
                <Td><span className="font-medium text-slate-800">{o.vendor}</span></Td>
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

      {/* Vendors */}
      {tab === 'vendors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {vendors.map(v => (
            <Card key={v.id}>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600 font-display font-700 text-sm flex-shrink-0">
                  {v.name.charAt(0)}
                </div>
                <StatusBadge status={v.status} />
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{v.name}</h3>
              <Stars n={v.rating} />
              <div className="mt-3 space-y-1.5 text-sm text-slate-500">
                <p>👤 {v.contact}</p>
                <p>📞 {v.phone}</p>
                <p>✉️ {v.email}</p>
                <p>💳 To'lov muddati: <strong className="text-slate-700">{v.payTerms}</strong></p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* New PO Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Yangi Purchase Order"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModal(false)}>Bekor</button>
            <button className="btn-primary" onClick={() => setModal(false)}>Yaratish</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Vendor</label>
            <select className="select">
              <option value="">Tanlang...</option>
              {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mahsulot</label>
            <select className="select">
              <option value="">Tanlang...</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Miqdor</label>
              <input type="number" className="input" placeholder="0" />
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
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Izoh</label>
            <textarea className="input resize-none h-20" placeholder="Qo'shimcha ma'lumot..." />
          </div>
        </div>
      </Modal>
    </div>
  )
}
