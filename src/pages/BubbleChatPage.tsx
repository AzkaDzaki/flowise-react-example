import { BubbleChat } from '@ai-platform/flowise-embed-react'
import { useFlowiseConfig } from '../hooks/useFlowiseConfig'
import './BubbleChatPage.css'

const metrics = [
  { label: 'Total Users', value: '12,480', change: '+8.2%', up: true },
  { label: 'Active Sessions', value: '342', change: '+3.1%', up: true },
  { label: 'Avg. Response Time', value: '1.4s', change: '-12%', up: false },
  { label: 'Resolved Chats', value: '94.7%', change: '+1.5%', up: true },
]

const recentChats = [
  { id: 1, user: 'Alice M.', topic: 'Order status inquiry', time: '2 min ago', status: 'Resolved' },
  { id: 2, user: 'Bob K.', topic: 'Product recommendation', time: '9 min ago', status: 'Resolved' },
  { id: 3, user: 'Carol S.', topic: 'Return & refund policy', time: '14 min ago', status: 'Open' },
  { id: 4, user: 'David L.', topic: 'Account login issue', time: '22 min ago', status: 'Resolved' },
  { id: 5, user: 'Eva R.', topic: 'Shipping address change', time: '35 min ago', status: 'Open' },
]

export default function BubbleChatPage() {
  const { chatflowid, apiHost } = useFlowiseConfig()

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dash-header">
        <div>
          <h1 className="dash-title">Analytics Dashboard</h1>
          <p className="dash-subtitle">Welcome back — here's what's happening today.</p>
        </div>
        <div className="dash-header-right">
          <span className="dash-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>

      {/* Metric cards */}
      <section className="metrics-grid">
        {metrics.map((m) => (
          <div key={m.label} className="metric-card">
            <span className="metric-label">{m.label}</span>
            <span className="metric-value">{m.value}</span>
            <span className={`metric-change ${m.up ? 'metric-change--up' : 'metric-change--down'}`}>
              {m.up ? '▲' : '▼'} {m.change}
            </span>
          </div>
        ))}
      </section>

      {/* Charts row — decorative */}
      <section className="charts-row">
        <div className="chart-card chart-card--wide">
          <div className="chart-card-header">
            <span className="chart-card-title">Chat Volume (last 7 days)</span>
          </div>
          <div className="chart-placeholder">
            <svg viewBox="0 0 340 80" className="chart-svg" aria-hidden="true">
              <polyline
                points="0,65 48,50 96,55 144,30 192,40 240,20 288,30 340,15"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="0,65 48,50 96,55 144,30 192,40 240,20 288,30 340,15 340,80 0,80"
                fill="var(--accent-bg)"
                stroke="none"
              />
            </svg>
          </div>
        </div>
        <div className="chart-card">
          <div className="chart-card-header">
            <span className="chart-card-title">Status Breakdown</span>
          </div>
          <div className="chart-placeholder donut-placeholder">
            <svg viewBox="0 0 80 80" className="donut-svg" aria-hidden="true">
              <circle cx="40" cy="40" r="28" fill="none" stroke="var(--accent)" strokeWidth="14" strokeDasharray="115 62" strokeDashoffset="0" />
              <circle cx="40" cy="40" r="28" fill="none" stroke="var(--border)" strokeWidth="14" strokeDasharray="62 115" strokeDashoffset="-115" />
            </svg>
            <div className="donut-legend">
              <span className="donut-legend-item donut-resolved">● Resolved 65%</span>
              <span className="donut-legend-item donut-open">● Open 35%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent chats table */}
      <section className="table-section">
        <div className="table-header">
          <span className="table-title">Recent Conversations</span>
          <button className="btn-view-all">View all</button>
        </div>
        <div className="table-wrapper">
          <table className="chat-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Topic</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentChats.map((row) => (
                <tr key={row.id}>
                  <td className="td-id">{row.id}</td>
                  <td>{row.user}</td>
                  <td className="td-topic">{row.topic}</td>
                  <td className="td-time">{row.time}</td>
                  <td>
                    <span className={`status-badge ${row.status === 'Resolved' ? 'status-resolved' : 'status-open'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bubble chat — only render when config is present */}
      {chatflowid && apiHost && (
        <BubbleChat chatflowid={chatflowid} apiHost={apiHost} />
      )}
    </div>
  )
}
