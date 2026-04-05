import { FullPageChat } from '@ai-platform/flowise-embed-react'
import { useFlowiseConfig } from '@/hooks/useFlowiseConfig'

const FullPageChatPage = () => {
  const {
    chatflowid,
    apiHost,
    theme,
    chatflowConfig,
    includeOnRequest,
    includeObservers,
    observersFlags,
    configKey,
  } = useFlowiseConfig()

  if (!chatflowid || !apiHost) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center text-muted-foreground">
        <span className="text-5xl leading-none">💬</span>
        <h2 className="text-lg font-semibold text-foreground">
          No configuration found
        </h2>
        <p className="max-w-sm text-sm">
          Go to <strong className="text-foreground">Home</strong> and save a
          Chatflow ID and API Host, or set{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            VITE_CHATFLOWID
          </code>{' '}
          and{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            VITE_API_HOST
          </code>{' '}
          in your{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">.env</code>{' '}
          file.
        </p>
      </div>
    )
  }

  const extraProps: Record<string, unknown> = {}
  if (theme) extraProps.theme = theme
  if (chatflowConfig) extraProps.chatflowConfig = chatflowConfig

  if (includeOnRequest) {
    extraProps.onRequest = async (request: RequestInit) => {
      console.log('onRequest', request)
    }
  }

  if (includeObservers) {
    const obs: Record<string, unknown> = {}
    if (observersFlags?.observeUserInput)
      obs.observeUserInput = (v: unknown) => console.log('observeUserInput', v)
    if (observersFlags?.observeMessages)
      obs.observeMessages = (v: unknown) => console.log('observeMessages', v)
    if (observersFlags?.observeLoading)
      obs.observeLoading = (v: unknown) => console.log('observeLoading', v)
    extraProps.observersConfig = obs
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <FullPageChat
        key={configKey}
        chatflowid={chatflowid}
        apiHost={apiHost}
        {...extraProps}
      />
    </div>
  )
}

export default FullPageChatPage
