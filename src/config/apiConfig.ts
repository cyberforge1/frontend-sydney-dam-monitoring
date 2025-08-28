// src/config/apiConfig.ts

const resolveBase = () => {
    const env =
      (typeof process !== 'undefined' &&
        (process.env?.VITE_API_BASE_URL || process.env?.API_BASE_URL)) ||
      (typeof window !== 'undefined' && (window as any).__API_BASE_URL__) ||
      '/api';
    return String(env).replace(/\/+$/, '');
  };
  
  export const API_BASE_URL = resolveBase();
  