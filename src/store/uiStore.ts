import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface UIState {
  isSidebarOpen: boolean
  theme: Theme
  toggleSidebar: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const applyTheme = (theme: Theme) => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      isSidebarOpen: true,
      theme: 'light' as Theme,
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setTheme: (theme: Theme) => {
        applyTheme(theme)
        set({ theme })
      },
      toggleTheme: () => {
        const next: Theme = get().theme === 'light' ? 'dark' : 'light'
        applyTheme(next)
        set({ theme: next })
      },
    }),
    {
      name: 'ui-store',
      partialize: (state) => ({ theme: state.theme }),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyTheme(state.theme)
      },
    }
  )
)

// Apply theme immediately on module load to avoid flash on refresh
try {
  const stored = JSON.parse(localStorage.getItem('ui-store') ?? '{}') as {
    state?: { theme?: Theme }
  }
  applyTheme(stored?.state?.theme ?? 'light')
} catch {
  // ignore parse errors
}
