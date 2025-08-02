"use client"

import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token } = useContext(AuthContext)

  // Verificar si está autenticado
  if (!user || !token) {
    return <Navigate to="/login" replace />
  }

  // Verificar si el rol está permitido
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}

export default ProtectedRoute
