import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "react-bootstrap/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TotalTestSuite from "./TotalTestSuite";
import TotalTestCase from "./TotalTestCase";
import TotalLines from "./TotalLines";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import SelectBar from "../components/SelectBar";
import { Typography } from "@material-ui/core";
import acccessControl from "../service/url.js";

const useStyles = makeStyles((theme) => ({
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
}));

function FormAddUtente() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [gruppo, setGruppo] = useState("");
  const [azienda, setAzienda] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [level, setLevel] = useState("");
  // console.warn(level);
  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  function login() {
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    window.location = "/amministrazione/utenze";

    // localStorage.setItem("user-info", JSON.stringify(result));
    // history.push("/dashboard/testcase");
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
                />
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
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="form.Gruppo">
                <Form.Label>Gruppo</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  onChange={(e) => setGruppo(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="1">Gruppo 1</option>
                  <option value="2">Gruppo 2</option>
                </Form.Control>
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
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="form.Level">
                <Form.Label>Level</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  onChange={(e) => setLevel(e.target.value)}
                >
                  <option value="2">Admin</option>
                  <option value="4">SuperAdmin</option>
                  <option value="6">L1</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col></Col>
          </Row>
          <div
            className={classes.bottone}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            {/* <button className="btn btn-primary" onClick={login}>
              Aggiungi
            </button> */}
            <ButtonClickedGreen size="medium" nome="Aggiungi" onClick={login} />
          </div>
        </Form>
      </Container>
    </Container>
  );
}
export default FormAddUtente;
