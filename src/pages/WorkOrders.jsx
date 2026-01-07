import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  Filter, 
  Calendar,
  User,
  Clock,
  Eye,
  Edit,
  MoreVertical,
  AlertCircle
} from 'lucide-react'

const WorkOrders = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data
  const workOrders = [
    {
      id: 'ORD-001',
      clientName: 'Juan Pérez',
      clientId: 1,
      service: 'Reparación de motor',
      description: 'Motor hace ruido extraño, posible problema en válvulas',
      status: 'pending',
      priority: 'high',
      technician: 'Carlos Méndez',
      createdDate: '2024-10-20',
      dueDate: '2024-10-25',
      estimatedHours: 8,
      amount: 8500
    },
    {
      id: 'ORD-002',
      clientName: 'María González',
      clientId: 2,
      service: 'Cambio de aceite y filtros',
      description: 'Mantenimiento preventivo programado',
      status: 'in-progress',
      priority: 'medium',
      technician: 'Ana López',
      createdDate: '2024-10-18',
      dueDate: '2024-10-22',
      estimatedHours: 2,
      amount: 3200
    },
    {
      id: 'ORD-003',
      clientName: 'Carlos Rodriguez',
      clientId: 3,
      service: 'Revisión general',
      description: 'Inspección completa del vehículo',
      status: 'completed',
      priority: 'low',
      technician: 'Roberto Silva',
      createdDate: '2024-10-15',
      dueDate: '2024-10-20',
      estimatedHours: 4,
      amount: 5400
    },
    {
      id: 'ORD-004',
      clientName: 'Ana Martínez',
      clientId: 4,
      service: 'Reparación de frenos',
      description: 'Cambio de pastillas y discos delanteros',
      status: 'in-progress',
      priority: 'high',
      technician: 'Carlos Méndez',
      createdDate: '2024-10-19',
      dueDate: '2024-10-24',
      estimatedHours: 6,
      amount: 6800
    },
    {
      id: 'ORD-005',
      clientName: 'Roberto Silva',
      clientId: 5,
      service: 'Cambio de transmisión',
      description: 'Reemplazo completo de caja de cambios',
      status: 'pending',
      priority: 'medium',
      technician: 'Ana López',
      createdDate: '2024-10-21',
      dueDate: '2024-10-28',
      estimatedHours: 12,
      amount: 12000
    }
  ]

  const filteredOrders = workOrders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pendiente', class: 'status-badge status-pending' },
      'in-progress': { label: 'En Proceso', class: 'status-badge status-in-progress' },
      completed: { label: 'Completado', class: 'status-badge status-completed' }
    }
    const config = statusConfig[status] || statusConfig.pending
    return <span className={config.class}>{config.label}</span>
  }

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: 'Alta', class: 'status-badge bg-red-100 text-red-800' },
      medium: { label: 'Media', class: 'status-badge bg-yellow-100 text-yellow-800' },
      low: { label: 'Baja', class: 'status-badge bg-green-100 text-green-800' }
    }
    const config = priorityConfig[priority] || priorityConfig.medium
    return <span className={config.class}>{config.label}</span>
  }

  const isOverdue = (dueDate, status) => {
    if (status === 'completed') return false
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Órdenes de Trabajo</h1>
          <p className="text-gray-600">Gestiona las órdenes de servicio del taller</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Orden
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por orden, cliente o servicio..."
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
              <option value="pending">Pendientes</option>
              <option value="in-progress">En Proceso</option>
              <option value="completed">Completadas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Órdenes</p>
          <p className="text-2xl font-bold text-gray-900">{workOrders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">
            {workOrders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">En Proceso</p>
          <p className="text-2xl font-bold text-blue-600">
            {workOrders.filter(o => o.status === 'in-progress').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Completadas</p>
          <p className="text-2xl font-bold text-green-600">
            {workOrders.filter(o => o.status === 'completed').length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Técnico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prioridad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Límite
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Link 
                        to={`/ordenes/${order.id}`}
                        className="text-primary-600 hover:text-primary-900 font-medium"
                      >
                        {order.id}
                      </Link>
                      {isOverdue(order.dueDate, order.status) && (
                        <AlertCircle className="h-4 w-4 text-red-500 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/clientes/${order.clientId}`}
                      className="text-sm text-gray-900 hover:text-primary-600"
                    >
                      {order.clientName}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.service}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {order.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{order.technician}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(order.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className={`text-sm ${isOverdue(order.dueDate, order.status) ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                          {order.dueDate}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {order.estimatedHours}h est.
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/ordenes/${order.id}`}
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

export default WorkOrders
