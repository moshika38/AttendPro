import { useState } from 'react'
import '../styles/attendance.css'

const students = [
  { id: 1, name: 'Emma Wilson', roll: '101', class: 'Grade 10-A' },
  { id: 2, name: 'James Brown', roll: '102', class: 'Grade 10-A' },
  { id: 3, name: 'Sophia Lee', roll: '103', class: 'Grade 10-A' },
  { id: 4, name: 'Ava Martinez', roll: '104', class: 'Grade 10-A' },
  { id: 5, name: 'Noah Johnson', roll: '105', class: 'Grade 10-A' },
  { id: 6, name: 'Michael Chen', roll: '201', class: 'Grade 10-B' },
  { id: 7, name: 'Olivia Davis', roll: '202', class: 'Grade 10-B' },
  { id: 8, name: 'Liam Taylor', roll: '203', class: 'Grade 10-B' },
]

const classes = ['Grade 10-A', 'Grade 10-B', 'Grade 9-A', 'Grade 9-B']

export default function Attendance() {
  const today = new Date().toISOString().split('T')[0]
  const [selectedClass, setSelectedClass] = useState('Grade 10-A')
  const [selectedDate, setSelectedDate] = useState(today)
  const [records, setRecords] = useState({})

  const filtered = students.filter(s => s.class === selectedClass)

  function getStatus(studentId) {
    const key = `${selectedDate}-${studentId}`
    return records[key] || null
  }

  function setStatus(studentId, status) {
    const key = `${selectedDate}-${studentId}`
    setRecords(prev => {
      const next = { ...prev }
      if (next[key] === status) {
        delete next[key]
      } else {
        next[key] = status
      }
      return next
    })
  }

  function markAll(status) {
    const newRecords = { ...records }
    filtered.forEach(s => {
      newRecords[`${selectedDate}-${s.id}`] = status
    })
    setRecords(newRecords)
  }

  const counts = { present: 0, absent: 0, late: 0, unmarked: 0 }
  filtered.forEach(s => {
    const status = getStatus(s.id)
    if (status === 'present') counts.present++
    else if (status === 'absent') counts.absent++
    else if (status === 'late') counts.late++
    else counts.unmarked++
  })

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Attendance</h1>
          <p>Mark attendance for students</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-sm btn-success" onClick={() => markAll('present')}>
            Mark All Present
          </button>
          <button className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            Save Attendance
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="attendance-controls">
            <div className="form-group">
              <label>Class</label>
              <select className="form-control" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                {classes.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" className="form-control" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="table-wrapper">
          <table className="attendance-grid">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const status = getStatus(s.id)
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="student-info">
                        <div className="student-avatar">{s.name.charAt(0)}</div>
                        <span className="student-name">{s.name}</span>
                      </div>
                    </td>
                    <td>{s.roll}</td>
                    <td>{s.class}</td>
                    <td>
                      <div className="attendance-actions">
                        <button
                          className={`attn-btn ${status === 'present' ? 'active-present' : ''}`}
                          onClick={() => setStatus(s.id, 'present')}
                          title="Present"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <button
                          className={`attn-btn ${status === 'late' ? 'active-late' : ''}`}
                          onClick={() => setStatus(s.id, 'late')}
                          title="Late"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        </button>
                        <button
                          className={`attn-btn ${status === 'absent' ? 'active-absent' : ''}`}
                          onClick={() => setStatus(s.id, 'absent')}
                          title="Absent"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="card-body">
          <div className="attendance-summary">
            <div className="summary-item">
              <span className="count green">{counts.present}</span>
              Present
            </div>
            <div className="summary-item">
              <span className="count yellow">{counts.late}</span>
              Late
            </div>
            <div className="summary-item">
              <span className="count red">{counts.absent}</span>
              Absent
            </div>
            <div className="summary-item">
              <span style={{ fontWeight: 700, fontSize: 18, color: 'var(--gray-400)' }}>{counts.unmarked}</span>
              Unmarked
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
