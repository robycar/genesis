import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
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
import loading from "../../src/assets/load.gif";
import DeleteIcon from "@material-ui/icons/Delete";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import acccessControl from "../service/url.js";
import { tableIcons } from "../components/Icons";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutline";

const TestSchedulatiTable = () => {
  const [filter, setFilter] = useState(false);
  const [id, setId] = useState();
  const [idToRun, setIdToRun] = useState();
  const [data, setData] = useState();
  const [appearTest, setAppearTest] = useState([]);
  const [dataInizio, setDataInizio] = useState();
  const [orarioInizio, setOrarioInizio] = useState();
  const [dataSchedula, setDataSchedula] = useState();
  const [idTest, setIdTest] = useState();
  const [idTestCaseRun, setIdTestCaseRun] = useState();
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
    {
      title: "Linea Chiamato",
      field: "testCaseList.testCase.chiamato",
    },
    {
      title: "Linea Chiamante",
      field: "testCaseList.testCase.chiamanti",
    },

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
    paperModaleDelete: {
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
      marginLeft: "18px",
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
      height: "fit-content",
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
      marginBottom: "3%",
      justifyContent: "center",
    },
  }));

  const handleChange = () => {
    setFilter(!filter);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSchedula, setOpenSchedula] = React.useState(false);
  const [openRun, setOpenRun] = React.useState(false);
  const [scheduleDateTime, setSchedulaDateTime] = React.useState("");
  const [delay, setDelay] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);

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

  const testCaseLoader = () => {
    handleClose();
    getAllTestCase();
  };

  const runCaseLoder = () => {
    runTestCase(idToRun);
    handleCloseRun();
  };

  const handleOpenRun = (idRun_) => {
    setIdToRun(idRun_);
    setOpenRun(true);
    setOpen(false);
  };

  const handleCloseRun = () => {
    setOpenRun(false);
  };

  const handleOpenDelete = (rowData) => {
    setId(rowData.id);
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

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

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  //-----------GET TEST CASE----------------------
  const getAllTestCase = () => {
    var consta = "SCHEDULED";
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
        setData(result.testCaseList);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestCase();
  }, []);

  /*------------------ SCHEDULA TEST CASE ------------------*/

  const schedulaTestCase = () => {
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
          setDataSchedula(result.testCaseCaricato);
          handleCloseSchedula();
        })
        .catch((error) => console.log("error", error));
    };
    invia();
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
        setIdTestCaseRun(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const handleLoadData = (rowDataaa) => {
    setIdToRun(rowDataaa.id);
    runCaseLoder(rowDataaa.id);
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
        title=" Total Test Case Schedulati"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          selection: true,
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
            icon: () => <PieChartOutlinedIcon />,
            tooltip: "Mostra Report",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.launcher),
            position: "row",
            disabled: true,
          },
          {
            icon: () => <PlayCircleOutlineIcon />,
            tooltip: "Lancia il Test ",
            onClick: (event, rowData) => handleOpenRun(rowData.id),
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina Test ",
            onClick: (event, rowData) => {
              handleOpenDelete(rowData);
              setIdTest(rowData.id);
            },
            position: "row",
            disabled: selectedRows?.length > 0,
          },
          {
            icon: () => <FilterListIcon />,
            tooltip: "Filtro",
            isFreeAction: true,
            onClick: () => handleChange(),
          },
          // {
          //   icon: () => (
          //     <ButtonClickedBlue nome="Carica Test Case"></ButtonClickedBlue>
          //   ),
          //   tooltip: "Carica Test Case",
          //   onClick: () => handleOpen(),
          //   isFreeAction: true,
          // },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
          body: {
            emptyDataSourceMessage: "Non ?? presente alcun dato da mostrare",
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
              <ListItem button>
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
    </div>
  );
};

export default TestSchedulatiTable;
