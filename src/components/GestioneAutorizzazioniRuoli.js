import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/App.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
  formControl: {
    paddingBottom:"20px",
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function GestioneAutorizzazioniRuoli() {
  const classes = useStyles();
  const [ruolo, setRuolo] = React.useState('');

  const handleChange = (event) => {
    setRuolo(event.target.value);
  };
  
  return (
    <div style={{marginTop:"20px"}}>

      <TransferListRuolo />

    </div>
  );
}
export default GestioneAutorizzazioniRuoli;
