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
    ];

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Test Case"
        data={data}
        columns={columns}
        height="fit-content"
        options={{
          //tableLayout: "fixed",
          actionsColumnIndex: -1,
          search: true,
          //exportButton: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          // filtering: true,
          selection: true,
          headerStyle: {
            backgroundColor: "#1976d2",
            height: "40px",
          },
          cellStyle: {
            height: "40px",
          },
        }}
      />
    </div>
  );
}
export default TestSuiteSelect;
