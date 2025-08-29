interface SearchFilters {
  categories: string[];
  countries: string[];
  states: string[];
  cities: string[];
  foundedYearRange?: [number, number];
  keywords: string[];
}

class GeminiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/.netlify/functions/gemini-search';
    console.log('🔧 GeminiService initialized with baseUrl:', this.baseUrl);
  }

  async parseSearchQuery(query: string, availableData: {
    categories: string[];
    locations: string[];
    companies: any[];
  }): Promise<SearchFilters> {
    console.log('🔍 Starting AI search with query:', query);
    console.log('📊 Available data:', JSON.stringify(availableData, null, 2));
    
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          availableData
        })
      });

      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Edge function error:', response.status, errorText);
        throw new Error(`Edge function error: ${response.status} - ${errorText}`);
      }

      const filters = await response.json();
      console.log('✅ AI filters received:', JSON.stringify(filters, null, 2));
      
      // Validate the response structure
      if (!filters || typeof filters !== 'object') {
        throw new Error('Invalid response format from AI');
      }

      return {
        categories: Array.isArray(filters.categories) ? filters.categories : [],
        countries: Array.isArray(filters.countries) ? filters.countries : [],
        states: Array.isArray(filters.states) ? filters.states : [],
        cities: Array.isArray(filters.cities) ? filters.cities : [],
        foundedYearRange: filters.foundedYearRange,
        keywords: Array.isArray(filters.keywords) ? filters.keywords : []
      };
    } catch (error) {
      console.error('💥 Gemini service error:', error);
      throw error; // Re-throw the error instead of falling back
    }
  }
}

export const geminiService = new GeminiService();