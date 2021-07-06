import React from "react";
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

  return (
    <Container maxWidth="lg" className={classes.container}>
      
          <Container>
            <Form>
              <Row>
                <Col>
                  <Form.Group controlId="form.IDUtenza" >
                      <Form.Label>ID Utenza</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci ID Utenza" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="form.Email">
                      <Form.Label>Indirizzo Email</Form.Label>
                      <Form.Control type="email" placeholder="Inserisci Indirizzo Email" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="form.Password" >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Inserisci Password" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="form.Level">
                    <Form.Label>Level</Form.Label>
                    <Form.Control as="select" name="state"  >
                      <option value="L2">L2</option>
                      <option value="L1">L1</option>
                      <option value="A">Admin</option>
                      <option value="SA">SuperAdmin</option>               
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="form.Gruppo" >
                      <Form.Label>Gruppo</Form.Label>
                      <Form.Control as="select" name="state"  >
                        <option value="NN">None</option>
                        <option value="G1">Gruppo 1</option>
                        <option value="G2">Gruppo 2</option>
                        <option value="G3">Gruppo 3</option>
                        <option value="G4">Gruppo 4</option>               
                      </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="form.Azienda">
                      <Form.Label>Azienda</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci Azienda" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="form.Nome" >
                      <Form.Label>Nome</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci Nome" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="form.Email">
                      <Form.Label>Cognome</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci Cognome" />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="form.Telefono" >
                      <Form.Label>Telefono</Form.Label>
                      <Form.Control type="tel" placeholder="Inserisci Numero Cellulare" />
                  </Form.Group>
                </Col>
                <Col>
                </Col>
              </Row>
              <div className={classes.bottone} style={{display: "flex",justifyContent: "flex-end"}}>
                <ButtonClickedGreen size="medium" nome="Aggiungi" />
              </div>
            </Form>
          </Container>
    </Container>
  );
}
export default FormAddUtente;
