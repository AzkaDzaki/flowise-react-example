const LS_KEY_CHATFLOWID = 'flowise_chatflowid'
const LS_KEY_API_HOST = 'flowise_api_host'

const ENV_CHATFLOWID = (import.meta as any).env?.VITE_CHATFLOWID || ''
const ENV_API_HOST = (import.meta as any).env?.VITE_API_HOST || ''

export function useFlowiseConfig() {
  const chatflowid =
    localStorage.getItem(LS_KEY_CHATFLOWID) || ENV_CHATFLOWID || ''
  const apiHost =
    localStorage.getItem(LS_KEY_API_HOST) || ENV_API_HOST || ''
  return { chatflowid, apiHost }
}
