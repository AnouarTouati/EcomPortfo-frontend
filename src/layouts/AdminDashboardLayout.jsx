import React from 'react'
import {default as SidebarWithOutlet } from '../components/AdminDashboard/SidebarWithOutlet'
import { Outlet } from 'react-router-dom'
export const AdminDashboardLayout = () => {
  return (
    <div><SidebarWithOutlet Outlet={<Outlet />}/></div>
  )
}
