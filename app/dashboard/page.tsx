"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Eye, Edit, Trash2, Plus, Sparkles } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10rem] -left-[10rem] w-[40rem] h-[40rem] bg-violet-400 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
        <div className="absolute -top-[5rem] -right-[10rem] w-[45rem] h-[45rem] bg-fuchsia-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[25rem] left-[15rem] w-[40rem] h-[40rem] bg-rose-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="flex-1 relative z-10">
        <header className="border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm sticky top-0">
          <div className="container py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
              >
                <Link href="/create-portfolio">
                  <Plus className="h-4 w-4 mr-2" /> New Portfolio
                </Link>
              </Button>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-sm font-medium shadow-md shadow-indigo-600/20">
                JD
              </div>
            </div>
          </div>
        </header>

        <main className="container py-8">
          {/* Overview Cards */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold flex items-center gap-2">
                  <span className="h-2.5 w-2.5 bg-green-500 rounded-full animate-pulse"></span>
                  Active
                </div>
                <p className="text-xs text-muted-foreground mt-1">Your portfolio is live and accessible</p>
              </CardContent>
            </Card>
            <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Badge
                    variant="outline"
                    className="mr-1 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400"
                  >
                    PRO
                  </Badge>
                  Upgrade to see portfolio analytics
                </p>
              </CardContent>
            </Card>
            <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Free</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <Link href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    Upgrade to Premium
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="portfolios" className="mb-8">
            <TabsList className="bg-muted/50 p-1 rounded-lg">
              <TabsTrigger
                value="portfolios"
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
              >
                My Portfolios
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
              >
                Recent Activity
              </TabsTrigger>
            </TabsList>
            <TabsContent value="portfolios" className="mt-6">
              <div className="grid gap-6">
                <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>John Doe - Developer Portfolio</CardTitle>
                        <CardDescription>Created on March 15, 2025</CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transition-colors">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">
                      A showcase of your development projects and professional experience.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all group"
                      >
                        <Link href="/portfolio/preview">
                          <Eye className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" /> View
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all group"
                      >
                        <Edit className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" /> Edit
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg group"
                    >
                      <Trash2 className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" /> Delete
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border border-dashed border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors group">
                  <CardContent className="flex flex-col items-center justify-center h-40 p-6">
                    <div className="h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                      <Plus className="h-6 w-6" />
                    </div>
                    <h3 className="font-medium mb-1">Create a New Portfolio</h3>
                    <p className="text-sm text-muted-foreground mb-4 text-center">
                      Add another portfolio with different social profiles
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all rounded-lg group"
                    >
                      <Link href="/create-portfolio">
                        Get Started{" "}
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="activity" className="mt-6">
              <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-md bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Track changes and updates to your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-sm">
                        <Plus className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Portfolio Created</p>
                        <p className="text-sm text-muted-foreground">You created your developer portfolio</p>
                        <p className="text-xs text-muted-foreground mt-1">March 15, 2025 at 10:30 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Account Created</p>
                        <p className="text-sm text-muted-foreground">You signed up for PortfolioBuilder</p>
                        <p className="text-xs text-muted-foreground mt-1">March 15, 2025 at 10:15 AM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Upgrade Card */}
          <Card className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30 border-indigo-100 dark:border-indigo-900/50 shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-600/20 to-violet-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>

            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                <CardTitle>Upgrade to Premium</CardTitle>
              </div>
              <CardDescription>Get more features and customization options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Custom Domain</h3>
                    <p className="text-xs text-muted-foreground">Use your own domain name</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M3 11l18-5v12L3 14v-3z" />
                      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Advanced Analytics</h3>
                    <p className="text-xs text-muted-foreground">Track visitors and engagement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                      <path d="M12 18v-6" />
                      <path d="M8 18v-1" />
                      <path d="M16 18v-3" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Export Options</h3>
                    <p className="text-xs text-muted-foreground">Download as PDF or HTML</p>
                  </div>
                </div>
              </div>
              <Button className="mt-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all rounded-lg w-full sm:w-auto">
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
