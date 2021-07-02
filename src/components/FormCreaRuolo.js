import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from 'react-bootstrap/Container';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TotalTestSuite from "./TotalTestSuite";
import TotalTestCase from "./TotalTestCase";
import TotalLines from "./TotalLines";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonClickedGreen from "./ButtonClickedGreen";

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

function FormCreaRuolo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg" className={classes.container}>
      
          <Container>
            <Form>
              <Row md={2}>
                <Col>
                  <Form.Group controlId="form.Ruolo" >
                      <Form.Label>Ruolo</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci Ruolo" />
                  </Form.Group>
                </Col>
              </Row>
              <Row md={2}>
                <Col>
                  <Form.Group controlId="form.Textarea">
                      <Form.Label>Descrizione</Form.Label>
                      <Form.Control as="textarea" rows={7} placeholder="Inserisci Descrizione " />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <div className={classes.bottone} style={{display: "flex",justifyContent: "flex-end"}}>
                <ButtonClickedGreen size="medium" nome="Crea" />
              </div>
            </Form>
          </Container>
    </Container>
  );
}
export default FormCreaRuolo;
