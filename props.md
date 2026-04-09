# Flowise Chat Embed Props

This file lists the public init props and theme props currently supported by this package, including effective defaults from code.

## 1) Top-level props (`Chatbot.init`, `Chatbot.initFull`)

| Prop                               | Type                                      |     Default | Notes                                                                 |
| ---------------------------------- | ----------------------------------------- | ----------: | --------------------------------------------------------------------- |
| `chatflowid`                       | `string`                                  |        `''` | Required in practice; empty string is only the web-component default. |
| `apiHost`                          | `string`                                  | `undefined` | API base URL.                                                         |
| `onRequest`                        | `(request: RequestInit) => Promise<void>` | `undefined` | Hook to modify request.                                               |
| `chatflowConfig`                   | `Record<string, unknown>`                 | `undefined` | Override config sent to backend.                                      |
| `observersConfig.observeUserInput` | `(value) => void`                         | `undefined` | Optional observer.                                                    |
| `observersConfig.observeLoading`   | `(value) => void`                         | `undefined` | Optional observer.                                                    |
| `observersConfig.observeMessages`  | `(value) => void`                         | `undefined` | Optional observer.                                                    |
| `theme`                            | `BubbleTheme`                             | `undefined` | Full theme object.                                                    |
| `id` (`initFull` only)             | `string`                                  | `undefined` | Target element id for full mode mount.                                |

---

## 2) `theme.button`

| Prop                              | Type                                       |                                    Default |
| --------------------------------- | ------------------------------------------ | -----------------------------------------: |
| `size`                            | `'small' \| 'medium' \| 'large' \| number` | `48` (`small=32`, `medium=48`, `large=64`) |
| `backgroundColor`                 | `string`                                   |                                  `#3B81F6` |
| `iconColor`                       | `string`                                   |                                  `#444746` |
| `customIconSrc`                   | `string`                                   |                                `undefined` |
| `bottom`                          | `number`                                   |                                       `20` |
| `right`                           | `number`                                   |                                       `20` |
| `dragAndDrop`                     | `boolean`                                  |                                    `false` |
| `autoWindowOpen.autoOpen`         | `boolean`                                  |                                    `false` |
| `autoWindowOpen.openDelay`        | `number`                                   |                                `2` seconds |
| `autoWindowOpen.autoOpenOnMobile` | `boolean`                                  |                                    `false` |

---

## 3) `theme.tooltip`

| Prop                     | Type      |        Default |
| ------------------------ | --------- | -------------: |
| `showTooltip`            | `boolean` |        `false` |
| `tooltipMessage`         | `string`  | `Hi There 👋!` |
| `tooltipBackgroundColor` | `string`  |        `black` |
| `tooltipTextColor`       | `string`  |        `white` |
| `tooltipFontSize`        | `number`  |           `16` |

---

## 4) `theme.chatWindow`

| Prop                    | Type               |                                         Default | Notes                                                                       |
| ----------------------- | ------------------ | ----------------------------------------------: | --------------------------------------------------------------------------- |
| `showTitle`             | `boolean`          |                                          `true` | Set by `mergeProps({ showTitle: true }, botProps)`.                         |
| `showAgentMessages`     | `boolean`          |                                         `false` | Hidden unless explicitly true.                                              |
| `title`                 | `string`           |                                      `AgentLab` |
| `titleAvatarSrc`        | `string`           |                                          `none` |
| `titleTextColor`        | `string`           |                                  fallback chain | `titleTextColor -> bubbleTextColor (#444746) -> backgroundColor (#ffffff)`. |
| `titleBackgroundColor`  | `string`           |                                       `#ffffff` |
| `welcomeMessage`        | `string`           |                     `Hi there! How can I help?` |
| `errorMessage`          | `string`           |                              runtime error text | Per error branch if no custom error message.                                |
| `backgroundColor`       | `string`           |                                       `#ffffff` |
| `backgroundImage`       | `string`           |                                          `none` |
| `height`                | `number \| string` |     bubble:`calc(100% - 150px)` / full:`100dvh` | Mode-specific fallback.                                                     |
| `width`                 | `number \| string` | bubble: responsive `sm:w-[400px]` / full:`100%` | In bubble inline style width is unset unless provided.                      |
| `fontSize`              | `number`           |      component defaults (`16` in bubbles/forms) |
| `sourceDocsTitle`       | `string`           |                           not rendered if unset |
| `poweredByTextColor`    | `string`           |                                       `#303235` |
| `starterPrompts`        | `string[]`         |                                            none |
| `starterPromptFontSize` | `number`           |                      internal component default |
| `clearChatOnReload`     | `boolean`          |                                         `false` |
| `dateTimeToggle.date`   | `boolean`          |                                         `false` |
| `dateTimeToggle.time`   | `boolean`          |                                         `false` |
| `renderHTML`            | `boolean`          |                                         `false` |
| `renderHtmlCode`        | `boolean`          |                                         `false` |
| `renderChart`           | `boolean`          |                                         `false` |
| `renderUrl`             | `boolean`          |                                         `false` |
| `renderMermaid`         | `boolean`          |                                         `false` |
| `renderUrlPrefixes`     | `string[]`         |                                            `[]` | No built-in prefix default.                                                 |

