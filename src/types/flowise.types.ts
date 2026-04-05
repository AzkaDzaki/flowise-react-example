export interface AutoWindowOpen {
  autoOpen?: boolean
  openDelay?: number
  autoOpenOnMobile?: boolean
}

export interface ButtonTheme {
  size?: 'small' | 'medium' | 'large' | number
  backgroundColor?: string
  iconColor?: string
  customIconSrc?: string
  bottom?: number
  right?: number
  dragAndDrop?: boolean
  autoWindowOpen?: AutoWindowOpen
}

export interface ToolTipTheme {
  showTooltip?: boolean
  tooltipMessage?: string
  tooltipBackgroundColor?: string
  tooltipTextColor?: string
  tooltipFontSize?: number
}

export interface DisclaimerPopUpTheme {
  title?: string
  message?: string
  textColor?: string
  buttonColor?: string
  buttonTextColor?: string
  buttonText?: string
  blurredBackgroundColor?: string
  backgroundColor?: string
  denyButtonBgColor?: string
  denyButtonText?: string
}

export interface FormTheme {
  backgroundColor?: string
  textColor?: string
}

export interface MessageTheme {
  backgroundColor?: string
  textColor?: string
  showAvatar?: boolean
  avatarSrc?: string
}

export interface TextInputTheme {
  backgroundColor?: string
  textColor?: string
  placeholder?: string
  sendButtonColor?: string
  maxChars?: number
  maxCharsWarningMessage?: string
  autoFocus?: boolean
  sendMessageSound?: boolean
  sendSoundLocation?: string
  receiveMessageSound?: boolean
  receiveSoundLocation?: string
}

export interface FeedbackTheme {
  color?: string
}

export interface FooterTheme {
  showFooter?: boolean
  textColor?: string
  text?: string
  company?: string
  companyLink?: string
}

export interface DateTimeToggle {
  date?: boolean
  time?: boolean
}

export interface ChatWindowTheme {
  showTitle?: boolean
  showAgentMessages?: boolean
  title?: string
  titleAvatarSrc?: string
  titleTextColor?: string
  titleBackgroundColor?: string
  welcomeMessage?: string
  errorMessage?: string
  backgroundColor?: string
  backgroundImage?: string
  height?: number
  width?: number
  fontSize?: number
  sourceDocsTitle?: string
  poweredByTextColor?: string
  starterPrompts?: string[]
  starterPromptFontSize?: number
  clearChatOnReload?: boolean
  renderHTML?: boolean
  userMessage?: MessageTheme
  botMessage?: MessageTheme
  textInput?: TextInputTheme
  feedback?: FeedbackTheme
  footer?: FooterTheme
  dateTimeToggle?: DateTimeToggle
}

export interface BubbleTheme {
  customCSS?: string
  button?: ButtonTheme
  tooltip?: ToolTipTheme
  disclaimer?: DisclaimerPopUpTheme
  form?: FormTheme
  chatWindow?: ChatWindowTheme
}

export interface FlowiseConfig {
  chatflowid: string
  apiHost: string
  chatflowConfig?: Record<string, unknown>
  theme?: BubbleTheme
}
