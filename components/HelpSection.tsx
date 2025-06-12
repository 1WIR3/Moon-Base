
import React from 'react';
import { CloseIcon } from './icons/EditorIcons';

interface HelpSectionProps {
  onClose: () => void;
}

const HelpLink: React.FC<{href: string, children: React.ReactNode}> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline transition-colors">
    {children}
  </a>
);

export const HelpSection: React.FC<HelpSectionProps> = ({ onClose }) => {
  return (
    <div 
        className="fixed inset-0 bg-gray-900 bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-dialog-title"
    >
      <div 
        className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto text-gray-200"
        onClick={(e) => e.stopPropagation()} // Prevent click inside from closing modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="help-dialog-title" className="text-2xl font-semibold text-green-400">Help & Guidance</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-gray-700 transition-colors" aria-label="Close help">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-medium text-green-300 mb-2">Quick Start Guide</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li><strong>Select a Template:</strong> Start with a pre-defined template from the left panel.</li>
              <li><strong>Customize Globally:</strong> Adjust global settings like overall prompt format.</li>
              <li><strong>Configure Modules:</strong> Expand module sections to enable/disable or fine-tune their appearance and behavior. Each module has common settings like 'format' and 'style', plus specific options.</li>
              <li><strong>Live Preview:</strong> See your `starship.toml` generated in real-time at the bottom.</li>
              <li><strong>Import/Export:</strong> Use the buttons in the header to load an existing `starship.toml` or download your current creation.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-green-300 mb-2">Pro Tips for Starship</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li><strong>Format Strings:</strong> Use variables like <code>$variable</code> (e.g., <code>$directory</code>, <code>$git_branch</code>). Surround sections with <code>[]</code> to make them optional (e.g., <code>[on $hostname]</code>).</li>
              <li><strong>Styling:</strong> Use strings like <code>"green bold"</code>, <code>"fg:#ff0000"</code>, <code>"bg:blue"</code>, <code>"underline"</code>. See Starship docs for all options.</li>
              <li><strong>Nerd Fonts:</strong> Many cool symbols (like <code></code> for git branch) come from Nerd Fonts. Ensure you have one installed and configured in your terminal.
                Find them at <HelpLink href="https://www.nerdfonts.com/">Nerd Fonts</HelpLink>.
              </li>
              <li><strong>Module Order:</strong> The order in your global <code>format</code> string determines the prompt's layout.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-medium text-green-300 mb-2">Customization Tips</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li><strong>Colors:</strong> Experiment with foreground (<code>fg:</code>) and background (<code>bg:</code>) colors. Standard color names (red, green, blue, etc.) and hex codes (e.g., <code>#aabbcc</code>) work.</li>
              <li><strong>Symbols:</strong> Don't be afraid to use Unicode symbols or Nerd Font icons in your format strings or module properties (like <code>character.success_symbol</code>).</li>
              <li><strong>Less is More:</strong> Sometimes, a cleaner prompt is faster and less distracting. Disable modules you don't need.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-medium text-green-300 mb-2">Official Resources</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li><HelpLink href="https://starship.rs/">Starship Official Website</HelpLink></li>
                <li><HelpLink href="https://starship.rs/config/">Starship Configuration Docs</HelpLink></li>
                <li><HelpLink href="https://starship.rs/presets/">Starship Presets Examples</HelpLink></li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
