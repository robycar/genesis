import React, { useState, useEffect } from "react";
import clsx from "clsx";
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
import { Typography, Fade } from "@material-ui/core";
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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Form from "react-bootstrap/Form";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import acccessControl from "../../service/url";
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Prova from "../../components/Prova";
import { blue } from "@material-ui/core/colors";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";

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
    boxShadow: "none",
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
    flexDirection: "column",
    marginTop: "5%",
  },
  paperContainer1: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    marginRight: "8%",
  },
  paperContainer2: {
    flexDirection: "column",
    padding: "20px",
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
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "24px",
    color: "#66788A",
    lineHeight: "20px",
    padding: "2%",
    // marginTop: "2%",
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

  paper2: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 6, 3),
  },
  modal: {
    display: "flex",
    marginBottom: "5%",
    alignItems: "center",
    justifyContent: "center",
  },

  paperBottom: {
    display: "flex",
    flexDirection: "column",
    backgrounColor: "#FFFFFF",
    justifyContent: "center",
    marginTop: "5%",
    marginBottom: "2px",
    padding: "5%",
  },

  intestazione: {
    color: "#47B881",
    marginTop: "5%",
  },
  icon: {
    transform: "scale(1.8)",
    color: "#47B881",
    marginTop: "8px",
  },
  bottoni: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  divider2: {
    marginTop: "6%",
    marginBottom: "5%",
  },
  input: {
    display: "none",
  },
  fileContainer: {
    border: "1px solid blue",
    height: "100%",
    width: "100%",
  },

  // containerFileUpload: {

    
  // },
}));

//--------------------------FUNZIONI STEPPER------------------------------
function getSteps() {
  return [
    "Inserire nome durata tipo template e descrizione",
    "Carica i files XML",
    "Impostare Chiamato",
    "Impostare Chiamante/i",
    // "Gestisci i files XML",
    // "Template",
  ];
}

//--------------------------FINE FUNZIONI STEPPER------------------------------

