import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import "../styles/App.css";
import { Fade, Paper, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import Select from "@material-ui/core/Select";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { MenuItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import acccessControl from "../service/url.js";
import { tableIcons } from "../components/Icons";
import SelectAutocompleteTestGeneratore from "../components/SelectAutocompleteTestGeneratore";

const TestGeneratoreCaricatiTable = () => {
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [filter, setFilter] = useState(false);
  const [idToRun, setIdToRun] = useState();
  const [dataRun, setIdTestGenRun] = useState(null);
  const [name, setName] = useState("");
  const [rate, setRate] = useState();
  const [testDuration, setTestDuration] = useState();
  const [callDuration, setCallDuration] = useState();
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
      field: "createdBy",
    },
    {
      title: "Data Inizio",
      field: "creationDate",
    },
    {
      title: "Data Fine",
      field: "modifiedDate",
    },
    {
      title: "Status",
      field: "trace",
    },
    {
      title: "Trace",
      field: "trace",
    },
    {
      title: "Call-Id",
      field: "trace",
    },
    {
      title: "Report",
      field: "trace",
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
    },
    paperTop: {
      height: "20%",
      display: "flex",
      alignItems: "center",
    },
    paperModale: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "3%",
      height: "fit-content",
      width: 500,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    paperBottom: {
      padding: "2%",
      backgrounColor: "#FFFFFF",
      flexDirection: "column",
      marginTop: "1%",
    },
    divSelectBar: {
      marginTop: "5%",
      marginBottom: "5%",
    },
    typography: {
      marginTop: "3%",
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
    },
    select: {
      width: "400px",
    },
    divContent: {
      padding: "2%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: "2%",
    },
    divSubContent1: {
      padding: "2%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    divSubContent2: {
      padding: "2%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: "2%",
      marginTop: "1%",
    },
    divIntestazione: {
      marginBottom: "2%",
    },
    calendarPaper: {
      padding: "3%",
      width: "190px",
      height: "130px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "3%",
    },
    orarioPaper: {
      padding: "3%",
      width: "190px",
      height: "130px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "3%",
    },
    delayPaper: {
      padding: "3%",
      width: "190px",
      height: "fit-content",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    divInput: {
      display: "flex",
      flexDirection: "column",
      width: "80%",
      alignItems: "center",
      marginTop: "5%",
      marginBottom: "5%",
    },
  }));

  const handleChange = () => {
    setFilter(!filter);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openRun, setOpenRun] = React.useState(false);
  const [openSchedula, setOpenSchedula] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    getAllTestGeneratoreModal();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSchedula = () => {
    setOpenSchedula(true);
    setOpen(false);
  };

  const handleCloseRun = () => {
    setOpenRun(false);
  };

  const handleCloseSchedula = () => {
    setOpenSchedula(false);
  };

  const handleOpenRun = (idRun_) => {
    setIdToRun(idRun_);
    setOpen(true);
    setOpen(false);
  };

  const testGenLoader = () => {
    handleClose();
    getAllTestGeneratore();
  };

  const runGenLoader = () => {
    runTestGen(idToRun);
    handleCloseRun();
  };

  /*------------- GET TEST GEN DASH-------------*/

  let bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const getAllTestGeneratore = () => {
    var consta = "READY";

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      includeTestCaseOfType: null,
      includeTestSuiteOfType: null,
      includeTestGeneratoreOfType: consta,
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
        setData(result.testCaseist);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestGeneratore();
  }, []);

  /*--------------- GET TEST GENERATORE -------------------*/

  const [appearTest, setAppearTest] = useState([]);

  const getAllTestGeneratoreModal = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testgen`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearTest(result.list);
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  /*--------------- RUN TEST CASE -------------------*/

  const runTestGen = (idRun) => {
    var urlLoad = `/api/testgen/runloaded/${idRun}`;

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
        setIdTestGenRun(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const handleLoadData = (rowDataaa) => {
    runGenLoader(rowDataaa.id);
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title=" Total Test Generatore Caricati"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          filtering: true,
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
            icon: tableIcons.PlayCircleOutlineIcon,
            tooltip: "Launch",
            onClick: (event, rowData) => handleOpenRun(rowData.launcher),
            position: "row",
          },
          {
            icon:"",
            tooltip: "Trace",
            // onClick: (event, rowData) => console.log("Trace"),
            //position: "row",
          },
          {
            icon: tableIcons.Delete,
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
              <ButtonClickedBlue nome="Carica Test Generatore"></ButtonClickedBlue>
            ),
            tooltip: "Load Test Generatore",
            onClick: () => handleOpen(),
            isFreeAction: true,
          },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
          body: {
            emptyDataSourceMessage: "Non è presente alcun dato da mostrare",
          },
        }}
      />

      {/* ------------------ MODALE LOAD TEST GENERATORE --------------------- */}
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
                    Load Test Generatore
                  </Typography>
                </ListItem>
              </div>
              <Divider className={classes.divider} />

              <Typography variant="h6" className={classes.typography}>
                Seleziona Test Generatore
              </Typography>

              <div className={classes.divSelectBar}>
                <Form.Group>
                  <Form.Label>Nome del Test Generatore</Form.Label>
                  <FormControl variant="outlined">
                    <SelectAutocompleteTestGeneratore
                      className={classes.SelectAutocompleteTestGeneratore}
                      value={appearTest.nome}
                      items={appearTest?.map((i) => ({
                        id: i.id,
                        nome: i.nome,
                      }))}
                      onChange={(id) => setId(id)}
                    />
                    <br />
                    {name && (
                      <>
                        <Form.Label>Rate </Form.Label>
                        <FormControl variant="outlined">
                          <Select
                            className={classes.select}
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                          >
                            {[5, 10, 15, 20, 25].map((rate) => {
                              return (
                                <MenuItem
                                  style={{ width: "423px" }}
                                  key={rate}
                                  value={rate}
                                >
                                  {rate} secondi
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <br />
                        <Form.Label>Durata Test (s)</Form.Label>
                        <FormControl variant="outlined">
                          <Select
                            className={classes.select}
                            value={testDuration}
                            onChange={(e) => setTestDuration(e.target.value)}
                          >
                            {[
                              { label: "5 minuti", value: 5 },
                              { label: "10 minuti", value: 10 },
                              { label: "20 minuti", value: 20 },
                              { label: "30 minuti", value: 30 },
                              { label: "60 minuti", value: 60 },
                              { label: "120 minuti", value: 120 },
                              { label: "360 minuti", value: 360 },
                              { label: "720 minuti", value: 720 },
                              { label: "24 ore", value: 1440 },
                              { label: "48 ore", value: 2880 },
                            ].map((testDuration) => {
                              return (
                                <MenuItem
                                  style={{ width: "423px" }}
                                  key={testDuration.label}
                                  value={testDuration.value}
                                >
                                  {testDuration.label}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                        <br />
                        <Form.Label>Durata Chiamata </Form.Label>
                        <Form.Control
                          max={rate * 60 * testDuration}
                          type="number"
                          value={callDuration}
                          placeholder="60"
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            const maxValue = rate * 60 * testDuration;
                            setCallDuration(Math.min(newValue, maxValue));
                          }}
                        />
                      </>
                    )}
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
                  onClick={testGenLoader}
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

      {/* ------------------ MODALE SCHEDULA TEST GENERATORE --------------------- */}
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
              <ListItem button style={{ marginLeft: "12%" }}>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h4">
                  Schedula Test Generatore
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
                <Button variant="contained" color="primary">
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

      {/* ------------------ MODALE AVVIA TEST GEN --------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openRun}
        onClose={handleCloseRun}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRun}>
          <Paper className={classes.paperModale} elevation={1}>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h4">
                  Lancio Test Case
                </Typography>
              </ListItem>

              <Divider className={classes.divider} />
              <Typography className={classes.info}>
                <p>Vuoi lanciare il test case da te selezionato ?</p>
              </Typography>
              <Divider />

              <div className={classes.bottone}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLoadData}
                >
                  Lancio
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseRun}
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

export default TestGeneratoreCaricatiTable;
