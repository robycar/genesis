import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button, Paper, Typography } from "@material-ui/core";
import "../styles/App.css";
import { NavLink } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { MenuItem } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { getGenerale, postGenerale, deleteGenerale } from "../service/api";

const GestioneUtenti = () => {

  var functions = localStorage.getItem("funzioni").split(",");

  const [data, setData] = useState([]);
  const [appearGroup, setAppearGroup] = useState([]);
  const [appearLevel, setAppearLevel] = useState([]);

  const [id, setId] = useState(0);
  const [version, setVersion] = useState(0)
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [gruppo, setGruppo] = useState([]);
  const [gruppoId, setGruppoId] = useState(0);
  const [azienda, setAzienda] = useState("");
  const [username, setUsername] = useState("");
  const [level, setLevel] = useState([]);
  const [levelId, setLevelId] = useState(0);
  const [email, setEmail] = useState("");
  const [caricamento, setCaricamento] = useState(false)
  const [scrittaTabella, setScrittaTabella] = useState("")

  //-----------GET ----------------------
  const funzioneGetAll = () => {
    if (functions.indexOf("user.view") !== -1 && functions.indexOf("group.view") !== -1 && functions.indexOf("level.view") !== -1) {
      //----GET ALL USERS----
      (async () => {
        setCaricamento(true)
        setData((await getGenerale('user')).users);
        setCaricamento(false)
      })();

      //-----GET APPEAR GROUP-----
      (async () => {
        setAppearGroup((await getGenerale('group')).gruppi);
      })();

      //-----GET APPEAR LEVEL-----
      (async () => {
        setAppearLevel((await getGenerale('level')).livelli);
      })();
      setScrittaTabella("Non è presente alcun dato da mostrare")

    } else {
      setScrittaTabella("Non si dispone delle autorizzazioni per visualizzarequesti dati")
    }
  }

  const funzioneAggiornaUtente = () => {
    //----AGGIORNA UTENTE----
    if (functions.indexOf("user.edit") !== -1) {
      (async () => {
        setData((await postGenerale('user', { user: { id: id, version: version, azienda: azienda, username: username, cognome: cognome, nome: nome, email: email, level: { id: levelId }, gruppo: { id: gruppoId } } })).users);
        funzioneGetAll();
      })();
    }
  }

  const funzioneDelete = (id) => {
    if (functions.indexOf("user.delete") !== -1) {
      (async () => {
        setCaricamento(true)
        await deleteGenerale("user", id)
        funzioneGetAll();
      })();
    }
  }


  useEffect(() => {
    funzioneGetAll();
  }, []);

  const columns = [
    {
      title: "ID Utente",
      field: "id",
    },
    {
      title: "Username",
      field: "username",
    },
    {
      title: "Cognome",
      field: "cognome",
    },
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Azienda",
      field: "azienda",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Ruolo",
      field: "level.nome",
    },
    {
      title: "Gruppo",
      field: "gruppo.nome",
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setVersion(rowData.version);
    setNome(rowData.nome);
    setCognome(rowData.cognome);
    setUsername(rowData.username);
    setAzienda(rowData.azienda);
    setEmail(rowData.email);
    setLevel(rowData.level);
    setLevelId(rowData.level.id);
    setGruppo(rowData.gruppo);
    setGruppoId(rowData.gruppo.id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    funzioneAggiornaUtente();
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
      // border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    paperTop: {
      height: "20%",
      display: "flex",
      alignItems: "center",
      //opacity: "25%",
    },
    paperBottom: {
      padding: "2%",
      backgrounColor: "#FFFFFF",
      //justifyContent: "center",
      flexDirection: "column",
      marginTop: "5%",
    },
    divSelectBar: {
      marginTop: "25px",
    },
    selectBar: {
      width: "50%",
      height: "100",
      marginTop: "50px",
    },
    divTextarea: {
      marginTop: "20px",
    },
    intestazione: {
      color: "#47B881",
      marginTop: "5%",
      flexDirection: "row",
      marginBottom: "5%",
    },
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
      marginTop: "9px",
    },
    bottone: {
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    divider: {
      marginTop: "3%",
      marginBottom: "5",
    },
    paperModale: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      width: "fit-content",
      height: "80%",
    },
    col: {
      padding: "5%",
    },
    row: {
      width: "600px",
    },
    textField: {
      width: "200px",
    },
    bottoneAnnulla: {
      width: "128px",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Gestione Utenti"
        data={data}
        columns={columns}
        isLoading={caricamento}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          filtering: true,
          searchFieldAlignment: "left",
          pageSizeOptions: [5, 10, 20, { value: data?.length, label: "All" }],
        }}
        actions={[
          {
            icon: () => (
              <div className={classes.buttonRight}>
                <Button
                  className="button-green"
                  component={NavLink}
                  activeClassName="button-green-active"
                  exact
                  to="/amministrazione/addutente"
                  startIcon={<AddIcon />}
                  disabled={functions.indexOf("user.edit") === -1 || functions.indexOf("group.view") === -1 || functions.indexOf("level.view") === -1}
                >
                  UTENTE
                </Button>
              </div>
            ),
            tooltip: "Crea utente",
            isFreeAction: true,
          },
          rowData => (
            {
              icon: () => <EditIcon />,
              tooltip: "Modifica Utente",
              onClick: (event, rowData) => handleOpen(rowData),
              position: "row",
              disabled: (functions.indexOf("user.edit") === -1)
            }),
          rowData => ({
            icon: 'delete',
            tooltip: 'Elimina Utente',
            onClick: (event, rowData) => funzioneDelete(rowData.id),
            disabled: (functions.indexOf("user.delete") === -1 || rowData.level.nome === "ADMIN") || (rowData.username === localStorage.getItem("username"))
          }),
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
          body: {
            emptyDataSourceMessage: (
              scrittaTabella
            ),
          },
        }}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div>
            <Paper className={classes.paperModale} elevation={1}>
              <div>
                <ListItem button>
                  <Typography className={classes.intestazione} variant="h4">
                    Modifica Utente <b>{username}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form>
                <Row className={classes.row}>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={nome !== "" ? false : true}
                      onChange={(e) => setNome(e.target.value)}
                      required
                      label="Nome"
                      defaultValue={nome}
                      helperText={nome !== "" ? "" : "Il Nome è richiesto"}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={cognome !== "" ? false : true}
                      onChange={(e) => setCognome(e.target.value)}
                      label="Cognome"
                      defaultValue={cognome}
                      helperText={cognome !== "" ? "" : "Il Cognome è richiesto"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      id="standard-select-currency"
                      select
                      label="Gruppo"
                      value={appearGroup.id}
                      defaultValue={gruppo.id}
                      onChange={(e) => setGruppoId(e.target.value)}
                    >
                      {appearGroup.map((gruppo) => (
                        <MenuItem key={gruppo.id} value={gruppo.id}>
                          {gruppo.nome}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={azienda !== "" ? false : true}
                      onChange={(e) => setAzienda(e.target.value)}
                      label="Azienda"
                      defaultValue={azienda}
                      helperText={azienda !== "" ? "" : "L'Azienda è richiesta"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={username !== "" ? false : true}
                      onChange={(e) => setUsername(e.target.value)}
                      label="Username"
                      defaultValue={username}
                      helperText={
                        username !== "" ? "" : "L'Username è richiesto"
                      }
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      id="standard-select-currency"
                      select
                      label="Ruolo"
                      value={appearLevel.id}
                      defaultValue={level.id}
                      onChange={(e) => setLevelId(e.target.value)}
                    >
                      {appearLevel.map((level) => (
                        <MenuItem key={level.id} value={level.id}>
                          {level.nome}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                </Row>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={email !== "" ? false : true}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      defaultValue={email}
                      helperText={email !== "" ? "" : "L'Email è richiesta"}
                    />
                  </Col>
                </Row>
                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleClose2}
                  />
                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleClose}
                    nome="Annulla"
                  />
                </div>
              </Form>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default GestioneUtenti;
