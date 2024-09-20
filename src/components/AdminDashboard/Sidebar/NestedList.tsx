/**
 * Component based on NestedList from MUI
 */
import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { MenuLink, MenuLinkGroup } from "./Sidebar";
import { Link, useLocation } from "react-router-dom";

export default function NestedList({
  menuLinkGroup,
}: {
  menuLinkGroup: MenuLinkGroup;
}) {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {/* Nested List Items */}
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{menuLinkGroup.icon}</ListItemIcon>
        <ListItemText primary={menuLinkGroup.groupLabel} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menuLinkGroup.menuLinks.map((menuLink: MenuLink) => {
            return (
              <ListItemButton
                key={menuLink.path}
                component={Link}
                to={menuLink.path}
                selected={
                  pathname.replace("/admin", "") == "/" + menuLink.path ||
                  (pathname.replace("/admin", "") == "" && menuLink.path == "")
                }
                sx={{ pl: 4 }}
              >
                <ListItemIcon>{menuLink.icon}</ListItemIcon>
                <ListItemText primary={menuLink.name} />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
}
