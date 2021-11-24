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
import TextField from "@material-ui/core/TextField";
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import { useHistory } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import {
  getGenerale,
  postGenerale,
  deleteGenerale,
  putGenerale,
  putFileCsv,
} from "../../service/api";
import {
  ButtonEditing,
  ButtonEditingLinee,
} from "../../components/ButtonBarraNavigazione";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  rootForm: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
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
  input: {
    display: "none",
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
  formGroupPath: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "1%",
  },
  divBottoneSfoglia: {
    marginTop: "1%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  formControlNature: {
    margin: theme.spacing(1),
    width: "204px",
    height: "39px",
  },
}));

function EditingLineaCreaLineaGeneratore() {
  var functions = localStorage.getItem("funzioni").split(",");

  const classes = useStyles();
  let history = useHistory();

  const [data, setData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState([]);
  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");
  const [nature, setNature] = React.useState("");

  const handleChangeNature = (event) => {
    setNature(event.target.value);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenWarning = () => {
    setOpenWarning(false);
  };

  const handleOpenWarningCreateError = () => {
    setOpenWarning(true);
    setWarning("Non può essere creato un tipo linea già esistente");
  };

  //-------------------------TYPE LINEA API ----------------
  //---- GET ALL TYPE LINEA ----
  const funzioneGetAll = () => {
    if (functions.indexOf("linea.view") !== -1) {
      (async () => {
        setData((await getGenerale("typeLinea")).list);
      })();
    }
  };
  //---- DELETE TYPE LINEA ----
  // Aggiungere Warning appena sarà disponibile il codice d'errore (Vedi EditingLineeCreaLinea.js)
  const removeTypeLinea = (id) => {
    if (functions.indexOf("linea.delete") !== -1) {
      (async () => {
        await deleteGenerale("typeLinea", id)
          .then((result) => {
            if (result.error !== null) {
              setOpenWarning(true);
              if (result.error.code === "LINEA-0006") {
                setWarning(
                  "Impossibile eliminare il Tipo Linea perche appartiene a una Linea o a un OBP"
                );
              } else {
                setWarning(
                  "Codice errore: " +
                    result.error.code +
                    " Descrizione: " +
                    result.code.description
                );
              }
            } else {
              funzioneGetAll();
              handleCloseRemove();
            }
          })
          .catch((error) => console.log("error", error));
      })();
    }
  };

  //----------AGGIORNA TYPELINEA API ----
  const funzioneAggiornaTypeLinea = (typeLinea) => {
    if (functions.indexOf("linea.edit") !== -1) {
      (async () => {
        await postGenerale("typeLinea", {
          id: typeLinea.id,
          version: typeLinea.version,
          descrizione:
            typeLineaDescrizione !== ""
              ? typeLineaDescrizione
              : typeLinea.descrizione,
          natura: nature !== "" ? nature : typeLinea.natura,
        });

        funzioneGetAll();
      })();
    }
  };

  useEffect(() => {
    funzioneGetAll();
  }, []);

  const editTypeLinea = () => {
    funzioneAggiornaTypeLinea(typeLineaId);
    handleCloseEdit();
  };

  const [ip1, setIP1] = useState("");
  const [ip2, setIP2] = useState("");
  const [ip3, setIP3] = useState("");
  const [ip4, setIP4] = useState("");
  const [porta, setPorta] = useState("5060");
  const [typeLineaId, setTypeLineaId] = useState(0);
  const [typeLineaDescrizione, setTypeLineaDescrizione] = useState("");

  const ipTotal = ip1 + "." + ip2 + "." + ip3 + "." + ip4;

  function salva() {
    const funzioneAggiungiLineaGeneratore = () => {
      if (functions.indexOf("lineagen.create") !== -1) {
        let result = (async () => {
          await putFileCsv(
            "lineageneratore",
            "ip",
            ipTotal,
            "porta",
            porta,
            "typeLinea.id",
            typeLineaId.id,
            "pathCSV",
            arrayValue[0],
            arrayValue[0].name
          );
          checkRichiesta(result);
        })();
      }

      const checkRichiesta = (result) => {
        if (result.error == null) {
          history.push("/editing/lineegeneratore");
        } else if (result.error.code === "LINEA-0003") {
          document.getElementById("alertNumero2").style.display = "";
        } else {
          document.getElementById("alertNumero2").style.display = "none";
        }
      };
    };

    const aggiornaIP = () => {
      if (
        ip1 >= 0 &&
        ip1 <= 255 &&
        ip2 >= 0 &&
        ip2 <= 255 &&
        ip3 >= 0 &&
        ip3 <= 255 &&
        ip4 >= 0 &&
        ip4 <= 255
      ) {
        document.getElementById("alertIP").style.display = "none";
        document.getElementById("alertPorta").style.display = "none";
        document.getElementById("alertTypeLinea").style.display = "none";
        document.getElementById("alertIP2").style.display = "none";
        funzioneAggiungiLineaGeneratore();
      } else {
        document.getElementById("alertIP2").style.display = "";
      }
    };

    if (
      ip1 !== "" &&
      ip2 !== "" &&
      ip3 !== "" &&
      ip4 !== "" &&
      typeLineaId !== 0 &&
      (porta === "" || (porta.length > 3 && porta.length < 6))
    ) {
      if (porta.length === 0) {
        setPorta("5060");
      }
      aggiornaIP();
    } else {
      if (ip1 === "" || ip2 === "" || ip3 === "" || ip4 === "") {
        document.getElementById("alertIP").style.display = "";
      } else {
        document.getElementById("alertIP").style.display = "none";
      }
      if (
        ip1 >= 0 &&
        ip1 <= 255 &&
        ip2 >= 0 &&
        ip2 <= 255 &&
        ip3 >= 0 &&
        ip3 <= 255 &&
        ip4 >= 0 &&
        ip4 <= 255
      ) {
        document.getElementById("alertIP2").style.display = "none";
      } else {
        document.getElementById("alertIP2").style.display = "";
      }
      if (porta.length === 0 || (porta.length >= 4 && porta.length <= 5)) {
        document.getElementById("alertPorta").style.display = "none";
      } else {
        document.getElementById("alertPorta").style.display = "";
      }
      if (typeLineaId === 0) {
        document.getElementById("alertTypeLinea").style.display = "";
      } else {
        document.getElementById("alertTypeLinea").style.display = "none";
      }
      if (porta.length === 0 || (porta.length >= 4 && porta.length <= 5)) {
        document.getElementById("alertPorta").style.display = "none";
      } else {
        document.getElementById("alertPorta").style.display = "";
      }
    }
  }
  //------------------- FUNZIONI CARICA PATH ----------------------------

  const [selectedFile, setSelectedFile] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
    setIsSelected(true);
    console.log(event.target.files);
  };

  const handleSubmission = () => {};

  const arrayValue = Object.values(selectedFile);

  //----------------- DISABILITA BOTTONE ---------------------

  const [nextDisabled, setNextDisabled] = useState(true);

  useEffect(() => {
    if (arrayValue.length === 0) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  });

  //--------------------MODALI TYPE LINEE---------------------------------

  const [open, setOpen] = React.useState(false);
  const [openRemove, setOpenRemove] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    funzioneGetAll();
  };

  const handleOpenRemove = () => {
    setOpenRemove(true);
  };
  const handleCloseRemove = () => {
    setOpenRemove(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  //--------------------MODALE 2----------------------------------

  const [open2, setOpen2] = useState(false);
  const [type, setType] = useState("");

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    funzioneGetAll();
  };

  const bearer = `Bearer ${localStorage.getItem("token")}`;

  const checkRichiesta = (result) => {
    setTypeLineaId(result.id);
  };

  //----------CREA TYPELINEA API ----

  const functionAggiungiTypeLinea = () => {
    const funzioneAggiungiTypeLinea = () => {
      putGenerale("typeLinea", {
        descrizione: type,
        natura: nature,
      })
        .then((result) => {
          if (result.error.code === null) {
            return result;
          } else if (result.error.code === "LINEA-0005") {
            return handleOpenWarningCreateError();
          }
        })
        .then((result) => {
          checkRichiesta(result.typeLinea);
          funzioneGetAll();
        })
        .catch((error) => console.log("error", error));
    };

    if (type !== "") {
      funzioneAggiungiTypeLinea();
      handleClose();
      handleClose2();
    } else {
    }
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

        <ButtonEditing nome="linee" />
        <ButtonEditingLinee nome="generatore" />

        <Paper className={classes.paper} elevation={2}>
          <CreaItem titolo="Crea Linea Generatore" />

          <Divider className={classes.divider} />

          <div className={classes.generalContainer}>
            <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>IP Linea</Form.Label>
                  <div className={classes.divIp}>
                    <Form.Control
                      className={classes.formControlIp}
                      type="number"
                      placeholder="IP1"
                      onChange={(e) => {
                        setIP1(e.target.value);
                      }}
                    />{" "}
                    <Typography className={classes.separatoreIp}>.</Typography>
                    <Form.Control
                      className={classes.formControlIp}
                      type="number"
                      placeholder="IP2"
                      onChange={(e) => {
                        setIP2(e.target.value);
                      }}
                    />{" "}
                    <Typography className={classes.separatoreIp}>.</Typography>
                    <Form.Control
                      className={classes.formControlIp}
                      type="number"
                      placeholder="IP3"
                      onChange={(e) => {
                        setIP3(e.target.value);
                      }}
                    />{" "}
                    <Typography className={classes.separatoreIp}>.</Typography>
                    <Form.Control
                      className={classes.formControlIp}
                      type="number"
                      placeholder="IP4"
                      onChange={(e) => {
                        setIP4(e.target.value);
                      }}
                    />{" "}
                  </div>
                  <Alert
                    severity="error"
                    id="alertIP"
                    style={{ display: "none" }}
                  >
                    IP Linea è richiesto!
                  </Alert>
                  <Alert
                    severity="error"
                    id="alertIP2"
                    style={{ display: "none" }}
                  >
                    I valori dell'IP devono andare da 0 a 255 !
                  </Alert>
                </Form.Group>
              </Paper>

              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group
                  controlId="form.Numero"
                  className={classes.formGroupPath}
                >
                  <Form.Label>Path CSV</Form.Label>

                  <input
                    accept=".csv"
                    onChange={changeHandler}
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <div className={classes.divBottoneSfoglia}>
                      <Button
                        onClick={handleSubmission}
                        className="button-green"
                        variant="contained"
                        component="span"
                        size="small"
                      >
                        Sfoglia
                      </Button>
                      {arrayValue.map((file) => {
                        return <div>{file.name}</div>;
                      })}
                    </div>
                  </label>
                </Form.Group>
              </Paper>
            </Paper>

            <Paper className={classes.paperContainer2} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Porta</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="number"
                    placeholder="5060"
                    defaultValue={porta}
                    onChange={(e) => setPorta(e.target.value)}
                  />
                  <Alert
                    severity="error"
                    id="alertPorta"
                    style={{ display: "none" }}
                  >
                    La lunghezza della porta deve essere compresa tra 4 e 5
                    valori!
                  </Alert>
                </Form.Group>
              </Paper>

              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Tipo Linea</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      id="selectTypeId"
                      value={typeLineaId}
                      onChange={(e) => {
                        setTypeLineaId(e.target.value);
                        setTypeLineaDescrizione(e.target.value.descrizione);
                      }}
                    >
                      {data.map((typeLinea) => {
                        return (
                          <MenuItem key={typeLinea.id} value={typeLinea}>
                            {typeLinea.descrizione + "-" + typeLinea.natura}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Alert
                      severity="error"
                      id="alertTypeLinea"
                      style={{ display: "none" }}
                    >
                      Selezionare il Tipo di Linea
                    </Alert>
                  </FormControl>
                  <div className={classes.modaleAddLinea}>
                    {/* ----------------------------MODALI----------------------------------------*/}

                    <div>
                      <Button
                        onClick={handleOpen}
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        size="small"
                        disabled={functions.indexOf("linea.edit") === -1}
                      >
                        TYPE
                      </Button>
                      <br />
                      <br />
                      <Button
                        onClick={handleOpenRemove}
                        variant="contained"
                        color="secondary"
                        startIcon={<RemoveIcon />}
                        size="small"
                        disabled={
                          functions.indexOf("linea.delete") === -1 ||
                          typeLineaId === 0
                        }
                      >
                        TYPE
                      </Button>
                      <br />
                      <br />
                      <Button
                        onClick={handleOpenEdit}
                        variant="contained"
                        style={{ backgroundColor: "#ffc107" }}
                        startIcon={<EditIcon />}
                        size="small"
                        disabled={
                          functions.indexOf("linea.edit") === -1 ||
                          typeLineaId === 0
                            ? true
                            : false
                        }
                      >
                        TYPE
                      </Button>
                      {/*------------------MODALE AGGIUNGI TYPE--------------- */}
                      <Modal
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
                          <div className={classes.paper2}>
                            <Paper>
                              <div
                                style={{
                                  alignItems: "center",
                                  marginTop: "1%",
                                  marginBottom: "1%",
                                }}
                              >
                                <ListItem button>
                                  <ListItemIcon>
                                    <SettingsIcon className={classes.icon} />
                                  </ListItemIcon>
                                  <Typography
                                    className={classes.intestazione}
                                    variant="h5"
                                  >
                                    Aggiungi Tipo Linea{" "}
                                  </Typography>
                                </ListItem>
                              </div>

                              <Divider
                                style={{ width: "270px", marginLeft: "15px" }}
                              />

                              <div className={classes.paperBottom}>
                                <Typography variant="h11">
                                  Sei sicuro che il nuovo "Tipo Linea" non è già
                                  presente?
                                </Typography>

                                <div className={classes.divider2}>
                                  <Divider />
                                </div>

                                <div className={classes.bottoni}>
                                  <div>
                                    <Button
                                      onClick={handleOpen2}
                                      variant="contained"
                                      color="secondary"
                                    >
                                      Si, prosegui
                                    </Button>
                                    <Modal
                                      className={classes.modal}
                                      open={open2}
                                      onClose={handleClose2}
                                      closeAfterTransition
                                      BackdropComponent={Backdrop}
                                      BackdropProps={{
                                        timeout: 500,
                                      }}
                                    >
                                      <Fade in={open2}>
                                        <div className={classes.paper2}>
                                          <Paper>
                                            <div
                                              style={{
                                                alignItems: "center",
                                                marginTop: "1%",
                                                marginBottom: "1%",
                                              }}
                                            >
                                              <ListItem button>
                                                <ListItemIcon>
                                                  <SettingsIcon
                                                    className={classes.icon}
                                                  />
                                                </ListItemIcon>
                                                <Typography
                                                  className={
                                                    classes.intestazione
                                                  }
                                                  variant="h5"
                                                >
                                                  Aggiungi Tipo Linea{" "}
                                                </Typography>
                                              </ListItem>
                                            </div>

                                            <Divider
                                              style={{
                                                width: "270px",
                                                marginLeft: "15px",
                                              }}
                                            />
                                            <div
                                              className={classes.paperBottom}
                                            >
                                              <Form
                                                className={classes.rootForm}
                                                noValidate
                                                autoComplete="off"
                                              >
                                                <TextField
                                                  id="outlined-basic"
                                                  label="Nome Tipo Linea"
                                                  variant="outlined"
                                                  onChange={(e) =>
                                                    setType(e.target.value)
                                                  }
                                                />

                                                <Form.Group
                                                  controlId="form.Nome"
                                                  required
                                                >
                                                  <FormControl
                                                    variant="outlined"
                                                    className={
                                                      classes.formControlNature
                                                    }
                                                  >
                                                    <TextField
                                                      style={{
                                                        width: "204.4px",
                                                        height: "39px",
                                                      }}
                                                      id="outlined-basic"
                                                      label="Natura Tipo Linea"
                                                      value={nature}
                                                      onChange={
                                                        handleChangeNature
                                                      }
                                                      select
                                                      variant="filled"
                                                    >
                                                      <MenuItem value="REALE">
                                                        REALE
                                                      </MenuItem>
                                                      <MenuItem value="SIMULATO">
                                                        SIMULATO
                                                      </MenuItem>
                                                    </TextField>
                                                  </FormControl>
                                                </Form.Group>
                                              </Form>

                                              <div className={classes.divider2}>
                                                <Divider />
                                              </div>

                                              <div className={classes.bottoni}>
                                                {type !== "" &&
                                                nature !== "" ? (
                                                  <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={
                                                      functionAggiungiTypeLinea
                                                    }
                                                  >
                                                    Conferma
                                                  </Button>
                                                ) : (
                                                  <Button
                                                    disabled
                                                    variant="contained"
                                                    onClick={
                                                      functionAggiungiTypeLinea
                                                    }
                                                    color="secondary"
                                                  >
                                                    Conferma
                                                  </Button>
                                                )}

                                                <Button
                                                  variant="contained"
                                                  onClick={handleClose2}
                                                  color="primary"
                                                >
                                                  Cancella
                                                </Button>
                                              </div>
                                            </div>
                                          </Paper>
                                        </div>
                                      </Fade>
                                    </Modal>
                                  </div>

                                  <Button
                                    variant="contained"
                                    onClick={handleClose}
                                    color="primary"
                                  >
                                    No
                                  </Button>
                                </div>
                              </div>
                            </Paper>
                          </div>
                        </Fade>
                      </Modal>

                      {/*------------------MODALE RIMUOVI TYPE--------------- */}
                      <Modal
                        className={classes.modal}
                        open={openRemove}
                        onClose={handleCloseRemove}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={openRemove}>
                          <div className={classes.paper2}>
                            <Paper>
                              <div>
                                <ListItem>
                                  <ListItemIcon>
                                    <SettingsIcon className={classes.icon} />
                                  </ListItemIcon>
                                  <Typography
                                    className={classes.intestazione}
                                    variant="h5"
                                  >
                                    Rimuovi TypeLinea{" "}
                                  </Typography>
                                </ListItem>
                              </div>

                              <div className={classes.paperBottom}>
                                <Typography variant="h11">
                                  Sei sicuro di voler rimuovere il TypeLinea "
                                  <b>
                                    {openRemove === true
                                      ? typeLineaDescrizione
                                      : ""}
                                  </b>
                                  "
                                </Typography>

                                <div className={classes.divider2}>
                                  <Divider />
                                </div>

                                <div className={classes.bottoni}>
                                  <div>
                                    <Button
                                      onClick={() =>
                                        removeTypeLinea(typeLineaId.id)
                                      }
                                      variant="contained"
                                      color="secondary"
                                    >
                                      Si, RIMUOVI
                                    </Button>
                                    <Button
                                      onClick={handleCloseRemove}
                                      variant="contained"
                                      color="primary"
                                    >
                                      annulla
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Paper>
                          </div>
                        </Fade>
                      </Modal>
                      {/*------------------MODALE MODIFICA TYPE--------------- */}
                      <Modal
                        className={classes.modal}
                        open={openEdit}
                        onClose={handleCloseEdit}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={openEdit}>
                          <div className={classes.paper2}>
                            <Paper>
                              <div>
                                <ListItem>
                                  <ListItemIcon>
                                    <SettingsIcon className={classes.icon} />
                                  </ListItemIcon>
                                  <Typography
                                    className={classes.intestazione}
                                    variant="h5"
                                  >
                                    Modifica Tipo Linea
                                  </Typography>
                                </ListItem>
                              </div>

                              <div className={classes.paperBottom}>
                                <Form
                                  className={classes.rootForm}
                                  noValidate
                                  autoComplete="off"
                                >
                                  <Form.Group controlId="form.Descrizione">
                                    <Form.Control
                                      type="text"
                                      placeholder="Modifica descrizione"
                                      defaultValue={
                                        openEdit === true
                                          ? typeLineaDescrizione
                                          : ""
                                      }
                                      onChange={(e) =>
                                        setTypeLineaDescrizione(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                  <Form.Group controlId="form.Nome" required>
                                    <FormControl
                                      variant="outlined"
                                      className={classes.formControlNature}
                                    >
                                      <TextField
                                        id="outlined-basic"
                                        label="Natura Tipo Linea"
                                        value={nature}
                                        onChange={handleChangeNature}
                                        select
                                        variant="filled"
                                      >
                                        <MenuItem value="REALE">REALE</MenuItem>
                                        <MenuItem value="SIMULATO">
                                          SIMULATO
                                        </MenuItem>
                                      </TextField>
                                    </FormControl>
                                  </Form.Group>
                                </Form>
                                <div className={classes.divider2}>
                                  <Divider />
                                </div>

                                <div className={classes.bottoni}>
                                  <div>
                                    <Button
                                      onClick={() => editTypeLinea(typeLineaId)}
                                      variant="contained"
                                      color="secondary"
                                    >
                                      modifica
                                    </Button>
                                    <Button
                                      onClick={handleCloseEdit}
                                      variant="contained"
                                      color="primary"
                                    >
                                      annulla
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Paper>
                          </div>
                        </Fade>
                      </Modal>
                      {/*------------------MODALE ERRORE TYPE--------------- */}
                      <Modal
                        className={classes.modal}
                        open={openWarning}
                        onClose={handleOpenWarning}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={openWarning}>
                          <div className={classes.paper2}>
                            <Paper>
                              <div>
                                <ListItem>
                                  <ListItemIcon>
                                    <SettingsIcon className={classes.icon} />
                                  </ListItemIcon>
                                  <Typography
                                    className={classes.intestazione}
                                    variant="h5"
                                  >
                                    ERRORE{" "}
                                  </Typography>
                                </ListItem>
                              </div>

                              <div className={classes.paperBottom}>
                                <Typography variant="h11">{warning}</Typography>

                                <div className={classes.divider2}>
                                  <Divider />
                                </div>

                                <div className={classes.bottoni}>
                                  <div>
                                    <Button
                                      onClick={handleOpenWarning}
                                      variant="contained"
                                      color="primary"
                                    >
                                      OK
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Paper>
                          </div>
                        </Fade>
                      </Modal>
                    </div>
                    {/* ------------------------------FINE MODALI-------------------------------------- */}
                  </div>
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
              disabled={
                functions.indexOf("lineagen.create") === -1 ||
                functions.indexOf("linea.view") === -1 ||
                nextDisabled
              }
            />
            <Button
              component={NavLink}
              className="button-green-disactive"
              exact
              to="/editing/linee"
              variant="contained"
              size="medium"
              disabled={functions.indexOf("lineagen.create") === -1}
            >
              annulla
            </Button>
          </div>
        </Paper>
      </main>
    </div>
  );
}

export default EditingLineaCreaLineaGeneratore;
