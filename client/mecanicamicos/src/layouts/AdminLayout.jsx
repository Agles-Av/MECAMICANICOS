"use client"

import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/sidebars/AdminSidebar"
import AdminHeader from "../components/headers/AdminHeader"

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
