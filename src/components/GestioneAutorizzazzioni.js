import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonClickedGreen from "./ButtonClickedGreen";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../styles/App.css";

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
            <Row md={3}>
                <Col md={5} style={{paddingRight:"0!important"}}>
                  <Form.Group controlId="form.Text" >
                      <Form.Control type="text" placeholder="Search for available " />
                  </Form.Group>
                </Col>
                <Col md={2} >                
                </Col>
                <Col md={5} style={{paddingLeft:"0!important"}}>
                  <Form.Group controlId="form.Text">
                      <Form.Control type="text" placeholder="Search for available " />
                  </Form.Group>
                </Col>
              </Row>
              <Row md={3}>
                <Col md={5} style={{paddingRight:"0!important"}}>
                  <Form.Group controlId="form.Textarea" >
                      <Form.Control as="textarea" rows={25} />
                  </Form.Group>
                </Col>
                <Col md={2} >
                  <br />
                  <br />
                  <br />
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <Button
                      className="button-green-2"
                      component={NavLink}
                      exact
                      to="/amministrazione/addutente"
                      >
                        &gt;&gt;&gt;
                      </Button>
                  </div>
                  <br />
                  <br />
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <Button
                      className="button-red"
                      component={NavLink}
                      exact
                      to="/amministrazione/addutente"
                      >
                        &lt;&lt;&lt;
                      </Button>
                  </div>
                
                </Col>
                <Col md={5} style={{paddingLeft:"0!important"}}>
                  <Form.Group controlId="form.Textarea">
                      <Form.Control as="textarea" rows={25} />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <div className={classes.bottone} style={{display: "flex",justifyContent: "center"}}>
                <ButtonClickedGreen size="large" nome="SALVA" />
              </div>
            </Form>
          </Container>
    </Container>
  );
}
export default FormCreaRuolo;
