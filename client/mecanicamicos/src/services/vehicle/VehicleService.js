import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"
import { VehicleAdapter } from "../../adapters/vehicle/VehicleAdapter"

export const GetVehiclesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/vehiculo/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((vehicle) => VehicleAdapter.toModel(vehicle))
    }
    return []
  } catch (error) {
    throw error 
  }
}

export const GetVehiclesByOwnerService = async (duenioId) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/vehiculo/duenio/${duenioId}/`,
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((vehicle) => VehicleAdapter.toModel(vehicle))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetActiveVehiclesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/vehiculo/status/true",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((vehicle) => VehicleAdapter.toModel(vehicle))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetInactiveVehiclesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/vehiculo/status/false",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((vehicle) => VehicleAdapter.toModel(vehicle))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const CreateVehicleService = async (vehiculo) => {
  try {
    const vehicleData = VehicleAdapter.toDTO(vehiculo)
    const response = await AxiosClient({
      method: "POST",
      url: "/vehiculo/",
      data: vehicleData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Vehículo registrado exitosamente", "success")
      return VehicleAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const UpdateVehicleService = async (id, vehiculo) => {
  try {
    const vehicleData = VehicleAdapter.toDTO(vehiculo)
    const response = await AxiosClient({
      method: "PUT",
      url: `/vehiculo/${id}/`,
      data: vehicleData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Vehículo actualizado exitosamente", "success")
      return VehicleAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const ToggleVehicleStatusService = async (id) => {
  try {
    const response = await AxiosClient({
      method: "PATCH",
      url: `/vehiculo/status/${id}/`,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado del vehículo actualizado", "success")
      return VehicleAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}
