import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import { Paper, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import SettingsIcon from "@material-ui/icons/Settings";
import { MenuItem } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
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
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { getGenerale, getByIdGenerale, postGenerale, deleteGenerale } from "../service/api";

function TestGeneratoreTableNew() {
  var functions = localStorage.getItem("funzioni").split(",");

  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [nomeTitolo, setNomeTitolo] = useState("");
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [version, setVersion] = useState();
  const [template, setTemplate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");

  const [lineaChiamato, setLineaChiamato] = useState(0);
  const [lineaChiamante, setLineaChiamante] = useState(0);
  const [OBPChiamato, setOBPChiamato] = useState(0);
  const [OBPChiamante, setOBPChiamante] = useState(0);
  const [appearLine, setAppearLine] = useState([]);
  const [appearOBP, setAppearOBP] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [scrittaTabella, setScrittaTabella] = useState("")

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  const funzioneGetAll = () => {
    if (functions.indexOf("testgen.view") !== -1 && functions.indexOf("obp.view") !== -1 && functions.indexOf("lineagen.view") !== -1) {
      //----GET ALL USERS----
      (async () => {
        setCaricamento(true)
        setData((await getGenerale('testgen')).list);
        setCaricamento(false)
      })();

      //-----GET APPEAR OBP-----
      (async () => {
        setAppearOBP((await getGenerale('obp')).list);
      })();

      //-----GET APPEAR LINEA-----
      (async () => {
        setAppearLine((await getGenerale('lineageneratore')).list);
      })();

      setScrittaTabella("Non è presente alcun dato da mostrare")

    } else {
      setScrittaTabella("Non si dispone delle autorizzazioni per visualizzare i dati di questa tabella")
    }
  }

  const funzioneGetTestgenById = (id) => {
    if (functions.indexOf("testgen.view") !== -1){
    (async () => {
      setAllVariables((await getByIdGenerale('testgen', id)).testGeneratore);
      funzioneGetAll();
    })();
  }
  }

  const funzioneAggiornaChiamato = () => {
    if (functions.indexOf("testgen.edit") !== -1){
    //----AGGIORNA CHIAMATO----
    (async () => {
      await postGenerale('testgen', { id: id, version: version, lineaChiamato: { id: lineaChiamato }, proxyChiamato: { id: OBPChiamato } });
      funzioneGetTestgenById(id)
    })();
  }
  }
  const funzioneAggiornaChiamante = () => {
    if (functions.indexOf("testgen.edit") !== -1){
    //----AGGIORNA CHIAMANTE----
    (async () => {
      await postGenerale('testgen', { id: id, version: version, lineaChiamante: { id: lineaChiamante }, proxyChiamante: { id: OBPChiamante } });
      funzioneGetTestgenById(id)
    })();
  }
  }


  const funzioneAggiornaTestgen = () => {
    if (functions.indexOf("testgen.edit") !== -1){
    //----AGGIORNA TESTCASE----
    (async () => {
      await postGenerale('testgen', { id: id, version: version, nome: nome, descrizione: descrizione === "" ? " " : descrizione });
      funzioneGetTestgenById(id);
    })();
  }
  }

  const funzioneDelete = () => {
    if (functions.indexOf("testgen.delete") !== -1){
    (async () => {
      setCaricamento(true)
      let result = await deleteGenerale("testcase", idElemento);
      if (result?.error !== null) {

        if (result?.error === "Internal Server Error") {
          setWarning(
            "Non è possibile eliminare il TestCase perchè associato ad una o più TestSuite"
          );
        } else {
          setWarning(
            "Codice errore:" +
            result.error.code +
            "Descrizione" +
            result.code.description
          )
        }

        setOpenWarning(true);

      } else {
        funzioneGetAll();
        setOpenDelete(false)
      }
    })();
  }
  }
  useEffect(() => {
    funzioneGetAll();
  }, []);

  const columns = [
    {
      title: "Nome Test",
      field: "id",
      defaultSort: "desc",
    },
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
    {
      title: "Template",
      field: "template.nome",
    },
    {
      title: "Creato da",
      field: "createdBy",
    },
    {
      title: "Data Creazione",
      field: "creationDate",
    },
    {
      title: "Modificato da",
      field: "modifiedBy",
    },
    {
      title: "Data Modifica",
      field: "modifiedDate",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [modifica, setModifica] = React.useState(false);
  const [openChiamato, setOpenChiamato] = React.useState(false);
  const [openChiamanti, setOpenChiamanti] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);

  const openModifica = (rowData) => {
    setModifica(true);
    handleOpen(rowData);
  };
  const openVisualizza = (rowData) => {
    setModifica(false);
    handleOpen(rowData);
  };

  const setAllVariables = (rowData) => {
    setId(rowData.id);
    setVersion(rowData.version);
    setNomeTitolo(rowData.nome);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setLineaChiamato(rowData.lineaChiamato.id);
    setLineaChiamante(rowData.lineaChiamante.id);
    setOBPChiamato(rowData.proxyChiamato.id);
    setOBPChiamante(rowData.proxyChiamante.id);
    setTemplate(rowData.template);
    setCreatedBy(rowData.createdBy);
    setModifiedBy(rowData.modifiedBy);
    setCreationDate(rowData.creationDate);
    setModifiedDate(rowData.modifiedDate);
  };

  const handleOpen = (rowData) => {
    setAllVariables(rowData)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };


  /*--------------MODALE DELETE TEST GENERATORE -----------*/
  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  //------------ MODALE DELETE--------------

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  //-----------MODALE CHIAMATO------------------
  const handleOpenChiamato = () => {
    setOpenChiamato(true);
  };

  const handleCloseChiamato = () => {
    funzioneGetTestgenById(id)
    setOpenChiamato(false);
  };

  // ---------MODALE CHIAMANTi--------------------
  const handleOpenChiamanti = () => {
    setOpenChiamanti(true);
  };

  const handleCloseChiamante = () => {
    funzioneGetTestgenById(id)
    setOpenChiamanti(false);
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
    paperModaleDelete: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      height: "fit-content",
      width: 500,
      position: "relative",

    },
    contenutoModale: {
      height: 370,
      overflowX: "hidden",
    },
    typography: {
      padding: "3%",
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
    },
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
      marginTop: "9px",
    },
    bottone: {
      marginLeft: "55px",
      marginTop: "5%",
      // marginBottom: "2%",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    iconButton: {
      marginTop: "2%",
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
      height: "fit-content",
      width: 800,
      position: "relative",
    },
    contenutoModale: {
      height: 370,
      overflowX: "hidden",
    },

    col: {
      padding: "3%",
      height: "106px",
    },
    row: {
      width: "600px",
    },
    textField: {
      width: "300px",
    },
    bottoneAnnulla: {
      width: "128px",
    },
    textArea: {
      width: "660px",
    },
  }));

  const classes = useStyles();
  const textNoRecord = "No record to display";

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Test Generatore"
        data={data}
        isLoading={caricamento}
        columns={columns}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          filtering: true,
          exportButton: true,
          searchFieldAlignment: "left",
          pageSizeOptions: [5, 10, 20, { value: data.length, label: "All" }],
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
                  to="/editing/testgeneratore/createstgeneratore"
                  startIcon={<AddIcon />}
                  disabled={functions.indexOf("testgen.create") === -1 || functions.indexOf("template.view") === -1 || functions.indexOf("lineagen.view") === -1 || functions.indexOf("obp.view") === -1}
                >
                  TEST GENERATORE
                </Button>
              </div>
            ),
            tooltip: "Crea Test Generatore",
            isFreeAction: true,
          },
          {
            icon: (dat) => (
              <a>
                <VisibilityIcon />
              </a>
            ),
            tooltip: "Visualizza Test",
            position: "row",
            onClick: (event, rowData) => openVisualizza(rowData),
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Modifica Test",
            onClick: (event, rowData) => openModifica(rowData),
            disabled:functions.indexOf("testgen.edit") === -1,
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina Test",
            onClick: (event, rowData) => {
              handleOpenDelete();
              setIdElemento(rowData.id);
            },
            disabled: functions.indexOf("testgen.delete") === -1,
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

      {/*------------------ MODALE VISUALIZZA/MODIFICA -------------*/}

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
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    {modifica === false ? "Visualizza " : "Modifica "} Test
                    Generatore <b>{nomeTitolo}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={nome !== "" ? false : true}
                      onChange={(e) => setNome(e.target.value)}
                      label="Nome"
                      defaultValue={nome}
                      helperText={nome !== "" ? "" : "Il Nome è richiesto"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Template"
                      defaultValue={template.nome}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      c
                      multiline
                      rows={2}
                      className={classes.textArea}
                      error={descrizione !== "" ? false : true}
                      onChange={(e) => setDescrizione(e.target.value)}
                      label="Descrizione"
                      defaultValue={descrizione}
                      helperText={
                        descrizione !== "" ? "" : "La Descrizione è richiesta"
                      }
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>
                </Row>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: "2%",
                  }}
                >
                  <ButtonClickedGreen
                    size="medium"
                    nome={
                      modifica === false ? "vedi chiamato" : "modifica chiamato"
                    }
                    onClick={handleOpenChiamato}
                  />
                  <ButtonClickedGreen
                    size="medium"
                    nome={
                      modifica === false
                        ? "vedi chiamante"
                        : "modifica chiamante"
                    }
                    onClick={handleOpenChiamanti}
                  />
                </div>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={createdBy !== "" ? false : true}
                      onChange={(e) => setCreatedBy(e.target.value)}
                      label="Creato da"
                      defaultValue={createdBy}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={creationDate !== "" ? false : true}
                      onChange={(e) => setCreationDate(e.target.value)}
                      label="Data Creazione"
                      defaultValue={creationDate}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={modifiedBy !== "" ? false : true}
                      onChange={(e) => setModifiedBy(e.target.value)}
                      label="Modificato da"
                      defaultValue={modifiedBy}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={modifiedDate !== "" ? false : true}
                      onChange={(e) => setModifiedDate(e.target.value)}
                      label="Data Modifica"
                      defaultValue={modifiedDate}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>
              </Form>
              <Divider className={classes.divider} />
              <div
                className={classes.bottone}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {modifica === false ? (
                  ""
                ) : (
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={funzioneAggiornaTestgen}
                  />
                )}

                <ButtonNotClickedGreen
                  className={classes.bottoneAnnulla}
                  onClick={handleClose}
                  size="medium"
                  nome={modifica === false ? "Indietro" : "Annulla"}
                />
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>

      {/* ------------------------MODALE CHIAMATO--------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openChiamato}
        onClose={handleCloseChiamato}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openChiamato}>
          <div>
            <Paper className={classes.paperModale}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    {modifica === false ? "Visualizza " : "Modifica "} Chiamato{" "}
                    <b>{nomeTitolo}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      select
                      onChange={(e) => setLineaChiamato(e.target.value)}
                      label="Linea"
                      value={lineaChiamato}
                      defaultValue={lineaChiamato}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    >
                      {appearLine.map((linea) => (
                        <MenuItem
                          disabled={linea.id === lineaChiamante}
                          key={linea.id}
                          value={linea.id}
                        >
                          {linea.ip + ":" + linea.porta + "-" + linea.typeLinea.descrizione}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      select
                      onChange={(e) => setOBPChiamato(e.target.value)}
                      label="Outboundproxy"
                      value={OBPChiamato}
                      defaultValue={OBPChiamato}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    >
                      {appearOBP.map((proxy) => (
                        <MenuItem
                          disabled={proxy.id === OBPChiamante}
                          key={proxy.id}
                          value={proxy.id}
                        >
                          {proxy.campiConcatenati}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                </Row>
              </Form>
              <div className={classes.buttonModale}>
                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {modifica === false ? (
                    ""
                  ) : (
                    <ButtonClickedGreen
                      size="medium"
                      nome="Aggiorna"
                      onClick={funzioneAggiornaChiamato}
                    />
                  )}

                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseChiamato}
                    size="medium"
                    nome={modifica === false ? "Indietro" : "Annulla"}
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
      {/* ------------------------MODALE CHIAMANTi--------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openChiamanti}
        onClose={handleCloseChiamante}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openChiamanti}>
          <div>
            <Paper className={classes.paperModale} elevation={1}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    {modifica === false ? "Visualizza " : "Modifica "} il
                    Chiamante di <b>{nomeTitolo}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Typography className={classes.intestazione} variant="h6">
                  Chiamante
                </Typography>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      select
                      onChange={(e) => setLineaChiamante(e.target.value)}
                      label="Linea"
                      value={lineaChiamante}
                      defaultValue={lineaChiamante}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    >
                      {appearLine.map((linea) => (
                        <MenuItem
                          disabled={linea.id === lineaChiamato}
                          key={linea.id}
                          value={linea.id}
                        >
                          {linea.ip + ":" + linea.porta + "-" + linea.typeLinea.descrizione}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      select
                      onChange={(e) => setOBPChiamante(e.target.value)}
                      label="Outboundproxy"
                      value={OBPChiamante}
                      defaultValue={OBPChiamante}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    >
                      {appearOBP.map((proxy) => (
                        <MenuItem
                          disabled={proxy.id === OBPChiamato}
                          key={proxy.id}
                          value={proxy.id}
                        >
                          {proxy.campiConcatenati}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                </Row>
              </Form>
              <div className={classes.buttonModale}>
                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {modifica === false ? (
                    ""
                  ) : (
                    <ButtonClickedGreen
                      size="medium"
                      nome="Aggiorna"
                      onClick={funzioneAggiornaChiamante}
                    />
                  )}

                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseChiamante}
                    size="medium"
                    nome={modifica === false ? "Indietro" : "Annulla"}
                  />
                </div>
              </div>
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
                    Elimina Test Generatore <b>{nomeTitolo}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                <Typography className={classes.typography}>
                  L'eliminazione del Test Generatore selezionato, comporterà la
                  cancellazione dei Test Suite ad esso collegati.
                  <br />
                  Si vuole procedere?{" "}
                </Typography>

                <Divider className={classes.divider} />
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
}
export default TestGeneratoreTableNew;
