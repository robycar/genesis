import React from "react";
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
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
  quaterListItems,
} from "../../components/listItems";
import CreaItem from "../../components/CreaItem";
import { Paper } from "@material-ui/core";
import NavbarItemAdmin from "../../components/NavbarItemAdmin";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../../styles/App.css";
import Grid from "@material-ui/core/Grid";
import FormAddUtente from "../../components/FormAddUtente";

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
    marginBottom: "20px",
  },
}));

function AmministrazioneAddUtente() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerClose = () => {
    setOpen(false);
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
            <NavbarItemAdmin fontSize="large" />
          </div>

          <div className={classes.buttonContainer}>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/amministrazione/utenze"
            >
              UTENZE
            </Button>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/amministrazione/ruoli"
            >
              RUOLI
            </Button>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/amministrazione/autorizzazioni"
            >
              AUTORIZZAZIONI
            </Button>
            <Button
              className="button-green"
              component={NavLink}
              activeClassName="button-green-active"
              exact
              to="/amministrazione/gruppo"
            >
              GRUPPO
            </Button>
          </div>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
              <CreaItem titolo="Crea Utente" />
              <Divider className={classes.divider} />
            </Grid>
            <Grid item xs={12} style={{ display: "flex" }}>
              <FormAddUtente />
            </Grid>
          </Paper>
        </Container>
      </main>
    </div>
  );
}

export default AmministrazioneAddUtente;
