import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import acccessControl from "../service/url.js";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

const GestioneUtenti = () => {
  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }
  
  const [data, setData] = useState([]);
  const [appearGroup, setAppearGroup] = useState([]);
  const [appearLevel, setAppearLevel] = useState([]);

  //-----------GET USER----------------------
  const getUsers = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    // console.log(bearer.toString());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/user`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.users);
      })
      .catch((error) => console.log("error", error));
  };

  /*------- Get grooup-------*/

  const getGroup = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    // console.log(bearer.toString());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/group`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearGroup(result.gruppi);
      })
      .catch((error) => console.log("error", error));
  };

  /*------- Get level-------*/

  const getAppearLevel = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    // console.log(bearer.toString());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/level`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearLevel(result.livelli);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getGroup();
    getAppearLevel();
    getUsers();
  }, []);


  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Username",
      field: "username",
    },
    {
      title: "Cognome",
      field: "cognome",
    },
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Azienda",
      field: "azienda",
    },
    {
      title: "Level",
      field: "level.id",
      lookup: appearLevel.map((data) => {
        //console.log(data.nome);
        return data.nome;
      }),
    },
    {
      title: "Gruppo",
      field: "gruppo.id",
      lookup: appearGroup.map((data) => {
        //console.log(data.nome);
        return data.nome;
      }),
    },
  ];
  // const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;



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
        title="Gestione Utenti"
        data={data}
        columns={columns}
        options={{
          // tableLayout: "fixed",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          pageSizeOptions: [5, 10, 20, { value: data.length, label: "All" }],
        }}
        actions={[
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
                  CREA UTENTE
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
        editable={{
          onRowUpdate: (newData, oldData) =>
          
            new Promise((resolve, reject) => {
              console.log(newData.gruppo.id)
          console.log(newData.gruppo)
              var myHeaders = new Headers();
              myHeaders.append("Authorization", bearer);
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Access-Control-Allow-Origin", acccessControl);
              myHeaders.append("Access-Control-Allow-Credentials", "true");

              var raw = JSON.stringify({
                user: {
                  username: newData.username,
                  cognome: newData.cognome,
                  nome: newData.nome,
                  gruppo: {
                    id: newData.gruppo.id,
                  },
                  level: {
                    id: newData.level.id,
                  },
                },
                password: "test2",
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(`/api/user` + "?id=" + oldData.id, requestOptions)
                .then((response) => response.json())
                .then((response) => {
                  console.log(response);
                  getUsers();
                  resolve();
                });
              // .catch((error) => console.log("error", error));
            }),

          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              //Backend call
              var myHeaders = new Headers();
              myHeaders.append("Authorization", bearer);
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Access-Control-Allow-Origin", acccessControl);
              myHeaders.append("Access-Control-Allow-Credentials", "true");

              var raw = JSON.stringify({
                id: oldData.id,
              });

              var requestOptions = {
                method: "DELETE",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(`/api/user` + "?id=" + oldData.id, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  getUsers();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
        }}
      />
    </div>
  );
};

export default GestioneUtenti;
