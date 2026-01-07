# Sistema de Gestión de Talleres - Demo Visual

## Descripción

Demo visual de un sistema de gestión para talleres y servicios técnicos. Este prototipo muestra pantallas, flujos y organización de información para presentación o validación de diseño, sin funcionalidad real de backend.

## Características Principales

### 📊 Dashboard / Panel Principal
- Resumen de clientes, órdenes en curso y presupuestos pendientes
- Gráficos de órdenes completadas e ingresos mensuales
- Alertas y notificaciones visuales de acciones pendientes
- Acciones rápidas para crear nuevos registros

### 👥 Gestión de Clientes
- Lista de clientes con búsqueda y filtrado
- Ficha individual con datos completos del cliente
- Historial de órdenes y presupuestos por cliente
- Estados de cliente (Activo, Inactivo, VIP)

### 🔧 Gestión de Órdenes de Trabajo
- Lista de órdenes con estados (Pendiente, En Proceso, Finalizado)
- Ficha detallada de orden con información completa
- Asignación de técnicos y seguimiento de progreso
- Control de repuestos y materiales utilizados
- Cálculo automático de costos

### 💰 Gestión de Presupuestos
- Lista de presupuestos con diferentes estados
- Ficha detallada con servicios y precios
- Estados: Borrador, Pendiente, Aprobado, Rechazado
- Cálculo de totales con IVA incluido
- Seguimiento de fechas de validez

### 🔄 Flujo de Trabajo Visual
- Visualización completa del proceso de servicio
- 7 pasos desde registro de cliente hasta entrega
- Seguimiento de flujos activos en tiempo real
- Indicadores de progreso por cada instancia

## Tecnologías Utilizadas

- **React 18** - Framework principal
- **React Router** - Navegación entre páginas
- **TailwindCSS** - Estilos y diseño responsivo
- **Lucide React** - Iconografía moderna
- **Recharts** - Gráficos y visualizaciones
- **Vite** - Herramienta de desarrollo

## Instalación y Ejecución

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd workshop-management-demo
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - La aplicación estará disponible en `http://localhost:3000`
   - Se abrirá automáticamente en el navegador

### Comandos disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## Estructura del Proyecto

```
src/
├── components/
│   └── Layout.jsx          # Layout principal con navegación
├── pages/
│   ├── Dashboard.jsx       # Panel principal con KPIs
│   ├── Clients.jsx         # Lista de clientes
│   ├── ClientDetail.jsx    # Detalle de cliente
│   ├── WorkOrders.jsx      # Lista de órdenes
│   ├── WorkOrderDetail.jsx # Detalle de orden
│   ├── Budgets.jsx         # Lista de presupuestos
│   ├── BudgetDetail.jsx    # Detalle de presupuesto
│   └── Workflow.jsx        # Visualización de flujo
├── App.jsx                 # Componente principal
├── main.jsx               # Punto de entrada
└── index.css              # Estilos globales
```

## Características del Diseño

### 🎨 Estilo Visual
- Diseño moderno y minimalista
- Colores claros y tipografía legible
- Paneles y tarjetas para diferenciar secciones
- Iconos representativos para cada módulo

### 📱 Responsividad
- Compatible con PC y tablet
- Navegación adaptativa
- Tablas con scroll horizontal en móviles
- Grid responsivo para tarjetas y estadísticas

### 🔍 Funcionalidades de Demo
- Búsqueda y filtrado simulados
- Estados visuales interactivos
- Navegación entre pantallas relacionadas
- Datos de ejemplo realistas

## Pantallas Principales

1. **Dashboard** - `/`
   - KPIs principales
   - Gráficos de rendimiento
   - Notificaciones recientes

2. **Clientes** - `/clientes`
   - Lista filtrable de clientes
   - Estadísticas de clientes

3. **Detalle de Cliente** - `/clientes/:id`
   - Información completa del cliente
   - Historial de órdenes y presupuestos

4. **Órdenes de Trabajo** - `/ordenes`
   - Lista de órdenes con filtros
   - Estados y prioridades

5. **Detalle de Orden** - `/ordenes/:id`
   - Información completa de la orden
   - Progreso y materiales

6. **Presupuestos** - `/presupuestos`
   - Lista de cotizaciones
   - Estados de aprobación

7. **Detalle de Presupuesto** - `/presupuestos/:id`
   - Desglose completo de servicios
   - Cálculos y totales

8. **Flujo de Trabajo** - `/flujo`
   - Visualización del proceso completo
   - Seguimiento de instancias activas

## Datos de Ejemplo

El demo incluye datos de muestra para:
- 5 clientes con diferentes estados
- 5 órdenes de trabajo en varios estados
- 5 presupuestos con diferentes estados de aprobación
- Gráficos con datos mensuales simulados
- Flujos de trabajo activos

## Notas Importantes

- **Solo Demo Visual**: No hay funcionalidad real de backend
- **Datos Estáticos**: Toda la información es de ejemplo
- **Navegación Funcional**: Los enlaces entre pantallas funcionan
- **Estados Simulados**: Los cambios de estado son solo visuales

## Personalización

Para adaptar el demo a necesidades específicas:

1. **Colores**: Modificar `tailwind.config.js`
2. **Datos**: Actualizar los arrays de datos en cada componente
3. **Pantallas**: Agregar nuevas rutas en `App.jsx`
4. **Componentes**: Crear nuevos componentes en `/components`

## Soporte

Este es un demo visual para presentación y validación de diseño. Para implementación real se requiere desarrollo de backend y base de datos.
