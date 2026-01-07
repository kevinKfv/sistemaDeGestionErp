# 🚀 Cómo Ejecutar el Demo

## Opción 1: Archivo Batch (Recomendado)
1. **Doble clic** en `run-demo.bat`
2. El archivo intentará encontrar Node.js automáticamente
3. Si no lo encuentra, te guiará para instalarlo

## Opción 2: Terminal Manual
Si tienes Node.js instalado pero el terminal no lo reconoce:

### Reiniciar Terminal
1. Cierra completamente tu IDE/terminal
2. Abre una nueva ventana de PowerShell
3. Navega al directorio:
   ```
   cd C:\Users\kvillalba\Downloads\demos\workshop-management-demo
   ```
4. Ejecuta:
   ```
   npm install
   npm run dev
   ```

### Usar Ruta Completa
Si npm sigue sin funcionar, usa la ruta completa:
```
"C:\Program Files\nodejs\npm.cmd" install
"C:\Program Files\nodejs\npm.cmd" run dev
```

## Opción 3: Instalar Node.js
Si Node.js no está instalado:

1. **Descargar**: Ve a [https://nodejs.org/](https://nodejs.org/)
2. **Instalar**: Descarga la versión LTS (recomendada)
3. **Reiniciar**: Cierra y abre tu terminal/IDE
4. **Ejecutar**: Usa los comandos npm normalmente

## ✅ Demo Funcionando
Cuando funcione correctamente verás:
- `Local: http://localhost:3000`
- El navegador se abrirá automáticamente
- Verás el dashboard del sistema de gestión

## 🎯 Navegación del Demo
- **Dashboard**: Página principal con KPIs
- **Clientes**: Lista y detalles de clientes
- **Órdenes**: Gestión de órdenes de trabajo
- **Presupuestos**: Cotizaciones y aprobaciones
- **Flujo**: Visualización del proceso completo

## 🔧 Solución de Problemas

### Error: "npm no se reconoce"
- Node.js no está instalado o no está en PATH
- Reinicia el terminal después de instalar Node.js
- Usa la ruta completa a npm.cmd

### Error: "Could not read package.json"
- Estás en el directorio incorrecto
- Navega a `workshop-management-demo`

### Puerto ocupado
- Si el puerto 3000 está ocupado, Vite sugerirá otro puerto
- Acepta el puerto alternativo propuesto

## 📞 Ayuda Adicional
Si sigues teniendo problemas:
1. Verifica que Node.js esté instalado: `node --version`
2. Verifica que npm esté disponible: `npm --version`
3. Reinicia tu computadora si es necesario
4. Usa el archivo `run-demo.bat` que detecta automáticamente la instalación
