import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  Filter, 
  Phone, 
  Mail, 
  MapPin,
  Eye,
  Edit,
  MoreVertical
} from 'lucide-react'

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data
  const clients = [
    {
      id: 1,
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      phone: '+54 11 1234-5678',
      address: 'Av. Corrientes 1234, CABA',
      totalOrders: 12,
      totalSpent: 45600,
      lastOrder: '2024-10-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+54 11 2345-6789',
      address: 'San Martín 567, Vicente López',
      totalOrders: 8,
      totalSpent: 32400,
      lastOrder: '2024-10-10',
      status: 'active'
    },
    {
      id: 3,
      name: 'Carlos Rodriguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+54 11 3456-7890',
      address: 'Belgrano 890, San Isidro',
      totalOrders: 15,
      totalSpent: 67800,
      lastOrder: '2024-10-20',
      status: 'vip'
    },
    {
      id: 4,
      name: 'Ana Martínez',
      email: 'ana.martinez@email.com',
      phone: '+54 11 4567-8901',
      address: 'Rivadavia 234, Flores',
      totalOrders: 3,
      totalSpent: 12300,
      lastOrder: '2024-09-28',
      status: 'inactive'
    },
    {
      id: 5,
      name: 'Roberto Silva',
      email: 'roberto.silva@email.com',
      phone: '+54 11 5678-9012',
      address: 'Libertador 1567, Palermo',
      totalOrders: 20,
      totalSpent: 89400,
      lastOrder: '2024-10-22',
      status: 'vip'
    }
  ]

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || client.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Activo', class: 'status-badge bg-green-100 text-green-800' },
      inactive: { label: 'Inactivo', class: 'status-badge bg-gray-100 text-gray-800' },
      vip: { label: 'VIP', class: 'status-badge bg-purple-100 text-purple-800' }
    }
    const config = statusConfig[status] || statusConfig.active
    return <span className={config.class}>{config.label}</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Clientes</h1>
          <p className="text-gray-600">Administra la información de tus clientes</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Clientes</p>
          <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Clientes Activos</p>
          <p className="text-2xl font-bold text-green-600">
            {clients.filter(c => c.status === 'active').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Clientes VIP</p>
          <p className="text-2xl font-bold text-purple-600">
            {clients.filter(c => c.status === 'vip').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Ingresos Totales</p>
          <p className="text-2xl font-bold text-blue-600">
            ${clients.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Clients Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Órdenes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Gastado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {client.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="h-3 w-3 mr-2 text-gray-400" />
                        {client.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="h-3 w-3 mr-2 text-gray-400" />
                        {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.totalOrders} órdenes</div>
                    <div className="text-sm text-gray-500">Última: {client.lastOrder}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${client.totalSpent.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(client.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/clientes/${client.id}`}
                        className="text-primary-600 hover:text-primary-900 p-1 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1 rounded">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Clients
