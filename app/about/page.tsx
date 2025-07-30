'use client'

import { AcademicCapIcon, BriefcaseIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollArrow from '../components/ScrollArrow'

export default function About() {
  const aboutSectionRef = useRef(null)
  const benefitsSectionRef = useRef(null)

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-b from-white to-gray-100">
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <h1>
              <span className="block text-base text-center text-blue-600 font-semibold tracking-wide uppercase">
                Twój Ekspert
              </span>
              <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Bezpieczne Transakcje z Doświadczonym Agentem
              </span>
            </h1>

            <div ref={aboutSectionRef} className="mt-16 flex flex-col lg:flex-row items-center gap-12 scroll-mt-8">
              <div className="lg:w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3"
                  alt="Agent nieruchomości"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>

              <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Jan Kowalski</h2>
                <p className="text-gray-600 mb-6">
                  Przez ostatnie 10 lat pomogłem setkom klientów bezpiecznie przeprowadzić 
                  transakcje na rynku nieruchomości. Specjalizuję się w nieruchomościach 
                  premium na terenie Warszawy i okolic, gdzie każdego dnia pracuję nad tym, 
                  aby moi klienci osiągali swoje cele inwestycyjne i życiowe.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                    <BriefcaseIcon className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="font-bold text-gray-900">10+ lat</span>
                    <span className="text-sm text-gray-600">skutecznych transakcji</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                    <UserGroupIcon className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="font-bold text-gray-900">500+</span>
                    <span className="text-sm text-gray-600">spełnionych marzeń</span>
                  </div>

                  <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                    <AcademicCapIcon className="h-8 w-8 text-blue-500 mb-2" />
                    <span className="font-bold text-gray-900">Certyfikowany</span>
                    <span className="text-sm text-gray-600">ekspert rynku</span>
                  </div>
                </div>
              </div>
            </div>

            <div ref={benefitsSectionRef} className="mt-16 scroll-mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Co zyskujesz na współpracy ze mną?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Pełne Bezpieczeństwo</h4>
                  <p className="text-gray-600">
                    Każda transakcja jest zabezpieczona prawnie i finansowo. Działam zgodnie 
                    z najwyższymi standardami, dbając o Twój spokój i bezpieczeństwo na każdym etapie.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Najlepsza Cena</h4>
                  <p className="text-gray-600">
                    Dzięki znajomości rynku i skutecznym technikom negocjacji, zawsze 
                    uzyskujesz najkorzystniejsze warunki transakcji.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Oszczędność Czasu</h4>
                  <p className="text-gray-600">
                    Zajmuję się wszystkimi formalnościami, dokumentami i negocjacjami, 
                    abyś mógł skupić się na tym, co dla Ciebie najważniejsze.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Eksperckie Wsparcie</h4>
                  <p className="text-gray-600">
                    Otrzymujesz dostęp do aktualnej wiedzy o rynku i trendach, co pozwala 
                    podejmować świadome i korzystne decyzje inwestycyjne.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Animowana strzałka */}
            <ScrollArrow targetRef={benefitsSectionRef} />
          </div>
        </div>
      </div>
      
      {/* Animowana strzałka do sekcji About */}
      <ScrollArrow targetRef={aboutSectionRef} />
    </main>
  )
} 