import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"
import { CategoryAdapter } from "../../adapters/category/CategoryAdapter"

export const GetCategoriesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/categoria/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((category) => CategoryAdapter.toModel(category))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetActiveCategoriesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/categoria/status/true",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((category) => CategoryAdapter.toModel(category))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetInactiveCategoriesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/categoria/status/false",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((category) => CategoryAdapter.toModel(category))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetCategoryByIdService = async (id) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/categoria/${id}/`,
    })

    if (response.data.status === "Ok") {
      return CategoryAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const CreateCategoryService = async (categoria) => {
  try {
    const categoryData = CategoryAdapter.toDTO(categoria)
    const response = await AxiosClient({
      method: "POST",
      url: "/categoria/",
      data: categoryData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Categoría creada exitosamente", "success")
      return CategoryAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const UpdateCategoryService = async (id, categoria) => {
  try {
    const categoryData = CategoryAdapter.toDTO(categoria)
    const response = await AxiosClient({
      method: "PUT",
      url: `/categoria/${id}/`,
      data: categoryData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Categoría actualizada exitosamente", "success")
      return CategoryAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const ToggleCategoryStatusService = async (id) => {
  try {
    const response = await AxiosClient({
      method: "PATCH",
      url: `/categoria/status/${id}/`,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado de la categoría actualizado", "success")
      return CategoryAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}
