import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { TooltipProvider } from '@/components/ui'
import { queryClient } from '@/lib/queryClient'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
      <Toaster position="top-right" richColors />
    </QueryClientProvider>
  )
}

export default Providers
