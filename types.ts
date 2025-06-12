
export type TomlValue = string | number | boolean | Date | TomlValue[] | { [key: string]: TomlValue };

export interface ModuleConfig {
  disabled?: boolean;
  format?: string;
  style?: string;
  [key: string]: TomlValue | undefined; // For other module-specific properties
}

export interface PaletteConfig {
  [paletteVar: string]: string; // e.g. primary_color = "green bold"
}

export interface PredefinedPaletteEntry {
  id: string;
  name: string;
  palette: PaletteConfig;
}

export interface StarshipConfig {
  format?: string;
  right_format?: string;
  add_newline?: boolean;
  scan_timeout?: number;
  command_timeout?: number;
  palette?: PaletteConfig; // For [palette] table
  [moduleName: string]: ModuleConfig | TomlValue | PaletteConfig | undefined; // Allows for module configs and other top-level settings like palettes
}

export interface Template {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode; // Icon for the template itself
  config: StarshipConfig;
}

export enum ModulePropertyType {
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  TEXTAREA = 'textarea',
  COLOR = 'color', // For style strings, but could be a color picker in future
  CURSOR_SELECT = 'cursor_select', // Custom type for cursor dropdown
}

export interface ModulePropertyDefinition {
  key: string;
  label: string;
  type: ModulePropertyType;
  description?: string;
  defaultValue?: TomlValue;
  placeholder?: string;
  options?: Array<{value: string | number | boolean, label: string}>; // For select/radio group like properties
}

export interface ModuleDefinition {
  id: string; // e.g., 'nodejs', 'git_branch'
  name: string; // e.g., 'Node.js', 'Git Branch'
  description?: string;
  defaultDisabled?: boolean; // If true, module is off by default. Starship default is most modules off unless configured.
  defaultFormat?: string;
  defaultStyle?: string;
  properties: ModulePropertyDefinition[];
  link?: string; // Link to official documentation for this module
  icon?: React.FC<React.SVGProps<SVGSVGElement>>; // Icon for the module
}

// For custom event detail in ModulePropertyField
export interface CustomChangeEventDetail {
  name: string;
  value: string | number | boolean;
}
export interface CustomChangeEvent extends Event {
  detail: CustomChangeEventDetail;
}

// For properties that are themselves objects (e.g. `[git_status.εταιρεία]`)
// This is a simplification; true nested objects might need more complex UI
export interface NestedProperties {
    [key: string]: ModulePropertyDefinition;
}

// For Live Preview Dummy Data
export interface DummyModuleValues {
  [key: string]: string | number | boolean | string[] | DummyModuleValues; // Example: username: "dev", git_branch: "feature/awesome"
}
export interface DummyModuleData {
    [moduleId: string]: DummyModuleValues;
}

// For Symbol Palette - REMOVED
// export interface SymbolEntry {
//   symbol: string;
//   name: string;
// }
// export interface SymbolCategory {
//   name: string;
//   symbols: SymbolEntry[];
// }
