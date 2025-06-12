
import React from 'react';
import type { Template } from '../types';

interface TemplateSelectorProps {
  templates: Template[];
  activeTemplateId: string;
  onSelect: (template: Template) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, activeTemplateId, onSelect }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selectedTemplate = templates.find(t => t.id === selectedId);
    if (selectedTemplate) {
      onSelect(selectedTemplate);
    }
  };

  const activeTemplateDetails = templates.find(t => t.id === activeTemplateId);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-green-300 border-b border-gray-700 pb-2">
        Templates
      </h2>
      <div className="space-y-3">
        <select
          value={activeTemplateId.startsWith('custom') ? 'custom' : activeTemplateId}
          onChange={handleSelectChange}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-200"
          aria-label="Select a template"
        >
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
          {(activeTemplateId === 'custom' || activeTemplateId === 'custom-imported') && (
            <option value="custom" disabled hidden>
              {activeTemplateId === 'custom-imported' ? 'Imported Configuration' : 'Custom Configuration'}
            </option>
          )}
        </select>

        {activeTemplateDetails && !activeTemplateId.startsWith('custom') && (
          <div className="mt-2 p-3 bg-gray-700 rounded-md text-sm text-gray-400">
            <div className="flex items-center space-x-2 mb-1">
              {activeTemplateDetails.icon && <span className="flex-shrink-0">{activeTemplateDetails.icon}</span>}
              <h3 className="font-medium text-gray-200">{activeTemplateDetails.name}</h3>
            </div>
            <p>{activeTemplateDetails.description}</p>
          </div>
        )}

        {activeTemplateId === 'custom' && (
          <div className="mt-2 p-3 rounded-md bg-gray-700 text-gray-300 border border-yellow-500 text-sm">
            <h3 className="font-medium text-yellow-400">Custom Configuration</h3>
            <p className="text-gray-400">Your current configuration is custom (not matching a pre-defined template).</p>
          </div>
        )}
        {activeTemplateId === 'custom-imported' && (
          <div className="mt-2 p-3 rounded-md bg-gray-700 text-gray-300 border border-blue-500 text-sm">
            <h3 className="font-medium text-blue-400">Imported Configuration</h3>
            <p className="text-gray-400">You are editing an imported TOML file.</p>
          </div>
        )}
      </div>
    </div>
  );
};
