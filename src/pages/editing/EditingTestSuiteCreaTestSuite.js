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
import MaterialTable from "material-table";
import ButtonNotClickedGreen from "../../components/ButtonNotClickedGreen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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
  paperModale: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "5%",
    height: "fit-content",
    width: 800,
    position: "relative",
  },
  contenutoModale: {
    height: 370,
    overflowX: "hidden",
  },
  buttonModale: {
    bottom: 0,
  },
  col: {
    padding: "3%",
    height: "106px",
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
  textField: {
    width: "200px",
  },
}));

//--------------------------FUNZIONI STEPPER------------------------------
function getSteps() {
  return [
    "Inserire nome test e descrizione",
    "Selezionare i Test Case da associare",
  ];
}

//--------------------------FINE FUNZIONI STEPPER------------------------------

function EditingTestCreaTestSuite() {
  const classes = useStyles();

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  const [openDrawer, setOpenDrawer] = useState([]);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [nextDisabled, setNextDisabled] = useState(true);
  const [file, setFile] = useState([]);
  const [data, setData] = useState([]);
  const [testCase, setTestCase] = useState([]);
  const [id, setId] = useState();
  const [nomeTitolo, setNomeTitolo] = useState("");
  const [version, setVersion] = useState();
  const [expectedDuration, setExpectedDuration] = useState();
  const [durata, setDurata] = useState();
  const [template, setTemplate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [chiamato, setChiamato] = useState([]);
  const [chiamanti, setChiamanti] = useState([]);
  const [appearLine, setAppearLine] = useState([]);
  const [appearOBP, setAppearOBP] = useState([]);
  const [appearFile, setAppearFile] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  /*------- arrayIdTestCase -----------*/
  const arrayIdTestCase = [];
  for (let index = 0; index < selectedRows.length; index++) {
    const element = selectedRows[index].id;
    arrayIdTestCase.push(element);
  }

  console.log(arrayIdTestCase);

  //-----------GET TEST CASE----------------------
  const getAllTestCase = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  //--------------GET TEMPLATE------------------------------
  const getTemplateById = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/template/` + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  //--------------TEST CASE BY ID-----------------------
  const getTestCaseById = (id) => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testcase/` + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestCase(result.testCase);
        setOpen(true);
      })
      .catch((error) => console.log("error", error));
  };

  //--------------GET LINE------------------------------
  const getAppearLine = () => {
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
        setAppearLine(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  //--------------GET OBP------------------------------
  const getAppearOBP = () => {
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
  };

  useEffect(() => {
    getAllTestCase();
    getAppearLine();
    getAppearOBP();
  }, []);
  //-----------CREA TEST SUITE----------------------
  const Invia = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      nome: nome,
      descrizione: descrizione,
      testCases: arrayIdTestCase,
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
  //-----------------------Data Columns------------------------------

  const columns = [
    {
      title: "ID Test",
      field: "id",
      defaultSort: "desc",
      editable: "never",
    },
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
    // {
    //   title: "Durata Attesa",
    //   field: "expectedDuration",
    // },
    // {
    //   title: "Versione",
    //   field: "version",
    // },
    {
      title: "Data Creazione",
      field: "creationDate",
    },
    {
      title: "Data Modifica",
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
      title: "Template",
      field: "file",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [modifica, setModifica] = React.useState(false);
  const [openChiamato, setOpenChiamato] = React.useState(false);
  const [openChiamanti, setOpenChiamanti] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);

  const openModifica = (rowData) => {
    setModifica(true);
    handleOpen(rowData);
  };
  const openVisualizza = (rowData) => {
    setModifica(false);
    handleOpen(rowData);
  };

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setNomeTitolo(rowData.nome);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersion(rowData.version);
    setExpectedDuration(rowData);
    setDurata(rowData.expectedDuration);
    setCreatedBy(rowData.createdBy);
    setModifiedBy(rowData.modifiedBy);
    setCreationDate(rowData.creationDate);
    setModifiedDate(rowData.modifiedDate);
    getTestCaseById(rowData.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    aggiornaTestCase();
    setOpen(false);
  };

  /*---------MODALE DELETE-------*/

  const functionDelete = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      id: idElemento,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getAllTestCase();
      })
      .catch((error) => console.log("error", error));
    handleCloseDelete();
  };

  //------------ funzione apri modale

  const handleOpenDelete = (rowData) => {
    setNome(rowData.nome);
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  //-----------MODALE CHIAMATO------------------
  const handleOpenChiamato = () => {
    var appoggioChiamato;
    appoggioChiamato = Object.values(testCase.chiamato);
    for (let i = 0; i < appoggioChiamato.length; i++) {
      chiamato.push(appoggioChiamato[i].id);
    }
    console.log(chiamato);
    setOpenChiamato(true);
  };

  const handleCloseChiamato = () => {
    setOpenChiamato(false);
  };

  const handleCloseChiamato2 = () => {
    //aggiornaUtente();
    setOpenChiamato(false);
  };
  //---------MODALE CHIAMANTi--------------------
  const handleOpenChiamanti = () => {
    var appoggioChiamanti;
    appoggioChiamanti = testCase.chiamanti;

    for (let i = 0; i < appoggioChiamanti.length; i++) {
      chiamanti[i] = [0, 0, 0, 0];
    }
    for (let i = 0; i < appoggioChiamanti.length; i++) {
      chiamanti[i][0] = appoggioChiamanti[i]["proxy"].id;
      chiamanti[i][1] = appoggioChiamanti[i]["linea"].id;
      chiamanti[i][2] = appoggioChiamanti[i]["file"].id;
      chiamanti[i][3] = i;
    }
    console.log(chiamanti);
    setOpenChiamanti(true);
  };

  const handleCloseChiamanti = () => {
    setOpenChiamanti(false);
  };

  const handleCloseChiamanti2 = () => {
    //aggiornaUtente();
    setOpenChiamanti(false);
  };

  //-------AGGIORNA TEST CASE----------------------------

  const aggiornaTestCase = () => {
    const invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        id: id,
        version: version,
        expectedDuration: expectedDuration,
        nome: nome,
        descrizione: descrizione,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/testcase`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          getAllTestCase();
        })
        .catch((error) => console.log("error", error));
    };
    invia();
  };

  //-----------------------SCRIPT STEPPER------------------------------

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    if (activeStep + 1 === steps.length) {
      Invia();
    } else setActiveStep((prevActiveStep) => prevActiveStep + 1);
    disabilitaNext();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const disabilitaNext = () => {
    if (activeStep === 0) {
      if (nome === "") {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }

    // if (activeStep === 1) {
    //   if (arrayIdTestCase.length === 0) {
    //     setNextDisabled(true);
    //   } else {
    //     setNextDisabled(false);
    //   }
    // }
  };

  const handleChangeName = (e) => {
    setNome(e.target.value);
  };
  const handleChangeDescrizione = (e) => {
    setDescrizione(e.target.value);
  };

  useEffect(() => {
    // getTestCase();
    //   getFile();
    //   getOBP();

    if (activeStep === 0) {
      if (nome === "") {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }
    // else if (activeStep === 1) {
    //   if (testCase === 0) {
    //     setNextDisabled(true);
    //   } else {
    //     setNextDisabled(false)
    //   }
    // }
  }, [nome, nextDisabled]);

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
                <Paper className={classes.paperContainer2} elevation={2}>
                  <Typography>Seleziona i Test Case da associare:</Typography>
                  <div>
                    <MaterialTable
                      style={{ boxShadow: "none" }}
                      title="Test Case"
                      data={data}
                      columns={columns}
                      onSelectionChange={
                        (rows) => setSelectedRows(rows)
                        // for (let i = 0; i < rows.length; i++) {
                        //   // console.log(rows[i].id);
                        //   return selectedRows.push(rows[i].id);
                        // }
                      }
                      options={{
                        selection: true,
                        sorting: true,
                        exportButton: true,
                        actionsColumnIndex: -1,
                        search: true,
                        searchFieldVariant: "outlined",
                        filtering: true,
                        searchFieldAlignment: "left",
                        pageSizeOptions: [
                          5,
                          10,
                          20,
                          { value: data.length, label: "All" },
                        ],
                      }}
                      actions={[
                        {
                          icon: () => (
                            <div className={classes.buttonRight}>
                              <Button
                                className="button-green"
                                component={NavLink}
                                activeClassName="button-green-active"
                                exact
                                to="/editing/testcreatestcase"
                                startIcon={<AddIcon />}
                              >
                                TEST CASE
                              </Button>
                            </div>
                          ),
                          tooltip: "Load Test Case",
                          //onClick: () => funzioneFor(),
                          isFreeAction: true,
                        },
                        {
                          icon: (dat) => (
                            <a>
                              <VisibilityIcon />
                            </a>
                          ),
                          tooltip: "Visualizza tutti i dati",
                          position: "row",
                          onClick: (event, rowData) => openVisualizza(rowData),
                        },
                        {
                          icon: () => <EditIcon />,
                          tooltip: "Modifica",
                          onClick: (event, rowData) => openModifica(rowData),
                          position: "row",
                        },
                        {
                          icon: () => <DeleteIcon />,
                          tooltip: "Remove all selected test",
                          onClick: (event, rowData) => {
                            handleOpenDelete(rowData);
                            setIdElemento(rowData.id);
                          },
                        },
                      ]}
                      localization={{
                        header: {
                          actions: "Azioni",
                        },
                      }}
                    />

                    {/*------------------ MODALE VISUALIZZA/MODIFICA -------------*/}

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
                              <ListItem>
                                <Typography
                                  className={classes.intestazione}
                                  variant="h4"
                                >
                                  {modifica === false
                                    ? "Visualizza "
                                    : "Modifica "}{" "}
                                  Test Case <b>{nomeTitolo}</b>
                                </Typography>
                              </ListItem>
                              <Divider className={classes.divider} />
                            </div>

                            <Form className={classes.contenutoModale}>
                              <Row>
                                <Col className={classes.col}>
                                  <TextField
                                    className={classes.textField}
                                    error={nome !== "" ? false : true}
                                    onChange={(e) => setNome(e.target.value)}
                                    label="Nome"
                                    defaultValue={nome}
                                    helperText={
                                      nome !== "" ? "" : "Il nome è richiesto"
                                    }
                                    InputProps={{
                                      readOnly:
                                        modifica === false ? true : false,
                                    }}
                                  />
                                </Col>
                                <Col className={classes.col}>
                                  <TextField
                                    className={classes.textField}
                                    error={descrizione !== "" ? false : true}
                                    onChange={(e) =>
                                      setDescrizione(e.target.value)
                                    }
                                    label="Descrizione"
                                    defaultValue={descrizione}
                                    helperText={
                                      descrizione !== ""
                                        ? ""
                                        : "La descrizione è richiesta"
                                    }
                                    InputProps={{
                                      readOnly:
                                        modifica === false ? true : false,
                                    }}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col className={classes.col}>
                                  <ButtonClickedGreen
                                    size="medium"
                                    nome={
                                      modifica === false
                                        ? "vedi chiamato"
                                        : "modifica chiamato"
                                    }
                                    onClick={handleOpenChiamato}
                                  />
                                </Col>
                                <Col className={classes.col}>
                                  <ButtonClickedGreen
                                    size="medium"
                                    nome={
                                      modifica === false
                                        ? "vedi chiamanti"
                                        : "modifica chiamanti"
                                    }
                                    onClick={handleOpenChiamanti}
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col className={classes.col}>
                                  <TextField
                                    className={classes.textField}
                                    label="Template"
                                    value={console.log(template)}
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
                                    label="Creato Da"
                                    value={createdBy}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                </Col>
                                <Col className={classes.col}>
                                  <TextField
                                    className={classes.textField}
                                    label="Data di creazione"
                                    value={creationDate
                                      .replace(".000+00:00", "")
                                      .replace("T", " | ")}
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
                                    label="Modificato da"
                                    value={modifiedBy}
                                    InputProps={{
                                      readOnly: true,
                                    }}
                                  />
                                </Col>
                                <Col className={classes.col}>
                                  <TextField
                                    className={classes.textField}
                                    label="Data di Modifica"
                                    value={modifiedDate
                                      .replace(".000+00:00", "")
                                      .replace("T", " | ")}
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
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {modifica === false ? (
                                  ""
                                ) : (
                                  <ButtonClickedGreen
                                    size="medium"
                                    nome="Aggiorna"
                                    onClick={handleClose2}
                                  />
                                )}

                                <ButtonNotClickedGreen
                                  className={classes.bottoneAnnulla}
                                  onClick={handleClose}
                                  size="medium"
                                  nome={
                                    modifica === false ? "Indietro" : "Annulla"
                                  }
                                />
                              </div>
                            </div>
                          </Paper>
                        </div>
                      </Fade>
                    </Modal>

                    {/* ------------------------MODALE CHIAMATO--------------------- */}
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={openChiamato}
                      onClose={handleCloseChiamato}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={openChiamato}>
                        <div>
                          <Paper className={classes.paperModale}>
                            <div>
                              <ListItem>
                                <Typography
                                  className={classes.intestazione}
                                  variant="h4"
                                >
                                  {modifica === false
                                    ? "Visualizza "
                                    : "Modifica "}{" "}
                                  Chiamato <b>{nomeTitolo}</b>
                                </Typography>
                              </ListItem>
                              <Divider className={classes.divider} />
                            </div>

                            <Form className={classes.contenutoModale}>
                              <Row>
                                <Col className={classes.col}>
                                  <TextField
                                    className={classes.textField}
                                    select
                                    onChange={(e) => {
                                      chiamato[1] = e.target.value;
                                    }}
                                    label="Linea"
                                    value={chiamato[1]}
                                    InputProps={{
                                      readOnly:
                                        modifica === false ? true : false,
                                    }}
                                  >
                                    {appearLine.map((linea) => (
                                      <MenuItem key={linea.id} value={linea.id}>
                                        {linea.campiConcatenati}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Col>
                                <Col className={classes.col}>
                                  <TextField
                                    className={classes.textField}
                                    select
                                    onChange={(e) => {
                                      chiamato[0] = e.target.value;
                                    }}
                                    label="Outboundproxy"
                                    value={chiamato[0]}
                                    InputProps={{
                                      readOnly:
                                        modifica === false ? true : false,
                                    }}
                                  >
                                    {appearOBP.map((obp) => (
                                      <MenuItem key={obp.id} value={obp.id}>
                                        {obp.campiConcatenati}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Col>
                              </Row>
                            </Form>
                            <div className={classes.buttonModale}>
                              <Divider className={classes.divider} />
                              <div
                                className={classes.bottone}
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {modifica === false ? (
                                  ""
                                ) : (
                                  <ButtonClickedGreen
                                    size="medium"
                                    nome="Aggiorna"
                                    onClick={handleCloseChiamato2}
                                  />
                                )}

                                <ButtonNotClickedGreen
                                  className={classes.bottoneAnnulla}
                                  onClick={handleCloseChiamato}
                                  size="medium"
                                  nome={
                                    modifica === false ? "Indietro" : "Annulla"
                                  }
                                />
                              </div>
                            </div>
                          </Paper>
                        </div>
                      </Fade>
                    </Modal>
                    {/* ------------------------MODALE CHIAMANTi--------------------- */}
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={openChiamanti}
                      onClose={handleCloseChiamanti}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={openChiamanti}>
                        <div>
                          <Paper className={classes.paperModale} elevation={1}>
                            <div>
                              <ListItem>
                                <Typography
                                  className={classes.intestazione}
                                  variant="h4"
                                >
                                  {modifica === false
                                    ? "Visualizza "
                                    : "Modifica "}{" "}
                                  Chiamanti <b>{nomeTitolo}</b>
                                </Typography>
                              </ListItem>
                              <Divider className={classes.divider} />
                            </div>

                            <Form className={classes.contenutoModale}>
                              {chiamanti.map((chiamanti) => (
                                <>
                                  <Typography
                                    className={classes.intestazione}
                                    variant="h6"
                                  >
                                    Chiamanti <b>{chiamanti[3] + 1}</b>
                                  </Typography>
                                  <Row>
                                    <Col className={classes.col}>
                                      <TextField
                                        className={classes.textField}
                                        select
                                        onChange={(e) => {
                                          chiamanti[1] = e.target.value;
                                        }}
                                        label="Linea N°"
                                        value={chiamanti[1]}
                                        InputProps={{
                                          readOnly:
                                            modifica === false ? true : false,
                                        }}
                                      >
                                        {appearLine.map((linea) => (
                                          <MenuItem
                                            key={linea.id}
                                            value={linea.id}
                                          >
                                            {linea.campiConcatenati}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </Col>
                                    <Col className={classes.col}>
                                      <TextField
                                        className={classes.textField}
                                        select
                                        onChange={(e) => {
                                          chiamanti[0] = e.target.value;
                                        }}
                                        label="Outboundproxy N°"
                                        value={chiamanti[0]}
                                        InputProps={{
                                          readOnly:
                                            modifica === false ? true : false,
                                        }}
                                      >
                                        {appearOBP.map((obp) => (
                                          <MenuItem key={obp.id} value={obp.id}>
                                            {obp.campiConcatenati}
                                          </MenuItem>
                                        ))}
                                      </TextField>
                                    </Col>
                                  </Row>
                                </>
                              ))}
                            </Form>
                            <div className={classes.buttonModale}>
                              <Divider className={classes.divider} />
                              <div
                                className={classes.bottone}
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                {modifica === false ? (
                                  ""
                                ) : (
                                  <ButtonClickedGreen
                                    size="medium"
                                    nome="Aggiorna"
                                    onClick={handleCloseChiamanti2}
                                  />
                                )}

                                <ButtonNotClickedGreen
                                  className={classes.bottoneAnnulla}
                                  onClick={handleCloseChiamanti}
                                  size="medium"
                                  nome={
                                    modifica === false ? "Indietro" : "Annulla"
                                  }
                                />
                              </div>
                            </div>
                          </Paper>
                        </div>
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
                          <Paper
                            className={classes.paperModaleDelete}
                            elevation={1}
                          >
                            <div>
                              <ListItem>
                                <Typography
                                  className={classes.intestazione}
                                  variant="h4"
                                >
                                  Elimina Test Case <b>{nome}</b>
                                </Typography>
                              </ListItem>
                              <Divider className={classes.divider} />

                              <Typography className={classes.typography}>
                                L'eliminazione del Test Case selezionato,
                                comporterà la cancellazione dei Test Suite ad
                                esso collegati.
                                <br />
                                Si vuole procedere?{" "}
                              </Typography>

                              <Divider className={classes.divider} />
                              <div
                                className={classes.bottone}
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <ButtonNotClickedGreen
                                  onClick={functionDelete}
                                  nome="Elimina"
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
                  </div>
                  <Alert
                    severity="error"
                    id="alertTestCase"
                    style={{ display: "none" }}
                  >
                    Selezionare almeno un Test Case da associare!
                  </Alert>
                </Paper>
              </>
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
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.backButton}
                    >
                      Indietro
                    </Button>
                    <Button
                      disabled={
                        nextDisabled ||
                        (arrayIdTestCase.length === 0 && activeStep === 1)
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

export default EditingTestCreaTestSuite;
