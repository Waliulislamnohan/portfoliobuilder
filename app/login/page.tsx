"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle login
    // For now, just redirect to the dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10rem] -left-[10rem] w-[40rem] h-[40rem] bg-violet-400 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
        <div className="absolute -top-[5rem] -right-[10rem] w-[45rem] h-[45rem] bg-fuchsia-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[25rem] left-[15rem] w-[40rem] h-[40rem] bg-rose-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container max-w-md py-12 flex-1 flex flex-col justify-center">
        <Link href="/" className="flex items-center text-sm mb-6 hover:underline group">
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" /> Back to
          home
        </Link>

        <Card className="border shadow-xl backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none border-2 border-indigo-600/10 rounded-lg"></div>
          <CardHeader className="pb-2">
            <Badge className="w-fit px-3 py-1 mb-3 font-medium rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              Welcome Back
            </Badge>
            <CardTitle className="text-2xl">Log in to your account</CardTitle>
            <CardDescription>Enter your credentials to continue</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full rounded-xl py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-lg hover:shadow-indigo-600/25 transition-all duration-300"
              >
                Log In
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
