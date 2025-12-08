# Configuración de Colores

Este proyecto utiliza un sistema de colores configurables que permite cambiar fácilmente la paleta de colores de toda la aplicación.

## Cómo cambiar los colores

### Opción 1: Variables CSS (Recomendado)

Edita el archivo `src/styles/global.css` y modifica las variables CSS en la sección `:root`:

```css
:root {
  --color-primary: #1a4d3a;        /* Color principal (verde oscuro) */
  --color-primary-light: #2d6b4f;  /* Variante clara del color principal */
  --color-primary-dark: #0f2e22;    /* Variante oscura del color principal */
  --color-accent: #ff6b6b;         /* Color de acento (coral/salmon pink) */
  --color-accent-light: #ff8e8e;   /* Variante clara del acento */
  --color-accent-dark: #e55555;    /* Variante oscura del acento */
}
```

### Opción 2: Archivo de Configuración TypeScript

También puedes editar `src/config/colors.ts` para mantener una referencia de los colores en TypeScript:

```typescript
export const colorConfig = {
  primary: {
    DEFAULT: '#1a4d3a',
    light: '#2d6b4f',
    dark: '#0f2e22',
  },
  accent: {
    DEFAULT: '#ff6b6b',
    light: '#ff8e8e',
    dark: '#e55555',
  },
  // ...
};
```

**Nota:** Los componentes usan las variables CSS directamente, por lo que cambiar los valores en `global.css` es suficiente.

## Uso en los componentes

Todos los componentes React utilizan las variables CSS mediante la sintaxis de Tailwind:

```tsx
className="bg-[var(--color-primary)] text-white"
className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)]"
```

## Ejemplo de cambio de color

Para cambiar el color principal a azul:

1. Abre `src/styles/global.css`
2. Cambia `--color-primary: #1a4d3a;` a `--color-primary: #1e40af;`
3. Ajusta las variantes `light` y `dark` según sea necesario
4. Guarda el archivo

Los cambios se aplicarán automáticamente a todos los componentes que usen el color principal.

## Colores por defecto

- **Primary (Principal):** `#1a4d3a` - Verde oscuro
- **Accent (Acento):** `#ff6b6b` - Coral/Salmon pink

Estos colores se pueden cambiar fácilmente siguiendo las instrucciones anteriores.

