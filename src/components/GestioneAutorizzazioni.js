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
  contAutorizzazioni: {
    border:"1px gray solid",
    borderAadius:3,
    minHeight:"500px",
  },
  ulGestAuto: {
    listStyleType: "none",
    paddingLeft:"0px",
  },
  liRemove:{
    paddingLeft:"45px",
    marginLeft:"-1px",
    "&:hover": {
      color:"red",
    }
  },
  liAdd:{
    paddingLeft:"45px",
    marginLeft:"-1px",
    "&:hover": {
      color:"#47B881",
    }
  },
  activeRed: {
    color:"red!important",
    fontWeight:"bold",
    "&:hover": {
      textDecoration: "none",
    }
  },
  activeGreen: {
    color:"#47B881!important",
    fontWeight:"bold",
    "&:hover": {
      textDecoration: "none",
    }
  },
  parola: {
    color:"black!important",
    "&:hover": {
      fontWeight:"bold",
      textDecoration: "none",
    },
    "&:active":{
      color:"#47B881!important",
      fontWeight:"bold"
    }
  },
  buttonRed: {
    backgroundColor: "#ff0419 !important",
    border: "1px solid #ff0419 !important",
    color: "white!important",
    width: "100px",
    height: "40px",
    marginRight: "10px !important",
    "&:hover": {
      backgroundColor: "white !important",
      color: "#eb3342 !important",
    }
  }, 
  buttonGreen: {
    backgroundColor: "#47B881 !important",
    border: "1px solid #47B881 !important",
    color: "white!important",
    width: "100px",
    height: "40px",
    marginRight: "10px !important",
    "&:hover": {
      backgroundColor: "white !important",
      color: "#47B881 !important",
    }
  }
  
  
  
}));

function FormCreaRuolo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [appState] = useState({

    roleGeneral: [
      { /*IL PRIMO ELEMENTO DEVE ESSERE VUOTO, ALTRIMENTI BUG 1° ELEMENTO*/ },
      { id: 1, name: "Admin",type: "role",color:"green" },
      { id: 2, name: "L1",type: "role",color:"green"},
      { id: 3, name: "L2",type: "role",color:"green" },
      { id: 4, name: "Admin",type: "role",color:"red" },
      { id: 5, name: "Admin management",type: "permission",color:"green" },
      { id: 6, name: "Admin user management",type: "permission",color:"green" },
      { id: 7, name: "Admin role management",type: "permission",color:"green" },
      { id: 8, name: "Report manager",type: "permission",color:"green" },
      { id: 9, name: "SuperAdmin",type: "role",color:"green" },
      { id: 10, name: "Workstation management",type: "permission",color:"green" },
      { id: 11, name: "Line management",type: "permission",color:"green" },
    ],
  });

  function toggleActive(indice) {
    
    if(appState.roleGeneral[indice].color == "green"){
      document.getElementById(indice).className=(classes.activeGreen);
      
      document.getElementById("button1").value=indice;
    }else{
      document.getElementById(indice).className=(classes.activeRed);
      document.getElementById("button2").value=indice;
    }
    if(document.getElementById("checkbox").value!="on" && document.getElementById("checkbox").value!=indice)
      document.getElementById(document.getElementById("checkbox").value).className=(classes.parola);
    document.getElementById("checkbox").value=indice
  }

  function transferGreen(){
    if(document.getElementById("button1").value != 0)
      if((appState.roleGeneral[(document.getElementById("button1").value)].color) =="green" ){
        appState.roleGeneral[(document.getElementById("button1").value)].color ="red"
        document.getElementById("button2").value = 0
      }
  }
  function transferRed(){
    if(document.getElementById("button2").value != 0)
      if((appState.roleGeneral[(document.getElementById("button2").value)].color) =="red" ){
        appState.roleGeneral[(document.getElementById("button2").value)].color ="green";
        document.getElementById("button1").value = 0
      }
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
                  <div className={classes.contAutorizzazioni}>
                    <h6 style={{paddingLeft:"15px"}}>Ruoli</h6>
                    <ul className={classes.ulGestAuto}>

                      {appState.roleGeneral.map((elements, index) => {
                        return appState.roleGeneral[index].color == "green" && appState.roleGeneral[index].type == "role" ?
                          <a href="#"
                            key={index}
                            id={elements.id}
                            className={classes.parola}
                            onClick={() => {toggleActive(index)}}
                          ><li className={classes.liAdd}>{elements.name}</li></a>
                        :""
                        })}

                    </ul>
                    <h6 style={{paddingLeft:"15px",paddingTop:"20px"}}>Permission</h6>
                    <ul className={classes.ulGestAuto}>

                      {appState.roleGeneral.map((elements, index) => {
                        return appState.roleGeneral[index].color == "green" && appState.roleGeneral[index].type == "permission"?
                          <a href="#"
                            key={index}
                            id={elements.id}
                            className={classes.parola}
                            onClick={() => {toggleActive(index)}}
                          ><li className={classes.liAdd}>{elements.name}</li></a>
                        :""
                        })}

                    </ul>
                  </div>
                </Col>
                <Col md={2} >
                <input id="checkbox" type="checkbox" style={{display:"none"}}/>
                  <br />
                  <br />
                  <br />
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <button 
                      id="button1"
                      className={classes.buttonGreen}
                      onClick={() => {transferGreen()}}
                      
                      >
                        &gt;&gt;&gt;
                      </button>
                  </div>
                  <br />
                  <br />
                  <div style={{display:"flex",justifyContent:"center"}}>
                    <button
                      id="button2"
                      className={classes.buttonRed}
                      onClick={() => {transferRed()}}
                      >
                        &lt;&lt;&lt;
                      </button>
                  </div>

                </Col>
                <Col md={5} style={{paddingLeft:"0!important"}}>
                  <div className={classes.contAutorizzazioni}>
                    <h6 style={{paddingLeft:"15px"}}>Ruoli</h6>
                    <ul className={classes.ulGestAuto}>
                      {appState.roleGeneral.map((elements, index) => {
                        return appState.roleGeneral[index].color == "red" && appState.roleGeneral[index].type == "role" ?
                          <a href="#"
                            key={index}
                            id={elements.id}
                            className={classes.parola}
                            onClick={() => {toggleActive(index)}}
                          ><li className={classes.liRemove}>{elements.name}</li></a>
                        :""
                        })}
                    </ul>
                    <h6 style={{paddingLeft:"15px",paddingTop:"20px"}}>Permission</h6>
                    <ul className={classes.ulGestAuto}>

                      {appState.roleGeneral.map((elements, index) => {
                        return appState.roleGeneral[index].color == "red" && appState.roleGeneral[index].type == "permission"?
                          <a href="#"
                            key={index}
                            id={elements.id}
                            className={classes.parola}
                            onClick={() => {toggleActive(index)}}
                          ><li className={classes.liRemove}>{elements.name}</li></a>
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
