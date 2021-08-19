import React from "react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "../../components/Navbar";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import ButtonClickedGreen from "../../components/ButtonClickedGreen";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Form from "react-bootstrap/Form";
import Input from "@material-ui/core/Input";
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
  quaterListItems,
} from "../../components/listItems";
import NavbarItemEdit from "../../components/NavbarItemEdit";
import {
  FormControl,
  ListItem,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import InputSelect from "../../components/InputSelect";
import "../../styles/App.css";
import DnsIcon from "@material-ui/icons/Dns";
import SelectBar from "../../components/SelectBar";
import MultipleSelect from "../../components/MultipleSelect";
import acccessControl from "../../service/url.js";
import Alert from "@material-ui/lab/Alert";

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
    display: "flex",
    flexDirection: "column",
    // backgroundColor: "blue",
  },

  fixedHeight: {
    height: 240,
  },
  buttonContainer: {
    marginBottom: "20px",
  },

  paper: {
    //backgroundColor: "yellow",
    display: "flex",
    alignItems: "center",
    padding: "3%",
    justifyContent: "flex-start",
  },

  label: {
    marginRight: "4%",
    marginLeft: "8%",
  },
  icon: {
    color: "rgba(71, 184, 129, 1)",
  },
  titolo: {
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "24px",
    color: "#66788A",
    lineHeight: "20px",
    color: "rgba(71, 184, 129, 1)",
    padding: "2%",
    // marginTop: "2%",
  },
  divider: {
    width: "90%",
    marginLeft: "5%",
    lineHeight: "1px",
  },

  bottone: {
    marginTop: "2%",
    marginLeft: "85%",
    marginBottom: "2%",
  },
  divSelect: {
    padding: "3%",
    // height: "115.6px",
  },

  multipleSelect: {
    width: "284px",
  },
  fromControl: {
    margin: theme.spacing(1),
    // width: "20vw",
    width: "200px",
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
  generalContainer: {
    display: "flex",
    marginTop: "5%",
    flexDirection: "column",
  },
  formControlSelect: {
    display: "flex",
    flexDiretions: "column",
  },
  select: {
    width: "400px",
  },
}));

function EditingOutboundProxy() {
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

  //put descrizione e ip

  const [ipDestinazione, setIPDestinazione] = useState("");
  const [ip1, setIP1] = useState("");
  const [ip2, setIP2] = useState("");
  const [ip3, setIP3] = useState("");
  const [ip4, setIP4] = useState("");
  const [porta, setPorta] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [typeLineaId, setTypeLineaId] = useState([]);

  const aggiornaIP = () => {
    if (
      ip1 !== "" &&
      //ip1.length < 5 &&
      ip2 !== "" &&
      //ip2.length < 5 &&
      ip3 !== "" &&
      //ip3 < 5 &&
      ip4 !== ""
      // ip4.length < 5
    ) {
      setIPDestinazione(ip1 + "." + ip2 + "." + ip3 + "." + ip4);
      console.log(ipDestinazione, "ip okay");
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
        ipDestinazione: ipDestinazione,
        descrizione: descrizione,
        porta: porta,
        typeLinee: typeLineaId,
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/obp`, requestOptions)
        .then((response) => response.json())
        //.then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      // localStorage.setItem("user-info", JSON.stringify(result));
      // history.push("/dashboard/testcase");
      window.location = "/editing/outboundproxy";
    };

    if (ipDestinazione !== "" && descrizione !== "" && porta !== "") {
      console.log(typeLineaId);
      Invia();
    } else {
      if (ipDestinazione === "") {
        document.getElementById("alertIP").style.display = "";
      } else {
        document.getElementById("alertIP").style.display = "none";
      }
      if (descrizione === "") {
        document.getElementById("alertDescrizione").style.display = "";
      } else {
        document.getElementById("alertDescrizione").style.display = "none";
      }
      if (porta === "" && ipDestinazione !== "" && descrizione !== "") {
        setPorta("5060");
        Invia();
        //document.getElementById("alertPorta").style.display = "";
      } else {
        document.getElementById("alertPorta").style.display = "none";
      }
    }
  }

  const handleChange = (event) => {
    setTypeLineaId(event.target.value);
    console.log(typeLineaId, "typeLineaId");
  };

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
        <List>{secondaryListItems}</List> <Divider />
        <List>{quaterListItems}</List>
      </Drawer>

      <Container maxWidth="lg" className={classes.container}>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />

          <div className={classes.containerNavbarItem}>
            <NavbarItemEdit fontSize="large" />
          </div>

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
          <Paper className={classes.generalPaper}>
            <ListItem>
              <ListItemIcon>
                <DnsIcon fontSize="large" className={classes.icon} />
              </ListItemIcon>
              <Typography className={classes.titolo}>
                {" "}
                OutboundBound Proxy{" "}
              </Typography>
            </ListItem>
            <Divider className={classes.divider} />

            <Paper className={classes.generalContainer} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>IP Proxy Address</Form.Label>
                  <div className={classes.divIp}>
                    <Form.Control
                      className={classes.formControlIp}
                      type="text"
                      placeholder="IP1"
                      onChange={(e) => {
                        setIP1(e.target.value);
                        aggiornaIP();
                      }}
                    />{" "}
                    <Typography className={classes.separatoreIp}>.</Typography>
                    <Form.Control
                      className={classes.formControlIp}
                      type="text"
                      placeholder="IP2"
                      onChange={(e) => {
                        setIP2(e.target.value);
                        aggiornaIP();
                      }}
                    />{" "}
                    <Typography className={classes.separatoreIp}>.</Typography>
                    <Form.Control
                      className={classes.formControlIp}
                      type="text"
                      placeholder="IP3"
                      onChange={(e) => {
                        setIP3(e.target.value);
                        aggiornaIP();
                      }}
                    />{" "}
                    <Typography className={classes.separatoreIp}>.</Typography>
                    <Form.Control
                      className={classes.formControlIp}
                      type="text"
                      placeholder="IP4"
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
                  </div>
                </Form.Group>
              </Paper>

              <Paper className={classes.divSelect} elevation={0}>
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
                  Descrizione is required!
                </Alert>
              </Paper>

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

              {/* <Paper className={classes.paper} elevation={0}>
                <Form.Label className={classes.label2}>Porta</Form.Label>
                <Form.Control
                  className={classes.formControl}
                  type="text"
                  placeholder="Inserisci Porta"
                  onChange={(e) => setPorta(e.target.value)}
                />
                <Alert
                  severity="error"
                  id="alertPorta"
                  style={{ display: "none" }}
                >
                  Porta is required!
                </Alert>
              </Paper> */}

              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Type Linea</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControlSelect}
                  >
                    <Select
                      multiple
                      className={classes.select}
                      value={typeLineaId}
                      onChange={handleChange}
                      input={<Input />}
                      //MenuProps={MenuProps}
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
                </Form.Group>
              </Paper>

              {/* <Paper className={classes.paper} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Type Linea</Form.Label>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <Select
                      multiple
                      value={typeLineaId}
                      onChange={handleChange}
                      input={<Input />}
                      //MenuProps={MenuProps}
                    >
                      {data.map((name) => (
                        <MenuItem key={name.id} value={name.id}>
                          {name.descrizione}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Form.Group>
                {/* <MultipleSelect className={classes.multipleSelect} /> 
              </Paper> */}

              <Paper className={classes.paperBottone}>
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
            </Paper>
          </Paper>
        </main>
      </Container>
    </div>
  );
}

export default EditingOutboundProxy;
