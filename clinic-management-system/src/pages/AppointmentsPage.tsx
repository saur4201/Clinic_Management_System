import React, { useState } from 'react'
import { api } from '../api/localApi'
import Modal from '../components/Modal'
import { Appointment } from '../types'

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(api.listAppointments())
  const patients = api.listPatients()
  const doctors = api.listDoctors()

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ patientId: patients[0]?.id ?? '', doctorId: doctors[0]?.id ?? '', date: '' })

  function refresh() {
    setAppointments(api.listAppointments())
  }

  function add() {
    api.createAppointment({ patientId: form.patientId, doctorId: form.doctorId || undefined, date: form.date })
    setOpen(false)
    refresh()
  }

  function remove(id: string) {
    if (!confirm('Delete appointment?')) return
    api.deleteAppointment(id)
    refresh()
  }

  return (
    <div>
      <h2>Appointments</h2>
      <button onClick={() => setOpen(true)}>Add Appointment</button>
      <table className="table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {appointments.map(a => (
            <tr key={a.id}>
              <td>{patients.find(p => p.id === a.patientId)?.name ?? 'Unknown'}</td>
              <td>{doctors.find(d => d.id === a.doctorId)?.name ?? 'Unassigned'}</td>
              <td>{new Date(a.date).toLocaleString()}</td>
              <td>
                <button onClick={() => remove(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <h3>New Appointment</h3>
          <label>
            Patient
            <select value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })}>
              {patients.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Doctor
            <select value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })}>
              <option value="">Unassigned</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Date & Time
            <input type="datetime-local" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
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
