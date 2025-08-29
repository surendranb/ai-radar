import { useState, useEffect } from 'react';
import { Company } from '../types/company';

const COMPANIES_URL = '/.netlify/functions/companies-proxy';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CACHE_KEY = 'ai-radar-companies';
const CACHE_TIMESTAMP_KEY = 'ai-radar-companies-timestamp';

// Basic validation to ensure data integrity
function validateCompany(company: any): company is Company {
  return (
    company &&
    typeof company.id === 'string' &&
    typeof company.name === 'string' &&
    typeof company.founded === 'number' &&
    Array.isArray(company.founders) &&
    typeof company.website === 'string' &&
    typeof company.category === 'string' &&
    Array.isArray(company.tags) &&
    typeof company.country === 'string' &&
    typeof company.state === 'string' &&
    typeof company.city === 'string' &&
    typeof company.logoUrl === 'string' &&
    typeof company.description === 'string' &&
    typeof company.linkedinProfile === 'string'
  );
}

// Sanitize strings to prevent XSS
function sanitizeString(str: string): string {
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
}

function sanitizeCompany(company: Company): Company {
  return {
    ...company,
    name: sanitizeString(company.name),
    description: sanitizeString(company.description),
    founders: company.founders.map(sanitizeString),
    website: company.website.startsWith('http') ? company.website : `https://${company.website}`,
    linkedinProfile: company.linkedinProfile.startsWith('http') ? company.linkedinProfile : `https://${company.linkedinProfile}`
  };
}

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        
        if (cachedData && cachedTimestamp) {
          const age = Date.now() - parseInt(cachedTimestamp);
          if (age < CACHE_DURATION) {
            console.log('📦 Using cached company data');
            const parsedData = JSON.parse(cachedData);
            setCompanies(parsedData);
            setLoading(false);
            return;
          }
        }

        console.log('🌐 Fetching fresh company data from GitHub...');
        
        const response = await fetch(COMPANIES_URL, {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch companies: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📊 Raw data received:', data.length, 'companies');
        
        // Validate and sanitize the data
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected array of companies');
        }
        
        const validCompanies = data
          .filter((company, index) => {
            const isValid = validateCompany(company);
            if (!isValid) {
              console.warn(`⚠️ Invalid company data at index ${index}:`, company);
            }
            return isValid;
          })
          .map(sanitizeCompany);
        
        console.log('✅ Validated companies:', validCompanies.length);
        
        // Cache the validated data
        localStorage.setItem(CACHE_KEY, JSON.stringify(validCompanies));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        
        setCompanies(validCompanies);
        
      } catch (err) {
        console.error('❌ Error fetching companies:', err);
        setError(err instanceof Error ? err.message : 'Failed to load companies');
        
        // Try to use cached data as fallback
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          console.log('🔄 Using stale cached data as fallback');
          try {
            const parsedData = JSON.parse(cachedData);
            setCompanies(parsedData);
          } catch (parseError) {
            console.error('❌ Failed to parse cached data:', parseError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, loading, error };
};