import { useState, useCallback } from 'react'
import {
  Button,
  Input,
  Label,
  Switch,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui'
import { useFlowiseConfigStore } from '@/store/flowiseConfigStore'
import type { BubbleTheme } from '@/types/flowise.types'
import {
  DEFAULT_THEME,
  mergeDefaults,
  stripDefaults,
} from '@/lib/flowiseDefaults'

/* ── deep-get / deep-set helpers ── */

function getDeep(obj: Record<string, unknown>, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (acc, key) => (acc as Record<string, unknown> | undefined)?.[key],
      obj
    )
}

function setDeep(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> {
  const keys = path.split('.')
  const result: Record<string, unknown> = { ...obj }
  let current: Record<string, unknown> = result
  for (let i = 0; i < keys.length - 1; i++) {
    const existing = current[keys[i]]
    current[keys[i]] =
      existing != null &&
      typeof existing === 'object' &&
      !Array.isArray(existing)
        ? { ...(existing as Record<string, unknown>) }
        : {}
    current = current[keys[i]] as Record<string, unknown>
  }
  current[keys[keys.length - 1]] = value
  return result
}

function cleanConfig(obj: unknown): unknown {
  if (obj === null || obj === undefined || obj === '') return undefined
  if (typeof obj === 'boolean' || typeof obj === 'number') return obj
  if (Array.isArray(obj)) {
    const cleaned = obj.filter(
      (item) => item !== null && item !== undefined && item !== ''
    )
    return cleaned.length > 0 ? cleaned : undefined
  }
  if (typeof obj === 'object') {
    const cleaned: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const cv = cleanConfig(value)
      if (cv !== undefined) cleaned[key] = cv
    }
    return Object.keys(cleaned).length > 0 ? cleaned : undefined
  }
  return obj
}

/* ── Stable field components (defined OUTSIDE ConfigForm to prevent remounting) ── */

type FieldGetFn = (path: string) => unknown
type FieldSetFn = (path: string, value: unknown) => void

const HintIcon = ({ text }: { text: string }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <span className="ml-1 inline-flex h-4 w-4 shrink-0 cursor-help items-center justify-center rounded-full border border-muted-foreground/30 text-[10px] leading-none text-muted-foreground">
        ?
      </span>
    </TooltipTrigger>
    <TooltipContent side="top" className="max-w-xs text-xs">
      {text}
    </TooltipContent>
  </Tooltip>
)

const FieldLabel = ({ label, hint }: { label: string; hint?: string }) => (
  <div className="flex items-center">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    {hint && <HintIcon text={hint} />}
  </div>
)

const StrField = ({
  label,
  path,
  placeholder,
  className = '',
  hint,
  get,
  set,
}: {
  label: string
  path: string
  placeholder?: string
  className?: string
  hint?: string
  get: FieldGetFn
  set: FieldSetFn
}) => (
  <div className={`space-y-1 ${className}`}>
    <FieldLabel label={label} hint={hint} />
    <Input
      className="h-8 text-xs"
      value={(get(path) as string) ?? ''}
      onChange={(e) => set(path, e.target.value || undefined)}
      placeholder={placeholder}
      spellCheck={false}
      autoComplete="off"
    />
  </div>
)

const NumField = ({
  label,
  path,
  placeholder,
  hint,
  get,
  set,
}: {
  label: string
  path: string
  placeholder?: string
  hint?: string
  get: FieldGetFn
  set: FieldSetFn
}) => (
  <div className="space-y-1">
    <FieldLabel label={label} hint={hint} />
    <Input
      className="h-8 text-xs"
      type="number"
      value={(get(path) as number) ?? ''}
      onChange={(e) =>
        set(path, e.target.value !== '' ? Number(e.target.value) : undefined)
      }
      placeholder={placeholder}
    />
  </div>
)

const BoolField = ({
  label,
  path,
  hint,
  get,
  set,
}: {
  label: string
  path: string
  hint?: string
  get: FieldGetFn
  set: FieldSetFn
}) => (
  <div className="flex items-center justify-between rounded-md border px-3 py-2">
    <div className="flex items-center">
      <Label className="cursor-pointer text-xs text-muted-foreground">
        {label}
      </Label>
      {hint && <HintIcon text={hint} />}
    </div>
    <Switch
      checked={get(path) === true}
      onCheckedChange={(v) => set(path, v)}
    />
  </div>
)

const Section = ({
  title,
  hint,
  children,
}: {
  title: string
  hint?: string
  children: React.ReactNode
}) => (
  <div className="space-y-3">
    <div className="flex items-center">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h4>
      {hint && <HintIcon text={hint} />}
    </div>
    <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
      {children}
    </div>
  </div>
)

const TEXTAREA_CLASS =
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 font-mono resize-y'

/* ── ConfigForm ── */

