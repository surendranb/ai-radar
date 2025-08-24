import React, { useState } from 'react';
import { ExternalLink, Calendar, User, MapPin, Building2, ArrowUpRight } from 'lucide-react';
import { Company } from '../types/company';

interface CompanyCardProps {
  company: Company;
  onCompanySelect: (company: Company) => void;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ company, onCompanySelect }) => {
  const [logoError, setLogoError] = useState(false);

  const getCategoryGradient = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('financial')) return 'from-emerald-400 via-cyan-500 to-blue-600';
    if (categoryLower.includes('healthcare')) return 'from-cyan-400 via-blue-500 to-purple-600';
    if (categoryLower.includes('cybersecurity')) return 'from-purple-500 via-violet-600 to-indigo-700';
    if (categoryLower.includes('edtech') || categoryLower.includes('education')) return 'from-blue-400 via-indigo-500 to-purple-600';
    if (categoryLower.includes('ai') || categoryLower.includes('ml')) return 'from-violet-400 via-purple-500 to-indigo-600';
    return 'from-emerald-400 via-cyan-500 to-purple-600';
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'India': '🇮🇳',
      'United States': '🇺🇸',
      'Singapore': '🇸🇬',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'Australia': '🇦🇺',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷',
      'China': '🇨🇳',
      'Israel': '🇮🇱',
      'Netherlands': '🇳🇱',
      'Sweden': '🇸🇪',
      'Switzerland': '🇨🇭',
      'Brazil': '🇧🇷',
      'Mexico': '🇲🇽',
      'UAE': '🇦🇪',
      'Saudi Arabia': '🇸🇦',
      'South Africa': '🇿🇦',
      'Nigeria': '🇳🇬',
      'Kenya': '🇰🇪',
      'Egypt': '🇪🇬',
      'Indonesia': '🇮🇩',
      'Thailand': '🇹🇭',
      'Vietnam': '🇻🇳',
      'Philippines': '🇵🇭',
      'Malaysia': '🇲🇾',
      'Bangladesh': '🇧🇩',
      'Pakistan': '🇵🇰',
      'Sri Lanka': '🇱🇰',
      'Nepal': '🇳🇵',
      'Myanmar': '🇲🇲',
      'Cambodia': '🇰🇭',
      'Laos': '🇱🇦'
    };
    return flags[country] || '🌍';
  };

  return (
    <div 
      className="group relative h-full cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
      onClick={() => onCompanySelect(company)}
    >
      {/* Sophisticated glow effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${getCategoryGradient(company.category)} rounded-3xl blur-2xl opacity-0 group-hover:opacity-25 transition-all duration-700`}></div>
      
      {/* Glass morphism card */}
      <div className="relative h-full backdrop-blur-xl bg-gray-800/50 border border-gray-700/60 rounded-2xl p-6 hover:border-gray-600/80 hover:bg-gray-800/70 transition-all duration-500 shadow-xl hover:shadow-2xl">
        
        {/* Compact Header */}
        <div className="mb-6">
          {/* Logo + Name + External Link */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {/* Company Logo */}
              <div className="relative flex-shrink-0">
                <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(company.category)} rounded-xl blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300`}></div>
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                  {!logoError ? (
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${getCategoryGradient(company.category)} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-lg font-black text-white drop-shadow-lg">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Company Name */}
              <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 group-hover:scale-105 transform">
                {company.name}
              </h3>
            </div>
            
            {/* External link button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(company.website, '_blank');
              }}
              className="w-8 h-8 bg-gray-700/60 hover:bg-gray-600/70 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 group/link border border-gray-600/40 hover:border-gray-500/60 flex-shrink-0 hover:scale-110 active:scale-95"
            >
              <ArrowUpRight className="h-4 w-4 group-hover/link:scale-125 group-hover/link:rotate-12 transition-all duration-200" />
            </button>
          </div>
          
          {/* Meta Information Line */}
          <div className="flex items-center space-x-2 text-sm text-gray-400 mb-3 ml-15">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Founded {company.founded}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{company.city}, {company.state}</span>
            </div>
            <span className="text-base">{getCountryFlag(company.country)}</span>
          </div>
          
          {/* Category Badge */}
          <div className="ml-15">
            <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${getCategoryGradient(company.category)} text-white shadow-lg border border-white/20 group-hover:scale-105 transition-transform duration-300`}>
              <Building2 className="h-3 w-3 mr-1.5" />
              {company.category}
            </div>
          </div>
        </div>
        
        {/* Description - Prominent */}
        <p className="text-gray-200 text-lg leading-relaxed mb-6 line-clamp-3 font-normal group-hover:text-gray-100 transition-colors duration-300">
          {company.description}
        </p>

        {/* Founders Section - Compact but Prominent */}
        <div className="mb-6">
          <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10 rounded-lg p-4 border border-amber-500/20 group-hover:border-amber-500/30 transition-colors duration-300">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-5 h-5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <User className="h-3 w-3 text-white" />
              </div>
              <span className="text-amber-300 font-semibold text-xs uppercase tracking-wide">Founders</span>
            </div>
            <div className="space-y-1.5">
              {company.founders.map((founder, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-xs font-bold">{founder.charAt(0)}</span>
                  </div>
                  <span className="text-white text-sm font-medium group-hover:text-amber-100 transition-colors duration-300">{founder}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subtle hover overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient(company.category)} opacity-0 group-hover:opacity-[0.03] rounded-2xl transition-opacity duration-500 pointer-events-none`}></div>
      </div>
    </div>
  );
};

export default CompanyCard;