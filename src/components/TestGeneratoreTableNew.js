import React from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ModalDescriptionTestSuite from "./ModalDescriptionTestSuite";

function TestGeneratoreTable() {
  const columns = [
      { title: "Nome Test", field: "name", defaultSort:"desc"},
      { title: "Template", field: "template" },
      { title: "Modifcato da", field: "modifiedBy" },
      {
        title: "Creato da",
        field: "createdBy",
      },
      { title: "Descrizione", field: "description" },

      { title: "Azienda", field: "azienda" },
    ],
    data = [
      {
        name: "Test generatore 1",
        template: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        description: "xxxx",
        azienda: "kfguiggf",
      },
      {
        name: "Test generatore 2",
        template: "xxx",
        modifiedBy: "utente2",
        createdBy: "utente3",
        description: "xxxx",
        azienda: "kfguiggf",
      },

      {
        name: "Test generatore 3",
        template: "xxx",
        modifiedBy: "utente4",
        createdBy: "utente5",
        description: "xxxx",
        azienda: "kfguiggf",
      },

      {
        name: "Test generatore 4",
        template: "xxx",
        modifiedBy: "utente6",
        createdBy: "utente7",
        description: "xxxx",
        azienda: "kfguiggf",
      },
      {
        name: "Test generatore 5",
        template: "xxx",
        modifiedBy: "utente8",
        createdBy: "utente9",
        description: "xxxx",
        azienda: "kfguiggf",
      },
    ];

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Test Generatore"
        data={data}
        columns={columns}
        options={{
          tableLayout: "fixed",
          actionsColumnIndex: -1,
          search: true,
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
                className="button-green"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="/editing/testsuite/createstsuite"
                startIcon={<AddIcon />}
              >
                TEST GENERATORE{" "}
              </Button>
            ),
            tooltip: "Load Test Suite",
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
          {
            icon: () => <ModalDescriptionTestSuite />,
            tooltip: "Image",
            // onClick: (event, rowData) =>
            // alert("Ho cliccato " + rowData.launcher),
            // position: "row",
          },
        ]}
        localization={{
          header: {
            actions: "Azioni",
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
export default TestGeneratoreTable;