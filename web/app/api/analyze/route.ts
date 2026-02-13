import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { error } = await request.json()

    if (!error) {
      return NextResponse.json(
        { error: 'No error message provided' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    // Call Gemini API (using gemini-2.5-flash - latest stable model)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a debugging assistant. Analyze the following error and respond ONLY with valid JSON (no markdown, no code blocks, just raw JSON).

Error to analyze:
${error}

Respond with this exact JSON structure:
{
  "explanation": "A clear, plain English explanation of what's causing this error and why it happens",
  "solutions": [
    "First step to fix the issue",
    "Second step to fix the issue",
    "Third step to fix the issue"
  ],
  "fix": {
    "code": "A complete code snippet that fixes the issue",
    "pros": ["Advantage 1 of this fix", "Advantage 2 of this fix"],
    "cons": ["Potential drawback 1", "Potential drawback 2"]
  }
}

Remember: Respond ONLY with the JSON object, nothing else.`
            }]
          }]
        })
      }
    )

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Gemini API error:', errorData)
      return NextResponse.json(
        { error: 'Gemini API request failed' },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Gemini response:', JSON.stringify(data, null, 2))
    
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    
    if (!text) {
      console.error('No text in response:', data)
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      )
    }

    console.log('AI text response:', text)
    
    // Try to parse JSON from response
    try {
      // Remove markdown code blocks if present
      let cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      
      // Try to find JSON object
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        return NextResponse.json({
          id: Date.now(),
          explanation: parsed.explanation || 'No explanation provided',
          solutions: parsed.solutions || [],
          fix: parsed.fix || null
        })
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
    }

    // Fallback: return raw text as explanation
    return NextResponse.json({
      id: Date.now(),
      explanation: text,
      solutions: ['Check the error message above for details'],
      fix: null
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze error' },
      { status: 500 }
    )
  }
}
