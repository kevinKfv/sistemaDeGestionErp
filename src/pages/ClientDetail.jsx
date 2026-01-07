import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  DollarSign,
  ClipboardList,
  FileText,
  Edit,
  Plus
} from 'lucide-react'

const ClientDetail = () => {
  const { id } = useParams()

  // Mock client data
  const client = {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan.perez@email.com',
    phone: '+54 11 1234-5678',
    address: 'Av. Corrientes 1234, CABA',
    registrationDate: '2023-05-15',
    totalOrders: 12,
    totalSpent: 45600,
    status: 'active',
    notes: 'Cliente preferencial, siempre paga a tiempo. Prefiere ser contactado por WhatsApp.'
  }

  // Mock orders history
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-10-20',
      service: 'Reparación de motor',
      status: 'completed',
      amount: 8500,
      technician: 'Carlos Méndez'
    },
    {
      id: 'ORD-002',
      date: '2024-10-15',
      service: 'Cambio de aceite y filtros',
      status: 'completed',
      amount: 3200,
      technician: 'Ana López'
    },
    {
      id: 'ORD-003',
      date: '2024-10-10',
      service: 'Revisión general',
      status: 'in-progress',
      amount: 5400,
      technician: 'Roberto Silva'
    }
  ]

  // Mock budgets history
  const budgets = [
    {
      id: 'PRES-001',
      date: '2024-10-22',
      description: 'Cambio de transmisión',
      status: 'pending',
      amount: 12000
    },
    {
      id: 'PRES-002',
      date: '2024-10-18',
      description: 'Reparación de frenos',
      status: 'approved',
      amount: 6800
    }
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: 'Completado', class: 'status-badge status-completed' },
      'in-progress': { label: 'En Proceso', class: 'status-badge status-in-progress' },
      pending: { label: 'Pendiente', class: 'status-badge status-pending' },
      approved: { label: 'Aprobado', class: 'status-badge status-approved' },
      rejected: { label: 'Rechazado', class: 'status-badge status-rejected' }
    }
    const config = statusConfig[status] || statusConfig.pending
    return <span className={config.class}>{config.label}</span>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/clientes" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            <p className="text-gray-600">Cliente desde {client.registrationDate}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </button>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Orden
          </button>
        </div>
      </div>

      {/* Client Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de Contacto</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900">{client.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900">{client.email}</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
              <span className="text-gray-900">{client.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-gray-900">Registrado: {client.registrationDate}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5 text-blue-500" />
                <span className="text-gray-600">Total Órdenes</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{client.totalOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">Total Gastado</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                ${client.totalSpent.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-purple-500" />
                <span className="text-gray-600">Presupuestos</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{budgets.length}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notas</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{client.notes}</p>
          <button className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
            Editar notas
          </button>
        </div>
      </div>

      {/* Orders History */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Historial de Órdenes</h3>
          <button className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Orden
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Orden
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Técnico
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/ordenes/${order.id}`}
                      className="text-primary-600 hover:text-primary-900 font-medium"
                    >
                      {order.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{order.technician}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${order.amount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budgets History */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Historial de Presupuestos</h3>
          <button className="btn-secondary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Presupuesto
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Presupuesto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {budgets.map((budget) => (
                <tr key={budget.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link 
                      to={`/presupuestos/${budget.id}`}
                      className="text-primary-600 hover:text-primary-900 font-medium"
                    >
                      {budget.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{budget.description}</div>
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
                    <div className="text-sm text-gray-500">{budget.date}</div>
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

export default ClientDetail
