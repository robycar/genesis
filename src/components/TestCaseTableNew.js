import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import ButtonClickeGreen from "./ButtonClickedGreen";
import "../styles/App.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ModalDescriptionTestCase from "./ModalDescriptionTestCase";

function TestCaseTable() {
  const columns = [
      { title: "Nome Test", field: "name" },
      { title: "Template", field: "template" },
      { title: "Modified By", field: "modifiedBy" },
      {
        title: "Created By",
        field: "createdBy",
      },
      { title: "Description", field: "description" },

      { title: "Azienda", field: "azienda" },
    ],
    data = [
      {
        name: "Test suite 1",
        template: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        description: "xxxx",
        azienda: "kfguiggf",
      },
      {
        name: "Test suite 2",
        template: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        description: "xxxx",
        azienda: "kfguiggf",
      },

      {
        name: "Test suite 3",
        template: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        description: "xxxx",
        azienda: "kfguiggf",
      },

      {
        name: "Test suite 4",
        template: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        description: "xxxx",
        azienda: "kfguiggf",
      },
      {
        name: "Test suite 5",
        template: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        description: "xxxx",
        azienda: "kfguiggf",
      },
    ];

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Test Case"
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
                to="/editing/testcase/createstcase"
                startIcon={<AddIcon />}
              >
                TEST CASE{" "}
              </Button>
            ),
            tooltip: "Load Test Case",
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
            icon: () => <ModalDescriptionTestCase />,
            tooltip: "Image",
            // onClick: (event, rowData) =>
            // alert("Ho cliccato " + rowData.launcher),
            // position: "row",
          },
        ]}
        localization={{
          header: {
            actions: "Actions",
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
export default TestCaseTable;
