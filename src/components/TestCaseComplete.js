import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import {Button} from "@material-ui/core";
import "../styles/App.css";

const TestCaseComplete = () => {
  const data = [
    {
      id: "2541",
      launcher: "Adam Denisov",
      nameTS: "PEM_001",
      startDate: "04/28/2018",
      endDate: "04/28/2018t",
      testCase: 10,
      okResult: 8,
      koresult: 1,
      partiallyResoult: 1,
    },
    {
      id: "2541",
      launcher: "Adam Denisov",
      nameTS: "PEM_001",
      startDate: "04/28/2018",
      endDate: "04/28/2018t",
      testCase: 10,
      okResult: 8,
      koresult: 1,
      partiallyResoult: 1,
    },
    {
      id: "2541",
      launcher: "Adam Denisov",
      nameTS: "PEM_001",
      startDate: "04/28/2018",
      endDate: "04/28/2018t",
      testCase: 10,
      okResult: 8,
      koresult: 1,
      partiallyResoult: 1,
    },
    {
      id: "2541",
      launcher: "Adam Denisov",
      nameTS: "PEM_001",
      startDate: "04/28/2018",
      endDate: "04/28/2018t",
      testCase: 10,
      okResult: 8,
      koresult: 1,
      partiallyResoult: 1,
    },
  ];

  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Launcher",
      field: "launcher",
    },
    {
      title: "Name TS",
      field: "nameTS",
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
      title: "Test Case",
      field: "testCase",
    },
    {
      title: "OK Result",
      field: "okResult",
    },
    {
      title: "KO Result",
      field: "koresult",
    },
    {
      title: "Partially Result",
      field: "partiallyResoult",
    },
  ];

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    paperTop: {
      height: "20%",
      display: "flex",
      alignItems: "center",
      //opacity: "25%",
    },
    paperBottom: {
      padding: "2%",
      backgrounColor: "#FFFFFF",
      //justifyContent: "center",
      flexDirection: "column",
      marginTop: "5%",
    },
    divSelectBar: {
      marginTop: "25px",
    },
    selectBar: {
      width: "50%",
      height: "100",
      marginTop: "50px",
    },
    divTextarea: {
      marginTop: "20px",
    },
    intestazione: {
      color: "#47B881",
      marginTop: "5%",
      flexDirection: "row",
    },
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
      marginTop: "9px",
    },
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
    },
    export:{
      backgroundColor:"#cce5ff",
      color:"#4352db",
      border:"1px solid #4352db",
      width:"125px"
    }
  }));

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Last 30 Test Case Completed"
        data={data}
        columns={columns}
        options={{
          tableLayout: "fixed",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          // filtering: true,
        }}
        actions={[
          {
            icon: () => (
              <div className={classes.buttonRight}>
                <Button
                  className={classes.export}
                >
                  EXPORT
                </Button>
              </div>
            ),
            tooltip: "Load Test Suite",
            onClick: () => handleOpen(),
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
};

export default TestCaseComplete;
