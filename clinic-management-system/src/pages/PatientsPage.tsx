import React, { useState } from 'react'
import { api } from '../api/localApi'
import Modal from '../components/Modal'
import { Patient } from '../types'

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(api.listPatients())
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', dob: '' })

  function refresh() {
    setPatients(api.listPatients())
  }

  function add() {
    api.createPatient({ name: form.name, phone: form.phone, dob: form.dob })
    setOpen(false)
    setForm({ name: '', phone: '', dob: '' })
    refresh()
  }

  function remove(id: string) {
    if (!confirm('Delete patient?')) return
    api.deletePatient(id)
    refresh()
  }

  return (
    <div>
      <h2>Patients</h2>
      <button onClick={() => setOpen(true)}>Add Patient</button>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Phone</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.dob}</td>
              <td>{p.phone}</td>
              <td>
                <button onClick={() => remove(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3>New Patient</h3>
          <label>
            Name
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>
            DOB
            <input value={form.dob} onChange={e => setForm({ ...form, dob: e.target.value })} type="date" />
          </label>
          <label>
            Phone
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </label>
          <div className="modal-actions">
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button onClick={add}>Create</button>
          </div>
        </Modal>
      )}
    </div>
  )
}
