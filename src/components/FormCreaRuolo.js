import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonClickedGreen from "./ButtonClickedGreen";
import acccessControl from "../service/url.js";
import Alert from "@material-ui/lab/Alert";

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
  bottone: {
    marginTop: "1%",
    marginRight: "51%",
  },
  formDescrizione: {
    marginTop: "2%",
  },
}));

function FormCreaRuolo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  // console.warn(descrizione);

  const checkRichiesta = (result) => {
    if (result.error == null) {
      window.location = "/amministrazione/ruoli";
    } else if (result.error.code === "ADMIN-0020") {
      document.getElementById("alertRuolo").style.display = "";
    } else {
      document.getElementById("alertRuolo").style.display = "none";
    }
  };

  function login() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      nome: nome,
      descrizione: descrizione,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/level`, requestOptions)
      .then((response) => response.json())
      .then((result) => checkRichiesta(result))
      .catch((error) => console.log("error", error));

    // localStorage.setItem("user-info", JSON.stringify(result));
    // history.push("/dashboard/testcase");
    // window.location = "/amministrazione/ruoli";
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Form>
        <Row md={2}>
          <Col>
            <Form.Group controlId="form.Ruolo">
              <Form.Label>Ruolo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci Ruolo"
                onChange={(e) => setNome(e.target.value)}
              />
              <Alert
                severity="error"
                id="alertRuolo"
                style={{ display: "none" }}
              >
                Ruolo already exists!
              </Alert>
            </Form.Group>
          </Col>
        </Row>
        <Row md={2}>
          <Col>
            <Form.Group
              controlId="form.Textarea"
              className={classes.formDescrizione}
            >
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                placeholder="Inserisci Descrizione "
                onChange={(e) => setDescrizione(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div
          className={classes.bottone}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ButtonClickedGreen size="medium" nome="Crea" onClick={login} />
        </div>
      </Form>
    </Container>
  );
}

export default FormCreaRuolo;
