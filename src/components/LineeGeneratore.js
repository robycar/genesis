import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import {
  MenuItem,
  Button,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import acccessControl from "../service/url.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";
import { getGenerale, postGenerale, deleteGenerale } from "../service/api";
import { tableIcons } from "../components/Icons";

function LineeGeneratore() {
  var functions = localStorage.getItem("funzioni").split(",");

  const [data, setData] = useState([]);
  const [appearLine, setAppearLine] = useState([]);
  const [modifiedBy, setModifiedBy] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [id, setId] = useState();
  const [numero, setNumero] = useState("");
  let ip;
  const [ip1, setIp1] = useState("");
  const [ip2, setIp2] = useState("");
  const [ip3, setIp3] = useState("");
  const [ip4, setIp4] = useState("");
  const [porta, setPorta] = useState();
  const [password, setPassword] = useState("");
  const [typeLinea, setTypeLinea] = useState();
  const [pathCSV, setPathCSV] = useState("");
  const [caricamento, setCaricamento] = useState(false);
  const [version, setVersion] = useState(0);
  const [scrittaTabella, setScrittaTabella] = useState("");

  const bearer = `Bearer ${localStorage.getItem("token")}`;

  //-------------------------LINEE GENERATORE API----------------

  const funzioneGetAll = () => {
    if (
      functions.indexOf("lineagen.view") !== -1 &&
      functions.indexOf("linea.view") !== -1
    ) {
      //----GET ALL LINEE----
      (async () => {
        setCaricamento(true);
        setData((await getGenerale("lineageneratore")).list);
        setCaricamento(false);
      })();

      //-----GET APPEAR TYPE LINEA-----
      (async () => {
        setAppearLine((await getGenerale("typeLinea")).list);
      })();

      setScrittaTabella("Non è presente alcun dato da mostrare");
    } else {
      setScrittaTabella(
        "Non si dispone delle autorizzazioni per visualizzare i dati di questa tabella"
      );
    }
  };

  useEffect(() => {
    funzioneGetAll();
  }, []);

  //---------------------AGGIORNA LINEA API -------------------------

  const funzioneAggiornaLinea = () => {
    (async () => {
      await postGenerale("lineageneratore", {
        id: id,
        version: version,
        ip: ip,
        porta: porta,
        typeLinea: {
          id: typeLinea,
        },
      });

      funzioneGetAll();
    })();
  };

  const aggiornaLineaGeneratore = () => {
    ip = ip1 + "." + ip2 + "." + ip3 + "." + ip4;
    if (ip !== "") funzioneAggiornaLinea();
  };

  const columns = [
    { title: "ID Linea", field: "id", defaultSort: "desc" },
    {
      title: "IP Linea",
      field: "ip",
    },
    {
      title: "Porta",
      field: "porta",
    },
    {
      title: "Tipo Linea",
      field: "typeLinea.descrizione",
    },
    {
      title: "Path Csv",
      field: "pathCSV.path",
    },
    {
      title: "Creato da",
      field: "createdBy",
    },
    {
      title: "Modificato da",
      field: "modifiedBy",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setNumero(rowData.numero);
    setCreatedBy(rowData.createdBy);
    setModifiedBy(rowData.modifiedBy);
    setVersion(rowData.version);
    var ipAppoggio = rowData.ip;
    ipAppoggio = ipAppoggio.split(".");
    setIp1(ipAppoggio[0].replace(".", ""));
    setIp2(ipAppoggio[1].replace(".", ""));
    setIp3(ipAppoggio[2].replace(".", ""));
    setIp4(ipAppoggio[3]);
    setPorta(rowData.porta);
    setPassword(rowData.password);
    setTypeLinea(rowData.typeLinea.id);
    setPathCSV(rowData.pathCSV.path);
    setOpen(true);
  };

  const handleClose2 = () => {
    aggiornaLineaGeneratore();
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  /*---------- OPEN WARNING DELETE-----------*/

  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  /*--------- DELETE LINEA API ---------*/
  const funzioneDelete = () => {
    (async () => {
      setCaricamento(true);
      await deleteGenerale("lineageneratore", `${idElemento}`).result;
      funzioneGetAll();
    })();
  };

  const functionDelete = () => {
    deleteGenerale("lineageneratore", `${idElemento}`)
      .then((result) => {
        if (result.error !== null) {
          setOpenWarning(true);
          if (result.error.code === "LINEA-0013") {
            setWarning(
              "Impossibile eliminare la Linea Generatore poichè risulta collegata a uno o più Test Generatore"
            );
          } else {
            setWarning(
              "Codice errore: " +
                result.error.code +
                " Descrizione: " +
                result.code.description
            );
          }
        } else {
          funzioneDelete();
          setOpenWarning(false);
          funzioneGetAll();
        }
      })
      .catch((error) => console.log("error", error));
    handleCloseDelete();
  };

  //------------ funzione apri modale

  const handleOpenDelete = (rowData) => {
    setNumero(rowData.numero);
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      width: 500,
      backgroundColor: theme.palette.background.paper,
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
    },
    paperBottom: {
      backgrounColor: "#FFFFFF",
      flexDirection: "column",
      marginLeft: "2%",
      marginRight: "2%",
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
      flexDirection: "row",
      alignItems: "center",
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
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paperModale: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "4%",
      width: "fit-content",
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

    typography: {
      padding: "3%",
    },
    col: {
      padding: "3%",
    },
    colIp: {
      width: "110px",
      padding: "3%",
      height: "106px",
    },
    row: {
      width: "600px",
    },
    rowIp: {
      width: "600px",
      display: "flex",
      flexDirection: "row",
    },
    textField: {
      width: "263px",
    },
    bottone: {
      marginLeft: "55px",
      marginTop: "5%",
    },
    bottoneAnnulla: {
      width: "128px",
    },

    separatoreIp: {
      display: "flex",
      alignItems: "center",

      fontWeight: "600px",
      lineHeigth: "2%",
    },
    textFieldIp: {
      width: "110px",
    },
    paperContent: {
      marginTop: "1%",
      marginBottom: "1%",
    },
    divIntestazione: {
      display: "flex",
      alignItems: "center",
      padding: "2%",
      marginBottom: "1%",
    },
    //
  }));
  const classes = useStyles();

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Total Lines"
        data={data}
        isLoading={caricamento}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          exportButton: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          filtering: true,
          pageSizeOptions: [5, 10, 20, { value: data?.length, label: "All" }],

        }}
        actions={[
          {
            icon: () => (
              <Button
                className="button-green"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="/editing/linee/crealineageneratore"
                startIcon={<AddIcon />}
                disabled={
                  functions.indexOf("lineagen.create") === -1 ||
                  functions.indexOf("linea.view") === -1
                }
              >
                LINEA GENERATORE{" "}
              </Button>
            ),
            tooltip: "Crea Linea",
            isFreeAction: true,
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Modifica Linea",
            onClick: (event, rowData) => handleOpen(rowData),
            disabled: functions.indexOf("lineagen.edit") === -1,
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina Linea",
            onClick: (event, rowData) => {
              handleOpenDelete(rowData);
              setIdElemento(rowData.id);
            },
            disabled: functions.indexOf("lineagen.delete") === -1,
          },
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
          <Paper className={classes.paperModale} elevation={1}>
            <div>
              <ListItem button>
                <Typography className={classes.intestazione} variant="h4">
                  Modifica la <b>Linea {id}</b>
                </Typography>
              </ListItem>
              <Divider className={classes.divider} />
            </div>

            <Paper className={classes.paperContent} elevation={0}>
              <Row className={classes.rowIp}>
                <Col className={classes.colIp}>
                  <TextField
                    className={classes.textField}
                    error={
                      porta !== "" && porta > 1000 && porta < 100000
                        ? false
                        : true
                    }
                    onChange={(e) => setPorta(e.target.value)}
                    label="Porta"
                    type="number"
                    required
                    defaultValue={porta}
                    helperText={
                      porta !== "" && porta > 1000 && porta < 100000
                        ? ""
                        : "La Porta deve essere compresa tra 4 e 5 digit"
                    }
                  />
                </Col>

                <Col className={classes.col}>
                  <TextField
                    className={classes.textField}
                    select
                    label="Tipo Linea"
                    value={appearLine.id}
                    defaultValue={typeLinea}
                    onChange={(e) => setTypeLinea(e.target.value)}
                    style={{ marginleft: "1px" }}
                  >
                    {appearLine.map((typeLinea) => (
                      <MenuItem key={typeLinea.id} value={typeLinea.id}>
                        {typeLinea.descrizione}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>
              </Row>

              <Row className={classes.rowIp}>
                <Col className={classes.colIp}>
                  <TextField
                    className={classes.textFieldIp}
                    error={
                      ip1 <= 255 && ip1 !== "" && ip1.length < 4 ? false : true
                    }
                    onChange={(e) => setIp1(e.target.value)}
                    label="Ip1 Linea"
                    type="number"
                    required
                    defaultValue={ip1}
                    helperText={
                      ip1 <= 255 && ip1 !== "" && ip1.length < 4
                        ? ""
                        : "IP compreso tra 0 e 255"
                    }
                  />
                </Col>
                <Typography className={classes.separatoreIp}>.</Typography>

                <Col className={classes.colIp}>
                  <TextField
                    className={classes.textFieldIp}
                    error={
                      ip2 <= 255 && ip2 !== "" && ip2.length < 4 ? false : true
                    }
                    onChange={(e) => setIp2(e.target.value)}
                    label="Ip2 Linea"
                    type="number"
                    required
                    defaultValue={ip2}
                    helperText={
                      ip2 <= 255 && ip2 !== "" && ip2.length < 4
                        ? ""
                        : "IP compreso tra 0 e 255"
                    }
                  />
                </Col>
                <Typography className={classes.separatoreIp}>.</Typography>

                <Col className={classes.colIp}>
                  <TextField
                    className={classes.textFieldIp}
                    error={
                      ip3 <= 255 && ip3 !== "" && ip3.length < 4 ? false : true
                    }
                    onChange={(e) => setIp3(e.target.value)}
                    label="Ip3 Linea"
                    type="number"
                    required
                    defaultValue={ip3}
                    helperText={
                      ip3 <= 255 && ip3 !== "" && ip3.length < 4
                        ? ""
                        : "IP compreso tra 0 e 255"
                    }
                  />
                </Col>
                <Typography className={classes.separatoreIp}>.</Typography>

                <Col className={classes.colIp}>
                  <TextField
                    className={classes.textFieldIp}
                    error={
                      ip4 <= 255 && ip4 !== "" && ip4.length < 4 ? false : true
                    }
                    onChange={(e) => setIp4(e.target.value)}
                    label="Ip4 Linea"
                    type="number"
                    required
                    defaultValue={ip4}
                    helperText={
                      ip4 <= 255 && ip4 !== "" && ip4.length < 4
                        ? ""
                        : "IP compreso tra 0 e 255"
                    }
                  />
                </Col>
              </Row>

              <Row>
                <Col className={classes.colIp}>
                  <TextField
                    className={classes.textField}
                    onChange={(e) => setCreatedBy(e.target.value)}
                    label="Creato Da"
                    defaultValue={createdBy}
                    inputProps={{ readOnly: true }}
                  />
                </Col>

                <Col className={classes.colIp}>
                  <TextField
                    className={classes.textField}
                    onChange={(e) => setModifiedBy(e.target.value)}
                    label="Modificato Da"
                    defaultValue={modifiedBy}
                    inputProps={{ readOnly: true }}
                    style={{ marginLeft: "1px" }}
                  />
                </Col>
              </Row>

              <Row>
                <Col className={classes.colIp}>
                  <TextField
                    className={classes.textField}
                    onChange={(e) => setPathCSV(e.target.value)}
                    label="Path CSV"
                    defaultValue={pathCSV}
                    inputProps={{ readOnly: true }}
                  />
                </Col>
              </Row>

              <Divider className={classes.divider} />
              <div
                className={classes.bottone}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {ip1 <= 255 &&
                ip1 !== "" &&
                ip1.length < 4 &&
                ip2 <= 255 &&
                ip2 !== "" &&
                ip2.length < 4 &&
                ip3 <= 255 &&
                ip3 !== "" &&
                ip3.length < 4 &&
                ip4 <= 255 &&
                ip4 !== "" &&
                ip4.length < 4 &&
                password !== "" &&
                numero !== "" &&
                porta !== "" &&
                porta > 1000 &&
                porta < 100000 ? (
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleClose2}
                  />
                ) : (
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleClose2}
                    disabled="true"
                  />
                )}

                <ButtonNotClickedGreen
                  className={classes.bottoneAnnulla}
                  onClick={handleClose}
                  nome="Annulla"
                />
              </div>
            </Paper>
          </Paper>
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
                    Elimina Linea N° <b>{numero}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                <Typography className={classes.typography}>
                  L'eliminazione della Linea Generatore selezionata, potrebbe
                  impattare su uno o più Test Generatore ad essa collegati.
                  <br />
                  Si vuole procedere?{" "}
                </Typography>

                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonNotClickedGreen
                    onClick={functionDelete}
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
}
export default LineeGeneratore;
