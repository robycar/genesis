import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import { Fade, Paper, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import { Divider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import Select from "@material-ui/core/Select";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { MenuItem } from "@material-ui/core";
import acccessControl from "../service/url.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextField from "@material-ui/core/TextField";
import "../styles/App.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { tableIcons } from "./Icons";

const TestGeneratoreConclusiTable = () => {
  const [id, setId] = useState();
  const [nome, setNome] = useState("");
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [name, setName] = useState("");
  const [rate, setRate] = useState();
  const [loadedBy, setLoadedBy] = useState("");
  const [stato, setStato] = useState("");
  const [result, setResult] = useState("");
  const [callId, setCallId] = useState("");
  const [testDuration, setTestDuration] = useState();
  const [callDuration, setCallDuration] = useState();

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
      field: "stato",
    },
    {
      title: "Risultato",
      field: "result",
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
    paperModaleReport: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "3%",
      height: "fit-content",
      width: 800,
      position: "relative",
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
      marginTop: "25px",
      marginBottom: "5%",
    },
    selectBar: {
      width: "50%",
      height: "100",
      marginTop: "50px",
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
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
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
    contenutoModale: {
      height: 370,
      overflowX: "hidden",
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
    bottone: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "6%",
      justifyContent: "center",
    },
    col: {
      padding: "3%",
      height: "106px",
    },
    row: {
      width: "600px",
    },
    textField: {
      width: "300px",
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSchedula, setOpenSchedula] = React.useState(false);
  const [openVisualizzaReport, setOpenVisualizzaReport] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSchedula = () => {
    setOpenSchedula(true);
  };

  const handleCloseSchedula = () => {
    setOpenSchedula(false);
  };

  const testGenLoader = () => {
    handleClose();
    getAllTestGeneratore();
  };

  // --------------- MODALE VISUALIZZA REPORT ------------//

  const openReport = (rowData) => {
    handleOpenReport(rowData);
    setOpenVisualizzaReport(true);
  };

  const handleOpenReport = (rowData) => {
    setId(rowData.id);
    setNome(rowData.nome);
    setLoadedBy(rowData.loadedBy);
    setStartDate(rowData.startDate);
    setEndDate(rowData.endDate);
    setStato(rowData.stato);
    setResult(rowData.result);
    setCallId(rowData.loadedBy);
  };

  const handleCloseReport = () => {
    setOpenVisualizzaReport(false);
  };

  /*------------- GET TEST GEN -------------*/

  let bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const [appearTest, setAppearTest] = useState([]);

  const getAllTestGeneratore = () => {
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

  useEffect(() => {
    getAllTestGeneratore();
  }, []);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Total Test Generatore Conclusi"
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
            tooltip: "Mostra Report",
            onClick: (event, rowData) => openReport(rowData),
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina il Test",
            onClick: (event, rowData) => {
              alert("inserire api delete");
            },
            position: "row",
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
                    <Select
                      className={classes.select}
                      value={appearTest.nome}
                      onChange={(e) => setName(e.target.value)}
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

              <div className={classes.divContent}>
                <Paper elevation={2} className={classes.calendarPaper}>
                  <Typography variant="h5">Calendario</Typography>
                  <Divider />
                  <div className={classes.divInput}>
                    <label for="start">Start date:</label>
                    <input
                      type="date"
                      id="start"
                      name="trip-start"
                      value="2018-07-22"
                      min="2018-01-01"
                      max="2018-12-31"
                    />
                  </div>
                </Paper>

                <Paper elevation={2} className={classes.delayPaper}>
                  <Typography variant="h5">Delay</Typography>
                  <div className={classes.divInput}>
                    <label for="appt">Start Time:</label>
                    <input
                      style={{ width: "135px" }}
                      type="time"
                      id="appt"
                      name="appt"
                      min="09:00"
                      max="18:00"
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

      {/*------------------ MODALE VISUALIZZA REPORT-------------*/}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openVisualizzaReport}
        onClose={handleCloseReport}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openVisualizzaReport}>
          <div>
            <Paper className={classes.paperModaleReport} elevation={1}>
              <div>
                <ListItem>
                  <Typography
                    style={{ color: "#1665D8", alignItems: "center" }}
                    variant="h4"
                  >
                    Visualizza Test Generatore <b>{nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Id"
                      defaultValue={id}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Nome"
                      defaultValue={nome}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Loader"
                      defaultValue={loadedBy}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Call-Id"
                      defaultValue={callId}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Data Inizio"
                      defaultValue={startDate}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Data Fine"
                      defaultValue={endDate}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Status"
                      defaultValue={stato}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      defaultValue={result}
                      label="Risultato"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>
              </Form>
              <div className={classes.buttonModale}>
                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    href="/report/testgeneratore"
                    className={classes.bottoneAnnulla}
                  >
                    Vai alla Sezione Report
                  </Button>

                  <ButtonClickedBlue
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseReport}
                    size="medium"
                    nome="Chiudi"
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

export default TestGeneratoreConclusiTable;
