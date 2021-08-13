import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import ButtonClickeGreen from "./ButtonClickedGreen";
import "../styles/App.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
import ModaleCreaTemplate from "./ModaleCreaTemplate";
import acccessControl from "../service/url.js";

function Template() {
  const [data, setData] = useState([]);

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  //----- get template -------

  const getTemplate = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/template`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const columns = [
    { title: "ID Template", field: "id", editable: "never" },
    {
      title: "Nome",
      field: "nome",
      validate: (rowData) =>
        rowData.nome === ""
          ? { isValid: false, helperText: "IL campo Nome non può essere vuoto" }
          : true,
    },
    {
      title: "Data modifica",
      field: "modifiedDate",
      validate: (rowData) =>
        rowData.modifiedDate === ""
          ? {
              isValid: false,
              helperText: "IL campo Data di modifica non può essere vuoto",
            }
          : true,
    },
    {
      title: "Data creazione",
      field: "creationDate",
      validate: (rowData) =>
        rowData.creationDate === ""
          ? {
              isValid: false,
              helperText: "IL campo Data di creazione non può essere vuoto",
            }
          : true,
    },
    {
      title: "Modificato da",
      field: "modifiedBy",
      validate: (rowData) =>
        rowData.modifiedBy === ""
          ? {
              isValid: false,
              helperText: "IL campo Modificato da non può essere vuoto",
            }
          : true,
    },
    {
      title: "Creato da",
      field: "createdBy",
      validate: (rowData) =>
        rowData.createdBy === ""
          ? {
              isValid: false,
              helperText: "IL campo Creato da non può essere vuoto",
            }
          : true,
    },
    {
      title: "Versione",
      field: "version",
      validate: (rowData) =>
        rowData.version === ""
          ? {
              isValid: false,
              helperText: "IL campo Versione non può essere vuoto",
            }
          : true,
    },
    {
      title: "Tipo",
      field: "typeTemplate",
      validate: (rowData) =>
        rowData.typeTemplate === ""
          ? { isValid: false, helperText: "IL campo Tipo non può essere vuoto" }
          : true,
    },
    {
      title: "Descrizione",
      field: "descrizione",
      validate: (rowData) =>
        rowData.descrizione === ""
          ? {
              isValid: false,
              helperText: "IL campo Descrizione non può essere vuoto",
            }
          : true,
    },
    {
      title: "Durata",
      field: "durata",
      validate: (rowData) =>
        rowData.durata === ""
          ? {
              isValid: false,
              helperText: "IL campo Durata non può essere vuoto",
            }
          : true,
    },
  ];

  useEffect(() => {
    getTemplate();
  }, []);

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Template"
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
          headerStyle: {
            backgroundColor: "#f50057",
          },
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
                version: newData.version,
                nome: newData.nome,
                durata: newData.durata,
                createdBy: newData.createdBy,
                modifiedBy: newData.modifiedBy,
                modifiedDate: newData.modifiedDate,
                creationDate: newData.creationDate,
                typeTemplate: newData.typeTemplate,
                descrizione: newData.descrizione,
                // folder: newData.folder,
                // fileLinks: {},
              });

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
              };

              fetch(`/api/template`, requestOptions)
                .then((response) => response.json())
                .then((response) => {
                  console.log(response);
                  getTemplate();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              //backend call
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

              fetch(`/api/template`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  getTemplate();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
        }}
        actions={[
          // {
          //   icon: () => (
          //     <Button
          //       color="secondary"
          //       size="medium"
          //       variant="contained"
          //       className="button-red"
          //       component={NavLink}
          //       activeClassName="button-red-active"
          //       exact
          //       to="/editing/template/carica"
          //     >
          //       CARICA{" "}
          //     </Button>
          //   ),
          //   tooltip: "Carica Template",
          //   // onClick: (event, rowData) => alert("Load Test Suite"),
          //   isFreeAction: true,
          // },
          {
            icon: () => (
              <Button
                color="secondary"
                size="medium"
                variant="contained"
                className="button-red"
                component={NavLink}
                activeClassName="button-red-active"
                exact
                to="/editing/template/createmplate"
              >
                CREA{" "}
              </Button>
            ),
            tooltip: "Crea Template",
            // onClick: (event, rowData) => alert("Load Test Suite"),
            isFreeAction: true,
          },
        ]}
        localization={{
          header: {
            actions: "Actions",
          },
        }}
        // options={{
        //   headerStyle: {
        //     backgroundColor: "#f50057",
        //   },
        // }}
      />
    </div>
  );
}
export default Template;
