# SAP Web Tizim — Frontend

SAP logikasiga asoslangan to'liq biznes boshqaruv platformasi.

## 🚀 Ishga Tushirish

```bash
# 1. O'rnatish
npm install

# 2. Dev server
npm run dev

# 3. Build
npm run build
```

## 📁 Loyiha Strukturasi

```
src/
├── App.jsx                    # Router va Provider
├── main.jsx                   # Entry point
├── index.css                  # Global styles (Tailwind)
│
├── data/
│   └── mockData.js            # Mock ma'lumotlar (API tayyor bo'lguncha)
│
├── hooks/
│   └── useAuth.jsx            # Auth context va login/logout
│
├── utils/
│   └── helpers.js             # Format funksiyalari, status labels
│
├── layouts/
│   └── MainLayout.jsx         # Sidebar + Topbar wrapper
│
├── components/
│   ├── ui/
│   │   └── index.jsx          # StatCard, Table, Modal, Badge va boshqalar
│   └── sidebar/
│       ├── Sidebar.jsx        # Navigatsiya sidebar
│       └── Topbar.jsx         # Header + notifications
│
└── pages/
    ├── LoginPage.jsx          # Autentifikatsiya
    ├── Dashboard.jsx          # Bosh sahifa, statistika, grafiklar
    ├── Warehouse.jsx          # Ombor boshqaruvi
    ├── Procurement.jsx        # Xarid va vendorlar
    ├── Sales.jsx              # Sotuv va mijozlar
    ├── Finance.jsx            # Invoice va to'lovlar
    ├── Reports.jsx            # Hisobotlar va KPI
    ├── Users.jsx              # Foydalanuvchilar
    └── Settings.jsx           # Sozlamalar
```

## 🛠 Tech Stack

| Texnologiya | Versiya | Maqsad |
|-------------|---------|--------|
| React       | 18.x    | UI framework |
| React Router | 6.x   | Client-side routing |
| Recharts    | 2.x     | Grafiklar va chartlar |
| Lucide React | 0.383  | Ikonkalar |
| Tailwind CSS | 3.x   | Styling |
| Vite        | 5.x     | Build tool |

## 🔐 Demo Login

```
Email:  akbar@company.uz
Parol:  admin123
```

## 📌 Modullar

| Modul | Sahifa | Funksiyalar |
|-------|--------|-------------|
| Dashboard | `/` | Statistika, grafiklar, so'nggi buyurtmalar |
| Warehouse | `/warehouse` | Stock, harakatlar, omborlar |
| Procurement | `/procurement` | PO, vendorlar |
| Sales | `/sales` | SO, mijozlar |
| Finance | `/finance` | Invoice, to'lovlar, cash flow |
| Reports | `/reports` | KPI, charts, eksport |
| Users | `/users` | RBAC, foydalanuvchilar |
| Settings | `/settings` | Profil, sozlamalar |

## 🔌 Backend Integratsiya

Mock data `src/data/mockData.js` faylida. API tayyor bo'lganda shu faylni API call bilan almashtiring:

```js
// Misol: mockData o'rniga real API
const products = await fetch('/api/products').then(r => r.json())
```

## 🏗 Kengaytirish

Yangi sahifa qo'shish uchun:
1. `src/pages/YangiSahifa.jsx` yarating
2. `src/App.jsx` ga route qo'shing
3. `src/components/sidebar/Sidebar.jsx` ga nav item qo'shing
