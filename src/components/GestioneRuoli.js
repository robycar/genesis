import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import "../styles/App.css";
import { Paper, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
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
import DeleteIcon from "@material-ui/icons/Delete";
import { tableIcons } from "../components/Icons";
import SettingsIcon from "@material-ui/icons/Settings";

const GestioneRuoli = () => {
  var functions = localStorage.getItem("funzioni").split(",");

  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [version, setVersion] = useState(0);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [caricamento, setCaricamento] = useState(false);
  const [scrittaTabella, setScrittaTabella] = useState("");
  const [idElemento, setIdElemento] = React.useState(0);
  const [nomeElemento, setNomeElemento] = React.useState("");
  const [warning, setWarning] = useState("");
  const [openWarning, setOpenWarning] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handelOpenDelete = (rowData) => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  //-----------GET ----------------------
  const funzioneGetAll = () => {
    if (functions.indexOf("level.view") !== -1) {
      //----GET ALL USERS----
      (async () => {
        setCaricamento(true);
        setData((await getGenerale("level")).livelli);
        setCaricamento(false);
      })();

      setScrittaTabella("Non è presente alcun dato da mostrare");
    } else {
      setScrittaTabella(
        "Non si dispone delle autorizzazioni per visualizzare i dati di questa tabella"
      );
    }
  };
  const funzioneAggiornamento = () => {
    //----GET ALL USERS----
    if (functions.indexOf("level.edit") !== -1) {
      (async () => {
        setData(
          (
            await postGenerale("level", {
              id: id,
              version: version,
              nome: nome,
              descrizione: descrizione,
            })
          ).livelli
        );
        setOpen(false);
        funzioneGetAll();
      })();
    }
  };

  /* ----------- DELETE RUOLO ---------*/

  const funzioneDelete = () => {
    if (functions.indexOf("level.delete") !== -1) {
      (async () => {
        setCaricamento(true);
        //await deleteGenerale("level", id);
        let result = await deleteGenerale("level", `${idElemento}`);

        if (result.error !== null) {
          setOpenWarning(true);
          if (result.error.code === "ADMIN-0022") {
            setWarning(
              "Impossibile eliminare il Ruolo selezionato poichè collegato ad una o più Utenze"
            );
          } else {
            setWarning(
              "Codice errore: " +
                result.error.code +
                " Descrizione: " +
                result.error.description
            );
          }
        } else {
          setOpenWarning(false);
        }
        handleCloseDelete();
        funzioneGetAll();
      })();
    }
  };

  useEffect(() => {
    funzioneGetAll();
  }, []);

  const columns = [
    {
      title: "Id",
      field: "id",
      defaultSort: "desc",
      hidden: "true",
    },
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
  ];

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
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
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
      marginRight: "4%",
      transform: "scale(1.9)",
      color: "#ef5350",
    },
    typography: {
      padding: "3%",
    },
    divIntestazione: {
      display: "flex",
      alignItems: "center",
      padding: "2%",
      marginBottom: "1%",
    },
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setVersion(rowData.version);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    funzioneAggiornamento();
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Gestione Ruoli"
        data={data}
        columns={columns}
        isLoading={caricamento}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          filtering: true,
          pageSizeOptions: [5, 10, 20, { value: data?.length, label: "All" }],
          sorting: true,
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
                  to="/amministrazione/crearuolo"
                  startIcon={<AddIcon />}
                  disabled={functions.indexOf("level.edit") === -1}
                >
                  RUOLO
                </Button>
              </div>
            ),
            tooltip: "Crea Ruolo",
            isFreeAction: true,
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Modifica",
            onClick: (event, rowData) => handleOpen(rowData),
            disabled: functions.indexOf("level.edit") === -1,
            position: "row",
          },
          (rowData) => ({
            icon: () => <DeleteIcon />,
            tooltip: "Elimina Ruolo",
            onClick: (event, rowData) => {
              handelOpenDelete(rowData.id);
              setIdElemento(rowData.id);
              setNomeElemento(rowData.nome);
            },
            disabled:
              functions.indexOf("level.delete") === -1 ||
              rowData.nome === "ADMIN",
          }),
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
          body: {
            emptyDataSourceMessage: scrittaTabella,
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
                        disabled={
                          nome === "ADMIN" ||
                          nome === "admin" ||
                          nome === "Admin"
                            ? true
                            : false
                        }
                        helperText={nome !== "" ? "" : "Il Nome è richiesto"}
                      />
                    </Col>

                    <Col className={classes.col}>
                      <TextField
                        className={classes.textField}
                        error={descrizione !== "" ? false : true}
                        onChange={(e) => setDescrizione(e.target.value)}
                        required
                        label="Descrizione"
                        defaultValue={descrizione}
                        helperText={
                          descrizione !== "" ? "" : "La descrizione è richiesta"
                        }
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

      {/* ------------------------MODALE DELETE--------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openDelete}>
          <div>
            <Paper className={classes.paperModaleDelete} elevation={1}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    Elimina Ruolo <b>{nomeElemento}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                <Typography className={classes.typography}>
                  L'eliminazione del Ruolo selezionato, impatterà sulle Utenze
                  ad esso collegato.
                  <br />
                  Si vuole procedere?{" "}
                </Typography>

                <Divider className={classes.dvider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonNotClickedGreen
                    onClick={funzioneDelete}
                    nome="Elimina"
                  />
                  <ButtonNotClickedGreen
                    onClick={handleCloseDelete}
                    nome="Indietro"
                  />
                </div>
              </div>
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
