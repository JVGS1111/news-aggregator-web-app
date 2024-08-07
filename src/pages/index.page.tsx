import { getHomeProps } from '@/services/web/requests'
import { GetStaticProps } from 'next'

export { default } from './home'

export const getStaticProps: GetStaticProps = async () => {
  const newsArray = await getHomeProps()

  const initProps = {
    articles: newsArray,
  }
  return {
    props: {
      initProps,
    },
    revalidate: 60 * 30,
  }
}
