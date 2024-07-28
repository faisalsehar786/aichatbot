/* eslint-disable  */
'use client'
// import type { Metadata } from 'next'
import { ThemeProvider } from '../context/ThemeContext'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import SessisonProvider from '../components/SessisonProvider'

// const defaultUrl = process.env.SITE_URL ? process.env.SITE_URL : 'http://localhost:3000'

// export const metadata: Metadata = {
//   metadataBase: new URL(defaultUrl),

//   title: {
//     template: '%s | Next Ai-chat',
//     default: 'Next Ai-chat',
//   },
//   authors: {
//     name: 'faisal khan',
//   },

//   description:
//     'Explore a world of captivating stories and insightful articles on our blog. From the latest trends to in-depth analyses, our blog covers a wide range of topics to keep you informed and entertained. Join our community of readers and discover thought-provoking content that sparks curiosity and fosters discussion. Stay updated with our diverse collection of blog posts, written by passionate contributors who share their expertise and unique perspectives. Engage with a platform that goes beyond the ordinary, providing you with enriching content that resonates with your interests.',
//   openGraph: {
//     title: 'Next Ai-chat',
//     description:
//       'Explore a world of captivating stories and insightful articles on our blog. From the latest trends to in-depth analyses, our blog covers a wide range of topics to keep you informed and entertained. Join our community of readers and discover thought-provoking content that sparks curiosity and fosters discussion. Stay updated with our diverse collection of blog posts, written by passionate contributors who share their expertise and unique perspectives. Engage with a platform that goes beyond the ordinary, providing you with enriching content that resonates with your interests.',
//     url: defaultUrl,
//     siteName: 'Next Ai-chat',
//     images: '/og.png',
//     type: 'website',
//   },
//   keywords: ['daily web coding', 'chensokheng', 'dailywebcoding'],
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' data-bs-theme='dark' suppressHydrationWarning>
      <head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700'
        />
        <link
          href='assets/plugins/custom/datatables/datatables.bundle.css'
          rel='stylesheet'
          type='text/css'
        />
        <link href='assets/plugins/global/plugins.bundle.css' rel='stylesheet' type='text/css' />
        <link href='assets/css/style.bundle.css' rel='stylesheet' type='text/css' />
      </head>
      <body
        id='kt_body'
        className='header-fixed header-tablet-and-mobile-fixed aside-fixed aside-secondary-enabled'
      >
        <ThemeProvider>
          <div className='d-flex flex-column flex-root'>
            <div className='page d-flex flex-row flex-column-fluid'>{children}</div>
          </div>
        </ThemeProvider>
        <Toaster position='top-right' reverseOrder={true} />
        <SessisonProvider />
      </body>
    </html>
  )
}
