import React, { useEffect, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
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

const GestioneRuoli = () => {

  var functions = localStorage.getItem("funzioni").split(",");

  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [version, setVersion] = useState(0);
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [caricamento, setCaricamento] = useState(false)
  const [scrittaTabella, setScrittaTabella] = useState("")


  //-----------GET ----------------------
  const funzioneGetAll = () => {

    if (functions.indexOf("level.view") !== -1) {
    //----GET ALL USERS----
      (async () => {
        setCaricamento(true)
        setData((await getGenerale('level')).livelli);
        setCaricamento(false)
      })();

      setScrittaTabella("Non è presente alcun dato da mostrare")

    } else {
      setScrittaTabella("Non si dispone delle autorizzazioni per visualizzare i dati di questa tabella")
    }
  }
  const funzioneAggiornamento = () => {
    //----GET ALL USERS----
    if (functions.indexOf("level.edit") !== -1) {
      (async () => {
        setData((await postGenerale('level', { id: id, version: version, nome: nome, descrizione: descrizione })).livelli);
        setOpen(false);
        funzioneGetAll();
      })();
    }
  }

  const funzioneDelete = (id) => {
    if (functions.indexOf("level.delete") !== -1) {
      (async () => {
        setCaricamento(true)
        await deleteGenerale("level", id)
        funzioneGetAll();
      })();
    }
  }

  useEffect(() => {
    funzioneGetAll();
  }, []);


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
                  disabled= {functions.indexOf("level.edit") === -1}
                >
                  CREA RUOLO
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
          rowData => ({
            icon: ()=><DeleteIcon/>,
            tooltip: 'Elimina Ruolo',
            onClick: (event, rowData) => funzioneDelete(rowData.id),
            disabled: functions.indexOf("level.delete") === -1 || rowData.nome === "ADMIN",
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
                        disabled={nome === "ADMIN" || nome === "admin" || nome === "Admin" ? true : false}
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
    </div>
  );
};

export default GestioneRuoli;
