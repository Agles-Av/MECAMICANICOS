import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"
import { ServiceAdapter } from "../../adapters/service/ServiceAdapter"

export const GetServicesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/servicio/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((service) => ServiceAdapter.toModel(service))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetActiveServicesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/servicio/status/true/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((service) => ServiceAdapter.toModel(service))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetInactiveServicesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/servicio/status/false",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((service) => ServiceAdapter.toModel(service))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const CreateServiceService = async (servicio) => {
  
  try {
    const serviceData = ServiceAdapter.toDTO(servicio)
    
    const response = await AxiosClient({
      method: "POST",
      url: "/servicio/",
      data: serviceData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Servicio creado exitosamente", "success")
      return ServiceAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const UpdateServiceService = async (id, servicio) => {
  try {
    const serviceData = ServiceAdapter.toDTO(servicio)
    const response = await AxiosClient({
      method: "PUT",
      url: `/servicio/${id}/`,
      data: serviceData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Servicio actualizado exitosamente", "success")
      return ServiceAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const ToggleServiceStatusService = async (id) => {
  try {
    const response = await AxiosClient({
      method: "PATCH",
      url: `/servicio/status/${id}/`,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado del servicio actualizado", "success")
      return ServiceAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}
