import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 z-50 p-6 backdrop-blur-sm">
      <div className="flex items-center space-x-3 group cursor-pointer transform hover:scale-105 transition-transform duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-cyan-500/20 to-purple-500/20 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="relative bg-white/95 backdrop-blur-sm p-3 rounded-xl border border-white/30 shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <img 
              src="https://saasboomi.org/wp-content/themes/saasboomi/img/logo.svg" 
              alt="Logo" 
              className="h-10 w-auto max-w-none group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;