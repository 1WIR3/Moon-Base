
import React, { useState, useEffect, useCallback } from 'react';
import type { PaletteConfig, PredefinedPaletteEntry } from '../types';
import { PREDEFINED_PALETTES } from '../constants'; // Import predefined palettes
import { CloseIcon } from './icons/EditorIcons';

interface PaletteEditorProps {
  currentPalette: PaletteConfig;
  onPaletteChange: (newPalette: PaletteConfig) => void;
}

const extractColorAndStyles = (value: string): { color: string, otherStyles: string[] } => {
  if (!value) return { color: '#ffffff', otherStyles: [] };
  const parts = value.split(/\s+/);
  let color = '';
  const otherStyles: string[] = [];
  const knownKeywords = ['bold', 'italic', 'underline', 'dimmed', 'blink', 'reverse', 'hidden', 'strikethrough'];

  for (const part of parts) {
    if (part.startsWith('#') && (part.length === 4 || part.length === 7)) {
      if (!color) color = part; else otherStyles.push(part);
    } else if (part.startsWith('fg:')) {
      if (!color) color = part.substring(3); else otherStyles.push(part);
    } else if (part.startsWith('bg:')) {
      otherStyles.push(part);
    } else if (/^[a-zA-Z]+$/.test(part) && !knownKeywords.includes(part.toLowerCase()) && CSS.supports('color', part)) {
      if (!color) color = part; else otherStyles.push(part);
    } else {
      otherStyles.push(part);
    }
  }
  if (!color && value.trim() !== '') color = '#ffffff'; 
  else if (!color) color = '#ffffff';
  return { color: color || '#ffffff', otherStyles };
};

const combineColorAndStyles = (newColorHex: string, otherStyles: string[]): string => {
  const newColorPart = newColorHex;
  const filteredStyles = otherStyles.filter(s => !s.startsWith('fg:') && !s.startsWith('#') && !CSS.supports('color',s));
  return [newColorPart, ...filteredStyles].join(' ').trim();
};


