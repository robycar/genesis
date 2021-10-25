import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { Paper } from "@material-ui/core";
import CreaItem from "../../components/CreaItem";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import SettingsIcon from "@material-ui/icons/Settings";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import MaterialTable from "material-table";
import ButtonNotClickedGreen from "../../components/ButtonNotClickedGreen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { getGenerale, getByIdGenerale, putGenerale } from "../../service/api";
import {
  ButtonEditing,
  ButtonEditingTest,
} from "../../components/ButtonBarraNavigazione";
import { tableIcons } from "../../components/Icons";

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
  },
  fixedHeight: {
    height: 240,
  },
  buttonContainer: {
    marginBottom: "20px",
    marginLeft: "2%",
  },
  firstStep: {
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
  let history = useHistory();
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState([]);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [nextDisabled, setNextDisabled] = useState(true);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isErrore, setErrore] = useState(false);
  const [messaggioErr, setMessaggioErr] = useState("");

  var functions = localStorage.getItem("funzioni").split(",");

  /*------- arrayIdTestCase -----------*/
  const arrayIdTestCase = [];
  for (let index = 0; index < selectedRows.length; index++) {
    const element = selectedRows[index].id;
    arrayIdTestCase.push(element);
  }

  const funzioneGetAll = () => {
    if (
      functions.indexOf("testsuite.create") !== -1 &&
      functions.indexOf("test.view") !== -1
    ) {
      //----GET APPEAR TEMPLATE----
      (async () => {
        setData((await getGenerale("testcase")).list);
      })();
    }
  };

  const checkRichiesta = (result) => {
    if (result.error == null) {
      history.push("/editing/testsuite");
    } else if (result.error.code === "TEST-0012") {
      setMessaggioErr(
        "Il nome inserito per il TestSuite è già stato assegnato ad un altro TestSuite"
      );
      setErrore(true);
    } else {
      setMessaggioErr(result.error.description);
      setErrore(true);
    }
  };

  const Invia = () => {
    if (functions.indexOf("testsuite.create") !== -1) {
      (async () => {
        checkRichiesta(
          await putGenerale("testsuite", {
            nome: nome,
            descrizione: descrizione,
            testCases: arrayIdTestCase,
          })
        );
      })();
    }
  };

  useEffect(() => {
    funzioneGetAll();
  }, []);

  const handleCloseErrore = () => {
    setErrore(false);
    setActiveStep(0);
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
      field: "template.nome",
    },
  ];

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
  };

  const handleChangeName = (e) => {
    setNome(e.target.value);
  };
  const handleChangeDescrizione = (e) => {
    setDescrizione(e.target.value);
  };

  useEffect(() => {
    if (activeStep === 0) {
      if (nome === "") {
        setNextDisabled(true);
      } else {
        setNextDisabled(false);
      }
    }
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

        <ButtonEditing nome="test"/>
        <ButtonEditingTest nome="testsuite"/>

        {/* ----------------------------CREA TEST SUITE---------------------------------------- */}

        <Paper className={classes.paper} elevation={2}>
          <CreaItem titolo="Crea Test Suite" />

          <Divider className={classes.divider} />

          {/* ------------------------STEP 1--------------------------------- */}
          <div
            className={classes.firstStep}
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
            <div>
              <Typography variant="h6">
                Seleziona i Test Case da associare:
              </Typography>
              <div>
                <MaterialTable
                  icons={tableIcons}
                  style={{ boxShadow: "none" }}
                  title="Test Case"
                  data={data}
                  columns={columns}
                  onSelectionChange={(rows) => setSelectedRows(rows)}
                  options={{
                    selection: true,
                    sorting: true,
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
                  // actions={[
                  //   {
                  //     icon: (dat) => (
                  //       <a>
                  //         <VisibilityIcon />
                  //       </a>
                  //     ),
                  //     tooltip: "Visualizza Test Suite",
                  //     position: "row",
                  //     onClick: (event, rowData) => handleOpen(rowData),
                  //   },
                  // ]}
                  // localization={{
                  //   header: {
                  //     actions: "Azioni",
                  //   },
                  // }}
                />
              </div>
              <Alert
                severity="error"
                id="alertTestCase"
                style={{ display: "none" }}
              >
                Selezionare almeno un Test Case da associare!
              </Alert>
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
                          ? history.push("/editing/testsuite")
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

export default EditingTestCreaTestSuite;
