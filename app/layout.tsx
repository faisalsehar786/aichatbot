/* eslint-disable  */
'use client'

import { ThemeProvider } from '../context/ThemeContext'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import SessisonProvider from '../components/SessisonProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' data-bs-theme='dark' suppressHydrationWarning>
      {/* <body className={cn('antialiased dark:bg-[#09090B]', inter.className,GeistSans.className)}> */}
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
