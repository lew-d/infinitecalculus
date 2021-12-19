import React from 'react'
import { UserContextProvider } from '../hooks/authUser'
import Header from '../components/Header'
import Head from '../components/Head'
import Footer from '../components/Footer'

import 'react-calendar-heatmap/dist/styles.css';
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import 'katex/dist/katex.min.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <main>
      <UserContextProvider>
        <div className='min-h-screen bg-stone-50'>
          <Head />
          <Header />

          <div className=''>
            <Component {...pageProps} />
          </div>

        </div>

        <Footer />
      </UserContextProvider>
    </main>
  )
}
