
import React from 'react';
import type { StarshipConfig, ModuleConfig, ModuleDefinition, ModulePropertyDefinition, PaletteConfig } from '../types';
import { GlobalSettingsEditor } from './GlobalSettingsEditor';
import { ModuleEditor } from './ModuleEditor';
import { PaletteEditor } from './PaletteEditor';

interface ConfigEditorPanelProps {
  config: StarshipConfig;
  onConfigChange: (newConfig: Partial<StarshipConfig>) => void;
  onModuleChange: (moduleName: string, moduleConfig: ModuleConfig | null) => void; // null to remove module
  onPaletteChange: (newPalette: PaletteConfig) => void;
  globalSettingsDefinition: ModulePropertyDefinition[];
  availableModules: ModuleDefinition[];
}

export const ConfigEditorPanel: React.FC<ConfigEditorPanelProps> = ({
  config,
  onConfigChange,
  onModuleChange,
  onPaletteChange,
  globalSettingsDefinition,
  availableModules,
}) => {
  const handleGlobalSettingChange = (key: string, value: string | number | boolean) => {
    onConfigChange({ [key]: value });
  };

  const allRelevantModuleKeys = new Set<string>();
  availableModules.forEach(mod => allRelevantModuleKeys.add(mod.id));
  Object.keys(config).forEach(key => {
    if (typeof config[key] === 'object' && config[key] !== null && 
        !globalSettingsDefinition.find(gs => gs.key === key) &&
        key !== 'palette' // Exclude palette from module list
        ) {
      allRelevantModuleKeys.add(key);
    }
  });

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-green-300 border-b border-gray-700 pb-2">Global Settings</h2>
        <GlobalSettingsEditor
          config={config}
          settingsDefinition={globalSettingsDefinition}
          onChange={handleGlobalSettingChange}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-green-300 border-b border-gray-700 pb-2">Palettes</h2>
        <PaletteEditor
          currentPalette={config.palette || {}}
          onPaletteChange={onPaletteChange}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-green-300 border-b border-gray-700 pb-2">Modules</h2>
        <div className="space-y-6">
          {Array.from(allRelevantModuleKeys).sort().map((moduleKey) => {
            const moduleDef = availableModules.find(m => m.id === moduleKey);
            const moduleData = config[moduleKey] as ModuleConfig | undefined;

            if (moduleDef) { 
              return (
                <ModuleEditor
                  key={moduleKey}
                  moduleDefinition={moduleDef}
                  currentModuleConfig={moduleData || { disabled: moduleDef.defaultDisabled === undefined ? true : moduleDef.defaultDisabled }}
                  onModuleChange={onModuleChange}
                  currentPalette={config.palette || {}}
                />
              );
            } else if (moduleData && typeof moduleData === 'object') { 
              return (
                <div key={moduleKey} className="p-4 bg-gray-700 rounded-md shadow">
                  <h3 className="text-lg font-medium text-yellow-400">{moduleKey} (Custom Section)</h3>
                  <p className="text-sm text-gray-400">This section was imported. Its content will be preserved but is not editable in this UI yet.</p>
                  <pre className="mt-2 text-xs bg-gray-800 p-2 rounded overflow-x-auto">
                    {JSON.stringify(moduleData, null, 2)}
                  </pre>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};
