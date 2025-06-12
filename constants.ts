
import type { Template, ModuleDefinition, ModulePropertyDefinition, DummyModuleData, PredefinedPaletteEntry, PaletteConfig } from './types';
import { ModulePropertyType } from './types';
import { 
    NodeJsIcon, DirectoryIcon, GitBranchIcon, CharacterIcon, TimeIcon, RustIcon, PackageIcon, PythonIcon, 
    KubernetesIcon, AwsIcon, DockerIcon, CmdDurationIcon,
    GitCommitIcon, GitStatusIcon, UsernameIcon, HostnameIcon, LineBreakIcon, CondaIcon, DotNetIcon, GolangIcon, JavaIcon, PhpIcon, RubyIcon, SwiftIcon, TerraformIcon 
} from './components/icons/ModuleIcons'; 
import React from 'react';

export const PREDEFINED_CURSORS: Array<{value: string, label: string, actual_symbol: string}> = [
  { value: "❯", label: "❯ (Chevron)", actual_symbol: "❯" },
  { value: "➜", label: "➜ (Arrow)", actual_symbol: "➜" },
  { value: "▶", label: "▶ (Triangle)", actual_symbol: "▶" },
  { value: "$", label: "$ (Dollar)", actual_symbol: "$" },
  { value: "#", label: "# (Hash)", actual_symbol: "#" },
  { value: "ϟ", label: "ϟ (Lightning)", actual_symbol: "ϟ" },
  { value: "λ", label: "λ (Lambda)", actual_symbol: "λ" },
  { value: "🚀", label: "🚀 (Rocket)", actual_symbol: "🚀" },
];


