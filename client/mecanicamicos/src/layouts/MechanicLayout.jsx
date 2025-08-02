"use client"

import { Outlet } from "react-router-dom"
import MechanicSidebar from "../components/sidebars/MechanicSidebar"
import MechanicHeader from "../components/headers/MechanicHeader"

const MechanicLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <MechanicSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MechanicHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MechanicLayout
