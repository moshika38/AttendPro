import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/': 'Dashboard',
  '/students': 'Students',
  '/attendance': 'Attendance',
  '/reports': 'Reports',
}

export default function Header() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Dashboard'

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="header">
      <div className="header-left">
        <h2>{title}</h2>
      </div>
      <div className="header-right">
        <span className="header-date">{today}</span>
        <div className="header-avatar">AD</div>
      </div>
    </header>
  )
}
