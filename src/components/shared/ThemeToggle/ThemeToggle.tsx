import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui'
import { useUIStore } from '@/store/uiStore'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useUIStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-4 w-4" />
      ) : (
        <Sun className="h-4 w-4" />
      )}
    </Button>
  )
}

export default ThemeToggle
