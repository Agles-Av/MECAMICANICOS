import AxiosClient from "../../interceptors/AxiosClient"
import { AlertHelper } from "../../utilities/AlertHelper"

export const RequestPasswordResetService = async (email) => {
  try {
    const response = await AxiosClient({
      method: "POST",
      url: `/auth/password/request-reset?email=${email}`,
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Se ha enviado un enlace de recuperación a tu correo", "success")
      return response.data
    }
  } catch (error) {
    throw error
  }
}

export const ResetPasswordService = async (token, newPassword) => {
  try {
    const response = await AxiosClient({
      method: "POST",
      url: "/auth/password/reset",
      data: {
        token: token,
        newPassword: newPassword,
      },
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Contraseña actualizada exitosamente", "success")
      return response.data
    }
  } catch (error) {
    throw error
  }
}

export const UpdatePasswordService = async (userId, newPassword) => {
  try {
    const response = await AxiosClient({
      method: "PUT",
      url: `/auth/updatePassword/${userId}`,
      data: {
        password: newPassword,
      },
    })

    if (response.data.status === "Ok") {
      AlertHelper.showAlert("Contraseña actualizada exitosamente", "success")
      return response.data
    }
  } catch (error) {
    throw error
  }
}
