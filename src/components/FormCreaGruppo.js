import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonClickedGreen from "./ButtonClickedGreen";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { NavLink } from "react-router-dom";
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

function FormCreaGruppo() {
  let history = useHistory();
  const classes = useStyles();
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");

  const checkRichiesta = (result) => {
    if (result.error == null) {
      history.push("/amministrazione/gruppo");
    } else if (result.error.code === "ADMIN-0010") {
      document.getElementById("alertGruppo1").style.display = "";
      document.getElementById("alertGruppo2").style.display = "none";
    } else {
      document.getElementById("alertGruppo1").style.display = "none";
    }
  };

  const funzioneAggiungiGruppo = () => {
    //----AGGIUNGI GRUPPO------
    (async () => {
      let result = await putGenerale('group', { nome: nome, descrizione: descrizione });
      checkRichiesta(result);
    })();

  }

  const putGroup = () => {
    if (nome === "") {
      document.getElementById("alertGruppo2").style.display = "";
      document.getElementById("alertGruppo1").style.display = "none";
    } else
      funzioneAggiungiGruppo()
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
                id="alertGruppo1"
                style={{ display: "none" }}
              >
                Esiste già un Gruppo con questo Nome!
              </Alert>
              <Alert
                severity="error"
                id="alertGruppo2"
                style={{ display: "none" }}
              >
                Inserire un Nome per il Gruppo!
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
          <Button
            component={NavLink}
            className="button-green-disactive"
            exact
            to="/amministrazione/gruppo"
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
export default FormCreaGruppo;
