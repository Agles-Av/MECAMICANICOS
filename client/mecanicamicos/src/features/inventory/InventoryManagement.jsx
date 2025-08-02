"use client"

import { useState, useEffect, useContext } from "react"
import { Plus, Search, Filter, Package, Wrench, AlertTriangle, Edit, Eye, EyeOff, BarChart3 } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import {
  GetInventoryService,
  GetLowStockItemsService,
  CreateInventoryItemService,
  UpdateInventoryItemService,
  ToggleInventoryStatusService,
} from "../../services/inventory/InventoryService"

const InventoryManagement = () => {
  const { user } = useContext(AuthContext)
  const [inventory, setInventory] = useState([])
  const [lowStockItems, setLowStockItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("ALL")
  const [filterCategory, setFilterCategory] = useState("ALL")
  const [showLowStock, setShowLowStock] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    codigo: "",
    categoria: "",
    tipo: "REPUESTO",
    marca: "",
    modelo: "",
    cantidadActual: 0,
    cantidadMinima: 5,
    cantidadMaxima: 100,
    precioCompra: 0,
    precioVenta: 0,
    proveedor: "",
    ubicacion: "",
  })

  const categories = [
    "Motor",
    "Transmisión",
    "Frenos",
    "Suspensión",
    "Eléctrico",
    "Carrocería",
    "Llantas",
    "Filtros",
    "Aceites",
    "Herramientas Manuales",
    "Herramientas Eléctricas",
    "Equipos de Diagnóstico",
  ]

  useEffect(() => {
    loadInventory()
    loadLowStockItems()
  }, [])

  const loadInventory = async () => {
    setLoading(true)
    try {
      const data = await GetInventoryService()
      setInventory(data)
    } catch (error) {
      console.error("Error loading inventory:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadLowStockItems = async () => {
    try {
      const data = await GetLowStockItemsService()
      setLowStockItems(data)
    } catch (error) {
      console.error("Error loading low stock items:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingItem) {
        await UpdateInventoryItemService(editingItem.id, formData)
      } else {
        await CreateInventoryItemService(formData)
      }

      await loadInventory()
      await loadLowStockItems()
      resetForm()
    } catch (error) {
      console.error("Error saving item:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setFormData({
      nombre: item.nombre,
      descripcion: item.descripcion,
      codigo: item.codigo,
      categoria: item.categoria,
      tipo: item.tipo,
      marca: item.marca,
      modelo: item.modelo,
      cantidadActual: item.cantidadActual,
      cantidadMinima: item.cantidadMinima,
      cantidadMaxima: item.cantidadMaxima,
      precioCompra: item.precioCompra,
      precioVenta: item.precioVenta,
      proveedor: item.proveedor,
      ubicacion: item.ubicacion,
    })
    setShowModal(true)
  }

  const handleToggleStatus = async (itemId) => {
    try {
      await ToggleInventoryStatusService(itemId)
      await loadInventory()
    } catch (error) {
      console.error("Error toggling item status:", error)
    }
  }

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        //const results = await SearchInventoryService(searchTerm)
        //setInventory(results)
      } catch (error) {
        console.error("Error searching inventory:", error)
      }
    } else {
      loadInventory()
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      codigo: "",
      categoria: "",
      tipo: "REPUESTO",
      marca: "",
      modelo: "",
      cantidadActual: 0,
      cantidadMinima: 5,
      cantidadMaxima: 100,
      precioCompra: 0,
      precioVenta: 0,
      proveedor: "",
      ubicacion: "",
    })
    setEditingItem(null)
    setShowModal(false)
  }

  const getStockStatus = (item) => {
    if (item.cantidadActual <= item.cantidadMinima) {
      return { status: "low", color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30" }
    } else if (item.cantidadActual >= item.cantidadMaxima * 0.8) {
      return { status: "high", color: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/30" }
    }
    return { status: "normal", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" }
  }

  const getTypeIcon = (tipo) => {
    return tipo === "REPUESTO" ? Package : Wrench
  }

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.marca.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "ALL" || item.tipo === filterType
    const matchesCategory = filterCategory === "ALL" || item.categoria === filterCategory
    const matchesLowStock = !showLowStock || item.cantidadActual <= item.cantidadMinima

    return matchesSearch && matchesType && matchesCategory && matchesLowStock
  })

  const canManageInventory = user?.rol === "ADMIN" || user?.rol === "MECHANIC"

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mafia-title text-3xl font-bold">Control de Inventario</h1>
          <p className="text-gray-400 mt-2">Gestión de repuestos y herramientas del taller</p>
        </div>
        {canManageInventory && (
          <button
            onClick={() => setShowModal(true)}
            className="mafia-button px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Artículo</span>
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Artículos</p>
              <p className="text-3xl font-bold text-white mt-2">{inventory.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Repuestos</p>
              <p className="text-3xl font-bold text-white mt-2">
                {inventory.filter((item) => item.tipo === "REPUESTO").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Herramientas</p>
              <p className="text-3xl font-bold text-white mt-2">
                {inventory.filter((item) => item.tipo === "HERRAMIENTA").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Wrench className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="mafia-card rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Stock Bajo</p>
              <p className="text-3xl font-bold text-red-400 mt-2">{lowStockItems.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <div>
              <h3 className="text-red-400 font-semibold">¡Alerta de Stock Bajo!</h3>
              <p className="text-gray-300 text-sm">
                {lowStockItems.length} artículo(s) necesitan reabastecimiento urgente
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mafia-card rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar artículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="mafia-input pl-10 pr-8 py-3 rounded-lg appearance-none"
            >
              <option value="ALL">Todos los Tipos</option>
              <option value="REPUESTO">Repuestos</option>
              <option value="HERRAMIENTA">Herramientas</option>
            </select>
          </div>

          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="mafia-input px-4 py-3 rounded-lg appearance-none"
            >
              <option value="ALL">Todas las Categorías</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="lowStock"
              checked={showLowStock}
              onChange={(e) => setShowLowStock(e.target.checked)}
              className="w-4 h-4 text-red-500 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
            />
            <label htmlFor="lowStock" className="text-gray-300 text-sm">
              Solo Stock Bajo
            </label>
          </div>

          <button
            onClick={handleSearch}
            className="mafia-button px-4 py-3 rounded-lg flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Buscar</span>
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="mafia-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 border-b border-yellow-500/20">
              <tr>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Artículo</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Tipo</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Stock</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Precios</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Ubicación</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Estado</th>
                <th className="text-left py-4 px-6 text-gray-300 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    Cargando inventario...
                  </td>
                </tr>
              ) : filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-400">
                    No se encontraron artículos
                  </td>
                </tr>
              ) : (
                filteredInventory.map((item) => {
                  const stockStatus = getStockStatus(item)
                  const TypeIcon = getTypeIcon(item.tipo)

                  return (
                    <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                            <TypeIcon className="w-5 h-5 text-gray-900" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{item.nombre}</p>
                            <p className="text-gray-400 text-sm">
                              {item.codigo} - {item.marca} {item.modelo}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.tipo === "REPUESTO"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-purple-500/20 text-purple-400"
                            }`}
                          >
                            {item.tipo}
                          </span>
                          <p className="text-gray-400 text-sm mt-1">{item.categoria}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className={`text-lg font-bold ${stockStatus.color}`}>{item.cantidadActual}</span>
                            {item.cantidadActual <= item.cantidadMinima && (
                              <AlertTriangle className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <p className="text-gray-400 text-xs">
                            Min: {item.cantidadMinima} | Max: {item.cantidadMaxima}
                          </p>
                          <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                            <div
                              className={`h-2 rounded-full ${
                                item.cantidadActual <= item.cantidadMinima
                                  ? "bg-red-500"
                                  : item.cantidadActual >= item.cantidadMaxima * 0.8
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                              }`}
                              style={{
                                width: `${Math.min((item.cantidadActual / item.cantidadMaxima) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-white text-sm">
                            <span className="text-red-400">C:</span> ${item.precioCompra}
                          </p>
                          <p className="text-white text-sm">
                            <span className="text-green-400">V:</span> ${item.precioVenta}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-white text-sm">{item.ubicacion}</p>
                          <p className="text-gray-400 text-xs">{item.proveedor}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`w-2 h-2 rounded-full ${item.estado ? "bg-green-400" : "bg-red-400"}`}
                          ></span>
                          <span className={`text-sm ${item.estado ? "text-green-400" : "text-red-400"}`}>
                            {item.estado ? "Activo" : "Inactivo"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          {canManageInventory && (
                            <>
                              <button
                                onClick={() => handleEdit(item)}
                                className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors"
                                title="Editar"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleToggleStatus(item.id)}
                                className={`p-2 rounded-lg transition-colors ${
                                  item.estado
                                    ? "text-red-400 hover:bg-red-500/20"
                                    : "text-green-400 hover:bg-green-500/20"
                                }`}
                                title={item.estado ? "Desactivar" : "Activar"}
                              >
                                {item.estado ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                            </>
                          )}
                          <button
                            className="p-2 text-yellow-400 hover:bg-yellow-500/20 rounded-lg transition-colors"
                            title="Ver Movimientos"
                          >
                            <BarChart3 className="w-4 h-4" />
                          </button>
                        </div>
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
      {showModal && canManageInventory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">{editingItem ? "Editar Artículo" : "Nuevo Artículo"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Nombre *</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Código *</label>
                  <input
                    type="text"
                    value={formData.codigo}
                    onChange={(e) => setFormData({ ...formData, codigo: e.target.value.toUpperCase() })}
                    className="mafia-input w-full px-4 py-3 rounded-lg font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tipo *</label>
                  <select
                    value={formData.tipo}
                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                    required
                  >
                    <option value="REPUESTO">Repuesto</option>
                    <option value="HERRAMIENTA">Herramienta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Categoría *</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                    required
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Marca</label>
                  <input
                    type="text"
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Modelo</label>
                  <input
                    type="text"
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cantidad Actual *</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.cantidadActual}
                    onChange={(e) => setFormData({ ...formData, cantidadActual: Number.parseInt(e.target.value) || 0 })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cantidad Mínima *</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.cantidadMinima}
                    onChange={(e) => setFormData({ ...formData, cantidadMinima: Number.parseInt(e.target.value) || 0 })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Cantidad Máxima *</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.cantidadMaxima}
                    onChange={(e) => setFormData({ ...formData, cantidadMaxima: Number.parseInt(e.target.value) || 0 })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Precio Compra ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.precioCompra}
                    onChange={(e) => setFormData({ ...formData, precioCompra: Number.parseFloat(e.target.value) || 0 })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Precio Venta ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.precioVenta}
                    onChange={(e) => setFormData({ ...formData, precioVenta: Number.parseFloat(e.target.value) || 0 })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Proveedor</label>
                  <input
                    type="text"
                    value={formData.proveedor}
                    onChange={(e) => setFormData({ ...formData, proveedor: e.target.value })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Ubicación</label>
                  <input
                    type="text"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
                    className="mafia-input w-full px-4 py-3 rounded-lg"
                    placeholder="Ej: Estante A-1, Caja 5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg h-24 resize-none"
                  placeholder="Descripción detallada del artículo..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="submit" disabled={loading} className="mafia-button flex-1 py-3 rounded-lg font-semibold">
                  {loading ? "Guardando..." : editingItem ? "Actualizar" : "Crear"}
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

export default InventoryManagement
