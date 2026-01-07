import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  User, 
  Calendar,
  DollarSign,
  FileText,
  Edit,
  Send,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Trash2
} from 'lucide-react'

const BudgetDetail = () => {
  const { id } = useParams()

  // Mock budget data
  const budget = {
    id: 'PRES-001',
    clientName: 'Juan Pérez',
    clientId: 1,
    clientEmail: 'juan.perez@email.com',
    clientPhone: '+54 11 1234-5678',
    description: 'Cambio de transmisión completa',
    status: 'pending',
    createdDate: '2024-10-22',
    validUntil: '2024-11-05',
    sentDate: '2024-10-22',
    createdBy: 'Carlos Méndez',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Corolla',
      year: 2018,
      plate: 'ABC-123'
    },
    notes: 'Cliente solicita presupuesto para cambio de transmisión debido a problemas de cambio de marchas. Incluye garantía de 6 meses.'
  }

  // Mock services and parts
  const services = [
    {
      id: 1,
      category: 'Mano de Obra',
      description: 'Desmontaje de transmisión actual',
      quantity: 1,
      unit: 'servicio',
      unitPrice: 2500,
      total: 2500
    },
    {
      id: 2,
      category: 'Mano de Obra',
      description: 'Instalación de transmisión nueva',
      quantity: 1,
      unit: 'servicio',
      unitPrice: 3000,
      total: 3000
    },
    {
      id: 3,
      category: 'Mano de Obra',
      description: 'Pruebas de funcionamiento y ajustes',
      quantity: 1,
      unit: 'servicio',
      unitPrice: 800,
      total: 800
    },
    {
      id: 4,
      category: 'Repuestos',
      description: 'Transmisión automática remanufacturada',
      quantity: 1,
      unit: 'unidad',
      unitPrice: 4500,
      total: 4500
    },
    {
      id: 5,
      category: 'Repuestos',
      description: 'Kit de juntas y sellos',
      quantity: 1,
      unit: 'kit',
      unitPrice: 650,
      total: 650
    },
    {
      id: 6,
      category: 'Fluidos',
      description: 'Aceite de transmisión ATF',
      quantity: 4,
      unit: 'litros',
      unitPrice: 180,
      total: 720
    }
  ]

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
        <IconComponent className="h-4 w-4 mr-1 inline" />
        {config.label}
      </span>
    )
  }

  // Calculate totals
  const laborTotal = services.filter(s => s.category === 'Mano de Obra').reduce((sum, s) => sum + s.total, 0)
  const partsTotal = services.filter(s => s.category === 'Repuestos').reduce((sum, s) => sum + s.total, 0)
  const fluidsTotal = services.filter(s => s.category === 'Fluidos').reduce((sum, s) => sum + s.total, 0)
  const subtotal = services.reduce((sum, s) => sum + s.total, 0)
  const tax = subtotal * 0.21 // 21% IVA
  const total = subtotal + tax

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/presupuestos" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Presupuesto {budget.id}</h1>
            <p className="text-gray-600">{budget.description}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          {budget.status === 'draft' && (
            <button className="btn-secondary flex items-center">
              <Send className="h-4 w-4 mr-2" />
              Enviar
            </button>
          )}
          <button className="btn-secondary flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Descargar PDF
          </button>
          <button className="btn-secondary flex items-center">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </button>
          {budget.status === 'approved' && (
            <button className="btn-primary flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Crear Orden
            </button>
          )}
        </div>
      </div>

      {/* Status and Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Estado</p>
              <div className="mt-1">{getStatusBadge(budget.status)}</div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg font-semibold text-gray-900">
                ${total.toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Válido Hasta</p>
              <p className="text-lg font-semibold text-gray-900">{budget.validUntil}</p>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Creado por</p>
              <p className="text-lg font-semibold text-gray-900">{budget.createdBy}</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <User className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client and Vehicle Info */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Cliente y Vehículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Cliente</h4>
                <div className="space-y-2">
                  <div>
                    <Link 
                      to={`/clientes/${budget.clientId}`}
                      className="text-primary-600 hover:text-primary-800 font-medium"
                    >
                      {budget.clientName}
                    </Link>
                  </div>
                  <div className="text-sm text-gray-600">{budget.clientEmail}</div>
                  <div className="text-sm text-gray-600">{budget.clientPhone}</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Vehículo</h4>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-gray-600">Marca/Modelo: </span>
                    <span className="text-gray-900">{budget.vehicleInfo.make} {budget.vehicleInfo.model}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Año: </span>
                    <span className="text-gray-900">{budget.vehicleInfo.year}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Patente: </span>
                    <span className="text-gray-900 font-mono">{budget.vehicleInfo.plate}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services and Parts */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Detalle de Servicios y Repuestos</h3>
              <button className="btn-secondary flex items-center text-sm">
                <Plus className="h-4 w-4 mr-1" />
                Agregar Item
              </button>
            </div>

            <div className="space-y-6">
              {Object.entries(groupedServices).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-medium text-gray-900 mb-3 pb-2 border-b border-gray-200">
                    {category}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Descripción
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Cant.
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Unidad
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Precio Unit.
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Total
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.description}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-500">{item.unit}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${item.unitPrice}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">${item.total}</td>
                            <td className="px-4 py-3 text-sm">
                              <div className="flex space-x-2">
                                <button className="text-gray-400 hover:text-gray-600">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="text-red-400 hover:text-red-600">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-2 text-right">
                    <span className="text-sm font-medium text-gray-900">
                      Subtotal {category}: ${items.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IVA (21%):</span>
                  <span className="text-gray-900">${tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-primary-600">${total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Timeline */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-1 bg-blue-100 rounded-full">
                  <FileText className="h-3 w-3 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Presupuesto creado</p>
                  <p className="text-xs text-gray-500">{budget.createdDate}</p>
                </div>
              </div>
              {budget.sentDate && (
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Send className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Enviado al cliente</p>
                    <p className="text-xs text-gray-500">{budget.sentDate}</p>
                  </div>
                </div>
              )}
              {budget.status === 'pending' && (
                <div className="flex items-start space-x-3">
                  <div className="p-1 bg-yellow-100 rounded-full">
                    <Clock className="h-3 w-3 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Esperando respuesta</p>
                    <p className="text-xs text-gray-500">Válido hasta {budget.validUntil}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notas</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{budget.notes}</p>
            <button className="mt-3 text-primary-600 hover:text-primary-700 text-sm font-medium">
              Editar notas
            </button>
          </div>

          {/* Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones</h3>
            <div className="space-y-3">
              {budget.status === 'draft' && (
                <button className="w-full btn-primary flex items-center justify-center">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar al Cliente
                </button>
              )}
              {budget.status === 'pending' && (
                <>
                  <button className="w-full btn-primary flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marcar como Aprobado
                  </button>
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center">
                    <XCircle className="h-4 w-4 mr-2" />
                    Marcar como Rechazado
                  </button>
                </>
              )}
              <button className="w-full btn-secondary flex items-center justify-center">
                <Download className="h-4 w-4 mr-2" />
                Descargar PDF
              </button>
              <button className="w-full btn-secondary flex items-center justify-center">
                <Edit className="h-4 w-4 mr-2" />
                Duplicar Presupuesto
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetDetail
