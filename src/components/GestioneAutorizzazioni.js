import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonClickedBlue from "./ButtonClickedBlue";
import "../styles/App.css";
import TransferListRuolo from "./TransferListRuolo";

const useStyles = makeStyles((theme) => ({
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
  contAutorizzazioni: {
    border: "1px #ced4da solid",
    borderRadius: 3,
    minHeight: "500px",
  },
  ulGestAuto: {
    listStyleType: "none",
    paddingLeft: "0px",
  },
  liRemove: {
    paddingLeft: "45px",
    marginLeft: "-1px",
    "&:hover": {
      color: "red",
    },
  },
  liAdd: {
    paddingLeft: "45px",
    marginLeft: "-1px",
    "&:hover": {
      color: "#47B881",
    },
  },
  activeRed: {
    color: "red!important",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
    },
  },
  activeGreen: {
    color: "#47B881!important",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "none",
    },
  },
  parola: {
    color: "black!important",
    "&:hover": {
      fontWeight: "bold",
      textDecoration: "none",
    },
    "&:active": {
      color: "#47B881!important",
      fontWeight: "bold",
    },
  },
  buttonRed: {
    backgroundColor: "#ff0419 !important",
    border: "1px solid #ff0419 !important",
    color: "white!important",
    width: "100px",
    height: "40px",
    marginRight: "10px !important",
    "&:hover": {
      backgroundColor: "white !important",
      color: "#eb3342 !important",
    },
  },
  buttonGreen: {
    backgroundColor: "#47B881 !important",
    border: "1px solid #47B881 !important",
    color: "white!important",
    width: "100px",
    height: "40px",
    marginRight: "10px !important",
    "&:hover": {
      backgroundColor: "white !important",
      color: "#47B881 !important",
    },
  },

  buttonClickedGreen: {
    backgroundColor: "#47B881",
    border: "1px solid #47B881",
    color: "white",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
    "&:hover": {
      backgroundColor: "#47B881",
      border: "1px solid #47B881",
      color: "white",
    },
  },

  buttonNotClickedGreen: {
    backgroundColor: "white",
    border: "1px solid #47B881",
    color: "#47B881",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
    "&:hover": {
      backgroundColor: "#47B881",
      border: "1px solid #47B881",
      color: "white",
    },
  },
  buttonContainer: {
    marginTop: "3%",
    marginBottom: "10px",
    marginLeft: "4%",
  },
}));

function FormCreaRuolo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [appState, changeState] = useState({
    activeObject: null,
    objects: [
      { id: 1, name: "Gestione Ruoli" },
      // { id: 2, name: "Gestione Utenti" },
    ],
  });
  function toggleActive(index) {
    changeState({ ...appState, activeObject: appState.objects[index] });

    console.log(appState.objects[index].name);
  }

  function toggleActiveStyles(index) {
    if (appState.objects[index] === appState.activeObject) {
      return classes.buttonClickedGreen;
    } else {
      return classes.buttonNotClickedGreen;
    }
  }
  window.onload = function () {
    document.getElementById("1Gestione Ruoli").click();
  };
  //  ||appState.activeObject === null
  const [show, setShow] = useState(true);

  function showActive() {
    setShow(!show);
  }
  return (
    <>
      <TransferListRuolo />
    </>
  );
}
export default FormCreaRuolo;
