import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto'],
        gupter: ['Gupter'],
      },
      backgroundColor: {
        white: '#fff',
        app: '#F1F5F9',
        header: '#334155',
      },
      borderWidth: {
        half: '0.5px',
      },
    },
  },
  plugins: [],
}
export default config
