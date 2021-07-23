import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";

const GestioneUtenti = () => {
  const [data, setData] = useState([]);

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
      field: "level.nome",
    },
    {
      title: "Gruppo",
      field: "gruppo.nome",
    },
  ];
  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  const getUsers = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);

    // console.log(bearer.toString());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("http://localhost:9081/api/user", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.users);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    // var urlencoded = new URLSearchParams();
    // urlencoded.append("username", "test");
    // urlencoded.append("password", "test");
    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: urlencoded,
    //   redirect: "follow",
    // };
    // fetch("http://localhost:9081/api/auth/login", requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     Test(result.access_token);
    //     console.log(result);
    //   })
    //   .catch((error) => console.log("error", error));
    // // USER
    // function Test(token) {
    //   var myHeaders = new Headers();
    //   myHeaders.append("Authorization", `Bearer ${token}`);
    //   var requestOptions = {
    //     method: "GET",
    //     headers: myHeaders,
    //     redirect: "follow",
    //   };
    //   console.log(token);
    //   fetch("http://localhost:9081/api/user", {
    //     method: "GET",
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //       console.log(result);
    //       setData(result.users);
    //     })
    //     .catch((error) => console.log("error", error));
    // }

    getUsers();
  }, []);

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
          // selection: true,
          // columnsButton: true,
          // filtering: true,
        }}
        actions={[
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
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              var myHeaders = new Headers();
              myHeaders.append("Authorization", bearer);
              myHeaders.append("Content-Type", "application/json");

              var raw = JSON.stringify({
                user: {
                  id: newData.id,
                  username: newData.username,
                  cognome: newData.cognome,
                  nome: newData.nome,
                  gruppo: {
                    id: 2,
                  },
                  level: {
                    id: 2,
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

              fetch(
                "http://localhost:9081/api/user" + "?id=" + oldData.id,
                requestOptions
              )
                .then((response) => response.json())
                .then((response) => {
                  getUsers();
                  resolve();
                });
              // .catch((error) => console.log("error", error));
            }),
        }}
      />
    </div>
  );
};

export default GestioneUtenti;
