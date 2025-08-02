import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"
import { MovementAdapter } from "../../adapters/movement/MovementAdapter"

export const GetMovementsService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/movimiento/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((movement) => MovementAdapter.toModel(movement))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetMovementsByInventoryService = async (inventarioId) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/movimiento/inventario/${inventarioId}/`,
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((movement) => MovementAdapter.toModel(movement))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetMovementsByTypeService = async (tipo) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/movimiento/tipo/${tipo}/`,
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((movement) => MovementAdapter.toModel(movement))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const CreateMovementService = async (movement) => {
  try {
    const movementData = MovementAdapter.toDTO(movement)
    const response = await AxiosClient({
      method: "POST",
      url: "/movimiento/",
      data: movementData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Movimiento registrado exitosamente", "success")
      return MovementAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const GetMovementsByDateRangeService = async (fechaInicio, fechaFin) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/movimiento/fecha/${fechaInicio}/${fechaFin}/`,
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((movement) => MovementAdapter.toModel(movement))
    }
    return []
  } catch (error) {
    throw error
  }
}
