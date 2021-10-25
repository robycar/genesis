import React from "react";
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
import LockOpenIcon from "@material-ui/icons/LockOpen";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ListItem, ListItemIcon, Typography } from "@material-ui/core";


export const mainListItems = (

  <div className="nav-link">
    <ListItem style={{paddingTop:"0",paddingBottom:"11px"}}>
      <ListItemIcon>
        <AccountCircleIcon style={{color:"#66788A"}} fontSize="large" />
      </ListItemIcon>
      <Typography style={{fontWeight: 500,fontStyle: "normal",fontSize: "24px",color: "#66788A",lineHeight: "20px",padding: "2%"}}> {localStorage.getItem("username")}</Typography>
    </ListItem>
    <hr style={{margin:"0",width:"239px",marginLeft:"-16px"}}/>
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
      to="/launching/testcase"
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
      to="/editing/linee"
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
      disabled={localStorage.getItem("livello") !== "ADMIN" && localStorage.getItem("livello") !== "test"}
      to="/amministrazione/utenze"
    >
      <ListItemIcon>
        <LockIcon />
      </ListItemIcon>
      <ListItemText primary="Amministrazione" />
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
  </div>
);

export const tertiaryListItems = (
  <div className="nav-link">
    <ListItem
      button
      component={NavLink}
      activeClassName="nav-active"
      exact
      to="/report/testcase"
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
      <ListItemText primary="Documentazione" />
    </ListItem>
  </div>
);

export const quaterListItems = (
  <div className="nav-link">
    <div className="versione">
      <hr />
      Versione {localStorage.getItem("versione")}
    </div>
  </div>
);
