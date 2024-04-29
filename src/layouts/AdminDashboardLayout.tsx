import { Outlet } from "react-router-dom";
import { MenuLink, default as Sidebar } from "../components/AdminDashboard/Sidebar/Sidebar";
import { MenuLinkGroup } from "../components/AdminDashboard/Sidebar/Sidebar";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Home, Inventory, LocalShipping, Settings } from "@mui/icons-material";

export const AdminDashboardLayout = () => {
  const DashboardLinks : MenuLink[] = [{ path: "", name: "Show Dashboard",}]
  const ProductLinks : MenuLink[] = [ { path: "products", name: "List Products"},{ path: "products/create", name: "Create Products"}]
  const OrderLinks : MenuLink[] = [ { path: "orders", name: "List Orders"}]
  const SettingsLinks : MenuLink[] = [{ path: "settings", name: "Open Settings"}]

  const menuLinkGroups: MenuLinkGroup[] = [
    {
      menuLinks : DashboardLinks,
      groupLabel:'Dashboard',
      icon:<Home />
    },
    {
      menuLinks : ProductLinks,
      groupLabel:'Products',
      icon:<Inventory />
    },
    {
      menuLinks : OrderLinks,
      groupLabel:'Orders',
      icon:<LocalShipping />
    },
    {
      menuLinks : SettingsLinks,
      groupLabel:'Settings',
      icon:<Settings />
    },
  ];

  return (
    <div>
      <Sidebar menuLinkGroups={menuLinkGroups} Outlet={Outlet} />
    </div>
  );
};
