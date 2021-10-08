import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../src/assets/genesisLogin.png";
import { login } from "../service/api";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import SignUp from "./SignUp";
import { Link } from "@material-ui/core";
import ForgotPassword from "./ForgotPassword";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //marginTop: "10%",
    height: "80vh",
    padding: "4%"
    //backgroundColor: "yellow",
  },
  image: {
    // backgroundImage: `url(${loginImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
  },
  forgotPassword: {
    // marginBottom: "9%",
    color: "rgba(158, 160, 165, 1)",
    marginTop: "10%",
    // marginLeft: "70%",
  },
  paper: {
    margin: theme.spacing(3, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    //height: "80%",
    //backgroundColor: "red",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    height: "20vh",
    //width: "50%",
  },
  divLogo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // marginLeft: "28%"
  },
  subpaper1: {
    width: "80%",
    padding: "4%",
    display: "flex",
    flexDirection: "column",
  },
  intestazione1: {
    fontSize: "24px",
    color: "primary",
    textAlign: "center",
  },
  intestazione2: {
    marginBottom: "9%",
    color: "rgba(158, 160, 165, 1)",
    textAlign: "center",
  },
  button: {
    marginTop: "3%",
  },
  signUp: {
    marginTop: "10%",
    display: "flex",
    flexDirection: "column",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  generalPaper: {


  }
}));

export default function Login() {
  let history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    if (localStorage.getItem("user-info")) {
    }
  }, []);

  const checkRichiesta = (result) => {


    const timer = () => {
      setTimeout(function () {
        alert(
          "Mancano 5 minuti alla scadenza del token, verrete reindirizzatti automaticamente alla login"
        );
        setTimeout(function () {
          history.push("/");
          localStorage.setItem("token", "");
        }, 1000 * 60 * 5);
      }, 1000 * 60 * 55);
    };

    clearTimeout(timer);

    if (result.error == null) {
      localStorage.setItem("token", result.access_token);
      localStorage.setItem("username", result.username);
      localStorage.setItem("livello", result.currentRole);
      localStorage.setItem("gruppo", result.currentGroup);
      localStorage.setItem("funzioni", result.functions);

      timer();

      window.location = "/dashboard/testcase"
      //history.push("/dashboard/testcase")
    } else if (result.error.code === "ADMIN-0004") {
      document.getElementById("alertUsername").style.display = "";
    } else {
      document.getElementById("alertUsername").style.display = "none";
    }
  };

  const accesso = (username, password) => {
    (async () => {
      checkRichiesta(await login(username, password));
    })();
  };


  const [open, setOpen] = React.useState(false);
  const [openResetPassword, setOpenResetPassword] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenResetPassword = () => {
    setOpenResetPassword(true);
  };

  const handleCloseResetPassword = () => {
    setOpenResetPassword(false);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid className={classes.generalPaper} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <div className={classes.divLogo}>
            <img src={logo} alt="Logo" className={classes.logo} />
          </div>
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}

          <Paper className={classes.subpaper1} elevation={0}>
            <div className="subtitle">
              <Typography variant="h5" className={classes.intestazione1}>
                Sign in to Reply
              </Typography>
              <Typography variant="body1" className={classes.intestazione2}>
                Sign in on the internal platform
              </Typography>
            </div>
            <Alert
              severity="error"
              id="alertUsername"
              style={{ display: "none" }}
            >
              Username e/o Password errati!
            </Alert>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="user"
              autoComplete="off"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

            <Button
              className={classes.button}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              // className={classes.submit}
              onClick={() => accesso(username, password)}
            >
              Accedi
            </Button>

            <div className={classes.signUp}>
              <Button variant="outlined" color="primary" onClick={handleOpen}>
                o REGISTRATI
              </Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div className={classes.paperModal}>
                    <SignUp />
                    {/* <h2 id="transition-modal-title">Transition modal</h2>
                    <p id="transition-modal-description">
                      react-transition-group animates me.
                    </p> */}
                  </div>
                </Fade>
              </Modal>
              <div className={classes.forgotPassword}>
                {/* <Typography variant="body2" color="rgba(158, 160, 165, 1)">
                Forgot Password?
              </Typography> */}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={handleOpenResetPassword}
                    >
                      Password dimenticata?
                    </Link>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={openResetPassword}
                      onClose={handleCloseResetPassword}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={openResetPassword}>
                        <div className={classes.paperModal}>
                          <ForgotPassword />
                          {/* <h2 id="transition-modal-title">Transition modal</h2>
                    <p id="transition-modal-description">
                      react-transition-group animates me.
                    </p> */}
                        </div>
                      </Fade>
                    </Modal>
                  </Grid>
                </Grid>
              </div>
            </div>
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
}
