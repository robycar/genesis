import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import { Paper, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
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
import SettingsIcon from "@material-ui/icons/Settings";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  getGenerale,
  getByIdGenerale,
  postGenerale,
  deleteGenerale,
} from "../service/api";
import { tableIcons } from "../components/Icons";

function TestCaseTable() {
  var functions = localStorage.getItem("funzioni").split(",");

  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [nomeTitolo, setNomeTitolo] = useState("");
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [version, setVersion] = useState();
  const [expectedDuration, setExpectedDuration] = useState();
  const [durata, setDurata] = useState();
  const [template, setTemplate] = useState(0);
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [chiamato, setChiamato] = useState();
  const [lineaChiamato, setLineaChiamato] = useState(0);
  const [proxyChiamato, setProxyChiamato] = useState(0);
  const [chiamanti, setChiamanti] = useState({});
  const [mapChiamanti, setMapChiamanti] = useState([]);
  const [appearLine, setAppearLine] = useState([]);
  const [appearOBP, setAppearOBP] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [scrittaTabella, setScrittaTabella] = useState("");

  const funzioneGetAll = () => {
    if (
      functions.indexOf("test.view") !== -1 &&
      functions.indexOf("obp.view") !== -1 &&
      functions.indexOf("linea.view") !== -1
    ) {
      //----GET ALL USERS----
      (async () => {
        setCaricamento(true);
        setData((await getGenerale("testcase")).list);
        setCaricamento(false);
      })();

      //-----GET APPEAR OBP-----
      (async () => {
        setAppearOBP((await getGenerale("obp")).list);
      })();

      //-----GET APPEAR LINEA-----
      (async () => {
        setAppearLine((await getGenerale("linea")).list);
      })();

      setScrittaTabella("Non è presente alcun dato da mostrare");
    } else {
      setScrittaTabella(
        "Non si dispone delle autorizzazioni per visualizzare i dati di questa tabella"
      );
    }
  };

  const funzioneGetTestcaseById = (id) => {
    if (functions.indexOf("test.view") !== -1) {
      (async () => {
        setAllVariables((await getByIdGenerale("testcase", id)).testCase);
        funzioneGetAll();
        setOpenChiamato(true);
      })();
    }
  };

  const funzioneAggiornaChiamato = () => {
    if (functions.indexOf("test.edit") !== -1) {
      //----AGGIORNA CHIAMATO----
      (async () => {
        await postGenerale("testcase", {
          id: id,
          version: version,
          chiamato: {
            linea: { id: lineaChiamato },
            proxy: { id: proxyChiamato },
          },
        });
        funzioneGetTestcaseById(id);
      })();
    }
  };

  const funzioneAggiornaChiamanti = () => {
    if (functions.indexOf("test.edit") !== -1) {
      //----AGGIORNA CHIAMANTI----
      (async () => {
        await postGenerale("testcase", { id: id, version: version, chiamanti });
        funzioneGetTestcaseById(id);
      })();
    }
  };

  const funzioneAggiornaTestcase = () => {
    if (functions.indexOf("test.edit") !== -1) {
      //----AGGIORNA TESTCASE----
      (async () => {
        await postGenerale("testcase", {
          id: id,
          version: version,
          nome: nome,
          descrizione: descrizione,
        });
        funzioneGetTestcaseById(id);
      })();
    }
  };

  const funzioneDelete = () => {
    if (functions.indexOf("test.delete") !== -1) {
      (async () => {
        setCaricamento(true);
        let result = await deleteGenerale("testcase", idElemento);
        if (result?.error !== null) {
          setOpenWarning(true);
          if (result?.error?.code === "TEST-0009") {
            setWarning(
              "Non è possibile eliminare un test case che non appartiene al proprio gruppo"
            );
          } else if (result?.error === "Internal Server Error") {
            setWarning(
              "Non è possibile eliminare il TestCase perchè associato ad una o più TestSuite"
            );
          } else {
            setWarning(
              "Codice errore:" +
                result.error.code +
                "Descrizione" +
                result.code.description
            );
          }
        } else {
          funzioneGetAll();
          setOpenDelete(false);
        }
      })();
    }
  };

  const columns = [
    {
      title: "ID Test",
      field: "id",
      defaultSort: "desc",
      editable: "never",
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
      title: "Template",
      field: "template.nome",
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

  const handleOpen = (rowData) => {
    setAllVariables(rowData);
    setOpen(true);
  };

  const setAllVariables = (rowData) => {
    setId(rowData.id);
    setNomeTitolo(rowData.nome);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersion(rowData.version);
    setExpectedDuration(rowData);
    setDurata(rowData.expectedDuration);
    setCreatedBy(rowData.createdBy);
    setModifiedBy(rowData.modifiedBy);
    setCreationDate(rowData.creationDate);
    setModifiedDate(rowData.modifiedDate);
    setTemplate(rowData.template.nome);
    setChiamato(rowData.chiamato);
    setChiamanti(rowData.chiamanti);
    setChiama(rowData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*------- OPEN WARNING DELETE ------------ */

  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setCaricamento(false);
    setOpenWarning(false);
  };

  //------------ funzione apri modale delete

  const handleOpenDelete = (rowData) => {
    setNome(rowData.nome);
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale delete
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  //-----------MODALE CHIAMATO------------------
  const setChiama = (rowData) => {
    //-----chiamato------
    setLineaChiamato(rowData.chiamato.linea.id);
    setProxyChiamato(rowData.chiamato.proxy.id);

    //-----chiamanti-----
    var appoggioChiamanti = rowData.chiamanti;

    for (let i = 0; i < Object.keys(rowData.chiamanti).length; i++) {
      delete appoggioChiamanti[i].file;
      appoggioChiamanti[i].linea = { id: rowData.chiamanti[i].linea.id };
      appoggioChiamanti[i].proxy = { id: rowData.chiamanti[i].proxy.id };
    }
    setMapChiamanti(Object.keys(rowData.chiamanti));
  };

  const handleOpenChiamato = () => {
    funzioneGetTestcaseById(id);
  };

  const handleCloseChiamato = () => {
    setOpenChiamato(false);
  };

  //---------MODALE CHIAMANTi--------------------
  const handleOpenChiamanti = () => {
    setOpenChiamanti(true);
  };
  const impostaChiamanti = (e) => {
    setChiamanti(e);
  };
  const handleCloseChiamanti = () => {
    funzioneGetTestcaseById(id);
    setOpenChiamanti(false);
  };

  useEffect(() => {
    funzioneGetAll();
  }, []);
  //-------VISUALIZZA TUTTI I DATI-----------------------

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
    textArea: {
      width: "660px",
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
    buttonModale: {
      bottom: 0,
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

    divIntestazione: {
      display: "flex",
      alignItems: "center",
      padding: "2%",
      marginBottom: "1%",
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
  }));

  const classes = useStyles();

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        detailPanel={(rowData) => {
          return (
            <div
              style={{
                fontSize: 16,
                marginLeft: 2,
              }}
            >
              {"  "} {rowData.descrizione}
            </div>
          );
        }}
        style={{ boxShadow: "none" }}
        title="Test Case"
        data={data}
        isLoading={caricamento}
        columns={columns}
        options={{
          sorting: true,
          exportButton: true,
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          filtering: true,
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
                  to="/editing/testcreatestcase"
                  startIcon={<AddIcon />}
                  disabled={functions.indexOf("test.edit") === -1}
                >
                  TEST CASE
                </Button>
              </div>
            ),
            tooltip: "Crea Test Case",
            isFreeAction: true,
          },
          {
            icon: (dat) => (
              <a>
                <VisibilityIcon />
              </a>
            ),
            tooltip: "Visualizza Test Case",
            position: "row",
            onClick: (event, rowData) => openVisualizza(rowData),
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Modifica Test Case",
            onClick: (event, rowData) => openModifica(rowData),
            disabled: functions.indexOf("test.edit") === -1,
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina Test Case",
            onClick: (event, rowData) => {
              handleOpenDelete(rowData);
              setIdElemento(rowData.id);
            },
            disabled: functions.indexOf("test.delete") === -1,
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
                    {modifica === false ? "Visualizza " : "Modifica "} Test Case{" "}
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
                      error={nome !== "" ? false : true}
                      onChange={(e) => setNome(e.target.value)}
                      label="Nome"
                      defaultValue={nome}
                      helperText={nome !== "" ? "" : "Il nome è richiesto"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={template !== "" ? false : true}
                      onChange={(e) => setTemplate(e.target.value)}
                      label="Template"
                      defaultValue={template}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
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
                        ? "vedi chiamanti"
                        : "modifica chiamanti"
                    }
                    onClick={handleOpenChiamanti}
                  />
                </div>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Creato Da"
                      value={createdBy}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Data di creazione"
                      value={creationDate
                        .replace("T", " / ")
                        .replace(".000+00:00", "")}
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
                      label="Modificato da"
                      value={modifiedBy}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Data di Modifica"
                      value={modifiedDate
                        .replace("T", " / ")
                        .replace(".000+00:00", "")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
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
                      onClick={funzioneAggiornaTestcase}
                    />
                  )}

                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleClose}
                    size="medium"
                    nome={modifica === false ? "Indietro" : "Annulla"}
                  />
                </div>
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
                      label="Linea"
                      value={lineaChiamato}
                      onChange={(e) => setLineaChiamato(e.target.value)}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    >
                      {appearLine.map((linea) => (
                        <MenuItem
                          disabled={
                            linea.id === lineaChiamato ||
                            linea.id === chiamanti[0]?.linea.id ||
                            linea.id === chiamanti[1]?.linea.id ||
                            linea.id === chiamanti[2]?.linea.id
                          }
                          key={linea.id}
                          value={linea.id}
                        >
                          {linea.campiConcatenati}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      select
                      label="Outboundproxy"
                      value={proxyChiamato}
                      onChange={(e) => {
                        setProxyChiamato(e.target.value);
                      }}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    >
                      {appearOBP.map((proxy) => (
                        <MenuItem
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
        onClose={handleCloseChiamanti}
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
                    {modifica === false ? "Visualizza " : "Modifica "} Chiamanti{" "}
                    <b>{nomeTitolo}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                {mapChiamanti.map((chiamante, index) => (
                  <>
                    <Typography className={classes.intestazione} variant="h6">
                      Chiamante <b>{index + 1}</b>
                    </Typography>
                    <Row>
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          select
                          label="Linea "
                          value={chiamanti[index].linea.id}
                          onChange={(e) => {
                            var p1 = [...chiamanti];
                            p1[index].linea.id = e.target.value;
                            impostaChiamanti(p1);
                          }}
                          InputProps={{
                            readOnly: modifica === false ? true : false,
                          }}
                        >
                          {appearLine.map((linea) => (
                            <MenuItem
                              disabled={
                                linea.id === lineaChiamato ||
                                linea.id === chiamanti[0]?.linea.id ||
                                linea.id === chiamanti[1]?.linea.id ||
                                linea.id === chiamanti[2]?.linea.id
                              }
                              key={linea.id}
                              value={linea.id}
                            >
                              {linea.campiConcatenati}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Col>
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          select
                          label="Outboundproxy"
                          value={chiamanti[index].proxy.id}
                          onChange={(e) => {
                            var p1 = [...chiamanti];
                            p1[index].proxy.id = e.target.value;
                            impostaChiamanti(p1);
                          }}
                          InputProps={{
                            readOnly: modifica === false ? true : false,
                          }}
                        >
                          {appearOBP.map((proxy) => (
                            <MenuItem
                              key={proxy.id}
                              value={proxy.id}
                            >
                              {proxy.campiConcatenati}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Col>
                    </Row>
                  </>
                ))}
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
                      onClick={funzioneAggiornaChiamanti}
                    />
                  )}

                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseChiamanti}
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
                    Elimina Test Case <b>{nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                <Typography className={classes.typography}>
                  L'eliminazione del Test Case selezionato, comporterÃ la
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
export default TestCaseTable;
