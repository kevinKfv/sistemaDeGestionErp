import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Plus, 
  Filter, 
  Calendar,
  DollarSign,
  Eye,
  Edit,
  MoreVertical,
  Send,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'

const Budgets = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  // Mock data
  const budgets = [
    {
      id: 'PRES-001',
      clientName: 'Juan Pérez',
      clientId: 1,
      description: 'Cambio de transmisión completa',
      services: ['Desmontaje de transmisión', 'Instalación de transmisión nueva', 'Pruebas de funcionamiento'],
      status: 'pending',
      createdDate: '2024-10-22',
      validUntil: '2024-11-05',
      amount: 12000,
      sentDate: '2024-10-22',
      orderId: null
    },
    {
      id: 'PRES-002',
      clientName: 'María González',
      clientId: 2,
      description: 'Reparación sistema de frenos',
      services: ['Cambio de pastillas delanteras', 'Cambio de discos', 'Revisión sistema hidráulico'],
      status: 'approved',
      createdDate: '2024-10-18',
      validUntil: '2024-11-01',
      amount: 6800,
      sentDate: '2024-10-18',
      approvedDate: '2024-10-20',
      orderId: 'ORD-004'
    },
    {
      id: 'PRES-003',
      clientName: 'Carlos Rodriguez',
      clientId: 3,
      description: 'Mantenimiento preventivo completo',
      services: ['Cambio de aceite', 'Revisión de filtros', 'Inspección general', 'Alineación y balanceo'],
      status: 'rejected',
      createdDate: '2024-10-15',
      validUntil: '2024-10-29',
      amount: 4500,
      sentDate: '2024-10-15',
      rejectedDate: '2024-10-17',
      orderId: null
    },
    {
      id: 'PRES-004',
      clientName: 'Ana Martínez',
      clientId: 4,
      description: 'Reparación de motor - Diagnóstico completo',
      services: ['Diagnóstico computarizado', 'Revisión de válvulas', 'Cambio de bujías', 'Ajuste de motor'],
      status: 'draft',
      createdDate: '2024-10-23',
      validUntil: '2024-11-06',
      amount: 8900,
      sentDate: null,
      orderId: null
    },
    {
      id: 'PRES-005',
      clientName: 'Roberto Silva',
      clientId: 5,
      description: 'Instalación de sistema de aire acondicionado',
      services: ['Instalación de compresor', 'Instalación de condensador', 'Carga de gas refrigerante', 'Pruebas'],
      status: 'pending',
      createdDate: '2024-10-21',
      validUntil: '2024-11-04',
      amount: 15600,
      sentDate: '2024-10-21',
      orderId: null
    }
  ]

  const filteredBudgets = budgets.filter(budget => {
    const matchesSearch = budget.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         budget.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         budget.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || budget.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    const statusConfig = {
      draft: { label: 'Borrador', class: 'status-badge bg-gray-100 text-gray-800', icon: Edit },
      pending: { label: 'Pendiente', class: 'status-badge status-pending', icon: Clock },
      approved: { label: 'Aprobado', class: 'status-badge status-approved', icon: CheckCircle },
      rejected: { label: 'Rechazado', class: 'status-badge status-rejected', icon: XCircle }
    }
    const config = statusConfig[status] || statusConfig.draft
    const IconComponent = config.icon
    return (
      <span className={config.class}>
        <IconComponent className="h-3 w-3 mr-1 inline" />
        {config.label}
      </span>
    )
  }

  const isExpiringSoon = (validUntil, status) => {
    if (status !== 'pending') return false
    const daysUntilExpiry = Math.ceil((new Date(validUntil) - new Date()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 3
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Presupuestos</h1>
          <p className="text-gray-600">Administra cotizaciones y presupuestos para clientes</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Presupuesto
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por presupuesto, cliente o descripción..."
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
              <option value="draft">Borradores</option>
              <option value="pending">Pendientes</option>
              <option value="approved">Aprobados</option>
              <option value="rejected">Rechazados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold text-gray-900">{budgets.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Borradores</p>
          <p className="text-2xl font-bold text-gray-600">
            {budgets.filter(b => b.status === 'draft').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-600">
            {budgets.filter(b => b.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Aprobados</p>
          <p className="text-2xl font-bold text-green-600">
            {budgets.filter(b => b.status === 'approved').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Valor Total</p>
          <p className="text-2xl font-bold text-blue-600">
            ${budgets.filter(b => b.status === 'approved').reduce((sum, b) => sum + b.amount, 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Budgets Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Presupuesto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Válido Hasta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBudgets.map((budget) => (
                <tr key={budget.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/presupuestos/${budget.id}`}
                      className="text-primary-600 hover:text-primary-900 font-medium"
                    >
                      {budget.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/clientes/${budget.clientId}`}
                      className="text-sm text-gray-900 hover:text-primary-600"
                    >
                      {budget.clientName}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{budget.description}</div>
                    <div className="text-sm text-gray-500">
                      {budget.services.length} servicios incluidos
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(budget.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${budget.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className={`text-sm ${
                          isExpiringSoon(budget.validUntil, budget.status) 
                            ? 'text-red-600 font-medium' 
                            : 'text-gray-900'
                        }`}>
                          {budget.validUntil}
                        </div>
                        {isExpiringSoon(budget.validUntil, budget.status) && (
                          <div className="text-xs text-red-500">Expira pronto</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/presupuestos/${budget.id}`}
                        className="text-primary-600 hover:text-primary-900 p-1 rounded"
                        title="Ver detalle"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      {budget.status === 'draft' && (
                        <button 
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Enviar presupuesto"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        className="text-gray-400 hover:text-gray-600 p-1 rounded"
                        title="Editar"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-gray-400 hover:text-gray-600 p-1 rounded"
                        title="Más opciones"
                      >
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

export default Budgets
