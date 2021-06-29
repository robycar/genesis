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
    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/dashboard/testcase"
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/launching"
    >
      <ListItemIcon>
        <PlayCircleOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Launching" />
    </ListItem>
    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/editing"
    >
      <ListItemIcon>
        <EditIcon />
      </ListItemIcon>
      <ListItemText primary="Editing" />
    </ListItem>
    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/amministrazione"
    >
      <ListItemIcon>
        <LockIcon />
      </ListItemIcon>
      <ListItemText primary="Amministrazione" />
    </ListItem>
    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/report"
    >
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Report" />
    </ListItem>
    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/documentation"
    >
      <ListItemIcon>
        <DescriptionIcon />
      </ListItemIcon>
      <ListItemText primary="Documentation" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div className="nav-link">
    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/supporto"
    >
      <ListItemIcon>
        <HelpOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="Supporto" />
    </ListItem>
    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/provaModale"
    >
      <ListItemIcon>
        <HelpOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="provaModale" />
    </ListItem>

    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/creaLinea"
    >
      <ListItemIcon>
        <HelpOutlineIcon />
      </ListItemIcon>
      <ListItemText primary="creaLinea" />
    </ListItem>
  </div>
);
