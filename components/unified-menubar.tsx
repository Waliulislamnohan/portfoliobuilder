"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu, Sparkles, Layout, FileText, PenTool, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function UnifiedMenubar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      name: "Home",
      path: "/",
      icon: <Layout className="h-4 w-4 mr-2" />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Layout className="h-4 w-4 mr-2" />,
    },
    {
      name: "Create Portfolio",
      path: "/create-portfolio",
      icon: <PenTool className="h-4 w-4 mr-2" />,
    },
    {
      name: "My Portfolio",
      path: "/portfolio/preview",
      icon: <FileText className="h-4 w-4 mr-2" />,
    },
    {
      name: "Website Redesign",
      path: "/website-redesign",
      icon: <Globe className="h-4 w-4 mr-2" />,
      badge: "NEW",
    },
  ]

  return (
    <header className="border-b backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80 sticky top-0 z-40">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              PortfolioBuilder
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "flex items-center font-medium relative group transition-colors",
                pathname === route.path
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {route.icon}
              {route.name}
              {route.badge && (
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white">
                  {route.badge}
                </span>
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="hidden md:flex items-center mr-2">
          <ThemeToggle />
        </div>

        {/* Action Button */}
        <div className="hidden md:block">
          <Button
            asChild
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-lg hover:shadow-indigo-600/25 transition-all duration-300"
          >
            <Link href="/create-portfolio">
              <Sparkles className="h-4 w-4 mr-2" /> Create Portfolio
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 pt-10">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "flex items-center py-2 px-4 rounded-lg font-medium transition-colors",
                      pathname === route.path
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                        : "hover:bg-muted",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.icon}
                    {route.name}
                    {route.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white">
                        {route.badge}
                      </span>
                    )}
                  </Link>
                ))}

                {/* Mobile Theme Toggle */}
                <div className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Toggle Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
