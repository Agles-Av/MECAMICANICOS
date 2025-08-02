"use client"

import { useState } from "react"
import { Calendar, Car, Wrench, Star } from "lucide-react"

const ServiceHistory = () => {
  const [history] = useState([
    {
      id: 1,
      fecha: "2024-01-12",
      vehiculo: { marca: "Honda", modelo: "Civic", placa: "XYZ-789" },
      servicio: "Revisión de frenos",
      mecanico: "María González",
      precio: 80,
      calificacion: 5,
      observaciones: "Excelente servicio, muy profesional",
    },
    {
      id: 2,
      fecha: "2024-01-10",
      vehiculo: { marca: "Toyota", modelo: "Corolla", placa: "ABC-123" },
      servicio: "Cambio de aceite",
      mecanico: "Juan Pérez",
      precio: 45,
      calificacion: 4,
      observaciones: "Buen servicio, rápido y eficiente",
    },
  ])

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-400"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mafia-title text-3xl font-bold">Historial de Servicios</h1>
        <p className="text-gray-400 mt-2">Todos tus servicios completados</p>
      </div>

      <div className="space-y-4">
        {history.map((service) => (
          <div key={service.id} className="mafia-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{service.servicio}</h3>
                  <p className="text-gray-400 text-sm">
                    {service.vehiculo.marca} {service.vehiculo.modelo} - {service.vehiculo.placa}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">{renderStars(service.calificacion)}</div>
                <p className="text-green-400 font-bold">${service.precio}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-400">Fecha</p>
                  <p className="text-white">{new Date(service.fecha).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Car className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-400">Vehículo</p>
                  <p className="text-white">
                    {service.vehiculo.marca} {service.vehiculo.modelo}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-400">Mecánico</p>
                  <p className="text-white">{service.mecanico}</p>
                </div>
              </div>
            </div>

            {service.observaciones && (
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-gray-300 text-sm">{service.observaciones}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServiceHistory
