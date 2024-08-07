'use client'
import { Header } from '@/components/header'
import Head from 'next/head'
import { Container } from './container'

export default function CustomNewsFeed() {
  return (
    <>
      <Head>
        <title>feed | News Aggregator</title>
      </Head>
      <Header />
      <Container />
    </>
  )
}
