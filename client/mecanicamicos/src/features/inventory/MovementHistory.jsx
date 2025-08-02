"use client"

import { useState, useEffect, useContext } from "react"
import { Plus, Calendar, User, Package, TrendingUp, TrendingDown, RotateCcw, Filter } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import {
  GetMovementsService,
  CreateMovementService,
  GetMovementsByDateRangeService,
} from "../../services/movement/MovementService"
import { GetInventoryService } from "../../services/inventory/InventoryService"

const MovementHistory = () => {
  const { user } = useContext(AuthContext)
  const [movements, setMovements] = useState([])
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [filterType, setFilterType] = useState("ALL")
  const [dateRange, setDateRange] = useState({
    inicio: "",
    fin: "",
  })
  const [formData, setFormData] = useState({
    inventarioId: "",
    tipo: "ENTRADA",
    cantidad: 1,
    motivo: "",
    observaciones: "",
  })

  const movementTypes = {
    ENTRADA: { label: "Entrada", icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/20" },
    SALIDA: { label: "Salida", icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/20" },
    AJUSTE: { label: "Ajuste", icon: RotateCcw, color: "text-yellow-400", bg: "bg-yellow-500/20" },
  }

  const motivos = {
    ENTRADA: ["Compra", "Devolución", "Transferencia", "Donación", "Otro"],
    SALIDA: ["Venta", "Uso en servicio", "Pérdida", "Daño", "Transferencia", "Otro"],
    AJUSTE: ["Inventario físico", "Corrección de error", "Merma", "Otro"],
  }

  useEffect(() => {
    loadMovements()
    loadInventory()
  }, [])

  const loadMovements = async () => {
    setLoading(true)
    try {
      const data = await GetMovementsService()
      setMovements(data)
    } catch (error) {
      console.error("Error loading movements:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadInventory = async () => {
    try {
      const data = await GetInventoryService()
      setInventory(data)
    } catch (error) {
      console.error("Error loading inventory:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const movementData = {
        ...formData,
        usuarioId: user.id,
      }
      await CreateMovementService(movementData)
      await loadMovements()
      resetForm()
    } catch (error) {
      console.error("Error creating movement:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDateFilter = async () => {
    if (dateRange.inicio && dateRange.fin) {
      setLoading(true)
      try {
        const data = await GetMovementsByDateRangeService(dateRange.inicio, dateRange.fin)
        setMovements(data)
      } catch (error) {
        console.error("Error filtering by date:", error)
      } finally {
        setLoading(false)
      }
    } else {
      loadMovements()
    }
  }

  const resetForm = () => {
    setFormData({
      inventarioId: "",
      tipo: "ENTRADA",
      cantidad: 1,
      motivo: "",
      observaciones: "",
    })
    setShowModal(false)
  }

  const filteredMovements = movements.filter((movement) => {
    return filterType === "ALL" || movement.tipo === filterType
  })

  const canManageMovements = user?.rol === "ADMIN" || user?.rol === "MECHANIC"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mafia-title text-3xl font-bold">Historial de Movimientos</h1>
          <p className="text-gray-400 mt-2">Control de entradas, salidas y ajustes de inventario</p>
        </div>
        {canManageMovements && (
          <button
            onClick={() => setShowModal(true)}
            className="mafia-button px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Movimiento</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(movementTypes).map(([type, config]) => {
          const Icon = config.icon
          const count = movements.filter((m) => m.tipo === type).length

          return (
            <div key={type} className="mafia-card rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{config.label}s</p>
                  <p className={`text-3xl font-bold mt-2 ${config.color}`}>{count}</p>
                </div>
                <div className={`w-12 h-12 ${config.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="mafia-card rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="mafia-input pl-10 pr-8 py-3 rounded-lg appearance-none"
            >
              <option value="ALL">Todos los Movimientos</option>
              <option value="ENTRADA">Solo Entradas</option>
              <option value="SALIDA">Solo Salidas</option>
              <option value="AJUSTE">Solo Ajustes</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              value={dateRange.inicio}
              onChange={(e) => setDateRange({ ...dateRange, inicio: e.target.value })}
              className="mafia-input w-full px-4 py-3 rounded-lg"
              placeholder="Fecha inicio"
            />
          </div>

          <div>
            <input
              type="date"
              value={dateRange.fin}
              onChange={(e) => setDateRange({ ...dateRange, fin: e.target.value })}
              className="mafia-input w-full px-4 py-3 rounded-lg"
              placeholder="Fecha fin"
            />
          </div>

          <button
            onClick={handleDateFilter}
            className="mafia-button px-4 py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Filtrar</span>
          </button>
        </div>
      </div>

      {/* Movements Table */}
      <div className="mafia-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-yellow-500/20">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Fecha</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Artículo</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Tipo</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Cantidad</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Motivo</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Usuario</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    Cargando movimientos...
                  </td>
                </tr>
              ) : filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No se encontraron movimientos
                  </td>
                </tr>
              ) : (
                filteredMovements.map((movement) => {
                  const typeConfig = movementTypes[movement.tipo]
                  const Icon = typeConfig.icon

                  return (
                    <tr key={movement.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-white font-medium">
                            {new Date(movement.fecha || movement.fechaCreacion).toLocaleDateString()}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {new Date(movement.fecha || movement.fechaCreacion).toLocaleTimeString()}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 text-gray-900" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{movement.inventario?.nombre}</p>
                            <p className="text-gray-400 text-sm">{movement.inventario?.codigo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className={`w-8 h-8 ${typeConfig.bg} rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${typeConfig.color}`} />
                          </div>
                          <span className={`font-medium ${typeConfig.color}`}>{typeConfig.label}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-lg font-bold ${typeConfig.color}`}>
                          {movement.tipo === "SALIDA" ? "-" : "+"}
                          {movement.cantidad}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-white">{movement.motivo}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3 text-gray-900" />
                          </div>
                          <span className="text-white text-sm">
                            {movement.usuario?.nombre} {movement.usuario?.apellidos}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <p className="text-gray-300 text-sm max-w-xs truncate" title={movement.observaciones}>
                          {movement.observaciones || "-"}
                        </p>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && canManageMovements && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">Nuevo Movimiento de Inventario</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Artículo *</label>
                <select
                  value={formData.inventarioId}
                  onChange={(e) => setFormData({ ...formData, inventarioId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar artículo</option>
                  {inventory.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nombre} - {item.codigo} (Stock: {item.cantidadActual})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tipo de Movimiento *</label>
                <select
                  value={formData.tipo}
                  onChange={(e) => setFormData({ ...formData, tipo: e.target.value, motivo: "" })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="ENTRADA">Entrada</option>
                  <option value="SALIDA">Salida</option>
                  <option value="AJUSTE">Ajuste</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cantidad *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.cantidad}
                  onChange={(e) => setFormData({ ...formData, cantidad: Number.parseInt(e.target.value) || 1 })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Motivo *</label>
                <select
                  value={formData.motivo}
                  onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar motivo</option>
                  {motivos[formData.tipo]?.map((motivo) => (
                    <option key={motivo} value={motivo}>
                      {motivo}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Observaciones</label>
                <textarea
                  value={formData.observaciones}
                  onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg h-24 resize-none"
                  placeholder="Detalles adicionales del movimiento..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="submit" disabled={loading} className="mafia-button flex-1 py-3 rounded-lg font-semibold">
                  {loading ? "Registrando..." : "Registrar Movimiento"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MovementHistory
