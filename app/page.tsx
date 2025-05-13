"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Dribbble, Figma, Eye, Edit, Sparkles, Star } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10rem] -left-[10rem] w-[40rem] h-[40rem] bg-violet-400 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
        <div className="absolute -top-[5rem] -right-[10rem] w-[45rem] h-[45rem] bg-fuchsia-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[25rem] left-[15rem] w-[40rem] h-[40rem] bg-rose-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="px-4 py-1.5 mb-6 font-semibold rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors">
                <span className="mr-1">✨</span> Free & Open Access <span className="ml-1">✨</span>
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-zinc-900 dark:text-white">
                Generate{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
                  stunning portfolios
                </span>{" "}
                in seconds
              </h1>
              <p className="text-xl text-zinc-600 dark:text-zinc-300 mb-8 leading-relaxed">
                Connect your social profiles and let our AI build a professional portfolio that showcases your best
                work, experience, and skills. Interactive, modern, and effortlessly beautiful.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/create-portfolio">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto px-8 py-6 text-base rounded-xl font-medium shadow-lg shadow-indigo-600/20 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-xl hover:shadow-indigo-600/30 transition-all duration-300 group"
                  >
                    Create Your Portfolio
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto px-8 py-6 text-base rounded-xl font-medium border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300"
                  >
                    View Dashboard
                  </Button>
                </Link>
              </div>
              <div className="mt-12 flex justify-center items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600"></div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium">500+</span> portfolios created this month
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Interactive */}
        <section className="py-24 bg-indigo-50/50 dark:bg-indigo-950/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-16">
              <Badge className="px-3 py-1 mb-4 font-medium rounded-full bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-300">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Three simple steps to your stunning portfolio</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl">
                Our AI-powered platform takes care of the hard work, so you can focus on what matters most.
              </p>
            </div>

            <div className="relative max-w-5xl mx-auto">
              {/* Connection Line */}
              <div className="absolute top-24 left-1/2 w-0.5 h-[calc(100%-120px)] bg-gradient-to-b from-indigo-600 to-violet-600 -translate-x-1/2 hidden md:block"></div>

              <div className="grid md:grid-cols-2 gap-16 md:gap-24">
                {/* Step 1 */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600/40 to-violet-600/40 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse animation-delay-2000"></div>
                  <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full flex items-center justify-center text-white font-bold z-10 hidden md:flex shadow-lg shadow-indigo-600/20">
                      1
                    </div>
                    <div className="md:hidden h-12 w-12 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 rounded-full flex items-center justify-center text-indigo-600 font-bold mb-4">
                      1
                    </div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-indigo-600" />
                      Connect Your Profiles
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/40 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-md">
                          <Github className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-medium">GitHub</p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">Extract your projects & code</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-violet-50 dark:bg-violet-950/40 rounded-xl group-hover:bg-violet-100 dark:group-hover:bg-violet-900/40 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-md">
                          <Linkedin className="h-5 w-5 text-violet-600" />
                        </div>
                        <div>
                          <p className="font-medium">LinkedIn</p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">Pull your work experience</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-fuchsia-50 dark:bg-fuchsia-950/40 rounded-xl group-hover:bg-fuchsia-100 dark:group-hover:bg-fuchsia-900/40 transition-colors">
                        <div className="h-10 w-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-md">
                          <Dribbble className="h-5 w-5 text-fuchsia-600" />
                        </div>
                        <div>
                          <p className="font-medium">Dribbble/Behance</p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">Showcase your design work</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 - Animation */}
                <div className="relative flex items-center justify-center">
                  <div className="w-full h-80 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden flex items-center justify-center relative group shadow-xl">
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3/4 h-4/5 bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-lg p-4 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded-md ml-2"></div>
                        </div>
                        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
                          <div className="h-3 w-full bg-gradient-to-r from-indigo-200 to-indigo-300 dark:from-indigo-700 dark:to-indigo-600 rounded-md animate-pulse"></div>
                          <div
                            className="h-3 w-5/6 bg-gradient-to-r from-violet-200 to-violet-300 dark:from-violet-700 dark:to-violet-600 rounded-md animate-pulse"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="h-3 w-4/6 bg-gradient-to-r from-fuchsia-200 to-fuchsia-300 dark:from-fuchsia-700 dark:to-fuchsia-600 rounded-md animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="h-3 w-full bg-gradient-to-r from-indigo-200 to-indigo-300 dark:from-indigo-700 dark:to-indigo-600 rounded-md animate-pulse"
                            style={{ animationDelay: "0.3s" }}
                          ></div>
                          <div
                            className="h-3 w-3/6 bg-gradient-to-r from-violet-200 to-violet-300 dark:from-violet-700 dark:to-violet-600 rounded-md animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 h-12 w-12 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center text-white z-10 shadow-lg shadow-fuchsia-600/20">
                      <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-medium bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-4 py-1.5 rounded-full shadow-lg shadow-indigo-600/20">
                      <span className="inline-block animate-pulse">✨</span> AI Processing{" "}
                      <span className="inline-block animate-pulse">✨</span>
                    </div>
                  </div>
                </div>

                {/* Step 3 - Interactive Portfolio Preview */}
                <div className="relative group md:col-span-2">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse animation-delay-4000"></div>
                  <div className="relative bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-xl transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-12 w-12 bg-gradient-to-r from-fuchsia-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold z-10 shadow-lg shadow-fuchsia-600/20">
                      3
                    </div>
                    <h3 className="text-xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
                      <Star className="h-5 w-5 text-fuchsia-600" />
                      Get Your Portfolio
                      <Star className="h-5 w-5 text-fuchsia-600" />
                    </h3>

                    <div className="aspect-video max-h-[400px] rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 relative group-hover:border-fuchsia-300 dark:group-hover:border-fuchsia-700 transition-colors shadow-xl">
                      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

                      {/* Portfolio Preview */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="w-full h-full flex flex-col">
                          {/* Header */}
                          <div className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-6">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 mr-3 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/20">
                              J
                            </div>
                            <div className="font-bold text-lg">John Doe</div>
                            <div className="ml-auto flex gap-3">
                              <div className="h-9 px-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                                Resume
                              </div>
                              <div className="h-9 px-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 flex items-center justify-center text-white font-medium text-sm shadow-md shadow-indigo-600/20">
                                Contact
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 overflow-y-auto">
                            {/* Hero */}
                            <div className="h-60 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 opacity-30">
                                <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply opacity-70 animate-blob"></div>
                                <div className="absolute top-0 right-0 w-40 h-40 bg-violet-400 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000"></div>
                                <div className="absolute -bottom-10 left-20 w-40 h-40 bg-fuchsia-400 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-4000"></div>
                              </div>
                              <div className="flex flex-col items-center z-10">
                                <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-800 p-1 ring-2 ring-indigo-600/20 shadow-lg mb-4">
                                  <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white text-2xl font-bold">
                                    J
                                  </div>
                                </div>
                                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">John Doe</h2>
                                <p className="text-indigo-600 dark:text-indigo-400 font-medium">Full Stack Developer</p>
                              </div>
                            </div>

                            {/* Projects */}
                            <div className="p-6 bg-white dark:bg-zinc-900">
                              <h3 className="text-lg font-semibold mb-4 text-center">Featured Projects</h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl overflow-hidden group/card shadow-md hover:shadow-lg transition-all duration-300">
                                  <div className="h-32 bg-gradient-to-br from-indigo-400 to-violet-400 dark:from-indigo-600 dark:to-violet-600 p-4 flex items-end justify-end transition-transform duration-300 group-hover/card:scale-105">
                                    <Badge className="bg-white/80 text-indigo-600 backdrop-blur-sm">React</Badge>
                                  </div>
                                  <div className="p-3">
                                    <h4 className="font-medium text-sm">E-Commerce Platform</h4>
                                  </div>
                                </div>
                                <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl overflow-hidden group/card shadow-md hover:shadow-lg transition-all duration-300">
                                  <div className="h-32 bg-gradient-to-br from-violet-400 to-fuchsia-400 dark:from-violet-600 dark:to-fuchsia-600 p-4 flex items-end justify-end transition-transform duration-300 group-hover/card:scale-105">
                                    <Badge className="bg-white/80 text-violet-600 backdrop-blur-sm">Next.js</Badge>
                                  </div>
                                  <div className="p-3">
                                    <h4 className="font-medium text-sm">Task Manager</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Overlay with buttons */}
                      <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-4">
                          <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-indigo-50 transition-colors shadow-lg">
                            <Eye className="h-4 w-4" /> Preview
                          </button>
                          <button className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium hover:shadow-lg hover:shadow-indigo-600/20 transition-all">
                            <Edit className="h-4 w-4" /> Customize
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 rounded-xl p-5 flex items-start gap-4 group/card hover:shadow-lg transition-all duration-300">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20 group-hover/card:scale-110 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-white">Fully Responsive</p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">Works on all devices</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900 rounded-xl p-5 flex items-start gap-4 group/card hover:shadow-lg transition-all duration-300">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/20 group-hover/card:scale-110 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 16v-4"></path>
                            <path d="M12 8h.01"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-white">SEO Optimized</p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">Get discovered online</p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-950 dark:to-fuchsia-900 rounded-xl p-5 flex items-start gap-4 group/card hover:shadow-lg transition-all duration-300">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-600/20 group-hover/card:scale-110 transition-transform duration-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6"
                          >
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-white">Modern Design</p>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">Professional templates</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link href="/create-portfolio">
              <Button
                size="lg"
                className="px-8 py-6 text-lg rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-xl hover:shadow-indigo-600/30 transition-all duration-300 group"
              >
                Create Your Portfolio{" "}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-20 bg-indigo-50/50 dark:bg-zinc-950/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

          <div className="container relative z-10">
            <div className="flex flex-col items-center text-center mb-16">
              <Badge className="px-3 py-1 mb-4 font-medium rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tools for Professionals</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl">
                Our platform offers advanced features designed for serious professionals.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="flex gap-5 group">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Github className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    GitHub Project Extraction
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    Automatically pull your repositories, contributions, and code samples to showcase your development
                    skills with interactive previews.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Linkedin className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    LinkedIn Experience Import
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    Extract your work history, education, and professional achievements to build a comprehensive
                    experience section with visual timelines.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Dribbble className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                    Design Portfolio Integration
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    Showcase your design work from Behance, Dribbble, and other platforms in a beautiful gallery format
                    with interactive previews.
                  </p>
                </div>
              </div>
              <div className="flex gap-5 group">
                <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20 shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Figma className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    Premium Templates
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300">
                    Choose from exclusive professional templates with animations, 3D elements, and customizable layouts
                    to create a truly unique portfolio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-violet-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

          {/* Animated circles */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-white rounded-full mix-blend-overlay opacity-10 animate-blob"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-500 rounded-full mix-blend-overlay opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-40 w-60 h-60 bg-violet-500 rounded-full mix-blend-overlay opacity-10 animate-blob animation-delay-4000"></div>

          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="px-4 py-1.5 mb-6 font-semibold rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors">
                Start Now
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to showcase your best work?</h2>
              <p className="text-xl text-indigo-100 mb-8">Create your professional portfolio in minutes, not days.</p>
              <Link href="/create-portfolio">
                <Button
                  size="lg"
                  className="px-8 py-6 text-lg rounded-xl font-medium bg-white text-indigo-600 hover:bg-indigo-50 hover:shadow-xl hover:shadow-indigo-800/20 transition-all duration-300 group"
                >
                  Create Your Portfolio{" "}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
              <p className="mt-4 text-indigo-200 text-sm">
                Join 5,000+ professionals who transformed their online presence
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-white dark:bg-zinc-900">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                PortfolioBuilder
              </span>
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
              <Link
                href="#"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                © {new Date().getFullYear()} PortfolioBuilder. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Add animation classes */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
