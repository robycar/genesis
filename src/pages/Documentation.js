import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Navbar from "../components/Navbar";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "../components/listItems";
import { Card, Paper } from "@material-ui/core";
import NavbarItemDocu from "../components/NavbarItemDocu";
import SimpleCard from "../components/SimpleCard";
import TotalTestCase from "../components/TotalPlannedDaylyTestCase";
import TotalTestSuite from "../components/TotalPlannedWeeKlyTestSuite";

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
  },
  fixedHeight: {
    height: 240,
  },

  generalContainer: {
    display: "flex",
    padding: "20px",
    flexDirection: "row",
    justifyContent: "space-around",
    marginRight: "20px",
    marginLeft: "20px",
    marginBottom: "20px",
  },
  cardContainer: {
    width: "350px",
    heigth: "234px",
  },
  card: {
    alignItems: "center",
    height: "234px",

    // marginLeft: "10px",
    // marginRight: "10px",
    // marginTop: "10px",
    // marginBottom: "10px",
  },
}));

function Documentation() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />

        <Container maxWidth="lg" className={classes.container}>
          <div className={classes.containerNavbarItem}>
            <NavbarItemDocu fontSize="large" />
          </div>
        </Container>

        <Paper className={classes.generalContainer} elevation={3}>
          <Paper className={classes.cardContainer}>
            <SimpleCard
              className={classes.card}
              titolo="Requisiti Funzionali"
            />
          </Paper>
          <Paper className={classes.cardContainer}>
            <SimpleCard className={classes.card} titolo="Linee Guida" />
          </Paper>
          <Paper className={classes.cardContainer}>
            <SimpleCard className={classes.card} titolo="Release Note" />
          </Paper>
        </Paper>

        <Paper className={classes.generalContainer} elevation={3}>
          <Paper className={classes.cardContainer} elevation={2}>
            <SimpleCard className={classes.card} titolo="MoM" />
          </Paper>
          <Paper className={classes.cardContainer}>
            <SimpleCard
              className={classes.card}
              titolo="Altri File A Corredo"
            />
          </Paper>
          <Paper className={classes.cardContainer}>
            <SimpleCard className={classes.card} titolo="Documenti" />
          </Paper>
        </Paper>
      </main>
    </div>
  );
}

export default Documentation;
