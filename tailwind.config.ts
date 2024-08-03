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
      textColor: {
        title: '#1E293B',
        newsSource: '#059669',
        subtitle: '#64748b',
      },
      borderWidth: {
        half: '0.5px',
      },
      maxWidth: {
        feed: '1024px',
      },
    },
  },
  plugins: [],
}
export default config
