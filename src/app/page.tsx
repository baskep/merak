'use client'

import Head from 'next/head'
import Header from '@/components/header'

const Home = () => {
  return (
    <>
      <Head>
        <title>The Largest Creator-First Marketplace | Pietra</title>
        <meta name="description" content="Shop the largest marketplace in the world for creator-branded goods." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="title" content="The Largest Creator-First Marketplace | Pietra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

    </>
  )
}

export default Home