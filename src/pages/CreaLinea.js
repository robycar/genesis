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
import NavbarItemEdit from "../components/NavbarItemEdit";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import { Paper, Typography } from "@material-ui/core";
import SelectBar from "../components/SelectBar";
import CreaItem from "../components/CreaItem";

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
  },
  fixedHeight: {
    height: 240,
  },
  buttonContainer: {
    marginBottom: "20px",
  },
  generalContainer: {
    display: "flex",
    marginTop: "5%",
  },
  paperContainer1: {
    flexDirection: "column",
    padding: "20px",
  },
  paperContainer2: {
    flexDirection: "column",
    padding: "20px",
  },
  divSelect: {
    padding: "5%",
  },
  bottone: {
    marginLeft: "65%",
    marginTop: "5%",
  },
}));

function CreaLinea() {
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
            <NavbarItemEdit fontSize="large" />
          </div>
        </Container>
        <div className={classes.buttonContainer}>
          <ButtonClickedGreen nome="LINEE" />

          <ButtonNotClickedGreen nome="OUTBOUND PROXY" />

          <ButtonNotClickedGreen nome="TEMPLATE" />

          <ButtonNotClickedGreen nome="TEST" />
        </div>

        <Paper className={classes.paper}>
          <CreaItem titolo="Crea Linea" />

          <div className={classes.generalContainer}>
            <Paper className={classes.paperContainer1} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Typography className={classes.label} variant="h11">
                  ID Linea{" "}
                </Typography>
                <SelectBar />
              </Paper>
              <Paper className={classes.divSelect} elevation={0}>
                <Typography className={classes.label} variant="h11">
                  Numero{" "}
                </Typography>
                <SelectBar />
              </Paper>
              <Paper className={classes.divSelect} elevation={0}>
                <Typography className={classes.label} variant="h11">
                  ID Type Linea{" "}
                </Typography>
                <SelectBar />
              </Paper>
              <Paper className={classes.divSelect} elevation={0}>
                <Typography className={classes.label} variant="h11">
                  {" "}
                </Typography>
              </Paper>
            </Paper>

            <Paper className={classes.paperContainer2} elevation={0}>
              <Paper className={classes.divSelect} elevation={0}>
                <Typography className={classes.label} variant="h11">
                  Password{" "}
                </Typography>
                <SelectBar />
              </Paper>
              <Paper className={classes.divSelect} elevation={0}>
                <Typography className={classes.label} variant="h11">
                  IP Simulatore{" "}
                </Typography>
                <SelectBar />
              </Paper>
              <Paper className={classes.divSelect} elevation={0}>
                <Typography className={classes.label} variant="h11">
                  IP Simulatore{" "}
                </Typography>
                <SelectBar />
              </Paper>
              <div className={classes.bottone}>
                <ButtonClickedGreen size="medium" nome="Crea" />
              </div>
            </Paper>
          </div>
        </Paper>
      </main>
    </div>
  );
}

export default CreaLinea;
