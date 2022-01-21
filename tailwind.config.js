module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        primary: 'var(--color-bg-primary)',
        primarycont: 'var(--color-bg-primary-cont)',
        secondary: 'var(--color-bg-secondary)',
        secondarycont: 'var(--color-bg-secondary-cont)',

        third: 'var(--color-bg-three)',
        forth: 'var(--color-text-secondary)',
        hover: 'var(--color-bg-hover)',
        hovercont:'var(--color-bg-hover-cont)',
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
        primarycont: 'var(--color-text-primary-cont)',
        secondarycont: 'var(--color-text-secondary-cont)',
        hover: 'var(--color-dg-hover)',
        third: 'var(--color-text-third)',
        forth: 'var(--color-bg-secondary)',
        cont: 'var(--color-bt-gray)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        approve: 'var(--color-approve)',
        alert: 'var(--color-alert)',
        danger: 'var(--color-danger)',
      },
      borderColor: {
        primary: 'var(--color-bg-primary)',
        primarycont: 'var(--color-bg-primary-cont)',
        secondary: 'var(--color-bg-secondary)',
        secondarycont: 'var(--color-bg-secondary-cont)',
        hovercont:'var(--color-bg-hover-cont)',
        third: 'var(--color-bg-three)',
        hover: 'var(--color-bg-hover)',
        cont: 'var(--color-bt-gray)',
        accent: 'var(--color-accent)',
        success: 'var(--color-success)',
        approve: 'var(--color-approve)',
        alert: 'var(--color-alert)',
        danger: 'var(--color-danger)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
