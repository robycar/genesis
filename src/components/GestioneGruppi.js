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
import acccessControl from "../service/url.js";

const GestioneRuoli = () => {
  const [data, setData] = useState([]);

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

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

  useEffect(() => {
    getGruppi();
  }, []);

  const getGruppi = () => {
    // fetch("http://localhost:9081/api/group", {
    //   method: "GET",
    //   headers: {
    //     Authorization: bearer,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((result) => setData(result.gruppi))
    //   .catch((error) => console.log("error", error));
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http:/api/group", requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result.gruppi))
      .catch((error) => console.log("error", error));
  };

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
          // tableLayout: "",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          // filtering: true,
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              var myHeaders = new Headers();
              myHeaders.append("Authorization", bearer);
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                id: oldData.id,
                nome: newData.nome,
                descrizione: newData.descrizione,
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch("http://localhost:9081/api/group", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  getGruppi();
                  resolve();
                })

                .catch((error) => console.log("error", error));
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              var myHeaders = new Headers();
              myHeaders.append("Authorization", bearer);
              myHeaders.append("Content-Type", "application/json");
              // setTimeout(() => {
              //   setData(result.gruppi);
              //resolve();
              // }, 2000);

              var raw = JSON.stringify({
                id: oldData.id,
              });

              var requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch("http://localhost:9081/api/group", requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  getGruppi();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
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
          // {
          //   icon: () => <CreateIcon />,
          //   tooltip: "Modifica",
          //   onClick: (event, rowData) => alert("Ho cliccato " + rowData.id),
          //   position: "row",
          // },
          // {
          //   icon: () => <DeleteIcon />,
          //   tooltip: "Elimina",
          //   onClick: (event, rowData) => alert("Ho cliccato " + rowData.id),
          //   position: "row",
          // },
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