const ConfigForm = () => {
  const store = useFlowiseConfigStore()

  const initialTheme = mergeDefaults(
    DEFAULT_THEME as Record<string, unknown>,
    (store.theme ?? {}) as Record<string, unknown>
  )

  const initialConfigObj: Record<string, unknown> = {
    chatflowid: store.chatflowid || '',
    apiHost: store.apiHost || '',
    theme: initialTheme,
    chatflowConfig: store.chatflowConfig
      ? JSON.parse(JSON.stringify(store.chatflowConfig))
      : undefined,
    includeOnRequest: store.includeOnRequest ?? false,
    includeObservers: store.includeObservers ?? false,
    observersFlags: store.observersFlags
      ? JSON.parse(JSON.stringify(store.observersFlags))
      : {
          observeUserInput: false,
          observeLoading: false,
          observeMessages: false,
        },
    onRequestSource: store.onRequestSource ?? '(req) => { console.log(req) }',
    observeUserInputSource: store.observeUserInputSource ?? '',
    observeMessagesSource: store.observeMessagesSource ?? '',
    observeLoadingSource: store.observeLoadingSource ?? '',
  }

  const [config, setConfig] = useState<Record<string, unknown>>(
    () => initialConfigObj
  )

  const [chatflowConfigJson, setChatflowConfigJson] = useState(() =>
    store.chatflowConfig ? JSON.stringify(store.chatflowConfig, null, 2) : ''
  )
  const [starterPromptsText, setStarterPromptsText] = useState(() => {
    const theme = initialConfigObj.theme as Record<string, unknown> | undefined
    const chatWindow = theme?.chatWindow as Record<string, unknown> | undefined
    return ((chatWindow?.starterPrompts as string[]) ?? []).join('\n')
  })
  const [jsonError, setJsonError] = useState('')
  const [saved, setSaved] = useState(false)
  const [snippetCopied, setSnippetCopied] = useState(false)

  /* stable helpers to pass to field components */
  const get = useCallback((path: string) => getDeep(config, path), [config])
  const set = useCallback(
    (path: string, value: unknown) =>
      setConfig((prev) => setDeep(prev, path, value)),
    []
  )

  /* build observers object string from flags */
  const buildObserversConfigString = (
    flags?: Record<string, unknown> | null,
    perFlagSources?: {
      observeUserInput?: string
      observeMessages?: string
      observeLoading?: string
    } | null
  ) => {
    if (!flags) return '{}'
    const lines: string[] = ['{']
    if (flags['observeUserInput']) {
      const src = perFlagSources?.observeUserInput?.trim()
      if (src) lines.push(`  observeUserInput: ${src},`)
      else
        lines.push(
          '  observeUserInput: (userInput) => { console.log({ userInput }) },'
        )
    }
    if (flags['observeMessages']) {
      const src = perFlagSources?.observeMessages?.trim()
      if (src) lines.push(`  observeMessages: ${src},`)
      else
        lines.push(
          '  observeMessages: (messages) => { console.log({ messages }) },'
        )
    }
    if (flags['observeLoading']) {
      const src = perFlagSources?.observeLoading?.trim()
      if (src) lines.push(`  observeLoading: ${src},`)
      else
        lines.push(
          '  observeLoading: (loading) => { console.log({ loading }) },'
        )
    }
    lines.push('}')
    // if only braces, return empty object
    if (lines.length === 2) return '{}'
    return lines.join('\n')
  }

  /* ── handlers ── */

  function handleSave() {
    let chatflowConfig: Record<string, unknown> | undefined
    if (chatflowConfigJson.trim()) {
      try {
        chatflowConfig = JSON.parse(chatflowConfigJson.trim()) as Record<
          string,
          unknown
        >
        setJsonError('')
      } catch {
        setJsonError('Invalid JSON')
        return
      }
    }

    const finalConfig: Record<string, unknown> = JSON.parse(
      JSON.stringify(config)
    )

    // convert button.size to number if numeric
    const theme = finalConfig.theme as Record<string, unknown> | undefined
    const button = theme?.button as Record<string, unknown> | undefined
    if (button?.size !== undefined) {
      const s = String(button.size)
      if (s !== 'small' && s !== 'medium' && s !== 'large') {
        const n = Number(s)
        if (!isNaN(n)) button.size = n
      }
    }

    // inject starterPrompts
    const prompts = starterPromptsText
      .split('\n')
      .map((l: string) => l.trim())
      .filter(Boolean)
    if (prompts.length > 0) {
      if (!theme) (finalConfig as Record<string, unknown>).theme = {}
      const t = (finalConfig as Record<string, unknown>).theme as Record<
        string,
        unknown
      >
      if (!t.chatWindow) t.chatWindow = {}
      ;(t.chatWindow as Record<string, unknown>).starterPrompts = prompts
    }

    const cleaned = cleanConfig(finalConfig) as
      | Record<string, unknown>
      | undefined

    const themeOverrides = stripDefaults<Record<string, unknown>>(
      cleaned?.theme as Record<string, unknown> | undefined,
      DEFAULT_THEME as Record<string, unknown>
    ) as BubbleTheme | undefined

    store.setConfig({
      chatflowid: (cleaned?.chatflowid as string) || '',
      apiHost: (cleaned?.apiHost as string) || '',
      theme: themeOverrides,
      chatflowConfig,
      includeOnRequest: (cleaned?.includeOnRequest as boolean) || false,
      includeObservers: (cleaned?.includeObservers as boolean) || false,
      observersFlags:
        (cleaned?.observersFlags as Record<string, boolean>) || undefined,
      onRequestSource: (cleaned?.onRequestSource as string) || undefined,
      observeUserInputSource:
        (cleaned?.observeUserInputSource as string) || undefined,
      observeMessagesSource:
        (cleaned?.observeMessagesSource as string) || undefined,
      observeLoadingSource:
        (cleaned?.observeLoadingSource as string) || undefined,
    })

    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function handleClear() {
    store.resetConfig()
    setConfig({
      chatflowid: '',
      apiHost: '',
      theme: {},
      includeOnRequest: false,
      includeObservers: false,
      observersFlags: {
        observeUserInput: false,
        observeLoading: false,
        observeMessages: false,
      },
      onRequestSource: '',
      observeUserInputSource: '',
      observeMessagesSource: '',
      observeLoadingSource: '',
    })
    setChatflowConfigJson('')
    setStarterPromptsText('')
    setJsonError('')
    setSaved(false)
  }

  /* ── render ── */

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <Tabs defaultValue="embed" className="flex min-h-0 flex-1 flex-col">
        <TabsList className="h-auto flex-wrap justify-start gap-1">
          <TabsTrigger value="embed" className="text-xs">
            Embed Code
          </TabsTrigger>
          <TabsTrigger value="general" className="text-xs">
            General
          </TabsTrigger>
          <TabsTrigger value="button" className="text-xs">
            Button &amp; Tooltip
          </TabsTrigger>
          <TabsTrigger value="chatwindow" className="text-xs">
            Chat Window
          </TabsTrigger>
          <TabsTrigger value="messages" className="text-xs">
            Messages &amp; Input
          </TabsTrigger>
          <TabsTrigger value="extras" className="text-xs">
            Extras
          </TabsTrigger>
        </TabsList>

        <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
          {/* ─── GENERAL ─── */}
          <TabsContent value="general" className="mt-0">
            <div className="space-y-4">
              <StrField
                label="Chatflow ID"
                path="chatflowid"
                placeholder="Enter chatflow ID…"
                hint="Required. The unique ID of your Flowise chatflow."
                get={get}
                set={set}
              />
              <StrField
                label="API Host"
                path="apiHost"
                placeholder="https://your-flowise-host.com"
                hint="The base URL of your Flowise server, e.g. http://localhost:3000."
                get={get}
                set={set}
              />
              <Separator />
              <div className="space-y-1">
                <FieldLabel
                  label="chatflowConfig (JSON)"
                  hint="Optional JSON object to override chatflow parameters like topK. Passed directly to the chatflow."
                />
                <textarea
                  className={`${TEXTAREA_CLASS} min-h-[100px]`}
                  value={chatflowConfigJson}
                  onChange={(e) => {
                    setChatflowConfigJson(e.target.value)
                    setJsonError('')
                  }}
                  placeholder={'{ "key": "value" }'}
                  spellCheck={false}
                />
                {jsonError && (
                  <p className="text-xs text-destructive">{jsonError}</p>
                )}
              </div>
              <Separator />

              <Section
                title="Advanced"
                hint="Toggle optional callbacks and observers that can be attached to the embed."
              >
                <div className="sm:col-span-2">
                  <BoolField
                    label="Include onRequest"
                    path="includeOnRequest"
                    hint="Attach an example onRequest handler to the embed."
                    get={get}
                    set={set}
                  />
                </div>

                {get('includeOnRequest') === true && (
                  <div className="sm:col-span-2">
                    <FieldLabel
                      label="onRequest handler (JS)"
                      hint="Provide a function expression, e.g. (req) => { console.log(req) }"
                    />
                    <textarea
                      className={`${TEXTAREA_CLASS} min-h-[80px] font-mono`}
                      value={(get('onRequestSource') as string) ?? ''}
                      onChange={(e) =>
                        set('onRequestSource', e.target.value || undefined)
                      }
                      placeholder="(req) => { console.log(req) }"
                      spellCheck={false}
                    />
                  </div>
                )}

                <div className="sm:col-span-2">
                  <BoolField
                    label="Include Observers"
                    path="includeObservers"
                    hint="Attach an observersConfig object to the embed."
                    get={get}
                    set={set}
                  />
                </div>

                {get('includeObservers') === true && (
                  <>
                    <div className="sm:col-span-2">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Observers Flags
                      </h4>
                      <div className="mt-2 space-y-4">
                        <div>
                          <BoolField
                            label="Observe User Input"
                            path="observersFlags.observeUserInput"
                            hint="Send user-typed input events to the observer."
                            get={get}
                            set={set}
                          />
                          {get('observersFlags.observeUserInput') === true && (
                            <div className="mt-2">
                              <FieldLabel
                                label="Handler (JS) for observeUserInput"
                                hint="Function expression, e.g. (userInput) => { ... }"
                              />
                              <textarea
                                className={`${TEXTAREA_CLASS} min-h-[80px] font-mono`}
                                value={
                                  (get('observeUserInputSource') as string) ??
                                  ''
                                }
                                onChange={(e) =>
                                  set(
                                    'observeUserInputSource',
                                    e.target.value || undefined
                                  )
                                }
                                placeholder="(userInput) => { console.log({ userInput }) }"
                                spellCheck={false}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <BoolField
                            label="Observe Messages"
                            path="observersFlags.observeMessages"
                            hint="Receive message events from the embed."
                            get={get}
                            set={set}
                          />
                          {get('observersFlags.observeMessages') === true && (
                            <div className="mt-2">
                              <FieldLabel
                                label="Handler (JS) for observeMessages"
                                hint="Function expression, e.g. (messages) => { ... }"
                              />
                              <textarea
                                className={`${TEXTAREA_CLASS} min-h-[80px] font-mono`}
                                value={
                                  (get('observeMessagesSource') as string) ?? ''
                                }
                                onChange={(e) =>
                                  set(
                                    'observeMessagesSource',
                                    e.target.value || undefined
                                  )
                                }
                                placeholder="(messages) => { console.log({ messages }) }"
                                spellCheck={false}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <BoolField
                            label="Observe Loading"
                            path="observersFlags.observeLoading"
                            hint="Receive loading state events from the embed."
                            get={get}
                            set={set}
                          />
                          {get('observersFlags.observeLoading') === true && (
                            <div className="mt-2">
                              <FieldLabel
                                label="Handler (JS) for observeLoading"
                                hint="Function expression, e.g. (loading) => { ... }"
                              />
                              <textarea
                                className={`${TEXTAREA_CLASS} min-h-[80px] font-mono`}
                                value={
                                  (get('observeLoadingSource') as string) ?? ''
                                }
                                onChange={(e) =>
                                  set(
                                    'observeLoadingSource',
                                    e.target.value || undefined
                                  )
                                }
                                placeholder="(loading) => { console.log({ loading }) }"
                                spellCheck={false}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Section>
            </div>
          </TabsContent>

          {/* ─── BUTTON & TOOLTIP ─── */}
          <TabsContent value="button" className="mt-0">
            <div className="space-y-6">
              <Section
                title="Button"
                hint="Customize the floating chat bubble button appearance and position."
              >
                <StrField
                  label="Size"
                  path="theme.button.size"
                  placeholder="small | medium | large | number"
                  hint="Button size. Use 'small', 'medium', 'large' or a pixel number (e.g. 48)."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Background Color"
                  path="theme.button.backgroundColor"
                  placeholder="#hex"
                  hint="Background color of the chat bubble button. E.g. '#3B81F6'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Icon Color"
                  path="theme.button.iconColor"
                  placeholder="#hex"
                  hint="Color of the icon inside the button. E.g. 'white'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Custom Icon Src"
                  path="theme.button.customIconSrc"
                  placeholder="URL"
                  hint="URL to a custom icon image to replace the default chat icon."
                  get={get}
                  set={set}
                />
                <NumField
                  label="Bottom (px)"
                  path="theme.button.bottom"
                  hint="Distance from the bottom edge of the viewport in pixels. Default: 20."
                  get={get}
                  set={set}
                />
                <NumField
                  label="Right (px)"
                  path="theme.button.right"
                  hint="Distance from the right edge of the viewport in pixels. Default: 20."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Drag and Drop"
                  path="theme.button.dragAndDrop"
                  hint="Allow users to drag the chat button to a different position on screen."
                  get={get}
                  set={set}
                />
              </Section>

              <Section
                title="Auto Window Open"
                hint="Control whether the chat window opens automatically when the page loads."
              >
                <BoolField
                  label="Auto Open"
                  path="theme.button.autoWindowOpen.autoOpen"
                  hint="Automatically open the chat window on page load."
                  get={get}
                  set={set}
                />
                <NumField
                  label="Open Delay (s)"
                  path="theme.button.autoWindowOpen.openDelay"
                  hint="Delay in seconds before auto-opening the chat window."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Auto Open on Mobile"
                  path="theme.button.autoWindowOpen.autoOpenOnMobile"
                  hint="Also auto-open on mobile devices. Usually disabled for smaller screens."
                  get={get}
                  set={set}
                />
              </Section>

              <Separator />

              <Section
                title="Tooltip"
                hint="A small tooltip message that appears near the chat button."
              >
                <BoolField
                  label="Show Tooltip"
                  path="theme.tooltip.showTooltip"
                  hint="Show or hide the tooltip near the chat button."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Message"
                  path="theme.tooltip.tooltipMessage"
                  placeholder="Enter tooltip text…"
                  hint="The text shown in the tooltip. E.g. 'Hi There 👋!'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Background Color"
                  path="theme.tooltip.tooltipBackgroundColor"
                  placeholder="#hex"
                  hint="Background color of the tooltip bubble. E.g. 'black'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Text Color"
                  path="theme.tooltip.tooltipTextColor"
                  placeholder="#hex"
                  hint="Text color inside the tooltip. E.g. 'white'."
                  get={get}
                  set={set}
                />
                <NumField
                  label="Font Size"
                  path="theme.tooltip.tooltipFontSize"
                  hint="Font size of the tooltip text in pixels. E.g. 16."
                  get={get}
                  set={set}
                />
              </Section>
            </div>
          </TabsContent>

          {/* ─── CHAT WINDOW ─── */}
          <TabsContent value="chatwindow" className="mt-0">
            <div className="space-y-6">
              <Section
                title="Title & Header"
                hint="Configure the title bar at the top of the chat window."
              >
                <BoolField
                  label="Show Title"
                  path="theme.chatWindow.showTitle"
                  hint="Show or hide the title bar at the top of the chat window."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Title"
                  path="theme.chatWindow.title"
                  placeholder="AgentLab"
                  hint="The text displayed in the chat window title bar. Default: 'AgentLab'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Title Avatar Src"
                  path="theme.chatWindow.titleAvatarSrc"
                  placeholder="URL"
                  hint="URL of the avatar image shown beside the title."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Title Text Color"
                  path="theme.chatWindow.titleTextColor"
                  placeholder="#hex"
                  hint="Color of the title text. E.g. '#ffffff'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Title BG Color"
                  path="theme.chatWindow.titleBackgroundColor"
                  placeholder="#hex"
                  hint="Background color of the title bar. E.g. '#3B81F6'."
                  get={get}
                  set={set}
                />
              </Section>

              <Section
                title="Messages"
                hint="Configure welcome, error, and agent message behavior."
              >
                <BoolField
                  label="Show Agent Messages"
                  path="theme.chatWindow.showAgentMessages"
                  hint="Show intermediate agent/tool messages in the chat."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Welcome Message"
                  path="theme.chatWindow.welcomeMessage"
                  placeholder="Hello! How can I help?"
                  className="sm:col-span-2"
                  hint="Initial greeting message shown when the chat opens. E.g. 'Hello! This is custom welcome message'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Error Message"
                  path="theme.chatWindow.errorMessage"
                  placeholder="Something went wrong…"
                  className="sm:col-span-2"
                  hint="Custom error message shown when something goes wrong."
                  get={get}
                  set={set}
                />
              </Section>

              <Section
                title="Appearance"
                hint="Control the overall look and dimensions of the chat window."
              >
                <StrField
                  label="Background Color"
                  path="theme.chatWindow.backgroundColor"
                  placeholder="#hex"
                  hint="Background color of the chat window body. E.g. '#ffffff'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Background Image"
                  path="theme.chatWindow.backgroundImage"
                  placeholder="URL"
                  hint="URL to a background image. If set, it overlaps the background color."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Height"
                  path="theme.chatWindow.height"
                  placeholder="700 or calc(100% - 150px)"
                  hint="Chat window height. Accepts a pixel number (e.g. 700) or a CSS string (e.g. 'calc(100% - 150px)')."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Width"
                  path="theme.chatWindow.width"
                  placeholder="400 or 100%"
                  hint="Chat window width. Accepts a pixel number (e.g. 400) or a CSS string (e.g. '100%')."
                  get={get}
                  set={set}
                />
                <NumField
                  label="Font Size"
                  path="theme.chatWindow.fontSize"
                  hint="Base font size in pixels for the chat window. E.g. 16."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Powered By Text Color"
                  path="theme.chatWindow.poweredByTextColor"
                  placeholder="#hex"
                  hint="Color of the 'Powered by' text. E.g. '#303235'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Source Docs Title"
                  path="theme.chatWindow.sourceDocsTitle"
                  placeholder="Sources:"
                  hint="Title displayed above source document references. E.g. 'Sources:'."
                  get={get}
                  set={set}
                />
              </Section>

              <Section
                title="Behavior"
                hint="Toggle chat behavior options like HTML rendering and chat clearing."
              >
                <BoolField
                  label="Clear Chat on Reload"
                  path="theme.chatWindow.clearChatOnReload"
                  hint="If true, all chat history is cleared when the page reloads."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Render HTML"
                  path="theme.chatWindow.renderHTML"
                  hint="Allow the bot to render HTML in its messages."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Render HTML Code"
                  path="theme.chatWindow.renderHtmlCode"
                  hint="Render HTML code blocks (e.g. <code>) from bot messages."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Render Chart"
                  path="theme.chatWindow.renderChart"
                  hint="Render chart visualizations from bot messages."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Render URL"
                  path="theme.chatWindow.renderUrl"
                  hint="Render URLs in bot messages as clickable links."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Render Mermaid"
                  path="theme.chatWindow.renderMermaid"
                  hint="Render Mermaid diagrams from bot messages."
                  get={get}
                  set={set}
                />
              </Section>

              <div className="space-y-3">
                <div className="flex items-center">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Render URL Prefixes
                  </h4>
                  <HintIcon text="Allowlist of URL prefixes that will be rendered as links when Render URL is enabled. One prefix per line." />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    One prefix per line
                  </Label>
                  <textarea
                    className={`${TEXTAREA_CLASS} min-h-[80px]`}
                    value={(
                      (get('theme.chatWindow.renderUrlPrefixes') as string[]) ??
                      []
                    ).join('\n')}
                    onChange={(e) => {
                      const prefixes = e.target.value
                        .split('\n')
                        .map((l: string) => l.trim())
                        .filter(Boolean)
                      set(
                        'theme.chatWindow.renderUrlPrefixes',
                        prefixes.length > 0 ? prefixes : undefined
                      )
                    }}
                    placeholder={
                      'https://example.com\nhttps://docs.example.com'
                    }
                    spellCheck={false}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Starter Prompts
                  </h4>
                  <HintIcon text="Pre-defined prompt buttons shown when the chat opens. These override any starter prompts set in the chatflow. One prompt per line." />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    One prompt per line
                  </Label>
                  <textarea
                    className={`${TEXTAREA_CLASS} min-h-[80px]`}
                    value={starterPromptsText}
                    onChange={(e) => setStarterPromptsText(e.target.value)}
                    placeholder={
                      'What can you help me with?\nTell me about your features'
                    }
                    spellCheck={false}
                  />
                </div>
                <NumField
                  label="Starter Prompt Font Size"
                  path="theme.chatWindow.starterPromptFontSize"
                  hint="Font size of the starter prompt buttons in pixels. E.g. 15."
                  get={get}
                  set={set}
                />
              </div>

              <Section
                title="Date & Time Toggle"
                hint="Control whether date and time are shown alongside messages."
              >
                <BoolField
                  label="Show Date"
                  path="theme.chatWindow.dateTimeToggle.date"
                  hint="Display the date next to chat messages."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Show Time"
                  path="theme.chatWindow.dateTimeToggle.time"
                  hint="Display the time next to chat messages."
                  get={get}
                  set={set}
                />
              </Section>
            </div>
          </TabsContent>

          {/* ─── MESSAGES & INPUT ─── */}
          <TabsContent value="messages" className="mt-0">
            <div className="space-y-6">
              <Section
                title="User Message"
                hint="Style the user's outgoing message bubbles."
              >
                <StrField
                  label="Background Color"
                  path="theme.chatWindow.userMessage.backgroundColor"
                  placeholder="#hex"
                  hint="Background color of user message bubbles. E.g. '#3B81F6'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Text Color"
                  path="theme.chatWindow.userMessage.textColor"
                  placeholder="#hex"
                  hint="Text color of user messages. E.g. '#ffffff'."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Show Avatar"
                  path="theme.chatWindow.userMessage.showAvatar"
                  hint="Show an avatar image beside user messages."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Avatar Src"
                  path="theme.chatWindow.userMessage.avatarSrc"
                  placeholder="URL"
                  hint="URL of the user avatar image."
                  get={get}
                  set={set}
                />
              </Section>

              <Section
                title="Bot Message"
                hint="Style the bot's incoming message bubbles."
              >
                <StrField
                  label="Background Color"
                  path="theme.chatWindow.botMessage.backgroundColor"
                  placeholder="#hex"
                  hint="Background color of bot message bubbles. E.g. '#f7f8ff'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Text Color"
                  path="theme.chatWindow.botMessage.textColor"
                  placeholder="#hex"
                  hint="Text color of bot messages. E.g. '#303235'."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Show Avatar"
                  path="theme.chatWindow.botMessage.showAvatar"
                  hint="Show an avatar image beside bot messages."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Avatar Src"
                  path="theme.chatWindow.botMessage.avatarSrc"
                  placeholder="URL"
                  hint="URL of the bot avatar image."
                  get={get}
                  set={set}
                />
              </Section>

              <Separator />

              <Section
                title="Text Input"
                hint="Configure the message input field at the bottom of the chat."
              >
                <StrField
                  label="Background Color"
                  path="theme.chatWindow.textInput.backgroundColor"
                  placeholder="#hex"
                  hint="Background color of the input field. E.g. '#ffffff'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Text Color"
                  path="theme.chatWindow.textInput.textColor"
                  placeholder="#hex"
                  hint="Color of the text the user types. E.g. '#303235'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Placeholder"
                  path="theme.chatWindow.textInput.placeholder"
                  placeholder="Type your message…"
                  hint="Placeholder text shown in the empty input field. E.g. 'Type your question'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Send Button Color"
                  path="theme.chatWindow.textInput.sendButtonColor"
                  placeholder="#hex"
                  hint="Color of the send message button. E.g. '#3B81F6'."
                  get={get}
                  set={set}
                />
                <NumField
                  label="Max Characters"
                  path="theme.chatWindow.textInput.maxChars"
                  hint="Maximum number of characters the user can type. E.g. 50."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Max Chars Warning"
                  path="theme.chatWindow.textInput.maxCharsWarningMessage"
                  placeholder="Character limit reached"
                  hint="Warning message shown when the character limit is exceeded."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Auto Focus"
                  path="theme.chatWindow.textInput.autoFocus"
                  hint="Auto-focus the input field. If not set, auto-focus is disabled on mobile and enabled on desktop."
                  get={get}
                  set={set}
                />
              </Section>

              <Section
                title="Sound"
                hint="Play sound effects when messages are sent or received."
              >
                <BoolField
                  label="Send Message Sound"
                  path="theme.chatWindow.textInput.sendMessageSound"
                  hint="Play a sound effect when the user sends a message."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Send Sound Location"
                  path="theme.chatWindow.textInput.sendSoundLocation"
                  placeholder="URL"
                  hint="Custom audio file URL for the send sound. Uses a default if not set."
                  get={get}
                  set={set}
                />
                <BoolField
                  label="Receive Message Sound"
                  path="theme.chatWindow.textInput.receiveMessageSound"
                  hint="Play a sound effect when a bot message is received."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Receive Sound Location"
                  path="theme.chatWindow.textInput.receiveSoundLocation"
                  placeholder="URL"
                  hint="Custom audio file URL for the receive sound. Uses a default if not set."
                  get={get}
                  set={set}
                />
              </Section>

              <Section
                title="Feedback"
                hint="Configure the feedback thumbs-up/down controls."
              >
                <StrField
                  label="Color"
                  path="theme.chatWindow.feedback.color"
                  placeholder="#hex"
                  hint="Color of the feedback icons. E.g. '#303235'."
                  get={get}
                  set={set}
                />
              </Section>
            </div>
          </TabsContent>

          {/* ─── EXTRAS ─── */}
          <TabsContent value="extras" className="mt-0">
            <div className="space-y-6">
              <Section
                title="Disclaimer Popup"
                hint="A disclaimer popup shown before the user can start chatting. The user must accept to proceed."
              >
                <StrField
                  label="Title"
                  path="theme.disclaimer.title"
                  hint="Title of the disclaimer popup. E.g. 'Disclaimer'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Message"
                  path="theme.disclaimer.message"
                  className="sm:col-span-2"
                  hint="HTML-supported disclaimer body text. Can include links."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Text Color"
                  path="theme.disclaimer.textColor"
                  placeholder="#hex"
                  hint="Color of the disclaimer body text. E.g. 'black'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Button Color"
                  path="theme.disclaimer.buttonColor"
                  placeholder="#hex"
                  hint="Background color of the accept button. E.g. '#3b82f6'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Button Text Color"
                  path="theme.disclaimer.buttonTextColor"
                  placeholder="#hex"
                  hint="Text color of the accept button. E.g. 'white'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Button Text"
                  path="theme.disclaimer.buttonText"
                  hint="Label on the accept button. E.g. 'Start Chatting'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Blurred BG Color"
                  path="theme.disclaimer.blurredBackgroundColor"
                  placeholder="rgba(…)"
                  hint="Color of the blurred background overlay behind the popup. E.g. 'rgba(0, 0, 0, 0.4)'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Background Color"
                  path="theme.disclaimer.backgroundColor"
                  placeholder="#hex"
                  hint="Background color of the popup card itself. E.g. 'white'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Deny Button BG Color"
                  path="theme.disclaimer.denyButtonBgColor"
                  placeholder="#hex"
                  hint="Background color of the deny/cancel button. E.g. '#ef4444'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Deny Button Text"
                  path="theme.disclaimer.denyButtonText"
                  hint="Label on the deny button. E.g. 'Cancel'."
                  get={get}
                  set={set}
                />
              </Section>

              <Section
                title="Form"
                hint="Style the lead capture or input form if enabled in the chatflow."
              >
                <StrField
                  label="Background Color"
                  path="theme.form.backgroundColor"
                  placeholder="#hex"
                  hint="Background color of the form. E.g. 'white'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Text Color"
                  path="theme.form.textColor"
                  placeholder="#hex"
                  hint="Text color inside the form. E.g. 'black'."
                  get={get}
                  set={set}
                />
              </Section>

              <Section
                title="Footer"
                hint="A footer section at the bottom of the chat window, typically for branding."
              >
                <BoolField
                  label="Show Footer"
                  path="theme.chatWindow.footer.showFooter"
                  hint="Show or hide the footer section."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Text Color"
                  path="theme.chatWindow.footer.textColor"
                  placeholder="#hex"
                  hint="Color of the footer text. E.g. '#303235'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Text"
                  path="theme.chatWindow.footer.text"
                  hint="Footer label text. E.g. 'Powered by'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Company"
                  path="theme.chatWindow.footer.company"
                  hint="Company name shown in the footer. E.g. 'Flowise'."
                  get={get}
                  set={set}
                />
                <StrField
                  label="Company Link"
                  path="theme.chatWindow.footer.companyLink"
                  placeholder="https://…"
                  hint="URL the company name links to. E.g. 'https://flowiseai.com'."
                  get={get}
                  set={set}
                />
              </Section>

              <Separator />

              <div className="space-y-1">
                <FieldLabel
                  label="Custom CSS"
                  hint="Add custom CSS styles to override the chatbot's default appearance. Use !important to override."
                />
                <textarea
                  className={`${TEXTAREA_CLASS} min-h-[100px]`}
                  value={(get('theme.customCSS') as string) ?? ''}
                  onChange={(e) =>
                    set('theme.customCSS', e.target.value || undefined)
                  }
                  placeholder=".chatbot-container { … }"
                  spellCheck={false}
                />
              </div>
            </div>
          </TabsContent>

          {/* ─── EMBED / COPY SNIPPET ─── */}
          <TabsContent value="embed" className="mt-0">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium">Usage Snippet</h4>
                  <p className="text-xs text-muted-foreground">
                    Copy a ready-to-paste JSX example using the current
                    playground configuration.
                  </p>
                </div>
                <div>
                  <Button
                    type="button"
                    onClick={async () => {
                      const chatflowid = (get('chatflowid') as string) || ''
                      const apiHost = (get('apiHost') as string) || ''
                      const theme = get('theme') as
                        | Record<string, unknown>
                        | undefined
                      const minimalTheme = stripDefaults<
                        Record<string, unknown>
                      >(theme, DEFAULT_THEME as Record<string, unknown>)
                      let chatflowConfigObj: Record<string, unknown> | undefined
                      if (chatflowConfigJson?.trim()) {
                        try {
                          chatflowConfigObj = JSON.parse(chatflowConfigJson)
                        } catch {
                          chatflowConfigObj = undefined
                        }
                      }
                      const includeOnRequest = get('includeOnRequest') === true
                      const includeObservers = get('includeObservers') === true
                      const onRequestSource =
                        (get('onRequestSource') as string) || ''
                      const observersFlags =
                        (get('observersFlags') as Record<string, unknown>) ||
                        undefined
                      const perFlagSources = {
                        observeUserInput:
                          (get('observeUserInputSource') as string) || '',
                        observeMessages:
                          (get('observeMessagesSource') as string) || '',
                        observeLoading:
                          (get('observeLoadingSource') as string) || '',
                      }

                      const parts: string[] = []
                      parts.push(
                        "import { FullPageChat } from '@ai-platform/flowise-embed-react'\n"
                      )
                      parts.push('export default function MyChat() {')
                      parts.push('  return (')
                      parts.push('    <FullPageChat')
                      parts.push(`      chatflowid="${chatflowid}"`)
                      parts.push(`      apiHost="${apiHost}"`)
                      if (minimalTheme)
                        parts.push(
                          `      theme={${JSON.stringify(minimalTheme, null, 2)}}`
                        )
                      if (chatflowConfigObj)
                        parts.push(
                          `      chatflowConfig={${JSON.stringify(chatflowConfigObj, null, 2)}}`
                        )
                      if (includeOnRequest) {
                        if (onRequestSource && onRequestSource.trim())
                          parts.push(`      onRequest={${onRequestSource}}`)
                        else
                          parts.push(
                            '      onRequest={(req) => { console.log(req) }}'
                          )
                      }
                      if (includeObservers) {
                        parts.push(
                          `      observersConfig={${buildObserversConfigString(observersFlags ?? undefined, perFlagSources)}}`
                        )
                      }
                      parts.push('    />')
                      parts.push('  )')
                      parts.push('}')

                      const snippet = parts.join('\n')
                      try {
                        await navigator.clipboard.writeText(snippet)
                        setSnippetCopied(true)
                        setTimeout(() => setSnippetCopied(false), 2000)
                      } catch {
                        // ignore clipboard errors
                      }
                    }}
                  >
                    {snippetCopied ? 'Copied' : 'Copy Snippet'}
                  </Button>
                </div>
              </div>

              <pre className="max-h-72 overflow-auto rounded-md border bg-muted p-3 text-[12px]">
                <code>
                  {(() => {
                    const chatflowid = (get('chatflowid') as string) || ''
                    const apiHost = (get('apiHost') as string) || ''
                    const theme = get('theme') as
                      | Record<string, unknown>
                      | undefined
                    const minimalTheme = stripDefaults<Record<string, unknown>>(
                      theme,
                      DEFAULT_THEME as Record<string, unknown>
                    )
                    let chatflowConfigObj: Record<string, unknown> | undefined
                    if (chatflowConfigJson?.trim()) {
                      try {
                        chatflowConfigObj = JSON.parse(chatflowConfigJson)
                      } catch {
                        chatflowConfigObj = undefined
                      }
                    }
                    const includeOnRequest = get('includeOnRequest') === true
                    const includeObservers = get('includeObservers') === true
                    const onRequestSource =
                      (get('onRequestSource') as string) || ''
                    const observersFlags =
                      (get('observersFlags') as Record<string, unknown>) ||
                      undefined
                    const perFlagSources = {
                      observeUserInput:
                        (get('observeUserInputSource') as string) || '',
                      observeMessages:
                        (get('observeMessagesSource') as string) || '',
                      observeLoading:
                        (get('observeLoadingSource') as string) || '',
                    }

                    const parts: string[] = []
                    parts.push(
                      "import { FullPageChat } from '@ai-platform/flowise-embed-react'\n"
                    )
                    parts.push('export default function MyChat() {')
                    parts.push('  return (')
                    parts.push('    <FullPageChat')
                    parts.push(`      chatflowid="${chatflowid}"`)
                    parts.push(`      apiHost="${apiHost}"`)
                    if (minimalTheme)
                      parts.push(
                        `      theme={${JSON.stringify(minimalTheme, null, 2)}}`
                      )
                    if (chatflowConfigObj)
                      parts.push(
                        `      chatflowConfig={${JSON.stringify(chatflowConfigObj, null, 2)}}`
                      )
                    if (includeOnRequest) {
                      if (onRequestSource && onRequestSource.trim())
                        parts.push(`      onRequest={${onRequestSource}}`)
                      else
                        parts.push(
                          '      onRequest={(req) => { console.log(req) }}'
                        )
                    }
                    if (includeObservers) {
                      parts.push(
                        `      observersConfig={${buildObserversConfigString(observersFlags ?? undefined, perFlagSources)}}`
                      )
                    }
                    parts.push('    />')
                    parts.push('  )')
                    parts.push('}')

                    return parts.join('\n')
                  })()}
                </code>
              </pre>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* ── Save / Clear ── */}
      <div className="flex shrink-0 gap-2 border-t pt-3">
        <Button type="button" onClick={handleSave}>
          {saved ? '✓ Saved!' : 'Save'}
        </Button>
        <Button type="button" variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export default ConfigForm
