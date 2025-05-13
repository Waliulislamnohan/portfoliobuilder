"use client"

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  Dribbble,
  DribbbleIcon as Behance,
  Figma,
  Globe,
  Mail,
  Code,
  Palette,
  Users,
  BookOpen,
  Award,
} from "lucide-react";

export default function PortfolioSlugPage() {
  const { slug } = useParams();
  const [portfolioData, setPortfolioData] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && slug) {
      const data = localStorage.getItem(`portfolioData:${slug}`);
      if (data) {
        setPortfolioData(JSON.parse(data));
      }
    }
  }, [slug]);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Portfolio Not Found</h2>
          <p className="text-muted-foreground">No portfolio data found for this link.</p>
        </div>
      </div>
    );
  }

  // Helper for skills
  const getSkills = () => {
    if (portfolioData.extractedData?.skills) {
      const skills = portfolioData.extractedData.skills;
      return {
        technical: skills.technical || [],
        design: skills.design || [],
        soft: skills.soft || [],
        language: skills.language || [],
      };
    }
    return { technical: [], design: [], soft: [], language: [] };
  };

  const skills = getSkills();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* No navbar or navigation elements in this shared slug page */}
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-950/30 dark:to-violet-950/30">
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
                <a href={portfolioData.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                </a>
              )}
              {portfolioData.linkedin && (
                <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                </a>
              )}
              {portfolioData.dribbble && (
                <a href={portfolioData.dribbble} target="_blank" rel="noopener noreferrer">
                  <Dribbble className="h-5 w-5 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                </a>
              )}
              {portfolioData.behance && (
                <a href={portfolioData.behance} target="_blank" rel="noopener noreferrer">
                  <Behance className="h-5 w-5 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                </a>
              )}
              {portfolioData.figma && (
                <a href={portfolioData.figma} target="_blank" rel="noopener noreferrer">
                  <Figma className="h-5 w-5 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                </a>
              )}
              {portfolioData.website && (
                <a href={portfolioData.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-5 w-5 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                </a>
              )}
              {portfolioData.email && (
                <a href={`mailto:${portfolioData.email}`}>
                  <Mail className="h-5 w-5 text-muted-foreground hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

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
      <section className="py-16 bg-gradient-to-r from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/30">
        <div className="container max-w-5xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {portfolioData.manualProjects && portfolioData.manualProjects.length > 0 ? (
              portfolioData.manualProjects.map((project: any) => (
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
                        project.technologies.filter((tech: string) => tech).map((tech: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                          >
                            {tech}
                          </Badge>
                        ))}
                    </div>
                    {project.projectUrl && (
                      <Button asChild variant="outline" className="w-full">
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          View Project
                        </a>
                      </Button>
                    )}
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
                {skills.technical.map((skill: any, index: number) => {
                  const skillName = typeof skill === "string" ? skill : skill.name;
                  const skillLevel = typeof skill === "string" ? 3 : skill.level || 3;
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
                  );
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
                {skills.design.map((skill: any, index: number) => {
                  const skillName = typeof skill === "string" ? skill : skill.name;
                  const skillLevel = typeof skill === "string" ? 3 : skill.level || 3;
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
                  );
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
                {skills.soft.map((skill: any, index: number) => {
                  const skillName = typeof skill === "string" ? skill : skill.name;
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
                  );
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
                {skills.language.map((skill: any, index: number) => {
                  const skillName = typeof skill === "string" ? skill : skill.name;
                  const skillLevel = typeof skill === "string" ? 3 : skill.level || 3;
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
                  );
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
            <div className="relative border-l-2 border-indigo-200 dark:border-indigo-800 pl-8 ml-4 space-y-12">
              {portfolioData.extractedData?.experience?.map((exp: any, index: number) => (
                <div key={index} className="relative">
                  <div className="absolute -left-[41px] top-0">
                    <div className="h-8 w-8 rounded-full bg-white dark:bg-zinc-900 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center">
                      <div className="h-4 w-4 rounded-full bg-indigo-600 dark:bg-indigo-400"></div>
                    </div>
                  </div>
                  <div className="absolute -left-[160px] top-0 hidden md:block">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                      {exp.duration}
                    </div>
                  </div>
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
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement: string, idx: number) => (
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
                        exp.skills.map((skill: string, skillIndex: number) => (
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
            {portfolioData.extractedData?.education?.map((edu: any, index: number) => (
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
  );
}