function EditingTemplateCreaTemplate() {
  let history = useHistory();
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState([]);
  const [nome, setNome] = useState("");
  const [durata, setDurata] = useState(0);
  const [descrizione, setDescrizione] = useState("");
  const [tipoTemplate, setTipoTemplate] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [activeStep, setActiveStep] = React.useState(0);
  const [chiamato, setChiamato] = useState("");
  const [chiamanti, setChiamanti] = useState("");
  const [qntChiamanti, setQntChiamanti] = useState([]);
  const [nChiamanti, setNChiamanti] = useState(qntChiamanti.length);
  const [chiamante1, setChiamante1] = useState(false);
  const [chiamante2, setChiamante2] = useState(false);
  const [chiamante3, setChiamante3] = useState(false);

  let arrAppoggio = qntChiamanti;
  var arrayChiamanti = [];

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
    setIsSelected(true);

    // console.log(event.target.files);
  };

  const arrayValue = Object.values(selectedFile);
  // console.log(arrayValue[0]);

  const handleSubmission = () => {};

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // getTypeId();
    // getLinea();
    // getFile();
    // getOBP();
    // getTemplate();
  }, []);

  const handleChangeName = (e) => {
    setNome(e.target.value);
  };
  const handleChangeDurata = (e) => {
    setDurata(e.target.value);
  };
  const handleChangeDescrizione = (e) => {
    setDescrizione(e.target.value);
  };
  const handleChangeTipoTemplate = (e) => {
    setTipoTemplate(e.target.value);
  };

  const handleChangeChiamato = (e) => {
    setChiamato(e.target.value);
  };

  useEffect(() => {
    if (activeStep === 0) {
      if (nome === "" || durata === 0 || tipoTemplate === "") {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }

    if (activeStep === 1) {
      if (arrayValue.length === 0) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }

    if (activeStep === 2) {
      if (chiamato === "") {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }

    if (activeStep === 3) {
      if (nChiamanti === 0) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }

    if (activeStep === 3) {
      if (
        nChiamanti <= 3 && nChiamanti === 0
          ? false
          : nChiamanti === 1
          ? chiamante1 === false
            ? true
            : false
          : nChiamanti === 2
          ? chiamante2 === false
            ? true
            : false
          : nChiamanti === 3
          ? chiamante3 === false
            ? true
            : false
          : false
          ? false
          : true
      ) {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }
  }, [
    nome,
    durata,
    tipoTemplate,
    arrayValue,
    chiamato,
    nChiamanti,
    chiamante1,
    chiamante2,
  ]);

  // console.log(chiamato, "sono chiamato");

  const Invia = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var formdata = new FormData();
    formdata.append("nome", nome);
    formdata.append("durata", durata);
    formdata.append("typeTemplate", tipoTemplate);
    formdata.append("descrizione", descrizione);

    if (chiamato !== "") {
      formdata.append("chiamato", chiamato);
    }
    if (qntChiamanti[0]?.linea) {
      formdata.append("chiamanti", qntChiamanti[0].linea);
      
    }
    if (qntChiamanti[1]?.linea) {
      formdata.append("chiamanti", qntChiamanti[1].linea);
    }
    if (arrayValue[0]?.name) {
      formdata.append("file", arrayValue[0], arrayValue[0].name);
    }
    if (arrayValue[1]?.name) {
      formdata.append("file", arrayValue[1], arrayValue[1].name);
    }
    if (arrayValue[1]?.name) {
      formdata.append("file", arrayValue[2], arrayValue[2].name);
    }

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`/api/template`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    // window.location = "/editing/template";
  };

  // if (
  //   nome !== "" &&
  //   durata !== "" &&
  //   descrizione !== "" &&
  //   tipoTemplate !== ""
  // ) {
  //   Invia();
  //   // console.log(ip);
  // } else {
  //   if (nome === "") {
  //     document.getElementById("alertIP").style.display = "";
  //   } else {
  //     document.getElementById("alertIP").style.display = "none";
  //   }
  //   if (durata === "") {
  //     document.getElementById("alertNome").style.display = "";
  //   } else {
  //     document.getElementById("alertNome").style.display = "none";
  //   }
  //   if (descrizione === "") {
  //     document.getElementById("alertPassword").style.display = "";
  //   } else {
  //     document.getElementById("alertPassword").style.display = "none";
  //   }
  //   if (tipoTemplate === "") {
  //     document.getElementById("alertDescrizione").style.display = "";
  //   } else {
  //     document.getElementById("alertDescrizione").style.display = "none";
  //   }
  // }

  //-------------------------CHIAMANTI E CHIAMATO --------------------------

  const addArr = () => {
    arrAppoggio.push({ linea: 0, proxy: 0, index: arrAppoggio.length });
    setQntChiamanti(arrAppoggio);
    setNChiamanti(qntChiamanti.length);
    console.log(qntChiamanti);
    console.log(qntChiamanti[0].linea, "Quantita");
  };

  const removeArr = () => {
    arrAppoggio.pop();
    setQntChiamanti(arrAppoggio);
    setNChiamanti(qntChiamanti.length);
    // console.log(qntChiamanti);

    switch (qntChiamanti.length) {
      case 0:
        setChiamante1(false);

        break;
      case 1:
        setChiamante2(false);

        break;
      case 2:
        setChiamante3(false);

        break;

      default:
        break;
    }
  };

  //--------------------MODALI TYPE LINEE---------------------------------

  const [open, setOpen] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };

  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  //--------------------MODAALE 2----------------------------------

  const [open2, setOpen2] = React.useState(false);
  const [type, setType] = React.useState("");

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const bearer = `Bearer ${localStorage.getItem("token")}`;
  // const checkRichiesta = (result) => {
  //   console.log(result);
  //   setTypeLineaId(result.id);
  // };

  const salva2 = () => {
    const Invia = () => {
      //PUT
    };

    if (type !== "") {
      Invia();
      handleClose();
      handleClose2();
    } else {
    }
  };

  //-----------------------SCRIPT STEPPER------------------------------

  const steps = getSteps();

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      Invia();
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // disabilitaNext();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Navbar />
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !openDrawer && classes.drawerPaperClose
          ),
        }}
        open={openDrawer}
      >
        
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
            to="/editing/template/createmplate"
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

        {/* ----------------------------CREA TEST generatore---------------------------------------- */}

        <Paper className={classes.paper} elevation={2}>
          <CreaItem titolo="Crea Template" />

          <Divider className={classes.divider} />

          {/* ------------------------STEP 1--------------------------------- */}
          <div
            className={classes.generalContainer}
            style={{ display: activeStep === 0 ? "" : "none" }}
          >
            <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Nome" required>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Nome"
                    onChange={(e) => {
                      handleChangeName(e);
                    }}
                    required
                  />
                  <Alert
                    severity="error"
                    id="alertNome"
                    style={{ display: "none" }}
                  >
                    Nome è richiesto!
                  </Alert>
                </Form.Group>
              </Paper>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Nome">
                  <Form.Label>Durata</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="number"
                    placeholder="Inserisci Durata"
                    onChange={(e) => {
                      handleChangeDurata(e);
                    }}
                  />
                  <Alert
                    severity="error"
                    id="alertDescrizione"
                    style={{ display: "none" }}
                  >
                    Durata è richiesta
                  </Alert>
                </Form.Group>
              </Paper>
            </Paper>

            <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Nome">
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Descrizione"
                    onChange={(e) => {
                      handleChangeDescrizione(e);
                    }}
                  />
                  <Alert
                    severity="error"
                    id="alertDescrizione"
                    style={{ display: "none" }}
                  >
                    Descizione è richiesta
                  </Alert>
                </Form.Group>
              </Paper>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Nome" required>
                  <Form.Label>Tipo template</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Tipo template"
                    onChange={(e) => {
                      handleChangeTipoTemplate(e);
                    }}
                    required
                  />
                  <Alert
                    severity="error"
                    id="alertNome"
                    style={{ display: "none" }}
                  >
                    Nome è richiesto!
                  </Alert>
                </Form.Group>
              </Paper>
            </Paper>
          </div>

          {/* ------------------------STEP 2--------------------------------- */}
          <div
            className={classes.generalContainer}
            style={{ display: activeStep === 1 ? "" : "none" }}
          >
            <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <>
                  <input
                    // accept=".xml"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="file"
                    onChange={changeHandler}
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      onClick={handleSubmission}
                    >
                      Carica
                    </Button>
                  </label>
                </>
                <div className={classes.containerFileUpload}>
                  {arrayValue.map((file) => {
                    return (
                      <h5 key={file.name} value={file.name}>
                        {file.name}
                      </h5>
                    );
                  })}
                </div>
              </Paper>
            </Paper>
          </div>

          {/* ------------------------STEP 3--------------------------------- */}
          <div
            className={classes.generalContainer}
            style={{ display: activeStep === 2 ? "" : "none" }}
          >
            <div className={classes.bodyContainer}>
              <>
                <Typography className={classes.intestazione} variant="h6">
                  Chiamato
                </Typography>
                <Row>
                  <Col className={classes.col}>
                    <Form.Group controlId="form.Numero">
                      <Form.Label>Seleziona il file del Chiamato</Form.Label>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          id="selectLinea"
                          value={chiamato}
                          onChange={(e) => handleChangeChiamato(e)}
                        >
                          {arrayValue.map((file) => {
                            return (
                              <MenuItem key={file.name} value={file.name}>
                                {file.name}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <Alert
                          severity="error"
                          id="alertLinea"
                          style={{ display: "none" }}
                        >
                          Selezionare il file del Chiamato
                        </Alert>
                      </FormControl>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            </div>
          </div>

          {/* ------------------------STEP 4--------------------------------- */}
          <div
            className={classes.generalContainer}
            style={{
              display: activeStep === 3 ? "" : "none",
            }}
          >
            <div className={classes.bodyContainer}>
              <div className={classes.bodyContainer}>
                {qntChiamanti.map((index) => {
                  return (
                    <div>
                      <>
                        <Typography
                          className={classes.intestazione}
                          variant="h6"
                        >
                          Chiamante <b>{index.index + 1}</b>
                        </Typography>
                        <Row>
                          <Col className={classes.col}>
                            <Form.Group controlId="form.Numero">
                              <Form.Label>
                                Seleziona il file del Chiamate{" "}
                                <b>{index.index + 1}</b>{" "}
                              </Form.Label>
                              <FormControl
                                variant="outlined"
                                className={classes.formControl}
                              >
                                <Select
                                  id="selectLinea"
                                  value={qntChiamanti.index}
                                  defaultValue={index.linea}
                                  onChange={(e) => {
                                    arrAppoggio[index.index].linea =
                                      e.target.value;

                                    setChiamanti(e.target.value);
                                    setQntChiamanti(arrAppoggio);
                                    // arrayChiamanti.push(chiamanti);
                                    // console.log(arrayChiamanti);

                                    index.index === 0
                                      ? setChiamante1(true)
                                      : index.index === 1
                                      ? setChiamante2(true)
                                      : index.index === 2
                                      ? setChiamante3(true)
                                      : setChiamante1(false);
                                  }}
                                >
                                  {arrayValue.map((file) => {
                                    return (
                                      <MenuItem
                                        key={file.name}
                                        value={file.name}
                                      >
                                        {file.name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                                <Alert
                                  severity="error"
                                  id="alertLinea"
                                  style={{ display: "none" }}
                                >
                                  Selezionare la Linea
                                </Alert>
                              </FormControl>
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    </div>
                  );
                })}
              </div>
              Quanti chiamanti vuoi inserire &nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                color="secondary"
                startIcon={<RemoveIcon />}
                onClick={removeArr}
                disabled={nChiamanti < 1 ? true : false}
              />
              &nbsp;&nbsp;&nbsp;
              <TextField
                type="number"
                style={{ width: "10px" }}
                value={nChiamanti}
              />
              &nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addArr}
                disabled={
                  nChiamanti < 3 && nChiamanti === 0
                    ? false
                    : nChiamanti === 1
                    ? chiamante1 === false
                      ? true
                      : false
                    : nChiamanti === 2
                    ? chiamante2 === false
                      ? true
                      : false
                    : false
                    ? false
                    : true
                }
              />
            </div>
          </div>
          <Divider className={classes.divider} />

          {/* -----------------------------------BOTTONI STEP------------------------------------ */}
          <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed
                  </Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  <div>
                    <Button
                      onClick={() => {
                        activeStep === 0
                          ? history.push("/editing/template")
                          : handleBack();
                      }}
                      className={classes.backButton}
                    >
                      {activeStep === 0 ? "annulla" : "indietro"}
                    </Button>

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      disabled={nextDisabled}
                    >
                      {activeStep === steps.length - 1 ? "Crea" : "Avanti"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* <div className={classes.bottone}>
            <ButtonClickedGreen
              className={classes.bottone}
              size="medium"
              nome="Crea"
              onClick={salva}
            />
            <Button
              component={NavLink}
              className="button-green-disactive"
              exact
              to="/editing/linee"
              variant="contained"
              size="medium"
            >
              annulla
            </Button>
          </div> */}
        </Paper>
      </main>
    </div>
  );
}

export default EditingTemplateCreaTemplate;
