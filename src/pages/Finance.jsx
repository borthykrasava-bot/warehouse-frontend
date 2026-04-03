import { useState } from 'react'
import { Plus, Search, Wallet, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react'
import { Card, StatCard, Table, Tr, Td, StatusBadge, Modal, SectionHeader } from '../components/ui'
import { invoices, customers, vendors } from '../data/mockData'
import { fmtShort, fmt } from '../utils/helpers'

const totalUnpaid = invoices.filter(i => i.status === 'unpaid').reduce((s, i) => s + i.amount, 0)
const totalPaid   = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
const salesInv    = invoices.filter(i => i.type === 'sale')
const purchInv    = invoices.filter(i => i.type === 'purchase')

export default function Finance() {
  const [tab, setTab]     = useState('invoices')
  const [modal, setModal] = useState(false)
  const [payModal, setPayModal] = useState(null)
  const [search, setSearch]     = useState('')

  const filtered = invoices.filter(inv =>
    inv.party.toLowerCase().includes(search.toLowerCase()) ||
    inv.id.toLowerCase().includes(search.toLowerCase())
  )

  const tabs = [
    { key: 'invoices',  label: 'Invoicelar' },
    { key: 'cashflow',  label: "Pul Oqimi" },
  ]

  // Simple cash-flow mock data
  const cashRows = [
    { date: '2026-04-02', desc: "TechBazar Market — SO-2026-127 to'lovi",      type: 'income',  amount: 5_600_000,  method: 'Bank' },
    { date: '2026-04-01', desc: "Apple Distribution UZ — avans to'lov",         type: 'expense', amount: 20_000_000, method: 'Bank' },
    { date: '2026-03-31', desc: "Alif Technologies — SO-2026-126 to'lovi",      type: 'income',  amount: 2_000_000,  method: 'Naqd' },
    { date: '2026-03-30', desc: "LG Electronics — PO-2026-039 to'lovi",         type: 'expense', amount: 14_400_000, method: 'Bank' },
    { date: '2026-03-29', desc: "iStore Samarqand — SO-2026-124 to'lovi",       type: 'income',  amount: 12_000_000, method: 'Bank' },
    { date: '2026-03-28', desc: "Samsung Electronics — qisman to'lov",          type: 'expense', amount: 9_000_000,  method: 'Bank' },
    { date: '2026-03-27', desc: "Digital World UZ — SO-2026-123 to'lovi",       type: 'income',  amount: 4_200_000,  method: 'Naqd' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Jami Invoice" value={invoices.length} sub="barcha turlar" color="navy" />
        <StatCard
          title="To'lanmagan"
          value={fmtShort(totalUnpaid)}
          sub={`${invoices.filter(i => i.status === 'unpaid').length} ta invoice`}
          color="red"
        />
        <StatCard
          title="To'langan"
          value={fmtShort(totalPaid)}
          sub={`${invoices.filter(i => i.status === 'paid').length} ta invoice`}
          color="green"
        />
        <StatCard
          title="Sotuv Invoicelari"
          value={salesInv.length}
          sub={`Xarid: ${purchInv.length}`}
          color="blue"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="btn-primary" onClick={() => setModal(true)}>
          <Plus size={15} /> Yangi Invoice
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

      {/* Invoices tab */}
      {tab === 'invoices' && (
        <Card padding={false}>
          <div className="p-5 pb-0 flex items-center justify-between gap-4">
            <SectionHeader title="Hisob-Fakturalar" />
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input className="input pl-9 text-sm py-2 w-56" placeholder="Qidirish..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>
          <Table headers={['Invoice #', 'Tur', 'Tomon', 'Sana', 'Muddat', 'Miqdor', 'Holati', 'Amal']}>
            {filtered.map(inv => (
              <Tr key={inv.id}>
                <Td><span className="font-mono text-xs font-medium text-navy-600">{inv.id}</span></Td>
                <Td><StatusBadge status={inv.type} /></Td>
                <Td><span className="font-medium text-slate-800">{inv.party}</span></Td>
                <Td><span className="text-slate-500">{inv.date}</span></Td>
                <Td>
                  <span className={`text-sm ${new Date(inv.due) < new Date() && inv.status !== 'paid' ? 'text-red-600 font-medium' : 'text-slate-500'}`}>
                    {inv.due}
                  </span>
                </Td>
                <Td><span className="font-medium text-navy-600">{fmtShort(inv.amount)}</span></Td>
                <Td><StatusBadge status={inv.status} /></Td>
                <Td>
                  {inv.status !== 'paid' && (
                    <button
                      className="text-xs text-navy-600 hover:text-navy-800 font-medium flex items-center gap-1"
                      onClick={() => setPayModal(inv)}
                    >
                      <ArrowUpRight size={12} /> To'lash
                    </button>
                  )}
                </Td>
              </Tr>
            ))}
          </Table>
        </Card>
      )}

      {/* Cash flow tab */}
      {tab === 'cashflow' && (
        <Card padding={false}>
          <div className="p-5 pb-0">
            <SectionHeader title="Pul Oqimi (Cash Flow)" />
          </div>
          <Table headers={['Sana', 'Tavsif', 'Tur', 'Usul', 'Miqdor']}>
            {cashRows.map((r, i) => (
              <Tr key={i}>
                <Td><span className="text-slate-500">{r.date}</span></Td>
                <Td><span className="font-medium text-slate-700">{r.desc}</span></Td>
                <Td>
                  <span className={`flex items-center gap-1 text-xs font-medium ${r.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                    {r.type === 'income' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {r.type === 'income' ? 'Kirim' : 'Chiqim'}
                  </span>
                </Td>
                <Td><span className="badge bg-slate-100 text-slate-600">{r.method}</span></Td>
                <Td>
                  <span className={`font-semibold ${r.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                    {r.type === 'income' ? '+' : '-'}{fmtShort(r.amount)}
                  </span>
                </Td>
              </Tr>
            ))}
          </Table>
        </Card>
      )}

      {/* New Invoice Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title="Yangi Invoice"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModal(false)}>Bekor</button>
            <button className="btn-primary" onClick={() => setModal(false)}>Yaratish</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Invoice Turi</label>
            <select className="select">
              <option value="sale">Sotuv Invoice</option>
              <option value="purchase">Xarid Invoice</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Tomon (Mijoz/Vendor)</label>
            <input type="text" className="input" placeholder="Kompaniya nomi..." />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Sana</label>
              <input type="date" className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">To'lov muddati</label>
              <input type="date" className="input" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Miqdor (so'm)</label>
            <input type="number" className="input" placeholder="0" min="0" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Izoh</label>
            <textarea className="input resize-none h-16" placeholder="Qo'shimcha ma'lumot..." />
          </div>
        </div>
      </Modal>

      {/* Pay Modal */}
      <Modal
        open={!!payModal}
        onClose={() => setPayModal(null)}
        title="To'lovni Qayd Etish"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setPayModal(null)}>Bekor</button>
            <button className="btn-primary" onClick={() => setPayModal(null)}>To'lovni Saqlash</button>
          </>
        }
      >
        {payModal && (
          <div className="space-y-4">
            <div className="p-3 bg-navy-50 rounded-xl text-sm">
              <p className="text-navy-800 font-medium">{payModal.id}</p>
              <p className="text-navy-600">{payModal.party}</p>
              <p className="text-navy-700 font-semibold mt-1">{fmt(payModal.amount)}</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">To'lov Usuli</label>
              <select className="select">
                <option value="bank">Bank o'tkazmasi</option>
                <option value="cash">Naqd pul</option>
                <option value="card">Karta</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">To'lov Miqdori (so'm)</label>
              <input type="number" className="input" defaultValue={payModal.amount} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">To'lov Sanasi</label>
              <input type="date" className="input" defaultValue={new Date().toISOString().split('T')[0]} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Izoh</label>
              <textarea className="input resize-none h-16" placeholder="To'lov izohi..." />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
