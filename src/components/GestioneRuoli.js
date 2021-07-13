import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';

const GestioneRuoli = () => {
  const data = [
    {
      level: "Admin",
      descrizione: "Operazioni di lettura, scrittura, edit e operazioni amministrative"
    },
    {
      level: "L1",
      descrizione: "Operazioni di lettura, scrittura e edit ma non operazioni amministrative"
    },
    {
      level: "L2",
      descrizione: "Operazioni di sola lettura"
    },
  ];

  const columns = [
    {
      title: "Level",
      field: "level",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },    
  ];

  

 

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5%",
    },
    paperTop: {
      height: "20%",
      display: "flex",
      alignItems: "center",
      //opacity: "25%",
    },
    paperBottom: {
      padding: "2%",
      backgrounColor: "#FFFFFF",
      //justifyContent: "center",
      flexDirection: "column",
      marginTop: "5%",
    },
    divSelectBar: {
      marginTop: "25px",
    },
    selectBar: {
      width: "50%",
      height: "100",
      marginTop: "50px",
    },
    divTextarea: {
      marginTop: "20px",
    },
    intestazione: {
      color: "#47B881",
      marginTop: "5%",
      flexDirection: "row",
    },
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
      marginTop: "9px",
    },
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
    },
  }));

  const classes = useStyles();
  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Gestione Ruoli"
        data={data}
        columns={columns}
        options={{
          tableLayout: "fixed",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          // filtering: true,
        }}
        actions={[
          {
            icon: () => <CreateIcon />,
            tooltip: "Modifica",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.id),
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.id),
            position: "row",
          },
          {
            icon: () => (
              <div className={classes.buttonRight}>
                <Button
                  className="button-green"
                  component={NavLink}
                  activeClassName="button-green-active"
                  exact
                  to="/amministrazione/addutente"
                >
                  ADD UTENTE
                </Button>
              </div>
            ),
            tooltip: "Load Test Suite",
            isFreeAction: true,
          },
        ]}
        localization={{
          header: {
            actions: "Actions",
          },
        }}
      />
    </div>
  );
};

export default GestioneRuoli;