export const PREDEFINED_TEMPLATES: Template[] = [
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'A very basic and clean prompt, good for starting out.',
    icon: React.createElement(CharacterIcon, {className: "w-5 h-5 text-gray-400"}),
    config: {
      format: '$directory$git_branch$character',
      add_newline: true,
      command_timeout: 1000,
      directory: {
        disabled: false,
        truncation_length: 3,
        format: "[$path]($style) ",
        style: "cyan bold",
      },
      git_branch: {
        disabled: false,
        format: "[$symbol$branch]($style) ",
        style: "yellow bold",
        symbol: " ",
      },
      character: {
        disabled: false,
        format: "$symbol ",
        success_symbol: "[❯](green)",
        error_symbol: "[❯](red)",
        vicmd_symbol: "[❮](green)",
      },
    },
  },
  {
    id: 'full-stack-dev',
    name: 'Full Stack Developer',
    description: 'Comprehensive prompt with Node.js, Git, time, and more.',
    icon: React.createElement(NodeJsIcon, {className: "w-5 h-5 text-green-400"}),
    config: {
      format: '$username$hostname$directory$git_branch$git_status$nodejs$cmd_duration$time$line_break$character',
      add_newline: false,
      scan_timeout: 50,
      command_timeout: 1500,
      username: { disabled: false, style_user: "yellow bold", style_root: "red bold", format: "[$user]($style) on " },
      hostname: { disabled: false, style: "green dimmed bold", format: "[$hostname]($style) in " , ssh_only: false},
      directory: {
        disabled: false,
        truncation_length: 4,
        truncate_to_repo: true,
        format: "[$path]($style)[$read_only]($read_only_style) ",
        style: "blue bold",
        read_only: "🔒",
        read_only_style: "red",
      },
      git_branch: {
        disabled: false,
        format: "[$symbol$branch(:$remote_branch)]($style) ",
        style: "bright-purple bold",
        symbol: " ",
      },
      git_status: {
        disabled: false,
        format: "([$all_status$ahead_behind]($style)) ",
        style: "red bold",
        conflicted: "=", ahead: "⇡", behind: "⇣", diverged: "⇕", untracked: "?", stashed: "$", modified: "!", staged: "+", renamed: "»", deleted: "✘",
      },
      nodejs: { disabled: false, format: "via [ $version](green bold) ", symbol: " " },
      cmd_duration: { disabled: false, min_time: 500, format: "took [$duration]($style) ", style: "yellow dimmed" },
      time: { disabled: false, use_12hr: false, format: "at [$time]($style) ", style: "white dimmed" },
      line_break: { disabled: false },
      character: { disabled: false, success_symbol: "[❯](green bold)", error_symbol: "[❯](red bold)", vicmd_symbol: "[❮](blue bold)" },
    },
  },
   {
    id: 'devops-engineer',
    name: 'DevOps Engineer',
    description: 'Prompt tailored for DevOps tasks, showing K8s, AWS, Docker etc.',
    icon: React.createElement(KubernetesIcon, {className: "w-5 h-5 text-blue-400"}),
    config: {
      format: '$directory$git_branch$kubernetes$aws$docker$line_break$character',
      add_newline: false,
      kubernetes: { disabled: false, format: '[⛵ $context(::$namespace)]($style) ', style: 'cyan bold', symbol: '⛵'},
      aws: { disabled: false, format: '[☁️ $profile@$region]($style) ', style: 'yellow bold', symbol: '☁️ '},
      docker: { disabled: false, format: '[🐳 $context]($style) ', style: 'blue bold', symbol: '🐳 '},
      directory: { disabled: false, truncation_length: 3, format: "[$path]($style) ", style: "green bold"},
      git_branch: { disabled: false, format: "[$symbol$branch]($style) ", style: "magenta bold", symbol: " "},
      line_break: { disabled: false },
      character: { disabled: false, success_symbol: "[⚙️](green)", error_symbol: "[🔥](red)"},
    },
  },
  {
    id: 'rustacean-delight',
    name: 'Rustacean Delight',
    description: 'A Rust developer focused prompt with cargo package info.',
    icon: React.createElement(RustIcon, {className: "w-5 h-5 text-orange-500"}),
    config: {
        format: '$directory$git_branch$rust$package$line_break$character',
        add_newline: true,
        directory: { disabled: false, style: "blue", format: "in [$path]($style) " },
        git_branch: { disabled: false, style: "purple", symbol: "🦀 ", format: "on [$symbol$branch]($style) " },
        rust: { disabled: false, style: "orange", format: "with [$symbol($version)]($style) " },
        package: { disabled: false, style: "green", format: "pkg [$version]($style) "},
        line_break: { disabled: false },
        character: { disabled: false, success_symbol: "[🦀](green)", error_symbol: "[🔥](red)" }
    }
  },
  {
    id: 'pythonista-path',
    name: 'Pythonista Path',
    description: 'Shows Python virtual environment and version.',
    icon: React.createElement(PythonIcon, {className: "w-5 h-5 text-yellow-400"}),
    config: {
      format: '$directory$git_branch$python$line_break$character',
      add_newline: false,
      directory: { disabled: false, style: "cyan", format: "[$path]($style) " },
      git_branch: { disabled: false, style: "magenta", symbol: "🐍 ", format: "[$symbol$branch]($style) " },
      python: { disabled: false, style: "yellow bold", pyenv_version_name: true, format: 'via [${symbol}${pyenv_prefix}(${version})(\($virtualenv\))]($style) ' },
      line_break: { disabled: false },
      character: { disabled: false, success_symbol: "[🐍❯](green)", error_symbol: "[🐍❯](red)" }
    }
  },
  {
    id: 'powerline-basic',
    name: 'Powerline Basic',
    description: 'A simple prompt with Powerline-style separators.',
    icon: React.createElement(CharacterIcon, {className: "w-5 h-5 text-red-400"}),
    config: {
      format: "$username$hostname$directory$git_branch$character",
      palette: {
        p_fg: "black",
        p_bg1: "blue",
        p_bg2: "green",
        p_bg3: "yellow",
        p_bg4: "red",
      },
      username: { disabled: false, style_user: "bold $p_fg bg:$p_bg1", style_root: "bold $p_fg bg:$p_bg4", format: "[$user]($style)[](fg:$p_bg1 bg:$p_bg2)" },
      hostname: { disabled: false, style: "bold $p_fg bg:$p_bg2", format: "[$hostname]($style)[](fg:$p_bg2 bg:$p_bg3)", ssh_only: false },
      directory: { disabled: false, style: "bold $p_fg bg:$p_bg3", format: "[$path]($style)[](fg:$p_bg3 bg:NONE)", truncation_length: 3 },
      git_branch: { disabled: false, style: "bold $p_fg bg:$p_bg2", symbol:" ", format: "[ $symbol$branch ]($style)[](fg:$p_bg2 bg:NONE) " },
      character: { disabled: false, success_symbol: "[❯](bold green)", error_symbol: "[❯](bold red)" }
    }
  },
  {
    id: 'powerline-detailed',
    name: 'Powerline Detailed',
    description: 'More detailed prompt with Powerline-style separators and more modules.',
    icon: React.createElement(CharacterIcon, {className: "w-5 h-5 text-purple-400"}),
    config: {
      format: "$username$hostname$directory$git_branch$git_status$cmd_duration$time$line_break$character",
      add_newline: true,
      palette: {
        p_fg: "white",
        p_user_bg: "blue",
        p_host_bg: "cyan",
        p_dir_bg: "green",
        p_git_bg: "yellow",
        p_git_fg: "black",
        p_status_bg: "red",
        p_cmd_bg: "magenta",
        p_time_bg: "gray",
      },
      username: { disabled: false, style_user: "$p_fg bg:$p_user_bg bold", format: "[$user]($style)[](fg:$p_user_bg bg:$p_host_bg)"},
      hostname: { disabled: false, style: "$p_fg bg:$p_host_bg bold", format: "[$hostname]($style)[](fg:$p_host_bg bg:$p_dir_bg)", ssh_only: false},
      directory: { disabled: false, style: "$p_fg bg:$p_dir_bg bold", format: "[$path]($style)[](fg:$p_dir_bg bg:$p_git_bg)", truncation_length: 3},
      git_branch: { disabled: false, style: "$p_git_fg bg:$p_git_bg bold", symbol: " ", format: "[$symbol$branch]($style)[](fg:$p_git_bg bg:$p_status_bg)"},
      git_status: { disabled: false, style: "$p_fg bg:$p_status_bg", format: "[$all_status$ahead_behind]($style)[](fg:$p_status_bg bg:$p_cmd_bg)"},
      cmd_duration: { disabled: false, style: "$p_fg bg:$p_cmd_bg", format: "[$duration]($style)[](fg:$p_cmd_bg bg:$p_time_bg)"},
      time: { disabled: false, style: "$p_fg bg:$p_time_bg", format: "[$time]($style)[](fg:$p_time_bg bg:NONE)"},
      line_break: { disabled: false },
      character: { disabled: false, success_symbol: "[❯](bold green)", error_symbol: "[❯](bold red)"},
    }
  },
  {
    id: 'box-bar-rust',
    name: 'Box Bar Rust',
    description: 'The requested box-drawing style prompt, focused on Rust.',
    icon: React.createElement(RustIcon, {className: "w-5 h-5 text-green-500"}),
    config: {
        format: `[┌───────────────────>](bold green)
[│](bold green)$directory$rust$package
[└─>](bold green)$character`,
        add_newline: false,
        directory: { disabled: false, style: "cyan bold", format: " [$path]($style)"},
        rust: { disabled: false, style: "orange bold", format: " [$symbol$version]($style)"},
        package: { disabled: false, style: "yellow bold", format: " [$version]($style)"},
        character: { disabled: false, success_symbol: "[ ](bold green)", error_symbol: "[ ](bold red)"} // Symbol part of format
    }
  },
  {
    id: 'emoji-fun',
    name: 'Emoji Fun',
    description: 'A playful prompt using emojis for symbols.',
    icon: React.createElement(CharacterIcon, {className: "w-5 h-5 text-yellow-500"}), // Placeholder
    config: {
      format: '$directory$git_branch$nodejs$line_break$character',
      add_newline: true,
      directory: { disabled: false, style: "blue", format: "[📁 $path]($style) " },
      git_branch: { disabled: false, style: "purple", symbol: "🌿", format: "[$symbol $branch]($style) " },
      nodejs: { disabled: false, style: "green", symbol: "🟩", format: "[$symbol $version]($style) " },
      line_break: { disabled: false },
      character: { disabled: false, success_symbol: "[🥳](green)", error_symbol: "[😡](red)" }
    }
  },
  {
    id: 'pure-text-prompt',
    name: 'Pure Text Prompt',
    description: 'No special symbols, just text and colors. Good for terminals without Nerd Fonts.',
    icon: React.createElement(CharacterIcon, {className: "w-5 h-5 text-blue-300"}),
    config: {
      format: '$username@$hostname: $directory ($git_branch) $character',
      add_newline: false,
      username: { disabled: false, style_user: "yellow bold", show_always: true },
      hostname: { disabled: false, style: "green bold", ssh_only: false },
      directory: { disabled: false, style: "blue bold", truncation_length: 3 },
      git_branch: { disabled: false, style: "magenta bold", symbol: "git:", format: "[$symbol$branch]($style)" },
      character: { disabled: false, success_symbol: "[>](green)", error_symbol: "[x](red)" }
    }
  },
  {
    id: 'double-line-info',
    name: 'Double Line Info',
    description: 'Information on the first line, prompt character on the second.',
    icon: React.createElement(CmdDurationIcon, {className: "w-5 h-5 text-teal-400"}),
    config: {
      format: '$username$hostname$directory$git_branch$git_status$cmd_duration$time$line_break$character',
      add_newline: false, 
      username: { disabled: false, style_user: "yellow bold", format: "[$user]($style) " },
      hostname: { disabled: false, style: "green", format: "on [$hostname]($style) " , ssh_only: false},
      directory: { disabled: false, style: "blue", format: "in [$path]($style) "},
      git_branch: { disabled: false, style: "purple", symbol: "br:", format: "[$symbol$branch]($style) "},
      git_status: { disabled: false, style: "red", format: "[$all_status$ahead_behind]($style) "},
      cmd_duration: { disabled: false, style: "cyan", format: "took [$duration]($style) "},
      time: { disabled: false, style: "white", format: "at [$time]($style) "},
      line_break: { disabled: false },
      character: { disabled: false, success_symbol: "[➜](bold green)", error_symbol: "[➜](bold red)"},
    }
  },
  {
    id: 'minimalist-arrow',
    name: 'Minimalist Arrow',
    description: 'A very simple prompt with just directory and an arrow.',
    icon: React.createElement(CharacterIcon, {className: "w-5 h-5 text-gray-400"}),
    config: {
      format: '$directory $character',
      add_newline: false,
      directory: {
        disabled: false,
        truncation_length: 2,
        style: "bold #88c0d0", 
      },
      character: {
        disabled: false,
        success_symbol: "[->](bold #a3be8c)", 
        error_symbol: "[->](bold #bf616a)",   
      },
    },
  },
  {
    id: 'box-bar-general',
    name: 'Box Bar General',
    description: 'Box style prompt with common dev modules.',
    icon: React.createElement(DirectoryIcon, {className: "w-5 h-5 text-cyan-400"}),
    config: {
        format: `[┌───────────────────>](bold cyan)
[│](bold cyan)$directory$git_branch$cmd_duration
[└─>](bold cyan)$character`,
        add_newline: false,
        directory: { disabled: false, style: "white bold", format: " [$path]($style)"},
        git_branch: { disabled: false, style: "yellow bold", format: " [$symbol$branch]($style)", symbol: " "},
        cmd_duration: { disabled: false, style: "magenta", format: " (took $duration)"},
        character: { disabled: false, success_symbol: "[ ](bold cyan)", error_symbol: "[ ](bold red)"}
    }
  },
  {
    id: 'box-bar-compact',
    name: 'Box Bar Compact',
    description: 'A very short and compact box style prompt.',
    icon: React.createElement(CharacterIcon, {className: "w-5 h-5 text-yellow-400"}),
    config: {
        format: `[╭─ᐳ](bold yellow)
[│](bold yellow)$directory
[╰─ᐳ](bold yellow)$character`,
        add_newline: false,
        directory: { disabled: false, style: "white", format: " [$path]($style)"},
        character: { disabled: false, success_symbol: "[ ](bold yellow)", error_symbol: "[ ](bold red)"}
    }
  },
  {
    id: 'powerline-minimalist-gray',
    name: 'Powerline Minimalist (Gray)',
    description: 'A subdued Powerline prompt with fewer modules.',
    icon: React.createElement(CharacterIcon, {className: "w-5 h-5 text-gray-400"}),
    config: {
      format: "$directory$git_branch$character",
      palette: {
        pl_fg: "white",
        pl_bg1: "#4A5568", // gray-600
        pl_bg2: "#718096", // gray-500
      },
      directory: { disabled: false, style: "bold $pl_fg bg:$pl_bg1", format: "[$path]($style)[](fg:$pl_bg1 bg:$pl_bg2)", truncation_length: 3 },
      git_branch: { disabled: false, style: "bold $pl_fg bg:$pl_bg2", symbol:" ", format: "[ $symbol$branch ]($style)[](fg:$pl_bg2 bg:NONE) " },
      character: { disabled: false, success_symbol: "[❯](bold green)", error_symbol: "[❯](bold red)" }
    }
  },
  {
    id: 'powerline-techy-green', 
    name: 'Powerline Techy (Green)',
    description: 'A more detailed Powerline prompt with a "tech" feel.',
    icon: React.createElement(NodeJsIcon, {className: "w-5 h-5 text-green-500"}),
    config: {
      format: "$username$hostname$directory$git_branch$nodejs$kubernetes$line_break$character",
      add_newline: false,
      palette: {
        pt_fg: "black",
        pt_fg_alt: "#CEFFFE",
        pt_bg_user: "#38A169", 
        pt_bg_host: "#48BB78", 
        pt_bg_dir: "#68D391", 
        pt_bg_git: "#9AE6B4", 
        pt_bg_node: "#38A169",
        pt_bg_k8s: "#48BB78",
      },
      username: { disabled: false, style_user: "$pt_fg_alt bg:$pt_bg_user bold", format: "[$user]($style)[](fg:$pt_bg_user bg:$pt_bg_host)"},
      hostname: { disabled: false, style: "$pt_fg_alt bg:$pt_bg_host bold", format: "[$hostname]($style)[](fg:$pt_bg_host bg:$pt_bg_dir)", ssh_only: false},
      directory: { disabled: false, style: "$pt_fg bg:$pt_bg_dir bold", format: "[$path]($style)[](fg:$pt_bg_dir bg:$pt_bg_git)", truncation_length: 3},
      git_branch: { disabled: false, style: "$pt_fg bg:$pt_bg_git bold", symbol: " ", format: "[$symbol$branch]($style)[](fg:$pt_bg_git bg:$pt_bg_node)"},
      nodejs: { disabled: false, style: "$pt_fg bg:$pt_bg_node bold", symbol: " ", format: "via [$symbol$version]($style)[](fg:$pt_bg_node bg:$pt_bg_k8s)" },
      kubernetes: { disabled: false, style: "$pt_fg_alt bg:$pt_bg_k8s bold", symbol: "⛵", format: "[$symbol$context]($style)[](fg:$pt_bg_k8s bg:NONE)" },
      line_break: { disabled: false },
      character: { disabled: false, success_symbol: "[🚀](bold $pt_fg_alt)", error_symbol: "[🔥](bold red)" },
    }
  },
  {
    id: 'showcase-all-modules',
    name: 'Showcase All Modules',
    description: 'Displays almost all available modules for a comprehensive overview.',
    icon: React.createElement(PackageIcon, {className: "w-5 h-5 text-indigo-400"}),
    config: {
      format: "$username$hostname$directory$line_break$git_branch$git_commit$git_status$line_break$cmd_duration$time$line_break$nodejs$python$rust$golang$java$dotnet$ruby$php$swift$terraform$kubernetes$aws$docker$conda$package$line_break$character",
      add_newline: true,
      palette: {
        section_style: "dimmed"
      },
      username: { disabled: false, format: "[$user]($style) ", style: "yellow bold"},
      hostname: { disabled: false, format: "on [$hostname]($style) ", style: "green bold", ssh_only: false},
      directory: { disabled: false, format: "in [$path]($style) ", style: "blue bold", truncation_length: 3},
      git_branch: { disabled: false, format: "git:[$symbol$branch]($style) ", style: "purple bold", symbol: ""},
      git_commit: { disabled: false, format: "commit:[$hash$tag]($style) ", style: "cyan", tag_symbol: "🏷️"},
      git_status: { disabled: false, format: "status:[$all_status$ahead_behind]($style) ", style: "red"},
      cmd_duration: { disabled: false, format: "took [$duration]($style) ", style: "yellow"},
      time: { disabled: false, format: "at [$time]($style) ", style: "white"},
      nodejs: { disabled: false, format: "node:[$symbol$version]($style) ", style: "green"},
      python: { disabled: false, format: "py:[$symbol$version$virtualenv]($style) ", style: "yellow"},
      rust: { disabled: false, format: "rust:[$symbol$version]($style) ", style: "orange"},
      golang: { disabled: false, format: "go:[$symbol$version]($style) ", style: "cyan"},
      java: { disabled: false, format: "java:[$symbol$version]($style) ", style: "red"},
      dotnet: { disabled: false, format: ".NET:[$symbol$version]($style) ", style: "purple"},
      ruby: { disabled: false, format: "rb:[$symbol$version]($style) ", style: "red bold"},
      php: { disabled: false, format: "php:[$symbol$version]($style) ", style: "blue"},
      swift: { disabled: false, format: "swift:[$symbol$version]($style) ", style: "orange"},
      terraform: { disabled: false, format: "tf:[$symbol$workspace]($style) ", style: "magenta"},
      kubernetes: { disabled: false, format: "k8s:[$symbol$context]($style) ", style: "cyan bold"},
      aws: { disabled: false, format: "aws:[$symbol$profile@$region]($style) ", style: "yellow bold"},
      docker: { disabled: false, format: "docker:[$symbol$context]($style) ", style: "blue bold"},
      conda: { disabled: false, format: "conda:[$symbol$environment]($style) ", style: "green"},
      package: { disabled: false, format: "pkg:[$symbol$version]($style) ", style: "white"},
      line_break: { disabled: false },
      character: { disabled: false, success_symbol: "[❯](bold green)", error_symbol: "[❯](bold red)"},
    }
  },
  {
    id: 'right-prompt-contextual',
    name: 'Right Prompt: Contextual Info',
    description: 'Displays time and Kubernetes context on the right prompt.',
    icon: React.createElement(TimeIcon, {className: "w-5 h-5 text-blue-300"}),
    config: {
      format: '$directory$git_branch$character',
      right_format: '$kubernetes$time',
      add_newline: true,
      directory: { disabled: false, style: "cyan bold", format: "[$path]($style) "},
      git_branch: { disabled: false, style: "yellow bold", format: "[$symbol$branch]($style) ", symbol: " "},
      kubernetes: { disabled: false, format: '[⛵ $context(::$namespace)]($style) ', style: 'dimmed blue', symbol: '⛵'},
      time: { disabled: false, use_12hr: true, format: "[$time]($style) ", style: "dimmed white"},
      character: { disabled: false, success_symbol: "[❯](green)", error_symbol: "[❯](red)"}
    }
  },
  {
    id: 'right-prompt-git-heavy',
    name: 'Right Prompt: Git Focus',
    description: 'Puts detailed Git status and commit info on the right.',
    icon: React.createElement(GitStatusIcon, {className: "w-5 h-5 text-red-400"}),
    config: {
      format: '$directory$character',
      right_format: '$git_branch$git_commit$git_status',
      add_newline: true,
      directory: { disabled: false, style: "blue bold", format: "[$path]($style) "},
      git_branch: { disabled: false, style: "yellow bold", format: "[$symbol$branch]($style) ", symbol: " "},
      git_commit: { disabled: false, format: "[$hash]($style) ", style: "dimmed green"},
      git_status: { disabled: false, format: "([$all_status$ahead_behind]($style))", style: "dimmed red"},
      character: { disabled: false, success_symbol: "[❯](green)", error_symbol: "[❯](red)"}
    }
  },
  {
    id: 'right-prompt-minimal-status',
    name: 'Right Prompt: Minimal Status',
    description: 'A very clean left prompt with command duration on the right.',
    icon: React.createElement(CmdDurationIcon, {className: "w-5 h-5 text-yellow-300"}),
    config: {
      format: '$character',
      right_format: '$cmd_duration',
      add_newline: false,
      cmd_duration: { disabled: false, min_time: 100, format: "[$duration]($style)", style: "dimmed yellow"},
      character: { disabled: false, success_symbol: "[❯](bold green)", error_symbol: "[❯](bold red)"}
    }
  }
];


export const PREDEFINED_PALETTES: PredefinedPaletteEntry[] = [
  {
    id: 'nord',
    name: 'Nord',
    palette: {
      nord0: "#2E3440", nord1: "#3B4252", nord2: "#434C5E", nord3: "#4C566A", 
      nord4: "#D8DEE9", nord5: "#E5E9F0", nord6: "#ECEFF4", 
      nord7: "#8FBCBB", nord8: "#88C0D0", nord9: "#81A1C1", nord10: "#5E81AC", 
      nord11: "#BF616A", nord12: "#D08770", nord13: "#EBCB8B", nord14: "#A3BE8C", nord15: "#B48EAD", 
      bg_default: "$nord0", text_default: "$nord4",
      accent_blue: "$nord10", accent_green: "$nord14", accent_red: "$nord11", accent_yellow: "$nord13",
      git_branch_bg: "$nord2", git_branch_fg: "$nord8",
      dir_style: "$nord8 bold", char_success: "$nord14 bold", char_error: "$nord11 bold"
    }
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    palette: {
      base03:  "#002b36", base02:  "#073642", base01:  "#586e75", base00:  "#657b83",
      base0:   "#839496", base1:   "#93a1a1", base2:   "#eee8d5", base3:   "#fdf6e3",
      yellow:  "#b58900", orange:  "#cb4b16", red:     "#dc322f", magenta: "#d33682",
      violet:  "#6c71c4", blue:    "#268bd2", cyan:    "#2aa198", green:   "#859900",
      bg_main: "$base03", text_main: "$base0",
      dir_style: "$blue bold", git_style: "$green", char_success: "$green bold", char_error: "$red bold"
    }
  },
  {
    id: 'gruvbox-dark',
    name: 'Gruvbox Dark',
    palette: {
      dark0_hard:   "#1d2021", dark0:        "#282828", dark0_soft:   "#32302f", dark1:        "#3c3836",
      dark2:        "#504945", dark3:        "#665c54", dark4:        "#7c6f64",
      gray_245:     "#928374", gray_244:     "#928374",
      light0_hard:  "#f9f5d7", light0:       "#fbf1c7", light0_soft:  "#f2e5bc", light1:       "#ebdbb2",
      light2:       "#d5c4a1", light3:       "#bdae93", light4:       "#a89984",
      bright_red:   "#fb4934", bright_green: "#b8bb26", bright_yellow:"#fabd2f", bright_blue:  "#83a598",
      bright_purple:"#d3869b", bright_aqua:  "#8ec07c", bright_orange:"#fe8019",
      neutral_red:  "#cc241d", neutral_green:"#98971a", neutral_yellow:"#d79921", neutral_blue: "#458588",
      neutral_purple:"#b16286",neutral_aqua: "#689d6a", neutral_orange:"#d65d0e",
      faded_red:    "#9d0006", faded_green:  "#79740e", faded_yellow: "#b57614", faded_blue:   "#076678",
      faded_purple: "#8f3f71", faded_aqua:   "#427b58", faded_orange: "#af3a03",
      bg: "$dark0", fg: "$light1",
      dir_style: "$neutral_blue bold", git_style: "$neutral_green", char_ok: "$bright_green", char_err: "$bright_red"
    }
  },
  {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    palette: {
      bg: "#1a1b26", fg: "#a9b1d6",
      black: "#010101", red: "#f7768e", green: "#9ece6a", yellow: "#e0af68",
      blue: "#7aa2f7", magenta: "#bb9af7", cyan: "#7dcfff", white: "#acb0d0",
      comment: "#565f89", gutter_fg: "#3b4261",
      dir_style: "$blue bold", git_style: "$green", char_ok: "$green", char_err: "$red"
    }
  },
  {
    id: 'catppuccin-macchiato',
    name: 'Catppuccin Macchiato',
    palette: {
      rosewater: "#f4dbd6", flamingo: "#f0c6c6", pink: "#f5bde6", mauve: "#c6a0f6",
      red: "#ed8796", maroon: "#ee99a0", peach: "#f5a97f", yellow: "#eed49f",
      green: "#a6da95", teal: "#8bd5ca", sky: "#91d7e3", sapphire: "#7dc4e4",
      blue: "#8aadf4", lavender: "#b7bdf8",
      text: "#cad3f5", subtext1: "#b8c0e0", subtext0: "#a5adce",
      overlay2: "#939ab7", overlay1: "#8087a2", overlay0: "#6e738d",
      surface2: "#5b6078", surface1: "#494d64", surface0: "#363a4f",
      base: "#24273a", mantle: "#1e2030", crust: "#181926",
      dir_fg: "$blue", git_fg: "$green", char_ok: "$green", char_err: "$red",
      bg_default: "$base", text_default: "$text"
    }
  }
];

export const STARSHIP_GLOBAL_SETTINGS_DEFINITION: ModulePropertyDefinition[] = [
  { key: 'format', label: 'Global Prompt Format', type: ModulePropertyType.TEXTAREA, description: 'The main format string for the prompt. Defines module order.', defaultValue: '$all' },
  { key: 'right_format', label: 'Right Prompt Format', type: ModulePropertyType.TEXTAREA, description: 'Format string for the right-side prompt.', defaultValue: '' },
  { key: 'add_newline', label: 'Add Newline', type: ModulePropertyType.BOOLEAN, description: 'Adds a newline character before the prompt character.', defaultValue: true },
  { key: 'scan_timeout', label: 'Scan Timeout (ms)', type: ModulePropertyType.NUMBER, description: 'Timeout for starship to scan for module configurations.', defaultValue: 30 },
  { key: 'command_timeout', label: 'Command Timeout (ms)', type: ModulePropertyType.NUMBER, description: 'Timeout for external commands used by modules.', defaultValue: 500 },
];

export const AVAILABLE_MODULES: ModuleDefinition[] = [
  { id: 'character', name: 'Character', description: 'Displays the prompt character (e.g., ❯, $).', defaultDisabled: false, defaultFormat: '$symbol ', defaultStyle: '', properties: [
    { key: 'success_symbol', label: 'Success Symbol', type: ModulePropertyType.TEXT, defaultValue: '[❯](green)', description: 'Symbol shown on success.'},
    { key: 'error_symbol', label: 'Error Symbol', type: ModulePropertyType.TEXT, defaultValue: '[❯](red)', description: 'Symbol shown on error.'},
    { key: 'vicmd_symbol', label: 'Vi Mode Symbol', type: ModulePropertyType.TEXT, defaultValue: '[❮](green)', description: 'Symbol shown in Vi command mode.'},
    { key: 'custom_cursor_select', label: 'Prompt Symbol Style', type: ModulePropertyType.CURSOR_SELECT, description: 'Select a predefined cursor or enter a custom one. Styles success/error/vicmd symbols.'},
  ], icon: CharacterIcon, link: 'https://starship.rs/config/#character'},
  { id: 'directory', name: 'Directory', description: 'Shows the current working directory.', defaultDisabled: false, defaultFormat: '[$path]($style)[$read_only]($read_only_style) ', defaultStyle: 'cyan bold', properties: [
    { key: 'truncation_length', label: 'Truncation Length', type: ModulePropertyType.NUMBER, defaultValue: 3, description: 'Max number of parent folders to show.'},
    { key: 'truncate_to_repo', label: 'Truncate to Repo', type: ModulePropertyType.BOOLEAN, defaultValue: true, description: 'Truncate path to repository root if applicable.'},
    { key: 'fish_style_pwd', label: 'Fish Style Path', type: ModulePropertyType.BOOLEAN, defaultValue: false, description: 'Use Fish shell-like path shortening.'},
    { key: 'use_logical_path', label: 'Use Logical Path', type: ModulePropertyType.BOOLEAN, defaultValue: true, description: 'Use logical path resolving symlinks.'},
    { key: 'before_repo_root_style', label: 'Before Repo Root Style', type: ModulePropertyType.TEXT, defaultValue: 'blue dimmed', description: 'Style for path segment before repo root.'},
    { key: 'repo_root_style', label: 'Repo Root Style', type: ModulePropertyType.TEXT, defaultValue: 'blue bold', description: 'Style for the repo root directory name itself.'},
    { key: 'read_only', label: 'Read-Only Symbol', type: ModulePropertyType.TEXT, defaultValue: '🔒', description: 'Symbol for read-only directories.'},
    { key: 'read_only_style', label: 'Read-Only Symbol Style', type: ModulePropertyType.TEXT, defaultValue: 'red', description: 'Style for the read-only symbol.'},
  ], icon: DirectoryIcon, link: 'https://starship.rs/config/#directory'},
  { id: 'line_break', name: 'Line Break', description: 'Adds a line break, useful for multi-line prompts.', defaultDisabled: false, defaultFormat: '', properties: [], icon: LineBreakIcon, link: 'https://starship.rs/config/#line-break'},
  { id: 'git_branch', name: 'Git Branch', description: 'Shows the current Git branch.', defaultDisabled: false, defaultFormat: 'on [$symbol$branch]($style) ', defaultStyle: 'purple bold', properties: [
    { key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: ' ', description: 'Symbol preceding the branch name.'},
    { key: 'truncation_length', label: 'Truncation Length', type: ModulePropertyType.NUMBER, defaultValue: 99, description: 'Max length of the branch name.'},
    { key: 'truncation_symbol', label: 'Truncation Symbol', type: ModulePropertyType.TEXT, defaultValue: '…', description: 'Symbol used when truncating.'},
  ], icon: GitBranchIcon, link: 'https://starship.rs/config/#git-branch'},
  { id: 'git_commit', name: 'Git Commit', description: 'Shows the current Git commit hash.', defaultDisabled: true, defaultFormat: '[$tag$hash]($style) ', defaultStyle: 'green bold', properties: [
    { key: 'commit_hash_length', label: 'Hash Length', type: ModulePropertyType.NUMBER, defaultValue: 7, description: 'Length of the commit hash to display.'},
    { key: 'tag_symbol', label: 'Tag Symbol', type: ModulePropertyType.TEXT, defaultValue: '🏷️ ', description: 'Symbol for tags.'},
    { key: 'tag_disabled', label: 'Disable Tag Display', type: ModulePropertyType.BOOLEAN, defaultValue: false, description: 'If true, tags will not be shown.'},
  ], icon: GitCommitIcon, link: 'https://starship.rs/config/#git-commit'},
  { id: 'git_status', name: 'Git Status', description: 'Shows Git repository status (dirty, ahead/behind).', defaultDisabled: true, defaultFormat: '([$all_status$ahead_behind]($style)) ', defaultStyle: 'red bold', properties: [
    { key: 'stashed', label: 'Stashed Symbol', type: ModulePropertyType.TEXT, defaultValue: '$', description: 'Symbol for stashed changes.'},
    { key: 'ahead', label: 'Ahead Symbol', type: ModulePropertyType.TEXT, defaultValue: '⇡', description: 'Symbol for ahead of remote.'},
    { key: 'behind', label: 'Behind Symbol', type: ModulePropertyType.TEXT, defaultValue: '⇣', description: 'Symbol for behind remote.'},
    { key: 'diverged', label: 'Diverged Symbol', type: ModulePropertyType.TEXT, defaultValue: '⇕', description: 'Symbol for diverged history.'},
    { key: 'conflicted', label: 'Conflicted Symbol', type: ModulePropertyType.TEXT, defaultValue: '=', description: 'Symbol for conflicted files.'},
    { key: 'deleted', label: 'Deleted Symbol', type: ModulePropertyType.TEXT, defaultValue: '✘', description: 'Symbol for deleted files.'},
    { key: 'renamed', label: 'Renamed Symbol', type: ModulePropertyType.TEXT, defaultValue: '»', description: 'Symbol for renamed files.'},
    { key: 'modified', label: 'Modified Symbol', type: ModulePropertyType.TEXT, defaultValue: '!', description: 'Symbol for modified files.'},
    { key: 'staged', label: 'Staged Symbol', type: ModulePropertyType.TEXT, defaultValue: '+', description: 'Symbol for staged files.'},
    { key: 'untracked', label: 'Untracked Symbol', type: ModulePropertyType.TEXT, defaultValue: '?', description: 'Symbol for untracked files.'},
  ], icon: GitStatusIcon, link: 'https://starship.rs/config/#git-status'},
  { id: 'username', name: 'Username', description: 'Shows the current user.', defaultDisabled: true, defaultFormat: '[$user]($style) ', defaultStyle: 'yellow bold', properties: [
    { key: 'style_user', label: 'User Style', type: ModulePropertyType.TEXT, defaultValue: 'yellow bold', description: 'Style for regular user.'},
    { key: 'style_root', label: 'Root Style', type: ModulePropertyType.TEXT, defaultValue: 'red bold', description: 'Style for root user.'},
    { key: 'show_always', label: 'Show Always', type: ModulePropertyType.BOOLEAN, defaultValue: false, description: 'Always show username, even if default.'},
  ], icon: UsernameIcon, link: 'https://starship.rs/config/#username'},
  { id: 'hostname', name: 'Hostname', description: 'Shows the system hostname.', defaultDisabled: true, defaultFormat: 'on [$hostname]($style) ', defaultStyle: 'green bold', properties: [
    { key: 'ssh_only', label: 'SSH Only', type: ModulePropertyType.BOOLEAN, defaultValue: true, description: 'Only show hostname when in an SSH session.'},
    { key: 'trim_at', label: 'Trim At', type: ModulePropertyType.TEXT, defaultValue: '.', description: 'Character to trim hostname at (e.g. .local).'},
  ], icon: HostnameIcon, link: 'https://starship.rs/config/#hostname'},
  { id: 'cmd_duration', name: 'Command Duration', description: 'Shows execution time of the last command.', defaultDisabled: true, defaultFormat: 'took [$duration]($style) ', defaultStyle: 'yellow bold', properties: [
    { key: 'min_time', label: 'Min Time (ms)', type: ModulePropertyType.NUMBER, defaultValue: 2000, description: 'Minimum duration to display.'},
    { key: 'show_milliseconds', label: 'Show Milliseconds', type: ModulePropertyType.BOOLEAN, defaultValue: false, description: 'Show milliseconds for precise timing.'},
  ], icon: CmdDurationIcon, link: 'https://starship.rs/config/#cmd_duration'},
  { id: 'time', name: 'Time', description: 'Shows the current time.', defaultDisabled: true, defaultFormat: 'at [$time]($style) ', defaultStyle: 'yellow bold', properties: [
    { key: 'use_12hr', label: 'Use 12-Hour Format', type: ModulePropertyType.BOOLEAN, defaultValue: false, description: 'Use 12-hour (AM/PM) time format.'},
    { key: 'time_format', label: 'Custom Time Format', type: ModulePropertyType.TEXT, placeholder: '%T or %H:%M:%S', description: 'Custom strftime format string.'},
    { key: 'utc_time_offset', label: 'UTC Offset', type: ModulePropertyType.TEXT, defaultValue: "local", placeholder: 'local or +05:00', description: 'UTC offset for time display.'},
  ], icon: TimeIcon, link: 'https://starship.rs/config/#time'},
  { id: 'nodejs', name: 'Node.js', description: 'Shows Node.js version.', defaultDisabled: true, defaultFormat: 'via [ $version]($style) ', defaultStyle: 'green bold', properties: [
    { key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: ' '},
    { key: 'not_found_style', label: 'Not Found Style', type: ModulePropertyType.TEXT, defaultValue: 'red', description: 'Style when node is not found but a project file is.'},
  ], icon: NodeJsIcon, link: 'https://starship.rs/config/#nodejs'},
  { id: 'python', name: 'Python', description: 'Shows Python version and virtual environment.', defaultDisabled: true, defaultFormat: 'via [${symbol}${pyenv_prefix}(${version})(\($virtualenv\))]($style) ', defaultStyle: 'yellow bold', properties: [
    { key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '🐍 '},
    { key: 'pyenv_version_name', label: 'Use Pyenv Version Name', type: ModulePropertyType.BOOLEAN, defaultValue: false, description: 'Show version name from pyenv.'},
    { key: 'python_binary', label: 'Python Binary', type: ModulePropertyType.TEXT, defaultValue: 'python', description: 'Name of python binary to check version.'},
  ], icon: PythonIcon, link: 'https://starship.rs/config/#python'},
  { id: 'rust', name: 'Rust', description: 'Shows Rust version.', defaultDisabled: true, defaultFormat: 'via [$symbol($version)]($style) ', defaultStyle: 'orange bold', properties: [
    { key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '🦀 '},
    { key: 'toolchain', label: 'Toolchain', type: ModulePropertyType.TEXT, description: 'Specify which toolchain to display (e.g. stable, nightly)'}
  ], icon: RustIcon, link: 'https://starship.rs/config/#rust'},
  { id: 'package', name: 'Package Version', description: 'Shows version from package files (e.g., package.json).', defaultDisabled: true, defaultFormat: 'is [$version]($style) ', defaultStyle: 'green bold', properties: [
    { key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '📦 '},
  ], icon: PackageIcon, link: 'https://starship.rs/config/#package-version'},
  { id: 'golang', name: 'Go', description: 'Shows Go version.', defaultDisabled: true, defaultFormat: 'via [$symbol($version)]($style) ', defaultStyle: 'cyan bold', properties: [{ key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '🐹 '}], icon: GolangIcon, link: 'https://starship.rs/config/#go-module'},
  { id: 'java', name: 'Java', description: 'Shows Java version.', defaultDisabled: true, defaultFormat: 'via [$symbol($version)]($style) ', defaultStyle: 'red bold', properties: [{ key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '☕ '}], icon: JavaIcon, link: 'https://starship.rs/config/#java'},
  { id: 'dotnet', name: '.NET', description: 'Shows .NET SDK version.', defaultDisabled: true, defaultFormat: 'via [$symbol($version)]($style) ', defaultStyle: 'purple bold', properties: [{ key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '.NET '}], icon: DotNetIcon, link: 'https://starship.rs/config/#net'},
  { id: 'ruby', name: 'Ruby', description: 'Shows Ruby version.', defaultDisabled: true, defaultFormat: 'via [$symbol($version)]($style) ', defaultStyle: 'red bold', properties: [{ key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: ' gemstone '}], icon: RubyIcon, link: 'https://starship.rs/config/#ruby'},
  { id: 'php', name: 'PHP', description: 'Shows PHP version.', defaultDisabled: true, defaultFormat: 'via [$symbol($version)]($style) ', defaultStyle: 'blue bold', properties: [{ key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '🐘 '}], icon: PhpIcon, link: 'https://starship.rs/config/#php'},
  { id: 'swift', name: 'Swift', description: 'Shows Swift version.', defaultDisabled: true, defaultFormat: 'via [$symbol($version)]($style) ', defaultStyle: 'orange bold', properties: [{ key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '🐦 '}], icon: SwiftIcon, link: 'https://starship.rs/config/#swift'},
  { id: 'terraform', name: 'Terraform', description: 'Shows Terraform workspace.', defaultDisabled: true, defaultFormat: 'on [$symbol$workspace]($style) ', defaultStyle: 'purple bold', properties: [{ key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '💠 '}], icon: TerraformIcon, link: 'https://starship.rs/config/#terraform'},
  { id: 'conda', name: 'Conda', description: 'Shows Conda environment.', defaultDisabled: true, defaultFormat: '[$symbol$environment]($style) ', defaultStyle: 'green bold', properties: [{ key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: 'Conda '}], icon: CondaIcon, link: 'https://starship.rs/config/#conda'},
  { id: 'kubernetes', name: 'Kubernetes', description: 'Shows Kubernetes context and namespace.', defaultDisabled: true, defaultFormat: '[⛵ $context(::$namespace)]($style) ', defaultStyle: 'cyan bold', properties: [
    { key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '⛵ '},
    { key: 'user_symbol', label: 'User Symbol', type: ModulePropertyType.TEXT, defaultValue: '👤 '},
    { key: 'context_aliases', label: 'Context Aliases (JSON)', type: ModulePropertyType.TEXTAREA, placeholder: '{"long-name": "short"}', description: 'JSON object for aliasing context names.'},
  ], icon: KubernetesIcon, link: 'https://starship.rs/config/#kubernetes'},
  { id: 'aws', name: 'AWS', description: 'Shows AWS profile and region.', defaultDisabled: true, defaultFormat: '[☁️ $profile@$region]($style) ', defaultStyle: 'yellow bold', properties: [
    { key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '☁️ '},
    { key: 'profile_aliases', label: 'Profile Aliases (JSON)', type: ModulePropertyType.TEXTAREA, placeholder: '{"long-profile-name": "short"}', description: 'JSON object for aliasing profile names.'},
  ], icon: AwsIcon, link: 'https://starship.rs/config/#aws'},
  { id: 'docker', name: 'Docker', description: 'Shows Docker context or version.', defaultDisabled: true, defaultFormat: '[🐳 $context]($style) ', defaultStyle: 'blue bold', properties: [
    { key: 'symbol', label: 'Symbol', type: ModulePropertyType.TEXT, defaultValue: '🐳 '},
  ], icon: DockerIcon, link: 'https://starship.rs/config/#docker'},
];


