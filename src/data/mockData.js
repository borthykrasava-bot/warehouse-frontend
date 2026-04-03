// ─── MOCK DATA ──────────────────────────────────────────────────────────────

export const currentUser = {
  id: 1,
  name: 'Akbar Karimov',
  email: 'akbar@company.uz',
  role: 'Admin',
  avatar: 'AK',
}

export const stats = {
  totalRevenue:   187_450_000,
  revenueGrowth:  12.4,
  totalOrders:    348,
  ordersGrowth:   8.1,
  stockItems:     1_284,
  lowStockItems:  23,
  pendingPayments: 45_200_000,
  cashFlow:       92_300_000,
}

export const salesData = [
  { month: 'Yan', revenue: 95, orders: 42 },
  { month: 'Fev', revenue: 110, orders: 58 },
  { month: 'Mar', revenue: 87,  orders: 35 },
  { month: 'Apr', revenue: 145, orders: 74 },
  { month: 'May', revenue: 132, orders: 68 },
  { month: 'Iyn', revenue: 168, orders: 89 },
  { month: 'Iyl', revenue: 154, orders: 76 },
  { month: 'Avg', revenue: 187, orders: 95 },
  { month: 'Sen', revenue: 173, orders: 88 },
  { month: 'Okt', revenue: 210, orders: 112 },
  { month: 'Noy', revenue: 198, orders: 104 },
  { month: 'Dek', revenue: 234, orders: 128 },
]

export const topProducts = [
  { id: 1, name: 'MacBook Pro 14"',    sku: 'MBP-14-M3',  sold: 142, revenue: 284_000_000, stock: 38 },
  { id: 2, name: 'Samsung Galaxy S24', sku: 'SGS-24-256',  sold: 318, revenue: 190_800_000, stock: 12 },
  { id: 3, name: 'Dell XPS 15',        sku: 'DXP-15-I9',   sold: 89,  revenue: 142_400_000, stock: 24 },
  { id: 4, name: 'iPad Pro 12.9"',     sku: 'IPD-PRO-12',  sold: 204, revenue: 122_400_000, stock: 55 },
  { id: 5, name: 'AirPods Pro 2',      sku: 'AIP-PRO-2',   sold: 521, revenue: 104_200_000, stock: 87 },
]

export const products = [
  { id: 1, sku: 'MBP-14-M3',    name: 'MacBook Pro 14" M3',  category: 'Noutbuklar',   stock: 38,  minStock: 10, price: 2_000_000, unit: 'dona', status: 'active' },
  { id: 2, sku: 'SGS-24-256',   name: 'Samsung Galaxy S24',  category: 'Telefonlar',   stock: 12,  minStock: 20, price: 600_000,  unit: 'dona', status: 'low_stock' },
  { id: 3, sku: 'DXP-15-I9',    name: 'Dell XPS 15 i9',      category: 'Noutbuklar',   stock: 24,  minStock: 10, price: 1_600_000, unit: 'dona', status: 'active' },
  { id: 4, sku: 'IPD-PRO-12',   name: 'iPad Pro 12.9"',      category: 'Planshetlar',  stock: 55,  minStock: 15, price: 600_000,  unit: 'dona', status: 'active' },
  { id: 5, sku: 'AIP-PRO-2',    name: 'AirPods Pro 2',       category: 'Aksessuarlar', stock: 87,  minStock: 30, price: 200_000,  unit: 'dona', status: 'active' },
  { id: 6, sku: 'LGC-55-OLED',  name: 'LG C3 55" OLED TV',  category: 'Televizorlar', stock: 6,   minStock: 5,  price: 1_800_000, unit: 'dona', status: 'low_stock' },
  { id: 7, sku: 'SNY-WH-1000',  name: 'Sony WH-1000XM5',    category: 'Aksessuarlar', stock: 43,  minStock: 20, price: 350_000,  unit: 'dona', status: 'active' },
  { id: 8, sku: 'APL-WTC-S9',   name: 'Apple Watch S9',      category: 'Smartwatch',   stock: 29,  minStock: 10, price: 450_000,  unit: 'dona', status: 'active' },
]

export const warehouses = [
  { id: 1, name: 'Asosiy Ombor',    location: 'Toshkent, Chilonzor',  capacity: 5000, used: 3240, type: 'main' },
  { id: 2, name: 'Filial Ombor #1', location: 'Toshkent, Yunusobod',  capacity: 2000, used: 1150, type: 'branch' },
  { id: 3, name: 'Filial Ombor #2', location: 'Samarqand',            capacity: 1500, used: 890,  type: 'branch' },
  { id: 4, name: 'Tranzit Ombor',   location: 'Toshkent, Aeroport',   capacity: 800,  used: 210,  type: 'transit' },
]

