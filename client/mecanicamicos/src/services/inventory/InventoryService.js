import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"
import { InventoryAdapter } from "../../adapters/inventory/InventoryAdapter"

export const GetInventoryService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/inventario/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((item) => InventoryAdapter.toModel(item))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetInventoryByIdService = async (id) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/inventario/${id}/`,
    })

    if (response.data.status === "Ok") {
      return InventoryAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const CreateInventoryItemService = async (item) => {
  try {
    const itemData = InventoryAdapter.toDTO(item)
    const response = await AxiosClient({
      method: "POST",
      url: "/inventario/",
      data: itemData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Artículo agregado al inventario", "success")
      return InventoryAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const UpdateInventoryItemService = async (id, item) => {
  try {
    const itemData = InventoryAdapter.toDTO(item)
    const response = await AxiosClient({
      method: "PUT",
      url: `/inventario/${id}/`,
      data: itemData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Artículo actualizado exitosamente", "success")
      return InventoryAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const ToggleInventoryStatusService = async (id) => {
  try {
    const response = await AxiosClient({
      method: "PATCH",
      url: `/inventario/status/${id}/`,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado del artículo actualizado", "success")
      return InventoryAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const GetLowStockItemsService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/inventario/low-stock/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((item) => InventoryAdapter.toModel(item))
    }
    return []
  } catch (error) {
    throw error
  }
}
