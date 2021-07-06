import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import "../styles/App.css";

const TestSuiteSchedulatiTable = () => {
  const data = [
    {
      launcher: "Adam Denisov",
      nameTs: "PEM_001",
      startDate: "28/09/2020 13:10",
      expectedEndDate: "28/09/2020 13:10",
      result: "2/10",
      trace: "*****",
      mos: "",
    },
    {
      launcher: "Keith M. Boyce",
      nameTs: "PEM_002",
      startDate: "28/09/2020 13:10",
      expectedEndDate: "28/09/2020 13:10",
      result: "3/10",
      trace: "*****",
      mos: "",
    },
    {
      launcher: "Stella D. Knight",
      nameTs: "PEM_003",
      startDate: "28/09/2020 13:10",
      expectedEndDate: "28/09/2020 13:10",
      result: "4/10",
      trace: "*****",
      mos: "",
    },
    {
      launcher: "Walter E. Harmon",
      nameTs: "PEM_004",
      startDate: "28/09/2020 13:10",
      expectedEndDate: "28/09/2020 13:10",
      result: "5/10",
      trace: "*****",
      mos: "",
    },
  ];

  const columns = [
    {
      title: "Launcher",
      field: "launcher",
    },
    {
      title: "Name TS",
      field: "nameTs",
    },
    {
      title: "Start Date",
      field: "startDate",
    },
    {
      title: "Expected End Date",
      field: "expectedEndDate",
    },
    {
      title: "Result",
      field: "result",
    },
    {
      title: "Trace",
      field: "trace",
    },
    {
      title: "MOS",
      field: "mos",
    },
  ];
  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title=" Total Test Case Schedulati"
        data={data}
        columns={columns}
        options={{
          tableLayout: "fixed",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          selection: true,
          // columnsButton: true,
          // filtering: true,
        }}
        actions={[
          {
            icon: () => <PieChartOutlinedIcon />,
            tooltip: "Report",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.launcher),
            position: "row",
          },
          {
            icon: "play_circle_outlined",
            tooltip: "Launch",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.launcher),
            position: "row",
          },
          {
            icon: () => (
              <ButtonClickedBlue nome="Load Test Suite"></ButtonClickedBlue>
            ),
            tooltip: "Load Test Suite",
            onClick: (event, rowData) => alert("Load Test Suite"),
            isFreeAction: true,
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
};

export default TestSuiteSchedulatiTable;
