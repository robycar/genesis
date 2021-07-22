import React, { useState } from "react";
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

  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  // console.warn(descrizione);

  function login() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MjY5NTIyNTMsImlhdCI6MTYyNjk0ODY1MywidXNlcm5hbWUiOiJ0ZXN0In0.K9bMBXlUZAgPcBzeXdoJlCQnJnuhY1qc8ZS3HIVopB5bhXqeyIn3-gnQH2TrxUxF1jyK6dWurTDx3VfSvHqNRA"
    );
    myHeaders.append("Content-Type", "application/json");

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

    let result = fetch("http://localhost:9081/api/level", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));

    // localStorage.setItem("user-info", JSON.stringify(result));
    // history.push("/dashboard/testcase");
    window.location = "/amministrazione/ruoli";
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      
          <Container>
            <Form>
              <Row md={2}>
                <Col>
                  <Form.Group controlId="form.Ruolo" >
                      <Form.Label>Ruolo</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Inserisci Ruolo" 
                        onChange={(e) => setNome(e.target.value)}/>
                  </Form.Group>
                </Col>
              </Row>
              <Row md={2}>
                <Col>
                  <Form.Group controlId="form.Textarea">
                      <Form.Label>Descrizione</Form.Label>
                      <Form.Control 
                        as="textarea" 
                        rows={7} 
                        placeholder="Inserisci Descrizione " 
                        onChange={(e) => setDescrizione(e.target.value)}/>
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <br />
              <br />
              <div className={classes.bottone} style={{display: "flex",justifyContent: "flex-end"}}>
                <ButtonClickedGreen size="medium" nome="Crea" onClick={login} />
              </div>
            </Form>
          </Container>
    </Container>
  );
}
export default FormCreaRuolo;
