import React from "react";
// import {default as SidebarWithOutlet } from '../components/AdminDashboard/SidebarWithOutlet.jsx'
import { Outlet } from "react-router-dom";
import { default as Sidebar } from "../components/AdminDashboard/Sidebar";
import { MenuLink } from "../components/AdminDashboard/Sidebar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

export const AdminDashboardLayout = () => {
  const menuLink: MenuLink[] = [
    { path: "", name: "Dashboard", icon: <InboxIcon /> },
    { path: "products", name: "Products", icon: <InboxIcon />},
    { path: "orders", name: "Orders", icon: <InboxIcon />},
    { path: "settings", name: "Settings", icon: <InboxIcon/> },
  ];

  return (
    // <div><SidebarWithOutlet Outlet={<Outlet />}/></div>
    <div>
      <Sidebar menuLinks={menuLink} />
    </div>
  );
};
