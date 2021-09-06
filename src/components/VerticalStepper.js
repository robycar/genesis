import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CreaItem from "../components/CreaItem";
import Divider from "@material-ui/core/Divider";
import Form from "react-bootstrap/Form";
import Alert from "@material-ui/lab/Alert";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import TextField from "@material-ui/core/TextField";
import { NavLink } from "react-router-dom";
import ModaleCreaTemplate from "../components/ModaleCreaTemplate";
import acccessControl from "../service/url.js";
import MaterialTable from "material-table";
import EditIcon from "@material-ui/icons/Edit";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import ListItem from "@material-ui/core/ListItem";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import { MenuItem } from "@material-ui/core";
import CardTemplate from "../components/CardTemplate";
import Board from "../components/Board";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SelectBar from "./SelectBar";
import BackupIcon from "@material-ui/icons/Backup";
import { useForm } from "react-hook-form";
import "../styles/App.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // padding: "20px",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  buttonGreen: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: "#47b881",
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  green: {
    backgroundColor: "green",
  },
}));

function getSteps() {
  return [
    "Inserisci le informazioni del Template",
    "Inserisci i file",
    "Crea e aggiungi",
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <FirstStep />;
    case 1:
      return <SecondStep />;
    case 2:
      return <ThirdStep />;
    default:
      return "Unknown step";
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // salva();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Indietro
                  </Button>
                  <Button
                    variant="contained"
                    // component={NavLink}
                    // color="primary"
                    onClick={handleNext}
                    className={classes.buttonGreen}
                    exact
                    // to="/editing/template"
                  >
                    {activeStep === steps.length - 1 ? "Completa" : "Avanti"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            Hai completato tutti gli step per la creazione del Template
          </Typography>
          <Button
            component={NavLink}
            // size="medium"
            // activeClassName="button-green-active"
            // exact
            to="/editing/template"
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            Chiudi
          </Button>
        </Paper>
      )}
    </div>
  );
}

