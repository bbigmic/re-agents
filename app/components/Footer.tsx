'use client'

import Link from 'next/link'
import { HomeIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Logo i opis */}
          <div>
            <div className="flex items-center">
              <HomeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              <span className="ml-2 text-lg sm:text-xl font-bold">RE Agents</span>
            </div>
            <p className="mt-3 sm:mt-4 text-gray-400 text-sm">
              Profesjonalne pośrednictwo w obrocie nieruchomościami. 
              Pomagam znaleźć wymarzone miejsce do życia.
            </p>
          </div>

          {/* Linki */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Szybkie linki</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors touch-target">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors touch-target">
                  O mnie
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors touch-target">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base">+48 123 456 789</span>
              </li>
              <li className="flex items-center text-gray-400">
                <EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">kontakt@reagents.pl</span>
              </li>
              <li className="text-gray-400 text-sm sm:text-base">
                ul. Przykładowa 123
                <br />
                00-001 Warszawa
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} RE Agents. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
} 