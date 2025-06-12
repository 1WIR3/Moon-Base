
import TOML from '@ltd/j-toml';
import type { StarshipConfig, TomlValue, ModuleConfig, PaletteConfig } from '../types';
import { ModulePropertyType } from '../types'; // Added import
import { AVAILABLE_MODULES, STARSHIP_GLOBAL_SETTINGS_DEFINITION } from '../constants'; 

const removeUndefined = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(removeUndefined).filter(item => item !== undefined);
  } else if (typeof obj === 'object' && obj !== null && !(obj instanceof Date)) { // Check for Date
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = removeUndefined(obj[key]);
        if (value !== undefined) {
          // For palette, only include if value is a non-empty string
          if (key === 'palette' && typeof value === 'object' && Object.keys(value).length === 0) {
            continue; 
          }
          newObj[key] = value;
        }
      }
    }
    return newObj;
  }
  return obj;
};


export const cleanConfigForStringification = (config: StarshipConfig): Record<string, TomlValue> => {
  let cleanedConfig: Record<string, any> = JSON.parse(JSON.stringify(config)); 

  cleanedConfig = removeUndefined(cleanedConfig);

  // Handle palette: ensure it's an object and not empty if it exists
  if (cleanedConfig.palette) {
    if (typeof cleanedConfig.palette === 'object' && Object.keys(cleanedConfig.palette).length > 0) {
      // Palette is fine
    } else {
      delete cleanedConfig.palette; // Remove empty or invalid palette
    }
  }


  Object.keys(cleanedConfig).forEach(key => {
    if (key === 'palette') return; // Already handled

    const moduleDef = AVAILABLE_MODULES.find(m => m.id === key);
    if (moduleDef && typeof cleanedConfig[key] === 'object' && cleanedConfig[key] !== null) {
      const moduleConfig = cleanedConfig[key] as ModuleConfig;

      if (moduleConfig.disabled === false) {
        let hasOtherCustomizations = false;
        if (moduleConfig.format !== undefined && moduleConfig.format !== moduleDef.defaultFormat) hasOtherCustomizations = true;
        if (moduleConfig.style !== undefined && moduleConfig.style !== moduleDef.defaultStyle) hasOtherCustomizations = true;
        
        moduleDef.properties.forEach(prop => {
          // Skip cursor select pseudo-property
          if (prop.type === ModulePropertyType.CURSOR_SELECT && prop.key === 'custom_cursor_select') return;

          if (moduleConfig[prop.key] !== undefined && moduleConfig[prop.key] !== prop.defaultValue) {
            hasOtherCustomizations = true;
          }
        });
        
        // For character module, success/error/vicmd symbols are important even if derived from cursor
        if (moduleDef.id === 'character') {
            if (moduleConfig.success_symbol !== undefined && moduleConfig.success_symbol !== '[❯](green)') hasOtherCustomizations = true;
            if (moduleConfig.error_symbol !== undefined && moduleConfig.error_symbol !== '[❯](red)') hasOtherCustomizations = true;
            if (moduleConfig.vicmd_symbol !== undefined && moduleConfig.vicmd_symbol !== '[❮](green)') hasOtherCustomizations = true;
        }


        if (!hasOtherCustomizations && moduleDef.id !== 'line_break') {
          // If only `disabled: false` remains, and no other customizations,
          // Starship implicitly enables modules if their section exists.
          // So, `disabled = false` can be removed to make TOML cleaner.
          // delete moduleConfig.disabled; // This makes the TOML more minimal: `[module_name]`
                                        // Keeping it for now for explicitness: `[module_name]\ndisabled = false`
        }
      }
       // Remove pseudo-properties used for UI only (like cursor select dropdown)
      if (moduleDef.id === 'character' && moduleConfig['custom_cursor_select']) {
        delete moduleConfig['custom_cursor_select'];
      }
      if (moduleDef.id === 'character' && moduleConfig['custom_cursor_input']) {
        delete moduleConfig['custom_cursor_input'];
      }


      if (Object.keys(moduleConfig).length === 0 && moduleDef.id !== 'line_break') {
         // delete cleanedConfig[key]; // Potentially too aggressive.
      } else if (Object.keys(moduleConfig).length === 1 && moduleConfig.hasOwnProperty('disabled') && moduleConfig.disabled === false && moduleDef.id !== 'line_break') {
        // If only `disabled = false` is left, starship implies this by section presence.
        // For a cleaner TOML, output `[module_name]` instead of `[module_name]\ndisabled = false`
        // delete moduleConfig.disabled; // Uncomment for minimal TOML
      }
    }
  });
  
  STARSHIP_GLOBAL_SETTINGS_DEFINITION.forEach(gsDef => {
    if (cleanedConfig[gsDef.key] === gsDef.defaultValue) {
        // Optional: remove global settings if they are same as default
        // delete cleanedConfig[gsDef.key];
    }
  });

  return cleanedConfig as Record<string, TomlValue>;
};


export const stringifyToml = async (config: StarshipConfig): Promise<string> => {
  try {
    const cleaned = cleanConfigForStringification(config);
    const tomlString = TOML.stringify(cleaned as Record<string, any>, {
      newline: '\n',
      indent: 2,
      // Ensure specific order for better readability if possible (TOML.stringify sorts keys by default)
      // No standard option for custom sort order in j-toml stringify directly.
      // Could pre-sort keys of `cleaned` object if necessary, but default alphabetical is usually fine.
    });
    return tomlString;
  } catch (e) {
    console.error("Error stringifying TOML:", e);
    throw new Error(`TOML Stringification Error: ${e instanceof Error ? e.message : String(e)}`);
  }
};

export const parseToml = async (tomlString: string): Promise<StarshipConfig> => {
  try {
    const parsed = TOML.parse(tomlString);
    const config = parsed as unknown as StarshipConfig;
    if (!config.palette) {
        config.palette = {}; // Ensure palette object exists
    }
    return config;
  } catch (e) {
    console.error("Error parsing TOML:", e);
    throw new Error(`TOML Parsing Error: ${e instanceof Error ? e.message : String(e)}`);
  }
};