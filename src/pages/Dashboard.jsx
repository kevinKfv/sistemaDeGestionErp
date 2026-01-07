import React from 'react'
import { 
  Users, 
  ClipboardList, 
  FileText, 
  DollarSign,
  TrendingUp,
  AlertCircle,
  Calendar,
  CheckCircle
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  // Mock data for charts
  const monthlyRevenue = [
    { month: 'Ene', revenue: 45000, orders: 23 },
    { month: 'Feb', revenue: 52000, orders: 28 },
    { month: 'Mar', revenue: 48000, orders: 25 },
    { month: 'Abr', revenue: 61000, orders: 32 },
    { month: 'May', revenue: 55000, orders: 29 },
    { month: 'Jun', revenue: 67000, orders: 35 }
  ]

  const orderStatus = [
    { name: 'Completadas', value: 45, color: '#10b981' },
    { name: 'En Proceso', value: 23, color: '#3b82f6' },
    { name: 'Pendientes', value: 12, color: '#f59e0b' }
  ]

  const recentAlerts = [
    { id: 1, type: 'warning', message: 'Orden #1234 vence mañana', time: '2 min' },
    { id: 2, type: 'info', message: 'Nuevo presupuesto pendiente de aprobación', time: '15 min' },
    { id: 3, type: 'success', message: 'Cliente Juan Pérez pagó factura #5678', time: '1 hora' }
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clientes</p>
              <p className="text-3xl font-bold text-gray-900">248</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% este mes
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Órdenes Activas</p>
              <p className="text-3xl font-bold text-gray-900">35</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <ClipboardList className="h-4 w-4 mr-1" />
                23 en proceso
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <ClipboardList className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Presupuestos Pendientes</p>
              <p className="text-3xl font-bold text-gray-900">8</p>
              <p className="text-sm text-yellow-600 flex items-center mt-1">
                <FileText className="h-4 w-4 mr-1" />
                Esperando aprobación
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <FileText className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Ingresos del Mes</p>
              <p className="text-3xl font-bold text-gray-900">$67,000</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +18% vs mes anterior
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ingresos Mensuales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Status Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Estado de Órdenes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={orderStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {orderStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center space-x-6 mt-4">
            {orderStatus.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Notificaciones Recientes</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700">Ver todas</button>
          </div>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`p-1 rounded-full ${
                  alert.type === 'warning' ? 'bg-yellow-100' :
                  alert.type === 'info' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  {alert.type === 'warning' ? (
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  ) : alert.type === 'info' ? (
                    <FileText className="h-4 w-4 text-blue-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">hace {alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              Nuevo Cliente
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <ClipboardList className="h-4 w-4 mr-2" />
              Nueva Orden
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              Crear Presupuesto
            </button>
            <button className="w-full btn-secondary flex items-center justify-center">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Calendario
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