export const stockMovements = [
  { id: 1,  date: '2026-04-02', type: 'receipt',  product: 'MacBook Pro 14"',   qty: 20,  warehouse: 'Asosiy Ombor',    ref: 'PO-2026-041', user: 'A.Karimov' },
  { id: 2,  date: '2026-04-02', type: 'issue',    product: 'Samsung Galaxy S24', qty: -5,  warehouse: 'Asosiy Ombor',    ref: 'SO-2026-128', user: 'B.Rahimov' },
  { id: 3,  date: '2026-04-01', type: 'transfer', product: 'iPad Pro 12.9"',     qty: 10,  warehouse: 'Filial Ombor #1', ref: 'TR-2026-018', user: 'A.Karimov' },
  { id: 4,  date: '2026-04-01', type: 'receipt',  product: 'AirPods Pro 2',      qty: 50,  warehouse: 'Asosiy Ombor',    ref: 'PO-2026-040', user: 'A.Karimov' },
  { id: 5,  date: '2026-03-31', type: 'issue',    product: 'Dell XPS 15',        qty: -3,  warehouse: 'Asosiy Ombor',    ref: 'SO-2026-127', user: 'B.Rahimov' },
  { id: 6,  date: '2026-03-31', type: 'receipt',  product: 'LG C3 55" OLED TV',  qty: 8,   warehouse: 'Asosiy Ombor',    ref: 'PO-2026-039', user: 'A.Karimov' },
]

export const purchaseOrders = [
  { id: 'PO-2026-041', vendor: 'Apple Distribution UZ', date: '2026-04-01', delivery: '2026-04-10', items: 3, total: 40_000_000, status: 'approved',  payStatus: 'pending' },
  { id: 'PO-2026-040', vendor: 'Samsung Electronics',   date: '2026-03-28', delivery: '2026-04-05', items: 2, total: 18_000_000, status: 'received',  payStatus: 'partial' },
  { id: 'PO-2026-039', vendor: 'LG Electronics CIS',    date: '2026-03-25', delivery: '2026-03-31', items: 1, total: 14_400_000, status: 'received',  payStatus: 'paid' },
  { id: 'PO-2026-038', vendor: 'Dell Technologies',     date: '2026-03-20', delivery: '2026-03-30', items: 4, total: 32_000_000, status: 'completed', payStatus: 'paid' },
  { id: 'PO-2026-037', vendor: 'Sony Electronics',      date: '2026-03-15', delivery: '2026-03-25', items: 2, total: 10_500_000, status: 'completed', payStatus: 'paid' },
  { id: 'PO-2026-036', vendor: 'Apple Distribution UZ', date: '2026-03-10', delivery: '2026-03-20', items: 5, total: 67_500_000, status: 'completed', payStatus: 'paid' },
]

export const vendors = [
  { id: 1, name: 'Apple Distribution UZ', contact: 'Saidov Jahon',   phone: '+998 71 200-10-01', email: 'j.saidov@apple-uz.com',  rating: 5, payTerms: '30 kun', status: 'active' },
  { id: 2, name: 'Samsung Electronics',   contact: 'Kim Min Jun',    phone: '+998 71 200-20-02', email: 'kim@samsung.uz',          rating: 4, payTerms: '45 kun', status: 'active' },
  { id: 3, name: 'LG Electronics CIS',    contact: 'Park Soo Young', phone: '+998 71 200-30-03', email: 'park@lg-cis.com',         rating: 4, payTerms: '30 kun', status: 'active' },
  { id: 4, name: 'Dell Technologies',     contact: 'Ivanov Sergey',  phone: '+998 71 200-40-04', email: 's.ivanov@dell.uz',        rating: 3, payTerms: '60 kun', status: 'active' },
  { id: 5, name: 'Sony Electronics',      contact: 'Tanaka Hiroshi', phone: '+998 71 200-50-05', email: 'h.tanaka@sony.uz',        rating: 5, payTerms: '30 kun', status: 'active' },
]

export const salesOrders = [
  { id: 'SO-2026-128', customer: 'Nexus Solutions LLC',  date: '2026-04-02', delivery: '2026-04-07', items: 2,  total: 3_000_000,  status: 'processing', payStatus: 'paid' },
  { id: 'SO-2026-127', customer: 'TechBazar Market',     date: '2026-04-01', delivery: '2026-04-05', items: 3,  total: 5_600_000,  status: 'delivered',  payStatus: 'paid' },
  { id: 'SO-2026-126', customer: 'Alif Technologies',    date: '2026-03-30', delivery: '2026-04-03', items: 1,  total: 2_000_000,  status: 'shipped',    payStatus: 'paid' },
  { id: 'SO-2026-125', customer: 'MediaPark Toshkent',   date: '2026-03-29', delivery: '2026-04-02', items: 5,  total: 8_950_000,  status: 'delivered',  payStatus: 'partial' },
  { id: 'SO-2026-124', customer: 'iStore Samarqand',     date: '2026-03-28', delivery: '2026-04-01', items: 10, total: 12_000_000, status: 'completed',  payStatus: 'paid' },
  { id: 'SO-2026-123', customer: 'Digital World UZ',     date: '2026-03-27', delivery: '2026-03-31', items: 3,  total: 4_200_000,  status: 'completed',  payStatus: 'paid' },
]

