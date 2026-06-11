import { useState } from 'react'
import '../styles/reports.css'

const classes = ['Grade 10-A', 'Grade 10-B', 'Grade 9-A', 'Grade 9-B']

const reportData = [
  { name: 'Emma Wilson', roll: '101', class: 'Grade 10-A', present: 22, absent: 1, late: 2, total: 25 },
  { name: 'James Brown', roll: '102', class: 'Grade 10-A', present: 20, absent: 3, late: 2, total: 25 },
  { name: 'Sophia Lee', roll: '103', class: 'Grade 10-A', present: 24, absent: 0, late: 1, total: 25 },
  { name: 'Ava Martinez', roll: '104', class: 'Grade 10-A', present: 19, absent: 4, late: 2, total: 25 },
  { name: 'Noah Johnson', roll: '105', class: 'Grade 10-A', present: 23, absent: 1, late: 1, total: 25 },
  { name: 'Michael Chen', roll: '201', class: 'Grade 10-B', present: 21, absent: 2, late: 2, total: 25 },
  { name: 'Olivia Davis', roll: '202', class: 'Grade 10-B', present: 25, absent: 0, late: 0, total: 25 },
  { name: 'Liam Taylor', roll: '203', class: 'Grade 10-B', present: 18, absent: 5, late: 2, total: 25 },
]

export default function Reports() {
  const [selectedClass, setSelectedClass] = useState('All Classes')
  const [selectedMonth, setSelectedMonth] = useState('May 2026')

  const filtered = selectedClass === 'All Classes'
    ? reportData
    : reportData.filter(s => s.class === selectedClass)

  const totalStudents = filtered.length
  const avgPresent = totalStudents ? (filtered.reduce((a, s) => a + s.present, 0) / totalStudents).toFixed(1) : 0
  const avgAbsent = totalStudents ? (filtered.reduce((a, s) => a + s.absent, 0) / totalStudents).toFixed(1) : 0
  const overallRate = totalStudents ? (filtered.reduce((a, s) => a + s.present, 0) / (filtered.reduce((a, s) => a + s.total, 0)) * 100).toFixed(1) : 0

  function getRateColor(rate) {
    if (rate >= 90) return 'green'
    if (rate >= 75) return 'yellow'
    return 'red'
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Attendance reports and analytics</p>
        </div>
        <button className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Download Report
        </button>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div className="reports-filters">
            <div className="form-group">
              <label>Class</label>
              <select className="form-control" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
                <option>All Classes</option>
                {classes.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Month</label>
              <select className="form-control" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                <option>May 2026</option>
                <option>April 2026</option>
                <option>March 2026</option>
              </select>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="report-stats">
            <div className="report-stat-card">
              <div className="value green">{avgPresent}</div>
              <div className="label">Avg. Present Days</div>
            </div>
            <div className="report-stat-card">
              <div className="value red">{avgAbsent}</div>
              <div className="label">Avg. Absent Days</div>
            </div>
            <div className="report-stat-card">
              <div className={`value ${getRateColor(overallRate)}`}>{overallRate}%</div>
              <div className="label">Attendance Rate</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Student-wise Report</h2>
          <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{filtered.length} students</span>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th>Class</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Late</th>
                <th>Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => {
                const rate = ((s.present / s.total) * 100).toFixed(1)
                const color = getRateColor(rate)
                return (
                  <tr key={s.roll}>
                    <td>
                      <div className="student-info">
                        <div className="student-avatar">{s.name.charAt(0)}</div>
                        <span className="student-name">{s.name}</span>
                      </div>
                    </td>
                    <td>{s.roll}</td>
                    <td>{s.class}</td>
                    <td style={{ color: 'var(--success)', fontWeight: 600 }}>{s.present}</td>
                    <td style={{ color: 'var(--danger)', fontWeight: 600 }}>{s.absent}</td>
                    <td style={{ color: 'var(--warning)', fontWeight: 600 }}>{s.late}</td>
                    <td>
                      <div className="attendance-bar">
                        <div className="attendance-bar-track">
                          <div className={`attendance-bar-fill ${color}`} style={{ width: `${rate}%` }} />
                        </div>
                        <span className="attendance-bar-value">{rate}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
