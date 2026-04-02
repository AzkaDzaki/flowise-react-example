import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'

const navItems = [
  { to: '/', label: 'Home', icon: '⚙️' },
  { to: '/fullpage', label: 'Full Page Chat', icon: '💬' },
  { to: '/bubblechat', label: 'Bubble Chat', icon: '🫧' },
]

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo">🤖</span>
          <span className="sidebar-title">Flowise Demo</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `nav-item${isActive ? ' nav-item--active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="sidebar-version">@ai-platform/flowise-embed-react</span>
        </div>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
