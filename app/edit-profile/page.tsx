"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

type Skill = {
  id: number
  name: string
  level: number
  category: "technical" | "design" | "soft" | "language"
}

type Experience = {
  id: number
  company: string
  position: string
  duration: string
  description: string
  isEditing?: boolean
  tempData?: Partial<Experience>
}

type Education = {
  id: number
  institution: string
  degree: string
  duration: string
  description: string
  isEditing?: boolean
  tempData?: Partial<Education>
}

type Project = {
  id: number
  name: string
  description: string
  technologies: string[]
  projectUrl?: string
}

type ProfileData = {
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
  skills: {
    technical: string[]
    design: string[]
    soft: string[]
    language: string[]
  }
  experience: Experience[]
  education: Education[]
  manualProjects: Project[]
}

export default function EditProfile() {
  const router = useRouter()
  const [profileData, setProfileData] = useState<ProfileData>({
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
    skills: {
      technical: [],
      design: [],
      soft: [],
      language: [],
    },
    experience: [],
    education: [],
    manualProjects: [],
  })

  const [editingSkill, setEditingSkill] = useState<{ category: keyof ProfileData["skills"]; index: number; skill: string } | null>(null)
  const [newSkill, setNewSkill] = useState<{ category: keyof ProfileData["skills"]; skill: string }>({
    category: "technical",
    skill: "",
  })

  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id' | 'isEditing' | 'tempData'>>({
    company: "",
    position: "",
    duration: "",
    description: "",
  })

  const [newEducation, setNewEducation] = useState<Omit<Education, 'id' | 'isEditing' | 'tempData'>>({
    institution: "",
    degree: "",
    duration: "",
    description: "",
  })

  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      setProfileData({
        ...parsedData,
        skills: parsedData.skills || { technical: [], design: [], soft: [], language: [] },
        experience: parsedData.experience || [],
        education: parsedData.education || [],
      })
    }
  }, [])

  // Skill handlers (unchanged)
  const handleSkillAdd = () => {
    if (!newSkill.skill.trim()) return
    setProfileData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [newSkill.category]: [...(prev.skills[newSkill.category] || []), newSkill.skill],
      },
    }))
    setNewSkill({ category: "technical", skill: "" })
  }

  const handleSkillEdit = () => {
    if (editingSkill) {
      setProfileData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [editingSkill.category]: prev.skills[editingSkill.category]?.map((skill, index) =>
            index === editingSkill.index ? editingSkill.skill : skill
          ) || [],
        },
      }))
      setEditingSkill(null)
    }
  }

  const handleSkillRemove = (category: keyof ProfileData["skills"], index: number) => {
    setProfileData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category]?.filter((_, i) => i !== index) || [],
      },
    }))
  }

  // Experience handlers (new pattern)
  const handleExperienceAdd = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      setProfileData(prev => ({
        ...prev,
        experience: [...prev.experience, { 
          ...newExperience, 
          id: Date.now(),
          isEditing: false
        }],
      }))
      setNewExperience({
        company: "",
        position: "",
        duration: "",
        description: "",
      })
    }
  }

  const toggleExperienceEdit = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id 
          ? { ...exp, isEditing: !exp.isEditing, tempData: exp.isEditing ? undefined : {...exp} }
          : exp
      )
    }))
  }

  const handleExperienceUpdate = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id 
          ? { ...exp.tempData!, isEditing: false, tempData: undefined }
          : exp
      )
    }))
  }

  const handleExperienceRemove = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id),
    }))
  }

  // Education handlers (new pattern)
  const handleEducationAdd = () => {
    if (newEducation.institution.trim() && newEducation.degree.trim()) {
      setProfileData(prev => ({
        ...prev,
        education: [...prev.education, { 
          ...newEducation, 
          id: Date.now(),
          isEditing: false
        }],
      }))
      setNewEducation({
        institution: "",
        degree: "",
        duration: "",
        description: "",
      })
    }
  }

  const toggleEducationEdit = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id 
          ? { ...edu, isEditing: !edu.isEditing, tempData: edu.isEditing ? undefined : {...edu} }
          : edu
      )
    }))
  }

  const handleEducationUpdate = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id 
          ? { ...edu.tempData!, isEditing: false, tempData: undefined }
          : edu
      )
    }))
  }

  const handleEducationRemove = (id: number) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }))
  }

  const handleSave = () => {
    localStorage.setItem("portfolioData", JSON.stringify(profileData))
    router.push("/portfolio/preview")
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
      <Card className="w-full max-w-4xl border border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Basic Info Section (unchanged) */}
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={profileData.title}
                onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                placeholder="Frontend Developer"
              />
            </div>
            <div>
              <Label htmlFor="bio">Short Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Write a short bio..."
              />
            </div>

            {/* Skills Section (unchanged) */}
            <Accordion type="single" collapsible>
              <AccordionItem value="skills">
                <AccordionTrigger>Skills</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    {(["technical", "design", "soft", "language"] as (keyof ProfileData["skills"])[]).map((category) => (
                      <div key={category} className="space-y-4">
                        <h3 className="text-lg font-semibold capitalize">{category} Skills</h3>
                        <div className="space-y-2">
                          {profileData.skills[category]?.map((skill, index) => (
                            <div key={`${category}-${index}`} className="flex justify-between items-center">
                              {editingSkill?.category === category && editingSkill.index === index ? (
                                <div className="flex gap-2 w-full">
                                  <Input
                                    value={editingSkill.skill}
                                    onChange={(e) =>
                                      setEditingSkill({ ...editingSkill, skill: e.target.value })
                                    }
                                    className="flex-1"
                                  />
                                  <Button
                                    size="sm"
                                    onClick={handleSkillEdit}
                                    className="bg-indigo-500 text-white"
                                  >
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => setEditingSkill(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex justify-between items-center w-full">
                                  <span>{skill}</span>
                                  <div className="flex gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        setEditingSkill({ category, index, skill })
                                      }
                                      className="bg-indigo-500 text-white"
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() => handleSkillRemove(category, index)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Input
                            placeholder={`Add a ${category} skill`}
                            value={newSkill.category === category ? newSkill.skill : ""}
                            onChange={(e) =>
                              setNewSkill({ category, skill: e.target.value })
                            }
                          />
                          <Button onClick={handleSkillAdd}>Add</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Experience Section (new pattern) */}
            <Accordion type="single" collapsible>
              <AccordionItem value="experience">
                <AccordionTrigger>Experience</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Add Experience</h3>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Company Name"
                        value={newExperience.company}
                        onChange={(e) => setNewExperience({...newExperience, company: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Position</Label>
                      <Input
                        id="position"
                        name="position"
                        placeholder="Software Engineer"
                        value={newExperience.position}
                        onChange={(e) => setNewExperience({...newExperience, position: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        name="duration"
                        placeholder="Jan 2020 - Present"
                        value={newExperience.duration}
                        onChange={(e) => setNewExperience({...newExperience, duration: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your role and responsibilities"
                        value={newExperience.description}
                        onChange={(e) => setNewExperience({...newExperience, description: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleExperienceAdd}>Add Experience</Button>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">Existing Experience</h3>
                    {profileData.experience.length === 0 ? (
                      <p className="text-sm text-zinc-500">No experience added yet</p>
                    ) : (
                      profileData.experience.map((exp) => (
                        <div key={`exp-${exp.id}`} className="border rounded-lg p-4">
                          {exp.isEditing ? (
                            <div className="space-y-2">
                              <Input
                                value={exp.tempData?.company || exp.company}
                                onChange={(e) => setProfileData(prev => ({
                                  ...prev,
                                  experience: prev.experience.map(e => 
                                    e.id === exp.id 
                                      ? {...e, tempData: {...e.tempData, company: e.target.value}}
                                      : e
                                  )
                                }))}
                                placeholder="Company Name"
                              />
                              <Input
                                value={exp.tempData?.position || exp.position}
                                onChange={(e) => setProfileData(prev => ({
                                  ...prev,
                                  experience: prev.experience.map(e => 
                                    e.id === exp.id 
                                      ? {...e, tempData: {...e.tempData, position: e.target.value}}
                                      : e
                                  )
                                }))}
                                placeholder="Position"
                              />
                              <div className="flex gap-2">
                                <Button onClick={() => handleExperienceUpdate(exp.id)}>
                                  Save
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={() => toggleExperienceEdit(exp.id)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{exp.position}</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{exp.company}</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500">{exp.duration}</p>
                                {exp.description && (
                                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{exp.description}</p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm"
                                  onClick={() => toggleExperienceEdit(exp.id)}
                                  variant="outline"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleExperienceRemove(exp.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Education Section (new pattern) */}
            <Accordion type="single" collapsible>
              <AccordionItem value="education">
                <AccordionTrigger>Education</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Add Education</h3>
                    <div className="space-y-2">
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        name="institution"
                        placeholder="University Name"
                        value={newEducation.institution}
                        onChange={(e) => setNewEducation({...newEducation, institution: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="degree">Degree</Label>
                      <Input
                        id="degree"
                        name="degree"
                        placeholder="Bachelor's in Computer Science"
                        value={newEducation.degree}
                        onChange={(e) => setNewEducation({...newEducation, degree: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        name="duration"
                        placeholder="2015 - 2019"
                        value={newEducation.duration}
                        onChange={(e) => setNewEducation({...newEducation, duration: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your studies and achievements"
                        value={newEducation.description}
                        onChange={(e) => setNewEducation({...newEducation, description: e.target.value})}
                      />
                    </div>
                    <Button onClick={handleEducationAdd}>Add Education</Button>
                  </div>

                  <div className="space-y-4 mt-6">
                    <h3 className="text-lg font-semibold">Existing Education</h3>
                    {profileData.education.length === 0 ? (
                      <p className="text-sm text-zinc-500">No education added yet</p>
                    ) : (
                      profileData.education.map((edu) => (
                        <div key={`edu-${edu.id}`} className="border rounded-lg p-4">
                          {edu.isEditing ? (
                            <div className="space-y-2">
                              <Input
                                value={edu.tempData?.institution || edu.institution}
                                onChange={(e) => setProfileData(prev => ({
                                  ...prev,
                                  education: prev.education.map(e => 
                                    e.id === edu.id 
                                      ? {...e, tempData: {...e.tempData, institution: e.target.value}}
                                      : e
                                  )
                                }))}
                                placeholder="Institution"
                              />
                              <Input
                                value={edu.tempData?.degree || edu.degree}
                                onChange={(e) => setProfileData(prev => ({
                                  ...prev,
                                  education: prev.education.map(e => 
                                    e.id === edu.id 
                                      ? {...e, tempData: {...e.tempData, degree: e.target.value}}
                                      : e
                                  )
                                }))}
                                placeholder="Degree"
                              />
                              <div className="flex gap-2">
                                <Button onClick={() => handleEducationUpdate(edu.id)}>
                                  Save
                                </Button>
                                <Button
                                  variant="secondary"
                                  onClick={() => toggleEducationEdit(edu.id)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{edu.degree}</h4>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{edu.institution}</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-500">{edu.duration}</p>
                                {edu.description && (
                                  <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">{edu.description}</p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm"
                                  onClick={() => toggleEducationEdit(edu.id)}
                                  variant="outline"
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => handleEducationRemove(edu.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="secondary" onClick={() => router.push("/portfolio/preview")}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}