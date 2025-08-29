import React from 'react';
import { X, Github, FileText, GitPullRequest, Edit3 } from 'lucide-react';
import { Company } from '../types/company';

interface EditCompanySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
}

const EditCompanySidebar: React.FC<EditCompanySidebarProps> = ({ isOpen, onClose, company }) => {
  if (!company) return null;

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
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-gray-900/95 backdrop-blur-xl border-l border-gray-700/60 z-50 transform transition-transform duration-500 ease-out shadow-2xl ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 p-6 shadow-lg">
          <div className="absolute inset-0 bg-black/30"></div>
          
          <div className="relative flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 rounded-xl blur-lg opacity-70"></div>
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white shadow-2xl flex items-center justify-center">
                  <Edit3 className="h-8 w-8 text-gray-800" />
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-black text-white mb-2 drop-shadow-lg">
                  Edit Company
                </h2>
                <div className="text-white/90 font-medium text-base">
                  Update {company.name} via GitHub
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-lg flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 border border-white/20 hover:scale-110 active:scale-95"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-8 overflow-y-auto" style={{ height: 'calc(100vh - 200px)', paddingBottom: '120px' }}>
          
          {/* Introduction */}
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-blue-500/20">
            <p className="text-gray-200 text-lg leading-relaxed">
              Need to update your company information? Follow these steps to submit changes to <strong className="text-white">{company.name}</strong> through GitHub.
            </p>
          </div>

          {/* Step 1: Go to GitHub */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <Github className="h-5 w-5 mr-2" />
                Navigate to GitHub Repository
              </h3>
            </div>
            
            <div className="ml-11 space-y-3">
              <p className="text-gray-300 text-base leading-relaxed">
                Access our GitHub repository where your company data is stored.
              </p>
              
              <a
                href="https://github.com/your-repo/ai-radar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-3 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg border border-gray-600/40 hover:border-gray-500/60 text-white transition-all duration-200 group"
              >
                <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Open GitHub Repository</span>
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Step 2: Find and Edit JSON */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Find Your Company in the JSON File
              </h3>
            </div>
            
            <div className="ml-11 space-y-4">
              <p className="text-gray-300 text-base leading-relaxed">
                Locate your company entry in the companies data file.
              </p>
              
              <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/40">
                <div className="text-sm text-gray-400 mb-2 font-mono">File path:</div>
                <div className="text-blue-400 font-mono text-base bg-gray-900/60 px-3 py-2 rounded border border-gray-700/60">
                  public/companies.json
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">Instructions:</strong>
                </p>
                <ul className="text-gray-300 text-sm space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Click on <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">public/companies.json</code></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Click the pencil icon (✏️) to edit the file</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Search for <code className="bg-gray-800 px-2 py-1 rounded text-blue-400">"{company.name}"</code> to find your company entry</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>Update the fields you want to change</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3: Current Company Data */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-white">
                Your Current Company Data
              </h3>
            </div>
            
            <div className="ml-11 space-y-4">
              <p className="text-gray-300 text-base leading-relaxed">
                Here's your current company information. Update any fields as needed:
              </p>
              
              <div className="bg-gray-900/60 rounded-lg p-4 border border-gray-700/60 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`{
  "id": "${company.id}",
  "name": "${company.name}",
  "founded": ${company.founded},
  "founders": [
${company.founders.map(founder => `    "${founder}"`).join(',\n')}
  ],
  "website": "${company.website}",
  "category": "${company.category}",
  "tags": [${company.tags.map(tag => `"${tag}"`).join(', ')}],
  "country": "${company.country}",
  "state": "${company.state}",
  "city": "${company.city}",
  "logoUrl": "${company.logoUrl}",
  "description": "${company.description}",
  "linkedinProfile": "${company.linkedinProfile}"
}`}
                </pre>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                  <div className="text-amber-200 text-sm">
                    <strong>Important:</strong> Make sure to maintain proper JSON formatting when making changes. Don't remove commas or brackets.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Submit Pull Request */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                4
              </div>
              <h3 className="text-xl font-semibold text-white flex items-center">
                <GitPullRequest className="h-5 w-5 mr-2" />
                Submit Your Changes
              </h3>
            </div>
            
            <div className="ml-11 space-y-4">
              <p className="text-gray-300 text-base leading-relaxed">
                Once you've made your changes, submit them for review.
              </p>
              
              <div className="space-y-3">
                <ul className="text-gray-300 text-sm space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Scroll down to "Commit changes" section</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Add a commit message like: <code className="bg-gray-800 px-2 py-1 rounded text-red-400">"Update {company.name} information"</code></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Select "Create a new branch for this commit and start a pull request"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Click "Propose changes"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Review your changes and click "Create pull request"</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400 mt-1">•</span>
                    <span>Add a description of what you changed and why</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div className="text-emerald-200 text-sm">
                    <strong>Done!</strong> Your changes will be reviewed and merged, updating your company information on the AI Radar.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/40">
            <h4 className="text-lg font-semibold text-white mb-3">Need Help?</h4>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              If you're having trouble with the editing process or need assistance, feel free to reach out or check GitHub's documentation.
            </p>
            <a
              href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
            >
              <span>GitHub Pull Request Guide</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCompanySidebar;