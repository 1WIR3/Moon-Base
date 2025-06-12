
import React from 'react';

interface SVGIconProps extends React.SVGProps<SVGSVGElement> {}

export const NodeJsIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" {...props} fill="currentColor">
    <path d="M211.471 199.569L134.295 72.06H134.1L95.88 126.331L69.877 82.012H0V240H69.877V127.113L121.737 240H188.7L128 136.269L170.81 72.06H256V240H211.471V199.569Z"/>
  </svg>
);

export const DirectoryIcon: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
);

export const GitBranchIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3v12M6 21a3 3 0 100-6 3 3 0 000 6zM18 9a3 3 0 100-6 3 3 0 000 6zm0 0v3M6 9h12" />
  </svg>
);

export const CharacterIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const TimeIcon: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const RustIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.39 1.024 0 1.414l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.39.39.39 1.024 0 1.414l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.893c-.09.543-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.149-.893c-.07-.425-.383-.765-.78-.93-.398-.165-.854-.143-1.204.107l-.738.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 010-1.414l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.15-.893z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const PackageIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10.5 8.25h3M12 3v5.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5M12 3.75L6 7.5h12L12 3.75z" />
  </svg>
);

export const PythonIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12.75L4.5 21V15M10.5 12.75C10.5 11.25 11.25 9.75 12.75 9L15 7.5L16.5 9.75M10.5 12.75c0 .75-.225 1.5-.625 2.125L9.375 16.5M16.5 9.75c2.25 0 3.75-1.5 3.75-3.75S18.75 2.25 16.5 2.25s-3.75 1.5-3.75 3.75S14.25 9.75 16.5 9.75zM9.375 16.5c-2.063 0-3.875-1.063-4.875-2.625" />
  </svg>
);

export const KubernetesIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zM10.5 8.25l3 3.5-3 3.5M12 3v2.25m0 13.5V21m5.25-11.25H21m-15.75 0H3m14.25 5.25l1.5 1.5m-14.25-8.25l-1.5-1.5m14.25 0l1.5-1.5m-2.25 11.25l-1.5 1.5m-8.25-14.25l-1.5 1.5" />
  </svg>
);

export const AwsIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-2.666-5.432A4.508 4.508 0 0012.75 6a4.5 4.5 0 00-4.243 5.438A4.5 4.5 0 002.25 15z" />
  </svg>
);
export const DockerIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.75a8.25 8.25 0 01-16.5 0A8.25 8.25 0 0121 12.75zm-8.25-7.5A6.75 6.75 0 004.5 12.75H6a6.726 6.726 0 013.375-5.692V12.75h2.25V7.058A6.726 6.726 0 0115 12.75h1.5a6.75 6.75 0 00-8.25-7.5zM12 15.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75V2.25M10.125 4.875L9 3.75M13.875 4.875L15 3.75" />
  </svg>
);

export const CmdDurationIcon: React.FC<SVGIconProps> = (props) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m-4.5-6a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3V1.5M10.125 4.125L9 3M13.875 4.125L15 3" />
  </svg>
);

// --- NEW ICONS ---
export const GitCommitIcon: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

export const GitStatusIcon: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const UsernameIcon: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

export const HostnameIcon: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
  </svg>
);

export const LineBreakIcon: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18M10.5 2.25L3 10l7.5 7.75M13.5 2.25L21 10l-7.5 7.75" />
  </svg>
);

export const CondaIcon: React.FC<SVGIconProps> = (props) => ( // Simplified circle for conda
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

export const DotNetIcon: React.FC<SVGIconProps> = (props) => ( // Simplified .N for .NET
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
    <circle cx="7" cy="12" r="1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v10M12 7l4 5M12 7l-4 5M16 7v10" />
  </svg>
);

export const GolangIcon: React.FC<SVGIconProps> = (props) => ( // Gopher-like simplified
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V6a3 3 0 013-3h0a3 3 0 013 3v3m-6 0h6m-6 0H6a3 3 0 00-3 3v3a3 3 0 003 3h3a3 3 0 003-3v-3a3 3 0 00-3-3H9z" />
    <circle cx="15" cy="7.5" r="1.5" fill="currentColor"/>
    <circle cx="9" cy="7.5" r="1.5" fill="currentColor"/>
  </svg>
);

export const JavaIcon: React.FC<SVGIconProps> = (props) => ( // Coffee cup
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v1M12 11v7M12 6c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zM5 9h1M18 9h1M5 9a7 7 0 0114 0v9a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M17 13a2 2 0 114 0v2a2 2 0 11-4 0v-2z" />
  </svg>
);

export const PhpIcon: React.FC<SVGIconProps> = (props) => ( // Elephant like symbol
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5S14.485 14.25 12 14.25zM12 14.25V21m-4.5-6.75C5.25 10.328 3 12.38 3 15s2.25 4.672 4.5 6M16.5 14.25c2.25-2.828 4.5-0.776 4.5 2.25s-2.25 4.672-4.5 6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25" />
  </svg>
);

export const RubyIcon: React.FC<SVGIconProps> = (props) => ( // Gemstone
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25l-9 13.5-9-13.5L12 3l9 5.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M3 8.25h18" />
  </svg>
);

export const SwiftIcon: React.FC<SVGIconProps> = (props) => ( // Bird
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.478 10.035A.75.75 0 014.228 9h15.544a.75.75 0 01.75.75v5.188a.75.75 0 01-1.28.53l-6.854-6.854a.75.75 0 00-1.06 0L4.76 15.753a.75.75 0 01-1.28-.53V10.035z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75z" />
  </svg>
);

export const TerraformIcon: React.FC<SVGIconProps> = (props) => ( // Hexagon with T
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.792V11.208L12 6 3 11.208V12.792L12 18Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5h3v5.25" />
  </svg>
);

// Palette Icon (if needed)
export const PaletteIcon: React.FC<SVGIconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L12 12m5.25-5.25L12 12m5.25-5.25L12 12M12 12L6.75 6.75M12 12l-5.25 5.25M12 12l5.25 5.25M3 3h3.375C7.234 3 8.05 3.334 8.68 3.89l1.474 1.228M3 21h3.375c.858 0 1.674-.334 2.303-.89l1.474-1.228M21 3h-3.375a3.753 3.753 0 00-2.303.89L13.85 5.118M21 21h-3.375a3.753 3.753 0 01-2.303-.89l-1.474-1.228" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75h4.5M9.75 17.25h4.5" />
  </svg>
);
// Add more module-specific icons as needed
