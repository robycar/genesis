import React, { useState } from "react";
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
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
import { TransferWithinAStation } from "@material-ui/icons";

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

  const [appState, changeState] = useState({

    roleGeneral: [
      { id: 1, name: "Test Running",type:"red"},
      { id: 2, name: "Test Caricati",type:"green" },
      { id: 3, name: "Test Schedulati",type:"green" },
      { id: 4, name: "Test Conclusi",type:"red" },
    ],
  });

  let precedente;
  let idRuolo;
  function toggleActive(indice) {
    
    
    // if(appState.roleGeneral[precedente].type == "green")
    //  document.getElementById(indice+1).className="active-red";
    // else
    //   document.getElementById(indice+1).className="active-green";
  

    if(appState.roleGeneral[indice].type == "green")
      document.getElementById(indice+1).className="active-green";
      
    else
      document.getElementById(indice+1).className="active-red";

    document.getElementById("button1").value=indice;
    document.getElementById("button2").value=indice;

    precedente = indice;
    console.log(idRuolo)
    
  }
  function transferGreen(){
    if((appState.roleGeneral[(document.getElementById("button1").value)].type) =="green" )
      appState.roleGeneral[(document.getElementById("button1").value)].type ="red"
  }
  function transferRed(){
    if((appState.roleGeneral[(document.getElementById("button2").value)].type) =="red" )
      appState.roleGeneral[(document.getElementById("button2").value)].type ="green";
  }
  

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
                  <div className="cont-autorizzazioni">
                    <h6 style={{paddingLeft:"15px"}}>Ruoli</h6>
                    <ul className="ul-gest-auto ul-gest-auto-add">

                      {appState.roleGeneral.map((elements, index) => {
                        return appState.roleGeneral[index].type == "green" ?
                          <a href="#"
                            key={index}
                            id={elements.id}
                            onClick={() => {toggleActive(index)}}
                          ><li>{elements.name}</li></a>
                        :""
                        })}

                    </ul>
                  </div>
                </Col>
                <Col md={2} >
                  <br />
                  <br />
                  <br />
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <button 
                      id="button1"
                      className="button-green-2"
                      onClick={() => {transferGreen()}}
                      
                      >
                        &gt;&gt;&gt;
                      </button>
                  </div>
                  <br />
                  <br />
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <Button
                      className="button-red"
                      id="button2"
                      onClick={() => {transferRed()}}
                      >
                        &lt;&lt;&lt;
                      </Button>
                  </div>

                </Col>
                <Col md={5} style={{paddingLeft:"0!important"}}>
                  <div className="cont-autorizzazioni">
                    <h6 style={{paddingLeft:"15px"}}>Ruoli</h6>
                    <ul className="ul-gest-auto ul-gest-auto-remove">
                      {appState.roleGeneral.map((elements, index) => {
                        return appState.roleGeneral[index].type == "red" ?
                          <a href="#"
                            key={index}
                            id={elements.id}
                            onClick={() => {toggleActive(index)}}
                          ><li>{elements.name}</li></a>
                        :""
                        })}
                    </ul>
                  </div>
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
