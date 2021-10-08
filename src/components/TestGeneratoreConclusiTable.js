import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import { Fade, Paper, Typography } from "@material-ui/core";
import SelectBar from "./SelectBar";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import ListItem from "@material-ui/core/ListItem";
import { Divider } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import Select from "@material-ui/core/Select";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { MenuItem } from "@material-ui/core";
import loading from "../../src/assets/load.gif";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import acccessControl from "../service/url.js";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import DeleteIcon from "@material-ui/icons/Delete";


const TestGeneratoreConclusiTable = () => {
  const [id, setId] = useState();
  const [nome, setNome] = useState("");
  const [creationDate, setCreationDate] = useState();
  const [modifiedDate, setModifiedDate] = useState();
  const [data, setData] = useState();
  const [createdBy, setCreatedBy] = useState("");
  const [name, setName] = useState("");
  const [rate, setRate] = useState();
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
    {
      title: "Report",
      field: "report",
      render: (rowData) => (
        <Button color="secondary" onClick={() => handleOpenReport()}>
          report
        </Button>
      ),
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
      alignItems: "center"
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
      marginBottom: "2%"
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
      marginBottom: "5%"
    },
    bottone: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      marginTop: "6%",
      justifyContent: "center",
    },
  }));

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);
  const [openSchedula, setOpenSchedula] = React.useState(false);
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));
  const [openReport, setOpenReport] = React.useState(false);


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

  const handleChangeData = (newValue) => {
    setValue(newValue);
  };

  const handleOpenReport = () => {
    setOpenReport(true);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const testGenLoader = () => {
    //loadTestGen(id);
    handleClose();
    getAllTestGeneratore();
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
        console.log(result);
        setAppearTest(result.list);
        setData(result.list)
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestGeneratore();
  }, []);

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Test Generatore Conclusi"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
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
          // {
          //   icon: "play_circle_outlined",
          //   tooltip: "Lancia",
          //   onClick: (event, rowData) =>
          //     alert("Ho cliccato " + rowData.launcher),
          //   position: "row",
          // },
          {
            icon: () => (
              <ButtonClickedBlue nome="Carica Test Generatore"></ButtonClickedBlue>
            ),
            tooltip: "Carica Test Generatore",
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
                    {name && <>
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
                          {[{ label: "5 minuti", value: 5 },
                          { label: "10 minuti", value: 10 },
                          { label: "20 minuti", value: 20 },
                          { label: "30 minuti", value: 30 },
                          { label: "60 minuti", value: 60 },
                          { label: "120 minuti", value: 120 },
                          { label: "360 minuti", value: 360 },
                          { label: "720 minuti", value: 720 },
                          { label: "24 ore", value: 1440 },
                          { label: "48 ore", value: 2880 }
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
                    </>}
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
      </Modal >

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

       {/* ----------------MODALE REPORT ------------------*/}
       <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openReport}
        onClose={handleCloseReport}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openReport}>
          <div>
            <Paper className={classes.paperModaleReport} elevation={1}>
              <div>
                <MaterialTable
                  style={{ boxShadow: "none" }}
                  title="Report"
                  // data={data}
                  columns={columns}
                  actions={[
                    {
                      icon: () => (
                        <div>
                          <Button
                            size="small"
                            color="secondary"
                            component={NavLink}
                            activeClassName="button-green-active"
                            exact
                            to="/report/testgeneratore"
                          >
                            Vai alla sezione report
                          </Button>
                        </div>
                      ),
                      tooltip: "Vai ai Report",
                      // onClick: () => handleOpen(),
                      isFreeAction: true,
                    },
                  ]}
                  components={{
                    Action: props => (
                      <Button
                        onClick={handleCloseReport}
                        color="primary"
                        variant="contained"
                        style={{textTransform: 'none'}}
                        size="small"
                      >
                        Chiudi
                      </Button>
                    ),
                  }}
                />
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TestGeneratoreConclusiTable;
