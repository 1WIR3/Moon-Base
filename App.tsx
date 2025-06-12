
import React, { useState, useEffect, useCallback } from 'react';
import TOML from '@ltd/j-toml';
import { TemplateSelector } from './components/TemplateSelector';
import { ConfigEditorPanel } from './components/ConfigEditorPanel';
import { TomlPreviewPanel } from './components/TomlPreviewPanel';
import { LivePreviewPanel } from './components/LivePreviewPanel';
import { HelpSection } from './components/HelpSection';
import { PREDEFINED_TEMPLATES, STARSHIP_GLOBAL_SETTINGS_DEFINITION, AVAILABLE_MODULES, DUMMY_MODULE_DATA } from './constants';
import type { StarshipConfig, Template, ModuleConfig, TomlValue, PaletteConfig } from './types';
import { downloadFile, readFileAsText } from './utils/fileUtils';
import { ImportIcon, ExportIcon, HelpIcon, GitHubIcon } from './components/icons/EditorIcons'; // Removed BuyMeACoffeeIcon
import { stringifyToml } from './utils/tomlUtils';

const initialConfig: StarshipConfig = PREDEFINED_TEMPLATES[0]?.config || {
  format: "$all",
  add_newline: true,
  scan_timeout: 30,
  command_timeout: 500,
  palette: {}, // Initialize palette
};

