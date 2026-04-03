import { useState } from 'react'
import { Card, SectionHeader } from '../components/ui'
import { useAuth } from '../hooks/useAuth'
import { Bell, Shield, Globe, Palette, Database, Save } from 'lucide-react'

export default function Settings() {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [notif, setNotif] = useState({ lowStock: true, newOrder: true, payment: true, system: false })
  const [general, setGeneral] = useState({ company: 'SAP Web Tizim', currency: 'UZS', language: 'uz', timezone: 'Asia/Tashkent' })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const Toggle = ({ value, onChange }) => (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-10 h-5 rounded-full transition-colors ${value ? 'bg-navy-600' : 'bg-slate-200'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  )

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* Profile */}
      <Card>
        <SectionHeader title="Profil Ma'lumotlari" />
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-2xl bg-navy-600 flex items-center justify-center text-white font-display font-700 text-lg">
            {user?.avatar}
          </div>
          <div>
            <p className="font-semibold text-slate-800">{user?.name}</p>
            <p className="text-sm text-slate-500">{user?.role}</p>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">To'liq Ism</label>
            <input type="text" className="input" defaultValue={user?.name} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
            <input type="email" className="input" defaultValue={user?.email} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Yangi Parol</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Parolni Tasdiqlash</label>
            <input type="password" className="input" placeholder="••••••••" />
          </div>
        </div>
      </Card>

      {/* General */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Globe size={16} className="text-navy-500" />
          <h2 className="section-title mb-0">Umumiy Sozlamalar</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Kompaniya Nomi</label>
            <input type="text" className="input" value={general.company}
              onChange={e => setGeneral({...general, company: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Valyuta</label>
            <select className="select" value={general.currency}
              onChange={e => setGeneral({...general, currency: e.target.value})}>
              <option value="UZS">UZS — O'zbek so'mi</option>
              <option value="USD">USD — Dollar</option>
              <option value="EUR">EUR — Yevro</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Til</label>
            <select className="select" value={general.language}
              onChange={e => setGeneral({...general, language: e.target.value})}>
              <option value="uz">O'zbekcha</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Vaqt Zonasi</label>
            <select className="select" value={general.timezone}
              onChange={e => setGeneral({...general, timezone: e.target.value})}>
              <option value="Asia/Tashkent">Asia/Tashkent (UTC+5)</option>
              <option value="Europe/Moscow">Europe/Moscow (UTC+3)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Bell size={16} className="text-navy-500" />
          <h2 className="section-title mb-0">Bildirishnoma Sozlamalari</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: 'lowStock', label: 'Kam qoldiq ogohlantirishlari', desc: 'Mahsulot minimal chegaraga yetganda xabardor qilish' },
            { key: 'newOrder', label: 'Yangi buyurtmalar', desc: 'Yangi sotuv yoki xarid buyurtmasi yaratilganda' },
            { key: 'payment', label: "To'lov bildirishnomalari", desc: "To'lov qabul qilingan yoki muddati o'tganda" },
            { key: 'system',  label: 'Tizim xabarlari', desc: 'Backup, xatoliklar va tizim yangilanishlari' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-slate-700">{label}</p>
                <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
              </div>
              <Toggle value={notif[key]} onChange={v => setNotif({...notif, [key]: v})} />
            </div>
          ))}
        </div>
      </Card>

      {/* Security */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-navy-500" />
          <h2 className="section-title mb-0">Xavfsizlik</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-slate-700">Ikki Faktorli Autentifikatsiya</p>
              <p className="text-xs text-slate-400">SMS yoki authenticator app orqali</p>
            </div>
            <span className="badge bg-red-50 text-red-600">O'chirilgan</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-slate-700">Session Muddati</p>
              <p className="text-xs text-slate-400">Faolsizlik vaqtidan so'ng chiqish</p>
            </div>
            <select className="select w-auto text-xs py-1.5 px-3">
              <option>30 daqiqa</option>
              <option>1 soat</option>
              <option>8 soat</option>
              <option>24 soat</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-slate-700">Audit Log</p>
              <p className="text-xs text-slate-400">Barcha amallar yozib boriladi</p>
            </div>
            <span className="badge bg-green-50 text-green-700">Yoqilgan</span>
          </div>
        </div>
      </Card>

      {/* Save button */}
      <div className="flex justify-end">
        <button className="btn-primary px-8 py-3" onClick={handleSave}>
          <Save size={15} />
          {saved ? 'Saqlandi ✓' : 'Saqlash'}
        </button>
      </div>
    </div>
  )
}
