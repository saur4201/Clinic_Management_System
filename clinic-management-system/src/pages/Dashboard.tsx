import React from 'react'
import { api } from '../api/localApi'

export default function Dashboard() {
  const patients = api.listPatients().length
  const doctors = api.listDoctors().length
  const appointments = api.listAppointments().length

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card">Patients: {patients}</div>
        <div className="card">Doctors: {doctors}</div>
        <div className="card">Appointments: {appointments}</div>
      </div>
    </div>
  )
}
