import { TrendingUp, Package, ShoppingBag, Wallet, AlertTriangle } from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { StatCard, Card, SectionHeader, Table, Tr, Td, StatusBadge, ProgressBar } from '../components/ui'
import { stats, salesData, topProducts, warehouses, salesOrders } from '../data/mockData'
import { fmt, fmtShort } from '../utils/helpers'

const PIE_DATA = [
  { name: 'Sotuv',  value: 45 },
  { name: 'Xarid',  value: 28 },
  { name: 'Ombor',  value: 18 },
  { name: 'Boshqa', value: 9  },
]
const PIE_COLORS = ['#1A3C6B', '#2E75B6', '#5BA3D9', '#93C5E3']

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Jami Daromad"
          value={fmtShort(stats.totalRevenue) + " so'm"}
          growth={stats.revenueGrowth}
          sub="o'tgan oyga nisbatan"
          icon={TrendingUp}
          color="navy"
        />
        <StatCard
          title="Jami Buyurtmalar"
          value={stats.totalOrders}
          growth={stats.ordersGrowth}
          sub="bu oy"
          icon={ShoppingBag}
          color="blue"
        />
        <StatCard
          title="Ombor Mahsulotlari"
          value={stats.stockItems.toLocaleString()}
          sub={`${stats.lowStockItems} ta kam qoldi`}
          icon={Package}
          color="green"
        />
        <StatCard
          title="Kutilayotgan To'lov"
          value={fmtShort(stats.pendingPayments) + " so'm"}
          sub="invoice boyicha"
          icon={Wallet}
          color="amber"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Area chart */}
        <Card className="xl:col-span-2">
          <SectionHeader title="Sotuv Dinamikasi (2026)" />
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={salesData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="10%" stopColor="#1A3C6B" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#1A3C6B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}/>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                formatter={(v) => [v + 'mln so\'m', 'Daromad']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#1A3C6B" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie chart */}
        <Card>
          <SectionHeader title="Modul Bo'yicha" />
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" paddingAngle={3}>
                {PIE_DATA.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                formatter={(v) => [v + '%', '']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {PIE_DATA.map((d, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: PIE_COLORS[i] }} />
                {d.name} ({d.value}%)
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Top products */}
        <Card className="xl:col-span-2" padding={false}>
          <div className="p-5 pb-0">
            <SectionHeader title="Eng Ko'p Sotilgan Mahsulotlar" />
          </div>
          <Table headers={['Mahsulot', 'SKU', 'Sotilgan', 'Daromad', 'Qoldiq']}>
            {topProducts.map(p => (
              <Tr key={p.id}>
                <Td><span className="font-medium text-slate-800">{p.name}</span></Td>
                <Td><span className="font-mono text-xs text-slate-500">{p.sku}</span></Td>
                <Td><span className="font-medium">{p.sold} ta</span></Td>
                <Td><span className="text-navy-600 font-medium">{fmtShort(p.revenue)}</span></Td>
                <Td>
                  <span className={`badge ${p.stock < 20 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                    {p.stock} ta
                  </span>
                </Td>
              </Tr>
            ))}
          </Table>
        </Card>

        {/* Warehouse capacity */}
        <Card>
          <SectionHeader title="Ombor Sig'imi" />
          <div className="space-y-4">
            {warehouses.map(w => {
              const pct = Math.round((w.used / w.capacity) * 100)
              const color = pct > 80 ? 'red' : pct > 60 ? 'amber' : 'navy'
              return (
                <div key={w.id}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700">{w.name}</span>
                    <span className="text-xs text-slate-500">{pct}%</span>
                  </div>
                  <ProgressBar value={w.used} max={w.capacity} color={color} />
                  <p className="text-xs text-slate-400 mt-1">{w.used.toLocaleString()} / {w.capacity.toLocaleString()} birlik</p>
                </div>
              )
            })}
          </div>

          {/* Low stock alert */}
          <div className="mt-5 flex items-center gap-2.5 p-3 bg-amber-50 rounded-xl">
            <AlertTriangle size={16} className="text-amber-500 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-amber-800">Kam qolgan mahsulotlar</p>
              <p className="text-xs text-amber-600">{stats.lowStockItems} ta mahsulot minimal chegarada</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent orders */}
      <Card padding={false}>
        <div className="p-5 pb-0">
          <SectionHeader title="So'nggi Sotuv Buyurtmalari" />
        </div>
        <Table headers={['Buyurtma #', 'Mijoz', 'Sana', 'Miqdor', 'Holati', "To'lov"]}>
          {salesOrders.map(o => (
            <Tr key={o.id}>
              <Td><span className="font-mono text-xs font-medium text-navy-600">{o.id}</span></Td>
              <Td><span className="font-medium text-slate-800">{o.customer}</span></Td>
              <Td><span className="text-slate-500">{o.date}</span></Td>
              <Td><span className="font-medium">{fmtShort(o.total)}</span></Td>
              <Td><StatusBadge status={o.status} /></Td>
              <Td><StatusBadge status={o.payStatus} /></Td>
            </Tr>
          ))}
        </Table>
      </Card>
    </div>
  )
}
