import { useState } from 'react';
import { geminiService } from '../services/geminiService';
import type { SearchFilters } from '../types/company';

export function useGeminiSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const searchWithAI = async (
    query: string,
    availableData: {
      categories: string[];
      locations: string[];
      companies: any[];
    }
  ): Promise<SearchFilters | null> => {
    console.log('🔧 useGeminiSearch hook called with:', query);
    console.log('🔍 Starting AI search with query:', query);
    console.log('📊 Available data:', availableData);

    setIsSearching(true);
    setSearchError(null);

    try {
      const filters = await geminiService.parseSearchQuery(query, availableData);
      console.log('🔧 Hook received filters:', JSON.stringify(filters, null, 2));
      setIsSearching(false);
      setSearchError(null);
      console.log('🔧 Hook search completed');
      return filters;
    } catch (error) {
      console.error('🚨 Hook search error:', error);
      setIsSearching(false);
      setSearchError(error instanceof Error ? error.message : 'Search failed');
      return null;
    }
  };

  return {
    searchWithAI,
    isSearching,
    searchError
  };
}