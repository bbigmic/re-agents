'use client'

import { useState, useRef, useEffect } from 'react'
import { CalendarDaysIcon, ClockIcon, UserIcon, HomeIcon, PhoneIcon, EnvelopeIcon, HeartIcon, ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import ImageCarousel from './components/ImageCarousel'
import ScrollArrow from './components/ScrollArrow'
import { motion, useScroll, useInView, useAnimation } from 'framer-motion'

// Przykładowe obrazy - należy zastąpić właściwymi URL-ami
const offerImages = [
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
]

const heroImages = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
]

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    propertyType: 'mieszkanie',
    transactionType: 'kupić',
    message: ''
  })

  // Referencje do sekcji dla animacji
  const emotionsSectionRef = useRef(null)
  const logicSectionRef = useRef(null)
  const offerSectionRef = useRef(null)
  const formSectionRef = useRef(null)

  // Sprawdzanie, czy sekcje są widoczne
  const emotionsInView = useInView(emotionsSectionRef, { once: true, amount: 0.3 })
  const logicInView = useInView(logicSectionRef, { once: true, amount: 0.3 })
  const offerInView = useInView(offerSectionRef, { once: true, amount: 0.3 })
  const formInView = useInView(formSectionRef, { once: true, amount: 0.3 })

  // Warianty animacji
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Tu można dodać logikę wysyłania formularza
    console.log(formData)
    alert('Dziękuję za umówienie spotkania! Skontaktuję się wkrótce.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 top-0">
      {/* Hero Section */}
      <motion.div 
        className="min-h-screen relative flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Tło */}
        <ImageCarousel images={heroImages} />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Zawartość */}
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Lewa strona - tekst */}
            <motion.div 
              className="text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Znajdę dla Ciebie Idealny Dom
              </h1>
              <p className="mt-3 text-sm sm:text-base md:mt-5 md:text-xl">
                Oszczędź czas i stres - zajmę się wszystkimi formalnościami, negocjacjami i dokumentami, 
                abyś mógł skupić się na tym, co najważniejsze - swojej przyszłości w wymarzonym domu.
              </p>
            </motion.div>
            
            {/* Prawa strona - zdjęcie agenta */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Agent nieruchomości"
                  className="rounded-full object-cover w-full h-full shadow-2xl border-4 border-white"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Animowana strzałka */}
        <ScrollArrow targetRef={emotionsSectionRef} />
      </motion.div>

      {/* Emotions Section */}
      <motion.div 
        ref={emotionsSectionRef}
        className="min-h-screen relative bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center overflow-hidden scroll-mt-8"
        variants={fadeInUp}
        initial="hidden"
        animate={emotionsInView ? "visible" : "hidden"}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={emotionsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeartIcon className="h-8 w-8 sm:h-12 sm:w-12 text-white mx-auto mb-4" />
            </motion.div>
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={emotionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Bezpieczna Przyszłość w Wymarzonym Domu
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={emotionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Twój dom to nie tylko inwestycja - to fundament Twojego życia. 
              Dzięki mojemu doświadczeniu i znajomości rynku, znajdziesz miejsce, 
              które nie tylko spełni Twoje oczekiwania, ale również zapewni 
              bezpieczną przyszłość dla Ciebie i Twojej rodziny.
            </motion.p>
          </div>
        </div>
        
        {/* Animowana strzałka */}
        <ScrollArrow targetRef={logicSectionRef} />
      </motion.div>

      {/* Logic Section */}
      <motion.div 
        ref={logicSectionRef}
        className="min-h-screen relative bg-white flex items-center overflow-hidden scroll-mt-8"
        variants={fadeInUp}
        initial="hidden"
        animate={logicInView ? "visible" : "hidden"}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={logicInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ChartBarIcon className="h-8 w-8 sm:h-12 sm:w-12 text-white mx-auto mb-4" />
            </motion.div>
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={logicInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Podejmuj Mądre Decyzje Inwestycyjne
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-10"
              variants={staggerChildren}
              initial="hidden"
              animate={logicInView ? "visible" : "hidden"}
            >
              <motion.div 
                className="p-4 sm:p-6 bg-black/50 backdrop-blur-sm rounded-lg"
                variants={fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Zyskowna Wycena</h3>
                <p className="text-sm sm:text-base">Otrzymasz szczegółową analizę wartości nieruchomości, która pomoże Ci 
                   podjąć najkorzystniejszą decyzję finansową</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-6 bg-black/50 backdrop-blur-sm rounded-lg"
                variants={fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Pewna Inwestycja</h3>
                <p className="text-sm sm:text-base">Poznasz aktualne trendy rynkowe i prognozy, które zabezpieczą 
                   Twoją inwestycję na przyszłość</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-6 bg-black/50 backdrop-blur-sm rounded-lg"
                variants={fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Najlepszy Moment</h3>
                <p className="text-sm sm:text-base">Dowiesz się, kiedy kupić lub sprzedać, aby zmaksymalizować 
                   swój zysk i bezpieczeństwo transakcji</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Animowana strzałka */}
        <ScrollArrow targetRef={offerSectionRef} />
      </motion.div>

      {/* Offer Section */}
      <motion.div 
        ref={offerSectionRef}
        className="min-h-screen relative bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center md:items-center items-start overflow-hidden scroll-mt-8 pb-28 md:pb-16 pt-20 md:pt-0"
        variants={fadeInUp}
        initial="hidden"
        animate={offerInView ? "visible" : "hidden"}
      >
        <ImageCarousel images={offerImages} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={offerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SparklesIcon className="h-8 w-8 sm:h-12 sm:w-12 text-white mx-auto mb-4" />
            </motion.div>
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={offerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Kompleksowa Pomoc w Każdej Transakcji
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-8 sm:mt-10"
              variants={staggerChildren}
              initial="hidden"
              animate={offerInView ? "visible" : "hidden"}
            >
              <motion.div 
                className="p-4 sm:p-6 bg-black/50 backdrop-blur-sm rounded-lg"
                variants={fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Sprzedaż</h3>
                <p className="text-sm sm:text-base">Uzyskaj najlepszą cenę za swoją nieruchomość dzięki profesjonalnej prezentacji i skutecznym negocjacjom</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-6 bg-black/50 backdrop-blur-sm rounded-lg"
                variants={fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Zakup</h3>
                <p className="text-sm sm:text-base">Znajdź idealną nieruchomość w najlepszej cenie, bez stresu i ukrytych kosztów</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-6 bg-black/50 backdrop-blur-sm rounded-lg"
                variants={fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Wynajem</h3>
                <p className="text-sm sm:text-base">Zyskaj pewnego najemcę lub znajdź idealne mieszkanie na wynajem z pełnym bezpieczeństwem prawnym</p>
              </motion.div>
              <motion.div 
                className="p-4 sm:p-6 bg-black/50 backdrop-blur-sm rounded-lg"
                variants={fadeInUp}
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Doradztwo</h3>
                <p className="text-sm sm:text-base">Podejmuj świadome decyzje inwestycyjne dzięki eksperckiej wiedzy o rynku nieruchomości</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Animowana strzałka */}
        <ScrollArrow targetRef={formSectionRef} />
      </motion.div>

      {/* Form Section */}
      <motion.div 
        ref={formSectionRef}
        className="min-h-screen relative flex items-start md:items-center justify-center px-4 py-16 sm:px-6 lg:px-8 scroll-mt-12 pt-36 md:pt-0"
        variants={fadeInUp}
        initial="hidden"
        animate={formInView ? "visible" : "hidden"}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.form 
          onSubmit={handleSubmit} 
          className="relative w-full max-w-2xl space-y-8 divide-y divide-gray-200 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 sm:p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">Umów Bezpłatną Konsultację</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">Pierwszy krok do Twojej wymarzonej nieruchomości</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
              variants={staggerChildren}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
            >
              <motion.div className="sm:col-span-6" variants={fadeInUp}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md touch-target"
                    placeholder="Imię i nazwisko"
                  />
                </div>
              </motion.div>

              <motion.div className="sm:col-span-6" variants={fadeInUp}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md touch-target"
                    placeholder="Adres email"
                  />
                </div>
              </motion.div>

              <motion.div className="sm:col-span-6" variants={fadeInUp}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md touch-target"
                    placeholder="Numer telefonu"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="pt-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">Szczegóły spotkania</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">Wybierz preferowany termin spotkania.</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
              variants={staggerChildren}
              initial="hidden"
              animate={formInView ? "visible" : "hidden"}
            >
              <motion.div className="sm:col-span-3" variants={fadeInUp}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    min={format(new Date(), 'yyyy-MM-dd')}
                    className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md touch-target"
                  />
                </div>
              </motion.div>

              <motion.div className="sm:col-span-3" variants={fadeInUp}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ClockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md touch-target"
                  />
                </div>
              </motion.div>

              <motion.div className="sm:col-span-3" variants={fadeInUp}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HomeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="propertyType"
                    id="propertyType"
                    required
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md touch-target"
                  >
                    <option value="mieszkanie">Mieszkanie</option>
                    <option value="dom">Dom</option>
                    <option value="działka">Działka</option>
                    <option value="lokal">Lokal użytkowy</option>
                  </select>
                </div>
              </motion.div>

              <motion.div className="sm:col-span-3" variants={fadeInUp}>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SparklesIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    name="transactionType"
                    id="transactionType"
                    required
                    value={formData.transactionType}
                    onChange={handleChange}
                    className="pl-10 block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md touch-target"
                  >
                    <option value="kupić">Chcę kupić</option>
                    <option value="sprzedać">Chcę sprzedać</option>
                  </select>
                </div>
              </motion.div>

              <motion.div className="sm:col-span-6" variants={fadeInUp}>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 rounded-md touch-target"
                  placeholder="Dodatkowe uwagi lub pytania..."
                />
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className="pt-5"
            initial={{ opacity: 0 }}
            animate={formInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex justify-end">
              <motion.button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Umów spotkanie
              </motion.button>
            </div>
          </motion.div>
        </motion.form>
      </motion.div>
    </main>
  )
} 