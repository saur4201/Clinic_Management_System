export type ID = string

export interface Patient {
  id: ID
  name: string
  dob?: string
  phone?: string
  notes?: string
}

export interface Doctor {
  id: ID
  name: string
  specialty?: string
}

export interface Appointment {
  id: ID
  patientId: ID
  doctorId?: ID
  date: string
  notes?: string
}
