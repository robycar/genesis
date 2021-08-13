import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "../../components/Navbar";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Alert from "@material-ui/lab/Alert";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";

import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
  quaterListItems,
} from "../../components/listItems";
import NavbarItemEdit from "../../components/NavbarItemEdit";
import ButtonClickedGreen from "../../components/ButtonClickedGreen";
import { MenuItem, Paper } from "@material-ui/core";
import CreaItem from "../../components/CreaItem";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import ModaleCreaTemplate from "../../components/ModaleCreaTemplate";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Form from "react-bootstrap/Form";
import { SettingsPhoneTwoTone } from "@material-ui/icons";
import acccessControl from "../../service/url.js";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    //backgroundColor: "yellow",
    alignItems: "center",
    marginLeft: "1%",
  },
  fixedHeight: {
    height: 240,
  },
  buttonContainer: {
    marginBottom: "20px",
    marginLeft: "1%",
  },
  generalContainer: {
    display: "flex",
    marginTop: "5%",
  },
  paperContainer1: {
    display: "flex",
    flexDirection: "column",
    // padding: "20px",
    marginRight: "8%",
  },
  paperContainer2: {
    flexDirection: "column",
    // padding: "20px",
    marginBottom: "10%",
  },
  divSelect: {
    padding: "5%",
    // height: "115.6px",
  },
  bottone: {
    marginLeft: "65%",
    marginTop: "2%",
  },
  divider: {
    width: "90%",
    marginLeft: "5%",
    lineHeight: "1px",
    marginTop: "2%",
  },
  titolo: {
    marginBottom: "2%",
  },
  InputSelect: {
    width: "364.8px",
  },
  modaleAddLinea: {
    marginLeft: "75%",
  },
  formControl: {
    margin: theme.spacing(1),
    // width: "20vw",
    width: "340px",
    display: "flex",
  },
  formControlIp: {
    margin: theme.spacing(1),
    width: "70px",
  },
  divIp: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  separatoreIp: {
    marginBottom: "2%",
    fontWeight: "600px",
    lineHeigth: "2%",
    //fontSize: "2px",
  },
  select: {
    widht: "380x",
    height: "40px",
    padding: "2%",
    alignItems: "center",
  },
  containerTextField: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  picker: {
    marginLeft: "3%",
  },
}));

function EditingTemplateCreaTemplate() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  //   const [data, setData] = useState([]);
  //   const [id, setid] = useState("");
  const [nome, setNome] = useState("");
  const [durata, setDurata] = useState("");
  const [typeTemplate, setTypeTemplate] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [version, setVersion] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  //   const [selectedDate, setSelectedDate] = useState("" );

  //   const handleDateChange = (date) => {
  //     setSelectedDate(date);
  //   };

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
        creationDate: creationDate,
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Navbar />
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{tertiaryListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
        <Divider />
        <List>{quaterListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.containerNavbarItem}>
            <NavbarItemEdit fontSize="large" />
          </div>
        </Container>
        <div className={classes.buttonContainer}>
          <Button
            className="button-green"
            component={NavLink}
            activeClassName="button-green-active"
            exact
            to="/editing/linee"
          >
            LINEE
          </Button>
          {/* </NavLink> */}

          {/* <NavLink exact to="/dashboard/testsuite"> */}
          <Button
            className="button-green"
            component={NavLink}
            activeClassName="button-green-active"
            exact
            to="/editing/outboundproxy"
          >
            OUTBOUND PROXY
          </Button>
          <Button
            className="button-green"
            component={NavLink}
            activeClassName="button-green-active"
            exact
            to="/editing/template"
          >
            TEMPLATE
          </Button>
          <Button
            className="button-green"
            component={NavLink}
            activeClassName="button-green-active"
            exact
            to="/editing/testcase"
          >
            TEST
          </Button>
        </div>

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
                    //onChange={(e) => setNome(e.target.value)}
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

              <Paper className={classes.divSelect} elevation={0}>
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
                      value={creationDate}
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
              </Paper>

              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Descrizione"
                    // onChange={(e) => setDescrizione(e.target.value)}
                  />
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
                  <Form.Label>Type Template</Form.Label>
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

              <Paper className={classes.divSelect} elevation={0}>
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
              </Paper>
            </Paper>
          </div>
          <Divider className={classes.divider} />
          <div className={classes.bottone}>
            <ButtonClickedGreen
              className={classes.bottone}
              size="medium"
              nome="Crea"
              onClick={salva}
              exact
              to={<ModaleCreaTemplate />}
            />
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
      </main>
    </div>
  );
}

export default EditingTemplateCreaTemplate;
