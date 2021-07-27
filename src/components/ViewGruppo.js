import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { PersonalVideoSharp } from "@material-ui/icons";

const ViewGruppo = () => {
  const data = [
    {
      nome: "Marco Rossi",
      level: "Admin",
    },
    {
      nome: "Mario Rossi",
      level: "L1",
    },
    {
      nome: "Valentina Bianchi",
      level: "L2",
    },
    {
      nome: "Antonio Verdi",
      level: "L2",
    },
    {
      nome: "Maria Sacchi",
      level: "Admin",
    },
  ];

  const columns = [
    {
      title: "Nome Utente",
      field: "nome",
    },
    {
      title: "Level",
      field: "level",
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
        title="Partecipanti"
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
            icon: () => <DeleteIcon />,
            tooltip: "Elimina",
            onClick: (event, rowData) => alert("Ho cliccato " + rowData.id),
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
                  to="/amministrazione/addpartecipante"
                >
                  ADD PARTECIPANTE
                </Button>
              </div>
            ),
            tooltip: "",
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

export default ViewGruppo;