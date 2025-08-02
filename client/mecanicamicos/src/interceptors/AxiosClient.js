import axios from "axios"
import { AlertHelper } from "../utilities/AlertHelper"

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL || "http://localhost:8080"

export const AxiosClient = axios.create({
  baseURL: SERVER_URL,
  withCredentials: false,
})

AxiosClient.interceptors.request.use(
  (request) => {
    if (request.data instanceof FormData) {
      // El content-type lo pone Axios solo
    } else {
      request.headers["Content-Type"] = "application/json"
    }
    request.headers["Accept"] = "application/json"
    request.headers["Access-Control-Allow-Origin"] = "*"

    const session = localStorage.getItem("token") || null
    if (session) {
      request.headers["Authorization"] = `Bearer ${session}`
    }
    return request
  },
  (error) => {
    AlertHelper.showAlert("Error in request: " + error.message, "error")
    return Promise.reject(error)
  },
)

AxiosClient.interceptors.response.use(
  (response) => {
    // Remove automatic success alert - let services handle their own alerts
    return response
  },
  (error) => {
    console.log("log en axios", error)

    const message = error.response?.data?.message || error.response?.data || "Ocurrió un error inesperado."
    AlertHelper.showAlert(message, "error")
    return Promise.reject(error)
  },
)

export default AxiosClient
