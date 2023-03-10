import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "../../components/Navbar";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import { Typography, Fade } from "@material-ui/core";
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
  quaterListItems,
} from "../../components/listItems";
import NavbarItemEdit from "../../components/NavbarItemEdit";
import { MenuItem, Paper } from "@material-ui/core";
import CreaItem from "../../components/CreaItem";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Form from "react-bootstrap/Form";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { getGenerale, putGenerale } from "../../service/api";
import {
  ButtonEditing,
  ButtonEditingTest,
} from "../../components/ButtonBarraNavigazione";

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
    marginLeft: "2%",
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
    alignItems: "center",
  },
  fixedHeight: {
    height: 240,
  },

  generalContainer: {
    display: "flex",
    marginTop: "5%",
  },
  paperContainer1: {
    display: "flex",
    flexDirection: "column",
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
  },
  InputSelect: {
    width: "364.8px",
  },
  modaleAddLinea: {
    marginLeft: "75%",
  },
  formControl: {
    margin: theme.spacing(1),
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
  buttonTestContainer: {
    marginTop: "2%",
  },
  buttonTestContainer: {
    marginTop: "2%",
  },
}));

//--------------------------FUNZIONI STEPPER------------------------------
function getSteps() {
  return [
    "Inserire nome test e descrizione",
    "Impostare Chiamato",
    "Impostare Chiamante",
    "Selezionare il Template",
  ];
}

//--------------------------FINE FUNZIONI STEPPER------------------------------

