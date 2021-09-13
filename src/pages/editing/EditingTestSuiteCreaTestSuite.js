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
import TestSuiteSelectNew from "../../components/TestSuiteSelectNew";
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
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { file } from "@babel/types";

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
  buttonTestContainer: {
    marginTop: "2%",
  },
  buttonTestContainer: {
    marginTop: "2%",
  },
  
}));

//--------------------------FUNZIONI STEPPER------------------------------
function getSteps() {
  return ['Inserire nome test e descrizione', 'Selezionare i Test Case da associare'];
}

//--------------------------FINE FUNZIONI STEPPER------------------------------

function EditingTestCreaTestSuite() {
  const classes = useStyles();

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  const [openDrawer, setOpenDrawer] = useState([]);

  //const [lineaChiamato, setLineaChiamato] = useState(0);
  // const [OBPChiamato, setOBPChiamato] = useState(0);
  // const [appearLinea, setAppearLinea] = useState([]);
  // const [appearOBP, setAppearOBP] = useState([]);
  // const [appearFile, setAppearFile] = useState([]);

  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");

  // const [qntChiamanti, setQntChiamanti] = useState([]);
  // const [nChiamanti, setNChiamanti] = useState(qntChiamanti.length);
  // let arrAppoggio = qntChiamanti;

  const [nextDisabled, setNextDisabled] = useState(true);


  /*------- get linea -----------*/

  const getTestCase = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    // console.log(bearer.toString());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      // .then((result) => {
      //   setAppearLinea(result.list);
      // })
      .catch((error) => console.log("error", error));
  };

  // /*--------- get obp ---------*/

  // const getOBP = () => {
  //   var myHeaders = new Headers();

  //   myHeaders.append("Authorization", bearer);
  //   myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  //   myHeaders.append("Access-Control-Allow-Credentials", "true");

  //   // console.log(bearer.toString());

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(`/api/obp`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setAppearOBP(result.list);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  // /*-------- get template ---------*/

  // const getFile = () => {
  //   var myHeaders = new Headers();

  //   myHeaders.append("Authorization", bearer);
  //   myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  //   myHeaders.append("Access-Control-Allow-Credentials", "true");

  //   // console.log(bearer.toString());

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(`/api/fs/entityfolder/TEMPLATE/1`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setAppearFile(result.list);
  //     })
  //     .catch((error) => console.log("error", error));
  // };





  const Invia = () => {
    //const result = qntChiamanti.map(({ index, ...rest }) => ({ ...rest }));

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      nome: nome,
      descrizione: descrizione,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/testsuite`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));

    // localStorage.setItem("user-info", JSON.stringify(result));
    // history.push("/dashboard/testcase");
    window.location = "/editing/testsuite";


  };

  //-----------------------SCRIPT STEPPER------------------------------

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    
    if (activeStep + 1 === steps.length) {
      Invia();
    } else
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      disabilitaNext()
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };




  const disabilitaNext = () => {
    if (activeStep === 0) {
      if (nome === "") {
        setNextDisabled(true);
      } else {
        setNextDisabled(false)
      }
    }
    // else if (activeStep === 1) {
    //   if (testCase === null) {
    //     setNextDisabled(true);
    //   } else {
    //     setNextDisabled(false)
    //   }
    // }
    // else if (activeStep === 2) {
    //   if ((lineaChiamante === null) || (OBPChiamante === null)) {
    //     setNextDisabled(true);
    //   } else {
    //     setNextDisabled(false)
    //   }
    // }
    // // da correggere a servizio pronto
    // else if (activeStep === 3) {
    //   if ((template === "")) {
    //     setNextDisabled(true);
    //   } else {
    //     setNextDisabled(false)
    //   }
    // }
  };



  // const addArr = () => {
  //   arrAppoggio.push({ linea: 0, proxy: 0, index: arrAppoggio.length })
  //   setQntChiamanti(arrAppoggio);
  //   setNChiamanti(qntChiamanti.length)
  //   console.log(qntChiamanti)
  // };

  // const removeArr = () => {
  //   arrAppoggio.pop()
  //   setQntChiamanti(arrAppoggio);
  //   setNChiamanti(qntChiamanti.length)
  //   console.log(qntChiamanti)
  // };

  const handleChangeName = (e) => {
    setNome(e.target.value);
  };
  const handleChangeDescrizione = (e) => {
    setDescrizione(e.target.value);
  };
  // const handleChangeLineaChiamato = (e) => {
  //   setLineaChiamato(e.target.value);
  // };
  // const handleChangeOBPChiamato = (e) => {
  //   setOBPChiamato(e.target.value);
  // };


  useEffect(() => {
  getTestCase();
  //   getFile();
  //   getOBP();

   if (activeStep === 0) {
      if (nome === "") {
        setNextDisabled(true);
      } else {
        setNextDisabled(false)
      }
    }
    // else if (activeStep === 1) {
    //   if (testCase === 0) {
    //     setNextDisabled(true);
    //   } else {
    //     setNextDisabled(false)
    //   }
    // }
    }, [nome, nextDisabled ]);


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
        paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
      }}
      open={openDrawer}
    >
      <div className={classes.toolbarIcon}>
        {/* <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton> */}
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
        <div className={classes.buttonTestContainer}>
              <Button
                className="button-green"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="/editing/testcreatestcase"
              >
                TEST CASE
              </Button>
              <Button
                className="button-green"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="/editing/testsuite/creaTestSuite"
              >
                TEST SUITE
              </Button>
              <Button
                className="button-green"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="/editing/testgeneratore"
              >
                TEST GENERATORE
              </Button>
            </div>
      </div>

      {/* ----------------------------CREA TEST SUITE---------------------------------------- */}

      <Paper className={classes.paper} elevation={2}>
        <CreaItem titolo="Crea Test Suite" />

        <Divider className={classes.divider} />

        {/* ------------------------STEP 1--------------------------------- */}
        <div className={classes.generalContainer} style={{ display: activeStep === 0 ? "" : "none" }}>
          <Paper className={classes.paperContainer1} elevation={0}>
            <Paper className={classes.divSelect} elevation={0}>
              <Form.Group controlId="form.Nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  className={classes.formControl}
                  type="text"
                  placeholder="Inserisci Nome"
                  onChange={(e) => {
                    handleChangeName(e)
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
         <div className={classes.generalContainer} style={{ display: activeStep === 1 ? "" : "none" }}>

          <div className={classes.bodyContainer}>
            <>
            <Paper className={classes.paperContainer2} elevation={2}>
              <Typography>Seleziona i Test Case da associare:</Typography>
              <TestSuiteSelectNew className={classes.testSuiteSelect} />
              <Alert
                severity="error"
                id="alertTestCase"
                style={{ display: "none" }}
              >
                Selezionare almeno un Test Case da associare!
              </Alert>
            </Paper>
              {/* <Typography className={classes.intestazione} variant="h6">
                Chiamato
              </Typography>
              <Row >
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
                            <MenuItem key={linea.id} value={linea.id}>
                              {linea.numero}
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
                  <Form.Group >
                    <Form.Label>OBP</Form.Label>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <Select
                        id="selectOBP"
                        value={OBPChiamato}
                        onChange={(e) => handleChangeOBPChiamato(e)}
                      >
                        {appearOBP.map((OBP) => {
                          return (
                            <MenuItem key={OBP.id} value={OBP.id}>
                              {OBP.descrizione}
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
              </Row> */}
            </>
          </div>
        </div>
        {/* ------------------------STEP 3--------------------------------- */}
        {/* <div className={classes.generalContainer} style={{ display: activeStep === 2 ? "" : "none" }}>

          <div className={classes.bodyContainer} >
            <div className={classes.bodyContainer}>
              {qntChiamanti.map((index) => {
                return (<div>
                  <>
                    <Typography className={classes.intestazione} variant="h6">
                      Chiamante <b>{index.index + 1}</b>
                    </Typography>
                    <Row >
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
                                arrAppoggio[index.index].linea = e.target.value
                                setQntChiamanti(arrAppoggio);
                              }}
                            >
                              {appearLinea.map((linea) => {
                                return (
                                  <MenuItem key={linea.id} value={linea.id}>
                                    {linea.numero}
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
                        <Form.Group >
                          <Form.Label>OBP</Form.Label>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <Select
                              id="selectOBP"
                              value={qntChiamanti.index}
                              defaultValue={index.proxy}
                              onChange={(e) => {
                                console.log("yes", index)
                                arrAppoggio[index.index].proxy = e.target.value
                                setQntChiamanti(arrAppoggio);
                              }}
                            >
                              {appearOBP.map((OBP) => {
                                return (
                                  <MenuItem key={OBP.id} value={OBP.id}>
                                    {OBP.descrizione}
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
                )
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
              disabled={nChiamanti > 2 ? true : false}
            />
          </div>





        </div> */}

        {/* ------------------------STEP 4--------------------------------- */}
        {/* <div className={classes.generalContainer} style={{ display: activeStep === 3 ? "" : "none" }}>
          <div className={classes.bodyContainer} >
            <div className={classes.bodyContainer}>
              <>
                <Typography className={classes.intestazione} variant="h6">
                  Templete
                </Typography>
                <Row >
                  <Col className={classes.col}>
                    <Form.Group controlId="form.Numero">
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <Select
                          id="selectLinea"
                          value={file}
                          onChange={(e) => { }}
                        >
                          {appearFile.map((file) => {
                            return (
                              <MenuItem key={file.id} value={file.id}>
                                {file.path}
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
        </div> */} 

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
            {activeStep === steps.length ? ("") : (
              <div>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Indietro
                  </Button>
                  <Button disabled={nextDisabled} variant="contained" color="primary" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Crea' : 'Avanti'}
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


export default EditingTestCreaTestSuite;
