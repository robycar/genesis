import React, {useState, useEffect} from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Navbar from "../../components/Navbar";
import NavbarItemLaunch from "../../components/NavbarItemLaunch";
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
  quaterListItems,
} from "../../components/listItems";
import ButtonClickedGreen from "../../components/ButtonClickedGreen";
import SelectAutocompleteTestCase from "../../components/SelectAutocompleteTestCase";
import SelectAutocompleteTestSuite from "../../components/SelectAutocompleteTestSuite";
import accessControl from "../../service/url.js";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24,
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
  },
  fixedHeight: {
    height: 240,
  },
  containerNavbarItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  generalContainer: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
    width: "100%",
  },
  paperTest: {
    border: "1px",
    marginTop: "5px",
    elevation: "2",
  },

  paperContainer1: {
    flexDirection: "column",
    padding: "20px",
  },
  paperContainer2: {
    flexGrow: "4",
    flexDirection: "column",
    padding: "20px",
    marginBottom: "20px",
    marginLeft: "20px",
  },
  scritta: {
    padding: "20px",
    fontSize: "26px",
    color: "#47B881",
    letterSpacing: "0.15px",
    textAlign: "center",
  },
  testo: {
    padding: "20px",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "300px",
  },
  containerSelect: {
    marginTop: "30px",
    marginBottom: "15px",
  },
  bottone: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "15px",
  },
  buttonNotClickedGreen: {
    backgroundColor: "white",
    "&:hover": {
      background: "#47B881",
      color: "white",
    },
    border: "1px solid #47B881 ",
    variant: "contained",
    color: "#47B881",
    width: "200px",
    height: "40px",
    marginRight: "10px",
  },
  bottonTest: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "0px",
  },
  active: {
    backgroundColor: "#47B881",
    color: "white",
  },
}));


let bearer = `Bearer ${localStorage.getItem("token")}`;
function Launching() {
  
  const [testSuites, setTestSuites] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    loadTestSuite();
  })
  
  const loadTestSuite = () => {
    if (testSuites.length>0){
      return;
    }
     
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", accessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch(`/api/testsuite`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestSuites(result.list);
      })
      .catch((error) => console.log("error", error));
  };
  
  const loadTestCases = (id) => {
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", accessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");
  
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
  
    fetch(`/api/testsuite/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestCases(result.testSuite.testCases);
      })
      .catch((error) => console.log("error", error));
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
            <NavbarItemLaunch />
          </div>

          <div className={classes.bottonTest}>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/launching/testcase"
            >
              Test Case
            </Button>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/launching/testsuite"
            >
              Test Suite
            </Button>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/launching/testgeneratore" 
            >
              Test Generatore
            </Button>
          </div>

          <div className={classes.generalContainer} elevation={1}>
            <Paper
              className={classes.paperContainer1}
              variant="outlined"
              elevation={1}
            >
              <Paper className={classes.paperTest}>
                <Typography className={classes.scritta}>
                  Test Disponibili
                </Typography>
              </Paper>
              <div className={classes.containerSelect}>
                <SelectAutocompleteTestSuite
                 items={testSuites?.map(i => ({id: i.id, nome: i.nome}))} 
                 onChange ={(id) => {loadTestCases(id)}}/>
              </div>

              <div>
                <SelectAutocompleteTestCase 
                items={testCases?.map(i => ({value: i.id, nome: i.nome, testCases: i.testCases}))} 
                />
              </div>
            </Paper>

            <Paper
              className={classes.paperContainer2}
              variant="outlined"
              elevation={1}
            >
              <Paper className={classes.paperTest}>
                <Typography className={classes.scritta}>
                  Informazioni{" "}
                </Typography>
                <Typography className={classes.testo}>
                  Numero Chiamante = 01225*****
                  <br /> Tipo Linea Chiamante = FIBRA <br /> Numero Chiamato =
                  2494******
                  <br /> Tipo Linea Chiamante = FIBRA
                  <br /> Numero Chiamante 2 = 0126*****
                  <br /> Tipo Linea Chiamante 2 = *****
                  <br /> Numero Chiamante 3 = 0127*****
                  <br /> Tipo Linea Chiamante 3 = *****
                </Typography>
              </Paper>

              <Paper className={classes.paperTest}>
                <Typography className={classes.scritta}>
                  Descrizione{" "}
                </Typography>
                <Typography className={classes.testo}>
                  IP_proxy_client = 24869868 <br /> IP_proxy_client = 24869868{" "}
                  <br /> IP_proxy_client = 24869868 <br />
                </Typography>
              </Paper>

              <Paper className={classes.paperTest}>
                <Typography className={classes.scritta}>
                  Dettagli IP{" "}
                </Typography>
                <Typography className={classes.testo}>
                  Informazioni fornite da BE
                </Typography>
              </Paper>
              <div className={classes.bottone}>
                <ButtonClickedGreen nome="Start" />
              </div>
            </Paper>
          </div>

         
        </Container>
      </main>
    </div>
  );
}

export default Launching;
