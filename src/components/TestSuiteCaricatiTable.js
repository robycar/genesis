import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import "../styles/App.css";
import { Fade, Paper, Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { MenuItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import acccessControl from "../service/url";

const TestSuiteCaricatiTable = () => {
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
      defaultSort: "desc",
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
    },
    paperTop: {
      height: "20%",
      display: "flex",
      alignItems: "center",
      //opacity: "25%",
    },
    paperModale: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "3%",
      height: "fit-content",
      width: 500,
      position: "relative",
    },
    paperBottom: {
      padding: "2%",
      backgrounColor: "#FFFFFF",
      //justifyContent: "center",
      flexDirection: "column",
      marginTop: "1%",
    },
    divSelectBar: {
      marginTop: "25px",
    },
    typography: {
      marginTop: "3%",
    },

    divTextarea: {
      marginTop: "20px",
    },
    intestazione: {
      color: "#47B881",
      marginTop: "5%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: "2%",
    },
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
    },

    bottone: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "6%",
      justifyContent: "center",

      // marginBottom: "2%",
    },
    select: {
      width: "400px",
    },
  }));

  /*----------- GET TEST SUITE ------------------*/

  let bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const [appearTest, setAppearTest] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [nome, setNome] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ------- GET TEST SUITE -----------

  const getAllTestSuite = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testsuite`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAppearTest(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestSuite();
  }, []);

  console.log("dati", appearTest);

  const handleChange = () => {
    setFilter(!filter);
  };
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title=" Total Test Suite Caricati"
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
              <ButtonClickedBlue nome="Load Test Suite"></ButtonClickedBlue>
            ),
            tooltip: "Load Test Suite",
            onClick: () => handleOpen(),
            isFreeAction: true,
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
          <Paper className={classes.paperModale} elevation={1}>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h4">
                  Load Test Suite
                </Typography>
              </ListItem>
              <Divider className={classes.divider} />

              <Typography variant="h6" className={classes.typography}>
                Seleziona Test Suite
              </Typography>

              <div className={classes.divSelectBar}>
                <Form.Group>
                  <Form.Label>Nome del Test Suite</Form.Label>
                  <FormControl variant="outlined">
                    <Select
                      className={classes.select}
                      value={appearTest.nome}
                      onChange={(e) => setNome(e.target.value)}
                    >
                      {appearTest.map((prova) => {
                        return (
                          <MenuItem style={{width: "423px"}} key={prova.id} value={prova.id}>
                            {prova.nome}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Form.Group>
              </div>

              <div className={classes.bottone}>
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

export default TestSuiteCaricatiTable;
