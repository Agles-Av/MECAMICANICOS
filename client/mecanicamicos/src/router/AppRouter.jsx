"use client"

import { useContext, Suspense, lazy } from "react"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import SpinnerLazy from "../utilities/SpinnerLazy"

// Lazy loading de layouts
const AdminLayout = lazy(() => import("../layouts/AdminLayout"))
const MechanicLayout = lazy(() => import("../layouts/MechanicLayout"))
const UserLayout = lazy(() => import("../layouts/UserLayout"))

// Lazy loading de componentes de acceso
const Login = lazy(() => import("../features/access-control/Login"))
const Register = lazy(() => import("../features/access-control/UserRegister"))
const ForgotPassword = lazy(() => import("../features/access-control/ForgotPassword"))
const ResetPassword = lazy(() => import("../features/access-control/ResetPassword"))

// Lazy loading de componentes compartidos
const NotFound404 = lazy(() => import("../components/NotFound404"))
const Unauthorized = lazy(() => import("../components/Unauthorized"))
const Profile = lazy(() => import("../features/profile/Profile"))

// Lazy loading de componentes ADMIN
const AdminDashboard = lazy(() => import("../features/dashboard/Dashboard"))
const UserManagement = lazy(() => import("../features/users/UserManagement"))
const VehicleManagement = lazy(() => import("../features/vehicles/VehicleManagement"))
const ServiceManagement = lazy(() => import("../features/services/ServiceManagement"))
const CategoryManagement = lazy(() => import("../features/categories/CategoryManagement"))
const ServiceAssignment = lazy(() => import("../features/services/ServiceAssignment"))
const InventoryManagement = lazy(() => import("../features/inventory/InventoryManagement"))
const InventoryDashboard = lazy(() => import("../features/inventory/InventoryDashboard"))
const MovementHistory = lazy(() => import("../features/inventory/MovementHistory"))

// Lazy loading de componentes MECHANIC
const MechanicDashboard = lazy(() => import("../features/mechanic/MechanicDashboard"))
const MyAssignments = lazy(() => import("../features/mechanic/MyAssignments"))
const MyTools = lazy(() => import("../features/mechanic/MyTools"))

// Lazy loading de componentes USER
const UserDashboard = lazy(() => import("../features/user/UserDashboard"))
const MyVehicles = lazy(() => import("../features/user/MyVehicles"))
const MyRequests = lazy(() => import("../features/user/MyRequests"))
const ServiceHistory = lazy(() => import("../features/user/ServiceHistory"))
const Payments = lazy(() => import("../features/user/Payments"))
const Support = lazy(() => import("../features/user/Support"))

const AppRouter = () => {
  const { user, token } = useContext(AuthContext)
  const isAuthenticated = user && token
  const role = user?.role?.nombre || localStorage.getItem("role") || null
  

  // Función para retornar las rutas según el rol
  const getRoutesByRole = (role) => {
    switch (role) {
      case "ADMIN":
        return (
          <Route
            path="/"
            element={
              <Suspense fallback={<SpinnerLazy />}>
                <AdminLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <AdminDashboard />
                </Suspense>
              }
            />
            <Route
              path="users"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <UserManagement />
                </Suspense>
              }
            />
            <Route
              path="vehicles"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <VehicleManagement />
                </Suspense>
              }
            />
            <Route
              path="services"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <ServiceManagement />
                </Suspense>
              }
            />
            <Route
              path="assignments"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <ServiceAssignment />
                </Suspense>
              }
            />
            <Route
              path="inventory"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <InventoryManagement />
                </Suspense>
              }
            />
            <Route
              path="inventory-dashboard"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <InventoryDashboard />
                </Suspense>
              }
            />
            <Route
              path="movements"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <MovementHistory />
                </Suspense>
              }
            />
            <Route
              path="categories"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <CategoryManagement />
                </Suspense>
              }
            />
            <Route
              path="profile"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <NotFound404 />
                </Suspense>
              }
            />
          </Route>
        )

      case "MECHANIC":
        return (
          <Route
            path="/"
            element={
              <Suspense fallback={<SpinnerLazy />}>
                <MechanicLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <MechanicDashboard />
                </Suspense>
              }
            />
            <Route
              path="my-assignments"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <MyAssignments />
                </Suspense>
              }
            />
            <Route
              path="vehicles"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <VehicleManagement />
                </Suspense>
              }
            />
            <Route
              path="services"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <ServiceManagement />
                </Suspense>
              }
            />
            <Route
              path="inventory"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <InventoryManagement />
                </Suspense>
              }
              
            />
            <Route
              path="assignments"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <ServiceAssignment />
                </Suspense>
              }
            />
            <Route
              path="inventory-dashboard"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <InventoryDashboard />
                </Suspense>
              }
            />
            <Route
              path="movements"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <MovementHistory />
                </Suspense>
              }
            />
            <Route
              path="tools"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <MyTools />
                </Suspense>
              }
            />
            <Route
              path="profile"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <NotFound404 />
                </Suspense>
              }
            />
          </Route>
        )

      case "USER":
        return (
          <Route
            path="/"
            element={
              <Suspense fallback={<SpinnerLazy />}>
                <UserLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <UserDashboard />
                </Suspense>
              }
            />
            <Route
              path="my-vehicles"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <MyVehicles />
                </Suspense>
              }
            />
            <Route
              path="services"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <ServiceManagement />
                </Suspense>
              }
            />
            <Route
              path="my-requests"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <MyRequests />
                </Suspense>
              }
            />
            <Route
              path="history"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <ServiceHistory />
                </Suspense>
              }
            />
            <Route
              path="payments"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <Payments />
                </Suspense>
              }
            />
            <Route
              path="support"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <Support />
                </Suspense>
              }
            />
            <Route
              path="profile"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<SpinnerLazy />}>
                  <NotFound404 />
                </Suspense>
              }
            />
          </Route>
        )

      default:
        return (
          <Route
            path="/*"
            element={
              <Suspense fallback={<SpinnerLazy />}>
                <Login />
              </Suspense>
            }
          />
        )
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Rutas públicas */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<SpinnerLazy />}>{!isAuthenticated ? <Login /> : <Navigate to="/" replace />}</Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<SpinnerLazy />}>
              {!isAuthenticated ? <Register /> : <Navigate to="/" replace />}
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<SpinnerLazy />}>
              {!isAuthenticated ? <ForgotPassword /> : <Navigate to="/" replace />}
            </Suspense>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Suspense fallback={<SpinnerLazy />}>
              {!isAuthenticated ? <ResetPassword /> : <Navigate to="/" replace />}
            </Suspense>
          }
        />

        {/* Ruta de acceso no autorizado */}
        <Route
          path="/unauthorized"
          element={
            <Suspense fallback={<SpinnerLazy />}>
              <Unauthorized />
            </Suspense>
          }
        />

        {/* Rutas protegidas según rol */}
        {isAuthenticated ? getRoutesByRole(role) : <Route path="/*" element={<Navigate to="/login" replace />} />}

        {/* 404 para rutas no encontradas */}
        <Route
          path="*"
          element={
            <Suspense fallback={<SpinnerLazy />}>
              <NotFound404 />
            </Suspense>
          }
        />
      </>,
    ),
  )

  return <RouterProvider router={router} />
}

export default AppRouter
