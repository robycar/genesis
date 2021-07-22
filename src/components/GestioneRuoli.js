import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import CreateIcon from '@material-ui/icons/Create';
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Delete from "@material-ui/icons/Delete";

const GestioneRuoli = () => {
  // const data = [
  //   {
  //     level: "Admin",
  //     descrizione: "Operazioni di lettura, scrittura, edit e operazioni amministrative"
  //   },
  //   {
  //     level: "L1",
  //     descrizione: "Operazioni di lettura, scrittura e edit ma non operazioni amministrative"
  //   },
  //   {
  //     level: "L2",
  //     descrizione: "Operazioni di sola lettura"
  //   },
  // ];

  const [data, setData] = useState([])

  const columns = [
    {
      title: "Level",
      field: "nome",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
  ];

  var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjY5NDQxOTQsImlhdCI6MTYyNjk0MDU5NCwidXNlcm5hbWUiOiJ0ZXN0In0.WOaN5pTzNyxi_j8X-0u4r_ERsIPTOA823HP7_Hx8FmIA_gIq8cyVbNAYtdls5bpug7HdTxONk4WPYU7YjdhhoQ";

  useEffect(() => {

    getLevel()

  }, [])

  const getLevel= () => {
    // GET LEVEL
    fetch("http://localhost:9081/api/level", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((result) => setData(result.livelli))
      .catch((error) => console.log("error", error));
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
  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Gestione Ruoli"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          // filtering: true,
        }}
        editable={{
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            //Backend call
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+ token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              "id": oldData.id,
              "nome": newData.nome,
              "descrizione": newData.descrizione,
              "funzioni": [
                "user.view",
                "level.edit",
                "user.list",
                "list.user",
                "list.level"
              ]
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch("http://localhost:9081/api/level", requestOptions)
              .then(response => response.json())
              .then(result => {getLevel() 
                resolve()})
              .catch(error => console.log('error', error));
          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {
            //Backend call
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              "id": oldData.id
            });

            var requestOptions = {
              method: 'DELETE',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch("http://localhost:9081/api/level", requestOptions)
              .then(response => response.json())
              .then(result => {getLevel() 
                resolve()})
              .catch(error => console.log('error', error));
                       
          })
          
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
                  to="/amministrazione/crearuolo"
                >
                  ADD RUOLO
                </Button>
              </div>
            ),
            tooltip: "Load Test Suite",
            isFreeAction: true,
          }
        ]}
      />
    </div>
  );
};

export default GestioneRuoli;
