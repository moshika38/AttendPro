import { useState, useEffect } from 'react'
import '../styles/dashboard.css'

const initialStats = [
  { label: 'Total Students', value: 156, icon: 'blue' },
  { label: 'Present Today', value: 142, icon: 'green' },
  { label: 'Absent Today', value: 10, icon: 'red' },
  { label: 'Attendance Rate', value: '91%', icon: 'yellow' },
]

const recentActivity = [
  { text: <><strong>Emma Wilson</strong> marked present</>, time: '2 min ago', color: 'green' },
  { text: <><strong>James Brown</strong> marked absent</>, time: '5 min ago', color: 'red' },
  { text: <><strong>Sophia Lee</strong> marked late</>, time: '12 min ago', color: 'yellow' },
  { text: <><strong>Michael Chen</strong> marked present</>, time: '18 min ago', color: 'green' },
  { text: <><strong>Olivia Davis</strong> marked present</>, time: '25 min ago', color: 'green' },
  { text: <><strong>Liam Taylor</strong> marked absent</>, time: '1 hour ago', color: 'red' },
]

const iconSvgs = {
  blue: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  green: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
  red: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  yellow: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
}

export default function Dashboard() {
  const [stats] = useState(initialStats)
  const [activity] = useState(recentActivity)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of today's attendance</p>
        </div>
        <button className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Export Report
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <div className={`stat-icon ${stat.icon}`} dangerouslySetInnerHTML={{ __html: iconSvgs[stat.icon] }} />
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2>Recent Activity</h2>
          </div>
          <div className="card-body recent-activity">
            {activity.map((item, i) => (
              <div key={i} className="activity-item">
                <span className={`activity-dot ${item.color}`} />
                <span className="activity-text">{item.text}</span>
                <span className="activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Today's Summary</h2>
          </div>
          <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '12px' }}>Present</p>
              <div style={{ height: '10px', background: 'var(--gray-100)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '91%', height: '100%', background: 'var(--success)', borderRadius: '9999px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '13px', color: 'var(--gray-500)' }}>
                <span>142 / 156</span>
                <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>91%</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '12px' }}>Late</p>
              <div style={{ height: '10px', background: 'var(--gray-100)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '4%', height: '100%', background: 'var(--warning)', borderRadius: '9999px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '13px', color: 'var(--gray-500)' }}>
                <span>4 / 156</span>
                <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>4%</span>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--gray-500)', marginBottom: '12px' }}>Absent</p>
              <div style={{ height: '10px', background: 'var(--gray-100)', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '5%', height: '100%', background: 'var(--danger)', borderRadius: '9999px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '13px', color: 'var(--gray-500)' }}>
                <span>10 / 156</span>
                <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
