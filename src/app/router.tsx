import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AppLayout } from '@/components/shared/AppLayout'

const IntroductionPage = lazy(
  () => import('@/pages/introduction/IntroductionPage')
)
const HomePage = lazy(() => import('@/pages/home/HomePage'))
const ExamplePage = lazy(() => import('@/pages/example/ExamplePage'))
const FullPageChatPage = lazy(
  () => import('@/pages/fullpage-chat/FullPageChatPage')
)
const BubbleChatPage = lazy(() => import('@/pages/bubble-chat/BubbleChatPage'))

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <IntroductionPage /> },
      { path: 'installation', element: <HomePage /> },
      { path: 'example', element: <ExamplePage /> },
      { path: 'fullpage', element: <FullPageChatPage /> },
      { path: 'bubblechat', element: <BubbleChatPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])

export const AppRouter = () => (
  <Suspense
    fallback={
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    }
  >
    <RouterProvider router={router} />
  </Suspense>
)
