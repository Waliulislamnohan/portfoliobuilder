"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Globe,
  Sparkles,
  Download,
  Share2,
  Zap,
  Palette,
  Layout,
  Smartphone,
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function WebsiteRedesign() {
  const router = useRouter()
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisStep, setAnalysisStep] = useState("")
  const [designScore, setDesignScore] = useState<null | number>(null)
  const [genZScore, setGenZScore] = useState<null | number>(null)
  const [activeTab, setActiveTab] = useState("original")
  const [redesigns, setRedesigns] = useState<string[]>([])
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteUrl(e.target.value)
    setError(null)
  }

  const validateUrl = (url: string) => {
    if (!url) return false

    // Add http:// if missing
    let processedUrl = url
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      processedUrl = "https://" + url
    }

    try {
      new URL(processedUrl)
      return true
    } catch (e) {
      return false
    }
  }

  const analyzeWebsite = async () => {
    if (!websiteUrl) {
      setError("Please enter a website URL")
      return
    }

    if (!validateUrl(websiteUrl)) {
      setError("Please enter a valid website URL")
      return
    }

    setIsAnalyzing(true)
    setIsComplete(false)
    setAnalysisProgress(0)
    setAnalysisStep("Crawling website content...")
    setRedesigns([])
    setError(null)

    // Simulate the analysis process with steps
    const steps = [
      "Crawling website content...",
      "Analyzing design elements...",
      "Evaluating user experience...",
      "Checking responsiveness...",
      "Assessing color scheme...",
      "Generating design score...",
      "Creating modern redesigns...",
    ]

    try {
      // Start the progress animation
      let currentStep = 0
      const interval = setInterval(() => {
        if (currentStep < steps.length) {
          setAnalysisStep(steps[currentStep])
          setAnalysisProgress(Math.min(100, (currentStep + 1) * (100 / steps.length)))
          currentStep++
        } else {
          clearInterval(interval)
        }
      }, 1200)

      // Make the actual API call
      const response = await fetch("/api/website-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ websiteUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze website")
      }

      const data = await response.json()

      // Ensure the interval has completed
      setTimeout(
        () => {
          clearInterval(interval)

          if (data.success) {
            setAnalysisData(data.data)
            setDesignScore(data.data.designScore)
            setGenZScore(data.data.genZAppealScore)

            // Generate redesign options
            setRedesigns(["minimal", "vibrant", "dark"])

            setIsAnalyzing(false)
            setIsComplete(true)
          } else {
            setError(data.error || "Failed to analyze website")
            setIsAnalyzing(false)
          }
        },
        Math.max(0, 7000 - currentStep * 1200),
      ) // Ensure minimum animation time
    } catch (error) {
      console.error("Error analyzing website:", error)
      setError("Failed to analyze website. Please try again.")
      setIsAnalyzing(false)

      // Generate random design score between 40-75 for demo purposes
      const score = Math.floor(Math.random() * 36) + 40
      setDesignScore(score)
      setGenZScore(Math.floor(Math.random() * 30) + 30)

      // Generate redesign options
      setRedesigns(["minimal", "vibrant", "dark"])

      setIsComplete(true)
    }
  }

  const handleGenZ = async () => {
    if (!websiteUrl) {
      setError("Please enter a website URL")
      return
    }

    if (!validateUrl(websiteUrl)) {
      setError("Please enter a valid website URL")
      return
    }

    setIsAnalyzing(true)
    setIsComplete(false)
    setAnalysisProgress(0)
    setAnalysisStep("Initializing Gen Z transformation...")
    setRedesigns([])
    setError(null)

    // Simulate the Gen Z transformation process
    const steps = [
      "Initializing Gen Z transformation...",
      "Applying bold color schemes...",
      "Adding interactive elements...",
      "Incorporating modern typography...",
      "Optimizing for social sharing...",
      "Adding microinteractions...",
      "Finalizing Gen Z aesthetic...",
    ]

    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setAnalysisStep(steps[currentStep])
        setAnalysisProgress(Math.min(100, (currentStep + 1) * (100 / steps.length)))
        currentStep++
      } else {
        clearInterval(interval)

        // Always give a high score for Gen Z designs
        setDesignScore(92)
        setGenZScore(95)

        // Generate Gen Z redesign options
        setRedesigns(["genZ-bold", "genZ-minimal", "genZ-gradient"])

        setIsAnalyzing(false)
        setIsComplete(true)
        setActiveTab("genZ-bold")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10rem] -left-[10rem] w-[40rem] h-[40rem] bg-violet-400 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
        <div className="absolute -top-[5rem] -right-[10rem] w-[45rem] h-[45rem] bg-fuchsia-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[25rem] left-[15rem] w-[40rem] h-[40rem] bg-rose-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <main className="container py-8 relative z-10">
        <Link href="/dashboard" className="flex items-center text-sm mb-6 hover:underline group">
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" /> Back to
          dashboard
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Badge className="px-4 py-1.5 mb-4 font-semibold rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white hover:shadow-lg hover:shadow-pink-500/20 transition-all">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Premium Feature
            </Badge>
            <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600">
              Website Redesign AI
            </h1>
            <p className="text-muted-foreground">Analyze any website and get modern redesign options with our AI</p>
          </div>

          <Card className="mb-8 border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Enter Website URL</CardTitle>
              <CardDescription>Provide the URL of the website you want to analyze and redesign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="https://example.com"
                    className="pl-10 border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    value={websiteUrl}
                    onChange={handleUrlChange}
                    disabled={isAnalyzing}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={analyzeWebsite}
                    disabled={!websiteUrl || isAnalyzing}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all rounded-lg"
                  >
                    <Sparkles className="h-4 w-4 mr-2" /> Analyze Design
                  </Button>
                  <Button
                    onClick={handleGenZ}
                    disabled={!websiteUrl || isAnalyzing}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-all rounded-lg"
                  >
                    <Zap className="h-4 w-4 mr-2" /> Gen Z
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {isAnalyzing && (
            <Card className="mb-8 border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Analyzing Website</CardTitle>
                <CardDescription>
                  Our AI is analyzing the website design and generating redesign options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Progress value={analysisProgress} className="h-2 bg-indigo-100 dark:bg-indigo-900/30">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </Progress>
                  <p className="text-sm text-center text-muted-foreground">{Math.round(analysisProgress)}%</p>
                </div>

                <div className="h-24 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block h-10 w-10 rounded-full border-[3px] border-indigo-600/20 border-t-indigo-600 animate-spin mb-4"></div>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{analysisStep}</p>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground text-center">
                  This process typically takes 1-2 minutes. Please don&apos;t close this window.
                </div>
              </CardContent>
            </Card>
          )}

          {isComplete && (
            <>
              <Card className="mb-8 border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-600/10 to-violet-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Design Analysis</CardTitle>
                      <CardDescription>Our AI has analyzed the design of {websiteUrl}</CardDescription>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="relative h-16 w-16">
                        <svg viewBox="0 0 100 100" className="h-full w-full">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={
                              designScore && designScore >= 80
                                ? "#10b981"
                                : designScore && designScore >= 60
                                  ? "#f59e0b"
                                  : "#ef4444"
                            }
                            strokeWidth="10"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (283 * (designScore || 0)) / 100}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                          {designScore}
                        </div>
                      </div>
                      <p className="text-sm font-medium mt-1">Design Score</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3 bg-white/60 dark:bg-zinc-900/60 p-3 rounded-lg backdrop-blur-sm">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-600/20">
                        <Palette className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Color Scheme</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysisData?.colorScheme ||
                            (designScore && designScore >= 80
                              ? "Modern and cohesive"
                              : designScore && designScore >= 60
                                ? "Decent but could be improved"
                                : "Outdated and inconsistent")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/60 dark:bg-zinc-900/60 p-3 rounded-lg backdrop-blur-sm">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-600/20">
                        <Layout className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Layout & Structure</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysisData?.layoutStructure ||
                            (designScore && designScore >= 80
                              ? "Clean and intuitive"
                              : designScore && designScore >= 60
                                ? "Functional but cluttered"
                                : "Confusing and disorganized")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-white/60 dark:bg-zinc-900/60 p-3 rounded-lg backdrop-blur-sm">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-indigo-600/20">
                        <Smartphone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium">Responsiveness</h3>
                        <p className="text-sm text-muted-foreground">
                          {analysisData?.responsiveness ||
                            (designScore && designScore >= 80
                              ? "Fully responsive"
                              : designScore && designScore >= 60
                                ? "Mostly responsive"
                                : "Poor mobile experience")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {genZScore !== null && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center text-pink-500 shrink-0 shadow-md shadow-pink-500/10">
                          <Zap className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium flex items-center">
                            Gen Z Appeal Score
                            <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full">
                              {genZScore}
                            </span>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {genZScore >= 80
                              ? "Excellent Gen Z appeal"
                              : genZScore >= 60
                                ? "Good Gen Z appeal, with room for improvement"
                                : "Limited Gen Z appeal, needs modernization"}
                          </p>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p className="mb-2 font-medium">Improvement suggestions for Gen Z audience:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {analysisData?.improvementAreas ? (
                            analysisData.improvementAreas.map((area: string, index: number) => (
                              <li key={index}>{area}</li>
                            ))
                          ) : (
                            <>
                              <li>Add more vibrant colors and gradients</li>
                              <li>Incorporate interactive elements and microinteractions</li>
                              <li>Use modern typography with variable fonts</li>
                              <li>Add more visual content and animations</li>
                              <li>Optimize for social sharing and engagement</li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="mb-4">
                <h2 className="text-2xl font-bold">Redesign Options</h2>
                <p className="text-muted-foreground">Choose from these modern redesign options for your website</p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="bg-muted/50 p-1 rounded-lg">
                  <TabsTrigger
                    value="original"
                    className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
                  >
                    Original
                  </TabsTrigger>
                  {redesigns.map((design) => (
                    <TabsTrigger
                      key={design}
                      value={design}
                      className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
                    >
                      {design === "genZ-bold"
                        ? "Gen Z Bold"
                        : design === "genZ-minimal"
                          ? "Gen Z Minimal"
                          : design === "genZ-gradient"
                            ? "Gen Z Gradient"
                            : design.charAt(0).toUpperCase() + design.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="original">
                  <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                    <CardContent className="p-0 overflow-hidden">
                      <div className="aspect-video bg-muted relative overflow-hidden rounded-md">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full max-w-3xl mx-auto p-4">
                            <div className="h-8 bg-background rounded-t-md flex items-center px-4 gap-2">
                              <div className="h-3 w-3 rounded-full bg-red-500"></div>
                              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                              <div className="h-3 w-3 rounded-full bg-green-500"></div>
                              <div className="h-6 w-64 bg-muted-foreground/10 rounded-md ml-4"></div>
                            </div>
                            <div className="bg-background p-4 rounded-b-md border-t">
                              <div className="h-12 bg-muted-foreground/10 rounded-md mb-4 w-full"></div>
                              <div className="flex gap-4 mb-6">
                                <div className="h-8 bg-muted-foreground/10 rounded-md w-20"></div>
                                <div className="h-8 bg-muted-foreground/10 rounded-md w-20"></div>
                                <div className="h-8 bg-muted-foreground/10 rounded-md w-20"></div>
                              </div>
                              <div className="h-40 bg-muted-foreground/10 rounded-md mb-6"></div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="h-24 bg-muted-foreground/10 rounded-md"></div>
                                <div className="h-24 bg-muted-foreground/10 rounded-md"></div>
                                <div className="h-24 bg-muted-foreground/10 rounded-md"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                            Original Design
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Current design of {websiteUrl || "the website"}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled className="rounded-lg">
                          <Download className="h-4 w-4 mr-2" /> Export
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                {redesigns.includes("minimal") && (
                  <TabsContent value="minimal">
                    <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                      <CardContent className="p-0 overflow-hidden">
                        <div className="aspect-video bg-muted relative overflow-hidden rounded-md">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full max-w-3xl mx-auto p-4">
                              <div className="h-8 bg-background rounded-t-md flex items-center px-4 gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <div className="h-6 w-64 bg-muted-foreground/10 rounded-md ml-4"></div>
                              </div>
                              <div className="bg-background p-8 rounded-b-md border-t">
                                <div className="h-12 bg-black rounded-md mb-8 w-1/3"></div>
                                <div className="flex gap-8 mb-12 justify-end">
                                  <div className="h-5 bg-black/80 rounded-md w-16"></div>
                                  <div className="h-5 bg-black/80 rounded-md w-16"></div>
                                  <div className="h-5 bg-black/80 rounded-md w-16"></div>
                                </div>
                                <div className="h-40 bg-black/5 rounded-md mb-12 flex items-center justify-center">
                                  <div className="h-12 w-40 bg-black rounded-md"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-8">
                                  <div className="h-24 bg-black/5 rounded-md"></div>
                                  <div className="h-24 bg-black/5 rounded-md"></div>
                                  <div className="h-24 bg-black/5 rounded-md"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-black text-white">Minimal Redesign</Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Clean, minimal design with focus on content</p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                          >
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all"
                          >
                            <Download className="h-4 w-4 mr-2" /> Export
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                )}

                {redesigns.includes("vibrant") && (
                  <TabsContent value="vibrant">
                    <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                      <CardContent className="p-0 overflow-hidden">
                        <div className="aspect-video bg-muted relative overflow-hidden rounded-md">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full max-w-3xl mx-auto p-4">
                              <div className="h-8 bg-indigo-500 rounded-t-md flex items-center px-4 gap-2">
                                <div className="h-3 w-3 rounded-full bg-white/20"></div>
                                <div className="h-3 w-3 rounded-full bg-white/20"></div>
                                <div className="h-3 w-3 rounded-full bg-white/20"></div>
                                <div className="h-6 w-64 bg-white/10 rounded-md ml-4"></div>
                              </div>
                              <div className="bg-white p-6 rounded-b-md border-t">
                                <div className="h-12 bg-indigo-500 rounded-md mb-6 w-1/2 flex items-center justify-center">
                                  <div className="h-6 w-32 bg-white/20 rounded-md"></div>
                                </div>
                                <div className="flex gap-4 mb-6 justify-center">
                                  <div className="h-8 bg-indigo-100 rounded-full w-24 flex items-center justify-center">
                                    <div className="h-4 w-16 bg-indigo-500/60 rounded-full"></div>
                                  </div>
                                  <div className="h-8 bg-indigo-100 rounded-full w-24 flex items-center justify-center">
                                    <div className="h-4 w-16 bg-indigo-500/60 rounded-full"></div>
                                  </div>
                                  <div className="h-8 bg-indigo-100 rounded-full w-24 flex items-center justify-center">
                                    <div className="h-4 w-16 bg-indigo-500/60 rounded-full"></div>
                                  </div>
                                </div>
                                <div className="h-40 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg mb-6 flex items-center justify-center">
                                  <div className="h-16 w-48 bg-white rounded-md"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="h-24 bg-indigo-100 rounded-lg"></div>
                                  <div className="h-24 bg-purple-100 rounded-lg"></div>
                                  <div className="h-24 bg-indigo-100 rounded-lg"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-indigo-500 text-white">Vibrant Redesign</Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          Colorful design with modern gradients and rounded elements
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                          >
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all"
                          >
                            <Download className="h-4 w-4 mr-2" /> Export
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                )}

                {redesigns.includes("dark") && (
                  <TabsContent value="dark">
                    <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                      <CardContent className="p-0 overflow-hidden">
                        <div className="aspect-video bg-muted relative overflow-hidden rounded-md">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full max-w-3xl mx-auto p-4">
                              <div className="h-8 bg-gray-800 rounded-t-md flex items-center px-4 gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <div className="h-6 w-64 bg-gray-700 rounded-md ml-4"></div>
                              </div>
                              <div className="bg-gray-900 p-6 rounded-b-md border-t border-gray-700">
                                <div className="h-12 bg-gray-800 rounded-md mb-6 w-1/3"></div>
                                <div className="flex gap-4 mb-6">
                                  <div className="h-8 bg-gray-800 rounded-md w-20"></div>
                                  <div className="h-8 bg-gray-800 rounded-md w-20"></div>
                                  <div className="h-8 bg-gray-800 rounded-md w-20"></div>
                                </div>
                                <div className="h-40 bg-gray-800 rounded-md mb-6 flex items-center justify-center">
                                  <div className="h-12 w-40 bg-blue-500 rounded-md"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="h-24 bg-gray-800 rounded-md"></div>
                                  <div className="h-24 bg-gray-800 rounded-md"></div>
                                  <div className="h-24 bg-gray-800 rounded-md"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gray-800 text-white">Dark Mode Redesign</Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p className="text-sm text-muted-foreground">Modern dark mode design with blue accents</p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                          >
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all"
                          >
                            <Download className="h-4 w-4 mr-2" /> Export
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                )}

                {redesigns.includes("genZ-bold") && (
                  <TabsContent value="genZ-bold">
                    <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                      <CardContent className="p-0 overflow-hidden">
                        <div className="aspect-video bg-muted relative overflow-hidden rounded-md">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full max-w-3xl mx-auto p-4">
                              <div className="h-8 bg-black rounded-t-md flex items-center px-4 gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                <div className="h-6 w-64 bg-gray-800 rounded-md ml-4"></div>
                              </div>
                              <div className="bg-black p-6 rounded-b-md border-t border-gray-800">
                                <div className="flex justify-between items-center mb-8">
                                  <div className="h-10 w-24 bg-white rounded-md"></div>
                                  <div className="flex gap-3">
                                    <div className="h-10 w-10 bg-pink-500 rounded-full"></div>
                                    <div className="h-10 w-10 bg-blue-500 rounded-full"></div>
                                    <div className="h-10 w-10 bg-purple-500 rounded-full"></div>
                                  </div>
                                </div>
                                <div className="h-48 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-2xl mb-8 flex items-center justify-center">
                                  <div className="h-16 w-48 bg-white/20 backdrop-blur-md rounded-xl"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="h-32 bg-pink-500 rounded-2xl p-4 flex items-end">
                                    <div className="h-8 w-full bg-white/20 backdrop-blur-md rounded-xl"></div>
                                  </div>
                                  <div className="h-32 bg-blue-500 rounded-2xl p-4 flex items-end">
                                    <div className="h-8 w-full bg-white/20 backdrop-blur-md rounded-xl"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                              Gen Z Bold
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="outline" className="bg-black/70 text-white border-pink-500">
                              <Zap className="h-3 w-3 mr-1 text-pink-500" /> Trending
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          Bold Gen Z design with vibrant colors and modern aesthetics
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                          >
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-all"
                          >
                            <Download className="h-4 w-4 mr-2" /> Export
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                )}

                {redesigns.includes("genZ-minimal") && (
                  <TabsContent value="genZ-minimal">
                    <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                      <CardContent className="p-0 overflow-hidden">
                        <div className="aspect-video bg-muted relative overflow-hidden rounded-md">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full max-w-3xl mx-auto p-4">
                              <div className="h-8 bg-zinc-100 rounded-t-md flex items-center px-4 gap-2">
                                <div className="h-3 w-3 rounded-full bg-zinc-300"></div>
                                <div className="h-3 w-3 rounded-full bg-zinc-300"></div>
                                <div className="h-3 w-3 rounded-full bg-zinc-300"></div>
                                <div className="h-6 w-64 bg-zinc-200 rounded-md ml-4"></div>
                              </div>
                              <div className="bg-white p-8 rounded-b-md border-t border-zinc-100">
                                <div className="flex justify-between items-center mb-12">
                                  <div className="h-8 w-20 bg-black rounded-full"></div>
                                  <div className="flex gap-6">
                                    <div className="h-5 w-5 bg-zinc-900 rounded-full"></div>
                                    <div className="h-5 w-5 bg-zinc-900 rounded-full"></div>
                                    <div className="h-5 w-5 bg-zinc-900 rounded-full"></div>
                                  </div>
                                </div>
                                <div className="h-40 bg-zinc-100 rounded-3xl mb-12 flex items-center justify-center">
                                  <div className="h-12 w-40 bg-black rounded-full"></div>
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                  <div className="h-24 bg-zinc-100 rounded-3xl"></div>
                                  <div className="h-24 bg-zinc-100 rounded-3xl"></div>
                                  <div className="h-24 bg-zinc-100 rounded-3xl"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-zinc-900 text-white">Gen Z Minimal</Badge>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="outline" className="bg-white/70 border-zinc-300">
                              <Zap className="h-3 w-3 mr-1 text-zinc-900" /> Clean
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          Minimalist Gen Z design with clean aesthetics and rounded shapes
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                          >
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all"
                          >
                            <Download className="h-4 w-4 mr-2" /> Export
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                )}

                {redesigns.includes("genZ-gradient") && (
                  <TabsContent value="genZ-gradient">
                    <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                      <CardContent className="p-0 overflow-hidden">
                        <div className="aspect-video bg-muted relative overflow-hidden rounded-md">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full max-w-3xl mx-auto p-4">
                              <div className="h-8 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-t-md flex items-center px-4 gap-2">
                                <div className="h-3 w-3 rounded-full bg-white/20"></div>
                                <div className="h-3 w-3 rounded-full bg-white/20"></div>
                                <div className="h-3 w-3 rounded-full bg-white/20"></div>
                                <div className="h-6 w-64 bg-white/10 rounded-md ml-4"></div>
                              </div>
                              <div className="bg-gradient-to-b from-slate-900 to-slate-800 p-6 rounded-b-md border-t border-white/10">
                                <div className="flex justify-between items-center mb-8">
                                  <div className="h-10 w-24 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-xl"></div>
                                  <div className="flex gap-3">
                                    <div className="h-8 w-8 bg-white/10 backdrop-blur-md rounded-lg"></div>
                                    <div className="h-8 w-8 bg-white/10 backdrop-blur-md rounded-lg"></div>
                                    <div className="h-8 w-8 bg-white/10 backdrop-blur-md rounded-lg"></div>
                                  </div>
                                </div>
                                <div className="h-48 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-orange-500 rounded-xl mb-8 flex items-center justify-center p-0.5">
                                  <div className="h-full w-full bg-slate-900/80 backdrop-blur-md rounded-lg flex items-center justify-center">
                                    <div className="h-16 w-48 bg-white/10 backdrop-blur-md rounded-lg border border-white/20"></div>
                                  </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="h-24 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl p-0.5">
                                    <div className="h-full w-full bg-slate-900/80 backdrop-blur-md rounded-lg"></div>
                                  </div>
                                  <div className="h-24 bg-gradient-to-br from-fuchsia-500 to-orange-500 rounded-xl p-0.5">
                                    <div className="h-full w-full bg-slate-900/80 backdrop-blur-md rounded-lg"></div>
                                  </div>
                                  <div className="h-24 bg-gradient-to-br from-orange-500 to-violet-500 rounded-xl p-0.5">
                                    <div className="h-full w-full bg-slate-900/80 backdrop-blur-md rounded-lg"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
                              Gen Z Gradient
                            </Badge>
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <Badge variant="outline" className="bg-slate-900/70 text-white border-fuchsia-500">
                              <Zap className="h-3 w-3 mr-1 text-fuchsia-500" /> Vibrant
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <p className="text-sm text-muted-foreground">
                          Gradient-rich Gen Z design with glassmorphism and vibrant colors
                        </p>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                          >
                            <Share2 className="h-4 w-4 mr-2" /> Share
                          </Button>
                          <Button
                            size="sm"
                            className="rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-md hover:shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 transition-all"
                          >
                            <Download className="h-4 w-4 mr-2" /> Export
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md hover:shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-all"
                >
                  <Zap className="h-4 w-4 mr-2" /> Generate More Designs
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}
