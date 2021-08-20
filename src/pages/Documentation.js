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
import {
  mainListItems,
  secondaryListItems,
  tertiaryListItems,
  quaterListItems,
} from "../components/listItems";
import { Paper } from "@material-ui/core";
import NavbarItemDocu from "../components/NavbarItemDocu";
import SimpleCard from "../components/SimpleCard";
import SearchBarDocu from "../components/SearchBarDocu";
import { Typography } from "@material-ui/core";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DescriptionIcon from "@material-ui/icons/Description";
import { NavLink } from "react-router-dom";
import Settings from "@material-ui/icons/Settings";
import SubjectIcon from "@material-ui/icons/Subject";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SendIcon from "@material-ui/icons/Send";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

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
    marginTop: "3%",
  },
  cardContainer: {
    width: "350px",
    heigth: "234px",
  },
  card: {
    alignItems: "center",
    height: "234px",
  },
  generalPaper: {
    padding: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  intestazione: {
    marginBottom: "2%",
    fontFamily: "Segoe UI Symbol",
    fontSize: "18px",
    color: "#47B881",
  },
  divSearch: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "2%",
  },
  divider: {
    width: "90%",
    marginLeft: "5%",
    lineHeight: "1px",
    marginTop: "2%",
  },
  searchButton: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#47B881",
    marginLeft: "1%",
    color: "#FFFFFF",
  },
}));

function Documentation() {
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
            <NavbarItemDocu fontSize="large" />
          </div>
        </Container>

        <Paper className={classes.generalPaper}>
          <div className={classes.divSearch}>
            <Typography className={classes.intestazione}>
              Everything you need to get your documentation online
            </Typography>
            <div className={classes.searchButton}>
              <SearchBarDocu
                className={classes.search}
                placeholder="Search the docs..."
              />
              <Button
                className={classes.button}
                variant="contained"
                endIcon={<Icon>send</Icon>}
                activeClassName="button-green-active"
              >
                Send
              </Button>
            </div>
          </div>
          <Divider className={classes.divider} />
          <Paper className={classes.generalContainer} elevation={3}>
            <Paper className={classes.cardContainer}>
              <SimpleCard
                className={classes.card}
                titolo="Requisiti Funzionali"
                startIcon={<Settings className={classes.icon} />}
                color="secondary"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="documentation/requisitifunzionali"
              />
            </Paper>
            <Paper className={classes.cardContainer}>
              <SimpleCard
                className={classes.card}
                titolo="Linee Guida"
                startIcon={<AssignmentIcon className={classes.icon} />}
              />
            </Paper>
            <Paper className={classes.cardContainer}>
              <SimpleCard
                className={classes.card}
                titolo="Release Note"
                startIcon={<SubjectIcon className={classes.icon} />}
              />
            </Paper>
          </Paper>

          <Paper className={classes.generalContainer} elevation={3}>
            <Paper className={classes.cardContainer} elevation={2}>
              <SimpleCard
                className={classes.card}
                titolo="MoM"
                startIcon={<SendIcon className={classes.icon} />}
              />
            </Paper>
            <Paper className={classes.cardContainer}>
              <SimpleCard
                className={classes.card}
                titolo="Altri File A Corredo"
                startIcon={<MenuBookIcon className={classes.icon} />}
              />
            </Paper>
            <Paper className={classes.cardContainer}>
              <SimpleCard
                className={classes.card}
                titolo="Documenti"
                startIcon={<DescriptionIcon className={classes.icon} />}
              />
            </Paper>
          </Paper>
        </Paper>
      </main>
    </div>
  );
}

export default Documentation;
