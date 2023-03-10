import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonClickedGreen from "./ButtonClickedGreen";
import Alert from "@material-ui/lab/Alert";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { putGenerale } from "../service/api";

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
  let history = useHistory();
  const classes = useStyles();

  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  var functions = localStorage.getItem("funzioni").split(",");

  const checkRichiesta = (result) => {
    if (result.error == null) {
      history.push("/amministrazione/ruoli");
    } else if (result.error.code === "ADMIN-0020") {
      document.getElementById("alertRuolo1").style.display = "";
      document.getElementById("alertRuolo2").style.display = "none";
    } else {
      document.getElementById("alertRuolo1").style.display = "none";
    }
  };

  const funzioneAggiungiRuolo = () => {

    if (functions.indexOf("level.edit") !== -1) {
      //----AGGIUNGI GRUPPO------
      (async () => {
        let result = await putGenerale('level', { nome: nome, descrizione: descrizione });
        checkRichiesta(result);
      })();
    }
  }

  const putRuolo = () => {
    if (nome === "") {
      document.getElementById("alertRuolo2").style.display = "";
      document.getElementById("alertRuolo1").style.display = "none";
    } else
      funzioneAggiungiRuolo()
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
                id="alertRuolo1"
                style={{ display: "none" }}
              >
                Esiste gi?? un Ruolo con questo Nome!
              </Alert>
              <Alert
                severity="error"
                id="alertRuolo2"
                style={{ display: "none" }}
              >
                Inserire il Nome del Ruolo!
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
          <ButtonClickedGreen disabled={functions.indexOf("level.edit") === -1} size="medium" nome="Crea" onClick={putRuolo} />
          <Button
            component={NavLink}
            className="button-green-disactive"
            exact
            to="/amministrazione/ruoli"
            variant="contained"
            size="medium"
          >
            annulla
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default FormCreaRuolo;
