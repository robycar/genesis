import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonClickedBlue from "./ButtonClickedBlue";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../styles/App.css";
import { TransferWithinAStation } from "@material-ui/icons";
import GestioneAutorizzazioniRuoli from "./GestioneAutorizzazioniRuoli"
import GestioneAutorizzazioniUtenti from "./GestioneAutorizzazioniUtenti"

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
    border:"1px #ced4da solid",
    borderRadius:3,
    minHeight:"500px",
  },
  ulGestAuto: {
    listStyleType: "none",
    paddingLeft:"0px",
  },
  liRemove:{
    paddingLeft:"45px",
    marginLeft:"-1px",
    "&:hover": {
      color:"red",
    }
  },
  liAdd:{
    paddingLeft:"45px",
    marginLeft:"-1px",
    "&:hover": {
      color:"#47B881",
    }
  },
  activeRed: {
    color:"red!important",
    fontWeight:"bold",
    "&:hover": {
      textDecoration: "none",
    }
  },
  activeGreen: {
    color:"#47B881!important",
    fontWeight:"bold",
    "&:hover": {
      textDecoration: "none",
    }
  },
  parola: {
    color:"black!important",
    "&:hover": {
      fontWeight:"bold",
      textDecoration: "none",
    },
    "&:active":{
      color:"#47B881!important",
      fontWeight:"bold"
    }
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
    }
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
    }
  },
  
  buttonClickedBlue: {
    backgroundColor: "#1665D8",
    color: "primary",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },

  buttonNotClickedBlue: {
    backgroundColor: "whute",
    border: "1px solid #1665D8",
    variant: "contained",
    color: "#1665D8",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },
  box: {
    width: "200px",
    height: "200px",
    margin: "10px",
    border: "1px solid black",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
    marginBottom: "10px",
  },
  
  
  
}));

function FormCreaRuolo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  const [appState, changeState] = useState({
    activeObject: null,
    objects: [
      { id: 1, name: "Gestione Ruoli" },
      { id: 2, name: "Gestione Utenti" },
    ],
  });
  function toggleActive(index) {
    changeState({ ...appState, activeObject: appState.objects[index] });

    console.log(appState.objects[index].name);
  }

  function toggleActiveStyles(index) {
    if (appState.objects[index] === appState.activeObject) {
      return "box nav-table-active";
    } else {
      return "box nav-table-inactive";
    }
  }
  //  ||appState.activeObject === null
  const [show, setShow] = useState(true);

  function showActive() {
    setShow(!show);
  }
  return (
    <>
      <div className={classes.buttonContainer}>
        {/* <ButtonList /> */}
        {appState.objects.map((elements, index) => (
          <ButtonClickedBlue
            key={index}
            nome={elements.name}
            className={toggleActiveStyles(index)}
            onClick={() => {
              toggleActive(index);
              // showActive();
            }}
          />
        ))}
      </div>
      {appState.activeObject === null && <GestioneAutorizzazioniUtenti />}
      {appState.objects[0] === appState.activeObject && (
        <GestioneAutorizzazioniRuoli />
      )}
      {appState.objects[1] === appState.activeObject && (
        <GestioneAutorizzazioniUtenti />
      )}
    </>
  );
}
export default FormCreaRuolo;
