import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import "../styles/App.css";
import SettingsIcon from "@material-ui/icons/Settings";
import { Fade, Paper, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import Select from "@material-ui/core/Select";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";
import { MenuItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import loading from "../../src/assets/load.gif";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import acccessControl from "../service/url.js";
import { tableIcons } from "../components/Icons";
import SelectAutocompleteTestCase from "./SelectAutocompleteTestCase";

const TestCaricatiTable = () => {
  const [filter, setFilter] = useState(false);
  const [id, setId] = useState();
  const [idToRun, setIdToRun] = useState();
  const [dataInizio, setDataInizio] = useState("");
  const [data, setData] = useState();
  const [dataCase, setDataCase] = useState();
  const [appearTest, setAppearTest] = useState([]);
  const [orarioInizio, setOrarioInizio] = useState("");
  const [delay, setDelay] = useState(60); //default 60 sec
  let scheduleDateTime = "";
  const [dataLoad, setTestCaseLoad] = useState({});
  const [dataRun, setIdTestCaseRun] = useState(null);
  const [dataSchedula, setDataSchedula] = useState();
  const [selectedRows, setSelectedRows] = useState();
  const [openDeleteMultipli, setOpenDeleteMultipli] = useState();

  //Creazione Array con gli id da eliminare
  const deleteIdArray = [];
  const deleteIdToFilter = selectedRows?.filter((data) => {
    return deleteIdArray.push(data.id);
  });

  const idToDelete = deleteIdArray.toString();

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
    // {
    //   title: "Data Inizio",
    //   field: "loadedWhen",
    // },

    {
      title: "Status",
      field: "stato",
    },
    {
      title: "Linea Chiamato",
      field: "testCaseList.testCase.chiamato",
    },
    {
      title: "Linea Chiamante",
      field: "testCaseList.testCase.chiamanti",
    },
    {
      title: "Call-Id",
      field: "callId",
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
    paperModaleDelete: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      height: "fit-content",
      width: 500,
      position: "relative",
    },
    paperModaleError: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
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
      marginTop: "5%",
      marginBottom: "5%",
    },
    typography: {
      display: "flex",
      marginTop: "3%",
      marginBottom: "3%",
      alignItems: "center",
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
    intestazioneModaleError: {
      color: "#ef5350",
      flexDirection: "row",
      alignItems: "center",
    },
    iconModaleError: {
      marginRight: "4%",
      transform: "scale(1.9)",
      color: "#ef5350",
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
    info: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "3%",
      marginBottom: "3%",
      justifyContent: "center",
    },

    divIntestazione: {
      marginBottom: "2%",
    },
    intestazioneModaleError: {
      color: "#ef5350",
      flexDirection: "row",
      alignItems: "center",
    },
    iconModaleError: {
      // width: "15%",
      // height: "15%",
      marginRight: "4%",
      transform: "scale(1.9)",
      color: "#ef5350",
    },
  }));

  const handleChange = () => {
    setFilter(!filter);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSchedula, setOpenSchedula] = React.useState(false);
  const [openRun, setOpenRun] = React.useState(false);
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));
  const [openDelete, setOpenDelete] = useState(false);
  const [idTest, setIdTest] = React.useState(0);
  const [idLoadDelete, setIdLoadDelete] = useState();

  const handleOpen = () => {
    setOpen(true);
    getAllTestCaseModal();
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

  const handleOpenRun = (idRun) => {
    setIdToRun(idRun);
    setOpenRun(true);
    setOpen(false);
  };

  const handleCloseRun = () => {
    setOpenRun(false);
  };

  const handleChangeData = (newValue) => {
    setValue(newValue);
  };

  const testCaseLoader = () => {
    loadTestCase(id);
    handleClose();
  };

  const runCaseLoader = () => {
    runTestCase(idToRun);
    handleCloseRun();
    //alert("Run test id :  "+ idToRun);
  };

  //------------ funzione apri modale delete
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
    deleteTestCaricato(id);
  };

  //---------- funzione elimina TestCase Multipli
  const handleDeleteMultipli = () => {
    deleteTestCaricatoMultipli(idToDelete);
  };
  //------------ funzione apri modale delete Multipli
  const handleOpenDeleteMultipli = () => {
    setOpenDeleteMultipli(true);
  };
  //---------- funzione chiudi modale delete Multipli
  const handleCloseDeleteMultipli = () => {
    setOpenDeleteMultipli(false);
  };

  /*------- OPEN WARNING DELETE ------------ */

  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  /*------------- GET TEST CASE DASH -------------*/

  let bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const getAllTestCase = () => {
    var consta = "READY";

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      includeTestCaseOfType: consta,
      includeTestSuiteOfType: null,
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
        //setAppearTest(result.testCaseList);
        setData(result.testCaseList);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestCase();
  }, []);

  /*--------------- GET TEST CASE -------------------*/

  const getAllTestCaseModal = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearTest(result.list);
        setDataCase(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  /*--------------- FUNZIONE CARICA TEST CASE -------------------*/

  const loadTestCase = (id) => {
    var urlLoad = `/api/testcase/load/${id}`;

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
        setTestCaseLoad(result.list);
        getAllTestCase();
      })
      .catch((error) => console.log("error", error));
  };

  /*--------------- RUN TEST CASE -------------------*/

  const runTestCase = (idRun) => {
    var urlLoad = `/api/testcase/runloaded/${idRun}`;

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
          setIdTestCaseRun(result.list);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleLoadData = (rowDataaa) => {
    setIdToRun(rowDataaa.id);
    runCaseLoader(rowDataaa.id);
  };

  /*------------------ SCHEDULA TEST ------------------*/
  const [openWarningSchedula, setOpenWarningSchedula] = useState(false);
  const [warningSchedula, setWarningSchedula] = useState("");

  const handleCloseWarningSchedula = () => {
    setOpenWarningSchedula(false);
  };

  const today = new Date();
  const todayDate =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  const todayHoursMinutes = today.getHours() + ":" + (today.getMinutes() + 1);
  //Formatto l'ora di adesso
  let timeToday = todayHoursMinutes.split(":");
  let hourToday = timeToday[0];
  if (hourToday == "00") {
    hourToday = 24;
  }

  let minToday = timeToday[1];
  let inputTimeToday = hourToday + "." + minToday;
  console.log(inputTimeToday);

  //Formatto l'ora dello scheduling
  let time = orarioInizio.split(":");
  console.log(time, "time");
  let hour = time[0];
  if (hour == "00") {
    hour = 24;
  }
  let min = time[1];
  let inputTime = hour + "." + min;
  console.log(inputTime);

  // Differenza tra l'ora di adesso e l'ora dello scheduling
  var totalTime = inputTimeToday - inputTime;
  console.log(totalTime, "differenza");

  const schedulaTestCase = () => {
    if (inputTime !== inputTimeToday) {
      setOpenWarningSchedula(true);
    }
    if (inputTime < inputTimeToday) {
      setWarningSchedula("L'ora selezionata è antecedente a quella attuale!");
    } else {
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

        fetch(`/api/testcase/schedule`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setDataSchedula(result.testCaseCaricato);
            handleCloseSchedula();
          })
          .catch((error) => console.log("error", error));
      };
      setOpenWarningSchedula(false);
      invia();
    }
  };

  /*----------- DELETE TEST CARICATO ----------------*/

  const deleteTestCaricato = (id) => {
    var urlLoadDelete = `/api/testcase/loaded/${id}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    // myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(urlLoadDelete, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setOpenDelete(false);
        getAllTestCase();
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  /*----------- DELETE TEST CARICATO MULTIPLI ----------------*/

  const deleteTestCaricatoMultipli = (id) => {
    var urlLoadDelete = `/api/testcase/loaded/${id}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    // myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(urlLoadDelete, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setOpenDeleteMultipli(false);
        getAllTestCase();
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <MaterialTable
        onSelectionChange={(rows) => {
          setSelectedRows(rows);
        }}
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Total Test Case Caricati"
        data={data}
        columns={columns}
        options={{
          // tableLayout: "fixed",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          selection: true,
          // columnsButton: true,
          filtering: true,
          pageSizeOptions: [5, 10, 20, { value: data?.length, label: "All" }],
        }}
        actions={[
          {
            tooltip: "Elimina i test selezionati",
            icon: tableIcons.Delete,
            onClick: () => {
              handleOpenDeleteMultipli();
            },
          },
          {
            icon: tableIcons.PlayCircleOutlineIcon,
            tooltip: "Lancia il Test",
            onClick: (event, rowData) => handleOpenRun(rowData.id),

            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina il Test",
            onClick: (event, rowData, data) => {
              handleOpenDelete(rowData);
              //setIdTest(rowData.id);
            },
            position: "row",
            disabled: selectedRows?.length > 0,
          },
          {
            icon: () => <PieChartOutlinedIcon />,
            tooltip: "Mostra Report",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.launcher),
            position: "row",
            disabled: true,
          },
          {
            icon: () => <FilterListIcon />,
            tooltip: "Filtro",
            isFreeAction: true,
            onClick: () => handleChange(),
          },
          // {
          //   icon: () => <DeleteIcon />,
          //   tooltip: "Delete Test Case",
          //   isFreeAction: true,
          //   onClick: () => handleChange(),
          // },
          {
            icon: () => (
              <ButtonClickedBlue nome="Carica Test Case"></ButtonClickedBlue>
            ),
            tooltip: "Carica Test Case",
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
                    Load Test Case
                  </Typography>
                </ListItem>
              </div>
              <Divider className={classes.divider} />

              <Typography variant="h6" className={classes.typography}>
                Seleziona Test Case
              </Typography>

              <div className={classes.divSelectBar}>
                <Form.Group>
                  <Form.Label>Nome del Test Case</Form.Label>
                  <FormControl variant="outlined">
                    <SelectAutocompleteTestCase
                      className={classes.SelectAutocompleteTestCase}
                      value={appearTest.nome}
                      items={appearTest?.map((i) => ({
                        id: i.id,
                        nome: i.nome,
                      }))}
                      onChange={(id) => setId(id)}
                    />
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
                  onClick={testCaseLoader}
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

      {/* ------------------ MODALE SCHEDULA TEST CASE --------------------- */}
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
              <ListItem>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h4">
                  Schedula Test Case
                </Typography>
              </ListItem>
              <Divider className={classes.divider} />

              <div className={classes.divSubContent1}>
                <Paper elevation={2} className={classes.calendarPaper}>
                  <Typography variant="h5">Calendario</Typography>
                  <Divider />
                  <div className={classes.divInput}>
                    <label for="start">Data Inizio:</label>
                    <TextField
                      type="date"
                      id="start"
                      name="trip-start"
                      onChange={(e) => setDataInizio(e.target.value)}
                      inputProps={{
                        min: `${todayDate}`,
                      }}
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
                  onClick={schedulaTestCase}
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
                  Lancio Test Case
                </Typography>
              </ListItem>

              <Divider className={classes.divider} />
              <Typography className={classes.info}>
                Vuoi lanciare il test case da te selezionato ?
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

                <Typography className={classes.typography}>
                  Vuoi eliminare il Test Caricato?
                </Typography>

                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonNotClickedGreen
                    //onClick={functionDelete}
                    nome="Elimina"
                    onClick={handleDelete}
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

      {/* ------------------------MODALE DELETE MULTIPLI--------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDeleteMultipli}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDeleteMultipli}>
          <div>
            <Paper className={classes.paperModaleDelete} elevation={1}>
              <div>
                <ListItem>
                  <Typography
                    className={classes.intestazione}
                    variant="h4"
                    style={{ color: "#ef5350" }}
                  >
                    Elimina i test selezionati
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                {selectedRows?.length > 1 ? (
                  <Typography className={classes.typography}>
                    Vuoi eliminare i Test Caricati?
                  </Typography>
                ) : (
                  <Typography className={classes.typography}>
                    Vuoi eliminare il Test Caricato?
                  </Typography>
                )}

                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonNotClickedGreen
                    //onClick={functionDelete}
                    nome="Elimina"
                    onClick={handleDeleteMultipli}
                  />
                  <ButtonNotClickedGreen
                    onClick={handleCloseDeleteMultipli}
                    nome="Indietro"
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>

      {/*------------------MODALE ERRORE SCHEDULA--------------- */}
      <Modal
        className={classes.modal}
        open={openWarningSchedula}
        onClose={handleCloseWarningSchedula}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openWarningSchedula}>
          <div>
            <Paper className={classes.paperModaleError} elevation={1}>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "2%",
                    marginBottom: "1%",
                  }}
                >
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
                  {warningSchedula}
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
                    onClick={handleCloseWarningSchedula}
                    nome="OK"
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

export default TestCaricatiTable;
