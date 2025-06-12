
import React from 'react';
import type { StarshipConfig, ModulePropertyDefinition } from '../types';
import { ModulePropertyField } from './ModulePropertyField';

interface GlobalSettingsEditorProps {
  config: StarshipConfig;
  settingsDefinition: ModulePropertyDefinition[];
  onChange: (key: string, value: string | number | boolean) => void;
}

export const GlobalSettingsEditor: React.FC<GlobalSettingsEditorProps> = ({ config, settingsDefinition, onChange }) => {
  return (
    <div className="space-y-4">
      {settingsDefinition.map((propDef) => (
        <ModulePropertyField
          key={propDef.key}
          propertyDefinition={propDef}
          currentValue={config[propDef.key]}
          onPropertyChange={(value) => onChange(propDef.key, value)}
          isGlobalSetting={true}
        />
      ))}
    </div>
  );
};
