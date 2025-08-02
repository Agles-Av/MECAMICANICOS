"use client"

import { useState } from "react"
import { Phone, Mail, Clock, Send } from "lucide-react"

const Support = () => {
  const [message, setMessage] = useState("")
  const [tickets] = useState([
    {
      id: 1,
      asunto: "Consulta sobre servicio",
      estado: "Abierto",
      fecha: "2024-01-15",
      ultimaRespuesta: "Pendiente de respuesta",
    },
    {
      id: 2,
      asunto: "Problema con facturación",
      estado: "Cerrado",
      fecha: "2024-01-10",
      ultimaRespuesta: "Resuelto satisfactoriamente",
    },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Enviando mensaje:", message)
    setMessage("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mafia-title text-3xl font-bold">Centro de Soporte</h1>
        <p className="text-gray-400 mt-2">Estamos aquí para ayudarte 24/7</p>
      </div>

      {/* Contact Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="mafia-card rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Teléfono</h3>
          <p className="text-gray-400 text-sm mb-3">Llámanos directamente</p>
          <p className="text-green-400 font-bold">+1 (555) 123-4567</p>
        </div>

        <div className="mafia-card rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Email</h3>
          <p className="text-gray-400 text-sm mb-3">Envíanos un correo</p>
          <p className="text-blue-400 font-bold">soporte@camicanicos.com</p>
        </div>

        <div className="mafia-card rounded-xl p-6 text-center">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Horarios</h3>
          <p className="text-gray-400 text-sm mb-3">Disponibilidad</p>
          <p className="text-purple-400 font-bold">24/7</p>
        </div>
      </div>

      {/* New Message Form */}
      <div className="mafia-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Enviar Mensaje</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Mensaje</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mafia-input w-full px-4 py-3 rounded-lg h-32 resize-none"
              placeholder="Describe tu consulta o problema..."
              required
            />
          </div>
          <button type="submit" className="mafia-button px-6 py-3 rounded-lg flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Enviar Mensaje</span>
          </button>
        </form>
      </div>

      {/* Support Tickets */}
      <div className="mafia-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Mis Tickets de Soporte</h3>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-medium">{ticket.asunto}</h4>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ticket.estado === "Abierto" ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {ticket.estado}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Fecha: {new Date(ticket.fecha).toLocaleDateString()}</span>
                <span>{ticket.ultimaRespuesta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Support
