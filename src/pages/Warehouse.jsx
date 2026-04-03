import { useState } from 'react'
import { Plus, Search, ArrowDownToLine, ArrowUpFromLine, ArrowLeftRight, Package, Filter } from 'lucide-react'
import { Card, StatCard, Table, Tr, Td, StatusBadge, Modal, SectionHeader, ProgressBar } from '../components/ui'
import { products, warehouses, stockMovements } from '../data/mockData'
import { statusClass, statusLabel } from '../utils/helpers'

export default function Warehouse() {
  const [tab, setTab] = useState('stock')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null) // 'receipt' | 'issue' | 'transfer' | null
  const [form, setForm] = useState({ product: '', qty: '', warehouse: '', note: '' })

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )

  const typeIcon = {
    receipt:  <ArrowDownToLine size={14} className="text-green-500" />,
    issue:    <ArrowUpFromLine size={14} className="text-red-500" />,
    transfer: <ArrowLeftRight size={14} className="text-blue-500" />,
  }

  const tabs = [
    { key: 'stock',    label: 'Qoldiqlar' },
    { key: 'movements', label: 'Harakatlar' },
    { key: 'warehouses', label: 'Omborlar' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stat row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Jami Mahsulot" value={products.length} sub="katalogda" icon={Package} color="navy" />
        <StatCard title="Kam Qoldi" value={products.filter(p => p.status === 'low_stock').length} sub="minimal chegara" icon={Package} color="amber" />
        <StatCard title="Omborlar" value={warehouses.length} sub="faol" icon={Package} color="blue" />
        <StatCard title="Harakatlar" value={stockMovements.length} sub="bu oy" icon={Package} color="green" />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={() => setModal('receipt')} className="btn-primary">
          <ArrowDownToLine size={15} /> Kirim (Goods Receipt)
        </button>
        <button onClick={() => setModal('issue')} className="btn-secondary">
          <ArrowUpFromLine size={15} /> Chiqim (Goods Issue)
        </button>
        <button onClick={() => setModal('transfer')} className="btn-secondary">
          <ArrowLeftRight size={15} /> Ko'chirish (Transfer)
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              tab === t.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Stock tab */}
      {tab === 'stock' && (
        <Card padding={false}>
          <div className="p-5 pb-0 flex items-center justify-between gap-4">
            <SectionHeader title="Joriy Qoldiqlar" />
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                className="input pl-9 text-sm py-2 w-56"
                placeholder="Qidirish..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Table headers={['SKU', 'Mahsulot', 'Kategoriya', 'Qoldiq', 'Min.Chegara', 'Narx', 'Holati']}>
            {filtered.map(p => (
              <Tr key={p.id}>
                <Td><span className="font-mono text-xs text-slate-500">{p.sku}</span></Td>
                <Td><span className="font-medium text-slate-800">{p.name}</span></Td>
                <Td><span className="badge bg-slate-100 text-slate-600">{p.category}</span></Td>
                <Td>
                  <span className={`font-semibold ${p.stock <= p.minStock ? 'text-red-600' : 'text-slate-800'}`}>
                    {p.stock} {p.unit}
                  </span>
                </Td>
                <Td><span className="text-slate-500">{p.minStock}</span></Td>
                <Td><span className="text-navy-600 font-medium">{p.price.toLocaleString()} so'm</span></Td>
                <Td><StatusBadge status={p.status} /></Td>
              </Tr>
            ))}
          </Table>
        </Card>
      )}

      {/* Movements tab */}
      {tab === 'movements' && (
        <Card padding={false}>
          <div className="p-5 pb-0">
            <SectionHeader title="Harakat Tarixi" />
          </div>
          <Table headers={['Sana', 'Tur', 'Mahsulot', 'Miqdor', 'Ombor', 'Ref. Hujjat', 'Mas\'ul']}>
            {stockMovements.map(m => (
              <Tr key={m.id}>
                <Td><span className="text-slate-500">{m.date}</span></Td>
                <Td>
                  <span className="flex items-center gap-1.5">
                    {typeIcon[m.type]}
                    <span className={statusClass[m.type]}>{statusLabel[m.type]}</span>
                  </span>
                </Td>
                <Td><span className="font-medium text-slate-800">{m.product}</span></Td>
                <Td>
                  <span className={`font-semibold ${m.qty < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {m.qty > 0 ? '+' : ''}{m.qty}
                  </span>
                </Td>
                <Td><span className="text-slate-600">{m.warehouse}</span></Td>
                <Td><span className="font-mono text-xs text-navy-600">{m.ref}</span></Td>
                <Td><span className="text-slate-500">{m.user}</span></Td>
              </Tr>
            ))}
          </Table>
        </Card>
      )}

      {/* Warehouses tab */}
      {tab === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {warehouses.map(w => {
            const pct = Math.round((w.used / w.capacity) * 100)
            const color = pct > 80 ? 'red' : pct > 60 ? 'amber' : 'navy'
            return (
              <Card key={w.id}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800">{w.name}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{w.location}</p>
                  </div>
                  <StatusBadge status={w.type} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Sig'im</span>
                    <span className="font-medium">{w.used.toLocaleString()} / {w.capacity.toLocaleString()}</span>
                  </div>
                  <ProgressBar value={w.used} max={w.capacity} color={color} />
                  <p className="text-xs text-slate-400 text-right">{pct}% ishlatilgan</p>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Receipt Modal */}
      <Modal
        open={modal === 'receipt'}
        onClose={() => setModal(null)}
        title="Kirim (Goods Receipt)"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModal(null)}>Bekor</button>
            <button className="btn-primary" onClick={() => setModal(null)}>Saqlash</button>
          </>
        }
      >
        <div className="space-y-4">
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
              <input type="number" className="input" placeholder="0" min="1" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ombor</label>
              <select className="select">
                {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">PO Raqami (ixtiyoriy)</label>
            <input type="text" className="input" placeholder="PO-2026-..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Izoh</label>
            <textarea className="input resize-none h-20" placeholder="Qo'shimcha ma'lumot..." />
          </div>
        </div>
      </Modal>

      {/* Issue Modal */}
      <Modal
        open={modal === 'issue'}
        onClose={() => setModal(null)}
        title="Chiqim (Goods Issue)"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModal(null)}>Bekor</button>
            <button className="btn-primary" onClick={() => setModal(null)}>Saqlash</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mahsulot</label>
            <select className="select">
              <option value="">Tanlang...</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.stock} ta)</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Miqdor</label>
              <input type="number" className="input" placeholder="0" min="1" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Ombor</label>
              <select className="select">
                {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Sales Order (ixtiyoriy)</label>
            <input type="text" className="input" placeholder="SO-2026-..." />
          </div>
        </div>
      </Modal>

      {/* Transfer Modal */}
      <Modal
        open={modal === 'transfer'}
        onClose={() => setModal(null)}
        title="Ko'chirish (Transfer)"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModal(null)}>Bekor</button>
            <button className="btn-primary" onClick={() => setModal(null)}>Ko'chirish</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Mahsulot</label>
            <select className="select">
              <option value="">Tanlang...</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Miqdor</label>
            <input type="number" className="input" placeholder="0" min="1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kimdan</label>
              <select className="select">
                {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kimga</label>
              <select className="select">
                {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
