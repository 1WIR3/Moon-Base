
import React from 'react';
import type { ModulePropertyDefinition, TomlValue } from '../types';
import { ModulePropertyType } from '../types';
import { PREDEFINED_CURSORS } from '../constants';

interface ModulePropertyFieldProps {
  propertyDefinition: ModulePropertyDefinition;
  currentValue?: TomlValue;
  onPropertyChange: (value: string | number | boolean) => void;
  isGlobalSetting?: boolean;
  customCursorValue?: string; // For character module's custom cursor input
  onCustomCursorChange?: (value: string) => void; // For character module
}

export const ModulePropertyField: React.FC<ModulePropertyFieldProps> = ({
  propertyDefinition,
  currentValue,
  onPropertyChange,
  isGlobalSetting = false,
  customCursorValue,
  onCustomCursorChange,
}) => {
  const { key, label, type, description, placeholder, defaultValue, options } = propertyDefinition;

  const value = currentValue !== undefined ? currentValue : defaultValue;

  const commonInputClass = "w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-200 placeholder-gray-500";
  const labelClass = `block text-sm font-medium mb-1 ${isGlobalSetting ? 'text-gray-300' : 'text-gray-300'}`;

  let inputElement: React.ReactNode;

  switch (type) {
    case ModulePropertyType.NUMBER:
      inputElement = (
        <input
          type="number"
          id={key}
          name={key}
          value={value as number ?? ''}
          onChange={(e) => onPropertyChange(parseFloat(e.target.value))}
          placeholder={placeholder || (defaultValue !== undefined ? String(defaultValue) : '')}
          className={commonInputClass}
        />
      );
      break;
    case ModulePropertyType.BOOLEAN:
      inputElement = (
        <div className="flex items-center h-10">
          <label htmlFor={key} className="flex items-center space-x-2 cursor-pointer">
            <div className="relative">
                <input
                    type="checkbox"
                    id={key}
                    name={key}
                    checked={value as boolean ?? false}
                    onChange={(e) => onPropertyChange(e.target.checked)}
                    className="sr-only"
                />
                <div className={`w-10 h-5 rounded-full shadow-inner transition-colors ${value ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
            <span className="text-gray-300">{label}</span>
          </label>
        </div>
      );
      break;
    case ModulePropertyType.TEXTAREA:
      inputElement = (
        <textarea
          id={key}
          name={key}
          value={value as string ?? ''}
          onChange={(e) => onPropertyChange(e.target.value)}
          placeholder={placeholder || (defaultValue !== undefined ? String(defaultValue) : '')}
          className={`${commonInputClass} min-h-[80px] resize-y`}
          rows={3}
        />
      );
      break;
    case ModulePropertyType.CURSOR_SELECT:
        inputElement = (
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <select
            id={key}
            name={key}
            value={value as string ?? PREDEFINED_CURSORS[0].value}
            onChange={(e) => onPropertyChange(e.target.value)}
            className={`${commonInputClass} sm:flex-grow`}
            aria-label={label}
            >
            {PREDEFINED_CURSORS.map(cursor => (
                <option key={cursor.value} value={cursor.value}>{cursor.label}</option>
            ))}
            <option value="custom">Custom...</option>
            </select>
            {value === 'custom' && onCustomCursorChange && (
            <input
                type="text"
                id={`${key}-custom-input`}
                name={`${key}-custom-input`}
                value={customCursorValue || ''}
                onChange={(e) => onCustomCursorChange(e.target.value)}
                placeholder="Custom Symbol"
                className={`${commonInputClass} sm:w-auto`}
                aria-label="Custom cursor symbol"
            />
            )}
        </div>
        );
        break;
    case ModulePropertyType.TEXT:
    case ModulePropertyType.COLOR: 
    default:
      inputElement = (
        <input
          type="text"
          id={key}
          name={key}
          value={value as string ?? ''}
          onChange={(e) => onPropertyChange(e.target.value)}
          placeholder={placeholder || (defaultValue !== undefined ? String(defaultValue) : '')}
          className={commonInputClass}
        />
      );
      break;
  }
  
  if (type === ModulePropertyType.BOOLEAN) {
    return (
      <div>
        {inputElement}
        {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={key} className={labelClass}>
        {label}
      </label>
      {inputElement}
      {description && <p className="mt-1 text-xs text-gray-500">{description}</p>}
    </div>
  );
};
