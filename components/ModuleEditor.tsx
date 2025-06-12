import React, { useState, useCallback, useEffect } from 'react';
import type { ModuleDefinition, ModuleConfig, TomlValue, PaletteConfig } from '../types';
import { ModulePropertyType } from '../types';
import { ModulePropertyField } from './ModulePropertyField';
import { ChevronDownIcon, ChevronUpIcon, LinkIcon } from './icons/EditorIcons';
import { PREDEFINED_CURSORS } from '../constants';

interface ModuleEditorProps {
  moduleDefinition: ModuleDefinition;
  currentModuleConfig: ModuleConfig;
  onModuleChange: (moduleName: string, moduleConfig: ModuleConfig | null) => void;
  currentPalette: PaletteConfig; // For resolving styles if needed by property fields
}

export const ModuleEditor: React.FC<ModuleEditorProps> = ({
  moduleDefinition,
  currentModuleConfig,
  onModuleChange,
  currentPalette, // unused for now but good for future extension
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const initialEnabledState = currentModuleConfig.disabled === undefined
    ? !(moduleDefinition.defaultDisabled === true)
    : !currentModuleConfig.disabled;
  
  const [isEnabled, setIsEnabled] = useState<boolean>(initialEnabledState);

  // For Character module's cursor selection
  const [selectedCursorValue, setSelectedCursorValue] = useState<string>('');
  const [customCursorSymbol, setCustomCursorSymbol] = useState<string>('');

  useEffect(() => {
    if (moduleDefinition.id === 'character') {
        // Try to infer selected cursor from success_symbol
        const successSymbol = currentModuleConfig.success_symbol as string || 
                              (PREDEFINED_CURSORS[0] ? PREDEFINED_CURSORS[0].value : '❯'); // Default to first cursor or fallback
        const matchedCursor = PREDEFINED_CURSORS.find(c => successSymbol.includes(c.actual_symbol));
        
        if (matchedCursor) {
            setSelectedCursorValue(matchedCursor.value);
            setCustomCursorSymbol('');
        } else if (successSymbol) {
             // Extract symbol from format like "[SYMBOL](style)"
            const symbolMatch = successSymbol.match(/^\[(.*?)\]\(.*\)$/);
            if (symbolMatch && symbolMatch[1]) {
                 setSelectedCursorValue('custom');
                 setCustomCursorSymbol(symbolMatch[1]);
            } else { // Plain symbol
                setSelectedCursorValue('custom');
                setCustomCursorSymbol(successSymbol);
            }
        } else {
            setSelectedCursorValue(PREDEFINED_CURSORS[0] ? PREDEFINED_CURSORS[0].value : '❯');
        }
    }
  }, [moduleDefinition.id, currentModuleConfig.success_symbol]);


  const handleToggleEnable = useCallback(() => {
    const newIsEnabled = !isEnabled;
    setIsEnabled(newIsEnabled);
    const newConfigDisabledState = !newIsEnabled;

    const updatedModuleConfig: ModuleConfig = {
      ...(currentModuleConfig || {}), 
      disabled: newConfigDisabledState,
    };
    
    if (newIsEnabled && Object.keys(currentModuleConfig).length === 0) {
        if(moduleDefinition.defaultFormat) updatedModuleConfig.format = moduleDefinition.defaultFormat;
        if(moduleDefinition.defaultStyle) updatedModuleConfig.style = moduleDefinition.defaultStyle;
        moduleDefinition.properties.forEach(prop => {
            if (prop.defaultValue !== undefined) {
                updatedModuleConfig[prop.key] = prop.defaultValue;
            }
        });
        // Special handling for character module on first enable with cursor
        if (moduleDefinition.id === 'character') {
            const cursor = PREDEFINED_CURSORS.find(c => c.value === selectedCursorValue) || (PREDEFINED_CURSORS[0] || {actual_symbol: '❯'});
            const symbolToUse = selectedCursorValue === 'custom' ? customCursorSymbol : cursor.actual_symbol;
            updatedModuleConfig.success_symbol = `[${symbolToUse}](bold green)`;
            updatedModuleConfig.error_symbol = `[${symbolToUse}](bold red)`;
            updatedModuleConfig.vicmd_symbol = `[${symbolToUse}](bold green)`;
        }
    }

    onModuleChange(moduleDefinition.id, updatedModuleConfig);
    if (newIsEnabled && !isOpen) setIsOpen(true);
  }, [isEnabled, currentModuleConfig, moduleDefinition, onModuleChange, isOpen, selectedCursorValue, customCursorSymbol]);

  const handlePropertyChange = useCallback((propKey: string, value: TomlValue) => {
    const updatedModuleConfig: ModuleConfig = {
      ...(currentModuleConfig || { disabled: !isEnabled }), 
      [propKey]: value,
    };
    updatedModuleConfig.disabled = !isEnabled; 

    // Handle cursor selection for 'character' module
    if (moduleDefinition.id === 'character' && propKey === 'custom_cursor_select') {
        const cursorValue = value as string;
        setSelectedCursorValue(cursorValue);
        let symbolToUse: string;
        const defaultCursorSymbol = PREDEFINED_CURSORS[0] ? PREDEFINED_CURSORS[0].actual_symbol : '❯';

        if (cursorValue === 'custom') {
            symbolToUse = customCursorSymbol || defaultCursorSymbol; 
        } else {
            const selected = PREDEFINED_CURSORS.find(c => c.value === cursorValue);
            symbolToUse = selected ? selected.actual_symbol : defaultCursorSymbol;
            setCustomCursorSymbol(''); // Clear custom input if predefined is selected
        }
        updatedModuleConfig.success_symbol = `[${symbolToUse}](bold green)`;
        updatedModuleConfig.error_symbol = `[${symbolToUse}](bold red)`;
        updatedModuleConfig.vicmd_symbol = `[${symbolToUse}](bold green)`;
    } else if (moduleDefinition.id === 'character' && propKey === 'custom_cursor_input') {
        const customSymbol = value as string;
        setCustomCursorSymbol(customSymbol);
        if (selectedCursorValue === 'custom') {
            const symbolToUse = customSymbol || (PREDEFINED_CURSORS[0] ? PREDEFINED_CURSORS[0].actual_symbol : '❯');
            updatedModuleConfig.success_symbol = `[${symbolToUse}](bold green)`;
            updatedModuleConfig.error_symbol = `[${symbolToUse}](bold red)`;
            updatedModuleConfig.vicmd_symbol = `[${symbolToUse}](bold green)`;
        }
    }


    onModuleChange(moduleDefinition.id, updatedModuleConfig);
  }, [currentModuleConfig, moduleDefinition.id, onModuleChange, isEnabled, customCursorSymbol, selectedCursorValue]);

  const moduleIcon = moduleDefinition.icon 
    ? React.createElement(moduleDefinition.icon, {className: "w-5 h-5 mr-2 text-gray-400 group-hover:text-green-400 transition-colors"})
    : null;

  return (
    <div className="bg-gray-750 border border-gray-700 rounded-lg shadow-sm transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-4 text-left rounded-t-lg group
                    ${isOpen ? 'bg-gray-700 rounded-b-none' : 'bg-gray-750 hover:bg-gray-700 rounded-b-lg'}`}
        aria-expanded={isOpen}
        aria-controls={`module-content-${moduleDefinition.id}`}
      >
        <div className="flex items-center">
          {moduleIcon}
          <span className={`font-semibold text-lg ${isEnabled ? 'text-green-400' : 'text-gray-500'}`}>
            {moduleDefinition.name}
          </span>
          {moduleDefinition.link && (
             <a
              href={moduleDefinition.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="ml-2 text-blue-400 hover:text-blue-300 tooltip"
            >
              <LinkIcon className="w-4 h-4" />
              <span className="tooltiptext">Documentation for {moduleDefinition.name}</span>
            </a>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <label htmlFor={`enable-${moduleDefinition.id}`} className="flex items-center space-x-2 cursor-pointer" onClick={e => e.stopPropagation()}>
            <span className={`text-sm ${isEnabled ? 'text-green-400' : 'text-gray-500'}`}>{isEnabled ? 'Enabled' : 'Disabled'}</span>
            <div className="relative">
              <input
                type="checkbox"
                id={`enable-${moduleDefinition.id}`}
                checked={isEnabled}
                onChange={handleToggleEnable}
                className="sr-only" 
              />
              <div className={`w-10 h-5 rounded-full shadow-inner transition-colors ${isEnabled ? 'bg-green-500' : 'bg-gray-600'}`}></div>
              <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${isEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </label>
          {isOpen ? <ChevronUpIcon className="w-5 h-5 text-gray-400" /> : <ChevronDownIcon className="w-5 h-5 text-gray-400" />}
        </div>
      </button>
      
      {isOpen && (
        <div id={`module-content-${moduleDefinition.id}`} className="p-4 border-t border-gray-600 bg-gray-750 rounded-b-lg space-y-4">
          {moduleDefinition.description && <p className="text-sm text-gray-400 mb-3">{moduleDefinition.description}</p>}
          
          {isEnabled ? (
            <>
              <ModulePropertyField
                propertyDefinition={{ key: 'format', label: 'Format String', type: ModulePropertyType.TEXTAREA, defaultValue: moduleDefinition.defaultFormat, placeholder: moduleDefinition.defaultFormat || 'e.g., [$symbol$version]($style)' }}
                currentValue={currentModuleConfig?.format}
                onPropertyChange={(value) => handlePropertyChange('format', value)}
              />
              <ModulePropertyField
                propertyDefinition={{ key: 'style', label: 'Style String', type: ModulePropertyType.TEXT, defaultValue: moduleDefinition.defaultStyle, placeholder: moduleDefinition.defaultStyle || 'e.g., green bold' }}
                currentValue={currentModuleConfig?.style}
                onPropertyChange={(value) => handlePropertyChange('style', value)}
              />
              {moduleDefinition.properties.map((propDef) => (
                <ModulePropertyField
                  key={propDef.key}
                  propertyDefinition={propDef}
                  currentValue={ (propDef.type === ModulePropertyType.CURSOR_SELECT) ? selectedCursorValue : currentModuleConfig?.[propDef.key] }
                  onPropertyChange={(value) => handlePropertyChange(propDef.key, value)}
                  // For custom cursor input, provide its specific value and change handler
                  customCursorValue={propDef.key === 'custom_cursor_select' && selectedCursorValue === 'custom' ? customCursorSymbol : undefined}
                  onCustomCursorChange={propDef.key === 'custom_cursor_select' && selectedCursorValue === 'custom' ? (val) => handlePropertyChange('custom_cursor_input', val) : undefined}

                />
              ))}
            </>
          ) : (
            <p className="text-gray-500 italic text-center py-4">Module is disabled. Enable to configure.</p>
          )}
        </div>
      )}
    </div>
  );
};