'use client'

import { useState } from 'react'
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
  ClockIcon
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
}

interface Meeting {
  id: number
  clientName: string
  date: string
  time: string
  type: 'pokaz' | 'konsultacja' | 'negocjacje'
  status: 'zaplanowane' | 'zakończone' | 'odwołane'
}

export default function AgentPanel() {
  const [activeTab, setActiveTab] = useState('dashboard')
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

  const [properties] = useState<Property[]>([
    {
      id: 1,
      title: 'Przestronne mieszkanie 3-pokojowe',
      type: 'mieszkanie',
      price: 450000,
      location: 'Centrum, Warszawa',
      status: 'na sprzedaż',
      area: 75,
      rooms: 3
    },
    {
      id: 2,
      title: 'Dom z ogrodem 150m²',
      type: 'dom',
      price: 850000,
      location: 'Podkowa Leśna',
      status: 'sprzedane',
      area: 150,
      rooms: 5
    }
  ])

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

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel Agenta</h1>
              <p className="text-gray-600">Witaj w panelu zarządzania</p>
            </div>
            <div className="flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <PlusIcon className="h-4 w-4 mr-2" />
                Dodaj klienta
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <PlusIcon className="h-4 w-4 mr-2" />
                Dodaj nieruchomość
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
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
        <div className="bg-white shadow rounded-lg p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Przegląd</h2>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-blue-600">Aktywni klienci</p>
                      <p className="text-2xl font-bold text-blue-900">{clients.filter(c => c.status === 'aktywny').length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <BuildingOfficeIcon className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-green-600">Nieruchomości</p>
                      <p className="text-2xl font-bold text-green-900">{properties.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <CalendarIcon className="h-8 w-8 text-yellow-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-yellow-600">Spotkania dziś</p>
                      <p className="text-2xl font-bold text-yellow-900">{meetings.filter(m => m.status === 'zaplanowane').length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-purple-600">Sprzedane</p>
                      <p className="text-2xl font-bold text-purple-900">{properties.filter(p => p.status === 'sprzedane').length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Ostatnie spotkania</h3>
                  <div className="space-y-3">
                    {meetings.slice(0, 3).map((meeting) => (
                      <div key={meeting.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{meeting.clientName}</p>
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Najnowsze nieruchomości</h3>
                  <div className="space-y-3">
                    {properties.slice(0, 3).map((property) => (
                      <div key={property.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">{property.title}</p>
                          <p className="text-sm text-gray-500">{property.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{formatPrice(property.price)}</p>
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
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Klienci</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Szukaj klientów..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Dodaj klienta
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
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
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Nieruchomości</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Szukaj nieruchomości..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Dodaj nieruchomość
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <BuildingOfficeIcon className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">{property.title}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          {property.location}
                        </div>
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                          {formatPrice(property.price)}
                        </div>
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                          {property.area}m² • {property.rooms} pokoi
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
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Spotkania</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Dodaj spotkanie
                </button>
              </div>

              <div className="space-y-4">
                {meetings.map((meeting) => (
                  <div key={meeting.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <CalendarIcon className="h-8 w-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">{meeting.clientName}</h3>
                          <p className="text-sm text-gray-500">{meeting.date} o {meeting.time}</p>
                          <p className="text-sm text-gray-500 capitalize">{meeting.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
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
              <h2 className="text-xl font-semibold text-gray-900">Dokumenty</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg border-2 border-dashed border-blue-200">
                  <DocumentTextIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-blue-900 text-center mb-2">Umowy kupna-sprzedaży</h3>
                  <p className="text-blue-700 text-center text-sm">Zarządzaj umowami i dokumentami transakcyjnymi</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border-2 border-dashed border-green-200">
                  <DocumentTextIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-green-900 text-center mb-2">Dokumenty klientów</h3>
                  <p className="text-green-700 text-center text-sm">Przechowuj dokumenty i dane klientów</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border-2 border-dashed border-purple-200">
                  <DocumentTextIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-purple-900 text-center mb-2">Szablony</h3>
                  <p className="text-purple-700 text-center text-sm">Gotowe szablony dokumentów</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Analizy i raporty</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Sprzedaże w tym miesiącu</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Liczba transakcji</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Wartość sprzedaży</span>
                      <span className="font-medium">2,450,000 PLN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Średnia cena</span>
                      <span className="font-medium">204,167 PLN</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Aktywność klientów</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nowi klienci</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aktywni klienci</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Spotkania</span>
                      <span className="font-medium">15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Ustawienia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Profil</h3>
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
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Powiadomienia</h3>
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
    </div>
  )
} 