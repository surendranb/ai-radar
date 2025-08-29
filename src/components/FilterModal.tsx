import React, { useState } from 'react';
import { X, Sparkles, ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  countries: string[];
  states: string[];
  selectedCategories: string[];
  selectedCountries: string[];
  selectedStates: string[];
  foundedYearRange: [number, number];
  onCategoryChange: (categories: string[]) => void;
  onCountryChange: (countries: string[]) => void;
  onStateChange: (states: string[]) => void;
  onFoundedYearChange: (range: [number, number]) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  categories,
  countries,
  states,
  selectedCategories,
  selectedCountries,
  selectedStates,
  foundedYearRange,
  onCategoryChange,
  onCountryChange,
  onStateChange,
  onFoundedYearChange,
}) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const toggleCountry = (country: string) => {
    if (selectedCountries.includes(country)) {
      onCountryChange(selectedCountries.filter(c => c !== country));
    } else {
      onCountryChange([...selectedCountries, country]);
    }
  };

  const toggleState = (state: string) => {
    if (selectedStates.includes(state)) {
      onStateChange(selectedStates.filter(s => s !== state));
    } else {
      onStateChange([...selectedStates, state]);
    }
  };

  const clearAll = () => {
    onCategoryChange([]);
    onCountryChange([]);
    onStateChange([]);
    onFoundedYearChange([2010, 2025]);
    setOpenDropdown(null);
  };

  const activeFiltersCount = selectedCategories.length + selectedCountries.length + selectedStates.length;
  const hasYearFilter = foundedYearRange[0] !== 2010 || foundedYearRange[1] !== 2025;
  const totalFilters = activeFiltersCount + (hasYearFilter ? 1 : 0);

  const yearOptions = Array.from({ length: 16 }, (_, i) => 2010 + i); // 2010-2025

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const removePill = (type: string, value: string) => {
    switch (type) {
      case 'category':
        toggleCategory(value);
        break;
      case 'country':
        toggleCountry(value);
        break;
      case 'state':
        toggleState(value);
        break;
      case 'year':
        onFoundedYearChange([2010, 2025]);
        break;
    }
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

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
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-700/50 z-50 transform transition-transform duration-500 ease-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`} onClick={closeDropdown}>
        
        {/* Header */}
        <div className="relative bg-gradient-to-r from-emerald-400 via-cyan-500 to-purple-600 p-6 shadow-lg">
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20 shadow-2xl">
                <Sparkles className="h-5 w-5 text-white animate-pulse" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">
                  AI Filters
                </h2>
                <div className="text-white/90 font-medium text-sm">
                  Refine your radar discovery
                </div>
                {totalFilters > 0 && (
                  <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-white/20 backdrop-blur-sm text-white border border-white/30 animate-pulse">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></div>
                    {totalFilters} selected
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 border border-white/20 hover:scale-110 active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto" style={{ height: 'calc(100vh - 200px)', paddingBottom: '120px' }} onClick={(e) => e.stopPropagation()}>
          
          {/* Dynamic Pills Display - Shows all selected filters */}
          {totalFilters > 0 && (
            <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40 backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map(category => (
                  <span 
                    key={category}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors duration-200 font-medium"
                  >
                    {category}
                    <button
                      onClick={() => removePill('category', category)}
                      className="ml-2 hover:text-emerald-200 hover:scale-110 transition-transform duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedCountries.map(country => (
                  <span 
                    key={country}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors duration-200 font-medium"
                  >
                    {country}
                    <button
                      onClick={() => removePill('country', country)}
                      className="ml-2 hover:text-cyan-200 hover:scale-110 transition-transform duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {selectedStates.map(state => (
                  <span 
                    key={state}
                    className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition-colors duration-200 font-medium"
                  >
                    {state}
                    <button
                      onClick={() => removePill('state', state)}
                      className="ml-2 hover:text-purple-200 hover:scale-110 transition-transform duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                {hasYearFilter && (
                  <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors duration-200 font-medium">
                    {foundedYearRange[0]}-{foundedYearRange[1]}
                    <button
                      onClick={() => removePill('year', '')}
                      className="ml-2 hover:text-amber-200 hover:scale-110 transition-transform duration-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('categories');
              }}
              className="w-full bg-gray-800/60 border border-gray-600/60 rounded-lg p-4 text-left text-white focus:outline-none focus:border-emerald-400/60 focus:ring-1 focus:ring-emerald-400/30 transition-all duration-200 flex items-center justify-between hover:bg-gray-800/70 hover:border-gray-600/70"
            >
              <span className="text-base font-medium">
                Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}
              </span>
              <div className="flex items-center space-x-2">
                {openDropdown === 'categories' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeDropdown();
                    }}
                    className="w-5 h-5 bg-gray-600/60 hover:bg-gray-500/60 rounded flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  openDropdown === 'categories' ? 'rotate-180' : ''
                }`} />
              </div>
            </button>
            
            {openDropdown === 'categories' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/60 rounded-lg shadow-2xl z-10 max-h-48 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`w-full text-left px-4 py-3 text-base hover:bg-gray-700/60 transition-colors duration-200 ${
                      selectedCategories.includes(category)
                        ? 'bg-emerald-500/20 text-emerald-300 font-medium' 
                        : 'text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Countries Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('countries');
              }}
              className="w-full bg-gray-800/60 border border-gray-600/60 rounded-lg p-4 text-left text-white focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all duration-200 flex items-center justify-between hover:bg-gray-800/70 hover:border-gray-600/70"
            >
              <span className="text-base font-medium">
                Countries {selectedCountries.length > 0 && `(${selectedCountries.length})`}
              </span>
              <div className="flex items-center space-x-2">
                {openDropdown === 'countries' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeDropdown();
                    }}
                    className="w-5 h-5 bg-gray-600/60 hover:bg-gray-500/60 rounded flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  openDropdown === 'countries' ? 'rotate-180' : ''
                }`} />
              </div>
            </button>
            
            {openDropdown === 'countries' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/60 rounded-lg shadow-2xl z-10 max-h-48 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {countries.map(country => (
                  <button
                    key={country}
                    onClick={() => toggleCountry(country)}
                    className={`w-full text-left px-4 py-3 text-base hover:bg-gray-700/60 transition-colors duration-200 ${
                      selectedCountries.includes(country) 
                        ? 'bg-cyan-500/20 text-cyan-300 font-medium' 
                        : 'text-gray-300'
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* States Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('states');
              }}
              className="w-full bg-gray-800/60 border border-gray-600/60 rounded-lg p-4 text-left text-white focus:outline-none focus:border-purple-400/60 focus:ring-1 focus:ring-purple-400/30 transition-all duration-200 flex items-center justify-between hover:bg-gray-800/70 hover:border-gray-600/70"
            >
              <span className="text-base font-medium">
                States {selectedStates.length > 0 && `(${selectedStates.length})`}
              </span>
              <div className="flex items-center space-x-2">
                {openDropdown === 'states' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeDropdown();
                    }}
                    className="w-5 h-5 bg-gray-600/60 hover:bg-gray-500/60 rounded flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  openDropdown === 'states' ? 'rotate-180' : ''
                }`} />
              </div>
            </button>
            
            {openDropdown === 'states' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/60 rounded-lg shadow-2xl z-10 max-h-48 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {states.map(state => (
                  <button
                    key={state}
                    onClick={() => toggleState(state)}
                    className={`w-full text-left px-4 py-3 text-base hover:bg-gray-700/60 transition-colors duration-200 ${
                      selectedStates.includes(state) 
                        ? 'bg-purple-500/20 text-purple-300 font-medium' 
                        : 'text-gray-300'
                    }`}
                  >
                    {state}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Founded Year Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleDropdown('founded');
              }}
              className="w-full bg-gray-800/60 border border-gray-600/60 rounded-lg p-4 text-left text-white focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 transition-all duration-200 flex items-center justify-between hover:bg-gray-800/70 hover:border-gray-600/70"
            >
              <span className="text-base font-medium">
                Founded Year {hasYearFilter && `(${foundedYearRange[0]}-${foundedYearRange[1]})`}
              </span>
              <div className="flex items-center space-x-2">
                {openDropdown === 'founded' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeDropdown();
                    }}
                    className="w-5 h-5 bg-gray-600/60 hover:bg-gray-500/60 rounded flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200 hover:scale-110"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  openDropdown === 'founded' ? 'rotate-180' : ''
                }`} />
              </div>
            </button>
            
            {openDropdown === 'founded' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-600/60 rounded-lg shadow-2xl z-10 p-4" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">From: {foundedYearRange[0]}</label>
                    <input
                      type="range"
                      min="2010"
                      max="2025"
                      value={foundedYearRange[0]}
                      onChange={(e) => onFoundedYearChange([parseInt(e.target.value), foundedYearRange[1]])}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">To: {foundedYearRange[1]}</label>
                    <input
                      type="range"
                      min="2010"
                      max="2025"
                      value={foundedYearRange[1]}
                      onChange={(e) => onFoundedYearChange([foundedYearRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Fixed bottom action bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/60 shadow-lg">
          <div className="flex gap-4">
            <button
              onClick={clearAll}
              className="px-4 py-2.5 bg-gray-700/60 hover:bg-gray-600/60 rounded-lg text-gray-300 hover:text-white transition-all duration-300 font-medium text-base border border-gray-600/40 hover:border-gray-500/60 hover:scale-105 active:scale-95"
            >
              Clear All
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-cyan-600 text-white py-2.5 px-4 rounded-lg font-bold text-base text-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <span>Filter</span>
                {totalFilters > 0 && (
                  <span className="bg-white/20 text-white text-sm px-2.5 py-0.5 rounded-full font-bold animate-pulse">
                    {totalFilters}
                  </span>
                )}
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/50 to-cyan-500/50 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f59e0b, #f97316);
          cursor: pointer;
          border: 1px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: linear-gradient(45deg, #f59e0b, #f97316);
          cursor: pointer;
          border: 1px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
};

export default FilterSidebar;