const App: React.FC = () => {
  const [currentConfig, setCurrentConfig] = useState<StarshipConfig>(initialConfig);
  const [activeTemplateId, setActiveTemplateId] = useState<string>(PREDEFINED_TEMPLATES[0]?.id || 'custom');
  const [tomlString, setTomlString] = useState<string>('');
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cleanConfigForToml = useCallback((config: StarshipConfig): Record<string, TomlValue> => {
    const cleaned: Record<string, TomlValue> = {};
    
    STARSHIP_GLOBAL_SETTINGS_DEFINITION.forEach(setting => {
      if (config[setting.key] !== undefined) {
        cleaned[setting.key] = config[setting.key] as TomlValue;
      }
    });

    if (config.palette && Object.keys(config.palette).length > 0) {
      cleaned.palette = config.palette as TomlValue;
    }

    AVAILABLE_MODULES.forEach(moduleDef => {
      const moduleKey = moduleDef.id;
      const moduleData = config[moduleKey] as ModuleConfig | undefined;

      if (moduleData) {
        const cleanedModule: Record<string, TomlValue> = {};
        let hasProperties = false;

        if (moduleData.format !== undefined && moduleData.format !== moduleDef.defaultFormat) {
          cleanedModule.format = moduleData.format;
          hasProperties = true;
        }
        if (moduleData.style !== undefined && moduleData.style !== moduleDef.defaultStyle) {
          cleanedModule.style = moduleData.style;
          hasProperties = true;
        }
        if (moduleData.disabled !== undefined ) {
            cleanedModule.disabled = moduleData.disabled;
            hasProperties = true; 
        }

        moduleDef.properties.forEach(propDef => {
          if (moduleData[propDef.key] !== undefined && moduleData[propDef.key] !== propDef.defaultValue) {
            cleanedModule[propDef.key] = moduleData[propDef.key] as TomlValue;
            hasProperties = true;
          }
        });
        
        if (hasProperties || (moduleData.disabled === false && Object.keys(cleanedModule).length === 0)) {
           if(moduleData.disabled === false && Object.keys(cleanedModule).length === 0 && !cleanedModule.hasOwnProperty('disabled')){
             cleanedModule.disabled = false;
           }
           cleaned[moduleKey] = cleanedModule as TomlValue;
        } else if (moduleData.disabled === true) {
            cleaned[moduleKey] = { disabled: true } as TomlValue;
        }
      }
    });
    
    Object.keys(config).forEach(key => {
        if (!STARSHIP_GLOBAL_SETTINGS_DEFINITION.find(s => s.key === key) && 
            !AVAILABLE_MODULES.find(m => m.id === key) && 
            key !== 'palette' && 
            config[key] !== undefined) {
            cleaned[key] = config[key] as TomlValue;
        }
    });

    return cleaned;
  }, []);


  useEffect(() => {
    const generateToml = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const cleaned = cleanConfigForToml(currentConfig);
        const toml = await stringifyToml(cleaned);
        setTomlString(toml);
      } catch (e) {
        console.error("Error generating TOML:", e);
        setError(`Error generating TOML: ${e instanceof Error ? e.message : String(e)}`);
        setTomlString("# Error generating TOML. Please check your configuration.");
      } finally {
        setIsLoading(false);
      }
    };
    generateToml();
  }, [currentConfig, cleanConfigForToml]);

  const handleTemplateSelect = useCallback((template: Template) => {
    const newConfig = JSON.parse(JSON.stringify(template.config)); // Deep copy
    if (!newConfig.palette) { // Ensure palette exists
        newConfig.palette = {};
    }
    setCurrentConfig(newConfig);
    setActiveTemplateId(template.id);
    setError(null);
  }, []);

  const handleConfigChange = useCallback((newConfigPart: Partial<StarshipConfig>) => {
    setCurrentConfig(prevConfig => {
      const updatedConfig = { ...prevConfig, ...newConfigPart };
      if (newConfigPart.hasOwnProperty('palette')) { // If palette is part of the change
        updatedConfig.palette = { ...prevConfig.palette, ...newConfigPart.palette } as PaletteConfig;
      }

      const matchedTemplate = PREDEFINED_TEMPLATES.find(t => 
        JSON.stringify(cleanConfigForToml(t.config)) === JSON.stringify(cleanConfigForToml(updatedConfig))
      );
      setActiveTemplateId(matchedTemplate ? matchedTemplate.id : 'custom');
      return updatedConfig;
    });
  }, [cleanConfigForToml]);
  
  const handlePaletteChange = useCallback((newPalette: PaletteConfig) => {
    setCurrentConfig(prevConfig => {
      const updatedConfig = { ...prevConfig, palette: newPalette };
      const matchedTemplate = PREDEFINED_TEMPLATES.find(t => 
        JSON.stringify(cleanConfigForToml(t.config)) === JSON.stringify(cleanConfigForToml(updatedConfig))
      );
      setActiveTemplateId(matchedTemplate ? matchedTemplate.id : 'custom');
      return updatedConfig;
    });
  }, [cleanConfigForToml]);


  const handleModuleChange = useCallback((moduleName: string, moduleConfig: ModuleConfig | null) => {
    setCurrentConfig(prevConfig => {
      const updatedConfig = { ...prevConfig };
      if (moduleConfig === null) { 
        delete updatedConfig[moduleName];
      } else {
        updatedConfig[moduleName] = moduleConfig;
      }
      
      const matchedTemplate = PREDEFINED_TEMPLATES.find(t => 
        JSON.stringify(cleanConfigForToml(t.config)) === JSON.stringify(cleanConfigForToml(updatedConfig))
      );
      setActiveTemplateId(matchedTemplate ? matchedTemplate.id : 'custom');
      return updatedConfig;
    });
  }, [cleanConfigForToml]);


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setError(null);
      try {
        const content = await readFileAsText(file);
        const parsedConfig = TOML.parse(content) as unknown as StarshipConfig; 
        
        AVAILABLE_MODULES.forEach(moduleDef => {
          if (parsedConfig[moduleDef.id] && typeof parsedConfig[moduleDef.id] === 'object') {
            const modConf = parsedConfig[moduleDef.id] as ModuleConfig;
            if (modConf.disabled === undefined) {
              modConf.disabled = false; 
            }
          }
        });
        if (!parsedConfig.palette) {
            parsedConfig.palette = {};
        }

        setCurrentConfig(parsedConfig);

        const matchedTemplate = PREDEFINED_TEMPLATES.find(t => 
          JSON.stringify(cleanConfigForToml(t.config)) === JSON.stringify(cleanConfigForToml(parsedConfig))
        );
        setActiveTemplateId(matchedTemplate ? matchedTemplate.id : 'custom-imported');

      } catch (e) {
        console.error("Error importing TOML:", e);
        setError(`Error importing TOML: ${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setIsLoading(false);
        event.target.value = ''; 
      }
    }
  };

  const handleExport = () => {
    if (isLoading) {
      setError("Please wait for the current operation to complete before exporting.");
      return;
    }
    if (error && tomlString.startsWith("# Error")) {
      setError("Cannot export due to configuration errors. Please fix them first.");
      return;
    }
    downloadFile(tomlString, 'starship.toml', 'application/toml');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <header className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green-400">
            Moon Base <span className="text-2xl text-gray-300 font-medium">a Starship Visual Editor</span>
          </h1>
          <div className="flex items-center space-x-3">
            <label htmlFor="import-toml" className="p-2 bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer transition-colors tooltip">
              <ImportIcon className="w-5 h-5" />
              <input type="file" id="import-toml" accept=".toml" className="hidden" onChange={handleFileUpload} />
              <span className="tooltiptext">Import starship.toml</span>
            </label>
            <button onClick={handleExport} className="p-2 bg-green-600 hover:bg-green-700 rounded-md transition-colors tooltip" aria-label="Export TOML">
              <ExportIcon className="w-5 h-5" />
              <span className="tooltiptext">Export starship.toml</span>
            </button>
            {/* Removed BuyMeACoffee stubbed link here */}
            <button onClick={() => setShowHelp(prev => !prev)} className={`p-2 rounded-md transition-colors tooltip ${showHelp ? 'bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'}`} aria-label="Toggle Help" aria-pressed={showHelp}>
              <HelpIcon className="w-5 h-5" />
              <span className="tooltiptext">Toggle Help</span>
            </button>
             <a href="https://github.com/starship/starship" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white transition-colors tooltip" aria-label="Starship GitHub">
                <GitHubIcon className="w-6 h-6" />
                <span className="tooltiptext">Starship on GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {error && (
        <div className="container mx-auto mt-4 p-3 bg-red-700 text-white rounded-md shadow">
          <p><strong>Error:</strong> {error}</p>
        </div>
      )}
      {isLoading && !error && ( // Only show loading if no error is present
        <div className="container mx-auto mt-4 p-3 bg-blue-700 text-white rounded-md shadow animate-pulse">
          <p>Processing...</p>
        </div>
      )}

      {/* Main content area adjusted for fixed preview panels at the bottom */}
      <main className="flex-grow container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-[300px]"> {/* Added bottom margin */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          <TemplateSelector
            templates={PREDEFINED_TEMPLATES}
            activeTemplateId={activeTemplateId}
            onSelect={handleTemplateSelect}
          />
        </div>

        <div className="lg:col-span-2 flex flex-col space-y-6">
          <ConfigEditorPanel
            config={currentConfig}
            onConfigChange={handleConfigChange}
            onModuleChange={handleModuleChange}
            onPaletteChange={handlePaletteChange}
            globalSettingsDefinition={STARSHIP_GLOBAL_SETTINGS_DEFINITION}
            availableModules={AVAILABLE_MODULES}
          />
        </div>
      </main>
      
      {/* Sticky Preview Area at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-gray-800 border-t-2 border-green-500 shadow-2xl">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <LivePreviewPanel 
            config={currentConfig} 
            availableModules={AVAILABLE_MODULES}
            dummyModuleData={DUMMY_MODULE_DATA}
          />
          <TomlPreviewPanel tomlString={tomlString} isLoading={isLoading} />
        </div>
      </div>


      {showHelp && <HelpSection onClose={() => setShowHelp(false)} />}
      
      {/* Footer pushed down by fixed preview, so it might not be visible unless page scrolls, or remove it */}
      {/* <footer className="bg-gray-800 p-4 text-center text-sm text-gray-400">
        Moon Base - Craft your perfect prompt!
      </footer> */}
    </div>
  );
};

export default App;