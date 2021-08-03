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
import ModaleAddLinea from "../../components/ModaleAddLinea";
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
  select: {
    widht: "380x",
    height: "40px",
    padding: "2%",
    alignItems: "center",
  },
}));

function EditingLineaCreaLinea() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState([]);

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

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

  useEffect(() => {
    getTypeId();
  }, []);

  const [ip, setIP] = useState("");
  const [ip1, setIP1] = useState("");
  const [ip2, setIP2] = useState("");
  const [ip3, setIP3] = useState("");
  const [ip4, setIP4] = useState("");
  const [numero, setNumero] = useState("");
  const [password, setPassword] = useState("");
  const [porta, setPorta] = useState("");
  const [typeLineaId, setTypeLineaId] = useState("");

  const aggiornaIP = () => {
    if (ip1 !== "" && ip2 !== "" && ip3 !== "" && ip4 !== "") {
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
        numero: numero,
        password: password,
        porta: porta,
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
      //window.location = "/editing/linee";
    };

    if (
      ip !== "" &&
      numero !== "" &&
      password !== "" &&
      porta !== "" &&
      porta.length > 3 &&
      porta.length < 6 &&
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
      if (numero === "") {
        document.getElementById("alertNumero").style.display = "";
      } else {
        document.getElementById("alertNumero").style.display = "none";
      }
      if (password === "") {
        document.getElementById("alertPassword").style.display = "";
      } else {
        document.getElementById("alertPassword").style.display = "none";
      }
      if (porta === "" || porta.length < 4 || porta.length > 5) {
        document.getElementById("alertPorta").style.display = "";
      }
      else {
        document.getElementById("alertPorta").style.display = "none";
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
          <CreaItem titolo="Crea Linea" />

          <Divider className={classes.divider} />

          <div className={classes.generalContainer}>
            <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Numero</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Numero"
                    onChange={(e) => setNumero(e.target.value)}
                  />
                  <Alert
                    severity="error"
                    id="alertNumero"
                    style={{ display: "none" }}
                  >
                    Numero is required!
                  </Alert>
                </Form.Group>
              </Paper>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>IP Linea</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci IP1"
                    onChange={(e) => {
                      setIP1(e.target.value);
                      aggiornaIP();
                    }}
                  />{" "}
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci IP2"
                    onChange={(e) => {
                      setIP2(e.target.value);
                      aggiornaIP();
                    }}
                  />{" "}
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci IP3"
                    onChange={(e) => {
                      setIP3(e.target.value);
                      aggiornaIP();
                    }}
                  />{" "}
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci IP4"
                    onChange={(e) => {
                      setIP4(e.target.value);
                      aggiornaIP();
                    }}
                  />{" "}
                  <Alert
                    severity="error"
                    id="alertIP"
                    style={{ display: "none" }}
                  >
                    IP Linea is required!
                  </Alert>
                </Form.Group>
              </Paper>

              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Alert
                    severity="error"
                    id="alertPassword"
                    style={{ display: "none" }}
                  >
                    Password is required!
                  </Alert>
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
                    placeholder="Inserisci Porta"
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
                  <Form.Label>Type Linea</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      value={data.descrizione}
                      onChange={(e) => setTypeLineaId(e.target.value)}
                    >
                      {data.map((prova) => {
                        return (
                          <MenuItem key={prova.id} value={prova.id}>
                            {prova.descrizione}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <div className={classes.modaleAddLinea}>
                    <ModaleAddLinea />
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
            />
          </div>
        </Paper>
      </main>
    </div>
  );
}

export default EditingLineaCreaLinea;
