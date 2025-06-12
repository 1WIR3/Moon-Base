
import React from 'react';
import type { StarshipConfig, ModuleDefinition, DummyModuleData, PaletteConfig, ModuleConfig, TomlValue } from '../types';

interface LivePreviewPanelProps {
  config: StarshipConfig;
  availableModules: ModuleDefinition[];
  dummyModuleData: DummyModuleData;
}

// Helper to parse Starship style strings (simplified)
const parseStyle = (styleString: string, palette: PaletteConfig = {}): React.CSSProperties => {
  const cssStyle: React.CSSProperties = {};
  if (!styleString) return cssStyle;

  // Resolve palette variables first
  let resolvedStyleString = styleString;
  Object.keys(palette).forEach(varName => {
    const regex = new RegExp(`\\$${varName}\\b`, 'g');
    resolvedStyleString = resolvedStyleString.replace(regex, palette[varName]);
  });
  
  const parts = resolvedStyleString.split(/\s+/);
  parts.forEach(part => {
    if (part === 'bold') cssStyle.fontWeight = 'bold';
    else if (part === 'italic') cssStyle.fontStyle = 'italic';
    else if (part === 'underline') cssStyle.textDecoration = 'underline';
    else if (part.startsWith('fg:')) cssStyle.color = part.substring(3);
    else if (part.startsWith('bg:')) cssStyle.backgroundColor = part.substring(3);
    else if (part.match(/^[a-zA-Z]+$/) && !['bold', 'italic', 'underline', 'disabled'].includes(part)) { // Simple color name
        cssStyle.color = part;
    } else if (part.startsWith('#')) { // Hex color
        cssStyle.color = part;
    }
  });
  return cssStyle;
};

// Helper to replace variables in a format string
const replaceVariables = (
    formatStr: string, 
    moduleDataContext: Record<string, any>, // Combined context for the module
    moduleName: string, // For specific handling like 'character'
    globalConfig: StarshipConfig // For global fallbacks if any
  ): string => {
  let result = formatStr;
  
  const allVars = { ...globalConfig, ...moduleDataContext };

  Object.entries(allVars).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      const stringValue = String(value);
      result = result.replace(new RegExp(`\\$${key}\\b`, 'g'), stringValue);
      result = result.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), stringValue);
    }
  });
  
  if (moduleName === 'character') {
    const charModuleConfig = globalConfig.character as ModuleConfig | undefined;
    let successSymbolText = '[❯](green)'; 

    if (charModuleConfig && typeof charModuleConfig.success_symbol === 'string') {
        successSymbolText = charModuleConfig.success_symbol;
    }
    
    const symbolMatch = successSymbolText.match(/^\[(.*?)\]\(.*\)$/);
    const actualSymbol = symbolMatch && symbolMatch[1] ? symbolMatch[1] : successSymbolText;
    // Replace $symbol, but also $success_symbol etc. if they appear in format
    result = result.replace(/\$symbol\b/g, actualSymbol);
    result = result.replace(/\$\{symbol\}/g, actualSymbol);
  }

  return result;
};

const renderSegment = (
    text: string, 
    style: React.CSSProperties, 
    key: string | number
  ): JSX.Element => {
    return <span key={key} style={{...style, whiteSpace: 'pre'}}>{text}</span>;
};


export const LivePreviewPanel: React.FC<LivePreviewPanelProps> = ({ config, availableModules, dummyModuleData }) => {
  
  const renderPrompt = (formatString: string | undefined, isRightPrompt: boolean = false): (JSX.Element | null)[] => {
    if (!formatString) return [];

    const segments: (JSX.Element | null)[] = [];
    let keyIndex = 0;
    
    // Regex to capture:
    // 1. $module_variable
    // 2. [styled_text_with_or_without_$vars](style_string)
    // 3. literal_text (not part of the above)
    const partRegex = /(\$(\w+))|(\[(.+?)\]\((.+?)\))|([^$\[]+)/g;
    
    let match;
    let remainingFormat = formatString; // Work with a copy to track progress if needed, though regex.lastIndex handles it
    
    while ((match = partRegex.exec(remainingFormat)) !== null) {
        // const fullMatch = match[0]; // The entire matched substring
        const moduleVariable = match[2]; // Captured from $(\w+) - the module name
        const styledGroupContentWithVars = match[4]; // Captured from [(.+?)] - content inside brackets
        const styledGroupStyle = match[5]; // Captured from ((.+?)) - style string for the group
        const literalText = match[6]; // Captured from ([^$\[]+) - literal text

        if (moduleVariable) {
            if (moduleVariable === 'line_break') {
                if (!isRightPrompt) { // Right prompts typically don't have line breaks
                    segments.push(<br key={`br-${moduleVariable}-${keyIndex++}`} />);
                }
                continue;
            }

            const moduleDef = availableModules.find(m => m.id === moduleVariable);
            const moduleSettings = config[moduleVariable] as ModuleConfig | undefined;
            
            let moduleActuallyDisabled = moduleDef?.defaultDisabled ?? false;
            if (moduleSettings && typeof moduleSettings.disabled === 'boolean') {
                moduleActuallyDisabled = moduleSettings.disabled;
            }

            if (moduleDef && !moduleActuallyDisabled) {
                let currentModuleFormat = moduleSettings?.format ?? moduleDef.defaultFormat ?? '';
                let determinedModuleStyle = moduleSettings?.style ?? moduleDef.defaultStyle ?? '';
                
                const modulePalette = config.palette || {};
                const cssProperties = parseStyle(determinedModuleStyle, modulePalette);

                const moduleDataContext = {
                    ...(moduleDef || {}), 
                    ...(dummyModuleData[moduleVariable] || {}), 
                    ...(moduleSettings || {}), 
                };
                
                const textContent = replaceVariables(
                    currentModuleFormat,
                    moduleDataContext,
                    moduleVariable,
                    config 
                );

                segments.push(renderSegment(textContent, cssProperties, `${moduleVariable}-${keyIndex++}`));
            }
        } else if (styledGroupContentWithVars && styledGroupStyle) {
            const palette = config.palette || {};
            const cssProperties = parseStyle(styledGroupStyle, palette);
            
            let processedStyledGroupContent = styledGroupContentWithVars;
            const nestedModuleRegex = /\$(\w+)/g; // Regex to find $vars inside the styled group content
            let nestedMatch;

            // Create a temporary string to perform replacements on
            let tempContent = styledGroupContentWithVars;
            
            while((nestedMatch = nestedModuleRegex.exec(styledGroupContentWithVars)) !== null) {
                const nestedModulePlaceholder = nestedMatch[0]; // e.g., $directory
                const nestedModuleName = nestedMatch[1];      // e.g., directory
                
                let textToReplaceWith = ''; // Default to empty if module not found or disabled

                if (nestedModuleName === 'line_break') {
                    if (!isRightPrompt) textToReplaceWith = '\n'; // Represent as newline char for pre/pre-wrap
                } else {
                    const nestedModuleDef = availableModules.find(m => m.id === nestedModuleName);
                    if (nestedModuleDef) {
                        const nestedModuleSettings = config[nestedModuleName] as ModuleConfig | undefined;
                        let nestedModuleActuallyDisabled = nestedModuleDef.defaultDisabled ?? false;
                        if (nestedModuleSettings && typeof nestedModuleSettings.disabled === 'boolean') {
                            nestedModuleActuallyDisabled = nestedModuleSettings.disabled;
                        }

                        if (!nestedModuleActuallyDisabled) {
                            const nestedModuleFormat = nestedModuleSettings?.format ?? nestedModuleDef.defaultFormat ?? '';
                            const nestedModuleDataContext = {
                                ...(nestedModuleDef || {}),
                                ...(dummyModuleData[nestedModuleName] || {}),
                                ...(nestedModuleSettings || {}),
                            };
                            textToReplaceWith = replaceVariables(
                                nestedModuleFormat,
                                nestedModuleDataContext,
                                nestedModuleName,
                                config
                            );
                        }
                    }
                }
                // Replace in tempContent to avoid issues with regex exec on modified string
                tempContent = tempContent.replace(nestedModulePlaceholder, textToReplaceWith);
            }
            processedStyledGroupContent = tempContent; // Assign the fully processed string

            segments.push(renderSegment(processedStyledGroupContent, cssProperties, `styled-${keyIndex++}`));

        } else if (literalText) {
            // For literal text, no specific style from config, use default text style (or inherit)
            segments.push(renderSegment(literalText, {}, `literal-${keyIndex++}`));
        }
    }
    return segments;
  };

  const leftPromptElements = renderPrompt(config.format);
  const rightPromptElements = config.right_format ? renderPrompt(config.right_format, true) : null;

  return (
    <div className="bg-gray-850 p-4 h-[280px] flex flex-col overflow-hidden">
      <h2 className="text-lg font-semibold text-green-300 mb-2">Live Preview</h2>
      <div 
        className="bg-gray-900 p-3 rounded-md flex-grow overflow-x-auto overflow-y-auto whitespace-normal shadow-inner preview-content font-mono text-sm leading-normal"
        // Using overflow-y-auto now allows content with <br> to scroll if it exceeds height.
        // whitespace-normal allows natural wrapping if lines are too long, combined with <br> for explicit breaks.
        // For prompt-like behavior, `whitespace-pre-wrap` for the spans and `whitespace-normal` here might be better.
        // The `whiteSpace: 'pre'` on spans handles spacing within segments.
      >
        <div className="flex justify-between items-end"> {/* Use flex to position left/right */}
            <div className="prompt-left-parts flex-shrink min-w-0"> {/* Allow shrinking and min-width for overflow */}
                {leftPromptElements}
            </div>
            {rightPromptElements && (
            <div className="prompt-right-parts flex-shrink-0 ml-4"> {/* Don't shrink right prompt, add margin */}
                {rightPromptElements}
            </div>
            )}
        </div>
      </div>
    </div>
  );
};
