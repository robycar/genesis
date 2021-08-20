import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import ModaleEseguiTest from "../components/ModaleEseguiTest";
import ModaleSelezionaTest from "../components/ModaleSelezionaTest";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // toolbar: {
  //   paddingRight: 24, // keep right padding when drawer closed
  //   background: "red",
  // },
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
    height: 400,
  },

  containerNavbarItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  bottonTest: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "100px",
  },
}));

function ProvaModale() {
  const classes = useStyles();

  return (
    // <div className={classes.root}>
    //   <ModaleEseguiTest
    //     titolo1="Esegui Test Case"
    //     titolo2="Vuoi lanciare di nuovo il test?"
    //   />
    // </div>

    <div className={classes.root}>
      <ModaleSelezionaTest
        titolo1="Load Test Case"
        titolo2="Seleziona Test Case"
        label1="Nome del Test"
        label2="Descrizione"
      />
    </div>
  );
}

export default ProvaModale;
