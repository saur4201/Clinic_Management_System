import React from 'react'

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>
  )
}
