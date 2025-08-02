"use client"

import { useState } from "react"
import { PenToolIcon as Tool, Package, AlertTriangle, CheckCircle } from "lucide-react"

const MyTools = () => {
  const [tools] = useState([
    {
      id: 1,
      nombre: "Llave Inglesa 12mm",
      codigo: "LI-12",
      estado: "Disponible",
      ubicacion: "Caja de herramientas #1",
      ultimoUso: "2024-01-14",
    },
    {
      id: 2,
      nombre: "Pistola de Impacto",
      codigo: "PI-001",
      estado: "En Uso",
      ubicacion: "Servicio Toyota Corolla",
      ultimoUso: "2024-01-15",
    },
  ])

  const getStatusIcon = (estado) => {
    switch (estado) {
      case "Disponible":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "En Uso":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "Mantenimiento":
        return <Tool className="w-4 h-4 text-red-400" />
      default:
        return <Package className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mafia-title text-3xl font-bold">Mis Herramientas</h1>
        <p className="text-gray-400 mt-2">Control de herramientas asignadas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div key={tool.id} className="mafia-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Tool className="w-6 h-6 text-white" />
              </div>
              {getStatusIcon(tool.estado)}
            </div>

            <div className="space-y-2 mb-4">
              <h3 className="text-lg font-bold text-white">{tool.nombre}</h3>
              <p className="text-gray-400 text-sm">Código: {tool.codigo}</p>
              <p className="text-gray-400 text-sm">
                Estado: <span className="text-white">{tool.estado}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Ubicación: <span className="text-white">{tool.ubicacion}</span>
              </p>
              <p className="text-gray-400 text-sm">Último uso: {new Date(tool.ultimoUso).toLocaleDateString()}</p>
            </div>

            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm">
              Reportar Estado
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyTools
