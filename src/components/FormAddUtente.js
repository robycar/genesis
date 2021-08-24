import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import acccessControl from "../service/url.js";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
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
  select: {
    width: "526px",
  },
}));

function FormAddUtente() {
  let history = useHistory();
  const classes = useStyles();

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [gruppo, setGruppo] = useState("");
  const [azienda, setAzienda] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  const [email, setEmail] = useState("");
  // console.warn(level);
  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const [appearGroup, setAppearGroup] = useState([]);
  const [appearLevel, setAppearLevel] = useState([]);

  const getGroup = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    // console.log(bearer.toString());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/group`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearGroup(result.gruppi);
      })
      .catch((error) => console.log("error", error));
  };

  const getAppearLevel = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    // console.log(bearer.toString());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/level`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearLevel(result.livelli);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getGroup();
    getAppearLevel();
  }, []);

  const checkRichiesta = (result) => {
    if (result.error == null) {
      history.push("/amministrazione/utenze");
    } else if (result.error.code === "ADMIN-0003") {
      document.getElementById("alertUsername2").style.display = "";
    } else {
      document.getElementById("alertUsername2").style.display = "none";
    }
  };

  function addUtente() {
    const Invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        password: password,
        username: username,
        cognome: cognome,
        nome: nome,
        azienda: azienda,
        email: email,
        level: {
          id: level,
        },
        gruppo: {
          id: gruppo,
        },
      });

      var requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/user`, requestOptions)
        .then((response) => response.json())
        .then((result) => checkRichiesta(result))
        .catch((error) => console.log("error", error));
    };

    if (
      password !== "" &&
      username !== "" &&
      nome !== "" &&
      cognome !== "" &&
      azienda !== "" &&
      level !== "" &&
      gruppo !== "" &&
      email !== ""
    ) {
      Invia();
      // console.log(ip);
    } else {
      if (password === "") {
        document.getElementById("alertPassword").style.display = "";
      } else {
        document.getElementById("alertPassword").style.display = "none";
      }
      if (username === "") {
        document.getElementById("alertUsername").style.display = "";
      } else {
        document.getElementById("alertUsername").style.display = "none";
      }
      if (nome === "") {
        document.getElementById("alertNome").style.display = "";
      } else {
        document.getElementById("alertNome").style.display = "none";
      }
      if (cognome === "") {
        document.getElementById("alertCognome").style.display = "";
      } else {
        document.getElementById("alertCognome").style.display = "none";
      }
      if (azienda === "") {
        document.getElementById("alertAzienda").style.display = "";
      } else {
        document.getElementById("alertAzienda").style.display = "none";
      }
      if (level === "") {
        document.getElementById("alertLevel").style.display = "";
      } else {
        document.getElementById("alertLevel").style.display = "none";
      }
      if (gruppo === "") {
        document.getElementById("alertGruppo").style.display = "";
      } else {
        document.getElementById("alertGruppo").style.display = "none";
      }
      if (email === "") {
        document.getElementById("alertEmail").style.display = "";
      } else {
        document.getElementById("alertEmail").style.display = "none";
      }
    }
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="form.Nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci Nome"
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
                <Alert
                  severity="error"
                  id="alertNome"
                  style={{ display: "none" }}
                >
                  Nome is required!
                </Alert>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="form.Cognome">
                <Form.Label>Cognome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci Cognome"
                  onChange={(e) => setCognome(e.target.value)}
                />
                <Alert
                  severity="error"
                  id="alertCognome"
                  style={{ display: "none" }}
                >
                  Cognome is required!
                </Alert>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="form.Gruppo">
                <Form.Label>Gruppo</Form.Label>
                <FormControl variant="outlined">
                  <Select
                    className={classes.select}
                    value={appearGroup.nome}
                    onChange={(e) => setGruppo(e.target.value)}
                  >
                    {appearGroup.map((prova) => {
                      return (
                        <MenuItem key={prova.id} value={prova.id}>
                          {prova.nome}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Alert
                    severity="error"
                    id="alertGruppo"
                    style={{ display: "none" }}
                  >
                    Gruppo is required!
                  </Alert>
                </FormControl>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="form.Azienda">
                <Form.Label>Azienda</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci Azienda"
                  onChange={(e) => setAzienda(e.target.value)}
                />
                <Alert
                  severity="error"
                  id="alertAzienda"
                  style={{ display: "none" }}
                >
                  Azienda is required!
                </Alert>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="form.Username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Inserisci Username"
                />
                <Alert
                  severity="error"
                  id="alertUsername"
                  style={{ display: "none" }}
                >
                  Username is required!
                </Alert>
                <Alert
                  severity="error"
                  id="alertUsername2"
                  style={{ display: "none" }}
                >
                  Username already exist!
                </Alert>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="form.Password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Inserisci Password"
                />
                <Alert
                  severity="error"
                  id="alertPassword"
                  style={{ display: "none" }}
                >
                  Password is required!
                </Alert>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Group controlId="form.Numero">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Inserisci Email "
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Alert
                    severity="error"
                    id="alertEmail"
                    style={{ display: "none" }}
                  >
                    Email required!
                  </Alert>
                </Form.Group>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="form.Level">
                <Form.Label>Ruolo</Form.Label>
                <FormControl variant="outlined">
                  <Select
                    className={classes.select}
                    value={appearGroup.nome}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    {appearLevel.map((prova) => {
                      return (
                        <MenuItem key={prova.id} value={prova.id}>
                          {prova.nome}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <Alert
                    severity="error"
                    id="alertLevel"
                    style={{ display: "none" }}
                  >
                    Ruolo is required!
                  </Alert>
                </FormControl>
              </Form.Group>
            </Col>
          </Row>
          <div
            className={classes.bottone}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {/* <button className="btn btn-primary" onClick={addUtente}>
              Aggiungi
            </button> */}
            <ButtonClickedGreen size="medium" nome="Crea" onClick={addUtente} />
            <Button
              component={NavLink}
              className="button-green-disactive"
              exact
              to="/amministrazione/utenze"
              variant="contained"
              size="medium"
            >
              annulla
            </Button>
          </div>
        </Form>
      </Container>
    </Container>
  );
}
export default FormAddUtente;
