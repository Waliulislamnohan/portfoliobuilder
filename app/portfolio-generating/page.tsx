"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Sparkles } from "lucide-react"

export default function PortfolioGenerating() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Initializing...")
  const [portfolioData, setPortfolioData] = useState(null)

  useEffect(() => {
    // Load portfolio data from localStorage
    const loadPortfolioData = () => {
      try {
        const savedData = localStorage.getItem("portfolioData")
        if (savedData) {
          const parsedData = JSON.parse(savedData)
          console.log("Loaded portfolio data:", parsedData)
          setPortfolioData(parsedData)
          return true
        }
        return false
      } catch (error) {
        console.error("Error loading portfolio data:", error)
        return false
      }
    }

    const hasData = loadPortfolioData()

    if (!hasData) {
      // If no data, redirect back to create portfolio
      console.error("No portfolio data found")
      router.push("/create-portfolio")
      return
    }

    // Simulate portfolio generation with progress updates
    const steps = [
      { progress: 10, status: "Analyzing your information..." },
      { progress: 20, status: "Preparing portfolio structure..." },
      { progress: 35, status: "Optimizing project showcase..." },
      { progress: 50, status: "Generating experience timeline..." },
      { progress: 65, status: "Creating skills visualization..." },
      { progress: 80, status: "Applying design elements..." },
      { progress: 90, status: "Finalizing your portfolio..." },
      { progress: 100, status: "Portfolio ready!" },
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress)
        setStatus(steps[currentStep].status)
        currentStep++
      } else {
        clearInterval(interval)

        // Redirect to portfolio preview page
        setTimeout(() => {
          router.push("/portfolio/preview")
        }, 1000)
      }
    }, 1200) // Adjust timing for a realistic generation experience

    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10rem] -left-[10rem] w-[40rem] h-[40rem] bg-violet-400 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
        <div className="absolute -top-[5rem] -right-[10rem] w-[45rem] h-[45rem] bg-fuchsia-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[25rem] left-[15rem] w-[40rem] h-[40rem] bg-rose-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full mx-auto p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full mb-4">
            <Sparkles className="h-6 w-6 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Generating Your Portfolio</h1>
          <p className="text-muted-foreground">Please wait while we create your professional portfolio</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-indigo-100 dark:border-indigo-900/50 shadow-lg">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{status}</span>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-indigo-100 dark:bg-indigo-900/30">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </Progress>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-indigo-600 mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-indigo-100 dark:bg-indigo-900/30 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-indigo-300 mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-indigo-100 dark:bg-indigo-900/30 rounded animate-pulse animation-delay-200"></div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-indigo-200 mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-indigo-100 dark:bg-indigo-900/30 rounded animate-pulse animation-delay-500"></div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              This may take a moment. We're crafting a beautiful portfolio that showcases your skills and experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
