import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import ButtonClickeGreen from "./ButtonClickedGreen";
import "../styles/App.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import acccessControl from "../service/url.js";

function Obp() {
  const [data, setData] = useState([]);
  const [appearLine, setAppearLine] = useState([]);

  /*----Get Type Linea ------*/

  const getAppearLine = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/typeLinea`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearLine(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const columns = [
    { title: "ID OBP", field: "id", editable: "never" },
    {
      title: "Proxy IP Address",
      field: "ipDestinazione",
      validate: (rowData) =>
        rowData.ipDestinazione === ""
          ? "Il campo IP Address non può essere vuoto"
          : "",
    },
    {
      title: "Tipo Linea",
      field: "typeLinee.id",
      lookup: appearLine.map((list) => {
        //console.log(data.typeLinee.id);
        return list.descrizione;
      }),
      validate: (rowData) =>
        rowData.typeLinea === ""
          ? "Il campo Tipo Linea non può essere vuoto"
          : "",
    },
    {
      title: "Porta",
      field: "porta",
      validate: (rowData) =>
        (rowData.porta.length > 3 && rowData.porta.length < 6) ||
        rowData.porta.length === 0
          ? true
          : {
              helperText: "il campo Porta deve essere compreso tra 4 e 5 digit",
            },
    },
    {
      title: "Descrizione",
      field: "descrizione",
      validate: (rowData) =>
        rowData.descrizione === ""
          ? "Il campo descrizione non può essere vuoto"
          : "",
    },
  ];

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  useEffect(() => {
    getObp();
    getAppearLine();
  }, []);

  const getObp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/obp`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Outbound Proxy"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          exportButton: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          filtering: true,
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              //Backend call
              var myHeaders = new Headers();
              myHeaders.append("Authorization", bearer);
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Access-Control-Allow-Origin", acccessControl);
              myHeaders.append("Access-Control-Allow-Credentials", "true");

              var raw = JSON.stringify({
                id: oldData.id,
                ipDestinazione: newData.ipDestinazione,
                descrizione: newData.descrizione,
                porta: newData.porta.length === 0 ? 5060 : newData.porta,

                typeLinea: {
                  id: newData.typeLinee.id,
                },
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(`/api/obp`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  getObp();
                  resolve();
                })
                .catch((error) => console.log("error", error));
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

              fetch(`/api/obp`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  getObp();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
        }}
        actions={[
          {
            icon: () => (
              <Button
                className="button-green"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="/editing/outboundproxy/creaobp"
                startIcon={<AddIcon />}
              >
                Outbound Proxy{" "}
              </Button>
            ),
            tooltip: "Crea Obp",
            // onClick: (event, rowData) => alert("Load Test Suite"),
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
}
export default Obp;
