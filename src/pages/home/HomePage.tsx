const NPMRC = `@ai-platform:registry=https://gitlab.playcourt.id/api/v4/projects/32330/packages/npm/
//gitlab.playcourt.id/api/v4/projects/32330/packages/npm/:_authToken=1pGym154F_PGNktJG4h3`

const REACT_WRAPPER_USAGE = `import { FullPageChat, BubbleChat } from '@ai-platform/flowise-embed-react'

// Full-page chat
<FullPageChat chatflowid="YOUR_CHATFLOW_ID" apiHost="YOUR_API_HOST" />

// Bubble (popup) chat
<BubbleChat chatflowid="YOUR_CHATFLOW_ID" apiHost="YOUR_API_HOST" />`

const REACT_EMBED_POPUP = `import { useEffect, useRef } from 'react'

export default function ChatPopup() {
  const ref = useRef(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const mod = await import('@ai-platform/flowise-embed/dist/web.js')
      const Chatbot = mod?.default ?? mod
      if (cancelled || !Chatbot) return
      await Chatbot.init({
        chatflowid: 'YOUR_CHATFLOW_ID',
        apiHost: 'YOUR_API_HOST',
        container: ref.current,
      })
    })()
    return () => {
      cancelled = true
      if (ref.current) ref.current.innerHTML = ''
    }
  }, [])

  return <div ref={ref} style={{ height: '80vh' }} />
}`

const REACT_EMBED_FULLPAGE = `import { useEffect } from 'react'

export default function ChatFullpage() {
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const mod = await import('@ai-platform/flowise-embed/dist/web.js')
      const Chatbot = mod?.default ?? mod
      if (cancelled || !Chatbot) return
      Chatbot.initFull({
        chatflowid: 'YOUR_CHATFLOW_ID',
        apiHost: 'YOUR_API_HOST',
      })
    })()
    return () => {
      cancelled = true
      window.FlowiseChatbot?.destroyFull?.()
    }
  }, [])

  // flowise-fullchatbot is a native custom element registered by the bundle
  return <flowise-fullchatbot style={{ width: '100%', height: '100%' }} />
}`

const VUE_VITE_CONFIG = `// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat flowise- prefixed tags as native custom elements
          isCustomElement: (tag) => tag.startsWith('flowise-'),
        },
      },
    }),
  ],
})`

const VUE_EMBED_POPUP = `<!-- ChatPopup.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref(null)
let cancelled = false

onMounted(async () => {
  const mod = await import('@ai-platform/flowise-embed/dist/web.js')
  const Chatbot = mod?.default ?? mod
  if (cancelled || !Chatbot) return
  await Chatbot.init({
    chatflowid: 'YOUR_CHATFLOW_ID',
    apiHost: 'YOUR_API_HOST',
    container: containerRef.value,
  })
})

onUnmounted(() => {
  cancelled = true
  if (containerRef.value) containerRef.value.innerHTML = ''
})
</script>

<template>
  <div ref="containerRef" style="height: 80vh" />
</template>`

const VUE_EMBED_FULLPAGE = `<!-- ChatFullpage.vue -->
<script setup>
import { onMounted, onUnmounted } from 'vue'

let cancelled = false

onMounted(async () => {
  const mod = await import('@ai-platform/flowise-embed/dist/web.js')
  const Chatbot = mod?.default ?? mod
  if (cancelled || !Chatbot) return
  Chatbot.initFull({
    chatflowid: 'YOUR_CHATFLOW_ID',
    apiHost: 'YOUR_API_HOST',
  })
})

onUnmounted(() => {
  cancelled = true
  window.FlowiseChatbot?.destroyFull?.()
})
</script>

<template>
  <flowise-fullchatbot style="width: 100%; height: 100%" />
</template>`

const Badge = ({ children }: { children: string }) => (
  <span className="inline-block rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
    {children}
  </span>
)

const CodeBlock = ({ code }: { code: string }) => (
  <pre className="mt-2 overflow-auto rounded bg-muted p-3 text-xs leading-relaxed">
    <code>{code}</code>
  </pre>
)

const Divider = () => <hr className="border-border" />

