import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import PatientsPage from './pages/PatientsPage'
import DoctorsPage from './pages/DoctorsPage'
import AppointmentsPage from './pages/AppointmentsPage'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { useState } from 'react'

export default function App() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={`app-root ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Header onToggle={() => setCollapsed(v => !v)} collapsed={collapsed} />
      <div className="layout">
        <Sidebar collapsed={collapsed} />
        <main className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
