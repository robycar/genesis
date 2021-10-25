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
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import ButtonNotClickedGreen from "../../components/ButtonNotClickedGreen";
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
    marginLeft: "2%"
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
  paperModaleDelete: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "5%",
    height: "fit-content",
    width: 500,
    position: "relative",
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
  intestazione: {
    color: "#47B881",
    flexDirection: "row",
    alignItems: "center",
  },
  divIntestazione: {
    display: "flex",
    alignItems: "center",
    padding: "2%",
    marginBottom: "1%",
  },
  typography: {
    padding: "2%",
    marginTop: "1%"
  },
}));

//--------------------------FUNZIONI STEPPER------------------------------
function getSteps() {
  return [
    "Inserire nome test e descrizione",
    "Impostare Chiamato",
    "Impostare Chiamante/i",
    "Selezionare il Template",
  ];
}

//--------------------------FINE FUNZIONI STEPPER------------------------------

function EditingTestCreaTestCase() {
  var functions = localStorage.getItem("funzioni").split(",");

  let history = useHistory();
  const classes = useStyles();

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  const [openDrawer, setOpenDrawer] = useState([]);
  const [lineaChiamato, setLineaChiamato] = useState(0);
  const [OBPChiamato, setOBPChiamato] = useState(0);
  const [appearLinea, setAppearLinea] = useState([]);
  const [appearOBP, setAppearOBP] = useState([]);
  const [appearTemplete, setAppearTemplete] = useState([]);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [qntChiamanti, setQntChiamanti] = useState([]);
  let arrAppoggio = qntChiamanti;
  const [nChiamanti, setNChiamanti] = useState(qntChiamanti.length);
  const [lineaChiamante1, setLineaChiamante1] = useState(0);
  const [lineaChiamante2, setLineaChiamante2] = useState(0);
  const [lineaChiamante3, setLineaChiamante3] = useState(0);
  const [proxyChiamante1, setProxyChiamante1] = useState(0);
  const [proxyChiamante2, setProxyChiamante2] = useState(0);
  const [proxyChiamante3, setProxyChiamante3] = useState(0);
  const [templete, setTemplete] = useState(0);
  const [isErrore, setErrore] = useState(false);
  const [messaggioErr, setMessaggioErr] = useState("");

  /*------- get linea -----------*/

  const getLinea = () => {
    if (functions.indexOf("linea.view") !== -1) {
      var myHeaders = new Headers();

      myHeaders.append("Authorization", bearer);
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`/api/linea`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setAppearLinea(result.list);
        })
        .catch((error) => console.log("error", error));
    }
  };

  /*--------- get obp ---------*/

  const getOBP = () => {
    if (functions.indexOf("obp.view") !== -1) {
      var myHeaders = new Headers();

      myHeaders.append("Authorization", bearer);
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`/api/obp`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setAppearOBP(result.list);
        })
        .catch((error) => console.log("error", error));
    }
  };

  /*-------- get template ---------*/

  const getTemplete = () => {
    if (functions.indexOf("template.view") !== -1) {
      var myHeaders = new Headers();

      myHeaders.append("Authorization", bearer);
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`/api/template`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setAppearTemplete(result.list);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const checkRichiesta = (result) => {
    if (result.error == null) {
      history.push("/editing/testcase");
    } else if (result.error.code === "TEST-0004") {
      setMessaggioErr(
        "Il nome inserito per il TestCase è già stato assegnato ad un altro TestCase"
      );
      setErrore(true);
    } else {
      setMessaggioErr(result.error.description);
      setErrore(true);
    }
  };

  const Invia = () => {
    if (functions.indexOf("test.edit") !== -1) {
      const result = qntChiamanti.map(({ index, ...rest }) => ({ ...rest }));

      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");
      var raw = JSON.stringify({
        nome: nome,
        template: templete,
        descrizione: descrizione === "" ? " " : descrizione,
        expectedDuration: 57,
        chiamato: {
          linea: lineaChiamato,
          proxy: OBPChiamato,
        },
        chiamanti: result,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/testcase`, requestOptions)
        .then((response) => response.json())
        .then((result) => checkRichiesta(result))
        .catch((error) => console.log("error", error));
    }
  };

  const handleCloseErrore = () => {
    setErrore(false);
    setActiveStep(0);
  };

  //-----------------------SCRIPT STEPPER------------------------------

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      Invia();
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const addArr = () => {
    arrAppoggio.push({ linea: 0, proxy: 0, index: arrAppoggio.length });
    setQntChiamanti(arrAppoggio);
    setNChiamanti(qntChiamanti.length);
  };

  const removeArr = () => {
    arrAppoggio.pop();
    setQntChiamanti(arrAppoggio);
    setNChiamanti(qntChiamanti.length);

    switch (qntChiamanti.length) {
      case 0:
        setLineaChiamante1(0);
        setProxyChiamante1(0);
        break;
      case 1:
        setLineaChiamante2(0);
        setProxyChiamante2(0);
        break;
      case 2:
        setLineaChiamante3(0);
        setProxyChiamante3(0);
        break;

      default:
        break;
    }
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

  useEffect(() => {
    getLinea();
    getTemplete();
    getOBP();
  }, [qntChiamanti]);

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
        <div className={classes.toolbarIcon}></div>
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
        <ButtonEditingTest nome="testcase"/>

        {/* ----------------------------CREA TEST CASE---------------------------------------- */}

        <Paper className={classes.paper} elevation={2}>
          <CreaItem titolo="Crea Test Case" />

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
                    Nome è richiesto!
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
                    Descrizione è richiesta
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
                                key={linea.id}
                                value={linea.id}
                              >
                                {linea.campiConcatenati}
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
                              <Form.Label>Linea</Form.Label>
                              <FormControl
                                variant="outlined"
                                className={classes.formControl}
                              >
                                <Select
                                  id="selectLinea"
                                  value={qntChiamanti.index}
                                  defaultValue={index.linea}
                                  onChange={(e) => {
                                    console.log(lineaChiamato);
                                    arrAppoggio[index.index].linea =
                                      e.target.value;
                                    setQntChiamanti(arrAppoggio);
                                    index.index === 0
                                      ? setLineaChiamante1(e.target.value)
                                      : index.index === 1
                                      ? setLineaChiamante2(e.target.value)
                                      : index.index === 2
                                      ? setLineaChiamante3(e.target.value)
                                      : setLineaChiamante1(e.target.value);
                                  }}
                                >
                                  {appearLinea.map((linea) => {
                                    return (
                                      <MenuItem
                                        key={linea.id}
                                        value={linea.id}
                                      >
                                        {linea.campiConcatenati}
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
                                  color:
                                    index.index === 0
                                      ? lineaChiamante1 === 0
                                        ? "grey"
                                        : "black"
                                      : index.index === 1
                                      ? lineaChiamante2 === 0
                                        ? "grey"
                                        : "black"
                                      : index.index === 2
                                      ? lineaChiamante3 === 0
                                        ? "grey"
                                        : "black"
                                      : false,
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
                                  value={qntChiamanti.index}
                                  defaultValue={index.proxy}
                                  disabled={
                                    index.index === 0
                                      ? lineaChiamante1 === 0
                                      : index.index === 1
                                      ? lineaChiamante2 === 0
                                      : index.index === 2
                                      ? lineaChiamante3 === 0
                                      : false
                                  }
                                  onChange={(e) => {
                                    arrAppoggio[index.index].proxy =
                                      e.target.value;
                                    index.index === 0
                                      ? setProxyChiamante1(e.target.value)
                                      : index.index === 1
                                      ? setProxyChiamante2(e.target.value)
                                      : index.index === 2
                                      ? setProxyChiamante3(e.target.value)
                                      : setProxyChiamante1(e.target.value);
                                    setQntChiamanti(arrAppoggio);
                                  }}
                                >
                                  {appearOBP.map((proxy) => {
                                    return (
                                      <MenuItem
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
                    ? proxyChiamante1 === 0
                      ? true
                      : false
                    : nChiamanti === 2
                    ? proxyChiamante2 === 0
                      ? true
                      : false
                    : false
                    ? false
                    : true
                }
              />
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
                            value={templete}
                            onChange={(e) => setTemplete(e.target.value)}
                          >
                            {appearTemplete.map((templete) => {
                              return (
                                <MenuItem key={templete.id} value={templete.id}>
                                  {templete.nome}
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
                        functions.indexOf("template.view") === -1 ||
                        functions.indexOf("linea.view") === -1 ||
                        functions.indexOf("obp.view") === -1 ||
                        (activeStep === 0 && nome === "")
                          ? true
                          : activeStep === 1 && OBPChiamato === 0
                          ? true
                          : activeStep === 2 &&
                            (nChiamanti === 0
                              ? false
                              : nChiamanti === 1
                              ? proxyChiamante1 === false
                                ? true
                                : false
                              : nChiamanti === 2
                              ? proxyChiamante2 === false
                                ? true
                                : false
                              : nChiamanti === 3
                              ? proxyChiamante3 === false
                                ? true
                                : false
                              : false)
                          ? true
                          : activeStep === 3 && templete === 0
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
        {/* ------------------------MODALE ERROR-------------------- */}
        <Modal
          className={classes.modal}
          open={isErrore}
          onClose={handleCloseErrore}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isErrore}>
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
                    {messaggioErr}
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
                      onClick={handleCloseErrore}
                      nome="OK"
                    />
                  </div>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
      </main>
    </div>
  );
}

export default EditingTestCreaTestCase;
