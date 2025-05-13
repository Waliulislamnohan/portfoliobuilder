import { NextResponse } from "next/server";
import axios from "axios";

// GROQ API configuration
const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

type ExtractedData = {
  basicInfo: {
    name: string;
    title: string;
    bio: string;
    profileImage?: string;
    location?: string;
  };
  projects: {
    name: string;
    description: string;
    technologies: string[];
    projectUrl?: string;
    source: string;
  }[];
  experience: {
    company: string;
    position: string;
    duration: string;
    description: string;
    skills: string[];
  }[];
  skills: {
    technical: string[];
    design: string[];
    soft: string[];
  };
};

export async function POST(req: Request) {
  try {
    const { socialLinks, cvData } = await req.json();

    // Validate input
    if ((!socialLinks || Object.keys(socialLinks).length === 0) && !cvData) {
      return NextResponse.json({ error: "No data sources provided" }, { status: 400 });
    }

    // Prepare the prompt for GROQ
    const messages = [
      {
        role: "system",
        content: `You are an AI assistant that extracts and structures professional profile information from social media links and CV data. Return a well-structured JSON object with the person's professional details.`
      },
      {
        role: "user",
        content: `Extract professional information from these sources:
        Social Links: ${JSON.stringify(socialLinks || {})}
        CV Data: ${cvData ? "Available" : "Not provided"}
        
        Return a JSON object with this structure:
        {
          "basicInfo": {
            "name": "string",
            "title": "string",
            "bio": "string",
            "location": "string (optional)"
          },
          "projects": [{
            "name": "string",
            "description": "string",
            "technologies": ["string"],
            "projectUrl": "string (optional)",
            "source": "string"
          }],
          "experience": [{
            "company": "string",
            "position": "string",
            "duration": "string",
            "description": "string",
            "skills": ["string"]
          }],
          "skills": {
            "technical": ["string"],
            "design": ["string"],
            "soft": ["string"]
          }
        }`
      }
    ];

    // Call GROQ API
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "mixtral-8x7b-32768",
        messages,
        temperature: 0.3,
        max_tokens: 4000,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const content = response.data.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content in GROQ response");
    }

    const jsonData = JSON.parse(content);

    // Validate minimum required fields
    if (!jsonData.basicInfo || !jsonData.basicInfo.name) {
      throw new Error("Missing required fields in GROQ response");
    }

    return NextResponse.json({
      success: true,
      data: jsonData,
      sources: {
        social: socialLinks ? Object.keys(socialLinks).filter((key) => socialLinks[key]) : [],
        cv: !!cvData,
      },
    });

  } catch (error) {
    console.error("Error extracting content:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to extract content",
        message: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}
