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
import Button from "@material-ui/core/Button";

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
  contAutorizzazioni: {
    border:"1px solid #ced4da",
    borderRadius:4,
    minHeight:"182px",
  },
  parola: {
    color:"black!important",
    paddingLeft:"15px",
    "&:hover": {
      textDecoration: "none",
    }
  },
}));

function FormCreaRuolo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg" className={classes.container}>
      
          <Container>
            <Form >
              <Row >
                <Col md={6}>
                  <Form.Group controlId="form.Ruolo" >
                      <Form.Label>Gruppo</Form.Label>
                      <Form.Control type="text" placeholder="Inserisci Nome Gruppo" />
                  </Form.Group>
                  <br />
                  <br />
                  <br />
                  <Form.Group controlId="form.Textarea">
                      <Form.Label>Descrizione</Form.Label>
                      <Form.Control as="textarea" rows={7} placeholder="Inserisci Descrizione " />
                  </Form.Group>
                </Col>
                <Col>
                  <Col md={8}>
                    <Form.Group controlId="form.Utenti">
                      <Form.Label>Utenti</Form.Label>
                      <Form.Control as="select" name="state"  >
                        <option value="">none</option>
                        <option value="Maria Sacchi">Maria Sacchi</option>
                        <option value="Antonio Verdi">Antonio Verdi</option>
                        <option value="Valentina Bianchi">Valentina Bianchi</option>
                        <option value="Mario Rossi">Mario Rossi</option>               
                        <option value="Marco Rossi">Marco Rossi</option>               
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Button 
                        className="button-green"
                      >
                        Aggiungi
                      </Button>
                    </Col>
                    <br />
                    <Col>
                    <Form.Group controlId="form.Textarea">
                        <Form.Label>Partecipanti</Form.Label>
                        <div className={classes.contAutorizzazioni}>
                          <ul style={{listStyleType: "none",paddingLeft:"25px",}}>
                            <a className={classes.parola}><li>Valentina Bianchi</li></a>
                          </ul>
                        </div>
                    </Form.Group>
                  </Col>
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
