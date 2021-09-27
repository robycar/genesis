import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Navbar from "../../components/Navbar";
import NavbarItemLaunch from "../../components/NavbarItemLaunch";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
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

import Grid from "@material-ui/core/Grid";
import Orders from "../../components/Orders";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import NavbarItem from "../../components/NavbarItem";
import TestCaseTableNew from "../../components/TestCaseTableNew";

import Form from "react-bootstrap/Form";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";


import LaunchingTestCaseCard from "../launching/LaunchingTestCaseCard";

import LaunchingTestSuiteTable from "../launching/LaunchingTestSuiteTable";



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
    // backgroundColor: "red",
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
    width: "100%",
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
    // marginLeft: "62px",
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
  select: {
    display: "flex",
    padding: "10px",
    width: "300px",
  },
  loadTestC: {
    display: "flex",
    alignItems: "center",
    marginTop: "15px",
    marginBottom: "15px",
    padding: "10px",
    justifyContent: "center",
  },
  btnStart: {
    color: "success",
    backgroundColor: "#d55292",
    width: "100px",
    padding: "10px",
    size: "lg",
  },
  infoLoad: {
    display: "flex",
    alignItems: "center",
    marginTop: "15px",
    marginBottom: "15px",
    justifyContent: "center",
    padding: "2px",
  },
}));


let bearer = `Bearer ${localStorage.getItem("token")}`;

function LaunchingTestCase() {

  const [testSuites, setTestSuites] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [appearTest, setAppearTest] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  //DATA FOR LAUNCH TEST AND LOAD
  const [id, setId] = useState();
  const [idToRun, setIdToRun] = useState();
  const [data, setData] = useState();
  const [dataLoad, setTestCaseLoad] = useState(null);
  const [dataRun, setIdTestCaseRun] = useState(null);
  const [dataCase, setDataCase] = useState();

  const testCaseLoader = () => {
    loadTestCase(id);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const hadleLoadData = (rowDataaa) => {
    runCaseLoder(rowDataaa.id);
  };

  const runCaseLoder = () => {
    runTestCase(idToRun);
  }

  useEffect(() => {
  });

  const loadTestSuite = () => {
    if (testSuites.length > 0) {
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

    fetch(`/api/testcase/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestCases(result.testSuite.testCases);
      })
      .catch((error) => console.log("error", error));
  };

  /*--------------- GET TEST CASE -------------------*/

  const getAllTestCaseModal = () => {


    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", accessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");


    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setAppearTest(result.list);
        setDataCase(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  /*--------------- LOAD TEST CASE -------------------*/

  const loadTestCase = (id) => {

    var urlLoad = `/api/testcase/load/${id}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", accessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(urlLoad, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTestCaseLoad(result.list);
      })
      .catch((error) => console.log("error", error));

  };

  const runTestCase = (idRun) => {

    var urlLoad = `/api/testcase/runloaded/${idRun}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", accessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(urlLoad, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setIdTestCaseRun(result.list);
      })
      .catch((error) => console.log("error", error));

  };

  useEffect(() => {
    getAllTestCaseModal();
  }, [])


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
            {/* <NavLink exact to="/dashboard/testcase"> */}
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/launching/testcase"
            >
              Test Case
            </Button>
            {/* </NavLink> */}

            {/* <NavLink exact to="/dashboard/testsuite"> */}
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/launching/testsuite"
            >
              Test Suite
            </Button>
            {/* </NavLink> */}
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

            {/*---------------CONTENITORE TEST CASE-------------------*/}
            <Paper
              className={classes.paperContainer1}
              variant="outlined"
              elevation={1}
            >
              <Paper className={classes.paperTest}>
                <Typography className={classes.scritta}>
                  Test Suite Disponibili
                </Typography>
              </Paper>
              <Paper className={classes.paperTest}>
                <div className={classes.divSelectBar}>

                  {/* display post from the API 
                  {appearTest && (
                    <div className="">

                      {/* loop over the posts 
                      {appearTest.map((testCase, index) => (
                        <div key={index}>
                          <h2></h2>
                          <LaunchingTestCaseCard nome={testCase.nome}
                            id={testCase.id}
                            desc={testCase.descrizione}
                            createdBy={testCase.createdBy} />
                        </div>
                      ))}
                    </div>

                  )}*/}
                  <LaunchingTestSuiteTable />

                </div>
              </Paper>
            </Paper>
          </div>
        </Container>
      </main>
    </div>
  );
}

export default LaunchingTestCase;