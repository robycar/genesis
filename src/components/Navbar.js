import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import logo from "../assets/genesisLogin.png";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { ButtonGroup } from "@material-ui/core";
import { useHistory } from "react-router-dom";
//import { GetRuolo } from "./Variabili";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: "#FFFFFF",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    //boxShadow: "none",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    color: "black",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  logo: {
    height: "54px",
  },
  icon: {
    color: "#47B881",
  },
  exit: {
    color: "#47B881",
    marginLeft: "50%",
  },
  contentToolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));


function Navbar() {
  const classes = useStyles();

  let history=useHistory()
  
  const logOut = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    localStorage.setItem("livello", "");
    localStorage.setItem("gruppo", "");
    localStorage.setItem("funzioni", "");
    history.push("/");
  };
  return (
    <>
      <CssBaseline />
      <Toolbar className={classes.toolbar} boxShadow={0}>
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton> */}
        {/* <Typography
          component="h1"
          variant="h6"
          color="#0a0a0aack"
          noWrap
          className={classes.title}
        >
          Dashboard
        </Typography> */}
        <img src={logo} alt="Logo" className={classes.logo} />
        <div className={classes.contentToolbar}>
          <ButtonGroup>
            <IconButton 
            // onClick={()=>ruolo(1)} 
            color="black">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon className={classes.icon} />
              </Badge>
            </IconButton>
            <IconButton onClick={logOut}>
              <ExitToAppIcon className={classes.exit} />
            </IconButton>
          </ButtonGroup>
        </div>
      </Toolbar>
    </>
  );
}

export default Navbar;
