"use client"

import { useState } from "react"
import { CreditCard, Calendar, CheckCircle, Clock } from "lucide-react"

const Payments = () => {
  const [payments] = useState([
    {
      id: 1,
      fecha: "2024-01-12",
      servicio: "Revisión de frenos",
      vehiculo: "Honda Civic - XYZ-789",
      monto: 80,
      estado: "Pagado",
      metodoPago: "Tarjeta de Crédito",
    },
    {
      id: 2,
      fecha: "2024-01-10",
      servicio: "Cambio de aceite",
      vehiculo: "Toyota Corolla - ABC-123",
      monto: 45,
      estado: "Pagado",
      metodoPago: "Efectivo",
    },
  ])

  const getStatusColor = (estado) => {
    switch (estado) {
      case "Pagado":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Pendiente":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Vencido":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mafia-title text-3xl font-bold">Historial de Pagos</h1>
        <p className="text-gray-400 mt-2">Todos tus pagos y facturas</p>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.id} className="mafia-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{payment.servicio}</h3>
                  <p className="text-gray-400 text-sm">{payment.vehiculo}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.estado)}`}>
                  {payment.estado}
                </span>
                <p className="text-green-400 font-bold text-lg mt-1">${payment.monto}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-400">Fecha</p>
                  <p className="text-white">{new Date(payment.fecha).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-gray-400">Método de Pago</p>
                  <p className="text-white">{payment.metodoPago}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {payment.estado === "Pagado" ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <Clock className="w-4 h-4 text-yellow-400" />
                )}
                <div>
                  <p className="text-gray-400">Estado</p>
                  <p className="text-white">{payment.estado}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4 pt-4 border-t border-gray-700">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm">
                Descargar Factura
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Payments
