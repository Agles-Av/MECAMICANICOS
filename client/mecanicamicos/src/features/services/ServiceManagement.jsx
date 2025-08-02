"use client"

import { useState, useEffect, useContext } from "react"
import { Plus, Edit, Search, Filter, Wrench, DollarSign, Eye, EyeOff } from "lucide-react"
import AuthContext from "../../context/AuthContext"
import { GetCategoriesService } from "../../services/category/CategoryService"
import { CreateServiceService, GetServicesService, ToggleServiceStatusService, UpdateServiceService } from "../../services/service/ServiceService"
import { CreateVehicleServiceService } from "../../services/vehicleService/VehicleServiceService"
import { GetVehiclesByOwnerService } from "../../services/vehicle/VehicleService"
import { AlertHelper } from "../../utilities/AlertHelper"

const ServiceManagement = () => {
  const { user } = useContext(AuthContext)
  const [services, setServices] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    categoriaId: "",
  })
  // Modal para solicitar servicio (USER)
  const [showUserModal, setShowUserModal] = useState(false)
  const [userRequestData, setUserRequestData] = useState({
    vehiculoId: "",
    servicioId: "",
    estadoId: "",
  })
  const [userVehicles, setUserVehicles] = useState([])

  useEffect(() => {
    loadServices()
    loadCategories()
    if (user?.role?.nombre === "USER") {
      loadUserVehicles()
    }
  }, [user])

  const loadUserVehicles = async () => {
    try {
      const response = await GetVehiclesByOwnerService(user.id)
      setUserVehicles(response)
    } catch (error) {
      setUserVehicles([])
    }
  }

  const loadServices = async () => {
    setLoading(true)
    try {
      const response = await GetServicesService();
      const responseWithHardcodedPrice = response.map(service => ({
        ...service,
        precio: service.precio || "240.00", 
      }))
      
      setServices(responseWithHardcodedPrice)
    } catch (error) {
      AlertHelper.showAlert(error, "error")
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await GetCategoriesService()
      setCategories(response)
    } catch (error) {
      console.error("Error loading categories:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formDataWithStatus = {
      ...formData,
      status: editingService ? editingService.status : true, 
    }
    try {
      if (editingService) {
        await UpdateServiceService(editingService.id, formDataWithStatus)
      } else {
        await CreateServiceService(formDataWithStatus)
      }
      await loadServices()
      resetForm()
    } catch (error) {
      AlertHelper.showAlert("Error al guardar el servicio", "error")
      console.error("Error saving service:", error)
    } finally {
      setLoading(false)
    }
    setShowModal(false)
  }

  const handleEdit = (service) => {
    setEditingService(service)
    setFormData({
      nombre: service.nombre,
      descripcion: service.descripcion,
      categoriaId: service.categoria ? service.categoria.id : "", // Aseguramos que sea un ID válido
     
    })
    setShowModal(true)
  }

  const ToggleStatus = async (service) => {
    try {
      await ToggleServiceStatusService(service.id)
    } catch (error) {
      AlertHelper.showAlert(error, "error")
    }finally{
      await loadServices()
      AlertHelper.showAlert(`Servicio ${service.status ? "desactivado" : "activado"} exitosamente`, "success")
    }
    
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      categoriaId: "",
    })
    setEditingService(null)
    setShowModal(false)
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.categoria && service.categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (service.categoria && service.categoria.descripcion.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesSearch 
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mafia-title text-3xl font-bold">Catálogo de Servicios</h1>
          <p className="text-gray-400 mt-2">Gestiona todos los servicios del taller</p>
        </div>
        {user?.role?.nombre === "ADMIN" && (
          <button
            onClick={() => setShowModal(true)}
            className="mafia-button px-6 py-3 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Nuevo Servicio</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mafia-card rounded-xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar servicios...  (Nombre, Descripción, Categoría)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg"
            />
          </div>
          
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-400">Cargando servicios...</div>
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">No se encontraron servicios</div>
        ) : (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="mafia-card rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-gray-900" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${service.status ? "bg-green-400" : "bg-red-400"}`}></span>
                  <span className={`text-sm ${service.status ? "text-green-400" : "text-red-400"}`}>
                    {service.status ? "Disponible" : "No Disponible"}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <h3 className="text-xl font-bold text-white">{service.nombre}</h3>
                <p className="text-gray-400 text-sm">{service.descripcion}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Categoría:</span>
                  <span className="text-yellow-400 font-medium">{service.categoria?.nombre}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Precio:</span>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-bold text-lg">{service.precio}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                {user?.role?.nombre === "ADMIN" && (
                  <>
                   <button
                    onClick={() => handleEdit(service)}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  
                   <button
                    onClick={() => ToggleStatus(service)}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
                  >
                   {service.status?  <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  
                  </>
                 

                  
                )}
                {user?.role.nombre === "USER" && ( 
                  <button
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
                    onClick={() => {
                      setUserRequestData({
                        vehiculoId: "",
                        servicioId: service.id,
                        estadoId: "",
                      })
                      setShowUserModal(true)
                    }}
                  >
                    Solicitar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para solicitar servicio (USER) */}
      {showUserModal && user?.role?.nombre === "USER" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">Solicitar Servicio</h3>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                try {
                  await CreateVehicleServiceService({
                    vehiculoId: userRequestData.vehiculoId,
                    servicioId: userRequestData.servicioId,
                    estadoId: 1,
                  })
                  setShowUserModal(false)
                  setUserRequestData({ vehiculoId: "", servicioId: "", estadoId: "" })
                  AlertHelper.showAlert("Solicitud enviada correctamente", "success")
                } catch (error) {
                  AlertHelper.showAlert("Error al solicitar servicio", "error")
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Vehículo</label>
                <select
                  value={userRequestData.vehiculoId}
                  onChange={(e) => setUserRequestData({ ...userRequestData, vehiculoId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar vehículo</option>
                  {userVehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.marca} {vehicle.modelo} - {vehicle.placa}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="mafia-button flex-1 py-3 rounded-lg font-semibold">
                  Solicitar
                </button>
                <button
                  type="button"
                  onClick={() => { setShowUserModal(false); setUserRequestData({ vehiculoId: "", servicioId: "", estadoId: "" }) }}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para crear/editar servicio (ADMIN) */}
      {showModal && user?.role.nombre === "ADMIN" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingService ? "Editar Servicio" : "Nuevo Servicio"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg h-24 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Categoría</label>
                <select
                  value={formData.categoriaId}
                  onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                  className="mafia-input w-full px-4 py-3 rounded-lg"
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="submit" disabled={loading} className="mafia-button flex-1 py-3 rounded-lg font-semibold">
                  {loading ? "Guardando..." : editingService ? "Actualizar" : "Crear"}
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

export default ServiceManagement
