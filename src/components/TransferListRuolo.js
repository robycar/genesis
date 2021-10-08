import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import { MenuItem, Paper, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Form from "react-bootstrap/Form";
import InputLabel from "@material-ui/core/InputLabel";
import { getGenerale, getByIdGenerale, postGenerale } from "../service/api";

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
  gridPermessi: {
    width: "900px",
  },
}));

export default function TransferListRuolo() {
  
  var functions = localStorage.getItem("funzioni").split(",");

  const [dataLevel, setDataLevel] = useState([]);
  const [allFunzioni, setAllFunzioni] = useState([]);
  const [funzioniLevel, setfunzioniLevel] = useState([]);
  const [idSelezionato, setIdSelezionato] = useState(0);
  const [nomeLevel, setNomeLevel] = useState([]);

  //-----------GET ----------------------
  const funzioneGetAll = () => {
    if (functions.indexOf("level.edit") !== -1 && functions.indexOf("level.view") !== -1) {
      //----GET ALL FUNCTIONS----
      (async () => {
        setAllFunzioni((await getGenerale('funzione')).funzioni);
      })();

      //-----GET APPEAR LEVEL-----
      (async () => {
        setDataLevel((await getGenerale('level')).livelli);
      })();
    }
  }

  const funzioneGetLevelById = (event) => {
    if (functions.indexOf("level.edit") !== -1) {
      let id = event.target.value;
      (async () => {
        setIdSelezionato(id);
        let result = await getByIdGenerale('level', id);
        setfunzioniLevel(result?.level?.funzioni)
        setNomeLevel(result?.level?.nome);
      })();
    }
  }

  const funzioneAggiornaFunzioniLevel = (codici) => {
    //----AGGIORNA UTENTE----
    (async () => {
      (await postGenerale('level', { id: idSelezionato, funzioni: codici, nome: nomeLevel }));
      //funzioneGetAll();
    })();

  }

  const provaFunzione = (codice) => {
    let funzioni = [];
    funzioni = funzioniLevel;
    const index = funzioni.indexOf(codice);
    if (index > -1) {
      funzioni.splice(index, 1);
    } else {
      funzioni.push(codice);
    }
    funzioneAggiornaFunzioniLevel(funzioni);
  };

  useEffect(() => {
    funzioneGetAll();
  }, []);


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
            for (let i = 0; i < funzioniLevel?.length; i++) {
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
              disabled={nomeLevel === "ADMIN"}
              style={{ display: idSelezionato === 0 ? 'none' : '' }}
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
          <InputLabel id="select-ruolo-label">Selezionare un Ruolo</InputLabel>
          <Select label="Selezionare un Ruolo" value={dataLevel.nome} placeholder="Selezionare un Ruolo" onChange={funzioneGetLevelById}>
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
        <Grid item className={classes.gridPermessi}>
          <Typography className={classes.edit}> Permessi</Typography>
          {customList()}
        </Grid>
      </Grid>
    </Paper>
  );
}
