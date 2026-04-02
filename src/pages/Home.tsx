import { useState, useEffect } from 'react'
import './Home.css'

const LS_KEY_CHATFLOWID = 'flowise_chatflowid'
const LS_KEY_API_HOST = 'flowise_api_host'

export default function Home() {
  const [chatflowid, setChatflowid] = useState('')
  const [apiHost, setApiHost] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const storedId = localStorage.getItem(LS_KEY_CHATFLOWID)
    const storedHost = localStorage.getItem(LS_KEY_API_HOST)
    if (storedId) setChatflowid(storedId)
    if (storedHost) setApiHost(storedHost)
  }, [])

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (chatflowid.trim()) {
      localStorage.setItem(LS_KEY_CHATFLOWID, chatflowid.trim())
    } else {
      localStorage.removeItem(LS_KEY_CHATFLOWID)
    }
    if (apiHost.trim()) {
      localStorage.setItem(LS_KEY_API_HOST, apiHost.trim())
    } else {
      localStorage.removeItem(LS_KEY_API_HOST)
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleClear() {
    localStorage.removeItem(LS_KEY_CHATFLOWID)
    localStorage.removeItem(LS_KEY_API_HOST)
    setChatflowid('')
    setApiHost('')
    setSaved(false)
  }

  const envChatflowid = (import.meta as any).env?.VITE_CHATFLOWID || ''
  const envApiHost = (import.meta as any).env?.VITE_API_HOST || ''

  return (
    <div className="home-page">
      <div className="home-card">
        <div className="home-card-header">
          <h1 className="home-title">Configuration</h1>
          <p className="home-subtitle">
            Set your Flowise chatflow ID and API host. Values saved here override
            the <code>Defaults</code> and are persisted in localStorage.
          </p>
        </div>

        <form className="home-form" onSubmit={handleSave}>
          <div className="form-group">
            <label htmlFor="chatflowid" className="form-label">
              Chatflow ID
            </label>
            <input
              id="chatflowid"
              type="text"
              className="form-input"
              placeholder={envChatflowid || 'Enter chatflow ID…'}
              value={chatflowid}
              onChange={(e) => setChatflowid(e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            {envChatflowid && (
              <span className="form-hint">
                Example: <code>{envChatflowid}</code>
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="apihost" className="form-label">
              API Host
            </label>
            <input
              id="apihost"
              type="text"
              className="form-input"
              placeholder={envApiHost || 'https://your-flowise-host.com'}
              value={apiHost}
              onChange={(e) => setApiHost(e.target.value)}
              spellCheck={false}
              autoComplete="off"
            />
            {envApiHost && (
              <span className="form-hint">
                Example: <code>{envApiHost}</code>
              </span>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {saved ? '✓ Saved!' : 'Save'}
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>

        <div className="home-info">
          <h2 className="info-title">How it works</h2>
          <ul className="info-list">
            <li>
              <strong>Full Page Chat</strong> — renders a full-screen chat interface
              using <code>FullPageChat</code>.
            </li>
            <li>
              <strong>Bubble Chat</strong> — renders a floating chat bubble on top of
              a sample dashboard using <code>BubbleChat</code>.
            </li>
            <li>
              Both pages read the chatflow ID and API host from localStorage first,
              then fall back to <code>Default</code> values.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
