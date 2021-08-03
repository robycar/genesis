import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/App.css";

import TransferListUtente from './TransferListUtente';



function GestioneAutorizzazioniUtenti() {
  
  return (
    <div style={{marginTop:"20px"}}>

      <TransferListUtente />

    </div>
  );
}
export default GestioneAutorizzazioniUtenti;
