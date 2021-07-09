import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import ButtonClickeGreen from "./ButtonClickedGreen";
import "../styles/App.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ModaleCreaTemplate from "./ModaleCreaTemplate";

function Template() {
  const columns = [
      { title: "Nome", field: "name" },
      { title: "ID Template", field: "idTemplate" },
    ],
    data = [
      {
        name: "Template1",
        idTemplate: "554894",
      },
      {
        name: "Template2",
        idTemplate: "554894",
      },

      {
        name: "Template3",
        idTemplate: "554894",
      },
      {
        name: "Template4",
        idTemplate: "554894",
      },
      {
        name: "Template5",
        idTemplate: "554894",
      },
    ];

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Template"
        data={data}
        columns={columns}
        options={{
          tableLayout: "fixed",
          actionsColumnIndex: -1,

          // search: true,
          exportButton: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          // filtering: true,
        }}
        actions={[
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
                to="/editing/template/carica"
              >
                CARICA{" "}
              </Button>
            ),
            tooltip: "Carica Template",
            // onClick: (event, rowData) => alert("Load Test Suite"),
            isFreeAction: true,
          },
          {
            icon: () => <ModaleCreaTemplate />,
            tooltip: "Crea Template",
            // onClick: (event, rowData) => alert("Load Test Suite"),
            isFreeAction: true,
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Edit",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.launcher),
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Delete",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.launcher),
            position: "row",
          },
          //   {
          //     icon: () => <ModalDescriptionTestCase />,
          //     tooltip: "Image",
          //     // onClick: (event, rowData) =>
          //     // alert("Ho cliccato " + rowData.launcher),
          //     // position: "row",
          //   },
        ]}
        localization={{
          header: {
            actions: "Actions",
          },
        }}
        options={{
          headerStyle: {
            backgroundColor: "#f50057",
          },
        }}
        // components={{
        //   Toolbar: (props) => (
        //     <div>
        //       <MTableToolbar {...props} />
        //       <div className="button-load-test">
        //         <Button variant="contained" color="primary">
        //           LOAD TEST CASE
        //         </Button>
        //       </div>
        //     </div>
        //   ),
        // }}
      />
    </div>
  );
}
export default Template;
