interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface SearchFilters {
  categories: string[];
  countries: string[];
  states: string[];
  cities: string[];
  foundedYearRange?: [number, number];
  keywords: string[];
}

export default async (request: Request) => {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const { query, availableData } = await request.json();

    if (!query || !availableData) {
      return new Response(
        JSON.stringify({ error: "Missing query or availableData" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Get Gemini API key from Netlify environment
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error('❌ GEMINI_API_KEY not found in environment variables');
      return new Response(
        JSON.stringify({ error: "Gemini API key not configured" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    console.log('🔑 Gemini API key found, proceeding with AI search');
    console.log('📝 Query:', query);
    console.log('📊 Company count:', availableData.companies?.length || 0);

    // Create intelligent prompt with actual company data
    const prompt = `You are an intelligent company search system. Analyze the user query against the actual company database and return appropriate filters.

User Query: "${query}"

Company Database:
${JSON.stringify(availableData.companies, null, 2)}

Available Categories: ${availableData.categories.join(', ')}

INSTRUCTIONS:
1. Analyze the user query against the actual company data (names, descriptions, categories, tags, locations)
2. Return ONLY a valid JSON object with filter criteria
3. Be intelligent about matching:
   - "fintech" should match companies with "Financial Services" category or finance-related descriptions
   - "AI companies" should match companies with AI/ML tags or AI-related descriptions
   - "customer service" should match companies whose descriptions mention customer service/support
   - Location queries should match the exact country/state/city names from the data
4. Use exact values from the database only

Required JSON format:
{
  "categories": [],
  "countries": [],
  "states": [],
  "cities": [],
  "foundedYearRange": null,
  "keywords": []
}

Examples:
Query: "fintech companies" → Look for companies with Financial Services category or finance-related descriptions
Query: "AI companies in India" → Look for AI/ML companies AND filter by country="India"
Query: "customer service automation" → Look for companies whose descriptions mention customer service/support
Query: "companies founded after 2020" → Set foundedYearRange: [2021, 2025]

Return ONLY the JSON filter object, no other text.`;

    console.log('🤖 Sending enhanced prompt to Gemini...');
    
    // Call Gemini API
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    
    const response = await fetch(`${geminiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1000,
        }
      })
    });

    console.log('📡 Gemini response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data: GeminiResponse = await response.json();
    console.log('📦 Raw Gemini response received');
    
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text;

    if (!aiResponse) {
      console.error('❌ No response text from Gemini');
      throw new Error('No response from Gemini API');
    }

    console.log('🤖 AI Response Text:', aiResponse);

    // Parse the JSON response
    let parsedFilters: SearchFilters;
    try {
      // Clean the response - remove any markdown formatting
      const cleanResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      console.log('🧹 Cleaned response:', cleanResponse);
      
      parsedFilters = JSON.parse(cleanResponse);
      console.log('✅ Parsed filters:', JSON.stringify(parsedFilters, null, 2));
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      console.error('❌ Failed to parse:', aiResponse);
      throw new Error(`Failed to parse AI response as JSON: ${parseError}`);
    }

    // Extract available values from the actual company data
    const availableCountries = Array.from(new Set(availableData.companies.map((c: any) => c.country))).sort();
    const availableStates = Array.from(new Set(availableData.companies.map((c: any) => c.state))).sort();
    const availableCities = Array.from(new Set(availableData.companies.map((c: any) => c.city))).sort();

    // Validate the parsed filters against actual data
    const validatedFilters: SearchFilters = {
      categories: validateStringArray(parsedFilters.categories, availableData.categories),
      countries: validateStringArray(parsedFilters.countries, availableCountries),
      states: validateStringArray(parsedFilters.states, availableStates),
      cities: validateStringArray(parsedFilters.cities, availableCities),
      foundedYearRange: parsedFilters.foundedYearRange && Array.isArray(parsedFilters.foundedYearRange) 
        ? [parsedFilters.foundedYearRange[0], parsedFilters.foundedYearRange[1]] 
        : undefined,
      keywords: Array.isArray(parsedFilters.keywords) ? parsedFilters.keywords : []
    };

    console.log('✅ Final validated filters:', JSON.stringify(validatedFilters, null, 2));
    
    return new Response(
      JSON.stringify(validatedFilters),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (error) {
    console.error('💥 Edge function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: "Search failed", 
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};

function validateStringArray(items: any, validItems: string[]): string[] {
  if (!Array.isArray(items)) {
    console.warn('⚠️ Expected array, got:', typeof items, items);
    return [];
  }
  
  const validated = items.filter(item => {
    if (typeof item !== 'string') {
      console.warn('⚠️ Non-string item filtered out:', item);
      return false;
    }
    if (!validItems.includes(item)) {
      console.warn('⚠️ Invalid item filtered out:', item, 'Valid options:', validItems);
      return false;
    }
    return true;
  });
  
  console.log('✅ Validated array:', validated);
  return validated;
}