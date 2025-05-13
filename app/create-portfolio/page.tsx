"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Upload,
  Github,
  Linkedin,
  Dribbble,
  Figma,
  FileText,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

type Project = {
  id: number
  name: string
  description: string
  technologies: string[]
  projectUrl?: string
}

type FormData = {
  name: string
  title: string
  bio: string
  profileImageUrl: string
  github: string
  linkedin: string
  behance: string
  dribbble: string
  figma: string
  website: string
  cvFile: File | null
  manualProjects: Project[]
  experience: Experience[]
  education: Education[]
  skills: Skill[]
}

type Experience = {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
};

type Education = {
  id: number;
  institution: string;
  degree: string;
  duration: string;
  description: string;
};

type Skill = {
  id: number;
  name: string;
  category: "technical" | "design" | "soft" | "language";
};

export default function CreatePortfolio() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState<FormData>({
    name: "",
    title: "",
    bio: "",
    profileImageUrl: "",
    github: "",
    linkedin: "",
    behance: "",
    dribbble: "",
    figma: "",
    website: "",
    cvFile: null,
    manualProjects: [],
    experience: [],
    education: [],
    skills: [], // Ensure skills is initialized as an array
  })
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [extractionStatus, setExtractionStatus] = useState<"idle" | "loading" | "success" | "error" | "warning">("idle")
  const [extractionMessage, setExtractionMessage] = useState("")
  const [extractionProgress, setExtractionProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    technologies: "",
    projectUrl: "",
  })

  const [newExperience, setNewExperience] = useState<Experience>({
    id: Date.now(),
    company: "",
    position: "",
    duration: "",
    description: "",
  });

  const [newEducation, setNewEducation] = useState<Education>({
    id: Date.now(),
    institution: "",
    degree: "",
    duration: "",
    description: "",
  });

  const [newSkill, setNewSkill] = useState<Skill>({
    id: Date.now(),
    name: "",
    category: "technical",
  });

  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
  };

  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
  };

  const handleEditEducation = (education: Education) => {
    setEditingEducation(education);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  // Add a helper function to reset editing states
  const resetEditingStates = () => {
    setEditingSkill(null);
    setEditingExperience(null);
    setEditingEducation(null);
    setEditingProject(null);
  };

  // Update save methods to reset editing states after saving
  const saveEditedSkill = () => {
    if (editingSkill) {
      setFormData((prev) => ({
        ...prev,
        skills: prev.skills.map((skill) =>
          skill.id === editingSkill.id ? editingSkill : skill
        ),
      }));
      resetEditingStates();
    }
  };

  const saveEditedExperience = () => {
    if (editingExperience) {
      setFormData((prev) => ({
        ...prev,
        experience: prev.experience.map((exp) =>
          exp.id === editingExperience.id ? editingExperience : exp
        ),
      }));
      resetEditingStates();
    }
  };

  const saveEditedEducation = () => {
    if (editingEducation) {
      setFormData((prev) => ({
        ...prev,
        education: prev.education.map((edu) =>
          edu.id === editingEducation.id ? editingEducation : edu
        ),
      }));
      resetEditingStates();
    }
  };

  const saveEditedProject = () => {
    if (editingProject) {
      setFormData((prev) => ({
        ...prev,
        manualProjects: prev.manualProjects.map((project) =>
          project.id === editingProject.id ? editingProject : project
        ),
      }));
      resetEditingStates();
    }
  };

  // Add cancel functionality for editing
  const cancelEditing = () => {
    resetEditingStates();
  };

  useEffect(() => {
    // Check if there is data to edit in localStorage
    const editData = localStorage.getItem("portfolioEditData");
    if (editData) {
      try {
        const parsedData = JSON.parse(editData);
        setFormData((prev) => ({
          ...prev,
          name: parsedData.name || "",
          title: parsedData.title || "",
          bio: parsedData.bio || "",
          profileImageUrl: parsedData.profileImageUrl || "",
          github: parsedData.github || "",
          linkedin: parsedData.linkedin || "",
          behance: parsedData.behance || "",
          dribbble: parsedData.dribbble || "",
          figma: parsedData.figma || "",
          website: parsedData.website || "",
          manualProjects: parsedData.manualProjects || [],
          experience: parsedData.experience || [],
          education: parsedData.education || [],
          skills: Array.isArray(parsedData.skills) ? parsedData.skills : [], // Ensure skills is an array
        }));
        // Clear the edit data from localStorage after loading
        localStorage.removeItem("portfolioEditData");
      } catch (error) {
        console.error("Error parsing portfolio edit data:", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      const objectUrl = URL.createObjectURL(file)
      setPreviewImage(objectUrl)

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImageUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      setFormData((prev) => ({ ...prev, cvFile: file }))

      setExtractionStatus("loading")
      setExtractionMessage(`Analyzing your CV (${file.name})...`)
      setExtractionProgress(10)

      await parseCVFile(file)
    }
  }

  const parseCVFile = async (file: File) => {
    try {
      setExtractionMessage("Extracting text from your CV...")
      setExtractionProgress(30)

      const formData = new FormData()
      formData.append("file", file)

      // Add a timeout to prevent hanging requests
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout

      try {
        const response = await fetch("/api/parse-cv", {
          method: "POST",
          body: formData,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        setExtractionMessage("Processing extracted information...")
        setExtractionProgress(60)

        const responseText = await response.text()
        let data

        try {
          data = JSON.parse(responseText)
        } catch (jsonError) {
          console.error("Error parsing JSON:", jsonError, "Raw response:", responseText)
          throw new Error("Invalid response format from server")
        }

        if (data.success) {
          setExtractionStatus("success")
          setExtractionMessage("CV analyzed successfully! We've extracted your information.")
          setExtractionProgress(100)
          updateFormWithCVData(data.data)
        } else {
          // Even if there's an error message, check if we have fallback data
          if (data.data) {
            setExtractionStatus("warning")
            setExtractionMessage("We encountered some issues analyzing your CV, but we've extracted what we could.")
            setExtractionProgress(80)
            updateFormWithCVData(data.data)
          } else {
            throw new Error(data.error || "Failed to parse CV")
          }
        }
      } catch (fetchError) {
        if (fetchError.name === "AbortError") {
          throw new Error("Request timed out. Please try again with a smaller file.")
        }
        throw fetchError
      }
    } catch (error) {
      console.error("CV parsing error:", error)

      // Generate a fallback profile based on the filename
      setExtractionStatus("warning")
      setExtractionMessage(
        "We encountered an issue analyzing your CV file, but we'll still use what we can. You can add missing details manually.",
      )
      setExtractionProgress(50)

      // Generate a fallback profile based on the filename
      const fallbackProfile = generateFallbackProfile(file.name)
      updateFormWithCVData(fallbackProfile)
    }
  }

  const updateFormWithCVData = (cvData: any) => {
    try {
      console.log("Updating form with CV data:", cvData)

      if (!cvData || !cvData.basicInfo) {
        console.error("Invalid CV data structure")
        return
      }

      setFormData((prev) => ({
        ...prev,
        name: prev.name || cvData.basicInfo.name || "",
        title: prev.title || cvData.basicInfo.title || "",
        bio: prev.bio || cvData.basicInfo.bio || "",
      }))

      // Add projects if available
      if (cvData.projects && Array.isArray(cvData.projects) && cvData.projects.length > 0) {
        setFormData((prev) => ({
          ...prev,
          manualProjects: [
            ...prev.manualProjects,
            ...cvData.projects.map((project: any) => ({
              id: Date.now() + Math.random(),
              name: project.name || "Project",
              description: project.description || "Project description",
              technologies: project.technologies || ["Technology"],
              projectUrl: project.url || "",
            })),
          ],
        }))
      }

      console.log("Form updated successfully with CV data")
    } catch (error) {
      console.error("Error updating form with CV data:", error)
    }
  }

  // Helper function to generate a fallback profile if CV parsing fails
  const generateFallbackProfile = (filename: string) => {
    const lowerFilename = filename.toLowerCase()

    // Determine the type of professional based on filename
    const isDesigner = lowerFilename.includes("design") || lowerFilename.includes("ux") || lowerFilename.includes("ui")
    const isDeveloper =
      lowerFilename.includes("dev") || lowerFilename.includes("engineer") || lowerFilename.includes("code")
    const isManager =
      lowerFilename.includes("manager") || lowerFilename.includes("lead") || lowerFilename.includes("director")

    // Generate a basic profile
    return {
      basicInfo: {
        name: formData.name || "Professional",
        title:
          formData.title ||
          (isDesigner ? "Designer" : isDeveloper ? "Developer" : isManager ? "Manager" : "Professional"),
        bio: formData.bio || "Professional with experience in the industry.",
      },
      experience: [],
      education: [],
      skills: {
        technical: [],
        design: [],
        soft: [],
        languages: [],
      },
      projects: [],
    }
  }

  const updateFormWithPortfolioData = (portfolioData: any) => {
    try {
      console.log("Updating form with portfolio data:", portfolioData)

      if (!portfolioData || !portfolioData.basicInfo) {
        console.error("Invalid portfolio data structure")
        return
      }

      setFormData((prev) => ({
        ...prev,
        name: prev.name || portfolioData.basicInfo?.name || "",
        title: prev.title || portfolioData.basicInfo?.title || "",
        bio: prev.bio || portfolioData.basicInfo?.bio || "",
        github: prev.github || portfolioData.socialLinks?.github || "",
        linkedin: prev.linkedin || portfolioData.socialLinks?.linkedin || "",
        behance: prev.behance || portfolioData.socialLinks?.behance || "",
        dribbble: prev.dribbble || portfolioData.socialLinks?.dribbble || "",
        manualProjects: [
          ...prev.manualProjects,
          ...(portfolioData.projects || []).map((project) => ({
            id: Date.now() + Math.random(),
            name: project.name || "Project",
            description: project.description || "Project description",
            technologies: project.technologies || ["Technology"],
            projectUrl: project.projectUrl || "",
          })),
        ],
      }))

      console.log("Form updated successfully with portfolio data")
    } catch (error) {
      console.error("Error updating form with portfolio data:", error)
    }
  }

  const extractUsernameFromUrl = (url: string): string => {
    try {
      if (!url) return ""

      // GitHub URL pattern
      if (url.includes("github.com/")) {
        const match = url.match(/github\.com\/([^/]+)/)
        return match ? match[1] : ""
      }

      return ""
    } catch (error) {
      console.error("Error extracting username from URL:", error)
      return ""
    }
  }

  const extractFromSocialProfiles = async () => {
    setExtractionStatus("loading")
    setExtractionMessage("Preparing to extract data from your profiles...")
    setExtractionProgress(5)

    try {
      // Collect social links
      const socialLinks = {
        github: formData.github,
        linkedin: formData.linkedin,
        behance: formData.behance,
        dribbble: formData.dribbble,
        figma: formData.figma,
        website: formData.website,
      }

      // Check if any social links are provided
      const hasLinks = Object.values(socialLinks).some((link) => link && link.trim() !== "")

      if (!hasLinks && !formData.cvFile) {
        setExtractionStatus("error")
        setExtractionMessage("Please provide at least one social profile link or upload your CV to extract data.")
        return
      }

      setExtractionMessage("Extracting data from your profiles...")
      setExtractionProgress(20)

      // Create form data for API request
      const apiFormData = new FormData()

      if (formData.cvFile) {
        apiFormData.append("cv", formData.cvFile)
      }

      if (formData.github) {
        apiFormData.append("github", formData.github)
      }

      if (formData.linkedin) {
        apiFormData.append("linkedin", formData.linkedin)
      }

      if (formData.behance) {
        apiFormData.append("behance", formData.behance)
      }

      if (formData.dribbble) {
        apiFormData.append("dribbble", formData.dribbble)
      }

      // Add a timeout to prevent hanging requests
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

      try {
        const response = await fetch("/api/portfolio-generator", {
          method: "POST",
          body: apiFormData,
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        setExtractionProgress(60)

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`)
        }

        const data = await response.json()

        console.log("API Response:", data) // Debugging log

        if (data.success) {
          setExtractionStatus("success")
          setExtractionMessage("Successfully extracted data from your profiles!")
          setExtractionProgress(100)
          updateFormWithPortfolioData(data.data)

          // Save userId for future GET requests
          const userId = formData.github || formData.linkedin || "anonymous"
          localStorage.setItem("userId", userId)

          // Automatically move to the next tab after successful extraction
          if (activeTab === "social") {
            setTimeout(() => setActiveTab("projects"), 1500)
          }
        } else {
          throw new Error(data.error || "Failed to extract data")
        }
      } catch (fetchError: any) {
        if (fetchError.name === "AbortError") {
          throw new Error("Request timed out. Please try again later.")
        }
        throw fetchError
      }
    } catch (error) {
      console.error("Error extracting content:", error)

      setExtractionStatus("warning")
      setExtractionMessage(
        "We encountered some issues extracting data. Using basic data instead. You can still enter information manually.",
      )
      setExtractionProgress(0)

      // Generate fallback data based on the provided social links
      const fallbackData = generateFallbackData()

      // Update the form with the fallback data
      updateFormWithPortfolioData(fallbackData)
    }
  }

  // Helper function to generate fallback data if extraction fails
  const generateFallbackData = () => {
    // Start with basic info from the form
    const data = {
      basicInfo: {
        name: formData.name || "Portfolio Owner",
        title: formData.title || "Professional",
        bio: formData.bio || "Professional with expertise in various areas.",
      },
      projects: [] as any[],
      experience: [] as any[],
      education: [] as any[],
      skills: {
        technical: [] as string[],
        design: [] as string[],
        soft: [] as string[],
        languages: [] as string[],
      },
      socialLinks: {},
    }

    // Add fallback projects based on provided links
    if (formData.github) {
      data.projects.push({
        name: "GitHub Project",
        description: "A project hosted on GitHub showcasing coding skills.",
        technologies: ["JavaScript", "HTML", "CSS"],
        projectUrl: `https://github.com/${formData.github}`,
        source: "github",
      })

      data.skills.technical.push("JavaScript", "Git", "HTML", "CSS")
      data.socialLinks.github = `https://github.com/${formData.github}`
    }

    if (formData.linkedin) {
      data.experience.push({
        company: "Recent Company",
        position: "Professional",
        duration: "2020 - Present",
        description: "Working on various professional projects and initiatives.",
        skills: ["Communication", "Teamwork", "Problem Solving"],
      })

      data.skills.soft.push("Communication", "Teamwork", "Leadership")
      data.socialLinks.linkedin = formData.linkedin
    }

    if (formData.behance || formData.dribbble) {
      data.projects.push({
        name: "Design Portfolio",
        description: "A collection of design work showcasing creativity and visual skills.",
        technologies: ["UI Design", "Graphic Design", "Illustration"],
        projectUrl: formData.behance || formData.dribbble,
        source: formData.behance ? "behance" : "dribbble",
      })

      data.skills.design.push("UI Design", "Graphic Design", "Visual Communication")

      if (formData.behance) {
        data.socialLinks.behance = formData.behance
      }

      if (formData.dribbble) {
        data.socialLinks.dribbble = formData.dribbble
      }
    }

    if (formData.figma) {
      data.projects.push({
        name: "UI Design System",
        description: "A comprehensive design system for web and mobile applications.",
        technologies: ["Figma", "UI Design", "Design Systems"],
        projectUrl: formData.figma,
        source: "figma",
      })

      data.skills.design.push("Figma", "UI Design", "Design Systems")
      data.socialLinks.figma = formData.figma
    }

    if (formData.website) {
      data.projects.push({
        name: "Personal Website",
        description: "A personal website showcasing portfolio and professional information.",
        technologies: ["Web Development", "HTML", "CSS", "JavaScript"],
        projectUrl: formData.website,
        source: "website",
      })
      data.socialLinks.website = formData.website
    }

    return data
  }

  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject((prev) => ({ ...prev, [name]: value }))
  }

  const addProject = () => {
    if (newProject.name && newProject.description) {
      setFormData((prev) => ({
        ...prev,
        manualProjects: [
          ...prev.manualProjects,
          {
            id: Date.now(),
            name: newProject.name,
            description: newProject.description,
            technologies: newProject.technologies.split(",").map((t) => t.trim()),
            projectUrl: newProject.projectUrl,
          },
        ],
      }))
      setNewProject({ name: "", description: "", technologies: "", projectUrl: "" })
    }
  }

  const removeProject = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      manualProjects: prev.manualProjects.filter((p) => p.id !== id),
    }))
  }

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEducation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({ ...prev, [name]: value }));
  };

  const addExperience = () => {
    if (newExperience.company && newExperience.position) {
      setFormData((prev) => ({
        ...prev,
        experience: [...(prev.experience || []), { ...newExperience, id: Date.now() }],
      }));
      setNewExperience({ id: Date.now(), company: "", position: "", duration: "", description: "" });
    }
  };

  const addEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      setFormData((prev) => ({
        ...prev,
        education: [...(prev.education || []), { ...newEducation, id: Date.now() }],
      }));
      setNewEducation({ id: Date.now(), institution: "", degree: "", duration: "", description: "" });
    }
  };

  const addSkill = () => {
    if (newSkill.name) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill, id: Date.now() }], // Ensure skills is treated as an array
      }));
      setNewSkill({ id: Date.now(), name: "", category: "technical" });
    }
  };

  const removeExperience = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience?.filter((exp) => exp.id !== id) || [],
    }));
  };

  const removeEducation = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education?.filter((edu) => edu.id !== id) || [],
    }));
  };

  const removeSkill = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id), // Ensure skills is treated as an array
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare form data for API request
      const apiFormData = new FormData();
      if (formData.cvFile) apiFormData.append("cv", formData.cvFile);
      if (formData.github) apiFormData.append("github", formData.github);
      if (formData.linkedin) apiFormData.append("linkedin", formData.linkedin);
      if (formData.behance) apiFormData.append("behance", formData.behance);
      if (formData.dribbble) apiFormData.append("dribbble", formData.dribbble);

      // Send data to portfolio generator API
      const response = await fetch("/api/portfolio-generator", {
        method: "POST",
        body: apiFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate portfolio data");
      }

      const { data } = await response.json();

      // Merge enhanced data with formData
      const cleanedPortfolioData = {
        name: data.basicInfo?.name || formData.name || "",
        title: data.basicInfo?.title || formData.title || "",
        bio: data.basicInfo?.bio || formData.bio || "",
        profileImageUrl: data.basicInfo?.profileImageUrl || formData.profileImageUrl || "",
        github: data.socialLinks?.github || formData.github || "",
        linkedin: data.socialLinks?.linkedin || formData.linkedin || "",
        behance: data.socialLinks?.behance || formData.behance || "",
        dribbble: data.socialLinks?.dribbble || formData.dribbble || "",
        figma: data.socialLinks?.figma || formData.figma || "",
        website: data.socialLinks?.website || formData.website || "",
        manualProjects: [
          ...formData.manualProjects,
          ...(data.projects || []).map((project) => ({
            id: Date.now() + Math.random(),
            name: project.name || "Untitled Project",
            description: project.description || "No description provided.",
            technologies: project.technologies || [],
            projectUrl: project.projectUrl || "",
          })),
        ],
        experience: data.experience || [],
        education: data.education || [],
        skills: data.skills || {},
        cvData: formData.cvFile
          ? {
              provided: true,
              filename: formData.cvFile.name,
            }
          : null,
      };

      // Save the merged data to localStorage
      localStorage.setItem("portfolioData", JSON.stringify(cleanedPortfolioData));

      // Navigate to the portfolio preview page
      router.push("/portfolio/preview");
    } catch (error) {
      console.error("Error saving portfolio data:", error);
      router.push("/portfolio/preview"); // Navigate even if saving fails
    }
  }

  const handleTabChange = (value: string) => setActiveTab(value)

  const handleNext = () => {
    if (activeTab === "basic") setActiveTab("social")
    else if (activeTab === "social") setActiveTab("projects")
    else handleSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  const handleBack = () => {
    if (activeTab === "social") setActiveTab("basic")
    else if (activeTab === "projects") setActiveTab("social")
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

      <div className="container max-w-2xl py-12 relative z-10">
        <Link href="/dashboard" className="flex items-center text-sm mb-6 hover:underline group">
          <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" /> Back to
          dashboard
        </Link>

        <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
          <CardHeader>
            <Badge className="w-fit px-4 py-1.5 mb-3 font-semibold rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-600/20 transition-all">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Create Your Portfolio
            </Badge>
            <CardTitle>Create Your Portfolio</CardTitle>
            <CardDescription>Provide your information and social links to generate your portfolio</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent>
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50 p-1 rounded-lg">
                  <TabsTrigger
                    value="basic"
                    className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
                  >
                    Basic Info
                  </TabsTrigger>
                  <TabsTrigger
                    value="social"
                    className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
                  >
                    Social Links
                  </TabsTrigger>
                  <TabsTrigger
                    value="projects"
                    className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
                  >
                    Projects
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-6">
                  {/* Basic Info Form Fields */}
                  <div className="space-y-2">
                    <Label htmlFor="profileImage">Profile Image</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-24 w-24 rounded-full bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 flex items-center justify-center overflow-hidden border border-indigo-100 dark:border-indigo-900/50 shadow-md">
                        {previewImage ? (
                          <img
                            src={previewImage || "/placeholder.svg"}
                            alt="Profile preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Upload className="h-8 w-8 text-indigo-400" />
                        )}
                      </div>
                      <Input
                        id="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="max-w-sm border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </div>

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
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Frontend Developer"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Short Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="I'm a passionate developer with 5 years of experience..."
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvUpload">Upload CV/Resume</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-md bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-900/30 dark:to-violet-900/30 flex items-center justify-center overflow-hidden border border-indigo-100 dark:border-indigo-900/50 shadow-md">
                        <FileText className="h-6 w-6 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <Input
                          id="cvUpload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleCVUpload}
                          ref={fileInputRef}
                          className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Upload your CV to help us extract more information
                        </p>
                      </div>
                    </div>
                    {formData.cvFile && (
                      <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2">
                        CV uploaded: {formData.cvFile.name}
                      </p>
                    )}
                    {extractionStatus === "loading" && (
                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Loader2 className="h-4 w-4 animate-spin text-indigo-600" />
                          <p className="text-sm">{extractionMessage}</p>
                        </div>
                        <Progress value={extractionProgress} className="h-2 bg-indigo-100 dark:bg-indigo-900/30">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
                            style={{ width: `${extractionProgress}%` }}
                          />
                        </Progress>
                      </div>
                    )}
                    {extractionStatus === "success" && (
                      <Alert className="mt-4 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50">
                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{extractionMessage}</AlertDescription>
                      </Alert>
                    )}
                    {extractionStatus === "error" && (
                      <Alert className="mt-4" variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{extractionMessage}</AlertDescription>
                      </Alert>
                    )}
                    {extractionStatus === "warning" && (
                      <Alert className="mt-4" variant="warning">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>{extractionMessage}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="social" className="space-y-6">
                  {/* Social Links Form Fields */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Github className="h-5 w-5" />
                      <Label htmlFor="github">GitHub Username</Label>
                    </div>
                    <Input
                      id="github"
                      name="github"
                      placeholder="username"
                      value={formData.github}
                      onChange={handleChange}
                      className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-5 w-5" />
                      <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                    </div>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Dribbble className="h-5 w-5" />
                      <Label htmlFor="dribbble">Dribbble Profile URL</Label>
                    </div>
                    <Input
                      id="dribbble"
                      name="dribbble"
                      placeholder="https://dribbble.com/username"
                      value={formData.dribbble}
                      onChange={handleChange}
                      className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Figma className="h-5 w-5" />
                      <Label htmlFor="figma">Figma Profile URL</Label>
                    </div>
                    <Input
                      id="figma"
                      name="figma"
                      placeholder="https://figma.com/@username"
                      value={formData.figma}
                      onChange={handleChange}
                      className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Personal Website (Optional)</Label>
                    <Input
                      id="website"
                      name="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={handleChange}
                      className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={extractFromSocialProfiles}
                      disabled={extractionStatus === "loading"}
                      className="w-full rounded-lg border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                    >
                      {extractionStatus === "loading" ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Extracting data...
                        </>
                      ) : (
                        "Extract Data from Profiles"
                      )}
                    </Button>

                    {extractionStatus === "loading" && (
                      <div className="mt-4">
                        <Progress value={extractionProgress} className="h-2 bg-indigo-100 dark:bg-indigo-900/30">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-600 to-violet-600"
                            style={{ width: `${extractionProgress}%` }}
                          />
                        </Progress>
                        <p className="text-xs text-center text-muted-foreground mt-1">{extractionMessage}</p>
                      </div>
                    )}

                    {extractionStatus === "success" && (
                      <Alert className="mt-4 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900/50">
                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>{extractionMessage}</AlertDescription>
                      </Alert>
                    )}

                    {extractionStatus === "error" && (
                      <Alert className="mt-4" variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{extractionMessage}</AlertDescription>
                      </Alert>
                    )}

                    {extractionStatus === "warning" && (
                      <Alert className="mt-4" variant="warning">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>{extractionMessage}</AlertDescription>
                      </Alert>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30 p-4 rounded-lg mb-6 border border-indigo-100/50 dark:border-indigo-900/30">
                    <h3 className="font-medium mb-2">{editingProject ? "Edit Project" : "Add Projects Manually"}</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="projectName">Project Name</Label>
                        <Input
                          id="projectName"
                          name="name"
                          placeholder="E-commerce Website"
                          value={editingProject ? editingProject.name : newProject.name}
                          onChange={(e) =>
                            editingProject
                              ? setEditingProject({ ...editingProject, name: e.target.value })
                              : setNewProject({ ...newProject, name: e.target.value })
                          }
                          className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectDescription">Description</Label>
                        <Textarea
                          id="projectDescription"
                          name="description"
                          placeholder="A full-featured online store with user authentication..."
                          value={editingProject ? editingProject.description : newProject.description}
                          onChange={(e) =>
                            editingProject
                              ? setEditingProject({ ...editingProject, description: e.target.value })
                              : setNewProject({ ...newProject, description: e.target.value })
                          }
                          rows={3}
                          className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectTechnologies">Technologies (comma separated)</Label>
                        <Input
                          id="projectTechnologies"
                          name="technologies"
                          placeholder="React, Node.js, MongoDB"
                          value={editingProject ? editingProject.technologies.join(", ") : newProject.technologies}
                          onChange={(e) =>
                            editingProject
                              ? setEditingProject({
                                  ...editingProject,
                                  technologies: e.target.value.split(",").map((t) => t.trim()),
                                })
                              : setNewProject({ ...newProject, technologies: e.target.value })
                          }
                          className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectUrl">Project URL (Optional)</Label>
                        <Input
                          id="projectUrl"
                          name="projectUrl"
                          placeholder="https://github.com/username/repo"
                          value={editingProject ? editingProject.projectUrl : newProject.projectUrl}
                          onChange={(e) =>
                            editingProject
                              ? setEditingProject({ ...editingProject, projectUrl: e.target.value })
                              : setNewProject({ ...newProject, projectUrl: e.target.value })
                          }
                          className="border-indigo-100 dark:border-indigo-900 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={editingProject ? saveEditedProject : addProject} className="w-full">
                          {editingProject ? "Save Project" : "Add Project"}
                        </Button>
                        {editingProject && (
                          <Button variant="secondary" onClick={cancelEditing}>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mt-6">Your Projects</h3>
                  {formData.manualProjects.map((project) => (
                    <Card key={project.id} className="mb-4">
                      <CardHeader>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div>
                          <h4 className="font-semibold">Technologies:</h4>
                          <ul className="list-disc pl-5">
                            {project.technologies.map((tech, index) => (
                              <li key={index}>{tech}</li>
                            ))}
                          </ul>
                        </div>
                        {project.projectUrl && (
                          <div>
                            <h4 className="font-semibold">Project URL:</h4>
                            <Link
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:underline"
                            >
                              {project.projectUrl}
                            </Link>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleEditProject(project)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => removeProject(project.id)}>
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="skills" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{editingSkill ? "Edit Skill" : "Add Skill"}</h3>
                    <div className="space-y-2">
                      <Label htmlFor="skillName">Skill Name</Label>
                      <Input
                        id="skillName"
                        name="name"
                        placeholder="JavaScript"
                        value={editingSkill ? editingSkill.name : newSkill.name}
                        onChange={(e) =>
                          editingSkill
                            ? setEditingSkill({ ...editingSkill, name: e.target.value })
                            : setNewSkill({ ...newSkill, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="skillCategory">Category</Label>
                      <select
                        id="skillCategory"
                        name="category"
                        value={editingSkill ? editingSkill.category : newSkill.category}
                        onChange={(e) =>
                          editingSkill
                            ? setEditingSkill({ ...editingSkill, category: e.target.value as Skill["category"] })
                            : setNewSkill({ ...newSkill, category: e.target.value as Skill["category"] })
                        }
                        className="border border-indigo-100 dark:border-indigo-900 rounded-md p-2"
                      >
                        <option value="technical">Technical</option>
                        <option value="design">Design</option>
                        <option value="soft">Soft</option>
                        <option value="language">Language</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={editingSkill ? saveEditedSkill : addSkill}>
                        {editingSkill ? "Save Skill" : "Add Skill"}
                      </Button>
                      {editingSkill && (
                        <Button variant="secondary" onClick={cancelEditing}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mt-6">Your Skills</h3>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Existing Skills</h3>
                    {formData.skills?.map((skill) => (
                      <div key={skill.id} className="flex justify-between items-center">
                        <span>
                          {skill.name} ({skill.category})
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleEditSkill(skill)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => removeSkill(skill.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{editingExperience ? "Edit Experience" : "Add Experience"}</h3>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Company Name"
                        value={editingExperience ? editingExperience.company : newExperience.company}
                        onChange={(e) =>
                          editingExperience
                            ? setEditingExperience({ ...editingExperience, company: e.target.value })
                            : setNewExperience({ ...newExperience, company: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        name="position"
                        placeholder="Software Engineer"
                        value={editingExperience ? editingExperience.position : newExperience.position}
                        onChange={(e) =>
                          editingExperience
                            ? setEditingExperience({ ...editingExperience, position: e.target.value })
                            : setNewExperience({ ...newExperience, position: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        name="duration"
                        placeholder="Jan 2020 - Present"
                        value={editingExperience ? editingExperience.duration : newExperience.duration}
                        onChange={(e) =>
                          editingExperience
                            ? setEditingExperience({ ...editingExperience, duration: e.target.value })
                            : setNewExperience({ ...newExperience, duration: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your role and responsibilities"
                        value={editingExperience ? editingExperience.description : newExperience.description}
                        onChange={(e) =>
                          editingExperience
                            ? setEditingExperience({ ...editingExperience, description: e.target.value })
                            : setNewExperience({ ...newExperience, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={editingExperience ? saveEditedExperience : addExperience}>
                        {editingExperience ? "Save Experience" : "Add Experience"}
                      </Button>
                      {editingExperience && (
                        <Button variant="secondary" onClick={cancelEditing}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mt-6">Your Experience</h3>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Existing Experience</h3>
                    {formData.experience?.map((exp) => (
                      <div key={exp.id} className="flex justify-between items-center">
                        <span>
                          {exp.company} - {exp.position}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleEditExperience(exp)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => removeExperience(exp.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{editingEducation ? "Edit Education" : "Add Education"}</h3>
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        name="institution"
                        placeholder="University Name"
                        value={editingEducation ? editingEducation.institution : newEducation.institution}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, institution: e.target.value })
                            : setNewEducation({ ...newEducation, institution: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree</Label>
                      <Input
                        id="degree"
                        name="degree"
                        placeholder="Bachelor's in Computer Science"
                        value={editingEducation ? editingEducation.degree : newEducation.degree}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, degree: e.target.value })
                            : setNewEducation({ ...newEducation, degree: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        name="duration"
                        placeholder="2015 - 2019"
                        value={editingEducation ? editingEducation.duration : newEducation.duration}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, duration: e.target.value })
                            : setNewEducation({ ...newEducation, duration: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your studies and achievements"
                        value={editingEducation ? editingEducation.description : newEducation.description}
                        onChange={(e) =>
                          editingEducation
                            ? setEditingEducation({ ...editingEducation, description: e.target.value })
                            : setNewEducation({ ...newEducation, description: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={editingEducation ? saveEditedEducation : addEducation}>
                        {editingEducation ? "Save Education" : "Add Education"}
                      </Button>
                      {editingEducation && (
                        <Button variant="secondary" onClick={cancelEditing}>
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mt-6">Your Education</h3>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Existing Education</h3>
                    {formData.education?.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-center">
                        <span>
                          {edu.institution} - {edu.degree}
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleEditEducation(edu)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => removeEducation(edu.id)}>
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>

            <div className="flex justify-between p-6">
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                disabled={activeTab === "basic"}
                className="rounded-lg"
              >
                Back
              </Button>
              <Button type="button" onClick={handleNext} className="rounded-lg">
                {activeTab === "projects" ? "Generate Portfolio" : "Next"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
