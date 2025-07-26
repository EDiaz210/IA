/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados para el tema oscuro
        teal: {
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
        },
        darkbg: '#1e1e2f',
        darkbglight: '#2c2c3e',
        darkinput: '#2d2d3e',
      },
      fontFamily: {
        // Fuente elegante y limpia para todo el proyecto
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'fancy': '0 4px 30px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        xs: '4px',
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      },
    },
  },
  plugins: [],
}
