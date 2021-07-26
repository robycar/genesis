import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
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
import logo from "../../assets/logoReply.png";
import img from "../../assets/Bitmap.png";
import Orders from "../../components/TestCaseComplete";
import NavbarItemReport from "../../components/NavbarItemReport";
import ButtonNotClickedBlue from "../../components/ButtonNotClickedBlue";
import ButtonClickedBlue from "../../components/ButtonClickedBlue";
import Table from "../../components/Table";
import { Typography } from "@material-ui/core";
import ChartReport from "../../components/ChartReport.js";
import "../../styles/App.css";
import { NavLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
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
  contenuto: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  generalPaper: {
    display: "flex",
    width: "960px",
  },
  logo: {
    height: "50px",
  },
  intestazione: {
    color: "rgba(158, 160, 165, 1)",
    marginLeft: "35px",
    width: "200px",
    display: "flex",
    alignItems: "baseline",
  },
  margin: {
    // margin: theme.spacing(1),
    color: "rgba(158, 160, 165, 1)",
  },
  button: {
    marginTop: "5%",
    width: "352px",
    height: "39px",
    marginLeft: "4%",
  },
  paper1: {
    padding: "3%",
    width: "480px",
  },
  paper2: {
    width: "fit-content",
    justifyContent: "center",
    alignItems: "center",
  },
  subpaper1: {
    padding: "4%",
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    padding: "5%",
    marginBottom: "2%",
  },
  intestazione1: {
    fontSize: "24px",
    color: "primary",
    // marginBottom: "1%",
    marginLeft: "2%",
  },
  intestazione2: {
    marginBottom: "9%",
    color: "rgba(158, 160, 165, 1)",
    marginLeft: "2%",
  },
  img: {
    marginLeft: "2%",
  },
}));

function Login() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      // history.push("/dashboard/testcase");
    }
  }, []);
  async function login() {
    console.warn(username, password);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    let result = await fetch(
      `http://localhost:9081/api/auth/login`,
      requestOptions
    );

    result = await result.json();
    console.log(result);
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/dashboard/testcase");
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

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
          <Paper className={classes.generalPaper} elevation={1}>
            <Paper className={classes.paper1}>
              <Toolbar className={classes.toolbar} boxShadow={0}>
                <img src={logo} alt="Logo" className={classes.logo} />

                <Typography className={classes.intestazione} variant="body2">
                  Have ah account?
                  <Button size="small" className={classes.margin}>
                    {" "}
                    Sign in
                  </Button>
                </Typography>
              </Toolbar>

              <Paper className={classes.subpaper1} elevation={0}>
                <Typography variant="h5" className={classes.intestazione1}>
                  Sign up to Reply
                </Typography>
                <Typography variant="body1" className={classes.intestazione2}>
                  Sign up on the internal platform
                </Typography>
                <TextField
                  className={classes.textField}
                  required
                  //id="outlined-required"
                  label="Username"
                  variant="outlined"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <TextField
                  className={classes.textField}
                  required
                  id="outlined-required"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  className={classes.button}
                  variant="contained"
                  onClick={login}
                  color="primary"
                >
                  Login
                </Button>
              </Paper>
            </Paper>

            <Paper className={classes.paper2} elevation={0}>
              <img src={img} alt="Immagine" className={classes.img} />
            </Paper>
          </Paper>
        </Container>
      </main>
    </div>
  );
}
export default Login;
