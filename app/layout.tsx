import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RE Agents - Agent Nieruchomości',
  description: 'Profesjonalne pośrednictwo w obrocie nieruchomościami',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className={inter.className}>
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  )
} 