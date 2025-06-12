
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon } from './icons/EditorIcons';

interface TomlPreviewPanelProps {
  tomlString: string;
  isLoading: boolean;
}

export const TomlPreviewPanel: React.FC<TomlPreviewPanelProps> = ({ tomlString, isLoading }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (isLoading || tomlString.startsWith("# Error")) return;
    navigator.clipboard.writeText(tomlString)
      .then(() => setCopied(true))
      .catch(err => console.error('Failed to copy TOML: ', err));
  };

  return (
    // Removed sticky, bottom, z-index as parent div now handles positioning
    <div className="bg-gray-800 p-4 h-[280px] flex flex-col"> {/* Fixed height for consistent layout */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-green-300">starship.toml Preview</h2>
        <button
          onClick={handleCopy}
          disabled={isLoading || tomlString.startsWith("# Error")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center space-x-1.5
                      ${copied 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-600 disabled:cursor-not-allowed'
                      }`}
        >
          {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy TOML'}</span>
        </button>
      </div>
      <div className="bg-gray-900 p-3 rounded-md flex-grow overflow-y-auto shadow-inner preview-content"> {/* Added flex-grow and preview-content class */}
        {isLoading ? (
          <pre className="text-gray-400 text-xs whitespace-pre-wrap animate-pulse">Loading preview...</pre>
        ) : (
          <pre className={`text-xs whitespace-pre-wrap ${tomlString.startsWith("# Error") ? 'text-red-400' : 'text-gray-200'}`}>
            {tomlString}
          </pre>
        )}
      </div>
    </div>
  );
};
