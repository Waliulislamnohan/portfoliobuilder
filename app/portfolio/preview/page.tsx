"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Github,
  Linkedin,
  ExternalLink,
  Mail,
  Download,
  Edit,
  Share2,
  FileText,
  Dribbble,
  DribbbleIcon as Behance,
  Figma,
  Globe,
  Code,
  Palette,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  LoaderCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Define types for our data structures
type Project = {
  id: string
  name: string
  description: string
  technologies: string[]
  projectUrl?: string
  imageUrl?: string
  source: string
  type?: "design" | "code" | "other"
  starCount?: number
  forkCount?: number
  lastUpdated?: string
  highlights?: string[]
}

type Experience = {
  company: string
  position: string
  duration: string
  description: string
  skills: string[]
  location?: string
  achievements?: string[]
  source?: string
  startDate?: string // ISO format for sorting
  endDate?: string // ISO format or "Present"
  companyLogo?: string
}

type Education = {
  institution: string
  degree: string
  duration: string
  description?: string
  location?: string
  startDate?: string
  endDate?: string
  logo?: string
}

type Skill = {
  name: string
  level?: number // 1-5
  endorsements?: number
  category: "technical" | "design" | "soft" | "language"
  related?: string[]
  source?: string
}

type PortfolioData = {
  name: string
  title: string
  bio: string
  profileImageUrl: string
  location?: string
  email?: string
  phone?: string
  website?: string
  github?: string
  linkedin?: string
  behance?: string
  dribbble?: string
  figma?: string
  cvData?: any
  manualProjects: Project[]
  extractedData?: {
    projects?: Project[]
    experience?: Experience[]
    education?: Education[]
    skills?: {
      technical: string[]
      design: string[]
      soft: string[]
      language?: string[]
    }
    achievements?: string[]
    statistics?: {
      githubStats?: {
        repos?: number
        stars?: number
        contributions?: number
        followers?: number
      }
      designStats?: {
        projects?: number
        likes?: number
        views?: number
        followers?: number
      }
    }
  }
}

export default function PortfolioPreview() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("preview")
  const [loading, setLoading] = useState(true)
  const [analyzingData, setAnalyzingData] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisStage, setAnalysisStage] = useState("")
  const [enhancedData, setEnhancedData] = useState<any>(null)
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "I'm a passionate Full Stack Developer with 5 years of experience building web applications. I specialize in React, Node.js, and modern JavaScript frameworks. I love creating intuitive user experiences and solving complex problems with clean, efficient code.",
    profileImageUrl: "",
    github: "",
    linkedin: "",
    behance: "",
    dribbble: "",
    figma: "",
    website: "",
    email: "",
    cvData: null,
    manualProjects: [],
    extractedData: undefined,
  })
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Add state for error messages

  // Grid pattern background style
  const gridPatternStyle = {
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
  }

  // Load user data from localStorage on component mount
  useEffect(() => {
    const loadPortfolioData = async () => {
      setLoading(true);

      try {
        // Simulate a delay for loading state
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Retrieve data from localStorage
        const savedData = localStorage.getItem("portfolioData");
        if (savedData) {
          const parsedData = JSON.parse(savedData);

          // Ensure all fields are populated, even if missing in localStorage
          setPortfolioData((prevData) => ({
            ...prevData,
            ...parsedData,
            extractedData: {
              experience: parsedData.experience || [],
              education: parsedData.education || [],
              skills: parsedData.skills || {
                technical: [],
                design: [],
                soft: [],
                language: [],
              },
              projects: parsedData.manualProjects || [],
            },
          }));
        } else {
          setErrorMessage("No portfolio data found. Please create your portfolio first.");
        }
      } catch (error) {
        console.error("Error loading portfolio data:", error);
        setErrorMessage("Failed to load portfolio data.");
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      loadPortfolioData()
    }
  }, []);

  // Function to handle extracted data
  const handleExtractedData = (extractedData: any) => {
    setPortfolioData((prevData) => ({
      ...prevData,
      name: extractedData.basicInfo?.name || prevData.name,
      title: extractedData.basicInfo?.title || prevData.title,
      bio: extractedData.basicInfo?.bio || prevData.bio,
      profileImageUrl: extractedData.basicInfo?.profileImageUrl || prevData.profileImageUrl,
      location: extractedData.basicInfo?.location || prevData.location,
      email: extractedData.basicInfo?.email || prevData.email,
      manualProjects: extractedData.projects || prevData.manualProjects,
      extractedData: {
        ...prevData.extractedData,
        experience: extractedData.experience || prevData.extractedData?.experience,
        education: extractedData.education || prevData.extractedData?.education,
        skills: extractedData.skills || prevData.extractedData?.skills,
        projects: extractedData.projects || prevData.extractedData?.projects,
      },
    }));
  };

  // Example usage of handleExtractedData
  useEffect(() => {
    // Simulate receiving extracted data
    const extractedData = {
      basicInfo: {
        name: "MD Waliul Islam Nohan",
        title: "AI Tech Lead",
        bio: "Experienced professional with diverse skills and accomplishments.",
        profileImageUrl: "https://example.com/profile.jpg",
        location: "Dhaka, Bangladesh",
      },
      experience: [
        {
          company: "Envobyte Ltd.",
          position: "AI Tech Lead",
          duration: "Apr 2024 - Present",
          description: "Leading AI initiatives.",
        },
      ],
      education: [
        {
          institution: "Daffodil International University",
          degree: "Bachelor's in Software Engineering",
          duration: "2022 - Present",
        },
      ],
      skills: {
        technical: ["JavaScript", "React", "Node.js"],
        design: ["UI/UX Design"],
        soft: ["Leadership", "Communication"],
        languages: ["English"],
      },
      projects: [
        {
          name: "AI Tutor",
          description: "An AI-powered tutoring platform.",
          technologies: ["TypeScript", "Next.js"],
          projectUrl: "https://github.com/example/ai-tutor",
        },
      ],
    };

    handleExtractedData(extractedData);
  }, []);

  // Enhanced analysis of portfolio data
  const enhancePortfolioData = async (data: PortfolioData) => {
    try {
      // Simulate stages of analysis with progress updates
      const totalStages = 7
      const progressStep = 100 / totalStages

      // Stage 1: Analyzing basic information
      setAnalysisStage("Analyzing basic information...")
      setAnalysisProgress(progressStep)
      await simulateProcessing(500)

      // Stage 2: Processing social profiles
      setAnalysisStage("Processing social profiles...")
      setAnalysisProgress(progressStep * 2)
      await simulateProcessing(700)

      // Stage 3: Extracting project details
      setAnalysisStage("Extracting project details...")
      setAnalysisProgress(progressStep * 3)
      await simulateProcessing(800)

      // Stage 4: Analyzing skills and expertise
      setAnalysisStage("Analyzing skills and expertise...")
      setAnalysisProgress(progressStep * 4)
      await simulateProcessing(600)

      // Stage 5: Processing work experience
      setAnalysisStage("Processing work experience...")
      setAnalysisProgress(progressStep * 5)
      await simulateProcessing(750)

      // Stage 6: Enhancing portfolio presentation
      setAnalysisStage("Enhancing portfolio presentation...")
      setAnalysisProgress(progressStep * 6)
      await simulateProcessing(900)

      // Stage 7: Finalizing portfolio content
      setAnalysisStage("Finalizing portfolio content...")
      setAnalysisProgress(progressStep * 7)
      await simulateProcessing(500)

      // Use actual extracted data instead of generating random data
      const enhanced = organizeExtractedData(data)
      setEnhancedData(enhanced)

      // Finalize
      setAnalysisProgress(100)
      await simulateProcessing(300)
      setAnalyzingData(false)
    } catch (error) {
      console.error("Error enhancing portfolio data:", error)
      setAnalyzingData(false)
    }
  }

  // Helper function to simulate processing time
  const simulateProcessing = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // Helper function to enhance portfolio data with AI-generated insights
  const enhanceData = (data: PortfolioData) => {
    // In a real implementation, this would integrate with APIs and AI services
    // Here we'll simulate enhancement of the data

    const enhanced = { ...data }

    // Add skill proficiency levels based on projects and experience
    if (enhanced.extractedData?.skills) {
      enhanced.extractedData.skills.technical = enhanced.extractedData.skills.technical.map((skill) => {
        const level = Math.floor(Math.random() * 3) + 3 // Random level between 3-5
        return { name: skill, level, category: "technical" }
      })

      enhanced.extractedData.skills.design = enhanced.extractedData.skills.design.map((skill) => {
        const level = Math.floor(Math.random() * 3) + 3 // Random level between 3-5
        return { name: skill, level, category: "design" }
      })

      enhanced.extractedData.skills.soft = enhanced.extractedData.skills.soft.map((skill) => {
        const level = Math.floor(Math.random() * 2) + 4 // Random level between 4-5
        return { name: skill, level, category: "soft" }
      })
    }

    // Add GitHub statistics if GitHub username is available
    if (enhanced.github) {
      enhanced.githubStats = {
        repos: Math.floor(Math.random() * 30) + 10,
        stars: Math.floor(Math.random() * 100) + 20,
        contributions: Math.floor(Math.random() * 500) + 100,
        followers: Math.floor(Math.random() * 50) + 5,
      }

      // Enhance projects with more GitHub metadata
      if (enhanced.extractedData?.projects) {
        enhanced.extractedData.projects = enhanced.extractedData.projects.map((project) => {
          if (project.source === "github") {
            return {
              ...project,
              starCount: Math.floor(Math.random() * 50),
              forkCount: Math.floor(Math.random() * 20),
              lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
              highlights: [
                "Implemented CI/CD pipeline with GitHub Actions",
                "Reduced load times by 40% through code optimization",
                "Added comprehensive test coverage with Jest",
              ].slice(0, Math.floor(Math.random() * 3) + 1),
            }
          }
          return project
        })
      }
    }

    // Enhance design projects if design platform usernames are available
    if (enhanced.dribbble || enhanced.behance) {
      // Add design statistics
      enhanced.designStats = {
        projects: Math.floor(Math.random() * 20) + 5,
        likes: Math.floor(Math.random() * 1000) + 100,
        views: Math.floor(Math.random() * 10000) + 1000,
        followers: Math.floor(Math.random() * 200) + 50,
      }

      // Enhance projects with more design metadata
      if (enhanced.extractedData?.projects) {
        enhanced.extractedData.projects = enhanced.extractedData.projects.map((project) => {
          if (project.source === "dribbble" || project.source === "behance") {
            return {
              ...project,
              likes: Math.floor(Math.random() * 200) + 50,
              views: Math.floor(Math.random() * 2000) + 300,
              comments: Math.floor(Math.random() * 30) + 5,
              highlights: [
                "Featured on the platform's gallery",
                "Client project with positive feedback",
                "Part of a design system project",
              ].slice(0, Math.floor(Math.random() * 3) + 1),
            }
          }
          return project
        })
      }
    }

    // Add educational background based on LinkedIn extraction
    if (enhanced.linkedin && !enhanced.extractedData?.education) {
      enhanced.extractedData = {
        ...enhanced.extractedData,
        education: [
          {
            institution: "University of Technology",
            degree: "Bachelor of Science in Computer Science",
            duration: "2014 - 2018",
            location: "San Francisco, CA",
            description: "Graduated with honors. Specialized in Software Engineering and Data Structures.",
          },
        ],
      }
    }

    // Enhance experience entries with achievements
    if (enhanced.extractedData?.experience) {
      enhanced.extractedData.experience = enhanced.extractedData.experience.map((exp) => {
        return {
          ...exp,
          achievements: [
            "Led a team of 5 developers to deliver project ahead of schedule",
            "Reduced bug count by 40% through improved testing processes",
            "Implemented new features that increased user engagement by 25%",
            "Optimized database queries resulting in 30% performance improvement",
          ].slice(0, Math.floor(Math.random() * 3) + 1),
        }
      })
    }

    return enhanced
  }

  // New function to organize extracted data instead of generating random data
  const organizeExtractedData = (data: PortfolioData) => {
    const enhanced = { ...data }

    // Use extracted data if available
    if (enhanced.extractedData) {
      // Skills section - organize by category and ensure proper structure
      if (enhanced.extractedData.skills) {
        // Make sure all skills arrays are available
        enhanced.extractedData.skills.technical = enhanced.extractedData.skills.technical || []
        enhanced.extractedData.skills.design = enhanced.extractedData.skills.design || []
        enhanced.extractedData.skills.soft = enhanced.extractedData.skills.soft || []

        // Convert any string arrays to object format with levels
        const skillCategories = ["technical", "design", "soft", "languages"] as const

        skillCategories.forEach((category) => {
          if (enhanced.extractedData?.skills[category]) {
            const skills = enhanced.extractedData.skills[category]
            if (skills.length > 0 && typeof skills[0] === "string") {
              enhanced.extractedData.skills[category] = skills.map((skill: string) => {
                // Determine skill level based on source and frequency
                let level = 3 // Default intermediate

                // Check if skill appears in projects
                const appearanceCount =
                  enhanced.extractedData?.projects?.filter((p: any) =>
                    p.technologies?.some((t: string) => t.toLowerCase() === skill.toLowerCase()),
                  ).length || 0

                // Check if skill appears in experience
                const experienceCount =
                  enhanced.extractedData?.experience?.filter((exp: any) =>
                    exp.skills?.some((s: string) => s.toLowerCase() === skill.toLowerCase()),
                  ).length || 0

                // Adjust level based on occurrences
                if (appearanceCount + experienceCount > 2) {
                  level = 5 // Expert
                } else if (appearanceCount + experienceCount > 0) {
                  level = 4 // Advanced
                }

                return {
                  name: skill,
                  level,
                  category,
                }
              })
            }
          }
        })
      }

      // Projects - ensure projects have proper structure and metadata
      if (enhanced.extractedData.projects) {
        enhanced.extractedData.projects = enhanced.extractedData.projects.map((project: any) => {
          // Add type if not present
          if (!project.type) {
            const techString = project.technologies?.join(" ").toLowerCase() || ""

            if (
              techString.includes("design") ||
              techString.includes("figma") ||
              techString.includes("sketch") ||
              techString.includes("adobe") ||
              project.source === "behance" ||
              project.source === "dribbble"
            ) {
              project.type = "design"
            } else {
              project.type = "code"
            }
          }

          return project
        })
      }

      // Experience - ensure consistent structure
      if (enhanced.extractedData.experience) {
        enhanced.extractedData.experience = enhanced.extractedData.experience.map((exp: any) => {
          // Extract start/end dates from duration if not already present
          if (!exp.startDate && exp.duration) {
            const dateMatch = exp.duration.match(/(\d{4})\s*[-–—]\s*(\d{4}|present|current)/i)
            if (dateMatch) {
              exp.startDate = dateMatch[1]
              exp.endDate =
                dateMatch[2].toLowerCase() === "present" || dateMatch[2].toLowerCase() === "current"
                  ? "Present"
                  : dateMatch[2]
            }
          }

          return exp
        })
      }

      // Add statistics based on real data
      if (!enhanced.statistics) {
        enhanced.statistics = {}
      }

      // GitHub stats
      if (enhanced.github && !enhanced.statistics.githubStats) {
        // Count code projects
        const codeProjects =
          enhanced.extractedData.projects?.filter((p: any) => p.type === "code" || p.source === "github").length || 0

        enhanced.statistics.githubStats = {
          repos: codeProjects || 5,
          stars: codeProjects * 8 || 15,
          contributions: codeProjects * 30 || 120,
          followers: codeProjects * 2 || 8,
        }
      }

      // Design stats
      if ((enhanced.dribbble || enhanced.behance) && !enhanced.statistics.designStats) {
        // Count design projects
        const designProjects =
          enhanced.extractedData.projects?.filter(
            (p: any) => p.type === "design" || p.source === "dribbble" || p.source === "behance",
          ).length || 0

        enhanced.statistics.designStats = {
          projects: designProjects || 4,
          likes: designProjects * 40 || 120,
          views: designProjects * 200 || 600,
          followers: designProjects * 5 || 25,
        }
      }
    }

    return enhanced
  }

  // Helper function to determine project type from technologies
  const determineProjectType = (project: any): "design" | "code" | "other" => {
    const designTechs = ["figma", "sketch", "photoshop", "illustrator", "adobe", "ui", "ux", "design", "creative"]
    const codeTechs = [
      "javascript",
      "typescript",
      "react",
      "node",
      "python",
      "java",
      "html",
      "css",
      "code",
      "programming",
    ]

    const techs = project.technologies || []
    const techString = techs.join(" ").toLowerCase()

    if (designTechs.some((tech) => techString.includes(tech))) {
      return "design"
    } else if (codeTechs.some((tech) => techString.includes(tech))) {
      return "code"
    }

    return "other"
  }

  // Get projects from data, with enhanced information if available
  const getProjects = useMemo(() => {
    // Initialize final projects array
    let finalProjects: Project[] = []
    const projectNames = new Set()

    // Use enhanced data if available, otherwise use original data
    const dataSource = portfolioData

    // Filter only pinned projects
    // if (dataSource.extractedData?.projects) {
    //   finalProjects = dataSource.extractedData.projects.filter((project: any) => project.pinned)
    // }

    // If no pinned projects, fallback to manual projects
    if (finalProjects.length === 0 && dataSource.manualProjects) {
      finalProjects = dataSource.manualProjects.filter((project: any) => project.pinned)
    }

    return finalProjects
  }, [portfolioData])

  // Get experience from extracted data
  const getExperience = useMemo(() => {
    // Use enhanced data if available, otherwise use original data
    const dataSource = enhancedData || portfolioData

    // First check if we have extracted data
    if (
      dataSource.extractedData &&
      dataSource.extractedData.experience &&
      dataSource.extractedData.experience.length > 0
    ) {
      // Sort experience by date (most recent first)
      return [...dataSource.extractedData.experience].sort((a, b) => {
        // Assuming endDate is either a date string or "Present"
        if (a.endDate === "Present") return -1
        if (b.endDate === "Present") return 1
        if (a.endDate && b.endDate) return new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
        return 0
      })
    }

    // If no extracted experience, return default experience
    return [
      {
        company: "TechCorp Inc.",
        position: "Senior Developer",
        duration: "2020 - Present",
        description:
          "Led a team of developers in building enterprise-level web applications. Implemented CI/CD pipelines and improved application performance.",
        skills: ["React", "Node.js", "AWS", "Docker"],
        achievements: [
          "Led migration to microservices architecture",
          "Reduced deployment time by 70% with improved CI/CD pipeline",
        ],
      },
      {
        company: "Digital Solutions LLC",
        position: "Web Developer",
        duration: "2018 - 2020",
        description:
          "Developed responsive web applications for clients across various industries. Collaborated with designers and product managers.",
        skills: ["JavaScript", "Vue.js", "PHP", "MySQL"],
        achievements: [
          "Rebuilt company website increasing conversion by 25%",
          "Optimized database queries resulting in 40% faster load times",
        ],
      },
    ]
  }, [portfolioData, enhancedData])

  // Get education from extracted data
  const getEducation = useMemo(() => {
    // Use enhanced data if available, otherwise use original data
    const dataSource = enhancedData || portfolioData

    if (
      dataSource.extractedData &&
      dataSource.extractedData.education &&
      dataSource.extractedData.education.length > 0
    ) {
      return dataSource.extractedData.education
    }

    // Default education if none available
    return [
      {
        institution: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        duration: "2014 - 2018",
        location: "San Francisco, CA",
        description: "Graduated with honors. Specialized in Software Engineering and Data Structures.",
      },
    ]
  }, [portfolioData, enhancedData])

  // Get skills from extracted data with enhanced processing
  const getSkills = useMemo(() => {
    // Use enhanced data if available, otherwise use original data
    const dataSource = enhancedData || portfolioData

    // Process enhanced skill data if available
    if (dataSource.extractedData?.skills) {
      const skills = {
        technical: Array.isArray(dataSource.extractedData.skills.technical)
          ? dataSource.extractedData.skills.technical
          : [],
        design: Array.isArray(dataSource.extractedData.skills.design) ? dataSource.extractedData.skills.design : [],
        soft: Array.isArray(dataSource.extractedData.skills.soft) ? dataSource.extractedData.skills.soft : [],
        language: Array.isArray(dataSource.extractedData.skills.language)
          ? dataSource.extractedData.skills.language
          : [],
      }

      // Convert to object format if it's just string arrays
      if (skills.technical.length > 0 && typeof skills.technical[0] === "string") {
        skills.technical = skills.technical.map((skill: string) => ({
          name: skill,
          level: Math.floor(Math.random() * 3) + 3, // Random level 3-5
          category: "technical",
        }))
      }

      if (skills.design.length > 0 && typeof skills.design[0] === "string") {
        skills.design = skills.design.map((skill: string) => ({
          name: skill,
          level: Math.floor(Math.random() * 3) + 3, // Random level 3-5
          category: "design",
        }))
      }

      if (skills.soft.length > 0 && typeof skills.soft[0] === "string") {
        skills.soft = skills.soft.map((skill: string) => ({
          name: skill,
          level: Math.floor(Math.random() * 2) + 4, // Random level 4-5
          category: "soft",
        }))
      }

      if (skills.language.length > 0 && typeof skills.language[0] === "string") {
        skills.language = skills.language.map((skill, index) => ({
          name: skill,
          level: Math.floor(Math.random() * 3) + 3, // Random level 3-5
          category: "language",
        }))
      }

      return skills
    }

    // If no extracted skills, return default skills
    return {
      technical: [
        { name: "JavaScript", level: 5, category: "technical" },
        { name: "React", level: 5, category: "technical" },
        { name: "Node.js", level: 4, category: "technical" },
        { name: "TypeScript", level: 4, category: "technical" },
        { name: "Next.js", level: 4, category: "technical" },
        { name: "MongoDB", level: 3, category: "technical" },
        { name: "GraphQL", level: 3, category: "technical" },
        { name: "AWS", level: 3, category: "technical" },
      ],
      design: [
        { name: "UI/UX Design", level: 3, category: "design" },
        { name: "Responsive Design", level: 4, category: "design" },
        { name: "Wireframing", level: 3, category: "design" },
      ],
      soft: [
        { name: "Team Leadership", level: 4, category: "soft" },
        { name: "Communication", level: 5, category: "soft" },
        { name: "Problem Solving", level: 5, category: "soft" },
      ],
      language: [
        { name: "English", level: 5, category: "language" },
        { name: "Spanish", level: 3, category: "language" },
      ],
    }
  }, [portfolioData, enhancedData])

  // Get GitHub stats if available
  const getGitHubStats = useMemo(() => {
    // Use enhanced data if available, otherwise use original data
    const dataSource = enhancedData || portfolioData

    if (dataSource.githubStats) {
      return dataSource.githubStats
    }

    // Default GitHub stats
    return dataSource.github
      ? {
          repos: 15,
          stars: 45,
          contributions: 328,
          followers: 12,
        }
      : null
  }, [portfolioData, enhancedData])

  // Get design stats if available
  const getDesignStats = useMemo(() => {
    // Use enhanced data if available, otherwise use original data
    const dataSource = enhancedData || portfolioData

    if (dataSource.designStats) {
      return dataSource.designStats
    }

    // Default design stats if design profiles exist
    return dataSource.dribbble || dataSource.behance
      ? {
          projects: 8,
          likes: 245,
          views: 3520,
          followers: 76,
        }
      : null
  }, [portfolioData, enhancedData])

  // Function to handle edit button click
  const handleEdit = () => {
    // Save the current portfolio data to localStorage for editing
    localStorage.setItem("portfolioEditData", JSON.stringify(portfolioData));
    router.push("/create-portfolio");
  }

  // Replace dynamic values with consistent ones
  const currentYear = useMemo(() => new Date().getFullYear(), []); // Memoize the year to avoid mismatches

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Loading Your Portfolio</h2>
          <p className="text-muted-foreground">Please wait while we prepare your portfolio preview...</p>
        </div>
      </div>
    )
  }

  // Render analyzing state
  if (analyzingData) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full mb-4">
              <LoaderCircle className="h-6 w-6 text-white animate-spin" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Analyzing Your Portfolio</h2>
            <p className="text-muted-foreground">Our AI is enhancing your portfolio data</p>
          </div>

          <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{analysisStage}</span>
                  <span className="text-sm font-medium">{Math.round(analysisProgress)}%</span>
                </div>
                <Progress value={analysisProgress} className="h-2 bg-indigo-100 dark:bg-indigo-900/30">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
                    style={{ width: `${analysisProgress}%` }}
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
                  Our AI is analyzing your data to create an enhanced portfolio experience that best showcases your
                  skills.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Get the data we need
  const projects = getProjects
  const experience = getExperience
  const skills = getSkills
  const education = getEducation
  const githubStats = getGitHubStats
  const designStats = getDesignStats

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Display error message if present */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-4 max-w-3xl mx-auto">
          {errorMessage}
        </div>
      )}
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10rem] -left-[10rem] w-[40rem] h-[40rem] bg-violet-400 rounded-full mix-blend-multiply opacity-10 animate-blob"></div>
        <div className="absolute -top-[5rem] -right-[10rem] w-[45rem] h-[45rem] bg-fuchsia-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-[25rem] left-[15rem] w-[40rem] h-[40rem] bg-rose-400 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link href="/dashboard" className="flex items-center text-sm mb-2 hover:underline group">
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform duration-300" /> Back
              to dashboard
            </Link>
            <h1 className="text-3xl font-bold">Your Portfolio</h1>
            <p className="text-muted-foreground">Preview and customize your portfolio before publishing</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                >
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Portfolio</DialogTitle>
                  <DialogDescription>
                    Your portfolio is currently private. Upgrade to Premium to get a shareable link.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="bg-muted p-3 rounded-md text-sm font-mono opacity-50">
                    {`https://portfoliobuilder.com/${portfolioData.name?.toLowerCase().replace(/\s+/g, "-") || "your-name"}`}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    <Badge
                      variant="outline"
                      className="mr-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-none"
                    >
                      PRO
                    </Badge>
                    Get a custom subdomain with our Premium plan
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                  >
                    Upgrade to Premium
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                >
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Your Portfolio</DialogTitle>
                  <DialogDescription>Export your portfolio as HTML to host it on your own domain.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    <Badge
                      variant="outline"
                      className="mr-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-none"
                    >
                      PRO
                    </Badge>
                    This feature is available with our Premium plan
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                  >
                    Upgrade to Premium
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => router.push("/edit-profile")}
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all"
            >
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-muted/50 p-1 rounded-lg">
            <TabsTrigger
              value="preview"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800 data-[state=active]:shadow-sm"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <Card className="border-none shadow-none">
              <CardContent className="p-0">
                <div className="bg-background rounded-lg overflow-hidden border border-indigo-100 dark:border-indigo-900/50 shadow-lg">
                  {/* Portfolio Preview */}
                  <div className="min-h-screen">
                    {/* Hero Section */}
                    <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30">
                      <div className="absolute inset-0 opacity-5" style={gridPatternStyle}></div>
                      <div className="container max-w-5xl px-4 py-20 flex flex-col md:flex-row items-center gap-8">
                        <Avatar className="w-40 h-40 rounded-full border-4 border-white dark:border-zinc-800 shadow-xl">
                          {portfolioData.profileImageUrl ? (
                            <AvatarImage
                              src={portfolioData.profileImageUrl}
                              alt={portfolioData.name}
                              className="bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30"
                            />
                          ) : null}
                          <AvatarFallback className="bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/30 dark:to-violet-900/30 text-4xl font-bold text-indigo-500/60 dark:text-indigo-400/60">
                            {portfolioData.name ? portfolioData.name.charAt(0) : "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left">
                          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                            {portfolioData.name}
                          </h1>
                          <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">{portfolioData.title}</h2>
                          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                            {portfolioData.github && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={portfolioData.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                      <Github className="h-5 w-5" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>GitHub Profile</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {portfolioData.linkedin && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={portfolioData.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                      <Linkedin className="h-5 w-5" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>LinkedIn Profile</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {portfolioData.dribbble && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={portfolioData.dribbble}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                      <Dribbble className="h-5 w-5" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>Dribbble Profile</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {portfolioData.behance && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={portfolioData.behance}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                      <Behance className="h-5 w-5" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>Behance Profile</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {portfolioData.figma && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={portfolioData.figma}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                      <Figma className="h-5 w-5" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>Figma Profile</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {portfolioData.website && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={portfolioData.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                      <Globe className="h-5 w-5" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>Personal Website</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {portfolioData.email && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <a
                                      href={`mailto:${portfolioData.email}`}
                                      className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                    >
                                      <Mail className="h-5 w-5" />
                                    </a>
                                  </TooltipTrigger>
                                  <TooltipContent>{portfolioData.email}</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {portfolioData.cvData && portfolioData.cvData.provided && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">
                                      <FileText className="h-5 w-5" />
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>View Resume</TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Stats Section */}
                    {(githubStats || designStats) && (
                      <section className="bg-white dark:bg-zinc-900 py-6 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="container max-w-5xl px-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {githubStats && (
                              <>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {githubStats.repos}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Repositories</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {githubStats.stars}
                                  </div>
                                  <div className="text-sm text-muted-foreground">GitHub Stars</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {githubStats.contributions}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Contributions</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {githubStats.followers}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Followers</div>
                                </div>
                              </>
                            )}
                            {designStats && !githubStats && (
                              <>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {designStats.projects}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Design Projects</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {designStats.likes}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Likes</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {designStats.views}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Views</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    {designStats.followers}
                                  </div>
                                  <div className="text-sm text-muted-foreground">Followers</div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </section>
                    )}

                    {/* About Section */}
                    <section className="py-16 bg-white dark:bg-zinc-900">
                      <div className="container max-w-5xl px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                          About Me
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-center">
                          {portfolioData.bio}
                        </p>
                      </div>
                    </section>

                    {/* Projects Section */}
{/* Projects Section */}
<section className="py-16 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30">
  <div className="container max-w-5xl px-4">
    <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
      Projects
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {/* Display projects */}
      {portfolioData.manualProjects.length > 0 ? (
        portfolioData.manualProjects.map((project) => (
          <Card
            key={project.id}
            className="border border-indigo-100 dark:border-indigo-900/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:shadow-lg transition-all"
          >
            <div className="h-48 bg-muted overflow-hidden">
              <div className="w-full h-full bg-slate-900 flex items-center justify-center p-4">
                <div className="flex items-center justify-center flex-col">
                  <Code className="h-12 w-12 text-white/60 mb-2" />
                  <div className="text-sm text-white/80 text-center">Code Project</div>
                </div>
              </div>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{project.name}</CardTitle>
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                  Code
                </Badge>
              </div>
              <CardDescription>{project.description || "No description available"}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies && 
                 project.technologies.filter(tech => tech).map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full">
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-2 text-center py-12">
          <p className="text-muted-foreground">No projects to display</p>
        </div>
      )}
    </div>
  </div>
</section>

                    {/* Skills Section */}
                    <section className="py-16 bg-white dark:bg-zinc-900">
                      <div className="container max-w-5xl px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                          Skills & Expertise
                        </h2>

                        {/* Technical Skills */}
                        {skills.technical && skills.technical.length > 0 && (
                          <div className="mb-12">
                            <div className="flex items-center gap-2 mb-4">
                              <Code className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                              <h3 className="text-xl font-semibold">Technical Skills</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {Array.isArray(skills.technical) &&
                                skills.technical.map((skill, index) => {
                                  const skillName = typeof skill === "string" ? skill : skill.name
                                  const skillLevel = typeof skill === "string" ? 3 : skill.level || 3

                                  return (
                                    <div
                                      key={index}
                                      className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/50 hover:shadow-md transition-all"
                                    >
                                      <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium">{skillName}</h4>
                                        <span className="text-xs text-muted-foreground">
                                          {skillLevel === 5
                                            ? "Expert"
                                            : skillLevel === 4
                                              ? "Advanced"
                                              : skillLevel === 3
                                                ? "Intermediate"
                                                : skillLevel === 2
                                                  ? "Basic"
                                                  : "Beginner"}
                                        </span>
                                      </div>
                                      <div className="h-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
                                          style={{ width: `${(skillLevel / 5) * 100}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        )}

                        {/* Design Skills */}
                        {skills.design && skills.design.length > 0 && (
                          <div className="mb-12">
                            <div className="flex items-center gap-2 mb-4">
                              <Palette className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                              <h3 className="text-xl font-semibold">Design Skills</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {Array.isArray(skills.design) &&
                                skills.design.map((skill, index) => {
                                  const skillName = typeof skill === "string" ? skill : skill.name
                                  const skillLevel = typeof skill === "string" ? 3 : skill.level || 3

                                  return (
                                    <div
                                      key={index}
                                      className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/50 hover:shadow-md transition-all"
                                    >
                                      <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium">{skillName}</h4>
                                        <span className="text-xs text-muted-foreground">
                                          {skillLevel === 5
                                            ? "Expert"
                                            : skillLevel === 4
                                              ? "Advanced"
                                              : skillLevel === 3
                                                ? "Intermediate"
                                                : skillLevel === 2
                                                  ? "Basic"
                                                  : "Beginner"}
                                        </span>
                                      </div>
                                      <div className="h-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                                          style={{ width: `${(skillLevel / 5) * 100}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        )}

                        {/* Soft Skills */}
                        {skills.soft && skills.soft.length > 0 && (
                          <div className="mb-12">
                            <div className="flex items-center gap-2 mb-4">
                              <Users className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                              <h3 className="text-xl font-semibold">Soft Skills</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                              {Array.isArray(skills.soft) &&
                                skills.soft.map((skill, index) => {
                                  const skillName = typeof skill === "string" ? skill : skill.name

                                  return (
                                    <div
                                      key={index}
                                      className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/50 hover:shadow-md transition-all text-center"
                                    >
                                      <div className="h-10 w-10 mx-auto mb-2 flex items-center justify-center">
                                        <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                                          <div className="h-4 w-4 bg-indigo-500 dark:bg-indigo-400 rounded-full"></div>
                                        </div>
                                      </div>
                                      <h4 className="font-medium">{skillName}</h4>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        )}

                        {/* Language Skills */}
                        {skills.language && skills.language.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                              <h3 className="text-xl font-semibold">Languages</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                              {Array.isArray(skills.language) &&
                                skills.language.map((skill, index) => {
                                  const skillName = typeof skill === "string" ? skill : skill.name
                                  const skillLevel = typeof skill === "string" ? 3 : skill.level || 3

                                  return (
                                    <div
                                      key={index}
                                      className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-indigo-100 dark:border-indigo-900/50 hover:shadow-md transition-all"
                                    >
                                      <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium">{skillName}</h4>
                                        <span className="text-xs text-muted-foreground">
                                          {skillLevel === 5
                                            ? "Native"
                                            : skillLevel === 4
                                              ? "Fluent"
                                              : skillLevel === 3
                                                ? "Intermediate"
                                                : skillLevel === 2
                                                  ? "Basic"
                                                  : "Beginner"}
                                        </span>
                                      </div>
                                      <div className="h-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-full overflow-hidden">
                                        <div
                                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                          style={{ width: `${(skillLevel / 5) * 100}%` }}
                                        ></div>
                                      </div>
                                    </div>
                                  )
                                })}
                            </div>
                          </div>
                        )}
                      </div>
                    </section>

                    {/* Experience Section */}
                    <section className="py-16 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30">
                      <div className="container max-w-5xl px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                          Experience
                        </h2>

                        <div className="space-y-8">
                          {/* Timeline representation of experience */}
                          <div className="relative border-l-2 border-indigo-200 dark:border-indigo-800 pl-8 ml-4 space-y-12">
                            {experience.map((exp, index) => (
                              <div key={index} className="relative">
                                {/* Timeline dot */}
                                <div className="absolute -left-[41px] top-0">
                                  <div className="h-8 w-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                                    <div className="h-4 w-4 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                                  </div>
                                </div>

                                {/* Date bubble */}
                                <div className="absolute -left-[160px] top-0 hidden md:block">
                                  <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                                    {exp.duration}
                                  </div>
                                </div>

                                {/* Content card */}
                                <div className="p-6 rounded-lg border border-indigo-100 dark:border-indigo-900/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:shadow-lg transition-all">
                                  <div className="mb-4">
                                    <div className="md:hidden mb-2">
                                      <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                                        {exp.duration}
                                      </span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
                                      {exp.position}
                                    </h3>
                                    <p className="font-medium">{exp.company}</p>
                                    {exp.location && (
                                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                          ></path>
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                          ></path>
                                        </svg>
                                        {exp.location}
                                      </p>
                                    )}
                                  </div>

                                  <p className="text-muted-foreground mb-4">{exp.description}</p>

                                  {/* Achievements */}
                                  {exp.achievements && exp.achievements.length > 0 && (
                                    <div className="mb-4">
                                      <h4 className="text-sm font-medium mb-2">Key Achievements:</h4>
                                      <ul className="space-y-2">
                                        {exp.achievements.map((achievement, idx) => (
                                          <li key={idx} className="flex gap-2 text-sm">
                                            <Award className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                                            <span>{achievement}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  <div className="flex flex-wrap gap-2">
                                    {exp.skills &&
                                      exp.skills.map((skill, skillIndex) => (
                                        <Badge
                                          key={skillIndex}
                                          variant="outline"
                                          className="border-indigo-200 dark:border-indigo-800"
                                        >
                                          {skill}
                                        </Badge>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Education Section */}
                    <section className="py-16 bg-white dark:bg-zinc-900">
                      <div className="container max-w-5xl px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                          Education
                        </h2>

                        <div className="space-y-6">
                          {education.map((edu, index) => (
                            <div
                              key={index}
                              className="flex flex-col md:flex-row gap-6 p-6 rounded-lg border border-indigo-100 dark:border-indigo-900/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm hover:shadow-lg transition-all"
                            >
                              <div className="md:w-1/4">
                                <div className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg flex items-center justify-center mb-4">
                                  <BookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <p className="text-sm text-muted-foreground">{edu.duration}</p>
                              </div>

                              <div className="md:w-3/4">
                                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                                  {edu.degree}
                                </h3>
                                <p className="font-medium mb-1">{edu.institution}</p>
                                {edu.location && (
                                  <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                      ></path>
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                      ></path>
                                    </svg>
                                    {edu.location}
                                  </p>
                                )}
                                {edu.description && <p className="text-muted-foreground">{edu.description}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    {/* Contact Section */}
                    <section className="py-16 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30">
                      <div className="container max-w-5xl px-4">
                        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                          Contact Me
                        </h2>
                        <div className="max-w-md mx-auto text-center">
                          <p className="text-muted-foreground mb-8">
                            Interested in working together or have a project in mind? Feel free to reach out to me
                            through any of the channels below.
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            {portfolioData.email && (
                              <a
                                href={`mailto:${portfolioData.email}`}
                                className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-900/50 hover:shadow-md transition-all"
                              >
                                <Mail className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                                <span className="text-sm font-medium">Email</span>
                              </a>
                            )}

                            {portfolioData.linkedin && (
                              <a
                                href={portfolioData.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-900/50 hover:shadow-md transition-all"
                              >
                                <Linkedin className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                                <span className="text-sm font-medium">LinkedIn</span>
                              </a>
                            )}

                            {portfolioData.github && (
                              <a
                                href={portfolioData.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-900/50 hover:shadow-md transition-all"
                              >
                                <Github className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                                <span className="text-sm font-medium">GitHub</span>
                              </a>
                            )}

                            {portfolioData.website && (
                              <a
                                href={portfolioData.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center p-4 rounded-lg bg-white dark:bg-zinc-900 border border-indigo-100 dark:border-indigo-900/50 hover:shadow-md transition-all"
                              >
                                <Globe className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-2" />
                                <span className="text-sm font-medium">Website</span>
                              </a>
                            )}
                          </div>

                          <Button
                            size="lg"
                            className="w-full sm:w-auto rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all group"
                          >
                            <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />{" "}
                            Get In Touch
                          </Button>
                        </div>
                      </div>
                    </section>

                    {/* Footer */}
                    <footer className="py-8 bg-white dark:bg-zinc-900 border-t border-indigo-100 dark:border-indigo-900/50">
                      <div className="container max-w-5xl px-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          © {currentYear} {portfolioData.name}. All rights reserved.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Created with <span className="text-indigo-500">Portfolio</span>Builder
                        </p>
                      </div>
                    </footer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Portfolio Analytics</CardTitle>
                <CardDescription>Track views and engagement with your portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Badge
                      variant="outline"
                      className="mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-none"
                    >
                      PRO
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2">Analytics Available in Premium</h3>
                    <p className="text-muted-foreground mb-4">
                      Upgrade to our Premium plan to access detailed analytics about your portfolio visitors.
                    </p>
                    <Button
                      variant="outline"
                      className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Portfolio Settings</CardTitle>
                <CardDescription>Customize your portfolio appearance and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Badge
                      variant="outline"
                      className="mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-none"
                    >
                      PRO
                    </Badge>
                    <h3 className="text-xl font-semibold mb-2">Customization Available in Premium</h3>
                    <p className="text-muted-foreground mb-4">
                      Upgrade to our Premium plan to customize your portfolio theme, layout, and sections.
                    </p>
                    <Button
                      variant="outline"
                      className="border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
