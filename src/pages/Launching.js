import React from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import Navbar from "../components/Navbar";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NavbarItemLaunch from "../components/NavbarItemLaunch";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "../components/listItems";
import FormControl from "@material-ui/core/FormControl";
import TotalTestSuite from "../components/TotalTestSuite";
import Deposits from "../components/Deposits";
import Orders from "../components/Orders";
import ButtonClickedGreen from "../components/ButtonClickedGreen";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  containerNavbarItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  generalContainer: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
  },
  paperTestLeft: {
    width: "339px",
    height: "60px",
    border: "1px #9EA0A5",
    marginBottom: "20px",
  },
  paperTestRight: {
    width: "339px",
    height: "185px",
    border: "1px #9EA0A5",
    marginBottom: "20px",
  },
  paperContainer1: {
    flexDirection: "column",
    padding: "20px",
  },
  paperContainer2: {
    flexGrow: "4",
    flexDirection: "row",
    backgroundColor: "yellow",
    padding: "20px",
    marginBottom: "20px",
  },
  scritta: {
    padding: "20px",
    fontFamily: "roboto",
    fontSize: "26px",
    color: "#47B881",
    letterSpacing: "0.15px",
    textAlign: "center",
  },
  testo: {
    marginLeft: "20px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  formControl: {
    margin: theme.spacing(1),
    width: "300px",
  },
  containerSelect: {
    marginTop: "30px",
    marginBottom: "15px",
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    border: "1px solid #ced4da",
    fontSize: 16,
    height: "31px",
    width: "300px",
    marginTop: "30px",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

function Launching() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [test, setTest] = React.useState("");
  const handleChange = (event) => {
    setTest(event.target.value);
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
            <NavbarItemLaunch />
          </div>

          <Paper className={classes.generalContainer} elevation={1}>
            <Paper
              className={classes.paperContainer1}
              variant="outlined"
              elevation={1}
            >
              <Paper className={classes.paperTestLeft}>
                <Typography className={classes.scritta}>
                  Test Disponibili
                </Typography>
              </Paper>
              <div className={classes.containerSelect}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Seleziona Test Case
                  </InputLabel>
                  <Select
                    className={classes.select}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={test}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Seleziona Test Suite
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={test}
                    onChange={handleChange}
                    label="Test Suite"
                  >
                    <MenuItem value="">
                      <em>Nessuno</em>
                    </MenuItem>
                    <MenuItem value={10}>Test1</MenuItem>
                    <MenuItem value={20}>Test2</MenuItem>
                    <MenuItem value={30}>Test3</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Paper>

            <Paper className={classes.paperContainer2} elevation={2}>
              <Paper className={classes.paperTest}>
                <Typography className={classes.scritta}>
                  Informazioni{" "}
                </Typography>
                <Typography className={classes.testo}>
                  Chiamante= FIBRA 02154565{" "}
                </Typography>
                <Typography className={classes.testo}>
                  Chiamante= FIBRA 02154565{" "}
                </Typography>
              </Paper>

              <Paper className={classes.paperTest}>
                <Typography className={classes.scritta}>
                  Description{" "}
                </Typography>
                <Typography className={classes.testo}>
                  Chiamata da Fibra verso Fibra . La chiamata va in connessione,
                  chiamante e chiamato si scambiano i toni DTMF. La chiamata si
                  chiude con abbattimento del chiamante.
                </Typography>
              </Paper>

              <Paper className={classes.paperTest}>
                <Typography className={classes.scritta}>
                  Dettagli IP{" "}
                </Typography>
                <Typography className={classes.testo}>
                  Dati passati da BE
                </Typography>
              </Paper>
            </Paper>
          </Paper>
          <ButtonClickedGreen nome="Start" />
        </Container>
      </main>
    </div>
  );
}

export default Launching;
