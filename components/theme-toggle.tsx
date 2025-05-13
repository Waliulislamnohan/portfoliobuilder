"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button type="button" className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 opacity-0" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="rounded-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      onClick={() => {
        // Log current state
        console.log("Current theme:", theme)

        // Try both methods to ensure theme changes
        if (typeof window !== "undefined") {
          // Method 1: Direct DOM manipulation as fallback
          const isDark = document.documentElement.classList.contains("dark")
          if (isDark) {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
          } else {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme", "dark")
          }

          // Method 2: Use the theme provider if available
          try {
            setTheme(theme === "dark" ? "light" : "dark")
          } catch (error) {
            console.error("Error setting theme:", error)
          }

          // Log the new state
          console.log("New theme:", document.documentElement.classList.contains("dark") ? "dark" : "light")
        }
      }}
      aria-label="Toggle theme"
    >
      {theme === "dark" || document.documentElement?.classList.contains("dark") ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
