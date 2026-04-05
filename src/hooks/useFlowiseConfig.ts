import { useFlowiseConfigStore } from '@/store/flowiseConfigStore'
import { DEFAULT_THEME, mergeDefaults } from '@/lib/flowiseDefaults'

const ENV_CHATFLOWID = import.meta.env.VITE_CHATFLOWID ?? ''
const ENV_API_HOST = import.meta.env.VITE_API_HOST ?? ''

export function useFlowiseConfig() {
  const {
    chatflowid,
    apiHost,
    theme: storeTheme,
    chatflowConfig,
    includeOnRequest,
    includeObservers,
    onRequestSource,
    observeUserInputSource,
    observeMessagesSource,
    observeLoadingSource,
    observersFlags,
    _revision,
  } = useFlowiseConfigStore()

  const theme = mergeDefaults(
    DEFAULT_THEME as Record<string, unknown>,
    (storeTheme ?? {}) as Record<string, unknown>
  )

  return {
    chatflowid:
      chatflowid ||
      localStorage.getItem('flowise_chatflowid') ||
      ENV_CHATFLOWID ||
      '',
    apiHost:
      apiHost || localStorage.getItem('flowise_api_host') || ENV_API_HOST || '',
    theme,
    chatflowConfig,
    includeOnRequest,
    includeObservers,
    onRequestSource,
    observeUserInputSource,
    observeMessagesSource,
    observeLoadingSource,
    observersFlags,
    configKey: _revision,
  }
}
