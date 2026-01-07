import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  User, 
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Edit,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Wrench,
  Plus
} from 'lucide-react'

const WorkOrderDetail = () => {
  const { id } = useParams()

  // Mock work order data
  const workOrder = {
    id: 'ORD-001',
    clientName: 'Juan Pérez',
    clientId: 1,
    service: 'Reparación de motor',
    description: 'Motor hace ruido extraño, posible problema en válvulas. Cliente reporta pérdida de potencia y consumo excesivo de aceite.',
    status: 'in-progress',
    priority: 'high',
    technician: 'Carlos Méndez',
    createdDate: '2024-10-20',
    dueDate: '2024-10-25',
    estimatedHours: 8,
    actualHours: 5.5,
    amount: 8500,
    vehicleInfo: {
      make: 'Toyota',
      model: 'Corolla',
      year: 2018,
      plate: 'ABC-123',
      mileage: 85000
    }
  }

  // Mock progress updates
  const progressUpdates = [
    {
      id: 1,
      date: '2024-10-22 14:30',
      technician: 'Carlos Méndez',
      status: 'in-progress',
      message: 'Iniciando diagnóstico del motor. Se confirma ruido anormal en la parte superior.',
      hoursWorked: 1.5
    },
    {
      id: 2,
      date: '2024-10-22 16:45',
      technician: 'Carlos Méndez',
      status: 'in-progress',
      message: 'Desmontaje de tapa de válvulas completado. Se encontró desgaste en balancines.',
      hoursWorked: 2.0
    },
    {
      id: 3,
      date: '2024-10-23 09:15',
      technician: 'Carlos Méndez',
      status: 'in-progress',
      message: 'Pedido de repuestos realizado. Esperando llegada de balancines nuevos.',
      hoursWorked: 0.5
    },
    {
      id: 4,
      date: '2024-10-23 15:20',
      technician: 'Carlos Méndez',
      status: 'in-progress',
      message: 'Repuestos recibidos. Iniciando instalación de nuevos balancines.',
      hoursWorked: 1.5
    }
  ]

  // Mock parts and materials
  const partsUsed = [
    { id: 1, name: 'Balancines (x8)', quantity: 8, unitPrice: 450, total: 3600 },
    { id: 2, name: 'Junta de tapa de válvulas', quantity: 1, unitPrice: 280, total: 280 },
    { id: 3, name: 'Aceite de motor 5W-30', quantity: 4, unitPrice: 320, total: 1280 },
    { id: 4, name: 'Filtro de aceite', quantity: 1, unitPrice: 180, total: 180 }
  ]

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

  const partsTotal = partsUsed.reduce((sum, part) => sum + part.total, 0)
  const laborCost = workOrder.actualHours * 800 // $800 per hour
  const totalCost = partsTotal + laborCost

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/ordenes" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orden {workOrder.id}</h1>
            <p className="text-gray-600">{workOrder.service}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </button>
          <button className="btn-primary flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Completar Orden
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <div className="mt-1">{getStatusBadge(workOrder.status)}</div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Prioridad</p>
              <div className="mt-1">{getPriorityBadge(workOrder.priority)}</div>
            </div>
            <div className="p-2 bg-red-50 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Progreso</p>
              <p className="text-lg font-semibold text-gray-900">
                {workOrder.actualHours}h / {workOrder.estimatedHours}h
              </p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Costo Total</p>
              <p className="text-lg font-semibold text-gray-900">
                ${totalCost.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Orden</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Cliente</label>
                <Link 
                  to={`/clientes/${workOrder.clientId}`}
                  className="block text-primary-600 hover:text-primary-800 font-medium"
                >
                  {workOrder.clientName}
                </Link>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Técnico Asignado</label>
                <div className="flex items-center mt-1">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{workOrder.technician}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Fecha de Creación</label>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{workOrder.createdDate}</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Fecha Límite</label>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-900">{workOrder.dueDate}</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600">Descripción del Problema</label>
              <p className="mt-1 text-gray-900 leading-relaxed">{workOrder.description}</p>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Vehículo</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Marca</label>
                <p className="text-gray-900">{workOrder.vehicleInfo.make}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Modelo</label>
                <p className="text-gray-900">{workOrder.vehicleInfo.model}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Año</label>
                <p className="text-gray-900">{workOrder.vehicleInfo.year}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Patente</label>
                <p className="text-gray-900 font-mono">{workOrder.vehicleInfo.plate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Kilometraje</label>
                <p className="text-gray-900">{workOrder.vehicleInfo.mileage.toLocaleString()} km</p>
              </div>
            </div>
          </div>

          {/* Parts and Materials */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Repuestos y Materiales</h3>
              <button className="btn-secondary flex items-center text-sm">
                <Plus className="h-4 w-4 mr-1" />
                Agregar
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Descripción
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Cantidad
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Precio Unit.
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {partsUsed.map((part) => (
                    <tr key={part.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">{part.name}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{part.quantity}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">${part.unitPrice}</td>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">${part.total}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 text-sm font-medium text-gray-900" colSpan="3">
                      Subtotal Repuestos
                    </td>
                    <td className="px-4 py-2 text-sm font-bold text-gray-900">
                      ${partsTotal.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 text-sm font-medium text-gray-900" colSpan="3">
                      Mano de Obra ({workOrder.actualHours}h × $800)
                    </td>
                    <td className="px-4 py-2 text-sm font-bold text-gray-900">
                      ${laborCost.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-primary-50">
                    <td className="px-4 py-2 text-sm font-bold text-primary-900" colSpan="3">
                      Total General
                    </td>
                    <td className="px-4 py-2 text-sm font-bold text-primary-900">
                      ${totalCost.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Progress Updates */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Actualizaciones de Progreso</h3>
            <button className="btn-secondary flex items-center text-sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              Agregar
            </button>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {progressUpdates.map((update) => (
              <div key={update.id} className="border-l-2 border-primary-200 pl-4 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">{update.technician}</span>
                  <span className="text-xs text-gray-500">{update.date}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{update.message}</p>
                {update.hoursWorked > 0 && (
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {update.hoursWorked}h trabajadas
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkOrderDetail
