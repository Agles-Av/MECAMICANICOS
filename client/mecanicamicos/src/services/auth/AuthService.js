import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"
import { UserAdapter } from "../../adapters/user/UserAdapter"

export const LoginService = async (credentials) => {
  try {
    const loginData = UserAdapter.toLoginDTO(credentials)
    const response = await AxiosClient({
      method: "POST",
      url: "/auth/login",
      data: loginData,
    })
    
    if (response.data.status === "Ok") {
      AlertHelper.showAlert("¡Bienvenido a la famiglia!", "success")
      return UserAdapter.toLoginModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}

export const RegisterUserService = async (usuario) => {
  try {
    const userData = UserAdapter.toDTO(usuario)    
    const response = await AxiosClient({
      method: "POST",
      url: "/auth/register",
      data: userData,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Usuario registrado correctamente", "success")
      return UserAdapter.toModel(response.data.data)
    }
  } catch (error) {
    throw error
  }
}