export const PaletteEditor: React.FC<PaletteEditorProps> = ({ currentPalette, onPaletteChange }) => {
  const [palette, setPalette] = useState<PaletteConfig>(currentPalette);
  const [selectedPredefinedPaletteId, setSelectedPredefinedPaletteId] = useState<string>('custom');
  const [newVarName, setNewVarName] = useState<string>('');
  const [newVarValue, setNewVarValue] = useState<string>('');
  const [newVarNameError, setNewVarNameError] = useState<string | null>(null);

  useEffect(() => {
    setPalette(currentPalette);
    // Try to match currentPalette with a predefined one to set the dropdown correctly
    const matchedPalette = PREDEFINED_PALETTES.find(p => 
        JSON.stringify(p.palette) === JSON.stringify(currentPalette)
    );
    setSelectedPredefinedPaletteId(matchedPalette ? matchedPalette.id : 'custom');

  }, [currentPalette]);

  const validateNewVarName = useCallback((name: string) => {
    if (!name.trim()) {
      setNewVarNameError('Name cannot be empty.');
      return false;
    }
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name.trim())) {
      setNewVarNameError('Invalid name (letters, numbers, underscores only, cannot start with number).');
      return false;
    }
    if (palette.hasOwnProperty(name.trim())) {
      setNewVarNameError('Name already exists.');
      return false;
    }
    setNewVarNameError(null);
    return true;
  }, [palette]);

  useEffect(() => {
    if (newVarName) validateNewVarName(newVarName);
  }, [newVarName, validateNewVarName]);

  const handlePredefinedPaletteSelect = (id: string) => {
    setSelectedPredefinedPaletteId(id);
    if (id === 'custom') {
      // If user selects "Custom", we don't change the palette immediately
      // unless they want to clear it (perhaps add a "Clear Custom" button later)
      // For now, selecting "Custom" means they are managing variables manually.
      // If current palette IS a predefined one, and they switch to "Custom", it should keep the values.
    } else {
      const selected = PREDEFINED_PALETTES.find(p => p.id === id);
      if (selected) {
        setPalette(selected.palette);
        onPaletteChange(selected.palette);
      }
    }
  };

  const handlePaletteVarChange = (varName: string, value: string) => {
    const updatedPalette = { ...palette, [varName]: value };
    setPalette(updatedPalette);
    onPaletteChange(updatedPalette);
    setSelectedPredefinedPaletteId('custom'); // Any manual change makes it custom
  };
  
  const handlePaletteColorPickerChange = (varName: string, newHexColor: string) => {
    const currentValue = palette[varName] || '';
    const { otherStyles } = extractColorAndStyles(currentValue);
    const updatedValue = combineColorAndStyles(newHexColor, otherStyles);
    handlePaletteVarChange(varName, updatedValue);
  };

  const handleRemovePaletteVar = (varName: string) => {
    const { [varName]: _, ...restPalette } = palette;
    setPalette(restPalette);
    onPaletteChange(restPalette);
    setSelectedPredefinedPaletteId('custom');
  };

  const handleAddPaletteVar = () => {
    if (validateNewVarName(newVarName)) {
      const updatedPalette = { ...palette, [newVarName.trim()]: newVarValue.trim() || '#ffffff bold' };
      setPalette(updatedPalette);
      onPaletteChange(updatedPalette);
      setNewVarName('');
      setNewVarValue('');
      setNewVarNameError(null);
      setSelectedPredefinedPaletteId('custom');
    }
  };
  
  const handleNewVarValueChange = (value: string) => {
    setNewVarValue(value);
  };

  const handleNewVarColorPickerChange = (newHexColor: string) => {
    const { otherStyles } = extractColorAndStyles(newVarValue);
    const updatedValue = combineColorAndStyles(newHexColor, otherStyles);
    setNewVarValue(updatedValue);
  };

  const commonInputClass = "p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none transition-colors text-gray-200 placeholder-gray-500";
  const colorInputClass = "p-0 h-10 w-10 bg-gray-700 border border-gray-600 rounded-md cursor-pointer focus:ring-1 focus:ring-green-500 focus:border-green-500 outline-none appearance-none";

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="predefinedPaletteSelect" className="block text-sm font-medium text-gray-300 mb-1">
          Select Predefined Palette
        </label>
        <select
          id="predefinedPaletteSelect"
          value={selectedPredefinedPaletteId}
          onChange={(e) => handlePredefinedPaletteSelect(e.target.value)}
          className={`${commonInputClass} w-full`}
        >
          <option value="custom">Custom / None</option>
          {PREDEFINED_PALETTES.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-400">
        Define named variables for your color schemes (e.g., <code className="bg-gray-700 p-0.5 rounded text-xs">my_blue = "blue bold"</code>).
        Use them in module style strings (e.g., <code className="bg-gray-700 p-0.5 rounded text-xs">style = "$my_blue"</code>).
        This manages the <code className="bg-gray-700 p-0.5 rounded text-xs">[palette]</code> table.
      </p>

      {Object.keys(palette).length === 0 && selectedPredefinedPaletteId === 'custom' && (
        <p className="text-sm text-gray-400 italic">No custom palette variables defined. Select a predefined palette or add new variables.</p>
      )}

      {Object.entries(palette).map(([varName, varValue]) => {
        const { color: currentColorForPicker } = extractColorAndStyles(varValue);
        return (
          <div key={varName} className="flex items-center space-x-2">
            <input
              type="text"
              value={varName}
              readOnly
              className={`${commonInputClass} w-1/3 font-medium text-gray-400 cursor-not-allowed`}
              aria-label={`Palette variable name ${varName}`}
            />
            <input
              type="color"
              value={currentColorForPicker}
              onChange={(e) => handlePaletteColorPickerChange(varName, e.target.value)}
              className={colorInputClass}
              aria-label={`Color picker for ${varName}`}
              title={`Color picker for ${varName}`}
            />
            <input
              type="text"
              value={varValue}
              onChange={(e) => handlePaletteVarChange(varName, e.target.value)}
              placeholder="e.g., green bold or #aabbcc"
              className={`${commonInputClass} flex-grow`}
              aria-label={`Palette variable value for ${varName}`}
            />
            <button
              onClick={() => handleRemovePaletteVar(varName)}
              className="p-2 bg-red-600 hover:bg-red-700 rounded-md text-white transition-colors flex-shrink-0"
              aria-label={`Remove palette variable ${varName}`}
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        );
      })}

      <div className="pt-4 border-t border-gray-700 space-y-3">
        <h4 className="text-md font-semibold text-green-200">Add New Variable (Custom Palette)</h4>
        <div>
          <label htmlFor="newVarName" className="block text-xs font-medium text-gray-400 mb-1">Variable Name</label>
          <input
            type="text"
            id="newVarName"
            value={newVarName}
            onChange={(e) => setNewVarName(e.target.value)}
            placeholder="e.g., primary_color"
            className={`${commonInputClass} w-full ${newVarNameError ? 'border-red-500' : ''}`}
            aria-describedby={newVarNameError ? "newVarName-error" : undefined}
          />
          {newVarNameError && <p id="newVarName-error" className="mt-1 text-xs text-red-400">{newVarNameError}</p>}
        </div>
        
        <div>
          <label htmlFor="newVarValue" className="block text-xs font-medium text-gray-400 mb-1">Value (Color and Styles)</label>
          <div className="flex items-center space-x-2">
            <input
                type="color"
                value={extractColorAndStyles(newVarValue).color}
                onChange={(e) => handleNewVarColorPickerChange(e.target.value)}
                className={colorInputClass}
                aria-label="Color picker for new variable value"
                title="Color picker for new variable value"
            />
            <input
              type="text"
              id="newVarValue"
              value={newVarValue}
              onChange={(e) => handleNewVarValueChange(e.target.value)}
              placeholder="e.g., blue bold underline or #RRGGBB"
              className={`${commonInputClass} w-full`}
            />
          </div>
        </div>
        <button
          onClick={handleAddPaletteVar}
          className="p-2 bg-green-600 hover:bg-green-700 rounded-md text-white transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          aria-label="Add new palette variable"
          disabled={!!newVarNameError || !newVarName.trim()}
        >
          Add Variable
        </button>
      </div>
    </div>
  );
};
