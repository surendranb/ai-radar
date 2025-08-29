import React, { useState } from 'react';
import { X, User, ExternalLink, Edit3 } from 'lucide-react';
import { Company } from '../types/company';

interface CompanySidebarProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onEditCompany: (company: Company) => void;
}

const CompanySidebar: React.FC<CompanySidebarProps> = ({ company, isOpen, onClose, onEditCompany }) => {
  const [logoError, setLogoError] = useState(false);
  
  if (!company) return null;

  const getCategoryGradient = (categories: string[]) => {
    const primaryCategory = company.category.toLowerCase();
    if (primaryCategory.includes('financial')) return 'from-emerald-400 via-cyan-500 to-blue-600';
    if (primaryCategory.includes('healthcare')) return 'from-cyan-400 via-blue-500 to-purple-600';
    if (primaryCategory.includes('cybersecurity')) return 'from-purple-500 via-violet-600 to-indigo-700';
    if (primaryCategory.includes('edtech') || primaryCategory.includes('education')) return 'from-blue-400 via-indigo-500 to-purple-600';
    if (primaryCategory.includes('ai') || primaryCategory.includes('ml')) return 'from-violet-400 via-purple-500 to-indigo-600';
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

  const location = `${company.city}, ${company.state}`;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/60 z-50 transform transition-all duration-500 ease-out shadow-2xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Header with gradient */}
        <div className={`relative bg-gradient-to-r ${getCategoryGradient([company.category])} p-6 shadow-lg`}>
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center space-x-4 flex-1 mr-4">
              <div className="relative flex-shrink-0">
                <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryGradient([company.category])} rounded-xl blur-lg opacity-70`}></div>
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shadow-2xl">
                  {!logoError ? (
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain"
                      onError={() => setLogoError(true)}
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-r ${getCategoryGradient([company.category])} flex items-center justify-center`}>
                      <span className="text-xl font-black text-white drop-shadow-lg">
                        {company.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-black text-white mb-2 drop-shadow-lg">
                  {company.name}
                </h2>
                <div className="text-white/90 font-medium text-base mb-1">
                  Founded {company.founded} • {location} {getCountryFlag(company.country)}
                </div>
                <div className="text-white/80 font-medium text-base">
                  {company.category} • {company.tags.join(' • ')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Edit Info Button */}
              <button
                onClick={() => onEditCompany(company)}
                className="group flex items-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 hover:border-white/30 text-white/90 hover:text-white transition-all duration-200 text-sm font-medium backdrop-blur-sm"
              >
                <Edit3 className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                <span>Edit Info</span>
              </button>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 border border-white/20 hover:scale-110 active:scale-95"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-8 overflow-y-auto" style={{ height: 'calc(100vh - 140px)' }}>
          
          {/* Description */}
          <p className="text-gray-200 text-xl leading-relaxed font-light">
            {company.description}
          </p>
          
          {/* Founders */}
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                <User className="h-3 w-3 text-white" />
              </div>
              Founders
            </h3>
            
            <div className="space-y-4">
              {company.founders.map((founder, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50 transition-colors duration-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-white text-base font-bold">{founder.charAt(0)}</span>
                  </div>
                  <span className="text-white text-lg font-medium">{founder}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div className="space-y-3">
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors underline-offset-2 hover:underline text-lg font-medium p-2 rounded-lg hover:bg-emerald-500/10"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Website</span>
            </a>
            {company.linkedinProfile && (
              <a
                href={company.linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors underline-offset-2 hover:underline text-lg font-medium p-2 rounded-lg hover:bg-cyan-500/10"
              >
                <ExternalLink className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanySidebar;