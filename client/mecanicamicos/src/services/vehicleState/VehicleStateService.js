import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"
import { VehicleStateAdapter } from "../../adapters/vehicleState/VehicleStateAdapter"

export const GetVehicleStatesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/vehserv/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((state) => VehicleStateAdapter.toModel(state))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetVehicleStateByIdService = async (id) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/estado/${id}/`,
    })

    if (response.data.status === "Ok") {
      return VehicleStateAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const CreateVehicleStateService = async (estado) => {
  try {
    const stateData = VehicleStateAdapter.toDTO(estado)
    const response = await AxiosClient({
      method: "POST",
      url: "/estado/",
      data: stateData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado creado exitosamente", "success")
      return VehicleStateAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const UpdateVehicleStateService = async (id, estado) => {
  try {
    const stateData = VehicleStateAdapter.toDTO(estado)
    const response = await AxiosClient({
      method: "PUT",
      url: `/estado/${id}/`,
      data: stateData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado actualizado exitosamente", "success")
      return VehicleStateAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}
