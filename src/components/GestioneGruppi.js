import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";
import "../styles/App.css";
import EditIcon from "@material-ui/icons/Edit";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Divider from "@material-ui/core/Divider";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { getGenerale, postGenerale, deleteGenerale } from "../service/api";
import { useHistory } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import { tableIcons } from "../components/Icons";
import DeleteIcon from "@material-ui/icons/Delete";

const GestioneRuoli = () => {

  var functions = localStorage.getItem("funzioni").split(",");

  let history = useHistory();

  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [versione, setVersione] = useState(0);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [caricamento, setCaricamento] = useState(false)
  const [scrittaTabella, setScrittaTabella] = useState("")

  /*---------- OPEN WARNING DELETE-----------*/

  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
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
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5%",
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
    bottone: {
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
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
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
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
    paperContent: {
      marginTop: "2%",
      marginBottom: "2%",
    },
    paperModaleDelete: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      height: "fit-content",
      width: 500,
      position: "relative",
    },
    intestazioneModaleError: {
      color: "#ef5350",
      flexDirection: "row",
      alignItems: "center",
    },
    iconModaleError: {
      // width: "15%",
      // height: "15%",
      marginRight: "4%",
      transform: "scale(1.9)",
      color: "#ef5350",
    },
    intestazione: {
      color: "#47B881",
      flexDirection: "row",
      alignItems: "center",
    },
    divIntestazione: {
      display: "flex",
      alignItems: "center",
      padding: "2%",
      marginBottom: "1%",
    },
  }));

  const classes = useStyles();

  const columns = [
    {
      title: "Nome",
      field: "nome",
      defaultSort: "desc",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
  ];

  //-----------GET ----------------------
  const funzioneGetAll = () => {

    if (functions.indexOf("group.view") !== -1) {
      //----GET ALL USERS----
      (async () => {
        setCaricamento(true)
        setData((await getGenerale('group')).gruppi);
        setCaricamento(false)
      })();

      setScrittaTabella("Non è presente alcun dato da mostrare")

    } else {
      setScrittaTabella("Non si dispone delle autorizzazioni per visualizzare i dati di questa tabella")
    }
  }

  const funzioneAggiornamento = () => {
    //----GET ALL USERS----
    if (functions.indexOf("group.edit") !== -1) {
      (async () => {
        setData((await postGenerale('group', { id: id, version: versione, nome: nome, descrizione: descrizione })).gruppi);
        setOpen(false);
        funzioneGetAll();
      })();
    }
  }

  const funzioneDelete = (id) => {
    if (functions.indexOf("group.delete") !== -1) {
      (async () => {
        setCaricamento(true)
        let result = await deleteGenerale("group", id)
        if (result.error !== null) {
          if (result.error.code === "ADMIN-0012") {
            setCaricamento(false)
            setWarning("Questo Gruppo non può essere eliminato perche uno o più utenti ne fanno parte.")
            setOpenWarning(true)
          }
        }
        funzioneGetAll();
      })();
    }
  }

  useEffect(() => {
    funzioneGetAll();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setVersione(rowData.version);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Gestione Gruppi"
        data={data}
        columns={columns}
        isLoading={caricamento}
        options={{
          // tableLayout: "",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          filtering: true,
          sorting: true,
          pageSizeOptions: [5, 10, 20, { value: data?.length, label: "All" }],

        }}
        actions={[
          {
            icon: (dat) => (
              <a>
                <VisibilityIcon />
              </a>
            ),
            tooltip: "Visualizza",
            position: "row",
            onClick: (event, rowData) =>
              (history.push("../amministrazione/viewgruppo?id=" + rowData.id)),
          },
          {
            icon: () => (
              <div className={classes.buttonRight}>
                <Button
                  className="button-green"
                  component={NavLink}
                  activeClassName="button-green-active"
                  exact
                  to="/amministrazione/creagruppo"
                >
                  CREA GRUPPO
                </Button>
              </div>
            ),
            tooltip: "Crea Gruppo",
            isFreeAction: true,
          },
          rowData => ({
            icon: ()=> <DeleteIcon/>,
            tooltip: 'Elimina Gruppo',
            onClick: (event, rowData) => funzioneDelete(rowData.id),
            disabled: functions.indexOf("group.delete") === -1
          }),
          {
            icon: () => <EditIcon />,
            tooltip: "Modifica Gruppo",
            onClick: (event, rowData) => handleOpen(rowData),
            disabled: functions.indexOf("group.edit") === -1,
            position: "row",
          },
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
                    Modifica Ruolo <b>{nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form>
                <Paper className={classes.paperContent} elevation={0}>
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
                        value={descrizione}
                        onChange={(e) => {
                          e.target.value === "" ? setDescrizione(" ") : setDescrizione(e.target.value)
                        }}
                        label="Descrizione"
                      />
                    </Col>
                  </Row>
                </Paper>

                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={funzioneAggiornamento}
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
      {/*------------------MODALE ERRORE--------------- */}
      <Modal
        className={classes.modal}
        open={openWarning}
        onClose={handleCloseWarning}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openWarning}>
          <div>
            <Paper className={classes.paperModaleDelete} elevation={1}>
              <div>
                <div className={classes.divIntestazione}>
                  <SettingsIcon className={classes.iconModaleError} />
                  <Typography
                    className={classes.intestazioneModaleError}
                    variant="h5"
                  >
                    ERRORE
                  </Typography>
                </div>
                <Divider className={classes.divider} />

                <Typography className={classes.typography}>
                  {warning}
                </Typography>

                <Divider className={classes.divider} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "3%",
                  }}
                >
                  <ButtonNotClickedGreen
                    onClick={handleCloseWarning}
                    nome="OK"
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>

    </div>
  );
};

export default GestioneRuoli;
