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
import { Fade, Paper, Typography, Box } from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import { Divider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import acccessControl from "../service/url.js";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { tableIcons } from "./Icons";

const TestGeneratoreSchedulatiTable = () => {
  const [id, setId] = useState();
  const [data, setData] = useState();
  const [name, setName] = useState("");
  const [rate, setRate] = useState();
  const [testDuration, setTestDuration] = useState();
  const [callDuration, setCallDuration] = useState();
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
      title: "Data Inizio",
      field: "scheduleDateTime",
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
    divSelectBar: {
      marginTop: "5%",
      marginBottom: "5%",
    },
    typography: {
      marginTop: "3%",
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
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
    },
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
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
    paperModaleDelete: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      height: "fit-content",
      width: 500,
      position: "relative",
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
    info: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "3%",
      marginBottom: "3%",
      justifyContent: "center",
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
  }));

  //---------------------------------------------

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openRun, setOpenRun] = React.useState(false);
  const [idToRun, setIdToRun] = useState();
  const [dataRun, setIdTestGenRun] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleOpenSchedula = () => {
  //   setOpenSchedula(true);
  //   setOpen(false);
  // };

  // const handleCloseSchedula = () => {
  //   setOpenSchedula(false);
  // };

  //-------- funzione Run -----------
  const handleOpenRun = (idRun) => {
    setIdToRun(idRun);
    setOpenRun(true);
    setOpen(false);
  };

  const handleCloseRun = () => {
    setOpenRun(false);
  };

  const runGenLoader = () => {
    runTestGen(idToRun);
    handleCloseRun();
  };

  //---------- funzione delete
  const handleOpenDelete = (rowData) => {
    setId(rowData.id);
    setOpenDelete(true);
  };

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
        setIdTestGenRun(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const handleLoadData = (rowDataaa) => {
    setIdToRun(rowDataaa.id);
    runGenLoader(rowDataaa.id);
  };

  console.log(dataRun, "dataRun");

  /*------------- GET TEST GEN -------------*/

  let bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const getAllTestGeneratore = () => {
    var consta = "SCHEDULED";
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
        title=" Total Test Generatore Schedulati"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          filtering: true,
          selection: true,
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
            tooltip: "Report",
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
            tooltip: "Filtro",
            isFreeAction: true,
          },
          // {
          //   icon: () => (
          //     <ButtonClickedBlue nome="Carica Test Generatore"></ButtonClickedBlue>
          //   ),
          //   tooltip: "Carica Test Generatore",
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
                  Lancio Test Generatore
                </Typography>
              </ListItem>

              <Divider className={classes.divider} />
              <Typography className={classes.info}>
                Vuoi lanciare il test generatore da te selezionato ?
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

                <Typography
                  className={classes.typography}
                  style={{ marginLeft: "3%", marginBottom: "3%" }}
                >
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
                  <Typography
                    className={classes.typography}
                    style={{ marginLeft: "3%", marginBottom: "3%" }}
                  >
                    Vuoi eliminare i Test Caricati?
                  </Typography>
                ) : (
                  <Typography
                    className={classes.typography}
                    style={{ marginLeft: "3%", marginBottom: "3%" }}
                  >
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

export default TestGeneratoreSchedulatiTable;