const HomePage = () => {
  return (
    <div className="flex flex-1 items-start justify-center overflow-y-auto p-8">
      <div className="w-full max-w-3xl space-y-8">
        <section className="space-y-6">
          <header>
            <h3 className="text-base">Get Started</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose how you want to embed the Flowise chatbot into your
              project. All options use the same{' '}
              <code className="text-xs">@ai-platform</code> registry.
            </p>
          </header>

          {/* Prerequisites */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Prerequisites</h4>
            <p className="text-sm text-muted-foreground">
              Create a{' '}
              <strong>
                <code className="text-xs">.npmrc</code>
              </strong>{' '}
              file in your project root:
            </p>
            <CodeBlock code={NPMRC} />
          </div>

          <Divider />

          {/* Option 1: flowise-embed-react */}
          <div className="space-y-3">
            <div className="space-y-1">
              <Badge>Option 1</Badge>
              <h4 className="text-sm font-semibold">
                React —{' '}
                <code className="text-xs">
                  @ai-platform/flowise-embed-react
                </code>
              </h4>
              <p className="text-xs text-muted-foreground">
                Official React wrapper. The simplest way to embed Flowise in a
                React project — no manual bundle loading required.
              </p>
            </div>
            <ol className="list-inside list-decimal space-y-3 text-sm text-muted-foreground">
              <li>
                Install the package:
                <CodeBlock code="npm install @ai-platform/flowise-embed-react" />
              </li>
              <li>
                Import and render:
                <CodeBlock code={REACT_WRAPPER_USAGE} />
              </li>
              <li>Run your application.</li>
            </ol>
          </div>

          <Divider />

          {/* Option 2: flowise-embed in React */}
          <div className="space-y-3">
            <div className="space-y-1">
              <Badge>Option 2</Badge>
              <h4 className="text-sm font-semibold">
                React —{' '}
                <code className="text-xs">@ai-platform/flowise-embed</code>
              </h4>
              <p className="text-xs text-muted-foreground">
                The underlying Solid.js package. Loaded dynamically at runtime
                and mounted as a native web component. Use this when you need
                direct access to the base package or want finer control.
              </p>
            </div>
            <ol className="list-inside list-decimal space-y-3 text-sm text-muted-foreground">
              <li>
                Install the package:
                <CodeBlock code="npm install @ai-platform/flowise-embed" />
              </li>
              <li>
                Bubble (popup) chat component:
                <CodeBlock code={REACT_EMBED_POPUP} />
              </li>
              <li>
                Full-page chat component:
                <CodeBlock code={REACT_EMBED_FULLPAGE} />
              </li>
              <li>Render the component in your route or page.</li>
            </ol>
          </div>

          <Divider />

          {/* Option 3: flowise-embed in Vue */}
          <div className="space-y-3">
            <div className="space-y-1">
              <Badge>Option 3</Badge>
              <h4 className="text-sm font-semibold">
                Vue —{' '}
                <code className="text-xs">@ai-platform/flowise-embed</code>
              </h4>
              <p className="text-xs text-muted-foreground">
                Same base package, used in a Vue 3 + Vite project. The bundle
                registers <code className="text-xs">flowise-fullchatbot</code>{' '}
                as a native custom element — Vue must be told to treat it as
                such.
              </p>
            </div>
            <ol className="list-inside list-decimal space-y-3 text-sm text-muted-foreground">
              <li>
                Install the package:
                <CodeBlock code="npm install @ai-platform/flowise-embed" />
              </li>
              <li>
                Configure Vite to recognize the custom element:
                <CodeBlock code={VUE_VITE_CONFIG} />
              </li>
              <li>
                Bubble (popup) chat component:
                <CodeBlock code={VUE_EMBED_POPUP} />
              </li>
              <li>
                Full-page chat component:
                <CodeBlock code={VUE_EMBED_FULLPAGE} />
              </li>
              <li>Use the component in your route or view.</li>
            </ol>
          </div>
        </section>

        <div className="rounded-l-2 border-l-2 border-muted/60 bg-muted p-3 text-sm text-muted-foreground">
          <strong>Note:</strong> All options support the same props and theme
          configuration. See{' '}
          <a
            href="https://docs.flowiseai.com/using-flowise/embed"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            Flowise embed docs
          </a>{' '}
          for the full props reference.
        </div>
      </div>
    </div>
  )
}

export default HomePage
