import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar({ collapsed }: { collapsed?: boolean }) {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <nav>
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="icon">🏠</span>
              <span className="label">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/patients" className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="icon">🧑‍🤝‍🧑</span>
              <span className="label">Patients</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctors" className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="icon">👩‍⚕️</span>
              <span className="label">Doctors</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/appointments" className={({ isActive }) => (isActive ? 'active' : '')}>
              <span className="icon">📅</span>
              <span className="label">Appointments</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
