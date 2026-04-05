import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BubbleTheme } from '@/types/flowise.types'

interface ObserversFlags {
  observeUserInput?: boolean
  observeLoading?: boolean
  observeMessages?: boolean
}

interface FlowiseConfigData {
  chatflowid: string
  apiHost: string
  chatflowConfig?: Record<string, unknown>
  theme?: BubbleTheme
  includeOnRequest?: boolean
  includeObservers?: boolean
  onRequestSource?: string
  observeUserInputSource?: string
  observeMessagesSource?: string
  observeLoadingSource?: string
  observersFlags?: ObserversFlags
}

const INITIAL_CONFIG: FlowiseConfigData = {
  chatflowid: '',
  apiHost: '',
  theme: undefined,
  chatflowConfig: undefined,
  includeOnRequest: false,
  includeObservers: false,
  onRequestSource: undefined,
  observeUserInputSource: undefined,
  observeMessagesSource: undefined,
  observeLoadingSource: undefined,
  observersFlags: undefined,
}

interface FlowiseConfigState extends FlowiseConfigData {
  _revision: number
  setConfig: (config: FlowiseConfigData) => void
  resetConfig: () => void
}

export const useFlowiseConfigStore = create<FlowiseConfigState>()(
  persist(
    (set) => ({
      ...INITIAL_CONFIG,
      _revision: 0,
      setConfig: (config) =>
        set((state) => ({ ...config, _revision: state._revision + 1 })),
      resetConfig: () =>
        set((state) => ({ ...INITIAL_CONFIG, _revision: state._revision + 1 })),
    }),
    {
      name: 'flowise-config',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      partialize: ({
        setConfig: _setConfig,
        resetConfig: _resetConfig,
        ...rest
      }) => rest,
    }
  )
)
