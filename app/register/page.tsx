"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle registration
    // For now, just redirect to the portfolio creation page
    router.push("/create-portfolio")
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10rem] -right-[10rem] w-[40rem] h-[40rem] bg-violet-400 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
        <div className="absolute -top-[5rem] -left-[10rem] w-[45rem] h-[45rem] bg-fuchsia-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[25rem] right-[15rem] w-[40rem] h-[40rem] bg-rose-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container max-w-md py-12 flex-1 flex flex-col justify-center">
        <Link href="/" className="flex items-center text-sm mb-6 hover:underline group">
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" /> Back to
          home
        </Link>

        <Card className="border shadow-xl backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none border-2 border-indigo-600/10 rounded-lg"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-400 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>

          <CardHeader className="pb-2">
            <Badge className="w-fit px-4 py-1.5 mb-3 font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-600/20 transition-all">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Exclusive Access
            </Badge>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Get started with your portfolio in just a few steps</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 pt-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
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
                <Label htmlFor="password">Password</Label>
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
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full rounded-xl py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-lg hover:shadow-indigo-600/25 transition-all duration-300 group"
              >
                Create Account{" "}
                <Sparkles className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
