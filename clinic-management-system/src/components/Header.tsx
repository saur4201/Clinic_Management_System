import React from 'react'

export default function Header({ onToggle, collapsed }: { onToggle?: () => void; collapsed?: boolean }) {
  return (
    <header className="header">
      <div className="container header-row">
        <div className="brand">
          <button className="menu-btn" onClick={onToggle} aria-label="Toggle sidebar">
            {collapsed ? '☰' : '≡'}
          </button>
          <div>
            <div className="title">Clinic Management</div>
            <div className="subtitle">Simple clinic dashboard</div>
          </div>
        </div>
        <div className="actions">
          <button className="ghost">Profile</button>
        </div>
      </div>
    </header>
  )
}
