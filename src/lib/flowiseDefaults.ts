import type { BubbleTheme } from '@/types/flowise.types'

export const DEFAULT_THEME: Partial<BubbleTheme> = {
  button: {
    backgroundColor: '#3B81F6',
  },
  tooltip: {
    tooltipMessage: 'Hi There 👋!',
    tooltipBackgroundColor: 'black',
    tooltipTextColor: 'white',
    tooltipFontSize: 16,
  },
  disclaimer: {
    title: 'Disclaimer',
    message:
      'By using this chatbot, you agree to the <a target="_blank" href="https://flowiseai.com/terms">Terms & Condition</a>.',
    textColor: 'black',
    buttonColor: '#3b82f6',
    buttonText: 'Start Chatting',
    buttonTextColor: 'white',
    blurredBackgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundColor: 'white',
    denyButtonBgColor: '#ef4444',
    denyButtonText: 'Cancel',
  },
  form: {
    backgroundColor: '#ffffff',
    textColor: '#1f1f1f',
  },
  customCSS: '',
  chatWindow: {
    showTitle: true,
    titleTextColor: '#444746',
    titleBackgroundColor: '#ffffff',
    welcomeMessage: 'Hi there! How can I help?',
    errorMessage: 'Oops! There seems to be an error. Please try again.',
    backgroundColor: '#ffffff',
    backgroundImage: 'none',
    fontSize: 16,
    clearChatOnReload: false,
    renderHTML: false,
    botMessage: {
      backgroundColor: '#ffffff',
      textColor: '#1f1f1f',
    },
    userMessage: {
      backgroundColor: '#e9eef6',
      textColor: '#1f1f1f',
    },
    textInput: {
      placeholder: 'Type your question',
      backgroundColor: '#ffffff',
      textColor: '#303235',
      sendButtonColor: '#0b57d0',
      maxCharsWarningMessage:
        'You exceeded the characters limit. Please input less than 50 characters.',
      sendSoundLocation:
        'https://cdn.jsdelivr.net/gh/FlowiseAI/FlowiseChatEmbed@latest/src/assets/send_message.mp3',
      receiveSoundLocation:
        'https://cdn.jsdelivr.net/gh/FlowiseAI/FlowiseChatEmbed@latest/src/assets/receive_message.mp3',
    },
    feedback: {
      color: '#e9eef6',
    },
    dateTimeToggle: {
      date: true,
      time: true,
    },
    footer: {
      showFooter: true,
      textColor: '#303235',
      text: 'Powered by',
      company: 'AgentLab',
      companyLink: '#',
    },
  },
} as Partial<BubbleTheme>

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v)
}

export function mergeDefaults<T extends Record<string, unknown>>(
  defaults: T,
  source?: Record<string, unknown> | null
): T {
  const result: Record<string, unknown> = {}
  const src = source ?? {}
  const keys = new Set<string>([
    ...Object.keys(defaults || {}),
    ...Object.keys(src || {}),
  ])
  keys.forEach((k) => {
    const d = (defaults as Record<string, unknown>)[k]
    const s = (src as Record<string, unknown>)[k]

    if (Array.isArray(d)) {
      result[k] = s !== undefined && s !== null ? s : d
      return
    }

    if (isPlainObject(d)) {
      result[k] = mergeDefaults(
        d as Record<string, unknown>,
        isPlainObject(s) ? (s as Record<string, unknown>) : undefined
      )
      return
    }

    if (d !== undefined && d !== null) {
      result[k] = s !== undefined && s !== null ? s : d
      return
    }

    // no default — use source if present
    if (s !== undefined) result[k] = s
  })

  return result as T
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false
    return true
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const ak = Object.keys(a as Record<string, unknown>)
    const bk = Object.keys(b as Record<string, unknown>)
    if (ak.length !== bk.length) return false
    for (const key of ak) {
      if (
        !deepEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key]
        )
      )
        return false
    }
    return true
  }
  return false
}

export function stripDefaults<T extends Record<string, unknown>>(
  source?: Record<string, unknown> | null,
  defaults?: Record<string, unknown> | null
): T | undefined {
  if (!source) return undefined
  const result: Record<string, unknown> = {}
  for (const key of Object.keys(source)) {
    const s = (source as Record<string, unknown>)[key]
    const d = defaults ? (defaults as Record<string, unknown>)[key] : undefined

    if (isPlainObject(s)) {
      const child = stripDefaults(
        isPlainObject(d)
          ? (s as Record<string, unknown>)
          : (s as Record<string, unknown>),
        isPlainObject(d) ? (d as Record<string, unknown>) : undefined
      )
      if (child !== undefined) result[key] = child
      continue
    }

    if (Array.isArray(s)) {
      if (Array.isArray(d) && deepEqual(s, d)) continue
      result[key] = s
      continue
    }

    if (d !== undefined) {
      if (deepEqual(s, d)) continue
      result[key] = s
      continue
    }

    // no default available — always include
    result[key] = s
  }

  return Object.keys(result).length > 0 ? (result as T) : undefined
}
