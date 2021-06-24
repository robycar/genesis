import React from "react";
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
import Navbar from "../components/Navbar";
import NavbarItemLaunch from "../components/NavbarItemLaunch";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "../components/listItems";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import SelectBar from "../components/SelectBar";

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
    flexDirection: "row",
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
    marginTop: "15px",
    marginLeft: "620px",
  },
}));

function Launching() {
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
            <NavbarItemLaunch fontSize="large" />
          </div>

          <Paper className={classes.generalContainer} elevation={1}>
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
                <SelectBar nome="Selezione Test Case" />
              </div>

              <div>
                <SelectBar nome="Selezione Test Suite" />
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
                  Numero Chiamante = 01225
                  <br /> Tipo Linea Chiamante = FIBRA <br /> Numero Chiamato
                  <br /> Tipo Line Chiamato
                  <br /> Numero Chiamante 2
                  <br /> Tipo Linea Chiamante 2
                  <br /> Numero Chiamante 3
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
          </Paper>

          {/*          <Paper className={classes.paperTest}>
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
      <ButtonClickedGreen nome="Start" />*/}
        </Container>
      </main>
    </div>
  );
}

export default Launching;
