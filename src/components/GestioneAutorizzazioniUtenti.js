import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/App.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import TransferList from '../components/TransferList';

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

function GestioneAutorizzazioniUtenti() {
  const classes = useStyles();
  const [ruolo, setRuolo] = React.useState('');

  const handleChange = (event) => {
    setRuolo(event.target.value);
  };
  
  return (
    <div style={{marginTop:"20px"}}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="select-ruolo-label">Utente</InputLabel>
        <Select
          labelId="select-ruolo-label"
          id="select-ruolo"
          value={ruolo}
          onChange={handleChange}
          label="Utenti"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Maria Sacchi"}>Maria Sacchi</MenuItem>
          <MenuItem value={"Antonio Verdi"}>Antonio Verdi</MenuItem>
          <MenuItem value={"Valentina Bianchi"}>Valentina Bianchi</MenuItem>
          <MenuItem value={"Mario Rossi"}>Mario Rossi</MenuItem>
          <MenuItem value={"Marco Rossi"}>Marco Rossi</MenuItem>
        </Select>
      </FormControl>

      <TransferList />

    </div>
  );
}
export default GestioneAutorizzazioniUtenti;
