import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { PanelLeft, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { ThemeToggle } from '@/components/shared'
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui'
import ConfigForm from '@/components/shared/Config/ConfigForm'

const navGroups = [
  {
    label: 'Get Started',
    items: [{ to: '/', label: 'Installation' }],
  },
  {
    label: 'Playground',
    items: [
      { to: '/fullpage', label: 'Full Chat' },
      { to: '/bubblechat', label: 'Bubble Chat' },
    ],
  },
]

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* ── Top Navbar ── */}
      <header className="relative z-50 flex h-14 shrink-0 items-center justify-between bg-background px-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">Agentlab Chatbot</span>
          {/* Desktop: toggle sidebar collapse | Mobile: open sidebar overlay */}
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth >= 768) {
                setCollapsed((s) => !s)
              } else {
                setMobileOpen(true)
              }
            }}
            aria-label="Toggle sidebar"
            className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <PanelLeft className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Config</Button>
            </DialogTrigger>
            <DialogContent className="flex max-h-[85vh] max-w-4xl flex-col">
              <DialogHeader className="shrink-0">
                <DialogTitle>Playground Configuration</DialogTitle>
                <DialogDescription>
                  Configure all Flowise chatbot props. Changes are persisted in
                  localStorage and applied live.
                </DialogDescription>
              </DialogHeader>
              <ConfigForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Horizontal gradient override for the navbar bottom (desktop) */}
        <div
          className={cn(
            'absolute bottom-0 block h-px bg-gradient-to-r from-transparent via-border to-transparent',
            isMobile
              ? 'left-1/2 -translate-x-1/2 transform'
              : collapsed
                ? 'left-14 right-0'
                : 'left-52 right-0'
          )}
          style={isMobile ? { width: 'calc(100% - 3rem)' } : undefined}
        />
      </header>

      {/* ── Body (sidebar + main) ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 top-14 z-30 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* ── Sidebar ── */}
        <aside
          className={cn(
            'flex flex-col bg-background transition-all duration-200',
            // Mobile: fixed overlay below navbar; Desktop: normal flex item
            'fixed bottom-0 left-0 top-14 z-40',
            'md:relative md:bottom-auto md:top-auto md:z-auto',
            collapsed ? 'w-14 min-w-14' : 'w-[260px] min-w-[260px]',
            mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          )}
        >
          {/* Mobile — close row */}
          <div className="flex items-center justify-between border-b border-border px-3 py-3 md:hidden">
            <span className="text-sm font-medium">Menu</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded p-1 hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="mx-6 mt-2 flex flex-1 flex-col gap-6 overflow-y-auto p-2 pt-4">
            <div className="h-10"></div>
            {navGroups.map((group) => (
              <div key={group.label}>
                {!collapsed && (
                  <p className="mb-2 px-2.5 text-xs font-medium text-muted-foreground">
                    {group.label}
                  </p>
                )}
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'group flex items-center gap-2 font-medium transition-colors',
                        collapsed ? 'justify-center' : ''
                      )}
                    >
                      {({ isActive }: { isActive: boolean }) => (
                        <>
                          <span
                            className={cn(
                              collapsed
                                ? 'hidden'
                                : 'inline-block rounded-md px-2.5 py-1.5 text-sm',
                              isActive
                                ? 'bg-accent text-accent-foreground'
                                : 'group-hover:bg-accent group-hover:text-accent-foreground'
                            )}
                          >
                            {item.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          {/* Vertical divider along the right edge of the sidebar (desktop) */}
          <div className="absolute bottom-0 right-0 top-0 flex w-px bg-gradient-to-b from-transparent via-border to-transparent" />
        </aside>

        {/* ── Main content ── */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
