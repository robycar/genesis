import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import BarChartIcon from "@material-ui/icons/BarChart";
import { NavLink } from "react-router-dom";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import DescriptionIcon from "@material-ui/icons/Description";
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
          <PlayCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Launching" />
      </ListItem>
    </NavLink>
    <NavLink exact to="/editing" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary="Editing" />
      </ListItem>
    </NavLink>
    <NavLink exact to="/amministrazione" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <LockIcon />
        </ListItemIcon>
        <ListItemText primary="Amministrazione" />
      </ListItem>
    </NavLink>
    <NavLink exact to="/report" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Report" />
      </ListItem>
    </NavLink>
    <NavLink exact to="/documentation" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Documentation" />
      </ListItem>
    </NavLink>
  </div>
);

export const secondaryListItems = (
  <div className="nav-link">
    <NavLink exact to="/supporto" activeClassName="nav-active">
      <ListItem button>
        <ListItemIcon>
          <HelpOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="Supporto" />
      </ListItem>
    </NavLink>
  </div>
);
