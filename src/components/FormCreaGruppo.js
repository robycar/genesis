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
import ButtonClickedGreen from "./ButtonClickedGreen";
import Button from "@material-ui/core/Button";
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

function FormCreaGruppo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const checkRichiesta = (result) => {
    if (result.error == null) {
      window.location = "/amministrazione/gruppo";
    } else if (result.error.code === "ADMIN-0010") {
      document.getElementById("alertGruppo").style.display = "";
    } else {
      document.getElementById("alertGruppo").style.display = "none";
    }
  };

  // console.log(bearer);

  function putGroup() {
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

    fetch(`/api/group`, requestOptions)
      .then((response) => response.json())
      .then((result) => checkRichiesta(result))
      .catch((error) => console.log("error", error));

    //window.location = "/amministrazione/gruppo";

    // localStorage.setItem("user-info", JSON.stringify(result));
    // history.push("/dashboard/testcase");
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Form>
        <Row md={2}>
          <Col>
            <Form.Group controlId="form.Ruolo">
              <Form.Label>Gruppo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Inserisci nome gruppo"
                onChange={(e) => setNome(e.target.value)}
              />
              <Alert
                severity="error"
                id="alertGruppo"
                style={{ display: "none" }}
              >
                Gruppo already exists!
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
                placeholder="Inserisci descrizione "
                onChange={(e) => setDescrizione(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div
          className={classes.bottone}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ButtonClickedGreen size="medium" nome="Crea" onClick={putGroup} />
        </div>
      </Form>
    </Container>
  );
}
export default FormCreaGruppo;
