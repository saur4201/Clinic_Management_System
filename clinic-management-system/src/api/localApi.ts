import { Patient, Doctor, Appointment, ID } from '../types'

const KEY = 'clinic_data_v1'

interface Store {
  patients: Patient[]
  doctors: Doctor[]
  appointments: Appointment[]
}

const sample: Store = {
  patients: [
    { id: 'p1', name: 'Alice Johnson', dob: '1990-05-12', phone: '555-0101' },
    { id: 'p2', name: 'Bob Martinez', dob: '1982-11-22', phone: '555-0202' }
  ],
  doctors: [
    { id: 'd1', name: 'Dr. Emma Stone', specialty: 'General' },
    { id: 'd2', name: 'Dr. John Doe', specialty: 'Cardiology' }
  ],
  appointments: [
    { id: 'a1', patientId: 'p1', doctorId: 'd1', date: '2025-10-10T09:00', notes: 'Follow up' }
  ]
}

function read(): Store {
  const raw = localStorage.getItem(KEY)
  if (!raw) {
    localStorage.setItem(KEY, JSON.stringify(sample))
    return sample
  }
  try {
    return JSON.parse(raw) as Store
  } catch (e) {
    localStorage.setItem(KEY, JSON.stringify(sample))
    return sample
  }
}

function write(store: Store) {
  localStorage.setItem(KEY, JSON.stringify(store))
}

function id() {
  return Math.random().toString(36).slice(2, 9)
}

export const api = {
  listPatients(): Patient[] {
    return read().patients
  },
  createPatient(p: Omit<Patient, 'id'>): Patient {
    const store = read()
    const newP: Patient = { ...p, id: id() }
    store.patients.push(newP)
    write(store)
    return newP
  },
  updatePatient(id: ID, patch: Partial<Patient>) {
    const store = read()
    store.patients = store.patients.map(p => (p.id === id ? { ...p, ...patch } : p))
    write(store)
  },
  deletePatient(id: ID) {
    const store = read()
    store.patients = store.patients.filter(p => p.id !== id)
    store.appointments = store.appointments.filter(a => a.patientId !== id)
    write(store)
  },

  listDoctors(): Doctor[] {
    return read().doctors
  },
  createDoctor(d: Omit<Doctor, 'id'>): Doctor {
    const store = read()
    const newD: Doctor = { ...d, id: id() }
    store.doctors.push(newD)
    write(store)
    return newD
  },
  updateDoctor(id: ID, patch: Partial<Doctor>) {
    const store = read()
    store.doctors = store.doctors.map(d => (d.id === id ? { ...d, ...patch } : d))
    write(store)
  },
  deleteDoctor(id: ID) {
    const store = read()
    store.doctors = store.doctors.filter(d => d.id !== id)
    store.appointments = store.appointments.map(a => (a.doctorId === id ? { ...a, doctorId: undefined } : a))
    write(store)
  },

  listAppointments(): Appointment[] {
    return read().appointments
  },
  createAppointment(a: Omit<Appointment, 'id'>): Appointment {
    const store = read()
    const newA: Appointment = { ...a, id: id() }
    store.appointments.push(newA)
    write(store)
    return newA
  },
  updateAppointment(id: ID, patch: Partial<Appointment>) {
    const store = read()
    store.appointments = store.appointments.map(ap => (ap.id === id ? { ...ap, ...patch } : ap))
    write(store)
  },
  deleteAppointment(id: ID) {
    const store = read()
    store.appointments = store.appointments.filter(a => a.id !== id)
    write(store)
  }
}