function EditingTestCreaTestGeneratore() {
  var functions = localStorage.getItem("funzioni").split(",");

  let history = useHistory();
  const classes = useStyles();
  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;
  const [openDrawer, setOpenDrawer] = useState([]);
  const [lineaChiamato, setLineaChiamato] = useState(0);
  const [lineaChiamante, setLineaChiamante] = useState(0);
  const [OBPChiamato, setOBPChiamato] = useState(0);
  const [OBPChiamante, setOBPChiamante] = useState(0);
  const [appearLinea, setAppearLinea] = useState([]);
  const [appearOBP, setAppearOBP] = useState([]);
  const [appearTemplate, setAppearTemplate] = useState([]);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [template, setTemplate] = useState(0);

  /*------- get linea -----------*/
  const funzioneGetAll = () => {
    if (
      functions.indexOf("template.view") !== -1 &&
      functions.indexOf("obp.view") !== -1 &&
      functions.indexOf("lineagen.view") !== -1
    ) {
      //----GET APPEAR TEMPLATE----
      (async () => {
        setAppearTemplate((await getGenerale("template")).list);
      })();

      //-----GET APPEAR OBP-----
      (async () => {
        setAppearOBP((await getGenerale("obp")).list);
      })();

      //-----GET APPEAR LIST-----
      (async () => {
        setAppearLinea((await getGenerale("lineageneratore")).list);
      })();
    }
  };

  const funzioneAggiungiTestgeneratore = () => {
    if (functions.indexOf("testgen.view") !== -1) {
      //----AGGIUNGI GRUPPO------
      (async () => {
        await putGenerale("testgen", {
          nome: nome,
          template: template,
          descrizione: descrizione === "" ? " " : descrizione,
          lineaChiamante: lineaChiamante,
          lineaChiamato: lineaChiamato,
          proxyChiamante: OBPChiamante,
          proxyChiamato: OBPChiamato,
        });
        history.push("/editing/testgeneratore");
      })();
    }
  };

  //-----------------------SCRIPT STEPPER------------------------------

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      funzioneAggiungiTestgeneratore();
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeName = (e) => {
    setNome(e.target.value);
  };
  const handleChangeDescrizione = (e) => {
    setDescrizione(e.target.value);
  };
  const handleChangeLineaChiamato = (e) => {
    setLineaChiamato(e.target.value);
  };
  const handleChangeOBPChiamato = (e) => {
    setOBPChiamato(e.target.value);
  };
  const handleChangeLineaChiamante = (e) => {
    setLineaChiamante(e.target.value);
  };
  const handleChangeOBPChiamante = (e) => {
    setOBPChiamante(e.target.value);
  };

  useEffect(() => {
    funzioneGetAll();
  }, []);

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

        <ButtonEditing nome="test"/>
        <ButtonEditingTest nome="testgeneratore"/>

        {/* ----------------------------CREA TEST CASE---------------------------------------- */}

        <Paper className={classes.paper} elevation={2}>
          <CreaItem titolo="Crea Test Generatore" />

          <Divider className={classes.divider} />

          {/* ------------------------STEP 1--------------------------------- */}
          <div
            className={classes.generalContainer}
            style={{ display: activeStep === 0 ? "" : "none" }}
          >
            <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Nome">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Nome"
                    onChange={(e) => {
                      handleChangeName(e);
                    }}
                  />
                  <Alert
                    severity="error"
                    id="alertNome"
                    style={{ display: "none" }}
                  >
                    Nome ?? richiesto!
                  </Alert>
                </Form.Group>
              </Paper>
            </Paper>

            <Paper className={classes.paperContainer2} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Nome">
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Descrizione"
                    onChange={(e) => handleChangeDescrizione(e)}
                  />
                  <Alert
                    severity="error"
                    id="alertDescrizione"
                    style={{ display: "none" }}
                  >
                    Descrizione ?? richiesta
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
            <div className={classes.bodyContainer}>
              <>
                <Typography className={classes.intestazione} variant="h6">
                  Chiamato
                </Typography>
                <Row>
                  <Col className={classes.col}>
                    <Form.Group controlId="form.Numero">
                      <Form.Label>Linea</Form.Label>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          id="selectLinea"
                          value={lineaChiamato}
                          onChange={(e) => handleChangeLineaChiamato(e)}
                        >
                          {appearLinea.map((linea) => {
                            return (
                              <MenuItem
                                disabled={linea.id === lineaChiamante}
                                key={linea.id}
                                value={linea.id}
                              >
                                {linea.ip +
                                  ":" +
                                  linea.porta +
                                  "-" +
                                  linea.typeLinea.descrizione}
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
                  <Col className={classes.col}>
                    <Form.Group>
                      <Form.Label
                        style={{
                          color: lineaChiamato === 0 ? "grey" : "black",
                        }}
                      >
                        OBP
                      </Form.Label>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          id="selectOBP"
                          value={OBPChiamato}
                          onChange={(e) => handleChangeOBPChiamato(e)}
                          disabled={lineaChiamato === 0}
                        >
                          {appearOBP.map((proxy) => {
                            return (
                              <MenuItem
                                disabled={proxy.id === OBPChiamante}
                                key={proxy.id}
                                value={proxy.id}
                              >
                                {proxy.campiConcatenati}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <Alert
                          severity="error"
                          id="alertOBP"
                          style={{ display: "none" }}
                        >
                          Selezionare l'OBP
                        </Alert>
                      </FormControl>
                    </Form.Group>
                  </Col>
                </Row>
              </>
            </div>
          </div>
          {/* ------------------------STEP 3--------------------------------- */}
          <div
            className={classes.generalContainer}
            style={{ display: activeStep === 2 ? "" : "none" }}
          >
            <div className={classes.bodyContainer}>
              <>
                <Typography className={classes.intestazione} variant="h6">
                  Chiamante
                </Typography>
                <Row>
                  <Col className={classes.col}>
                    <Form.Group controlId="form.Numero">
                      <Form.Label>Linea</Form.Label>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          id="selectLinea"
                          value={lineaChiamante}
                          onChange={(e) => handleChangeLineaChiamante(e)}
                        >
                          {appearLinea.map((linea) => {
                            return (
                              <MenuItem
                                disabled={linea.id === lineaChiamato}
                                key={linea.id}
                                value={linea.id}
                              >
                                {linea.ip +
                                  ":" +
                                  linea.porta +
                                  "-" +
                                  linea.typeLinea.descrizione}
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
                  <Col className={classes.col}>
                    <Form.Group>
                      <Form.Label
                        style={{
                          color: lineaChiamante === 0 ? "grey" : "black",
                        }}
                      >
                        OBP
                      </Form.Label>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          id="selectOBP"
                          value={OBPChiamante}
                          onChange={(e) => handleChangeOBPChiamante(e)}
                          disabled={lineaChiamante === 0}
                        >
                          {appearOBP.map((proxy) => {
                            return (
                              <MenuItem
                                disabled={proxy.id === OBPChiamato}
                                key={proxy.id}
                                value={proxy.id}
                              >
                                {proxy.campiConcatenati}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        <Alert
                          severity="error"
                          id="alertOBP"
                          style={{ display: "none" }}
                        >
                          Selezionare l'OBP
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
            style={{ display: activeStep === 3 ? "" : "none" }}
          >
            <div className={classes.bodyContainer}>
              <div className={classes.bodyContainer}>
                <>
                  <Typography className={classes.intestazione} variant="h6">
                    Template
                  </Typography>
                  <Row>
                    <Col className={classes.col}>
                      <Form.Group controlId="form.Numero">
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <Select
                            id="selectLinea"
                            value={template}
                            onChange={(e) => setTemplate(e.target.value)}
                          >
                            {appearTemplate.map((template) => {
                              return (
                                <MenuItem key={template.id} value={template.id}>
                                  {template.nome}
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
                ""
              ) : (
                <div>
                  <div>
                    <Button
                      onClick={() => {
                        activeStep === 0
                          ? history.push("/editing/testcase")
                          : handleBack();
                      }}
                      className={classes.backButton}
                    >
                      {activeStep === 0 ? "annulla" : "indietro"}
                    </Button>
                    <Button
                      disabled={
                        activeStep === 0 && nome === ""
                          ? true
                          : activeStep === 1 && OBPChiamato === 0
                          ? true
                          : activeStep === 2 && OBPChiamante === 0
                          ? true
                          : activeStep === 3 && template === 0
                      }
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Crea" : "Avanti"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Paper>
      </main>
    </div>
  );
}

export default EditingTestCreaTestGeneratore;
