import React, { useState, useMemo, useEffect } from 'react';
import { Send, Filter, Zap } from 'lucide-react';
import { Company } from '../types/company';
import CompanyCard from './CompanyCard';
import FilterSidebar from './FilterModal';
import CompanySidebar from './CompanySidebar';

interface UnifiedViewProps {
  companies: Company[];
}

const UnifiedView: React.FC<UnifiedViewProps> = ({ companies }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [foundedYearRange, setFoundedYearRange] = useState<[number, number]>([2010, 2025]);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAIQuery = () => {
    if (!chatInput.trim()) return;
    setIsTyping(true);
    
    setTimeout(() => {
      const lowerQuery = chatInput.toLowerCase();
      
      setSelectedCategories([]);
      setSelectedCountries([]);
      setSelectedStates([]);

      if (lowerQuery.includes('financial') || lowerQuery.includes('fintech')) {
        setSelectedCategories(['Financial Services']);
      } else if (lowerQuery.includes('healthcare') || lowerQuery.includes('health')) {
        setSelectedCategories(['Healthcare']);
      } else if (lowerQuery.includes('edtech') || lowerQuery.includes('education')) {
        setSelectedCategories(['EdTech']);
      } else if (lowerQuery.includes('cybersecurity') || lowerQuery.includes('security')) {
        setSelectedCategories(['Cybersecurity']);
      } else if (lowerQuery.includes('ai') || lowerQuery.includes('ml') || lowerQuery.includes('artificial intelligence')) {
        setSelectedCategories(['AI/ML']);
      } else if (lowerQuery.includes('compliance') || lowerQuery.includes('analytics')) {
        setSelectedCategories(['Compliance & Analytics']);
      }

      setChatInput('');
      setIsTyping(false);
    }, 1500);
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const matchesCategory = selectedCategories.length === 0 ||
                             selectedCategories.some(selectedCat =>
                               company.category.toLowerCase().includes(selectedCat.toLowerCase()) ||
                               company.tags.some(tag => tag.toLowerCase().includes(selectedCat.toLowerCase()))
                             );
      
      const matchesCountry = selectedCountries.length === 0 || 
                            selectedCountries.includes(company.country);
      
      const matchesState = selectedStates.length === 0 || 
                          selectedStates.includes(company.state);
      
      const matchesFoundedYear = company.founded >= foundedYearRange[0] && 
                                company.founded <= foundedYearRange[1];
      
      return matchesCategory && matchesCountry && matchesState && matchesFoundedYear;
    });
  }, [companies, selectedCategories, selectedCountries, selectedStates, foundedYearRange]);

  const categories = useMemo(() => 
    Array.from(new Set(companies.flatMap(c => [c.category, ...c.tags]))).sort(), [companies]
  );

  const countries = useMemo(() => 
    Array.from(new Set(companies.map(c => c.country))).sort(), [companies]
  );
  
  const states = useMemo(() => 
    Array.from(new Set(companies.map(c => c.state))).sort(), [companies]
  );

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedCompany(null), 300); // Wait for animation
  };

  const activeFiltersCount = selectedCategories.length + selectedCountries.length + selectedStates.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Sophisticated Background System */}
      <div className="fixed inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-600 via-blue-700 to-purple-900"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 via-blue-600/5 to-purple-700/10"></div>
        
        {/* Animated mesh gradient - much more subtle */}
        <div 
          className="absolute w-[800px] h-[800px] opacity-5 transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.05) 35%, rgba(147, 51, 234, 0.03) 70%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        ></div>
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Ambient light spots */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20">
        {/* Refined Hero Section */}
        <div className="text-center mb-16">
          {/* Filter moved to top right */}
          <div className="absolute top-6 right-6">
            <button
              onClick={() => setShowFilterSidebar(true)}
              className={`group relative px-4 py-2.5 rounded-xl border transition-all duration-500 backdrop-blur-sm ${
                activeFiltersCount > 0
                  ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-300 shadow-lg shadow-emerald-500/20' 
                  : 'bg-gray-800/40 border-gray-600/40 text-gray-300 hover:border-gray-500/60 hover:bg-gray-800/60'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium text-sm">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-black text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/30 to-cyan-500/30 rounded-xl blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
              )}
            </button>
          </div>

          {/* Sophisticated Typography */}
          <h1 className="text-6xl md:text-7xl font-black mb-12 leading-[0.9] tracking-tight">
            <span className="text-white">AI </span>
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Radar
              </span>
            </span>
          </h1>

          {/* Premium AI Interface */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="group relative transform hover:scale-[1.01] transition-transform duration-300">
              {/* Sophisticated glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/40 via-cyan-400/30 to-purple-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              
              {/* Glass morphism container */}
              <div className="relative backdrop-blur-xl bg-gray-800/60 border border-gray-700/60 rounded-2xl p-8 shadow-2xl group-hover:border-gray-600/70 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAIQuery())}
                      placeholder="Ask me anything... 'Show me financial services companies' or 'Find companies in India'"
                      className="w-full bg-transparent text-white placeholder-gray-400 text-xl resize-none focus:outline-none h-16 leading-relaxed font-light transition-all duration-200 focus:placeholder-gray-500"
                      rows={2}
                    />
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="absolute bottom-2 left-0 flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce shadow-lg shadow-emerald-400/50"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce shadow-lg shadow-cyan-400/50" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce shadow-lg shadow-purple-400/50" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-gray-400 font-light">Neural processing...</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Premium send button */}
                  <button
                    onClick={handleAIQuery}
                    disabled={!chatInput.trim() || isTyping}
                    className="relative group/btn w-14 h-14 rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110 active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-600 opacity-90 group-hover/btn:opacity-100 transition-opacity shadow-lg shadow-emerald-500/30"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"></div>
                    <div className="relative flex items-center justify-center h-full">
                      <Send className="h-5 w-5 text-white group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-transform duration-200" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 to-cyan-500/50 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        {(selectedCategories.length > 0 || selectedCountries.length > 0 || selectedStates.length > 0) && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-800/40 border border-gray-600/40 backdrop-blur-sm animate-fade-in">
              <Zap className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="text-gray-300 font-light">
                Found <span className="text-emerald-400 font-semibold animate-pulse">{filteredCompanies.length}</span> companies
              </span>
            </div>
          </div>
        )}

        {/* Company Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company, index) => (
            <div
              key={company.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CompanyCard 
                company={company} 
                onCompanySelect={handleCompanySelect}
              />
            </div>
          ))}
        </div>

        {/* Filter Sidebar */}
        <FilterSidebar
          isOpen={showFilterSidebar}
          onClose={() => setShowFilterSidebar(false)}
          categories={categories}
          countries={countries}
          states={states}
          selectedCategories={selectedCategories}
          selectedCountries={selectedCountries}
          selectedStates={selectedStates}
          foundedYearRange={foundedYearRange}
          onCategoryChange={setSelectedCategories}
          onCountryChange={setSelectedCountries}
          onStateChange={setSelectedStates}
          onFoundedYearChange={setFoundedYearRange}
        />
        
        {/* Company Sidebar */}
        <CompanySidebar
          company={selectedCompany}
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default UnifiedView;