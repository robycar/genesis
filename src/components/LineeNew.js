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

function Linee() {
  const columns = [
      { title: "Nome Linea", field: "name" },
      { title: "ID Linea", field: "idLinea" },
      { title: "Numero", field: "numero" },
      {
        title: "IP Linea",
        field: "ipLinea",
      },
      { title: "Description", field: "description" },

      { title: "Porta", field: "porta" },
    ],
    data = [
      {
        name: "Linea 1",
        idLinea: "xxx",
        numero: "351255",
        ipLinea: "ndgiufgidg",
        description: "xxxx",
        porta: "404",
      },
      {
        name: "Linea 1",
        idLinea: "xxx",
        numero: "351255",
        ipLinea: "ndgiufgidg",
        description: "xxxx",
        porta: "404",
      },

      {
        name: "Linea 1",
        idLinea: "xxx",
        numero: "351255",
        ipLinea: "ndgiufgidg",
        description: "xxxx",
        porta: "404",
      },
      {
        name: "Linea 1",
        idLinea: "xxx",
        numero: "351255",
        ipLinea: "ndgiufgidg",
        description: "xxxx",
        porta: "404",
      },
      {
        name: "Linea 1",
        idLinea: "xxx",
        numero: "351255",
        ipLinea: "ndgiufgidg",
        description: "xxxx",
        porta: "404",
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
export default Linee;
