import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ButtonClicked from "../Components/ButtonClicked";
import Button from "@material-ui/core/Button";
import Navbar from "../Components/Navbar";
import NavbarItem from "../Components/NavbarItem";
import Card from "../Components/Card";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: "#FFFFFF",
    border: "1px solid #47B881",
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
    height: "50px",
  },

  dashboard: {
    fontFamily: "roboto",
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "35px",
    color: "#66788A",
    lineHeight: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },

  buttonNotClickedGreen: {
    backgroundColor: "white",
    border: "1px solid #47B881 ",
    variant: "contained",
    color: "#47B881",
    width: "200px",
    height: "40px",
    marginRight: "10px",
  },
  icon: {
    color: "#47B881",
  },
}));

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <NavbarItem />

        <div className={classes.buttonContainer}>
          <ButtonClicked />

          <Button
            className={classes.buttonNotClickedGreen}
            variant="contained"
            color="#47B881"
          >
            Test Suite
          </Button>
          <Card />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
