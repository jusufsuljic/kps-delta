// app/layout.tsx

import './globals.css'
import { Raleway, Mohave } from 'next/font/google'
import StyledComponentsRegistry from './lib/registry'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose weights you need
  variable: '--font-raleway', // optional for CSS variable usage
  display: 'swap'
});

const mohave = Mohave({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose weights you need
  variable: '--font-mohave', // optional for CSS variable usage
  display: 'swap'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${mohave.className}`}>
      <body>
        <StyledComponentsRegistry>
          <Navbar />
          {children}
          <Footer></Footer>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
