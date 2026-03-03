import type { AppProps } from 'next/app'
import Head from 'next/head'
import Layout from '@/components/Layout'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>lingvomed.uz — Ustazlar ushın taptırmas kómekshi</title>
        <meta
          name="description"
          content="Oqıtıwshılar ushın tayın prezintaciyalar, video dársler hám test materialları"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
