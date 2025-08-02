import { useState, useEffect, useContext } from "react"
import { Wrench } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import { GetVehiclesByOwnerService } from "../../services/vehicle/VehicleService"
import { AlertHelper } from "../../utilities/AlertHelper"

const MyRequests = () => {
  const { user } = useContext(AuthContext)
  const [requests, setRequests] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 6

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user?.id) return
        const vehicles = await GetVehiclesByOwnerService(user.id)
        let result = []
        vehicles.forEach((vehicle) => {
          vehicle.servicios.forEach((svc) => {
            result.push({
              id: svc.id,
              vehiculo: {
                marca: vehicle.marca,
                modelo: vehicle.modelo,
              },
              servicio: {
                nombre: svc.servicio.nombre,
              },
              estado: svc.estado?.nombre || "Pendiente",
              mecanico: svc.mecanico
                ? `${svc.mecanico.nombre} ${svc.mecanico.apellidos}`
                : "Sin asignar",
            })
          })
        })
        setRequests(result)
      } catch (error) {
        AlertHelper.showAlert("Error al obtener tus solicitudes", "error")
        setRequests([])
      }
    }
    fetchData()
  }, [user])

  // Filtrado por nombre de servicio
  const filteredRequests = requests.filter((request) =>
    request.servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Paginación
  const totalPages = Math.ceil(filteredRequests.length / pageSize)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const getStatusColor = (estado) => {
    switch (estado) {
      case "Pendiente":
      case "En espera":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "En Proceso":
      case "En proceso":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "Completado":
      case "Finalizado":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Cancelado":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mafia-title text-3xl font-bold">Mis Solicitudes</h1>
        <p className="text-gray-400 mt-2">Estado de tus servicios solicitados</p>
      </div>

      {/* Buscador */}
      <div className="mafia-card rounded-xl p-6 mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre de servicio..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
          className="mafia-input w-full px-4 py-3 rounded-lg"
        />
      </div>

      {/* Cards paginadas */}
      <div className="space-y-4">
        {paginatedRequests.map((request) => (
          <div key={request.id} className="mafia-card rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{request.servicio.nombre}</h3>
                  <p className="text-gray-400 text-sm">
                    {request.vehiculo.marca} {request.vehiculo.modelo}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(request.estado)}`}>
                {request.estado}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Mecánico Asignado</p>
                <p className="text-white">{request.mecanico}</p>
              </div>
            </div>
          </div>
        ))}
        {filteredRequests.length === 0 && (
          <div className="text-center text-gray-400 py-8">No tienes solicitudes de servicio aún.</div>
        )}
      </div>

      {/* Paginador */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-6">
          <button
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="text-white font-bold">Página {currentPage} de {totalPages}</span>
          <button
            className="px-3 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default MyRequests
