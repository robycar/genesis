import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonClickedGreen from "./ButtonClickedGreen";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";
import acccessControl from "../service/url.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

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
    border: "1px solid #ced4da",
    borderRadius: 4,
    minHeight: "182px",
  },
  parola: {
    color: "black!important",
    paddingLeft: "15px",
    "&:hover": {
      textDecoration: "none",
    }
  },
}));

function FormCreaRuolo() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  //prende l'id dall'url e lo usa per fare la get
  let url = new URL(window.location.href);
  let search_params = url.searchParams;

  const [utenti, setUtenti] = useState([]);
  const [utenteSel, setUtenteSel] = useState([]);
  const [partecipanti1, setPartecipanti1] = useState([]);
  const [partecipanti2, setPartecipanti2] = useState([]);
  const [partecipanti3, setPartecipanti3] = useState([]);

  const getUtenti = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    // console.log(bearer.toString());

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/user`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUtenti(result.users);
      })
      .catch((error) => console.log("error", error));
  };

  const getPartecipanti1 = () => {

    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      "user": {
        "gruppo": {
          "id": search_params.get('id')
        }
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`/api/user/search`, requestOptions)
      .then((response) => response.json())
      .then((result) => setPartecipanti1(result.users))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getPartecipanti1();
    getUtenti();
  }, []);

  const addPartecipante = () => {
    console.log(utenteSel)
  }

  return (
    <Container maxWidth="lg" className={classes.container}>

      <Container>
        <Form >
          <Row >
            <Col md={8}>
              <Form.Group controlId="form.Utenti">
                <Form.Label>Gruppo</Form.Label>
                <FormControl variant="outlined">
                  <Select
                    className={classes.select}
                    value={utenteSel}
                    onChange={(e) => setUtenteSel(e.target.value)}
                  >
                    {utenti.map((utente) => {
                      return (
                        <MenuItem key={utente.id} value={utente.id}>
                          {utente.username}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Form.Group>
            </Col>
            <Col md={3}>
              <br />
              <Button style={{ marginTop: "6px" }}
                className="button-green"
                onClick={addPartecipante}
              >
                Aggiungi
              </Button>
            </Col>
            <Col md={8}>
              <Form.Group controlId="form.Textarea">
                <Form.Label>Partecipanti</Form.Label>
                <div className={classes.contAutorizzazioni}>
                  <List dense component="div" role="list">
                    {partecipanti1.map((value) => {
                      const labelId = `transfer-list-item-${value.username}-label`;

                      return (
                        <ListItem
                          key={value.username}
                          role="listitem">
                          <ListItemText id={labelId} primary={value.username} />
                        </ListItem>
                      );
                    })}
                    <ListItem />
                  </List>
                </div>
              </Form.Group>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <div className={classes.bottone} style={{ display: "flex", justifyContent: "flex-end" }}>
            <ButtonClickedGreen size="medium" nome="Salva" />
          </div>
        </Form>
      </Container>
    </Container>
  );
}
export default FormCreaRuolo;
