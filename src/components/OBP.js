import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import { MenuItem, Button, Paper, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import acccessControl from "../service/url.js";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DeleteIcon from "@material-ui/icons/Delete";
import SettingsIcon from "@material-ui/icons/Settings";
import { Divider } from "@material-ui/core";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";
import { getGenerale, postGenerale, deleteGenerale } from "../service/api";
import { tableIcons } from "../components/Icons";

function Obp() {
  var functions = localStorage.getItem("funzioni").split(",");

  const [data, setData] = useState([]);
  const [appearLine, setAppearLine] = useState([]);
  const [id, setId] = useState();
  const [ip1, setIp1] = useState("");
  const [ip2, setIp2] = useState("");
  const [ip3, setIp3] = useState("");
  const [ip4, setIp4] = useState("");
  const [porta, setPorta] = useState();
  const [descrizione, setDescrizione] = useState("");
  const [typeLinea, setTypeLinea] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [version, setVersion] = React.useState(0);
  const [caricamento, setCaricamento] = useState(false);
  const [scrittaTabella, setScrittaTabella] = useState("");

  //-------------------------OBP API----------------

  //-----------GET ----------------------
  const funzioneGetAll = () => {
    if (
      functions.indexOf("obp.view") !== -1 &&
      functions.indexOf("linea.view") !== -1
    ) {
      //----GET ALL LINEE----
      (async () => {
        setCaricamento(true);
        setData((await getGenerale("obp")).list);
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

  const aggiornaUtente = () => {
    const invia = () => {
      if (functions.indexOf("obp.edit") !== -1) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", bearer);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", acccessControl);
        myHeaders.append("Access-Control-Allow-Credentials", "true");

        var raw = JSON.stringify({
          id: id,
          version: version,
          ipDestinazione: ip1 + "." + ip2 + "." + ip3 + "." + ip4,
          descrizione: descrizione,
          porta: porta === "" ? 5060 : porta,
          typeLinee: typeLinea,
        });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        fetch(`/api/obp`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            funzioneGetAll();
          })
          .catch((error) => console.log("error", error));
      }
    };

    const aggiornaIP = () => {
      if (
        ip1 >= 0 &&
        ip1 <= 255 &&
        ip2 >= 0 &&
        ip2 <= 255 &&
        ip3 >= 0 &&
        ip3 <= 255 &&
        ip4 >= 0 &&
        ip4 <= 255
      ) {
        invia();
        setOpen(false);
      }
    };

    if (ip1 !== "" && ip2 !== "" && ip3 !== "" && ip4 !== "") {
      if (porta === "") {
        setPorta("5060");
      }
      if (descrizione === "") {
        setDescrizione(" ");
      }

      aggiornaIP();
    }
  };

  const columns = [
    { title: "ID OBP", field: "id", defaultSort: "desc" },
    {
      title: "Proxy IP Address",
      field: "ipDestinazione",
    },
    {
      title: "Tipo Linea",
      field: "typeLinee[0].descrizione",
      render: (rowData) => {
        let prova = "!";
        for (let index = 0; index < rowData.typeLinee.length; index++) {
          prova +=
            ", " +
            rowData.typeLinee[index].descrizione +
            "-" +
            rowData.typeLinee[index].natura;
        }
        return prova.replace("!, ", "");
      },
    },
    {
      title: "Porta",
      field: "porta",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
    {
      title: "Data di creazione",
      field: "creationDate",
      render: (rowData) => {
        return rowData.creationDate
          .replace("T", " / ")
          .replace(".000+00:00", "");
      },
    },
    {
      title: "Data di modifica",
      field: "modifiedDate",
      render: (rowData) => {
        return rowData.modifiedDate
          .replace("T", " / ")
          .replace(".000+00:00", "");
      },
    },
    {
      title: "Creato da",
      field: "createdBy",
    },
    {
      title: "Modificato da",
      field: "modifiedBy",
    },
    {
      title: "Versione",
      field: "version",
      hidden: true,
    },
  ];

  const bearer = `Bearer ${localStorage.getItem("token")}`;

  useEffect(() => {
    funzioneGetAll();
  }, []);

  const handleOpen = (rowData) => {
    setId(rowData.id);

    var ipAppoggio = rowData.ipDestinazione;
    ipAppoggio = ipAppoggio.split(".");
    setIp1(ipAppoggio[0].replace(".", ""));
    setIp2(ipAppoggio[1].replace(".", ""));
    setIp3(ipAppoggio[2].replace(".", ""));
    setIp4(ipAppoggio[3]);

    setPorta(rowData.porta);
    setDescrizione(rowData.descrizione);
    setVersion(rowData.version);
    setTypeLinea([...typeLinea, rowData.typeLinee[0].id]);
    setOpen(true);
  };

  const handleChange = (event) => {
    setTypeLinea(event.target.value);
  };

  const handleRenderValue = (selected) => {
    selected.join(", ");
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*-------------- MODALE ERROR ------------*/

  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  /*------------------ MODALE DELETE ---------------------*/
  const [openDelete, setOpenDelete] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);

  const handleOpenDelete = (rowData) => {
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale ------------
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const functionDelete = () => {
    if (functions.indexOf("obp.delete") !== -1) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        id: idElemento,
      });

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/obp`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.error !== null) {
            setOpenWarning(true);
            if (result.error === "Internal Server Error") {
              setWarning(
                "Impossibile eliminare l'OBP poichè associato ad uno o più Test Case"
              );
            }
            if (result.error.code === "LINEA-0010") {
              setWarning(
                "Impossibile eliminare un outbound proxy che non appartiene al proprio gruppo"
              );
            } else {
              setWarning(
                "Codice errore: " +
                  result.error.code +
                  "Descrizione:" +
                  result.code.description
              );
            }
          } else {
            setOpenWarning(false);
            funzioneGetAll();
          }
        })
        .catch((error) => console.log("error", error));
      handleCloseDelete();
    }
  };

  /*--------------- LAYOUT ------------*/

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
    paperGrid: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textArea: {
      width: "564px",
    },

    paperTop: {
      height: "20%",
      display: "flex",
      alignItems: "center",
    },
    paperBottom: {
      padding: "2%",
      backgrounColor: "#FFFFFF",
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
    select: {
      width: "264px",
    },
    divTextarea: {
      marginTop: "20px",
    },
    intestazione: {
      color: "#47B881",
      marginTop: "2%",
      flexDirection: "row",
      marginBottom: "3%",
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
      padding: "4%",
      width: "fit-content",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    col: {
      padding: "3%",
      height: "106px",
      width: "90px",
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
      width: "270px",
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
    typography: {
      padding: "3%",
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
    divIntestazione: {
      display: "flex",
      alignItems: "center",
      padding: "2%",
      marginBottom: "1%",
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
  }));
  const classes = useStyles();

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Outbound Proxy"
        data={data}
        isLoading={caricamento}
        columns={columns}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          search: true,
          exportButton: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          filtering: true,
          pageSizeOptions: [5, 10, 20, { value: data.length, label: "All" }],
        }}
        actions={[
          {
            icon: () => (
              <Button
                className="button-green"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="/editing/outboundproxy/creaobp"
                startIcon={<AddIcon />}
                disabled={functions.indexOf("linea.view") === -1}
              >
                Outbound Proxy{" "}
              </Button>
            ),
            tooltip: "Crea Outbound Proxy",
            isFreeAction: true,
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Modifica Outbound Proxy",
            onClick: (event, rowData) => handleOpen(rowData),
            disabled: functions.indexOf("obp.edit") === -1,
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina Outbound Proxy",
            onClick: (event, rowData) => {
              handleOpenDelete(rowData);
              setIdElemento(rowData.id);
            },
            disabled: functions.indexOf("obp.delete") === -1,
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

      {/*-------MODALE VISUALIZZA/MODIFICA---------*/}

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
                  Modifica l'<b>OBP n°{id}</b>
                </Typography>
              </ListItem>
              <Divider className={classes.divider} />
            </div>

            <Paper className={classes.paperContent} elevation={0}>
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

              <Row className={classes.row}>
                <Col className={classes.col}>
                  <TextField
                    error={
                      porta !== "" && porta > 1000 && porta < 100000
                        ? false
                        : true
                    }
                    className={classes.textField}
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
                    SelectProps={{
                      multiple: true,
                      onChange: handleChange,
                    }}
                    select
                    label="Tipo Linea"
                    value={appearLine?.id}
                    defaultValue={typeLinea}
                    onChange={(e) => setTypeLinea(e.target.value)}
                  >
                    {appearLine.map((typeLinea) => (
                      <MenuItem key={typeLinea.id} value={typeLinea.id}>
                        {typeLinea.descrizione + "-" + typeLinea.natura}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>
              </Row>

              <Row className={classes.row}>
                <Col className={classes.col}>
                  <TextField
                    multiline
                    rows={2}
                    className={classes.textArea}
                    error={descrizione !== "" ? false : true}
                    onChange={(e) => setDescrizione(e.target.value)}
                    label="Descrizione"
                    defaultValue={descrizione}
                    helperText={
                      descrizione !== "" ? "" : "Descrizione richiesta"
                    }
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
                porta > 1000 &&
                porta < 100000 ? (
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={aggiornaUtente}
                  />
                ) : (
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={aggiornaUtente}
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
                    Elimina OBP <b>{id}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                <Typography className={classes.typography}>
                  L'eliminazione del'OBP selezionato, impatterà sui Test Case ad
                  esso collegati. Pertanto, non saranno più applicabili.
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
export default Obp;
