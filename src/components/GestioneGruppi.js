import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { PersonalVideoSharp } from "@material-ui/icons";

const GestioneRuoli = () => {
  // const data = [
  //   {
  //     nome: "Gruppo1",
  //     descrizione: "Desrizione gruppo"
  //   },
  //   {
  //     nome: "Gruppo2",
  //     descrizione: "Desrizione gruppo2"
  //   },
  //   {
  //     nome: "Gruppo3",
  //     descrizione: "Desrizione gruppo3"
  //   },
  //   {
  //     nome: "Gruppo4",
  //     descrizione: "Desrizione gruppo4"
  //   },
  //   {
  //     nome: "Gruppo5",
  //     descrizione: "Desrizione gruppo5"
  //   },
  // ];

  const columns = [
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", "test");
    urlencoded.append("password", "test");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch("http://localhost:9081/api/auth/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        Test(result.access_token);
        console.log(result);
      })
      .catch((error) => console.log("error", error));

    // USER

    function Test(token) {
      fetch("http://localhost:9081/api/group", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((result) => setData(result.gruppi))
        .catch((error) => console.log("error", error));
    }
  }, []);

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
        title="Gestione Gruppi"
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
            icon: () => (
              <a href="../amministrazione/viewgruppo">
                <VisibilityIcon />
              </a>
            ),
            tooltip: "Visualizza",
            position: "row",
          },
          {
            icon: () => <CreateIcon />,
            tooltip: "Modifica",
            onClick: (event, rowData) => alert("Ho cliccato " + rowData.id),
            position: "row",
          },
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
                  to="/amministrazione/creagruppo"
                >
                  CREA GRUPPO
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
