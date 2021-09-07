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
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Prova from "../../components/Prova";

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
}));

//--------------------------FUNZIONI STEPPER------------------------------
function getSteps() {
  return ['Inserire nome test e descrizione', 'Impostare Chiamato', 'Impostare Chiamante/i' , 'Template'];
}

//--------------------------FINE FUNZIONI STEPPER------------------------------

function EditingTestCreaTestgeneratore() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [lineaChiamato, setLineaChiamato] = useState();
  const [OBPChiamato, setOBPChiamato] = useState();
  const [fileChiamato, setFileChiamato] = useState();
  const [numChiamanti, setNumChiamanti] = useState();
  const [appearLinea, setAppearLinea] = useState([]);
  const [appearOBP, setAppearOBP] = useState([]);
  const [appearFile, setAppearFile] = useState([]);
  const [openDrawer, setOpenDrawer] = useState([]);

  const appearChiamanti=[{valore:"1"},{valore:"2"},{valore:"3"}]

  let prova1=()=>{
    console.log("ciao")
  }
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getTypeId = () => {
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

    fetch(`/api/typeLinea`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const getLinea = () => {
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

    fetch(`/api/linea`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearLinea(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const getOBP = () => {
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

    fetch(`/api/obp`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearOBP(result.list)
      })
      .catch((error) => console.log("error", error));
  };

  const getFile = () => {
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

    fetch(`/api/fs/entityfolder/TEMPLATE/1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearFile(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const removeTypeLinea = (id) => {
    alert("id " + id + " rimosso")
  }

  useEffect(() => {
    getTypeId();
    getLinea();
    getFile();
    getOBP();
  }, []);

  const [ip, setIP] = useState("");
  const [ip1, setIP1] = useState("");
  const [ip2, setIP2] = useState("");
  const [ip3, setIP3] = useState("");
  const [ip4, setIP4] = useState("");
  const [Nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [typeLineaId, setTypeLineaId] = useState(0);
  const [typeLineaDescrizione, setTypeLineaDescrizione] = useState("");

  const aggiornaIP = () => {
    if (
      ip1 !== "" &&
      //ip1.length < 5 &&
      ip2 !== "" &&
      //ip2.length < 5 &&
      ip3 !== "" &&
      //ip3 < 5 &&
      ip4 !== ""
      //ip4.length < 5
    ) {
      setIP(ip1 + "." + ip2 + "." + ip3 + "." + ip4);
      console.log(ip, "ip okay");
    }
  };

  function salva() {
    const Invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");
      var raw = JSON.stringify({
        ip: ip,
        Nome: Nome,
        password: password,
        descrizione: descrizione,
        typeLinea: {
          id: typeLineaId,
        },
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/linea`, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));

      // localStorage.setItem("user-info", JSON.stringify(result));
      // history.push("/dashboard/testcase");
      window.location = "/editing/linee";
    };

    if (
      ip !== "" &&
      Nome !== "" &&
      password !== "" &&
      descrizione !== "" &&
      typeLineaId !== ""
    ) {
      Invia();
      // console.log(ip);
    } else {
      if (ip === "") {
        document.getElementById("alertIP").style.display = "";
      } else {
        document.getElementById("alertIP").style.display = "none";
      }
      if (Nome === "") {
        document.getElementById("alertNome").style.display = "";
      } else {
        document.getElementById("alertNome").style.display = "none";
      }
      if (password === "") {
        document.getElementById("alertPassword").style.display = "";
      } else {
        document.getElementById("alertPassword").style.display = "none";
      }
      if (descrizione === "") {
        document.getElementById("alertDescrizione").style.display = "";
      } else {
        document.getElementById("alertDescrizione").style.display = "none";
      }
    }
  }

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

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;
  const checkRichiesta = (result) => {
    console.log(result);
    setTypeLineaId(result.id)
  };

  const salva2 = () => {
    const Invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");
      var raw = JSON.stringify({
        descrizione: type,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/typeLinea`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          checkRichiesta(result.typeLinea)
          getTypeId()
        })
        .catch((error) => console.log("error", error));

      // localStorage.setItem("user-info", JSON.stringify(result));
      // history.push("/dashboard/testcase");
      //window.location = "/editing/linee";
    };

    if (type !== "") {
      Invia();
      handleClose();
      handleClose2();
    } else {
    }


  };

  //-----------------------SCRIPT STEPPER------------------------------

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const prova=()=>{
  var ciao = new Array(0)

      for (let i = 0; i < numChiamanti; i++) {
        
        ciao.push("")
       
      }
      console.log(ciao)
      return( ciao)
  }

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
          <Button
            className="button-green"
            component={NavLink}
            activeClassName="button-green-active"
            exact
            to="/editing/lineegeneratore"
          >
            LINEE GENERATORE
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

        {/* ----------------------------CREA TEST generatore---------------------------------------- */}

        <Paper className={classes.paper} elevation={2}>
          <CreaItem titolo="Crea Test Generatore" />

          <Divider className={classes.divider} />

          {/* ------------------------STEP 1--------------------------------- */}
          <div className={classes.generalContainer} style={{ display: activeStep === 0 ? "" : "none" }}>
            <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Nome" required>
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Nome"
                    onChange={(e) => setNome(e.target.value)}
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

            <Paper className={classes.paperContainer2} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Nome">
                  <Form.Label>Descrizione</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Descrizione"
                    onChange={(e) => setDescrizione(e.target.value)}
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
            </Paper>

          </div>
          {/* ------------------------STEP 2--------------------------------- */}
          <div className={classes.generalContainer} style={{ display: activeStep === 1 ? "" : "none" }}>
          <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Linea</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      id="selectLinea"
                      value={lineaChiamato}
                      onChange={(e) => setLineaChiamato}
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

                <Form.Group >
                  <Form.Label>OBP</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    required
                  >
                    <Select
                      id="selectOBP"
                      value={OBPChiamato}
                      onChange={(e) => setOBPChiamato(e.target.value)}
                      required
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
              </Paper>
            </Paper>

            <Paper className={classes.paperContainer2} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Quanti chiamanti vuoi inserire?</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      value={numChiamanti}
                      onChange={(e) => setNumChiamanti(e.target.value)}
                      defaultValue={1}
                    >
                      {appearChiamanti.map((chiamanti) => {
                        return (
                          <MenuItem key={chiamanti.valore} value={chiamanti.valore}>
                            {chiamanti.valore}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Alert
                      severity="error"
                      id="alertFile"
                      style={{ display: "none" }}
                    >
                      Selezionare numero chiamanti!
                    </Alert>
                  </FormControl>
                </Form.Group>
              </Paper>
            </Paper> 
          </div>
          {/* ------------------------STEP 3--------------------------------- */}
          <div className={classes.generalContainer} style={{ display: activeStep === 2 ? "" : "none" }}>
          
          <Form.Group controlId="form.Numero">
            <Form.Label>Linea</Form.Label>
            <FormControl
              variant="outlined"
              className={classes.formControl}
            >
              <Select
                id="selectLinea"
                value={lineaChiamato}
                onChange={(e) => setLineaChiamato}
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

          <Form.Group >
            <Form.Label>OBP</Form.Label>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              required
            >
              <Select
                id="selectOBP"
                value={OBPChiamato}
                onChange={(e) => setOBPChiamato(e.target.value)}
                required
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

          </div>

          {/* ------------------------STEP 4--------------------------------- */}

          <div className={classes.generalContainer} style={{ display: activeStep === 3 ? "" : "none" }}>
            <Form.Group >
              <Form.Label>Template</Form.Label>
              <FormControl
                variant="outlined"
                className={classes.formControl}
                required
              >

                {/* da sistemare quando ci sarà il servizio */}
                <Select
                  id="selectOBP"
                  value={OBPChiamato}
                  onChange={(e) => setOBPChiamato(e.target.value)}
                  required
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
                  <Typography className={classes.instructions}>All steps completed</Typography>
                  <Button onClick={handleReset}>Reset</Button>
                </div>
              ) : (
                <div>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
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

export default EditingTestCreaTestgeneratore;
