import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import MainLayout from './layouts/MainLayout'
import LoginPage    from './pages/LoginPage'
import Dashboard    from './pages/Dashboard'
import Warehouse    from './pages/Warehouse'
import Procurement  from './pages/Procurement'
import Sales        from './pages/Sales'
import Finance      from './pages/Finance'
import Reports      from './pages/Reports'
import Users        from './pages/Users'
import Settings     from './pages/Settings'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <LoginPage />} />

      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout><Dashboard /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/warehouse" element={
        <ProtectedRoute>
          <MainLayout><Warehouse /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/procurement" element={
        <ProtectedRoute>
          <MainLayout><Procurement /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/sales" element={
        <ProtectedRoute>
          <MainLayout><Sales /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/finance" element={
        <ProtectedRoute>
          <MainLayout><Finance /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <MainLayout><Reports /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/users" element={
        <ProtectedRoute>
          <MainLayout><Users /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <MainLayout><Settings /></MainLayout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
