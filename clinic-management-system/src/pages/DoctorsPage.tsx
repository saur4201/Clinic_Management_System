import React, { useState } from 'react'
import { api } from '../api/localApi'
import Modal from '../components/Modal'
import { Doctor } from '../types'

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(api.listDoctors())
  const [openCreate, setOpenCreate] = useState(false)
  const [search, setSearch] = useState('')

  const [editing, setEditing] = useState<Doctor | null>(null)
  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('')

  function refresh() {
    setDoctors(api.listDoctors())
  }

  function openCreateModal() {
    setName('')
    setSpecialty('')
    setOpenCreate(true)
  }

  function add() {
    api.createDoctor({ name, specialty })
    setOpenCreate(false)
    refresh()
  }

  function startEdit(d: Doctor) {
    setEditing(d)
    setName(d.name)
    setSpecialty(d.specialty ?? '')
  }

  function saveEdit() {
    if (!editing) return
    api.updateDoctor(editing.id, { name, specialty })
    setEditing(null)
    refresh()
  }

  function cancelEdit() {
    setEditing(null)
  }

  function remove(id: string) {
    if (!confirm('Delete doctor?')) return
    api.deleteDoctor(id)
    refresh()
  }

  const filtered = doctors.filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || (d.specialty ?? '').toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Doctors</h2>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <input
          placeholder="Search doctors..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e6eefc', flex: '1 0 320px' }}
        />
        <button onClick={openCreateModal}>Add Doctor</button>
      </div>

      <ul className="doctor-list">
        {filtered.map(d => (
          <li key={d.id} className="doctor-item">
            <div className="doctor-left">
              <div className="doctor-name">{d.name}</div>
              {d.specialty && <div className="doctor-specialty">{d.specialty}</div>}
            </div>
            <div className="doctor-actions">
              <button className="secondary" onClick={() => startEdit(d)} style={{ marginRight: 8 }}>Edit</button>
              <button className="secondary" onClick={() => remove(d.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {openCreate && (
        <Modal onClose={() => setOpenCreate(false)}>
          <h3>New Doctor</h3>
          <label>
            Name
            <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          </label>
          <label>
            Specialty
            <input value={specialty} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpecialty(e.target.value)} />
          </label>
          <div className="modal-actions">
            <button className="secondary" onClick={() => setOpenCreate(false)}>Cancel</button>
            <button onClick={add}>Create</button>
          </div>
        </Modal>
      )}

      {editing && (
        <Modal onClose={cancelEdit}>
          <h3>Edit Doctor</h3>
          <label>
            Name
            <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          </label>
          <label>
            Specialty
            <input value={specialty} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSpecialty(e.target.value)} />
          </label>
          <div className="modal-actions">
            <button className="secondary" onClick={cancelEdit}>Cancel</button>
            <button onClick={saveEdit}>Save</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
