import React, { useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Checkbox, Select, MenuItem } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import "../styles/App.css";

const TestCaricatiTable = () => {
  const [filter, setFilter] = useState(false);
  const data = [
    {
      launcher: "Adam Denisov",
      nameTs: "PEM_001",
      startDate: "28/09/2020 13:10",
      endDate: "",
      result: "2/10",
      trace: "*****",
      mos: "",
    },
    {
      launcher: "Keith M. Boyce",
      nameTs: "PEM_002",
      startDate: "28/09/2020 13:10",
      endDate: "",
      result: "3/10",
      trace: "*****",
      mos: "",
    },
    {
      launcher: "Stella D. Knight",
      nameTs: "PEM_003",
      startDate: "28/09/2020 13:10",
      endDate: "",
      result: "4/10",
      trace: "*****",
      mos: "",
    },
    {
      launcher: "Walter E. Harmon",
      nameTs: "PEM_004",
      startDate: "28/09/2020 13:10",
      endDate: "",
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
      title: "End Date",
      field: "endDate",
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
  const handleChange = () => {
    setFilter(!filter);
  };
  return (
    <div>
      {/* <Checkbox
        checked={filter}
        onChange={handleChange}
        inputProps={{ "aria-label": "primary checkbox" }}
      /> */}

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
          filtering: filter,
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
            icon: "delete",
            tooltip: "Delete all selected row",
            onClick: () => alert("Ho cancellato le righe"),
          },
          {
            icon: () => <FilterListIcon />,
            tooltip: "Hide/Show Filter option",
            isFreeAction: true,
            onClick: () => handleChange(),
          },
          {
            icon: () => (
              <ButtonClickedBlue nome="Load Test Case"></ButtonClickedBlue>
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

export default TestCaricatiTable;
