import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import { Fade, Paper, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import "../styles/App.css";
import acccessControl from "../service/url.js";
import { Divider } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import { tableIcons } from "../components/Icons";


const TestSuiteRunningTable = () => {
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [testSuiteLoad, setTestSuiteLoad] = useState(null);
  const [dataInizio, setDataInizio] = useState();
  const [orarioInizio, setOrarioInizio] = useState();
  const [delay, setDelay] = useState();

  const columns = [
    {
      title: "Id",
      field: "id",
      defaultSort: "desc",
    },
    {
      title: "Nome Test",
      field: "nome",
    },
    {
      title: "Loader",
      field: "loadedBy",
    },
    {
      title: "Data Inizio Test",
      field: "startDate",
    },
    // {
    //   title: "Linea Chiamato",
    //   field: "testSuiteList.testSuite.testCases",
    // },
    // {
    //   title: "Linea Chiamante",
    //   field: "testSuiteList.testSuite.testCases",
    // },
    {
      title: "Status",
      field: "stato",
    },
  ];

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
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
    },
    paperBottom: {
      padding: "2%",
      backgrounColor: "#FFFFFF",
      flexDirection: "column",
      marginTop: "5%",
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
    divSelectBar: {
      marginTop: "5%",
      marginBottom: "5%",
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
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    divIntestazione: {
      marginBottom: "2%",
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
    typography: {
      marginTop: "3%",
    },
    bottone: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "6%",
      justifyContent: "center",
    },
    select: {
      width: "400px",
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSchedula = () => {
    setOpenSchedula(true);
    setOpen(false);
  };

  const handleCloseSchedula = () => {
    setOpenSchedula(false);
  };

  const testSuiteLoader = () => {
    loadTestSuite(id);
    handleClose();
    getAllTestSuite();
  };

  // ------- GET TEST SUITE -----------
  let bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const [appearTest, setAppearTest] = useState([]);
  const [openSchedula, setOpenSchedula] = React.useState(false);

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
        setAppearTest(result.list);
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  /*--------------- FUNZIONE CARICA TEST SUITE -------------------*/

  const loadTestSuite = (id) => {
    var urlLoad = `/api/testsuite/load/${id}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(urlLoad, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestSuiteLoad(result.testSuiteCaricata);
      })
      .catch((error) => console.log("error", error));
  };



  /*------------ TEST SUITE RUNNING ---------------------*/

  const getAllTestSuiteRunning = () => {
    var consta = "RUNNING";

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      includeRiepilogoTestCase: false,
      includeRiepilogoTestSuite: false,
      includeTestCaseOfType: null,
      includeTestSuiteOfType: consta,
      includeTestGeneratoreOfType: null,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/dashboard/info`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.testSuiteList);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestSuiteRunning();
  }, []);

  return (
    <div>
      <MaterialTable
      icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Total Test Suite Running"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          filtering: true,
          pageSizeOptions: [5, 10, 20, { value: data?.length, label: "All" }],

        }}
        actions={[
          // {
          //   icon: () => <PieChartOutlinedIcon />,
          //   tooltip: "Mostra Repoet",
          //   onClick: (event, rowData) =>
          //     alert("Ho cliccato " + rowData.launcher),
          //   position: "row",
          //   disabled: true,
          // },
          // {
          //   icon: () => <PlayCircleOutlineIcon />,
          //   tooltip: "Lancia il Test",
          //   onClick: (event, rowData) =>
          //     alert("Ho cliccato " + rowData.launcher),
          //   position: "row",
          // },
          // {
          //   icon: () => <DeleteIcon />,
          //   tooltip: "Elimina il Test",
          //   onClick: (event, rowData) => alert("Api delete da aggiungere"),
          //   position: "row",
          // },
          // {
          //   icon: () => (
          //     <ButtonClickedBlue nome="Carica Test Suite"></ButtonClickedBlue>
          //   ),
          //   tooltip: "Carica Test Suite",
          //   onClick: () => handleOpen(),
          //   isFreeAction: true,
          // },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
        }}
      />
      {/* ------------------ MODALE LOAD TEST CASE --------------------- */}
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
              <div className={classes.divIntestazione}>
                <ListItem button>
                  <ListItemIcon>
                    <BackupIcon className={classes.icon} />
                  </ListItemIcon>
                  <Typography className={classes.intestazione} variant="h4">
                    Load Test Suite
                  </Typography>
                </ListItem>
              </div>
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
                      onChange={(e) => setId(e.target.value)}
                    >
                      {appearTest.map((prova) => {
                        return (
                          <MenuItem
                            style={{ width: "423px" }}
                            key={prova.id}
                            value={prova.id}
                          >
                            {prova.nome}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Form.Group>
              </div>
              <Divider className={classes.divider} />

              <div className={classes.bottone}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  nome="Schedula Test"
                  onClick={handleOpenSchedula}
                >
                  Schedula Test
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  nome="Carica Test"
                  id={id}
                  onClick={testSuiteLoader}
                >
                  {" "}
                  Carica Test{" "}
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  style={{ backgroundColor: "#ffeb3b", color: "white" }}
                  nome="Annulla"
                  onClick={handleClose}
                >
                  {" "}
                  Annulla{" "}
                </Button>
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>

      {/* ------------------ MODALE SCHEDULA TEST SUITE --------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openSchedula}
        onClose={handleCloseSchedula}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSchedula}>
          <Paper className={classes.paperModale} elevation={1}>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h4">
                  Schedula Test Suite
                </Typography>
              </ListItem>
              <Divider className={classes.divider} />

              <div className={classes.divSubContent1}>
                <Paper elevation={2} className={classes.calendarPaper}>
                  <Typography variant="h5">Calendario</Typography>
                  <Divider />
                  <div className={classes.divInput}>
                    <label for="start">Data Inizio:</label>
                    <input
                      type="date"
                      id="start"
                      name="trip-start"
                      onChange={(e) => setDataInizio(e.target.value)}
                      min=""
                      max=""
                    />
                  </div>
                </Paper>

                <Paper elevation={2} className={classes.orarioPaper}>
                  <Typography variant="h5">Orario</Typography>
                  <div className={classes.divInput}>
                    <label for="appt">Orario Inizio:</label>
                    <input
                      style={{ width: "135px" }}
                      type="time"
                      id="appt"
                      name="appt"
                      min=""
                      max=""
                      onChange={(e) => setOrarioInizio(e.target.value)}
                      required
                    />
                  </div>
                </Paper>
              </div>

              <div className={classes.divSubContent2}>
                <Paper elevation={2} className={classes.delayPaper}>
                  <Typography variant="h5">Delay</Typography>
                  <div className={classes.divInput}>
                    <label for="appt">Delay:</label>
                    <input
                      style={{ width: "100px" }}
                      type="number"
                      id=""
                      name=""
                      min=""
                      defaultValue="60"
                      max=""
                      onChange={(e) => setDelay(e.target.value)}
                      required
                    />
                  </div>
                </Paper>
              </div>
              <Divider />

              <div className={classes.bottone}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert("Funzione schedula moccata")}
                >
                  Conferma
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseSchedula}
                >
                  Annulla
                </Button>
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default TestSuiteRunningTable;
