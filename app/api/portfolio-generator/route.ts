import { type NextRequest, NextResponse } from "next/server"
import { parsePdfCV, parseDocxCV } from "@/lib/services/cv-parser"
import fetch from "node-fetch"

// Fetch GitHub starred repositories using the GitHub API
async function getGitHubStarredProjects(username: string) {
  const url = `https://api.github.com/users/${username}/starred`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repositories = await response.json();
    return repositories.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      language: repo.language,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching GitHub starred repositories:", error);
    return null;
  }
}

// Fetch LinkedIn connection count using RapidAPI
async function getLinkedInConnectionCount(linkedinUsername: string) {
  const url = `https://linkedin-data-api.p.rapidapi.com/data-connection-count?username=${linkedinUsername}`;


  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
   		'x-rapidapi-key': 'a4a2c03f76msh902d5f9f0015d3ap1944afjsn68fbec4e5c57',
		'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com'
      },
    });

    if (!response.ok) {
      throw new Error(`LinkedIn Connection Count API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.connection || 0; // Return connection count or 0 if unavailable
  } catch (error) {
    console.error("Error fetching LinkedIn connection count via RapidAPI:", error);
    return 0; // Return 0 to continue without connection count
  }
}

// Fetch LinkedIn profile data using RapidAPI
async function getLinkedInProfile(linkedinUrl: string) {
  const url = 'https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile';
  const apiKey = 'a4a2c03f76msh902d5f9f0015d3ap1944afjsn68fbec4e5c57';

  try {
    const response = await fetch(`${url}?linkedin_url=${encodeURIComponent(linkedinUrl)}&include_skills=true&include_certifications=true&include_publications=true&include_honors=true&include_volunteers=true&include_projects=true`, {
      method: "GET",
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'fresh-linkedin-profile-data.p.rapidapi.com',
      },
    });

    if (!response.ok) {
      throw new Error(`LinkedIn API error: ${response.statusText}`);
    }

    const profileData = await response.json();

    // Map the response to a usable format
    return {
      name: profileData.data.full_name,
      headline: profileData.data.headline,
      bio: profileData.data.about,
      profilePicture: profileData.data.profile_image_url || null,
      location: profileData.data.location || null,
      connectionCount: profileData.data.connections_count || 0,
      experience: profileData.data.experiences?.map((exp: any) => ({
        title: exp.title,
        company: exp.company,
        duration: exp.date_range,
        description: exp.description,
        location: exp.location,
      })) || [],
      education: profileData.data.educations?.map((edu: any) => ({
        school: edu.school,
        degree: edu.degree,
        duration: edu.date_range,
        fieldOfStudy: edu.field_of_study,
      })) || [],
      skills: profileData.data.skills?.split('|') || [],
      certifications: profileData.data.certifications?.map((cert: any) => ({
        name: cert.name,
        authority: cert.authority,
        issued: cert.issued,
      })) || [],
      honors: profileData.data.honors_and_awards?.map((honor: any) => ({
        title: honor.title,
        issuer: honor.issuer,
        date: honor.date,
        description: honor.description,
      })) || [],
      publications: profileData.data.publications?.map((pub: any) => ({
        title: pub.title,
        publisher: pub.publisher,
        date: pub.date,
        description: pub.description,
        link: pub.link,
      })) || [],
      volunteers: profileData.data.volunteers?.map((vol: any) => ({
        title: vol.title,
        company: vol.company,
        duration: vol.date_range,
        description: vol.description,
      })) || [],
    };
  } catch (error) {
    console.error("Error fetching LinkedIn profile via RapidAPI:", error);
    return null; // Return null to continue without LinkedIn data
  }
}

import { generatePortfolio } from "@/lib/services/portfolio-generator"

// In-memory storage for user data (for testing purposes)
const userDataStore: Record<string, any> = {};

// Handle GET and POST requests
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Get the CV file
    const cvFile = formData.get("cv") as File | null;

    // Get social links
    const githubUsername = formData.get("github") as string;
    const linkedinUrl = formData.get("linkedin") as string;
    const behanceUrl = formData.get("behance") as string;
    const dribbbleUrl = formData.get("dribbble") as string;

    if (!cvFile && !githubUsername && !linkedinUrl) {
      return NextResponse.json(
        { error: "Please provide a CV file or at least a GitHub/LinkedIn username." },
        { status: 400 }
      );
    }

    // Parse CV if provided
    let cvData = {
      skills: [],
      experience: [],
      education: [],
      projects: [],
    };

    if (cvFile) {
      try {
        const buffer = Buffer.from(await cvFile.arrayBuffer());

        if (cvFile.name.toLowerCase().endsWith(".pdf")) {
          cvData = await parsePdfCV(buffer);
        } else if (cvFile.name.toLowerCase().endsWith(".docx")) {
          cvData = await parseDocxCV(buffer);
        } else {
          return NextResponse.json(
            { error: "Unsupported file format. Please upload a PDF or DOCX file." },
            { status: 400 }
          );
        }
      } catch (error) {
        console.error("Error parsing CV:", error);
        // Continue with empty CV data
      }
    }

    // Get GitHub profile data if username provided
    let githubData = null;
    if (githubUsername) {
      try {
        githubData = await getGitHubStarredProjects(githubUsername);
      } catch (error) {
        console.error("Error fetching GitHub profile:", error);
        // Continue without GitHub data
      }
    }

    // Get LinkedIn profile data if URL provided
    let linkedinData = null;
    if (linkedinUrl) {
      try {
        linkedinData = await getLinkedInProfile(linkedinUrl);
      } catch (error) {
        console.error("Error fetching LinkedIn profile:", error);
        // Continue without LinkedIn data
      }
    }

    // Merge data from CV, GitHub, and LinkedIn
    const portfolioData = {
      basicInfo: {
        name: linkedinData?.name || cvData.basicInfo?.name || "Unknown User",
        title: linkedinData?.headline || "Professional",
        bio: linkedinData?.bio || cvData.basicInfo?.bio || "A skilled professional with experience in various domains.",
        profileImageUrl: linkedinData?.profilePicture || null,
        location: linkedinData?.location || null,
      },
      experience: [
        ...(linkedinData?.experience || []),
        ...(cvData.experience || []),
      ],
      education: [
        ...(linkedinData?.education || []),
        ...(cvData.education || []),
      ],
      skills: {
        technical: [
          ...(linkedinData?.skills || []),
          ...(githubData?.map((repo) => repo.language).filter(Boolean) || []),
          ...(cvData.skills || []),
        ],
        design: linkedinData?.skills?.filter(skill => skill.toLowerCase().includes("design")) || [],
        soft: linkedinData?.skills?.filter(skill => skill.toLowerCase().includes("soft")) || [],
        languages: linkedinData?.skills?.filter(skill => skill.toLowerCase().includes("language")) || [],
      },
      projects: [
        ...(githubData?.map((repo) => ({
          name: repo.name,
          description: repo.description,
          technologies: [repo.language],
          projectUrl: repo.html_url,
          starCount: repo.stargazers_count,
          forkCount: repo.forks_count,
          lastUpdated: repo.updated_at,
          source: "github",
        })) || []),
        ...(linkedinData?.projects || []),
        ...(cvData.projects || []),
      ],
      socialLinks: {
        github: githubUsername ? `https://github.com/${githubUsername}` : undefined,
        linkedin: linkedinUrl || undefined,
        behance: behanceUrl || undefined,
        dribbble: dribbbleUrl || undefined,
      },
    };

    // Save the portfolio data to the in-memory store
    const userId = githubUsername || linkedinUrl || "anonymous";
    userDataStore[userId] = portfolioData;

    // Ensure all extracted data is included in the response
    return NextResponse.json({
      success: true,
      data: portfolioData,
    });
  } catch (error) {
    console.error("Error generating portfolio:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate portfolio",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId || !userDataStore[userId]) {
      return NextResponse.json(
        { error: "User data not found. Please generate your portfolio first." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userDataStore[userId],
    });
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch portfolio data",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}