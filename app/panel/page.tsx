'use client'

import { useState, useEffect } from 'react'
import { 
  HomeIcon, 
  UserGroupIcon, 
  BuildingOfficeIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  CogIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ClockIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'

interface Client {
  id: number
  name: string
  email: string
  phone: string
  status: 'aktywny' | 'potencjalny' | 'nieaktywny'
  lastContact: string
  notes: string
}

interface Property {
  id: number
  title: string
  type: 'mieszkanie' | 'dom' | 'działka' | 'lokal'
  price: number
  location: string
  status: 'na sprzedaż' | 'sprzedane' | 'zarezerwowane'
  area: number
  rooms: number
  images: string[]
}

interface Meeting {
  id: number
  clientName: string
  date: string
  time: string
  type: 'pokaz' | 'konsultacja' | 'negocjacje'
  status: 'zaplanowane' | 'zakończone' | 'odwołane'
}

const defaultProperties: Property[] = [
  {
    id: 1,
    title: 'Przestronne mieszkanie 3-pokojowe',
    type: 'mieszkanie',
    price: 450000,
    location: 'Centrum, Warszawa',
    status: 'na sprzedaż',
    area: 75,
    rooms: 3,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 2,
    title: 'Dom z ogrodem 150m²',
    type: 'dom',
    price: 850000,
    location: 'Podkowa Leśna',
    status: 'sprzedane',
    area: 150,
    rooms: 5,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ]
  },
  {
    id: 3,
    title: 'Nowoczesny loft 80m²',
    type: 'mieszkanie',
    price: 690000,
    location: 'Wola, Warszawa',
    status: 'na sprzedaż',
    area: 80,
    rooms: 2,
    images: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
    ]
  }
]

