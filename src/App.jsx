import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import ClientDetail from './pages/ClientDetail'
import WorkOrders from './pages/WorkOrders'
import WorkOrderDetail from './pages/WorkOrderDetail'
import Budgets from './pages/Budgets'
import BudgetDetail from './pages/BudgetDetail'
import Workflow from './pages/Workflow'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clientes" element={<Clients />} />
          <Route path="/clientes/:id" element={<ClientDetail />} />
          <Route path="/ordenes" element={<WorkOrders />} />
          <Route path="/ordenes/:id" element={<WorkOrderDetail />} />
          <Route path="/presupuestos" element={<Budgets />} />
          <Route path="/presupuestos/:id" element={<BudgetDetail />} />
          <Route path="/flujo" element={<Workflow />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
