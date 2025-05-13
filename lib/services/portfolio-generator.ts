import type { ParsedCV } from "./cv-parser"

type PortfolioData = {
  basicInfo: {
    name: string
    title: string
    bio: string
    email?: string
    phone?: string
    location?: string
  }
  experience: {
    company: string
    position: string
    duration: string
    description: string
    skills?: string[]
  }[]
  education: {
    institution: string
    degree: string
    duration: string
    description?: string
  }[]
  skills: {
    technical: string[]
    design: string[]
    soft: string[]
    languages: string[]
  }
  projects: {
    name: string
    description: string
    technologies: string[]
    projectUrl?: string
    imageUrl?: string
    source?: string
  }[]
  socialLinks: Record<string, string>
}

export async function generatePortfolio(
  cvData: ParsedCV,
  githubData: any = null,
  linkedinData: any = null,
): Promise<PortfolioData> {
  // Initialize portfolio data with defaults
  const portfolioData: PortfolioData = {
    basicInfo: {
      name: "Portfolio Owner",
      title: "Professional",
      bio: "A skilled professional with experience in various domains.",
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
    socialLinks: {},
  }

  // Merge CV data
  if (cvData) {
    // Basic info
    if (cvData.name) portfolioData.basicInfo.name = cvData.name
    if (cvData.title) portfolioData.basicInfo.title = cvData.title
    if (cvData.email) portfolioData.basicInfo.email = cvData.email
    if (cvData.phone) portfolioData.basicInfo.phone = cvData.phone
    if (cvData.location) portfolioData.basicInfo.location = cvData.location
    if (cvData.summary) portfolioData.basicInfo.bio = cvData.summary

    // Experience
    if (cvData.experience && cvData.experience.length > 0) {
      portfolioData.experience = cvData.experience.map((exp) => ({
        company: exp.company,
        position: exp.position,
        duration: exp.duration,
        description: exp.description,
      }))
    }

    // Education
    if (cvData.education && cvData.education.length > 0) {
      portfolioData.education = cvData.education.map((edu) => ({
        institution: edu.institution,
        degree: edu.degree,
        duration: edu.duration,
      }))
    }

    // Projects
    if (cvData.projects && cvData.projects.length > 0) {
      portfolioData.projects = [
        ...portfolioData.projects,
        ...cvData.projects.map((proj) => ({
          name: proj.name,
          description: proj.description,
          technologies: proj.technologies || [],
          source: "cv",
        })),
      ]
    }

    // Skills
    if (cvData.skills && cvData.skills.length > 0) {
      // Categorize skills (simplified)
      const designSkills = ["UI", "UX", "Design", "Figma", "Sketch", "Adobe", "Photoshop", "Illustrator"]
      const softSkills = ["Communication", "Leadership", "Teamwork", "Problem Solving", "Critical Thinking"]
      const languageSkills = ["English", "Spanish", "French", "German", "Chinese", "Japanese"]

      cvData.skills.forEach((skill) => {
        if (designSkills.some((ds) => skill.includes(ds))) {
          portfolioData.skills.design.push(skill)
        } else if (softSkills.some((ss) => skill.includes(ss))) {
          portfolioData.skills.soft.push(skill)
        } else if (languageSkills.some((ls) => skill.includes(ls))) {
          portfolioData.skills.languages.push(skill)
        } else {
          portfolioData.skills.technical.push(skill)
        }
      })
    }
  }

  // Merge GitHub data
  if (githubData) {
    // Update name and bio if not already set from CV
    if (!cvData.name && githubData.name) {
      portfolioData.basicInfo.name = githubData.name
    }

    if ((!cvData.summary || cvData.summary.length < 10) && githubData.bio) {
      portfolioData.basicInfo.bio = githubData.bio
    }

    // Add GitHub repositories as projects
    if (githubData.repositories && githubData.repositories.length > 0) {
      githubData.repositories.forEach((repo: any) => {
        portfolioData.projects.push({
          name: repo.name,
          description: repo.description || `A ${repo.language} project on GitHub`,
          technologies: [repo.language],
          projectUrl: `https://github.com/${githubData.username}/${repo.name}`,
          source: "github",
        })
      })
    }

    // Add GitHub skills
    if (githubData.skills && githubData.skills.length > 0) {
      portfolioData.skills.technical = [...new Set([...portfolioData.skills.technical, ...githubData.skills])]
    }
  }

  // Merge LinkedIn data
  if (linkedinData) {
    // Update name and title if not already set
    if (!cvData.name && linkedinData.name) {
      portfolioData.basicInfo.name = linkedinData.name
    }

    if (!cvData.title && linkedinData.title) {
      portfolioData.basicInfo.title = linkedinData.title
    }

    // Add LinkedIn experience if available
    if (linkedinData.experience && linkedinData.experience.length > 0) {
      linkedinData.experience.forEach((exp: any) => {
        // Check if this experience is already in the portfolio
        const exists = portfolioData.experience.some((e) => e.company === exp.company && e.position === exp.position)

        if (!exists) {
          portfolioData.experience.push({
            company: exp.company,
            position: exp.position,
            duration: exp.duration,
            description: exp.description,
          })
        }
      })
    }

    // Add LinkedIn education if available
    if (linkedinData.education && linkedinData.education.length > 0) {
      linkedinData.education.forEach((edu: any) => {
        // Check if this education is already in the portfolio
        const exists = portfolioData.education.some((e) => e.institution === edu.institution && e.degree === edu.degree)

        if (!exists) {
          portfolioData.education.push({
            institution: edu.institution,
            degree: edu.degree,
            duration: edu.duration,
          })
        }
      })
    }

    // Add LinkedIn skills
    if (linkedinData.skills && linkedinData.skills.length > 0) {
      // Categorize skills (simplified)
      const softSkills = ["Communication", "Leadership", "Teamwork", "Problem Solving", "Critical Thinking"]

      linkedinData.skills.forEach((skill: string) => {
        if (softSkills.includes(skill)) {
          if (!portfolioData.skills.soft.includes(skill)) {
            portfolioData.skills.soft.push(skill)
          }
        } else {
          if (!portfolioData.skills.technical.includes(skill)) {
            portfolioData.skills.technical.push(skill)
          }
        }
      })
    }
  }

  return portfolioData
}
