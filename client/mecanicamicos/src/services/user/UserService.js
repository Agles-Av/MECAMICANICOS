import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"
import { UserAdapter } from "../../adapters/user/UserAdapter"

export const GetUsersService = async () => {
  try {
    const response = await AxiosClient({
      method: "GET",
      url: "/usuario/",
    })

    if (response.data.status === "Ok") {
      return response.data.data.map((user) => UserAdapter.toModel(user))
    }
    return []
  } catch (error) {
    throw error
  }
}

export const CreateUserService = async (usuario) => {
  console.log("Recibiendo usaurio en CreateUserService:", usuario);
  
  try {
    const userData = UserAdapter.toDTO(usuario)
    console.log("User data to send:", userData);
    const response = await AxiosClient({
      method: "POST",
      url: "/usuario/",
      data: userData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Miembro agregado a la famiglia exitosamente", "success")
      return UserAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const UpdateUserService = async (id, usuario) => {
  try {
    const userData = UserAdapter.toDTO(usuario)
    const response = await AxiosClient({
      method: "PUT",
      url: `/auth/updateProfile/${id}`,
      data: userData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Información del miembro actualizada", "success")
      return UserAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const ToggleUserStatusService = async (id) => {
  try {
    const response = await AxiosClient({
      method: "PATCH",
      url: `/usuario/status/${id}/`,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Estado del miembro actualizado", "success")
      return UserAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}
