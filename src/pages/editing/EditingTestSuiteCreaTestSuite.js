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
import Form from "react-bootstrap/Form";
import Alert from "@material-ui/lab/Alert";
import acccessControl from "../../service/url";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
  quaterListItems,
} from "../../components/listItems";
import NavbarItemEdit from "../../components/NavbarItemEdit";
import ButtonClickedGreen from "../../components/ButtonClickedGreen";
import { Paper, Typography } from "@material-ui/core";
import CreaItem from "../../components/CreaItem";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TestSuiteSelectNew from "../../components/TestSuiteSelectNew";
import InputSelect from "../../components/InputSelect";

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
    flexDirection: "column",
    padding: "1%"
    // padding: "20px",
  },
  paperContainer2: {
    // marginTop: "2%",
    flexDirection: "column",
    padding: "2%",
    width: "80%",
    height: "660px",
    marginLeft: "5%",
    overflow: "auto",
  },
  divSelect: {
    marginTop: "3%",
    padding: "4%",
  },
  bottone: {
    display: "flex",
    marginLeft: "60%",
    marginTop: "2%",
    flexDirection: "row",
  },
  divider: {
    width: "90%",
    marginLeft: "5%",
    lineHeight: "1px",
    marginTop: "2%",
  },
  buttonTestContainer: {
    marginTop: "2%",
  },
}));

function EditingTestTestSuiteCreaTestSuite() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");

  const handleDrawerClose = () => {
    setOpen(false);
  };



  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  function salva() {
    const Invia = () => {
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
      // window.location = "/editing/testsuite";
    };

    if (nome !== "" && descrizione !== "") {
      Invia();
    
    } else {
      if (nome === "") {
        document.getElementById("alertNome").style.display = "";
      } else {
        document.getElementById("alertIP").style.display = "none";
      }
      if (descrizione === "") {
        document.getElementById("alertDescrizione").style.display = "";
      } else {
        document.getElementById("alertDescrizione").style.display = "none";
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
              to="/editing/testCreaTestCase"
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

        <Paper className={classes.paper} elevation={2}>
          <CreaItem titolo="Crea Test Suite" />
          <Divider className={classes.divider} />

          <div className={classes.generalContainer}>
            <Paper className={classes.paperContainer1} elevation={2}>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    className={classes.formControl}
                    type="text"
                    placeholder="Inserisci Nome"
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <Alert
                    severity="error"
                    id="alertNome"
                    style={{ display: "none" }}
                  >
                    Il Nome è richiesto!
                  </Alert>
                </Form.Group>
              </Paper>
              <Paper className={classes.divSelect} elevation={0}>
                <Form.Group controlId="form.Numero">
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
                    La Descrizione è richiesta!
                  </Alert>
                </Form.Group>
              </Paper>
            </Paper>

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
          </div>
          <Divider className={classes.divider} />

          <div className={classes.bottone}>
            <Button
              className="button-green"
              //component={NavLink}
              activeClassName="button-green-active"
            >
              Crea
            </Button>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/editing/testsuite"
              //className={classes.}
            >
              Annulla
            </Button>
          </div>
        </Paper>
      </main>
    </div>
  );
}

export default EditingTestTestSuiteCreaTestSuite;
