import React, { useState } from 'react'
import { 
  Users, 
  ClipboardList, 
  FileText, 
  Send, 
  CheckCircle, 
  Wrench, 
  DollarSign,
  ArrowRight,
  ArrowDown,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'

const Workflow = () => {
  const [selectedStep, setSelectedStep] = useState(null)

  // Workflow steps definition
  const workflowSteps = [
    {
      id: 1,
      title: 'Registro de Cliente',
      description: 'Captura de datos del cliente y vehículo',
      icon: Users,
      color: 'blue',
      status: 'completed',
      details: [
        'Información personal del cliente',
        'Datos de contacto',
        'Información del vehículo',
        'Historial de servicios previos'
      ],
      estimatedTime: '10 min',
      responsible: 'Recepcionista'
    },
    {
      id: 2,
      title: 'Diagnóstico Inicial',
      description: 'Evaluación del problema reportado',
      icon: ClipboardList,
      color: 'yellow',
      status: 'in-progress',
      details: [
        'Inspección visual del vehículo',
        'Pruebas de diagnóstico',
        'Identificación del problema',
        'Estimación de tiempo y costo'
      ],
      estimatedTime: '30-60 min',
      responsible: 'Técnico'
    },
    {
      id: 3,
      title: 'Crear Presupuesto',
      description: 'Elaboración de cotización detallada',
      icon: FileText,
      color: 'purple',
      status: 'pending',
      details: [
        'Listado de servicios necesarios',
        'Cálculo de repuestos',
        'Estimación de mano de obra',
        'Tiempo de entrega estimado'
      ],
      estimatedTime: '15-30 min',
      responsible: 'Asesor de Servicio'
    },
    {
      id: 4,
      title: 'Envío y Aprobación',
      description: 'Comunicación con el cliente',
      icon: Send,
      color: 'indigo',
      status: 'pending',
      details: [
        'Envío del presupuesto al cliente',
        'Explicación de servicios incluidos',
        'Negociación si es necesaria',
        'Confirmación de aprobación'
      ],
      estimatedTime: '1-3 días',
      responsible: 'Asesor de Servicio'
    },
    {
      id: 5,
      title: 'Crear Orden de Trabajo',
      description: 'Generación de orden de servicio',
      icon: ClipboardList,
      color: 'green',
      status: 'pending',
      details: [
        'Asignación de técnico',
        'Programación de fecha',
        'Pedido de repuestos',
        'Preparación del área de trabajo'
      ],
      estimatedTime: '15 min',
      responsible: 'Supervisor'
    },
    {
      id: 6,
      title: 'Ejecución del Servicio',
      description: 'Realización del trabajo técnico',
      icon: Wrench,
      color: 'orange',
      status: 'pending',
      details: [
        'Desmontaje de componentes',
        'Instalación de repuestos',
        'Pruebas de funcionamiento',
        'Control de calidad'
      ],
      estimatedTime: 'Variable',
      responsible: 'Técnico'
    },
    {
      id: 7,
      title: 'Facturación y Entrega',
      description: 'Finalización y entrega al cliente',
      icon: DollarSign,
      color: 'green',
      status: 'pending',
      details: [
        'Generación de factura',
        'Cobro del servicio',
        'Entrega del vehículo',
        'Explicación del trabajo realizado'
      ],
      estimatedTime: '15-30 min',
      responsible: 'Recepcionista'
    }
  ]

  // Sample workflow instances
  const workflowInstances = [
    {
      id: 'WF-001',
      clientName: 'Juan Pérez',
      service: 'Reparación de motor',
      currentStep: 2,
      startDate: '2024-10-20',
      estimatedCompletion: '2024-10-25'
    },
    {
      id: 'WF-002',
      clientName: 'María González',
      service: 'Cambio de frenos',
      currentStep: 6,
      startDate: '2024-10-18',
      estimatedCompletion: '2024-10-22'
    },
    {
      id: 'WF-003',
      clientName: 'Carlos Rodriguez',
      service: 'Mantenimiento preventivo',
      currentStep: 4,
      startDate: '2024-10-21',
      estimatedCompletion: '2024-10-24'
    }
  ]

  const getStepIcon = (step) => {
    const IconComponent = step.icon
    return <IconComponent className="h-6 w-6" />
  }

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800 border-green-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      pending: 'bg-gray-100 text-gray-600 border-gray-200'
    }
    return colors[status] || colors.pending
  }

  const getStepColor = (color, isActive = false) => {
    const colors = {
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600',
      yellow: isActive ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-600',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600',
      indigo: isActive ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-600',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600',
      orange: isActive ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Flujo de Trabajo</h1>
          <p className="text-gray-600">Visualización del proceso completo de servicio</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reiniciar Vista
          </button>
        </div>
      </div>

      {/* Workflow Visualization */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Proceso Estándar de Servicio</h3>
        
        {/* Desktop Flow - Horizontal */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between space-x-4 mb-8">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`relative cursor-pointer transition-all duration-200 ${
                    selectedStep === step.id ? 'transform scale-105' : ''
                  }`}
                  onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                    getStepColor(step.color, selectedStep === step.id)
                  }`}>
                    {getStepIcon(step)}
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24">
                    <p className="text-xs font-medium text-center text-gray-900">{step.title}</p>
                  </div>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-white ${
                    getStatusColor(step.status)
                  } flex items-center justify-center`}>
                    {step.status === 'completed' && <CheckCircle className="h-3 w-3" />}
                    {step.status === 'in-progress' && <Play className="h-3 w-3" />}
                    {step.status === 'pending' && <Pause className="h-3 w-3" />}
                  </div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Flow - Vertical */}
        <div className="lg:hidden">
          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <div key={step.id}>
                <div 
                  className={`flex items-center space-x-4 p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedStep === step.id ? 'bg-gray-50 border-primary-200' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    getStepColor(step.color, selectedStep === step.id)
                  }`}>
                    {getStepIcon(step)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                    {step.status === 'completed' && 'Completado'}
                    {step.status === 'in-progress' && 'En Proceso'}
                    {step.status === 'pending' && 'Pendiente'}
                  </div>
                </div>
                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowDown className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Details */}
        {selectedStep && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            {(() => {
              const step = workflowSteps.find(s => s.id === selectedStep)
              return (
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      getStepColor(step.color, true)
                    }`}>
                      {getStepIcon(step)}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Actividades Incluidas</h5>
                      <ul className="space-y-1">
                        {step.details.map((detail, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Información Adicional</h5>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-600">Tiempo estimado: </span>
                          <span className="text-gray-900 font-medium">{step.estimatedTime}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Responsable: </span>
                          <span className="text-gray-900 font-medium">{step.responsible}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Estado actual: </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                            {step.status === 'completed' && 'Completado'}
                            {step.status === 'in-progress' && 'En Proceso'}
                            {step.status === 'pending' && 'Pendiente'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}
      </div>

      {/* Active Workflows */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Flujos de Trabajo Activos</h3>
        <div className="space-y-4">
          {workflowInstances.map((instance) => (
            <div key={instance.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-900">{instance.clientName}</h4>
                  <p className="text-sm text-gray-600">{instance.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Paso {instance.currentStep} de {workflowSteps.length}</p>
                  <p className="text-xs text-gray-500">Inicio: {instance.startDate}</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Progreso</span>
                  <span>{Math.round((instance.currentStep / workflowSteps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(instance.currentStep / workflowSteps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Mini Steps */}
              <div className="flex space-x-2">
                {workflowSteps.map((step, index) => {
                  const stepNumber = index + 1
                  const isCompleted = stepNumber < instance.currentStep
                  const isCurrent = stepNumber === instance.currentStep
                  const isPending = stepNumber > instance.currentStep

                  return (
                    <div 
                      key={step.id}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        isCompleted ? 'bg-green-500 text-white' :
                        isCurrent ? 'bg-primary-500 text-white' :
                        'bg-gray-200 text-gray-500'
                      }`}
                      title={step.title}
                    >
                      {isCompleted ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Workflow
