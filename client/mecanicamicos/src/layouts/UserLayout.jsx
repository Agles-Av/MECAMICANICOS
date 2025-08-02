"use client"

import { Outlet } from "react-router-dom"
import UserSidebar from "../components/sidebars/UserSidebar"
import UserHeader from "../components/headers/UserHeader"

const UserLayout = () => {
  return (
    <div className="flex h-screen bg-gray-900">
      <UserSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <UserHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-800 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default UserLayout
