import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { MenuItem, Paper, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Form from "react-bootstrap/Form";
import acccessControl from "../service/url.js";
import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  paper: {
    width: "1000px",
    height: "fit-content",
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
  edit: {
    //paddingLeft: "30px",
    fontSize: "22px",
    marginBottom: "2%",
  },
  lastGrid: {
    width: 543,
    height: 1,
  },
  buttonGreen: {
    backgroundColor: "#47B881 !important",
    border: "1px solid #47B881 !important",
    borderRadius: 5,
    color: "white !important",
    marginLeft: "10px",
    "&:hover": {
      backgroundColor: "white !important",
      color: "#47B881 !important",
    },
  },
  fixedHeight: {
    height: 240,
  },
  formControl: {
    paddingBottom: "20px",
    margin: theme.spacing(1),
    minWidth: 200,
    marginLeft: "2%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paperSelect: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "2%",
  },
  grid: {
    marginLeft: "2%",
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferListRuolo() {
  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  //---------------------GET LEVEL-------------------------------------------
  const [dataLevel, setDataLevel] = useState([]);

  const getLevel = () => {
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

    fetch(`/api/level`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDataLevel(result.livelli);
      })
      .catch((error) => console.log("error", error));
  };

  //----------------GET ALL FUNCTION-----------------
  const [allFunzioni, setAllFunzioni] = useState([]);

  const getAllFunzioni = () => {
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

    fetch(`/api/funzione`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAllFunzioni(result.funzioni);
      })
      .catch((error) => console.log("error", error));
  };

  //----------------GET USER FUNCTION BY ID-----------------

  const [funzioniLevel, setfunzioniLevel] = useState([]);

  const [idSelezionato, setIdSelezionato] = useState([]);
  const [nomeLevel, setNomeLevel] = useState([]);

  const getLevelById = (event) => {
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

    fetch(`/api/level/${event.target.value}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setfunzioniLevel(result.level.funzioni);
        setIdSelezionato(event.target.value);
        setNomeLevel(result.level.nome)
      })
      .catch((error) => console.log("error", error));
    // console.log(event.target.value)

    // for (let i = 0; i < funzioniLevel.length; i++) {
    //   console.log(funzioniLevel[i])

    // }
  };

  //---------------MODIFICA FUNZIONI UTENTE-------------------
  const modificaFunzioniLevel = (codici) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
        id: idSelezionato,
        nome: nomeLevel,
        funzioni: codici,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/level`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  var funzioni = [];

  const provaFunzione = (codice) => {
    funzioni = funzioniLevel;
    const index = funzioni.indexOf(codice);
    if (index > -1) {
      funzioni.splice(index, 1);
    } else {
      funzioni.push(codice);
    }
    modificaFunzioniLevel(funzioni);
  };

  useEffect(() => {
    getAllFunzioni();
    getLevel();
  }, []);

  // for (let i = 0; i < roleGeneral.length; i++) {
  //   if (roleGeneral[i].side == "left")
  //     sinistra.push(roleGeneral[i].nome)
  //   else
  //     destra.push(roleGeneral[i].nome)
  // }

  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const handleToggle = (codice) => () => {
    const currentIndex = checked.indexOf(codice);
    const newChecked = [...checked];

    provaFunzione(codice);
    if (currentIndex === -1) {
      newChecked.push(codice);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const customList = () => (
    <Paper elevation={2} className={classes.paper}>
      <List className={classes.list} dense component="div" role="list">
        {allFunzioni.map((value) => {
          const labelId = `transfer-list-item-${value.nome}-label`;

          const funzione = () => {
            for (let i = 0; i < funzioniLevel.length; i++) {
              if (value.codice === funzioniLevel[i]) {
                return true;
              }
            }
            return false;
          };
          return (
            <ListItem
              key={value.nome}
              role="listitem"
              button
              onClick={handleToggle(value.codice)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={funzione()}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.nome} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Paper className={classes.paperSelect}>
      <Form.Group controlId="form.Numero">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="select-ruolo-label">Ruoli</InputLabel>
          <Select label="Ruoli"value={dataLevel.nome} onChange={getLevelById}>
            {dataLevel.map((prova) => {
              return (
                <MenuItem key={prova.id} value={prova.id}>
                  {prova.nome}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Form.Group>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item>
          <Typography className={classes.edit}>
            {" "}
            Permessi
          </Typography>
          {customList()}
        </Grid>
      </Grid>
    </Paper>
  );
}
