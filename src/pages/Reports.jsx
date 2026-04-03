import { Card, SectionHeader, StatCard } from '../components/ui'
import { fmtShort } from '../utils/helpers'
import { salesData, topProducts, stats } from '../data/mockData'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { Download } from 'lucide-react'

const kpiData = [
  { label: 'Jami Daromad', value: fmtShort(stats.totalRevenue), target: fmtShort(200_000_000), pct: 94, color: 'bg-navy-500' },
  { label: 'Sotuv Buyurtmalari', value: stats.totalOrders, target: 400, pct: 87, color: 'bg-blue-500' },
  { label: 'Mijoz Qoniqishi', value: '94%', target: '95%', pct: 99, color: 'bg-green-500' },
  { label: 'Vaqtida Yetkazish', value: '88%', target: '90%', pct: 98, color: 'bg-amber-500' },
]

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button className="btn-secondary"><Download size={15} /> Excel</button>
        <button className="btn-secondary"><Download size={15} /> PDF</button>
      </div>

      {/* KPI Cards */}
      <Card>
        <SectionHeader title="KPI Ko'rsatkichlari (2026)" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiData.map((k, i) => (
            <div key={i} className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{k.label}</p>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-display font-700 text-slate-900">{k.value}</span>
                <span className="text-xs text-slate-400">/ {k.target}</span>
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${k.color}`} style={{ width: `${k.pct}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-1 text-right">{k.pct}% maqsad</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <SectionHeader title="Oylik Sotuv (mln so'm)" />
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={salesData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                formatter={(v) => [v + ' mln', 'Sotuv']}
              />
              <Bar dataKey="revenue" fill="#1A3C6B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionHeader title="Buyurtmalar Dinamikasi" />
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={salesData} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                formatter={(v) => [v + ' ta', 'Buyurtmalar']}
              />
              <Line type="monotone" dataKey="orders" stroke="#2E75B6" strokeWidth={2.5} dot={{ r: 3, fill: '#2E75B6' }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top products table */}
      <Card>
        <SectionHeader title="Top Mahsulotlar Hisoboti" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                {['#', 'Mahsulot', 'SKU', 'Sotilgan', 'Daromad', 'Qoldiq', 'Ulush'].map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topProducts.map((p, i) => {
                const totalRevenue = topProducts.reduce((s, x) => s + x.revenue, 0)
                const pct = Math.round((p.revenue / totalRevenue) * 100)
                return (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-100 text-amber-700' : i === 1 ? 'bg-slate-100 text-slate-600' : i === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-400'}`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800">{p.name}</td>
                    <td className="px-4 py-3"><span className="font-mono text-xs text-slate-500">{p.sku}</span></td>
                    <td className="px-4 py-3 font-medium">{p.sold} ta</td>
                    <td className="px-4 py-3 font-medium text-navy-600">{fmtShort(p.revenue)}</td>
                    <td className="px-4 py-3">
                      <span className={`badge ${p.stock < 20 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>{p.stock} ta</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden w-24">
                          <div className="h-full bg-navy-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-slate-500">{pct}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
