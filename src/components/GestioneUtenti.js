import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';

const GestioneUtenti = () => {
  const data = [
    {
      id: "DEV6301",
      nome: "Mario",
      cognome: "Rossi",
      telefono: 3354745787,
      email: "email@esempio.it",
      password: "*****",
      level: "Admin",
      gruppo: "Gruppo1",
      azienda: "Tim",
    },
    {
      id: "DEV6601",
      nome: "Mario",
      cognome: "Rossi",
      telefono: 3354745787,
      email: "email@esempio.it",
      password: "*****",
      level: "Admin",
      gruppo: "Gruppo1",
      azienda: "Tim",
    },
    {
      id: "DEV6391",
      nome: "Mario",
      cognome: "Rossi",
      telefono: 3354745787,
      email: "email@esempio.it",
      password: "*****",
      level: "Admin",
      gruppo: "Gruppo1",
      azienda: "Tim",
    },
    {
      id: "DEV5301",
      nome: "Mario",
      cognome: "Rossi",
      telefono: 3354745787,
      email: "email@esempio.it",
      password: "*****",
      level: "Admin",
      gruppo: "Gruppo1",
      azienda: "Tim",
    },
    {
      id: "DEV7301",
      nome: "Mario",
      cognome: "Rossi",
      telefono: 3354745787,
      email: "email@esempio.it",
      password: "*****",
      level: "Admin",
      gruppo: "Gruppo1",
      azienda: "Tim",
    },
    {
      id: "DEV8301",
      nome: "Mario",
      cognome: "Rossi",
      telefono: 3354745787,
      email: "email@esempio.it",
      password: "*****",
      level: "Admin",
      gruppo: "Gruppo1",
      azienda: "Tim",
    },
    {
      id: "DEV6401",
      nome: "Mario",
      cognome: "Rossi",
      telefono: 3354745787,
      email: "email@esempio.it",
      password: "*****",
      level: "Admin",
      gruppo: "Gruppo1",
      azienda: "Tim",
    },
  ];

  const columns = [
    {
      title: "ID Utenza",
      field: "id",
    },
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Cognome",
      field: "cognome",
    },
    {
      title: "Telefono",
      field: "telefono",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Password",
      field: "password",
    },
    {
      title: "Level",
      field: "level",
    },
    {
      title: "Gruppo",
      field: "gruppo",
    },
    {
      title: "Azienda",
      field: "azienda",
    },
  ];

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

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
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Utenti"
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
            onClick: () => handleOpen(),
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

export default GestioneUtenti;
