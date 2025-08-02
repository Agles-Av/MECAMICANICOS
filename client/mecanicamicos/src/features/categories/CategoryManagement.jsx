"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Eye, EyeOff, Search, FolderOpen } from "lucide-react"
import { CreateCategoryService, GetCategoriesService, ToggleCategoryStatusService, UpdateCategoryService } from "../../services/category/CategoryService"

const CategoryManagement = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
  })

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    try {
      // Simulación de datos
      const  response = await GetCategoriesService();
      console.log("Categories loaded:", response);
      
      setCategories(response)
    } catch (error) {
      console.error("Error loading categories:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formDataWithStatus = {
      ...formData,
      status: editingCategory ? editingCategory.status : true, // Mantener el estado actual si se está editando
    }

    try {
      if (editingCategory) {
        await UpdateCategoryService(editingCategory.id, formDataWithStatus)
      } else {
        await CreateCategoryService(formDataWithStatus)
      }
      await loadCategories()
      resetForm()
    } catch (error) {
      console.error("Error saving category:", error)
    } finally {
      setLoading(false)
    }
    setShowModal(false)
    setFormData({
      nombre: "",
      descripcion: "",
    })
    setEditingCategory(null)
    setShowModal(false)
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      nombre: category.nombre,
      descripcion: category.descripcion,
    })
    setShowModal(true)
  }

  const handleToggleStatus = async (categoryId) => {
    console.log("Toggling status for category ID:", categoryId);
    
    try {
      await ToggleCategoryStatusService(categoryId)
    } catch (error) {
      console.error("Error toggling category status:", error)
    }finally{
      await loadCategories()
    }
  }

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
    })
    setEditingCategory(null)
    setShowModal(false)
  }

  const filteredCategories = categories.filter(
    (category) =>
      category.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="mafia-title text-3xl font-bold">Categorías de Servicios</h1>
          <p className="text-gray-400 mt-2">Organiza y clasifica todos los servicios del taller</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mafia-button px-6 py-3 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Search */}
      <div className="mafia-card rounded-xl p-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar categorías..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mafia-input w-full pl-10 pr-4 py-3 rounded-lg"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-400">Cargando categorías...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-400">No se encontraron categorías</div>
        ) : (
          filteredCategories.map((category) => (
            <div
              key={category.id}
              className="mafia-card rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-gray-900" />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${category.status ? "bg-green-400" : "bg-red-400"}`}></span>
                  <span className={`text-sm ${category.status ? "text-green-400" : "text-red-400"}`}>
                    {category.status ? "Activa" : "Inactiva"}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <h3 className="text-xl font-bold text-white">{category.nombre}</h3>
                <p className="text-gray-400 text-sm">{category.descripcion}</p>
                
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center justify-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => handleToggleStatus(category.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    category.estado ? "text-red-400 hover:bg-red-500/20" : "text-green-400 hover:bg-green-500/20"
                  }`}
                  title={category.estado ? "Desactivar" : "Activar"}
                >
                  {category.estado ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="mafia-card rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-white mb-4">
              {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
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

              <div className="flex space-x-3 pt-4">
                <button type="submit" disabled={loading} className="mafia-button flex-1 py-3 rounded-lg font-semibold">
                  {loading ? "Guardando..." : editingCategory ? "Actualizar" : "Crear"}
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

export default CategoryManagement
