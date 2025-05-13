import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { userData, extractedContent } = await req.json()

    // Validate input
    if (!userData || !extractedContent) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    // Generate a unique subdomain for the portfolio
    const subdomain = generateSubdomain(userData.name || extractedContent.basicInfo.name)

    // In a real application, you would:
    // 1. Store the portfolio data in a database
    // 2. Generate the actual portfolio pages
    // 3. Set up the subdomain if the user is on a paid plan

    // For this demo, we'll just return a success response with the portfolio data
    return NextResponse.json({
      success: true,
      portfolio: {
        id: generateUniqueId(),
        subdomain,
        userData,
        content: extractedContent,
        createdAt: new Date().toISOString(),
        status: "active",
        isPremium: false,
      },
    })
  } catch (error) {
    console.error("Error generating portfolio:", error)
    return NextResponse.json({ error: "Failed to generate portfolio" }, { status: 500 })
  }
}

function generateSubdomain(name: string): string {
  // Convert name to lowercase, replace spaces with hyphens, and remove special characters
  const baseSubdomain = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")

  // Add a random suffix to ensure uniqueness
  const randomSuffix = Math.floor(Math.random() * 10000)

  return `${baseSubdomain}-${randomSuffix}`
}

function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
