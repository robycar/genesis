import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../../src/assets/logoReply.png";
import loginImage from "../../src/assets/image.png";
import { login } from "../service/api";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
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
    marginLeft: "70%",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    height: "50px",
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
    marginTop: "7%",
  },
  signUp: {
    marginTop: "30%",
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Login() {
  let history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // function userLogin() {
  //   login(username, password);
  // }

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      // history.push("/dashboard/testcase");
    }
  }, []);

  const checkRichiesta = (result) => {
    console.log(result);

    const timer = () => {
      setTimeout(function () {
        alert("Mancano 5 minuti alla scadenza del token, verrete reindirizzatti automaticamente alla login")
        setTimeout(function () {
          history.push("/");
          localStorage.setItem("token", "")
        }, 1000 * 60 * 5);

      }, 1000 * 60 * 55);
    }

    clearTimeout(timer)

    if (result.error == null) {
      localStorage.setItem("token", JSON.stringify(result.access_token));

      timer()

      history.push("/dashboard/testcase");
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

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          <div>
            <img src={logo} alt="Logo" className={classes.logo} />
          </div>
          {/* <Typography component="h1" variant="h5">
            Sign in
          </Typography> */}

          <Paper className={classes.subpaper1} elevation={0}>
            <div className="subtitle">
              <Typography variant="h5" className={classes.intestazione1}>
                Sign up to Reply
              </Typography>
              <Typography variant="body1" className={classes.intestazione2}>
                Sign up on the internal platform
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
            <div className={classes.forgotPassword}>
              <Typography variant="body2" color="rgba(158, 160, 165, 1)">
                Forgot Password?
              </Typography>
            </div>
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
              <Button size="small" color="rgba(158, 160, 165, 1)">
                Or Sign up
              </Button>
            </div>
          </Paper>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        {/* <div className={classes.image}>
          <img src={loginImage} alt="Logo" />
        </div> */}
      </Grid>
    </Grid>
  );
}