export const DUMMY_MODULE_DATA: DummyModuleData = {
  username: { user: "devuser" },
  hostname: { hostname: "my-machine" },
  directory: { path: "~/Projects/starship-editor", read_only: "" },
  git_branch: { symbol: " ", branch: "feature/live-preview", remote_branch: "origin/feature/live-preview" },
  git_commit: { hash: "a1b2c3d", tag: " (tag: v1.2.3)" },
  git_status: { all_status: "!+", ahead_behind: "⇡1⇣2", conflicted: "", untracked: "?", stashed: "", modified: "!", staged: "+", renamed: "", deleted: "" },
  character: { symbol: "❯" }, 
  cmd_duration: { duration: "5.2s" },
  time: { time: "14:35:10" },
  nodejs: { symbol: " ", version: "v18.16.0" },
  python: { symbol: "🐍 ", version: "3.10.4", virtualenv: "my-venv", pyenv_prefix: "" },
  rust: { symbol: "🦀 ", version: "1.70.0" },
  package: { symbol: "📦 ", version: "0.1.0" },
  golang: { symbol: '🐹 ', version: '1.20.1' },
  java: { symbol: '☕ ', version: '17.0.3' },
  dotnet: { symbol: '.NET ', version: '7.0.100' },
  ruby: { symbol: ' gemstone ', version: '3.1.2' },
  php: { symbol: '🐘 ', version: '8.1.7' },
  swift: { symbol: '🐦 ', version: '5.8' },
  terraform: { symbol: '💠 ', workspace: 'default' },
  conda: { symbol: 'Conda ', environment: 'base' },
  kubernetes: { symbol: "⛵ ", context: "minikube", namespace: "default" },
  aws: { symbol: "☁️ ", profile: "default", region: "us-east-1" },
  docker: { symbol: "🐳 ", context: "default" },
};

// SYMBOL_CATEGORIES removed to revert symbol palette feature
// export const SYMBOL_CATEGORIES: SymbolCategory[] = [ ... ];
