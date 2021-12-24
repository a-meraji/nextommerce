module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        third: 'var(--color-bg-three)',
        hover: 'var(--color-bg-hover)',
        cont: 'var(--color-bt-gray)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        approve: 'var(--color-approve)',
        alert: 'var(--color-alert)',
        danger: 'var(--color-danger)',
      },
      textColor: {
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        hover: 'var(--color-dg-hover)',
        third: 'var(--color-bg-three)',
        cont: 'var(--color-bt-gray)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        approve: 'var(--color-approve)',
        alert: 'var(--color-alert)',
        danger: 'var(--color-danger)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
