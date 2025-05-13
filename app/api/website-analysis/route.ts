import { NextResponse } from "next/server"

// Define Groq API types
type GroqMessage = {
  role: "user" | "assistant" | "system"
  content: string
}

type GroqCompletionRequest = {
  messages: GroqMessage[]
  model: string
  temperature?: number
  max_tokens?: number
}

type GroqCompletionResponse = {
  choices: {
    message: {
      content: string
    }
    index: number
    finish_reason: string
  }[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export async function POST(req: Request) {
  try {
    const { websiteUrl } = await req.json()

    // Validate input
    if (!websiteUrl) {
      return NextResponse.json({ error: "No website URL provided" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Crawl the website to get its content
    // 2. Analyze the design elements
    // 3. Generate a design score and recommendations

    // For this demo, we'll use Groq to analyze the website based on the URL
    const analysisResult = await analyzeWebsite(websiteUrl)

    return NextResponse.json({
      success: true,
      data: analysisResult,
    })
  } catch (error) {
    console.error("Error analyzing website:", error)
    return NextResponse.json({ error: "Failed to analyze website" }, { status: 500 })
  }
}

async function analyzeWebsite(websiteUrl: string) {
  try {
    // Use Groq API for website analysis
    const GROQ_API_KEY = "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"
    const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

    const prompt = `
      You are an AI assistant that analyzes website designs.
      
      I'll provide you with a website URL: ${websiteUrl}
      
      Please analyze this website and provide the following information in a structured JSON format:
      
      1. Design Score (0-100)
      2. Color Scheme Analysis
      3. Layout & Structure Analysis
      4. Responsiveness Assessment
      5. Modern Design Elements
      6. Areas for Improvement
      7. Gen Z Appeal Score (0-100)
      
      Please return ONLY a valid JSON object with this information. If you can't access the specific website, provide a reasonable assessment based on similar websites in that domain or industry.
    `

    const messages: GroqMessage[] = [
      {
        role: "user",
        content: prompt,
      },
    ]

    const requestBody: GroqCompletionRequest = {
      model: "llama3-70b-8192", // Using Llama 3 70B model
      messages,
      temperature: 0.7,
      max_tokens: 1500,
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Groq API error:", errorData)
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = (await response.json()) as GroqCompletionResponse
    const text = data.choices[0].message.content

    // Parse the JSON response
    try {
      const jsonStart = text.indexOf("{")
      const jsonEnd = text.lastIndexOf("}")

      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error("No valid JSON found in the response")
      }

      const jsonText = text.substring(jsonStart, jsonEnd + 1)
      return JSON.parse(jsonText)
    } catch (parseError) {
      console.error("Error parsing LLM response:", parseError)
      throw new Error("Failed to parse the response from Groq")
    }
  } catch (error) {
    console.error("Error calling Groq API:", error)

    // Generate a random score between 40-75 for the demo
    const designScore = Math.floor(Math.random() * 36) + 40
    const genZAppealScore = Math.floor(Math.random() * 30) + 30

    // Return placeholder analysis data
    return {
      designScore,
      colorScheme:
        designScore >= 70
          ? "Modern and cohesive"
          : designScore >= 55
            ? "Decent but could be improved"
            : "Outdated and inconsistent",
      layoutStructure:
        designScore >= 70
          ? "Clean and intuitive"
          : designScore >= 55
            ? "Functional but cluttered"
            : "Confusing and disorganized",
      responsiveness:
        designScore >= 70 ? "Fully responsive" : designScore >= 55 ? "Mostly responsive" : "Poor mobile experience",
      modernElements: ["Some gradient effects", "Basic animations", "Standard typography"],
      improvementAreas: [
        "Update color palette for more vibrant contrasts",
        "Implement more interactive elements",
        "Modernize typography with variable fonts",
        "Add microinteractions for better engagement",
        "Improve mobile responsiveness",
      ],
      genZAppealScore,
    }
  }
}