export default function AgentPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [clients] = useState<Client[]>([
    {
      id: 1,
      name: 'Jan Kowalski',
      email: 'jan.kowalski@email.com',
      phone: '+48 123 456 789',
      status: 'aktywny',
      lastContact: '2024-01-15',
      notes: 'Interesuje się mieszkaniami 3-pokojowymi w centrum'
    },
    {
      id: 2,
      name: 'Anna Nowak',
      email: 'anna.nowak@email.com',
      phone: '+48 987 654 321',
      status: 'potencjalny',
      lastContact: '2024-01-10',
      notes: 'Szuka domu z ogrodem na przedmieściach'
    }
  ])

  const [properties, setProperties] = useState<Property[]>(defaultProperties)

  const [meetings] = useState<Meeting[]>([
    {
      id: 1,
      clientName: 'Jan Kowalski',
      date: '2024-01-20',
      time: '14:00',
      type: 'pokaz',
      status: 'zaplanowane'
    },
    {
      id: 2,
      clientName: 'Anna Nowak',
      date: '2024-01-18',
      time: '10:00',
      type: 'konsultacja',
      status: 'zakończone'
    }
  ])

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('properties') : null
      if (saved) {
        const parsed: Property[] = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          const map = new Map<number, Property>()
          defaultProperties.forEach(p => map.set(p.id, p))
          parsed.forEach(p => map.set(p.id, p))
          const merged = Array.from(map.values()).sort((a, b) => a.id - b.id)
          setProperties(merged)
        }
      }
    } catch (_) {}
  }, [])

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('properties', JSON.stringify(properties))
      }
    } catch (_) {}
  }, [properties])

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
    { id: 'clients', name: 'Klienci', icon: UserGroupIcon },
    { id: 'properties', name: 'Nieruchomości', icon: BuildingOfficeIcon },
    { id: 'meetings', name: 'Spotkania', icon: CalendarIcon },
    { id: 'documents', name: 'Dokumenty', icon: DocumentTextIcon },
    { id: 'analytics', name: 'Analizy', icon: ChartBarIcon },
    { id: 'settings', name: 'Ustawienia', icon: CogIcon }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'aktywny':
      case 'na sprzedaż':
      case 'zaplanowane':
        return 'bg-green-100 text-green-800'
      case 'potencjalny':
      case 'zarezerwowane':
        return 'bg-yellow-100 text-yellow-800'
      case 'nieaktywny':
      case 'sprzedane':
      case 'zakończone':
        return 'bg-gray-100 text-gray-800'
      case 'odwołane':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN'
    }).format(price)
  }

  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false)
  const [newProperty, setNewProperty] = useState<Omit<Property, 'id'>>({
    title: '',
    type: 'mieszkanie',
    price: 0,
    location: '',
    status: 'na sprzedaż',
    area: 0,
    rooms: 1,
    images: []
  })

  const handleNewPropertyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewProperty(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'area' || name === 'rooms' ? Number(value) : value
    }))
  }

  const readFilesAsDataUrls = (files: FileList): Promise<string[]> => {
    const fileArray = Array.from(files)
    return Promise.all(
      fileArray.map(
        file =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
      )
    )
  }

  const handleImagesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const urls = await readFilesAsDataUrls(files)
    setNewProperty(prev => ({ ...prev, images: urls }))
  }

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault()
    const nextId = properties.length ? Math.max(...properties.map(p => p.id)) + 1 : 1
    const toAdd: Property = { id: nextId, ...newProperty }
    setProperties(prev => [toAdd, ...prev])
    setIsPropertyModalOpen(false)
    setNewProperty({
      title: '',
      type: 'mieszkanie',
      price: 0,
      location: '',
      status: 'na sprzedaż',
      area: 0,
      rooms: 1,
      images: []
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Panel Agenta</h1>
              <p className="text-gray-600 text-sm sm:text-base">Witaj w panelu zarządzania</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Dodaj klienta</span>
                <span className="sm:hidden">Klient</span>
              </button>
              <button className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <PlusIcon className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Dodaj nieruchomość</span>
                <span className="sm:hidden">Nieruchomość</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Tab Selector */}
        <div className="sm:hidden bg-white shadow rounded-lg mb-6">
          <div className="p-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <span>{tabs.find(tab => tab.id === activeTab)?.name}</span>
              <Bars3Icon className="h-5 w-5" />
            </button>
            
            {isMobileMenuOpen && (
              <div className="mt-2 border border-gray-200 rounded-md bg-white">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center px-4 py-2 text-sm ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden sm:block bg-white shadow rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Przegląd</h2>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-blue-600">Aktywni klienci</p>
                      <p className="text-lg sm:text-2xl font-bold text-blue-900">{clients.filter(c => c.status === 'aktywny').length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-green-600">Nieruchomości</p>
                      <p className="text-lg sm:text-2xl font-bold text-green-900">{properties.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg">
                  <div className="flex items-center">
                    <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-yellow-600">Spotkania dziś</p>
                      <p className="text-lg sm:text-2xl font-bold text-yellow-900">{meetings.filter(m => m.status === 'zaplanowane').length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 sm:p-6 rounded-lg">
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                    <div className="ml-3 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-purple-600">Sprzedane</p>
                      <p className="text-lg sm:text-2xl font-bold text-purple-900">{properties.filter(p => p.status === 'sprzedane').length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Ostatnie spotkania</h3>
                  <div className="space-y-3">
                    {meetings.slice(0, 3).map((meeting) => (
                      <div key={meeting.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{meeting.clientName}</p>
                          <p className="text-sm text-gray-500">{meeting.date} o {meeting.time}</p>
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Najnowsze nieruchomości</h3>
                  <div className="space-y-3">
                    {properties.slice(0, 3).map((property) => (
                      <div key={property.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
                          <p className="text-sm text-gray-500 truncate">{property.location}</p>
                        </div>
                        <div className="text-right min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{formatPrice(property.price)}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                            {property.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'clients' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Klienci</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Szukaj klientów..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Dodaj klienta
                  </button>
                </div>
              </div>

              {/* Mobile Cards View */}
              <div className="sm:hidden space-y-4">
                {clients.map((client) => (
                  <div key={client.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{client.name}</h3>
                        <div className="mt-1 space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <EnvelopeIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{client.email}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <PhoneIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{client.phone}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>Ostatni kontakt: {client.lastContact}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{client.notes}</p>
                      </div>
                      <div className="ml-4 flex flex-col items-end space-y-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 text-sm">Edytuj</button>
                          <button className="text-red-600 hover:text-red-900 text-sm">Usuń</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ostatni kontakt</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notatki</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akcje</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients.map((client) => (
                      <tr key={client.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{client.name}</div>
                            <div className="text-sm text-gray-500">{client.email}</div>
                            <div className="text-sm text-gray-500">{client.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                            {client.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {client.lastContact}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {client.notes}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Edytuj</button>
                          <button className="text-red-600 hover:text-red-900">Usuń</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Nieruchomości</h2>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Szukaj nieruchomości..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button onClick={() => setIsPropertyModalOpen(true)} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Dodaj nieruchomość
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-32 sm:h-48 bg-gray-200">
                      {property.images && property.images.length > 0 ? (
                        <img src={property.images[0]} alt={property.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <BuildingOfficeIcon className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 line-clamp-2">{property.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{property.location}</span>
                        </div>
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{formatPrice(property.price)}</span>
                        </div>
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span>{property.area}m² • {property.rooms} pokoi</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                          {property.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 text-sm">Edytuj</button>
                          <button className="text-red-600 hover:text-red-900 text-sm">Usuń</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'meetings' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Spotkania</h2>
                <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Dodaj spotkanie
                </button>
              </div>

              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div className="flex items-start sm:items-center space-x-4">
                        <div className="flex-shrink-0">
                          <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base sm:text-lg font-medium text-gray-900">{meeting.clientName}</h3>
                          <div className="mt-1 sm:mt-0 space-y-1 sm:space-y-0 sm:space-x-4 sm:flex sm:items-center">
                            <p className="text-sm text-gray-500">{meeting.date} o {meeting.time}</p>
                            <p className="text-sm text-gray-500 capitalize">{meeting.type}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(meeting.status)}`}>
                          {meeting.status}
                        </span>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 text-sm">Edytuj</button>
                          <button className="text-red-600 hover:text-red-900 text-sm">Usuń</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Dokumenty</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border-2 border-dashed border-blue-200">
                  <DocumentTextIcon className="h-8 w-8 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-blue-900 text-center mb-2">Umowy kupna-sprzedaży</h3>
                  <p className="text-blue-700 text-center text-sm">Zarządzaj umowami i dokumentami transakcyjnymi</p>
                </div>
                <div className="bg-green-50 p-4 sm:p-6 rounded-lg border-2 border-dashed border-green-200">
                  <DocumentTextIcon className="h-8 w-8 sm:h-12 sm:w-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-green-900 text-center mb-2">Dokumenty klientów</h3>
                  <p className="text-green-700 text-center text-sm">Przechowuj dokumenty i dane klientów</p>
                </div>
                <div className="bg-purple-50 p-4 sm:p-6 rounded-lg border-2 border-dashed border-purple-200">
                  <DocumentTextIcon className="h-8 w-8 sm:h-12 sm:w-12 text-purple-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-purple-900 text-center mb-2">Szablony</h3>
                  <p className="text-purple-700 text-center text-sm">Gotowe szablony dokumentów</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Analizy i raporty</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Sprzedaże w tym miesiącu</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Liczba transakcji</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Wartość sprzedaży</span>
                      <span className="font-medium">2,450,000 PLN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Średnia cena</span>
                      <span className="font-medium">204,167 PLN</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Aktywność klientów</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Nowi klienci</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Aktywni klienci</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm sm:text-base text-gray-600">Spotkania</span>
                      <span className="font-medium">15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Ustawienia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Profil</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Imię i nazwisko</label>
                      <input type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Telefon</label>
                      <input type="tel" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Powiadomienia</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-900">Powiadomienia email</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-900">Powiadomienia SMS</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                      <label className="ml-2 block text-sm text-gray-900">Przypomnienia o spotkaniach</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isPropertyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Nowa nieruchomość</h3>
              <button onClick={() => setIsPropertyModalOpen(false)} className="text-gray-500 hover:text-gray-700">Zamknij</button>
            </div>
            <form onSubmit={handleAddProperty} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Tytuł</label>
                <input name="title" value={newProperty.title} onChange={handleNewPropertyChange} type="text" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Typ</label>
                <select name="type" value={newProperty.type} onChange={handleNewPropertyChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option value="mieszkanie">Mieszkanie</option>
                  <option value="dom">Dom</option>
                  <option value="działka">Działka</option>
                  <option value="lokal">Lokal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select name="status" value={newProperty.status} onChange={handleNewPropertyChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                  <option value="na sprzedaż">Na sprzedaż</option>
                  <option value="sprzedane">Sprzedane</option>
                  <option value="zarezerwowane">Zarezerwowane</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cena (PLN)</label>
                <input name="price" value={newProperty.price} onChange={handleNewPropertyChange} type="number" min="0" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Powierzchnia (m²)</label>
                <input name="area" value={newProperty.area} onChange={handleNewPropertyChange} type="number" min="0" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Pokoje</label>
                <input name="rooms" value={newProperty.rooms} onChange={handleNewPropertyChange} type="number" min="1" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Lokalizacja</label>
                <input name="location" value={newProperty.location} onChange={handleNewPropertyChange} type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Zdjęcia</label>
                <input onChange={handleImagesSelected} type="file" accept="image/*" multiple className="mt-1 block w-full text-sm text-gray-600" />
                {newProperty.images.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {newProperty.images.map((img, idx) => (
                      <img key={idx} src={img} alt={`Podgląd ${idx + 1}`} className="w-full h-24 object-cover rounded" />
                    ))}
                  </div>
                )}
              </div>
              <div className="sm:col-span-2 flex justify-end space-x-3 mt-2">
                <button type="button" onClick={() => setIsPropertyModalOpen(false)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Anuluj</button>
                <button type="submit" className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">Zapisz</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 