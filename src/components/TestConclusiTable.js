import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import { Fade, Paper, Typography } from "@material-ui/core";
import SelectBar from "./SelectBar";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import "../styles/App.css";

const TestConclusiTable = () => {
  const data = [
    {
      launcher: "Adam Denisov",
      nameTs: "PEM_001",
      startDate: "28/09/2020 13:10",
      endDate: "28/09/2020 13:10",
      result: "2/10",
      trace: "*****",
      callId: "",
    },
    {
      launcher: "Keith M. Boyce",
      nameTs: "PEM_002",
      startDate: "28/09/2020 13:10",
      endDate: "28/09/2020 13:10",
      result: "3/10",
      trace: "*****",
      callId: "",
    },
    {
      launcher: "Stella D. Knight",
      nameTs: "PEM_003",
      startDate: "28/09/2020 13:10",
      endDate: "28/09/2020 13:10",
      result: "4/10",
      trace: "*****",
      callId: "",
    },
    {
      launcher: "Walter E. Harmon",
      nameTs: "PEM_004",
      startDate: "28/09/2020 13:10",
      endDate: "28/09/2020 13:10",
      result: "5/10",
      trace: "*****",
      callId: "",
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
      title: "Call ID",
      field: "callId",
    },
  ];
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

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
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5%",
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
  }));

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Test Case Conclusi"
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
              <ButtonClickedBlue nome="Load Test Case"></ButtonClickedBlue>
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
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paper}>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h5">
                  Load Test Case
                </Typography>
              </ListItem>
            </div>

            <div className={classes.paperBottom}>
              <Typography variant="h6">Seleziona Test Case</Typography>
              <div className={classes.divSelectBar}>
                <div className={classes.divTextarea}>
                  <Typography className={classes.contenuto} variant="h11">
                    Nome del Test
                  </Typography>
                </div>
                <SelectBar nome="Seleziona" classeName={classes.selectBar} />
              </div>

              <div className={classes.divTextarea}>
                <Typography className={classes.contenuto} variant="h11">
                  Descrizione
                </Typography>
              </div>
              <SelectBar nome="Seleziona" classeName={classes.selectBar} />

              <div className={classes.bottoni}>
                <Button variant="contained" color="secondary">
                  Schedula Test
                </Button>

                <Button variant="contained" color="primary">
                  Carica Test
                </Button>
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default TestConclusiTable;
