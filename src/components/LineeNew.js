import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import "../styles/App.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";

import acccessControl from "../service/url.js";

function Linee() {
  const [data, setData] = useState([]);
  const [appearLine, setAppearLine] = useState([]);

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

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

  // -------get linea-----------

  const getLinea = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/linea`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getLinea();
    getAppearLine();
  }, []);

  const columns = [
    { title: "Id", field: "id", editable: "never" },
    {
      title: "Numero",
      field: "numero",
      validate: (rowData) =>
        rowData.numero === "" ? "Il campo Numero non può essere vuoto" : "",
    },
    {
      title: "IP Linea",
      field: "ip",
      validate: (rowData) =>
        rowData.ip === "" ? "Il campo Ip non può essere vuoto" : "",
    },
    {
      title: "Porta",
      field: "porta",

      validate: (rowData) =>
        rowData.porta.length > 5 || rowData.porta.length < 4
          ? {
              helperText: "il campo Porta deve essere compreso tra 4 e 5 digit",
            }
          : true,
    },
    {
      title: "Password",
      field: "password",
      validate: (rowData) =>
        rowData.password === "" ? "Il campo Password non può essere vuoto" : "",
    },
    {
      title: "Tipo Linea",
      field: "typeLinea.id",
      lookup: appearLine.map((list) => {
        return list.descrizione;
      }),
      validate: (rowData) =>
        rowData.typeLinea === ""
          ? "Il campo Tipo Linea non può essere vuoto"
          : "",
    },
    {
      title: "Created By",
      field: "createdBy",
      validate: (rowData) =>
        rowData.createdBy === ""
          ? "Il campo Created By non può essere vuoto"
          : "",
    },
    {
      title: "Modified By",
      field: "modifiedBy",
      validate: (rowData) =>
        rowData.modifiedBy === ""
          ? "Il campo Modified By non può essere vuoto"
          : "",
    },
  ];

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Lines"
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
                numero: newData.numero,
                ip: newData.ip,
                porta: newData.porta,
                password: newData.password,
                typeLinea: {
                  id: newData.typeLinea.id,
                },
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(`/api/linea`, requestOptions)
                .then((response) => response.json())
                .then((response) => {
                  console.log(response);
                  getLinea();
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

              fetch(`/api/linea`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  getLinea();
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
                to="/editing/linee/crealinea"
                startIcon={<AddIcon />}
              >
                CREA LINEA{" "}
              </Button>
            ),
            tooltip: "Crea Linea",
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
export default Linee;
