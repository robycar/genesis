import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import { NavLink } from "react-router-dom";
import "../styles/App.css";

export const mainListItems = (
  <div className="nav-link">
    <NavLink exact to="/" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </NavLink>
    <NavLink exact to="/launching" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Launching" />
      </ListItem>
    </NavLink>
    <NavLink exact to="/editing" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Editing" />
      </ListItem>
    </NavLink>
    <NavLink exact to="/amministrazione" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Amministrazione" />
      </ListItem>
    </NavLink>
    <NavLink exact to="/report" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </ListItem>
    </NavLink>
  </div>
);

export const secondaryListItems = (
  <div className="nav-link">
    <NavLink exact to="/supporto" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Supporto" />
      </ListItem>
    </NavLink>
  </div>
);
