// Paleta de cores institucional - Prefeitura de Corrente
// Baseada no logo da prefeitura

export const colors = {
  // Cores principais - Azul institucional
  primary: {
    DEFAULT: '#1e3a8a', // Azul escuro
    light: '#3b82f6',   // Azul médio
    lighter: '#60a5fa', // Azul claro
  },
  
  // Cores secundárias - Verde/Teal
  secondary: {
    DEFAULT: '#0d9488', // Teal
    light: '#14b8a6',   // Teal claro
  },
  
  // Cores de destaque
  accent: {
    DEFAULT: '#06b6d4', // Cyan
    light: '#22d3ee',   // Cyan claro
  },
  
  // Cores neutras
  gray: {
    bg: '#f8fafc',      // Background claro
    light: '#f1f5f9',   // Cinza muito claro
    DEFAULT: '#64748b', // Cinza médio
    dark: '#334155',    // Cinza escuro
  },
} as const;

export const gradients = {
  primary: 'from-primary to-primary-light',
  secondary: 'from-secondary to-accent',
  admin: 'from-white to-accent/5',
} as const;
