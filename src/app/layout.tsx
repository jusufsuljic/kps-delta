// app/layout.tsx
import './globals.css'
import { Mohave } from 'next/font/google'
import StyledComponentsRegistry from './lib/registry'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer';
import { Metadata } from 'next';

const mohave = Mohave({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mohave',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "KPS Delta",
  description: "Klub praktičnog streljaštva Delta.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },        // default favicon
      { url: "/favicon-32x32.ico", sizes: "32x32" },
      { url: "/favicon-16x16.ico", sizes: "16x16" },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bs" className={`${mohave.className} ${mohave.variable}`}>
      <body style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <a href="#main-content" className="skip-link">Preskoči na sadržaj</a>
        <StyledComponentsRegistry>
          <Navbar />
          <main id="main-content" tabIndex={-1} style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
