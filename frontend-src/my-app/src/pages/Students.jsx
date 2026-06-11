import { useState } from 'react'

const initialStudents = [
  { id: 1, name: 'Emma Wilson', email: 'emma.wilson@example.com', class: 'Grade 10-A', roll: '101', status: 'Active' },
  { id: 2, name: 'James Brown', email: 'james.brown@example.com', class: 'Grade 10-A', roll: '102', status: 'Active' },
  { id: 3, name: 'Sophia Lee', email: 'sophia.lee@example.com', class: 'Grade 10-A', roll: '103', status: 'Active' },
  { id: 4, name: 'Michael Chen', email: 'michael.chen@example.com', class: 'Grade 10-B', roll: '201', status: 'Active' },
  { id: 5, name: 'Olivia Davis', email: 'olivia.davis@example.com', class: 'Grade 10-B', roll: '202', status: 'Active' },
  { id: 6, name: 'Liam Taylor', email: 'liam.taylor@example.com', class: 'Grade 10-B', roll: '203', status: 'Inactive' },
  { id: 7, name: 'Ava Martinez', email: 'ava.martinez@example.com', class: 'Grade 10-A', roll: '104', status: 'Active' },
  { id: 8, name: 'Noah Johnson', email: 'noah.johnson@example.com', class: 'Grade 10-A', roll: '105', status: 'Active' },
]

export default function Students() {
  const [students, setStudents] = useState(initialStudents)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', class: '', roll: '' })

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  )

  function openAdd() {
    setEditing(null)
    setForm({ name: '', email: '', class: '', roll: '' })
    setShowModal(true)
  }

  function openEdit(student) {
    setEditing(student.id)
    setForm({ name: student.name, email: student.email, class: student.class, roll: student.roll })
    setShowModal(true)
  }

  function handleSave(e) {
    e.preventDefault()
    if (editing) {
      setStudents(prev => prev.map(s => s.id === editing ? { ...s, ...form } : s))
    } else {
      setStudents(prev => [...prev, { ...form, id: Date.now(), status: 'Active' }])
    }
    setShowModal(false)
  }

  function handleDelete(id) {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(s => s.id !== id))
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Students</h1>
          <p>Manage all registered students</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Add Student
        </button>
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{ flex: 1, maxWidth: 320 }}>
            <input
              className="form-control"
              placeholder="Search students..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{filtered.length} students</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Class</th>
                <th>Roll No</th>
                <th>Status</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="student-info">
                      <div className="student-avatar">{s.name.charAt(0)}</div>
                      <span className="student-name">{s.name}</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--gray-500)' }}>{s.email}</td>
                  <td>{s.class}</td>
                  <td>{s.roll}</td>
                  <td>
                    <span className={`badge ${s.status === 'Active' ? 'badge-present' : 'badge-absent'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <button className="btn btn-sm btn-secondary" onClick={() => openEdit(s)} style={{ marginRight: 6 }}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6}>
                    <div className="empty-state">
                      <p>No students found matching your search.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }} onClick={() => setShowModal(false)}>
          <div className="card" style={{ width: 480, maxWidth: '90vw' }} onClick={e => e.stopPropagation()}>
            <div className="card-header">
              <h2>{editing ? 'Edit Student' : 'Add Student'}</h2>
              <button className="btn btn-sm btn-secondary" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="card-body">
              <form onSubmit={handleSave}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input className="form-control" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input className="form-control" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Class</label>
                    <select className="form-control" required value={form.class} onChange={e => setForm({ ...form, class: e.target.value })}>
                      <option value="">Select class</option>
                      <option>Grade 10-A</option>
                      <option>Grade 10-B</option>
                      <option>Grade 9-A</option>
                      <option>Grade 9-B</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Roll Number</label>
                    <input className="form-control" required value={form.roll} onChange={e => setForm({ ...form, roll: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add'} Student</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
