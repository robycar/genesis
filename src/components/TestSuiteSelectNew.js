import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";

function TestSuiteSelect() {
  const columns = [
      { title: "Nome Test Case", field: "name" },
      { title: "ID Template", field: "template" },
      { title: "Modified By", field: "modifiedBy" },
      {
        title: "Created By",
        field: "createdBy",
      },
      { title: "N° Linea Chiamante", field: "lineaChiamante" },

      { title: "N° Linea Chiamato", field: "lineaChiamato" },
      { title: "N° Linea Chiamante 2", field: "lineaChiamante2" },
      { title: "N° Linea Chiamante 3", field: "lineaChiamante3" },
      { title: "Tipo Linea Chiamante", field: "tipoLineaChiamante" },
      { title: "Tipo Linea Chiamato", field: "tipoLineaChiamato" },
      { title: "Tipo Linea Chiamante2", field: "tipoLineaChiamante2" },
      { title: "Tipo Linea Chiamante3", field: "tipoLineaChiamante3" },
      { title: "Opb Chiamante", field: "opbChiamante" },
      { title: "Opb Chiamato", field: "opbChiamato" },
      { title: "Opb Chiamante 3", field: "opbChiamante2" },
      { title: "Opb Chiamante 3", field: "opbChiamante3" },
    ],
    data = [
      {
        name: "Test suite 1",
        idTemplate: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        lineaChiamante: "xxxx",
        lineaChiamato: "kfguiggf",
        lineaChiamate2: "",
        lineaChiamate3: "",
        tipoLineaChiamante: "",
        tipoLineaChiamato: "",
        tipoLIneaChiamante2: "",
        tipoLineaChiamante3: "",
        opbChiamante: "",
        opbChiamato: "",
        opbChiamante2: "",
        opbChiamante3: "",
      },
      {
        name: "Test suite 1",
        idTemplate: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        lineaChiamante: "xxxx",
        lineaChiamato: "kfguiggf",
        lineaChiamate2: "",
        lineaChiamate3: "",
        tipoLineaChiamante: "",
        tipoLineaChiamato: "",
        tipoLIneaChiamante2: "",
        tipoLineaChiamante3: "",
        opbChiamante: "",
        opbChiamato: "",
        opbChiamante2: "",
        opbChiamante3: "",
      },

      {
        name: "Test suite 1",
        idTemplate: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        lineaChiamante: "xxxx",
        lineaChiamato: "kfguiggf",
        lineaChiamate2: "",
        lineaChiamate3: "",
        tipoLineaChiamante: "",
        tipoLineaChiamato: "",
        tipoLIneaChiamante2: "",
        tipoLineaChiamante3: "",
        opbChiamante: "",
        opbChiamato: "",
        opbChiamante2: "",
        opbChiamante3: "",
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
        name: "Test suite 1",
        idTemplate: "xxx",
        modifiedBy: "utente1",
        createdBy: "utente1",
        lineaChiamante: "xxxx",
        lineaChiamato: "kfguiggf",
        lineaChiamate2: "",
        lineaChiamate3: "",
        tipoLineaChiamante: "",
        tipoLineaChiamato: "",
        tipoLIneaChiamante2: "",
        tipoLineaChiamante3: "",
        opbChiamante: "",
        opbChiamato: "",
        opbChiamante2: "",
        opbChiamante3: "",
      },
    ];

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Test Case"
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
        options={{
          selection: true,
          headerStyle: {
            backgroundColor: "#1976d2",
          },
        }}
        // actions={[
        //   {
        // icon: () => (
        //   <Button
        //     className="button-green"
        //     component={NavLink}
        //     activeClassName="button-green-active"
        //     exact
        //     to="/editing/testsuite/createstsuite"
        //     startIcon={<AddIcon />}
        //   >
        //     TEST SUITE{" "}
        //   </Button>
        // ),
        // tooltip: "Load Test Suite",
        // // onClick: (event, rowData) => alert("Load Test Suite"),
        // isFreeAction: true,
        //   },
        //   {
        //     icon: () => <EditIcon />,
        //     tooltip: "Edit",
        //     onClick: (event, rowData) =>
        //       alert("Ho cliccato " + rowData.launcher),
        //     position: "row",
        //   },
        //   {
        //     icon: () => <DeleteIcon />,
        //     tooltip: "Delete",
        //     onClick: (event, rowData) =>
        //       alert("Ho cliccato " + rowData.launcher),
        //     position: "row",
        //   },
        //   {
        //     icon: () => <ModalDescriptionTestSuite />,
        //     tooltip: "Image",
        //     // onClick: (event, rowData) =>
        //     // alert("Ho cliccato " + rowData.launcher),
        //     // position: "row",
        //   },
        // ]}
        // localization={{
        //   header: {
        //     actions: "Actions",
        //   },
        // }}

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
export default TestSuiteSelect;
