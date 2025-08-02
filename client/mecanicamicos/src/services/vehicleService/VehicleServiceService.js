import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"
import { VehicleServiceAdapter } from "../../adapters/vehicleService/VehicleServiceAdapter"

export const GetVehicleServicesService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/vehserv/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((vehicleService) => VehicleServiceAdapter.toModel(vehicleService))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetVehicleServicesByStateService = async (estadoId) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/vehserv/estado/${estadoId}/`,
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((vehicleService) => VehicleServiceAdapter.toModel(vehicleService))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetVehicleServicesByMechanicService = async (mecanicoId) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/vehserv/mecanico/${mecanicoId}/`,
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((vehicleService) => VehicleServiceAdapter.toModel(vehicleService))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetVehicleServicesByServiceService = async (servicioId) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/vehserv/servicio/${servicioId}/`,
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((vehicleService) => VehicleServiceAdapter.toModel(vehicleService))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const GetVehicleServicesByVehicleService = async (vehiculoId) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/vehserv/vehiculo/${vehiculoId}/`,
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((vehicleService) => VehicleServiceAdapter.toModel(vehicleService))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const CreateVehicleServiceService = async (vehicleServiceData) => {
  console.log("Creating vehicle service with data:", vehicleServiceData);
  
  try {
    const data = VehicleServiceAdapter.toDTO(vehicleServiceData)
    console.log("Converted data to DTO:", data);
    const response = await AxiosClient({
      method: "POST",
      url: "/vehserv/",
      data: data,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Servicio asignado exitosamente", "success")
      return VehicleServiceAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const UpdateVehicleServiceService = async (id, vehicleServiceData) => {
  try {
    const data = VehicleServiceAdapter.toDTO(vehicleServiceData)
    const response = await AxiosClient({
      method: "PUT",
      url: `/vehserv/${id}/`,
      data: data,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Servicio actualizado exitosamente", "success")
      return VehicleServiceAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const AssignMechanicToServiceService = async (idVehServe, idMecanico) => {
  try {
    const response = await AxiosClient({
      method: "PUT",
      url: `/vehserv/cambio-mecanico/${idVehServe}/${idMecanico}/`,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Mecánico asi gnado exitosamente", "success")
      return VehicleServiceAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const UpdateVehicleServiceStatusService = async (idVehServe, idEstado) => {
  try {
    const response = await AxiosClient({
      method: "PATCH",
      url: `/vehserv/cambio-estado/${idVehServe}/${idEstado}/`,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado del servicio actualizado", "success")
      return VehicleServiceAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const GetServicesByMechanic = async (mecanicoId) => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/vehserv/mecanico/${mecanicoId}/`,
    })
    console.log("Response from GetServicesByMechanic:", response);

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado del servicio actualizado", "success")
      return VehicleServiceAdapter.toModels(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const GetServicesNotAssignedToMechanic = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: `/vehserv/mecanico-sin-asignar/`,
    })
    console.log("Response from GetServicesByMechanic:", response);

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado del servicio actualizado", "success")
      return VehicleServiceAdapter.toModels(response.data.data)
    }
  } catch (error) {
    throw error
  }
}