### `theme.chatWindow.userMessage`

| Prop              | Type      |     Default |
| ----------------- | --------- | ----------: |
| `backgroundColor` | `string`  |   `#e9eef6` |
| `textColor`       | `string`  |   `#1f1f1f` |
| `showAvatar`      | `boolean` |     `false` |
| `avatarSrc`       | `string`  | `undefined` |

### `theme.chatWindow.botMessage`

| Prop              | Type      |     Default |
| ----------------- | --------- | ----------: |
| `backgroundColor` | `string`  |   `#ffffff` |
| `textColor`       | `string`  |   `#1f1f1f` |
| `showAvatar`      | `boolean` |     `false` |
| `avatarSrc`       | `string`  | `undefined` |

### `theme.chatWindow.textInput`

| Prop                     | Type      |                               Default |
| ------------------------ | --------- | ------------------------------------: |
| `backgroundColor`        | `string`  |                             `#ffffff` |
| `textColor`              | `string`  |                             `#303235` |
| `placeholder`            | `string`  |                  `Type your question` |
| `sendButtonColor`        | `string`  | send icon/button text color `#0b57d0` |
| `maxChars`               | `number`  |                              no limit |
| `maxCharsWarningMessage` | `string`  |           autogenerated limit message |
| `autoFocus`              | `boolean` |        desktop `true`, mobile `false` |
| `sendMessageSound`       | `boolean` |                               `false` |
| `sendSoundLocation`      | `string`  |                CDN default send sound |
| `receiveMessageSound`    | `boolean` |                               `false` |
| `receiveSoundLocation`   | `string`  |             CDN default receive sound |

### `theme.chatWindow.feedback`

| Prop    | Type     |   Default |
| ------- | -------- | --------: |
| `color` | `string` | `#e9eef6` |

### `theme.chatWindow.footer`

| Prop          | Type      |      Default |
| ------------- | --------- | -----------: |
| `showFooter`  | `boolean` |       `true` |
| `textColor`   | `string`  |    `#303235` |
| `text`        | `string`  | `Powered by` |
| `company`     | `string`  |   `AgentLab` |
| `companyLink` | `string`  |          `#` |

---

## 5) `theme.form`

| Prop              | Type     |   Default |
| ----------------- | -------- | --------: |
| `backgroundColor` | `string` | `#ffffff` |
| `textColor`       | `string` | `#1f1f1f` |

---

## 6) `theme.disclaimer`

| Prop                     | Type     |                                                      Default |
| ------------------------ | -------- | -----------------------------------------------------------: |
| `title`                  | `string` |                                                 `Disclaimer` |
| `message`                | `string` | `By using this chatbot, you agree to the Terms & Condition.` |
| `textColor`              | `string` |                                                      `black` |
| `buttonColor`            | `string` |                                                    `#3b82f6` |
| `buttonTextColor`        | `string` |                                                      `white` |
| `buttonText`             | `string` |                                             `Start Chatting` |
| `blurredBackgroundColor` | `string` |                                         `rgba(0, 0, 0, 0.4)` |
| `backgroundColor`        | `string` |                                                      `white` |
| `denyButtonBgColor`      | `string` |                                                    `#ef4444` |
| `denyButtonText`         | `string` |                                                     `Cancel` |

---

## 7) CSS variable defaults (resolved)

These are the base theme tokens defined in `src/assets/index.css`.

| CSS Variable                        |     Value |
| ----------------------------------- | --------: |
| `--chatbot-bg-color`                | `#ffffff` |
| `--chatbot-title-bg-color`          | `#ffffff` |
| `--chatbot-text-color`              | `#1f1f1f` |
| `--chatbot-button-bg-color`         | `#0042da` |
| `--chatbot-button-color`            | `#444746` |
| `--chatbot-host-bubble-bg-color`    | `#ffffff` |
| `--chatbot-host-bubble-color`       | `#1f1f1f` |
| `--chatbot-guest-bubble-bg-color`   | `#e9eef6` |
| `--chatbot-guest-bubble-color`      | `#1f1f1f` |
| `--chatbot-input-bg-color`          | `#ffffff` |
| `--chatbot-input-color`             | `#303235` |
| `--chatbot-input-placeholder-color` | `#9095a0` |
| `--chatbot-header-bg-color`         | `#ffffff` |
| `--chatbot-header-color`            | `#303235` |
| `--chatbot-border-radius`           |     `6px` |
