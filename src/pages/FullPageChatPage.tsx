import { FullPageChat } from '@ai-platform/flowise-embed-react'
import { useFlowiseConfig } from '../hooks/useFlowiseConfig'
import './FullPageChatPage.css'

export default function FullPageChatPage() {
  const { chatflowid, apiHost } = useFlowiseConfig()

  if (!chatflowid || !apiHost) {
    return (
      <div className="fpc-empty">
        <div className="fpc-empty-icon">💬</div>
        <h2>No configuration found</h2>
        <p>
          Go to <strong>Home</strong> and save a Chatflow ID and API Host, or set{' '}
          <code>VITE_CHATFLOWID</code> and <code>VITE_API_HOST</code> in your{' '}
          <code>.env</code> file.
        </p>
      </div>
    )
  }

  return (
    <div className="fpc-wrapper">
      <FullPageChat chatflowid={chatflowid} apiHost={apiHost} />
    </div>
  )
}