export const customers = [
  { id: 1, name: 'Nexus Solutions LLC',  contact: 'Hamidov Bobur',  phone: '+998 93 400-10-01', email: 'bobur@nexus.uz',       balance: -3_000_000, status: 'active', orders: 18 },
  { id: 2, name: 'TechBazar Market',     contact: 'Yusupov Dilshod', phone: '+998 90 400-20-02', email: 'd.yusupov@techbaz.uz', balance: 0,           status: 'active', orders: 34 },
  { id: 3, name: 'Alif Technologies',    contact: 'Mirzayev Sanjar', phone: '+998 94 400-30-03', email: 's.mirza@alif.uz',      balance: -2_000_000, status: 'active', orders: 27 },
  { id: 4, name: 'MediaPark Toshkent',   contact: 'Eshmatov Nodir',  phone: '+998 99 400-40-04', email: 'n.esh@mediapark.uz',   balance: -4_475_000, status: 'active', orders: 52 },
  { id: 5, name: 'iStore Samarqand',     contact: 'Tursunov Jasur',  phone: '+998 97 400-50-05', email: 'j.tursun@istore.uz',  balance: 0,           status: 'active', orders: 41 },
  { id: 6, name: 'Digital World UZ',     contact: 'Razzaqov Behzod', phone: '+998 93 400-60-06', email: 'b.razz@dworld.uz',    balance: 0,           status: 'active', orders: 23 },
]

export const invoices = [
  { id: 'INV-2026-128', type: 'sale',     party: 'Nexus Solutions LLC',  date: '2026-04-02', due: '2026-05-02', amount: 3_000_000,  status: 'unpaid',   payMethod: '' },
  { id: 'INV-2026-127', type: 'sale',     party: 'TechBazar Market',     date: '2026-04-01', due: '2026-05-01', amount: 5_600_000,  status: 'paid',     payMethod: 'Bank' },
  { id: 'INV-2026-126', type: 'sale',     party: 'Alif Technologies',    date: '2026-03-30', due: '2026-04-30', amount: 2_000_000,  status: 'paid',     payMethod: 'Naqd' },
  { id: 'INV-PO-041',   type: 'purchase', party: 'Apple Distribution UZ', date: '2026-04-01', due: '2026-05-01', amount: 40_000_000, status: 'unpaid',   payMethod: '' },
  { id: 'INV-PO-040',   type: 'purchase', party: 'Samsung Electronics',  date: '2026-03-28', due: '2026-04-28', amount: 18_000_000, status: 'partial',  payMethod: 'Bank' },
  { id: 'INV-PO-039',   type: 'purchase', party: 'LG Electronics CIS',   date: '2026-03-25', due: '2026-04-25', amount: 14_400_000, status: 'paid',     payMethod: 'Bank' },
]

export const notifications = [
  { id: 1, type: 'warning', message: 'Samsung Galaxy S24 kam qoldi (12 ta)',       time: '5 daq oldin',   read: false },
  { id: 2, type: 'info',    message: 'PO-2026-041 tasdiqlandi',                    time: '1 soat oldin',  read: false },
  { id: 3, type: 'success', message: 'SO-2026-127 yetkazib berildi',               time: '2 soat oldin',  read: false },
  { id: 4, type: 'warning', message: 'LG C3 55" OLED TV kam qoldi (6 ta)',         time: '3 soat oldin',  read: true },
  { id: 5, type: 'info',    message: "Oylik moliyaviy hisobot tayyor",              time: 'Kecha',         read: true },
]

export const users = [
  { id: 1, name: 'Akbar Karimov',   email: 'akbar@company.uz',    role: 'Admin',               status: 'active',   lastLogin: '2026-04-02 09:15' },
  { id: 2, name: 'Bobur Rahimov',   email: 'bobur@company.uz',    role: 'Warehouse Manager',   status: 'active',   lastLogin: '2026-04-02 08:42' },
  { id: 3, name: 'Dilnoza Yusupova', email: 'dilnoza@company.uz', role: 'Sales Manager',       status: 'active',   lastLogin: '2026-04-01 17:30' },
  { id: 4, name: 'Sanjar Mirzayev', email: 'sanjar@company.uz',   role: 'Procurement Manager', status: 'active',   lastLogin: '2026-04-02 07:58' },
  { id: 5, name: 'Feruza Hasanova', email: 'feruza@company.uz',   role: 'Accountant',          status: 'active',   lastLogin: '2026-04-01 16:05' },
  { id: 6, name: 'Nodir Eshmatov',  email: 'nodir@company.uz',    role: 'Warehouse Manager',   status: 'inactive', lastLogin: '2026-03-28 11:20' },
]
