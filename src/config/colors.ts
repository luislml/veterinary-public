// Configuración de colores globales - Administrable
export const colorConfig = {
  // Color principal (verde oscuro)
  primary: {
    DEFAULT: '#1a4d3a', // Verde oscuro
    light: '#2d6b4f',
    dark: '#0f2e22',
  },
  // Color de acento (coral/salmon pink)
  accent: {
    DEFAULT: '#ff6b6b', // Coral/salmon pink
    light: '#ff8e8e',
    dark: '#e55555',
  },
  // Colores neutros
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
};

// Función helper para obtener colores CSS
export const getColor = (path: string) => {
  const keys = path.split('.');
  let value: any = colorConfig;
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return '';
  }
  return value;
};

