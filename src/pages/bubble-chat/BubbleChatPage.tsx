import { BubbleChat } from '@ai-platform/flowise-embed-react'
import { useFlowiseConfig } from '@/hooks/useFlowiseConfig'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'

const metrics = [
  { label: 'Total Users', value: '12,480', change: '+8.2%', up: true },
  { label: 'Active Sessions', value: '342', change: '+3.1%', up: true },
  { label: 'Avg. Response Time', value: '1.4s', change: '-12%', up: false },
  { label: 'Resolved Chats', value: '94.7%', change: '+1.5%', up: true },
]

const recentChats = [
  {
    id: 1,
    user: 'Alice M.',
    topic: 'Order status inquiry',
    time: '2 min ago',
    status: 'Resolved',
  },
  {
    id: 2,
    user: 'Bob K.',
    topic: 'Product recommendation',
    time: '9 min ago',
    status: 'Resolved',
  },
  {
    id: 3,
    user: 'Carol S.',
    topic: 'Return & refund policy',
    time: '14 min ago',
    status: 'Open',
  },
  {
    id: 4,
    user: 'David L.',
    topic: 'Account login issue',
    time: '22 min ago',
    status: 'Resolved',
  },
  {
    id: 5,
    user: 'Eva R.',
    topic: 'Shipping address change',
    time: '35 min ago',
    status: 'Open',
  },
]

const BubbleChatPage = () => {
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

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-7 pb-20">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome back — here's what's happening today.
          </p>
        </div>
        <span className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="flex flex-col gap-1.5 p-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {m.label}
              </span>
              <span className="text-2xl font-bold">{m.value}</span>
              <span
                className={`text-xs font-semibold ${m.up ? 'text-green-500' : 'text-orange-500'}`}
              >
                {m.up ? '▲' : '▼'} {m.change}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-[2fr_1fr] gap-4 max-sm:grid-cols-1">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Chat Volume (last 7 days)</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center">
            <svg
              viewBox="0 0 340 80"
              className="h-20 w-full"
              aria-hidden="true"
            >
              <polyline
                points="0,65 48,50 96,55 144,30 192,40 240,20 288,30 340,15"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="0,65 48,50 96,55 144,30 192,40 240,20 288,30 340,15 340,80 0,80"
                fill="hsl(var(--primary) / 0.08)"
                stroke="none"
              />
            </svg>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 80 80" className="h-20 w-20" aria-hidden="true">
              <circle
                cx="40"
                cy="40"
                r="28"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="14"
                strokeDasharray="115 62"
                strokeDashoffset="0"
              />
              <circle
                cx="40"
                cy="40"
                r="28"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="14"
                strokeDasharray="62 115"
                strokeDashoffset="-115"
              />
            </svg>
            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
              <span className="text-primary">● Resolved 65%</span>
              <span>● Open 35%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent chats table */}
      <Card>
        <CardHeader className="flex-row items-center justify-between border-b pb-3">
          <CardTitle className="text-sm">Recent Conversations</CardTitle>
          <button className="text-xs font-semibold text-primary hover:underline">
            View all
          </button>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  #
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  User
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Topic
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Time
                </th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentChats.map((row) => (
                <tr
                  key={row.id}
                  className="border-b last:border-0 hover:bg-accent/50"
                >
                  <td className="px-4 py-2.5 text-muted-foreground/50">
                    {row.id}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">
                    {row.user}
                  </td>
                  <td className="px-4 py-2.5">{row.topic}</td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-xs text-muted-foreground">
                    {row.time}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        row.status === 'Resolved'
                          ? 'bg-green-500/15 text-green-600 dark:text-green-400'
                          : 'bg-orange-500/15 text-orange-600 dark:text-orange-400'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Bubble chat — only render when config is present */}
      {chatflowid && apiHost && (
        <BubbleChat
          key={configKey}
          chatflowid={chatflowid}
          apiHost={apiHost}
          {...(theme ? { theme } : {})}
          {...(chatflowConfig ? { chatflowConfig } : {})}
          {...(includeOnRequest
            ? {
                onRequest: async (request: RequestInit) => {
                  console.log('onRequest', request)
                },
              }
            : {})}
          {...(includeObservers
            ? {
                observersConfig: {
                  ...(observersFlags?.observeUserInput
                    ? {
                        observeUserInput: (v: unknown) =>
                          console.log('observeUserInput', v),
                      }
                    : {}),
                  ...(observersFlags?.observeMessages
                    ? {
                        observeMessages: (v: unknown) =>
                          console.log('observeMessages', v),
                      }
                    : {}),
                  ...(observersFlags?.observeLoading
                    ? {
                        observeLoading: (v: unknown) =>
                          console.log('observeLoading', v),
                      }
                    : {}),
                },
              }
            : {})}
        />
      )}
    </div>
  )
}

export default BubbleChatPage
