'use client'

import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import ScrollArrow from '../components/ScrollArrow'

export default function Contact() {
  const contactInfoRef = useRef(null)
  const mapRef = useRef(null)

  return (
    <main className="min-h-screen pt-16 bg-gradient-to-b from-white to-gray-100">
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <div className="text-center mb-16">
              <h1 className="mb-4">
                <span className="block text-base text-blue-600 font-semibold tracking-wide uppercase mb-2">
                  Zawsze Dostępny
                </span>
                <span className="block text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                  Rozpocznij Swoją Drogę do Wymarzonego Domu
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Skontaktuj się ze mną, aby rozpocząć swoją podróż do wymarzonego domu. 
                Jestem tutaj, aby pomóc Ci w każdym kroku tej ważnej decyzji.
              </p>
            </div>
            
            <div ref={contactInfoRef} className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3 scroll-mt-8">
              <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg h-64 justify-center text-center">
                <PhoneIcon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Szybki Kontakt</h3>
                <div className="space-y-2">
                  <p className="text-gray-600 font-medium">+48 123 456 789</p>
                  <p className="text-gray-500 text-sm">Dostępny: 9:00-17:00</p>
                </div>
              </div>

              <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg h-64 justify-center text-center">
                <EnvelopeIcon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Zapytaj o Szczegóły</h3>
                <div className="space-y-2">
                  <p className="text-gray-600 font-medium">kontakt@reagents.pl</p>
                  <p className="text-gray-500 text-sm">Odpowiadam w 24h</p>
                </div>
              </div>

              <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-lg h-64 justify-center text-center">
                <MapPinIcon className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-4">Umów Spotkanie</h3>
                <div className="space-y-2">
                  <p className="text-gray-600 font-medium">ul. Przykładowa 123</p>
                  <p className="text-gray-500 text-sm">00-001 Warszawa</p>
                </div>
              </div>
            </div>

            <div ref={mapRef} className="mt-16 scroll-mt-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Znajdź Nas</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Nasze biuro znajduje się w centrum Warszawy. Umów się na spotkanie 
                  lub odwiedź nas osobiście, aby omówić swoje plany.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.7977787027856!2d21.012228776944276!3d52.23083747198037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c92692e49%3A0xc2e97552d0017aa0!2sPa%C5%82ac%20Kultury%20i%20Nauki!5e0!3m2!1spl!2spl!4v1701234567890!5m2!1spl!2spl"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            {/* Animowana strzałka */}
            <ScrollArrow targetRef={mapRef} />
          </div>
        </div>
      </div>
      
      {/* Animowana strzałka do sekcji kontaktowej */}
      <ScrollArrow targetRef={contactInfoRef} />
    </main>
  )
} 