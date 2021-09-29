import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Navbar from "../../components/Navbar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
  quaterListItems,
} from "../../components/listItems";
import Orders from "../../components/TestCaseComplete";
import NavbarItemReport from "../../components/NavbarItemReport";
import Table from "../../components/Table";
import { Typography } from "@material-ui/core";
import ChartReport from "../../components/ChartReport.js";
import "../../styles/App.css";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

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
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
    marginBottom: "10px",
  },
  buttonNotClickedBlue: {
    backgroundColor: "whute",
    border: "1px solid #1665D8",
    variant: "contained",
    color: "#1665D8",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },
  buttonClickedBlue: {
    backgroundColor: "#1665D8",
    color: "primary",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },
  containerNavbarItem: {},
  bottomContainer: {
    marginTop: "2%",
    display: "flex",
  },
  paperTable: {
    width: "62%",
    flexDirection: "column",
  },
  paperImg: {
    display: "flex",
    width: "36%",
    flexDirection: "column",
    marginLeft: "2%",
  },
  img: {
    width: "100%",
  },
  titleImg: {
    alignItems: "center",
    fontSize: "24px",
    padding: "5%",
    marginLeft: "20%",
    lineHeight: "20px",
  },
  chart: {
    position: "relative",
    width: "255px",
    marginLeft: "90px",
  },
}));

function Report() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const table = [
  //     {col1:"", col2:"Run", col3:"Passed", col4:"N/A", col5:"Failed"},
  //     {col1:"Registrazione",col2: 159, col3:6.0, col4:24, col5:4.0},
  //     {col1:"Plug-In", col2: 237, col3:9.0, col4:37, col5:4.3},
  //     {col1:"Focus P-CSCF", col2:262, col3:16.0, col4:24, col5:6.0},
  //     {col1:"Total", col2:305, col3:3.7, col4:67, col5:4.3},
  //   ]

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
            <NavbarItemReport fontSize="large" />
          </div>
        </Container>

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
            <div className={classes.bottonTest}>
            {/* <NavLink exact to="/dashboard/testcase"> */}
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/report/testcase"
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
              to="/report/testsuite"
            >
              Test Suite
            </Button>
            {/* </NavLink> */}
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/report/testgeneratore"
            >
              Test Generatore
            </Button>
          </div>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>

          <Paper className={classes.bottomContainer}>
            <Paper className={classes.paperTable}>
              <Table />
            </Paper>
            <Paper className={classes.paperImg}>
              <Typography className={classes.titleImg}>
                Test Suite-CB Fibra
              </Typography>
              <div className={classes.chart}>
                <ChartReport />
              </div>
            </Paper>
          </Paper>
        </Container>
      </main>
    </div>
  );
}

export default Report;
