import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import SettingsIcon from "@material-ui/icons/Settings";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import "../styles/App.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Fade, Paper, Typography } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { MenuItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import acccessControl from "../service/url.js";
import { tableIcons } from "../components/Icons";
import SelectAutocompleteTestSuite from "../components/SelectAutocompleteTestSuite";

const TestSuiteCaricatiTable = () => {
  const [filter, setFilter] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [dataSuite, setDataSuite] = useState();
  const [delay, setDelay] = useState();
  const [orarioInizio, setOrarioInizio] = useState();
  const [idToRun, setIdToRun] = useState();
  const [idTestSuiteRun, setIdTestSuiteRun] = useState(0);
  const [dataInizio, setDataInizio] = useState();

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
      title: "Data Inizio",
      field: "loadedWhen",
    },
    {
      title: "Status",
      field: "stato",
    },
    {
      title: "Call-Id",
      field: "loadedBy",
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
    },
    info: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "6%",
      justifyContent: "center",
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
      marginBottom: "3%",
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
    paperModaleDelete: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      height: "fit-content",
      width: 500,
      position: "relative",
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
    orarioPaper: {
      padding: "3%",
      width: "190px",
      height: "130px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "3%",
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
  }));

  /*----------- GET TEST SUITE ------------------*/

  const [appearTest, setAppearTest] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openSchedula, setOpenSchedula] = React.useState(false);
  const [openRun, setOpenRun] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  let scheduleDateTime = "";
  const [testSuiteLoad, setTestSuiteLoad] = useState({});
  const [idTest, setIdTest] = React.useState(0);
  const [dataSchedula, setDataSchedula] = useState();

  const handleOpen = () => {
    getAllTestSuiteModal();
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

  const handleChange = () => {
    setFilter(!filter);
  };

  const testSuiteLoader = () => {
    loadTestSuite(id);
    handleClose();
  };

  const handleOpenRun = (idRun) => {
    setIdToRun(idRun);
    setOpenRun(true);
    setOpen(false);
  };

  const handleCloseRun = () => {
    setOpenRun(false);
  };

  const runSuiteLoader = () => {
    runTestSuite(idToRun);
    handleCloseRun();
  };

  const handleLoadData = (rowDataaa) => {
    setIdToRun(rowDataaa.id);
    runSuiteLoader(rowDataaa.id);
  };

  /*------- OPEN WARNING DELETE ------------ */

  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  //------------ funzione apri modale

  const handleOpenDelete = (rowData) => {
    setId(rowData.id);
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  //---------- funzione elimina TestCase
  const handleDelete = () => {
    deleteTestSuiteCaricato(id);
  };

  /*------------- GET TEST SUITE DASHBOARD -------------*/

  let bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const getAllTestSuite = () => {
    var consta = "READY";

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
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
    getAllTestSuite();
  }, []);

  // ------- GET TEST SUITE -----------

  const getAllTestSuiteModal = () => {
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
        setDataSuite(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  /*------------------ SCHEDULA TEST ------------------*/

  const schedulaTestSuite = () => {
    const invia = () => {
      scheduleDateTime = dataInizio + "T" + orarioInizio;
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        id: id,
        scheduleDateTime: scheduleDateTime,
        delay: delay,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/testsuite/schedule`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setDataSchedula(result.testSuiteCaricata);
          handleCloseSchedula();
        })
        .catch((error) => console.log("error", error));
    };
    invia();
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
        setTestSuiteLoad(result.list);
        getAllTestSuite();
      })
      .catch((error) => console.log("error", error));
  };

  // /*--------------- FUNZIONE RUN TEST SUITE -------------------*/

  const runTestSuite = (idRun) => {
    var urlLoad = `/api/testsuite/loaded/run/${idRun}`;

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
        if (result.error !== null) {
          setOpenWarning(true);
          if (result.error.code === "TEST-0020") {
            setWarning("Il test selezionato è già stato lanciato!");
          } else {
            setWarning(
              "Codice errore:" +
                result.error.code +
                "Descrizione" +
                result.code.description
            );
          }
        } else {
          setOpenWarning(false);
          setIdTestSuiteRun(result.list);
        }
      })
      .catch((error) => console.log("error", error));
  };

  /*----------- DELETE TESTSUITE CARICATO ----------------*/

  const deleteTestSuiteCaricato = (id) => {
    var urlLoadDelete = `/api/testsuite/loaded/${id}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(urlLoadDelete, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setOpenDelete(false);
        getAllTestSuite();
      })
      .catch((error) => console.log("error", error));
  };

  const classes = useStyles();

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title=" Total Test Suite Caricati"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          selection: true,
          filtering: true,
        }}
        actions={[
          {
            icon: () => <PieChartOutlinedIcon />,
            tooltip: "Mostra Report",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.launcher),
            position: "row",
            disabled: true,
          },
          {
            icon: () => <PlayCircleOutlineIcon />,
            tooltip: "Lancia il test",
            onClick: (event, rowData) => handleOpenRun(rowData.id),

            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina il Test ",
            onClick: (event, rowData) => {
              handleOpenDelete(rowData);
              setIdTest(rowData.id);
            },
            position: "row",
          },
          {
            icon: () => <FilterListIcon />,
            tooltip: "Filtro",
            isFreeAction: true,
            onClick: () => handleChange(),
          },
          {
            icon: () => (
              <ButtonClickedBlue nome="Carica Test Suite"></ButtonClickedBlue>
            ),
            tooltip: "Carica Test Suite",
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
                  <SelectAutocompleteTestSuite
                    className={classes.SelectAutocompleteTestSuite}
                    value={appearTest.nome}
                    items={appearTest?.map((i) => ({
                      id: i.id,
                      nome: i.nome,
                    }))}
                    onChange={(id) => setId(id)}
                  />
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
                  onClick={schedulaTestSuite}
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

      {/* ------------------ MODALE AVVIA TEST CASE --------------------- */}
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
                  Lancio Test Suite
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

      {/*------------------MODALE ERRORE--------------- */}
      <Modal
        className={classes.modal}
        open={openWarning}
        onClose={handleCloseWarning}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openWarning}>
          <div>
            <Paper className={classes.paperModaleDelete} elevation={1}>
              <div>
                <div className={classes.divIntestazione}>
                  <SettingsIcon className={classes.iconModaleError} />
                  <Typography
                    className={classes.intestazioneModaleError}
                    variant="h5"
                  >
                    ERRORE
                  </Typography>
                </div>
                <Divider className={classes.divider} />

                <Typography className={classes.typography}>
                  {warning}
                </Typography>

                <Divider className={classes.divider} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3%",
                  }}
                >
                  <ButtonNotClickedGreen
                    onClick={handleCloseWarning}
                    nome="OK"
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>

      {/* ------------------------MODALE DELETE--------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDelete}>
          <div>
            <Paper className={classes.paperModaleDelete} elevation={1}>
              <div>
                <ListItem>
                  <Typography
                    className={classes.intestazione}
                    variant="h4"
                    style={{ color: "#ef5350" }}
                  >
                    Elimina Test Id <b>{" " + id}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                <Typography
                  className={classes.typography}
                  style={{ paddingLeft: "16px" }}
                >
                  Vuoi eliminare il Test Caricato?
                </Typography>

                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonNotClickedGreen
                    onClick={handleDelete}
                    nome="Elimina"
                  />
                  <ButtonNotClickedGreen
                    onClick={handleCloseDelete}
                    nome="Indietro"
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TestSuiteCaricatiTable;
