import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
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
import { MenuItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import acccessControl from "../service/url.js";
import TextField from "@material-ui/core/TextField";
import { tableIcons } from "../components/Icons";
import SelectAutocompleteTestGeneratore from "../components/SelectAutocompleteTestGeneratore";

const TestGeneratoreCaricatiTable = () => {
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [filter, setFilter] = useState(false);
  const [idToRun, setIdToRun] = useState();
  const [dataRun, setIdTestGenRun] = useState(null);
  const [rate, setRate] = useState();
  const [durataTraffico, setDurataTraffico] = useState();
  const [dataInizio, setDataInizio] = useState();
  const [orarioInizio, setOrarioInizio] = useState("");
  const [delay, setDelay] = useState();
  const [dataGen, setDataGen] = useState();
  const [dataLoad, setDataLoad] = useState();
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
    // {
    //   title: "Data Fine",
    //   field: "modifiedDate",
    // },
    {
      title: "Status",
      field: "stato",
    },
    // {
    //   title: "Trace",
    //   field: "trace",
    // },
    {
      title: "Call-Id",
      field: "callId",
    },
    // {
    //   title: "Report",
    //   field: "trace",
    // },
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
      width: 550,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "1%",
    },
    paperModaleSchedula: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "3%",
      height: "fit-content",
      width: 600,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "1%",
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
      marginTop: "2%",
      width: "150px",
      height: "30px",
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
      justifyContent: "space-around",
    },
    divSubContent3: {
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
      marginTop: "3%",
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
      justifyContent: "center",
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
  }));

  const handleChange = () => {
    setFilter(!filter);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openRun, setOpenRun] = React.useState(false);
  const [openSchedula, setOpenSchedula] = React.useState(false);
  const [openLoad, setOpenLoad] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  let scheduleDateTime = "";

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

  const testGenLoader = () => {
    loadTestGen();
    handleCloseLoad();
  };

  const runGenLoader = () => {
    runTestGen(idToRun);
    handleCloseRun();
  };

  const handleOpenLoad = () => {
    setOpenLoad(true);
    setOpen(false);
  };

  const handleCloseLoad = () => {
    setOpenLoad(false);
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

  //------------ funzione apri modale delete

  const handleOpenDelete = (rowData) => {
    setId(rowData.id);
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  //---------- funzione elimina TestGen
  const handleDelete = () => {
    deleteTestCaricato(id);
  };

  /*------- OPEN WARNING DELETE ------------ */

  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
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
        setData(result.testGeneratoList);
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
        setDataGen(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  /*----------- SCHEDULA TEST GEN ---------------*/

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

  //Formatto l'ora dello scheduling
  let time = orarioInizio.split(":");
  let hour = time[0];
  if (hour == "00") {
    hour = 24;
  }
  let min = time[1];
  let inputTime = hour + "." + min;

  // Differenza tra l'ora di adesso e l'ora dello scheduling
  var totalTime = inputTimeToday - inputTime;

  const schedulaTestGen = () => {
    if (inputTime !== inputTimeToday) {
      setOpenWarning(true);
    }
    if (inputTime < inputTimeToday) {
      setWarning("L'ora selezionata è antecedente a quella attuale!");
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
          durataTraffico: durataTraffico,
          rate: rate,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`/api/testgen/schedule`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setDataSchedula(result.testGeneratoreCaricato);
            handleCloseSchedula();
          })
          .catch((error) => console.log("error", error));
      };
      setOpenWarning(false);
      invia();
    }
  };

  /*--------------- RUN TEST GEN -------------------*/

  const runTestGen = (idRun) => {
    var urlLoad = `/api/testgen/loaded/run/${idRun}`;

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
          if (result.error.code === "TEST-0027") {
            setWarning("Il test selezionato è già stato lanciato!");
          } else {
            setWarning(
              "Codice errore: " +
                result.error.code +
                "Descrizione" +
                result.error.description
            );
          }
        } else {
          setOpenWarning(false);
          console.log(result);
          setIdTestGenRun(result.list);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleLoadData = (rowDataaa) => {
    runGenLoader(rowDataaa.id);
    setIdToRun(rowDataaa.id);
  };

  /*------------- LOAD TEST GEN -------------------*/

  const loadTestGen = () => {
    const invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        id: id,
        rate: rate,
        durataTraffico: durataTraffico,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/testgen/load`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setDataLoad(result.testGeneratoreCaricato);
          getAllTestGeneratore();
        })
        .catch((error) => console.log("error", error));
    };
    invia();
  };

  console.log(data);

  /*----------- DELETE TEST CARICATO ----------------*/

  const deleteTestCaricato = (id) => {
    var urlLoadDelete = `/api/testgen/loaded/${id}`;

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
        getAllTestGeneratore();
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  /*----------- DELETE TEST CARICATO MULTIPLI ----------------*/

  const deleteTestCaricatoMultipli = (id) => {
    var urlLoadDelete = `/api/testgen/loaded/${id}`;

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
        getAllTestGeneratore();
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
        title=" Total Test Generatore Caricati"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          filtering: true,
          selection: true,
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
            icon: () => <PieChartOutlinedIcon />,
            tooltip: "Mostra Report",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.launcher),
            position: "row",
            disabled: true,
          },
          {
            icon: tableIcons.PlayCircleOutlineIcon,
            tooltip: "Lancia il Test",
            onClick: (event, rowData) => handleOpenRun(rowData.id),
            position: "row",
          },
          {
            icon: tableIcons.Delete,
            tooltip: "Elimina il Test",
            onClick: (event, rowData) => {
              handleOpenDelete(rowData);
            },
            position: "row",
            disabled: selectedRows?.length > 0,
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
                      className={classes.SelectAutocompleteTestGen}
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
                  onClick={handleOpenLoad}
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

      {/*------------------------- MODALE LOAD TEST GEN 2 ------------------ */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openLoad}
        onClose={handleCloseLoad}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openLoad}>
          <Paper className={classes.paperModale} elevation={1}>
            <div>
              <ListItem>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h4">
                  Carica Test Generatore
                </Typography>
              </ListItem>
              <Divider className={classes.divider} />

              <div className={classes.divSubContent1}>
                <Paper elevation={2} className={classes.calendarPaper}>
                  <Typography variant="h5">Rate</Typography>
                  <div className={classes.divInput}>
                    <label for="appt">Rate:</label>
                    <FormControl variant="outlined">
                      <Select
                        className={classes.select}
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      >
                        {[5, 10, 15, 20, 25].map((rate) => {
                          return (
                            <MenuItem
                              style={{ width: "200px" }}
                              key={rate}
                              value={rate}
                            >
                              {rate}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </Paper>

                <Paper elevation={2} className={classes.orarioPaper}>
                  <Typography variant="h5">Durata Test</Typography>
                  <div className={classes.divInput}>
                    <label for="appt">Durata Test:</label>

                    <FormControl variant="outlined">
                      <Select
                        className={classes.select}
                        value={durataTraffico}
                        onChange={(e) => setDurataTraffico(e.target.value)}
                      >
                        {[
                          { label: "5 ", value: 5 },
                          { label: "10 ", value: 10 },
                          { label: "20 ", value: 20 },
                          { label: "30 ", value: 30 },
                          { label: "60 ", value: 60 },
                          { label: "120 ", value: 120 },
                          { label: "360 ", value: 360 },
                          { label: "720 ", value: 720 },
                          { label: "24 ore", value: 1440 },
                          { label: "48 ore", value: 2880 },
                        ].map((durataTraffico) => {
                          return (
                            <MenuItem
                              style={{ width: "200px" }}
                              key={durataTraffico.label}
                              value={durataTraffico.value}
                            >
                              {durataTraffico.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </Paper>
              </div>

              {/* <div className={classes.divSubContent2}>
                <Paper elevation={2} className={classes.delayPaper}> */}
              {/* <Form.Label>Durata Chiamata </Form.Label>
                        <Form.Control
                          max={rate * 60 * durataTraffico}
                          type="number"
                          value={callDuration}
                          placeholder="60"
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            const maxValue = rate * 60 * durataTraffico;
                            setCallDuration(Math.min(newValue, maxValue));
                          }}
                        /> */}
              {/* </Paper>
              </div> */}
              <Divider />

              <div className={classes.bottone}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={testGenLoader}
                >
                  Conferma
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseLoad}
                >
                  Annulla
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
          <Paper className={classes.paperModaleSchedula} elevation={1}>
            <div>
              <ListItem>
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
                      required
                    />
                  </div>
                </Paper>
              </div>

              <div className={classes.divSubContent2}>
                <Paper elevation={2} className={classes.orarioPaper}>
                  <Typography variant="h5">Durata Test</Typography>
                  <div className={classes.divInput}>
                    <label for="appt">Durata Test:</label>

                    <FormControl variant="outlined">
                      <Select
                        className={classes.select}
                        value={durataTraffico}
                        onChange={(e) => setDurataTraffico(e.target.value)}
                      >
                        {[
                          { label: "5  ", value: 5 },
                          { label: "10  ", value: 10 },
                          { label: "20  ", value: 20 },
                          { label: "30  ", value: 30 },
                          { label: "60  ", value: 60 },
                          { label: "120  ", value: 120 },
                          { label: "360  ", value: 360 },
                          { label: "720  ", value: 720 },
                          { label: "24 ore", value: 1440 },
                          { label: "48 ore", value: 2880 },
                        ].map((durataTraffico) => {
                          return (
                            <MenuItem
                              style={{ width: "200px" }}
                              key={durataTraffico.label}
                              value={durataTraffico.value}
                            >
                              {durataTraffico.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </Paper>

                <Paper elevation={2} className={classes.calendarPaper}>
                  <Typography variant="h5">Rate</Typography>
                  <div className={classes.divInput}>
                    <label for="appt">Rate:</label>

                    <FormControl variant="outlined">
                      <Select
                        className={classes.select}
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                      >
                        {[5, 10, 15, 20, 25].map((rate) => {
                          return (
                            <MenuItem
                              style={{ width: "200px" }}
                              key={rate}
                              value={rate}
                            >
                              {rate}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </div>
                </Paper>
              </div>

              <div className={classes.divSubContent3}>
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
                  onClick={schedulaTestGen}
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
                  Lancio Test Generatore
                </Typography>
              </ListItem>

              <Divider className={classes.divider} />
              <Typography className={classes.info}>
                <p>Vuoi lanciare il test generatore da te selezionato ?</p>
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
    </div>
  );
};

export default TestGeneratoreCaricatiTable;