const FirstStep = () => {
  const useStyles = makeStyles((theme) => ({
    paper: {
      width: "50%",
      backgroundColor: theme.palette.background.paper,
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      justifyContent: "center",
    },
  }));
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  const [nome, setNome] = useState("");
  const [durata, setDurata] = useState("");
  const [typeTemplate, setTypeTemplate] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [version, setVersion] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");

  const todayDate = new Date(
    new Date().toString().split("GMT")[0] + " UTC"
  ).toISOString();
  function salva() {
    const Invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        nome: nome,
        durata: durata,
        descrizione: descrizione,
        typeTemplate: typeTemplate,
        version: version,
        // id: id,
        creationDate: todayDate,
        // creationDate: creationDate,
        modifiedDate: modifiedDate,
        modifiedBy: modifiedBy,
        createdBy: createdBy,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/template`, requestOptions)
        .then((response) => response.json())
        //.then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      // localStorage.setItem("user-info", JSON.stringify(result));
      // history.push("/dashboard/testcase");
      window.location = "/editing/template";
    };

    if (
      nome !== "" &&
      durata !== "" &&
      typeTemplate !== "" &&
      descrizione !== "" &&
      version !== "" &&
      createdBy !== "" &&
      modifiedBy !== "" &&
      creationDate !== "" &&
      modifiedDate !== ""
    ) {
      Invia();
      // console.log(ip);
    } else {
      if (nome === "") {
        document.getElementById("alertNome").style.display = "";
      } else {
        document.getElementById("alertNome").style.display = "none";
      }
      if (durata === "") {
        document.getElementById("alertDurata").style.display = "";
      } else {
        document.getElementById("alertDurata").style.display = "none";
      }
      if (typeTemplate === "") {
        document.getElementById("alertTypeTemplate").style.display = "";
      } else {
        document.getElementById("alertTypeTemplate").style.display = "none";
      }
      if (descrizione === "") {
        document.getElementById("alertDescrizione").style.display = "";
      } else {
        document.getElementById("alertDescrizione").style.display = "none";
      }
      if (version === "") {
        document.getElementById("alertVersion").style.display = "";
      } else {
        document.getElementById("alertVersion").style.display = "none";
      }
      if (createdBy === "") {
        document.getElementById("alertCreatedBy").style.display = "";
      } else {
        document.getElementById("alertCreatedBy").style.display = "none";
      }
      if (modifiedBy === "") {
        document.getElementById("alertModifiedBy").style.display = "";
      } else {
        document.getElementById("alertModifiedBy").style.display = "none";
      }
      if (creationDate === "") {
        document.getElementById("alertCreationDate").style.display = "";
      } else {
        document.getElementById("alertCreationDate").style.display = "none";
      }
    }
  }

  return (
    <Paper className={classes.paper} elevation={2}>
      <CreaItem titolo="Crea Template" />

      <Divider className={classes.divider} />

      <div className={classes.generalContainer}>
        <Paper className={classes.paperContainer1} elevation={0}>
          <Paper className={classes.divSelect} elevation={0}>
            <Form.Group controlId="form.Numero">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                className={classes.formControl}
                type="text"
                placeholder="Inserisci nome"
                onChange={(e) => setNome(e.target.value)}
              />
              <Alert
                severity="error"
                id="alertNome"
                style={{ display: "none" }}
              >
                Nome is required!
              </Alert>
            </Form.Group>
          </Paper>

          <Paper className={classes.divSelect} elevation={0}>
            <Form.Group controlId="form.Numero">
              <Form.Label>Durata</Form.Label>
              <form className={classes.containerTextField} noValidate>
                <TextField
                  // id="time"
                  // label="Alarm clock"
                  type="number"
                  defaultValue=""
                  placeholder="Inserisci durata"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  //   onChange={(e) => {
                  //     setDurata(e.target.value);
                  //}}
                  //   inputProps={{
                  //     step: 300, // 5 min
                  //   }}
                />
              </form>

              <Alert
                severity="error"
                id="alertDurata"
                style={{ display: "none" }}
              >
                Durata is required!
              </Alert>
            </Form.Group>
          </Paper>

          {/* <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Modificato da</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Descrizione"
                    onChange={(e) => setModifiedBy(e.target.value)}
                  />
                  <Alert
                    severity="error"
                    id="alertModifiedBy"
                    style={{ display: "none" }}
                  >
                    Modificato da is required!
                  </Alert>
                </Form.Group>
              </Paper> */}

          {/* DATA DI CREAZIONE */}
          {/* <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Data di creazione</Form.Label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      placeholder="data di creazione"
                      margin="normal"
                      className={classes.picker}
                      id="date-picker-inline"
                      value={todayDate}
                      // onChange={(e) => setCreationDate(e.target.value)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                    <Alert
                      severity="error"
                      id="alertCreationDate"
                      style={{ display: "none" }}
                    >
                      Data Creazione is required!
                    </Alert>
                  </MuiPickersUtilsProvider>
                </Form.Group>
              </Paper> */}

          <Paper className={classes.divSelect} elevation={0}>
            <Form.Group controlId="form.Numero">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                className={classes.formControl}
                type="text"
                placeholder="Inserisci Descrizione"
                fullWidth={true}
                onChange={(e) => setDescrizione(e.target.value)}
              />

              {/* <TextField
                    placeholder="Inserisci Descrizione"
                    multiline
                    rows={2}
                    rowsMax={4}
                    variant="outlined"
                  /> */}
              <Alert
                severity="error"
                id="alertDescrizione"
                style={{ display: "none" }}
              >
                Descrizione is required!
              </Alert>
            </Form.Group>
          </Paper>
        </Paper>

        <Paper className={classes.paperContainer2} elevation={0}>
          <Paper className={classes.divSelect} elevation={0}>
            <Form.Group controlId="form.Numero">
              <Form.Label>Tipo Template</Form.Label>
              <Form.Control
                className={classes.formControl}
                type="text"
                placeholder="Inserisci Type Template"
                //onChange={(e) => setTypeTemplate(e.target.value)}
              />
              <Alert
                severity="error"
                id="alertTypeTemplate"
                style={{ display: "none" }}
              >
                Type Template is required!
              </Alert>
            </Form.Group>
          </Paper>

          <Paper className={classes.divSelect} elevation={0}>
            <Form.Group controlId="form.Numero">
              <Form.Label>Version</Form.Label>
              <form className={classes.containerTextField} noValidate>
                <TextField
                  // id="time"
                  // label="Alarm clock"
                  type="number"
                  defaultValue=""
                  placeholder="Inserisci version"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  //   onChange={(e) => {
                  //     setVersion(e.target.value);
                  //   }}
                  //   inputProps={{
                  //     step: 300, // 5 min
                  //   }}
                />
              </form>

              <Alert
                severity="error"
                id="alertVersion"
                style={{ display: "none" }}
              >
                Version is required!
              </Alert>
            </Form.Group>
          </Paper>

          {/* <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Creato da</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Creato da"
                    onChange={(e) => setCreatedBy(e.target.value)}
                  />
                  <Alert
                    severity="error"
                    id="alertCreatedBy"
                    style={{ display: "none" }}
                  >
                    Creato da is required!
                  </Alert>
                </Form.Group>
              </Paper> */}

          {/* DATA DI MODIFICA */}

          {/* <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Data di modifica</Form.Label>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      placeholder="data di modifica"
                      className={classes.picker}
                      //id="date-picker-inline"
                      value={modifiedDate}
                      // onChange={(e) => setModifiedDate(e.target.value)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                    <Alert
                      severity="error"
                      id="alertModifiedDate"
                      style={{ display: "none" }}
                    >
                      Data Modifica is required!
                    </Alert>
                  </MuiPickersUtilsProvider>
                </Form.Group>
              </Paper> */}
        </Paper>
      </div>
      <Divider className={classes.divider} />
      <div className={classes.bottone}>
        {/* <ButtonClickedGreen
          className={classes.bottone}
          size="medium"
          nome="Crea"
          onClick={salva}
          exact
          to={<ModaleCreaTemplate />}
        /> */}
        <Button
          className="button-green"
          component={NavLink}
          size="medium"
          activeClassName="button-green-active"
          exact
          to="/editing/template"
        >
          ANNULLA
        </Button>
      </div>
    </Paper>
  );
};

const SecondStep = () => {
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
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paperModale: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      width: "fit-content",
      height: "80%",
    },
    paperBottom: {
      padding: "2%",
      backgrounColor: "#FFFFFF",
      //justifyContent: "center",
      flexDirection: "column",
      marginTop: "5%",
    },
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
    },
    intestazione: {
      color: "#47B881",
      marginTop: "5%",
      flexDirection: "row",
    },
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
      marginTop: "9px",
    },
    selectBar: {
      width: "50%",
      height: "100",
      marginTop: "50px",
    },
    divTextarea: {
      marginTop: "20px",
    },
  }));

  const classes = useStyles();
  const [openModalUploadCategory, setOpenModalUploadCategory] =
    React.useState(false);
  const [test, setTest] = React.useState("");

  const handleOpenModalUploadCategory = () => {
    setOpenModalUploadCategory(true);
  };

  const handleCloseUploadCategory = () => {
    setOpenModalUploadCategory(false);
  };
  const handleChange = (event) => {
    setTest(event.target.value);
  };

  const initialColumns = {
    Files: {
      id: "Files",
      list: [
        { id: "1", text: "file1" },
        { id: "2", text: "file2" },
        { id: "3", text: "file3" },
        { id: "4", text: "file4" },
      ],
    },
    Chiamato: {
      id: "Chiamato",
      list: [
        // { id: "5", text: "text5" },
        // { id: "6", text: "text6" },
      ],
    },
    Chiamanti: {
      id: "Chiamanti",
      list: [],
    },
  };

  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      console.log(start);
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <>
      <Modal
        className={classes.modal}
        open={openModalUploadCategory}
        onClose={handleCloseUploadCategory}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalUploadCategory}>
          <Paper className={classes.paper}>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h5">
                  Aggiungi una Categoria
                </Typography>
              </ListItem>
            </div>

            <div className={classes.paperBottom}>
              <Typography variant="h6">Seleziona Una categoria</Typography>

              <div className={classes.divTextarea}>
                <Typography className={classes.contenuto} variant="h11">
                  Categoria
                </Typography>
              </div>
              {/* <SelectBar nome="Seleziona" classeName={classes.selectBar} /> */}
              <FormControl variant="outlined" className={classes.selectBar}>
                <InputLabel
                  className={classes.inputLabel}
                  id="demo-simple-select-outlined-label"
                ></InputLabel>
                <Select
                  onChange={handleChange}
                  // label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Prova1</MenuItem>
                  <MenuItem value={20}>Prova2</MenuItem>
                  <MenuItem value={30}>Prova3</MenuItem>
                </Select>
              </FormControl>

              <div className={classes.bottoni}>
                <Button variant="contained" color="primary">
                  Aggiungi
                </Button>
              </div>
            </div>
          </Paper>
        </Fade>
      </Modal>
      <Fab color="secondary" aria-label="add" className={classes.margin}>
        <AddIcon onClick={handleOpenModalUploadCategory} />
      </Fab>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container direction={"row"} justify={"center"}>
          {Object.values(columns).map((column) => {
            console.log(column);
            return (
              <Grid item>
                <Column column={column} key={column.id} />
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
    </>
  );
};

const ThirdStep = () => {
  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const [data, setData] = useState([]);
  const [appearGroup, setAppearGroup] = useState([]);
  const [appearLevel, setAppearLevel] = useState([]);

  const [id, setId] = useState();
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [gruppo, setGruppo] = useState("");
  const [azienda, setAzienda] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [email, setEmail] = useState("");

  //-----------GET USER----------------------
  const getAllTemplate = () => {
    // var myHeaders = new Headers();

    // myHeaders.append("Authorization", bearer);
    // myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    // myHeaders.append("Access-Control-Allow-Credentials", "true");

    // var requestOptions = {
    //   method: "GET",
    //   headers: myHeaders,
    //   redirect: "follow",
    // };

    // fetch(`/api/user`, requestOptions)
    //   .then((response) => response.json())
    //   .then((result) => {
    //     setData(result.users);
    //   })
    //   .catch((error) => console.log("error", error));

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/fs/entityfolder/TEMPLATE/1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTemplate();
  }, []);

  console.log(data, "data");

  const columns = [
    {
      title: "ID",
      field: "id",
    },
    {
      title: "Data di creazione",
      field: "creationDate",
    },
    {
      title: "Data di Modifica",
      field: "modifiedDate",
    },
    {
      title: "Creato da",
      field: "createdBy",
    },
    {
      title: "Modificato da",
      field: "modifiedBy",
    },
    {
      title: "Version",
      field: "version",
    },

    {
      title: "Path",
      field: "path",
      // lookup: appearLevel.map((livelli) => {
      //   return livelli.nome;
      // }),
    },
    {
      title: "URL",
      field: "url",
    },
  ];
  // const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  const [open, setOpen] = React.useState(false);
  const [openModalUpload, setOpenModalUpload] = React.useState(false);

  const handleOpenModalUpload = () => {
    setOpenModalUpload(true);
  };

  const handleCloseUpload = () => {
    setOpenModalUpload(false);
  };

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setNome(rowData.nome);
    setCognome(rowData.cognome);
    setUsername(rowData.username);
    setAzienda(rowData.azienda);
    setEmail(rowData.email);
    setLevel(rowData.level);
    setGruppo(rowData.gruppo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    // aggiornaUtente();
    setOpen(false);
  };

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
      marginTop: "5%",
      flexDirection: "row",
      marginBottom: "5%",
    },
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
      marginTop: "9px",
    },
    bottone: {
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    divider: {
      marginTop: "3%",
      marginBottom: "5",
    },
    paperModale: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      width: "fit-content",
      height: "80%",
    },
    col: {
      padding: "5%",
    },
    row: {
      width: "600px",
    },
    textField: {
      width: "200px",
    },
    bottoneAnnulla: {
      width: "128px",
    },
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "20px",
    },
  }));

  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);

    console.log(event.target.files[0]);
  };

  const handleSubmission = () => {};

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Gestione File"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          filtering: true,
          searchFieldAlignment: "left",
          pageSizeOptions: [5, 10, 20, { value: data.length, label: "All" }],
          // selection: true,
          // grouping: true,
        }}
        // parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}
        localization={{
          header: {
            actions: "Azioni",
          },
        }}
        actions={[
          {
            icon: () => (
              <div className={classes.buttonRight}>
                <Button className="button-green">UPLOAD</Button>
              </div>
            ),
            tooltip: "UPLOAD",
            //onClick: () => funzioneFor(),
            onClick: () => handleOpenModalUpload(),
            isFreeAction: true,
          },
          {
            icon: () => <EditIcon />,
            // EDIT FUNCTION
            // tooltip: "Edit",
            // onClick: (event, rowData) => handleOpen(rowData),

            // position: "row",
          },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
        }}
        // DELETE FUNCTION
        // editable={{
        //   onRowDelete: (oldData) =>
        //     new Promise((resolve, reject) => {
        //       //Backend call
        //       var myHeaders = new Headers();
        //       myHeaders.append("Authorization", bearer);
        //       myHeaders.append("Content-Type", "application/json");
        //       myHeaders.append("Access-Control-Allow-Origin", acccessControl);
        //       myHeaders.append("Access-Control-Allow-Credentials", "true");

        //       var raw = JSON.stringify({
        //         id: oldData.id,
        //       });

        //       var requestOptions = {
        //         method: "DELETE",
        //         headers: myHeaders,
        //         body: raw,
        //         redirect: "follow",
        //       };

        //       fetch(`/api/user` + "?id=" + oldData.id, requestOptions)
        //         .then((response) => response.json())
        //         .then((result) => {
        //           getAllTemplate();
        //           resolve();
        //         })
        //         .catch((error) => console.log("error", error));
        //     }),
        // }}
      />
      <Modal
        className={classes.modal}
        open={openModalUpload}
        onClose={handleCloseUpload}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModalUpload}>
          <Paper className={classes.paper}>
            <div>
              <ListItem button>
                <ListItemIcon>
                  <BackupIcon className={classes.icon} />
                </ListItemIcon>
                <Typography className={classes.intestazione} variant="h5">
                  Carica i files XML
                </Typography>
              </ListItem>
            </div>

            <div className={classes.paperBottom}>
              {/* <Typography variant="h6">Seleziona Test Case</Typography>
              <div className={classes.divSelectBar}>
                <div className={classes.divTextarea}>
                  <Typography className={classes.contenuto} variant="h11">
                    Nome del Test
                  </Typography>
                </div>
                <SelectBar nome="Seleziona" classeName={classes.selectBar} />
              </div>

              <div className={classes.divTextarea}>
                <Typography className={classes.contenuto} variant="h11">
                  Descrizione
                </Typography>
              </div>
              <SelectBar nome="Seleziona" classeName={classes.selectBar} /> */}

              <div>
                <input
                  type="file"
                  name="file"
                  onChange={changeHandler}
                  multiple
                />
                <div className={classes.bottoni}>
                  <Button
                    variant="contained"
                    onClick={handleCloseUpload}
                    color="secondary"
                  >
                    Aggiorna
                  </Button>
                </div>
              </div>

              {/* <div className={classes.bottoni}>
                <Button variant="contained" color="secondary">
                  Schedula Test
                </Button>

                <Button variant="contained" color="primary">
                  Carica Test
                </Button>

                
              </div> */}
            </div>
          </Paper>
        </Fade>
      </Modal>
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
          <div>
            <Paper className={classes.paperModale} elevation={1}>
              <div>
                <ListItem button>
                  <Typography className={classes.intestazione} variant="h4">
                    Modifica Utente <b>{username}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form>
                <Row className={classes.row}>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={nome != "" ? false : true}
                      onChange={(e) => setNome(e.target.value)}
                      required
                      label="Nome"
                      defaultValue={nome}
                      helperText={nome != "" ? "" : "Il Nome è richiesto"}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={cognome != "" ? false : true}
                      onChange={(e) => setCognome(e.target.value)}
                      label="Cognome"
                      defaultValue={cognome}
                      helperText={cognome != "" ? "" : "Il Cognome è richiesto"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      id="standard-select-currency"
                      select
                      label="Gruppo"
                      value={appearGroup.id}
                      defaultValue={gruppo.id}
                      onChange={(e) => setGruppo(e.target.value)}
                    >
                      {appearGroup.map((gruppo) => (
                        <MenuItem key={gruppo.id} value={gruppo.id}>
                          {gruppo.nome}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={azienda != "" ? false : true}
                      onChange={(e) => setAzienda(e.target.value)}
                      label="Azienda"
                      defaultValue={azienda}
                      helperText={azienda != "" ? "" : "L'Azienda è richiesta"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={username != "" ? false : true}
                      onChange={(e) => setUsername(e.target.value)}
                      label="Username"
                      defaultValue={username}
                      helperText={
                        username != "" ? "" : "L'Username è richiesto"
                      }
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      id="standard-select-currency"
                      select
                      label="Ruolo"
                      value={appearLevel.id}
                      defaultValue={level.id}
                      onChange={(e) => setLevel(e.target.value)}
                    >
                      {appearLevel.map((level) => (
                        <MenuItem key={level.id} value={level.id}>
                          {level.nome}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                </Row>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={email != "" ? false : true}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      defaultValue={email}
                      helperText={email != "" ? "" : "L'Email è richiesto"}
                    />
                  </Col>
                </Row>
                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleClose2}
                  />
                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleClose}
                    nome="Annulla"
                  />
                </div>
              </Form>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};


