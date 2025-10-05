import { describe, it, expect, beforeEach } from 'vitest'
import { api } from './localApi'

describe('localApi', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('seeds and lists patients', () => {
    const ps = api.listPatients()
    expect(ps.length).toBeGreaterThan(0)
  })

  it('creates and deletes patient', () => {
    const p = api.createPatient({ name: 'Test', phone: '123' })
    expect(api.listPatients().some(x => x.id === p.id)).toBe(true)
    api.deletePatient(p.id)
    expect(api.listPatients().some(x => x.id === p.id)).toBe(false)
  })
})
