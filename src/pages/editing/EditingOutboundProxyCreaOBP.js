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
import Container from "@material-ui/core/Container";
import ButtonClickedGreen from "../../components/ButtonClickedGreen";
import Form from "react-bootstrap/Form";
import Input from "@material-ui/core/Input";
import Col from "react-bootstrap/Col";
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
import "../../styles/App.css";
import DnsIcon from "@material-ui/icons/Dns";
import acccessControl from "../../service/url.js";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import {ButtonEditing} from "../../components/ButtonBarraNavigazione"

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
    padding: "2%",
    // marginTop: "2%",
  },
  divider: {
    width: "90%",
    marginLeft: "5%",
    lineHeight: "1px",
  },

  bottone: {
    marginLeft: "75%",
    // marginTop: "2%",
    // marginBottom: "2%",
    padding: "2%",
  },
  divSelect: {
    padding: "3%",
    width: "52%",
    // height: "115.6px",
  },

  multipleSelect: {
    width: "284px",
  },
  formControl: {
    margin: theme.spacing(1),
    // width: "20vw",
    width: "300px",
    display: "flex",
  },
  formControlIp: {
    margin: theme.spacing(1),
    width: "70px",
  },
  divIp: {
    display: "flex",
    flexDirection: "row",
    //alignItems: "flex-end",
    alignItems: "center",
  },
  separatoreIp: {
    marginBottom: "2%",
    fontWeight: "600px",
    lineHeigth: "2%",
    //fontSize: "2px",
  },
  generalContainer: {
    display: "flex",
    // marginTop: "5%",
    flexDirection: "row",
    alignItems: "center",
    padding: "4%",
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
  let history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [data, setData] = useState([]);
  const [ip1, setIP1] = useState("");
  const [ip2, setIP2] = useState("");
  const [ip3, setIP3] = useState("");
  const [ip4, setIP4] = useState("");
  const [porta, setPorta] = useState("5060");
  const [descrizione, setDescrizione] = useState(" ");
  const [typeLineaId, setTypeLineaId] = useState([]);

  const bearer = `Bearer ${localStorage.getItem("token")}`;

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

  function salva() {
    const Invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        ipDestinazione: ip1 + "." + ip2 + "." + ip3 + "." + ip4,
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

      history.push("/editing/outboundproxy");
    };
    console.log(ip1 !== "", "ip1");
    console.log(ip2 !== "", "ip2");
    console.log(ip3 !== "", "ip3");
    console.log(ip4 !== "", "ip4");
    console.log(typeLineaId.length !== 0, "TipoLinea");
    console.log(typeLineaId, "tipoLinea");

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

        Invia();
      } else {
        document.getElementById("alertIP2").style.display = "";
      }
    };

    if (
      ip1 !== "" &&
      ip2 !== "" &&
      ip3 !== "" &&
      ip4 !== "" &&
      typeLineaId.length !== 0 &&
      (porta === "" || (porta.length > 3 && porta.length < 6))
    ) {
      if (porta === "") {
        setPorta("5060");
      }
      if (descrizione === "") {
        setDescrizione(" ");
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
      if (porta.length < 4 || porta.length > 5) {
        document.getElementById("alertPorta").style.display = "";
        console.log(typeLineaId);
      } else {
        document.getElementById("alertPorta").style.display = "none";
      }
      if (typeLineaId.length === 0) {
        document.getElementById("alertTypeLinea").style.display = "";
      } else {
        document.getElementById("alertTypeLinea").style.display = "none";
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

          <ButtonEditing />

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
              <Col>
                <Paper className={classes.divSelect} elevation={0}>
                  <Form.Group controlId="form.Numero">
                    <Form.Label>IP Proxy Address</Form.Label>
                    <div className={classes.divIp}>
                      <Form.Control
                        className={classes.formControlIp}
                        type="number"
                        placeholder="IP1"
                        onChange={(e) => {
                          setIP1(e.target.value);
                        }}
                      />{" "}
                      <Typography className={classes.separatoreIp}>
                        .
                      </Typography>
                      <Form.Control
                        className={classes.formControlIp}
                        type="number"
                        placeholder="IP2"
                        onChange={(e) => {
                          setIP2(e.target.value);
                        }}
                      />{" "}
                      <Typography className={classes.separatoreIp}>
                        .
                      </Typography>
                      <Form.Control
                        className={classes.formControlIp}
                        type="number"
                        placeholder="IP3"
                        onChange={(e) => {
                          setIP3(e.target.value);
                        }}
                      />{" "}
                      <Typography className={classes.separatoreIp}>
                        .
                      </Typography>
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
                      IP Linea is required!
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
                  <Form.Group controlId="form.Numero">
                    <Form.Label>Tipo Linea</Form.Label>
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
                      <Alert
                        severity="error"
                        id="alertTypeLinea"
                        style={{ display: "none" }}
                      >
                        Selezionare almeno un TypeLinea
                      </Alert>
                    </FormControl>
                  </Form.Group>
                </Paper>
              </Col>

              <Col>
                <Paper className={classes.divSelect} elevation={0}>
                  <Form.Group controlId="form.Numero">
                    <Form.Label>Porta</Form.Label>
                    <Form.Control
                      className={classes.formControl}
                      type="number"
                      placeholder="Inserisci Porta"
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
              </Col>
            </Paper>

            <Divider className={classes.divider} />
            <div className={classes.bottone}>
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
                to="/editing/outboundproxy"
                variant="contained"
                size="medium"
              >
                Annulla
              </Button>
            </div>
          </Paper>
        </Container>
      </main>
    </div>
  );
}

export default EditingOutboundProxy;
