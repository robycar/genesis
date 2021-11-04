import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import DeleteIcon from "@material-ui/icons/Delete";
import { Paper, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
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
import SettingsIcon from "@material-ui/icons/Settings";
import {
  getGenerale,
  getByIdGenerale,
  postGenerale,
  deleteGenerale,
} from "../service/api";
import { tableIcons } from "../components/Icons";

function TestSuiteTable() {
  var functions = localStorage.getItem("funzioni").split(",");

  const [data, setData] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [id, setId] = useState();
  const [numTestCases, setNumTestCases] = useState();
  const [nome, setNome] = useState("");
  const [version, setVersion] = useState();
  const [descrizione, setDescrizione] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataTestCases, setDataTestCases] = useState([]);
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [testSuite, setTestSuite] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [caricamento2, setCaricamento2] = useState(false);
  const arrayTestCase = testSuite?.testCases;
  const [testCasesNome, setTestCasesNome] = useState("");
  const [scrittaTabella, setScrittaTabella] = useState("");

  //--------------------------------MODIFICA TESTCASE ASSOCIATI A TESTSUITE-----------------------------------------------------
  const [testAssociati, setTestAssociati] = useState([]);

  const impostaTestCaseAssociati = (testsuite) => {
    let x = [];

    for (let i = 0; i < testsuite?.testCases?.length; i++) {
      x.push(testsuite?.testCases[i]?.id);
    }
    setTestAssociati(x);
  };

  const modificaTestSelezionati = (testcase) => {
    let x = [...testAssociati];
    if (testAssociati.includes(testcase.id)) {
      x.splice(x.indexOf(testcase.id), 1);
    } else {
      x.push(testcase.id);
    }
    setTestAssociati(x);
  };

  //---------------------------------------------------------------------------------------------------------------------------------

  /*------- arrayIdTestCase -----------*/
  const arrayIdTestCase = [];
  for (let index = 0; index < selectedRows?.length; index++) {
    const element = selectedRows[index]?.id;
    arrayIdTestCase?.push(element);
  }

  var arrayId = [];
  arrayTestCase?.forEach(function (obj) {
    arrayId?.push(obj.id);
  });

  //----Bearer-------------------------

  const funzioneGetAll = () => {
    if (
      functions.indexOf("testsuite.view") !== -1 &&
      functions.indexOf("test.view") !== -1
    ) {
      (async () => {
        setCaricamento(true);
        setData((await getGenerale("testsuite")).list);
        setCaricamento(false);
      })();

      (async () => {
        setCaricamento2(true);
        setDataTestCases((await getGenerale("testcase")).list);
        setCaricamento2(false);
      })();

      setScrittaTabella("Non è presente alcun dato da mostrare");
    } else {
      setScrittaTabella(
        "Non si dispone delle autorizzazioni per visualizzare i dati di questa tabella"
      );
    }
  };

  //----PRENDI TESTCASE ASSOCIATI----
  const funzioneGetTestsuiteById = (id) => {
    if (functions.indexOf("testsuite.view") !== -1) {
      (async () => {
        let result = await getByIdGenerale("testsuite", id);
        setTestSuite(result.testSuite);
        aggiornaVariabili(result.testSuite);
        impostaTestCaseAssociati(result.testSuite);
        setOpen(true);
      })();
    }
  };

  //----AGGIORNA TESTCASE ASSOCIATI----
  const funzioneAggiornaTestCaseAssociati = () => {
    if (functions.indexOf("testsuite.edit") !== -1) {
      (async () => {
        let result = await postGenerale("testsuite", {
          id: id,
          version: version,
          testCases: testAssociati,
        });
        funzioneGetTestsuiteById(id);
      })();
    }
  };

  //----AGGIORNA TESTSUITE----
  const funzioneAggiornaTestSuite = () => {
    if (functions.indexOf("testsuite.view") !== -1) {
      (async () => {
        await postGenerale("testsuite", {
          id: id,
          version: version,
          nome: nome,
          descrizione: descrizione,
        });
        handleClose();
        funzioneGetAll();
      })();
    }
  };
  //------------ FUNZIONE DELETE ------------
  const funzioneDelete = () => {
    if (functions.indexOf("testsuite.delete") !== -1) {
      (async () => {
        let result = await deleteGenerale("testsuite", idElemento);
        if (result.error !== null) {
          setOpenWarning(true);
          if (result?.error?.code === "Internal Server Error") {
            setWarning(
              "Impossibile eliminare il Test Suite. L'utente non dispone delle autorizzazioni necessarie"
            );
          } else {
            setWarning(
              "Codice errore: " +
                result.error.code +
                "Descrizione: " +
                result.error.description
            );
          }
        } else {
          setOpenWarning(false);
          funzioneGetAll();
          handleCloseDelete();
        }
      })();
    }
  };

  //----------------------------------------------------------
  useEffect(() => {
    funzioneGetAll();
  }, []);

  const columns = [
    {
      title: "ID Test",
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
      width: "5%",
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
      title: "Numero di Test Case",
      field: "numTestCases",
    },
    {
      title: "Durata Complessiva",
      field: "durata",
    },
  ];

  const columnsTestcases = [
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
      title: "Versione",
      field: "version",
      hidden: true,
    },
    {
      title: "Data Creazione",
      field: "creationDate",
    },
    {
      title: "Data Modifica",
      field: "modifiedDate",
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
  const [openDelete, setOpenDelete] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);
  const [openTestCase, SetOpenTestCase] = React.useState(false);

  const openModifica = (rowData) => {
    setModifica(true);
    funzioneGetTestsuiteById(rowData.id);
  };
  const openVisualizza = (rowData) => {
    setModifica(false);
    funzioneGetTestsuiteById(rowData.id);
  };

  const aggiornaVariabili = (rowData) => {
    setId(rowData.id);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersion(rowData.version);
    setNumTestCases(rowData.numTestCases);
    setCreatedBy(rowData.createdBy);
    setModifiedBy(rowData.modifiedBy);
    setCreationDate(rowData.creationDate);
    setModifiedDate(rowData.modifiedDate);
    setTestCasesNome(rowData.testCases.nome);
  };

  const handleOpenTestCase = () => {
    SetOpenTestCase(true);
  };

  const handleCloseTestCase = () => {
    SetOpenTestCase(false);
    funzioneGetTestsuiteById(id);
  };

  const handleClose = () => {
    setOpen(false);
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

  //-----------
  const [warning, setWarning] = useState("");
  const [openWarning, setOpenWarning] = useState(false);

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  //-------- MODALE ERROR AGGIORNA TEST SUITE -------------//

  const [openWarningUpdate, setOpenWarningUpdate] = useState(false);

  const handleCloseWarningUpdate = () => {
    setOpenWarningUpdate(false);
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
      padding: "2%",
      backgrounColor: "#FFFFFF",
      flexDirection: "column",
      marginTop: "5%",
    },
    selectBar: {
      width: "50%",
      height: "100",
      marginTop: "50px",
    },
    divTextarea: {
      marginTop: "20px",
    },
    textArea: {
      width: "660px",
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
      marginTop: "5%",
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
      padding: "5%",
      height: "fit-content",
      width: 800,
      position: "relative",
    },
    paperModaleTestCases: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      marginButton: "2%",
      height: 800,
      width: 800,
    },

    paperContainer2: {
      flexDirection: "column",
      padding: "20px",
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
              {"  "} {rowData.numTestCases}
            </div>
          );
        }}
        style={{ boxShadow: "none" }}
        title="Test Suite"
        data={data}
        columns={columns}
        isLoading={caricamento}
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
                  to="/editing/testsuite/createstsuite"
                  startIcon={<AddIcon />}
                  disabled={functions.indexOf("testsuite.create") === -1}
                >
                  TEST SUITE
                </Button>
              </div>
            ),
            tooltip: "Crea Test Suite",
            isFreeAction: true,
          },
          {
            icon: (dat) => (
              <a>
                <VisibilityIcon />
              </a>
            ),
            tooltip: "Visualizza Test Suite",
            position: "row",
            onClick: (event, rowData) => openVisualizza(rowData),
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Modifica Test Suite",
            onClick: (event, rowData) => openModifica(rowData),
            disabled: functions.indexOf("testsuite.edit") === -1,
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Elimina Test Suite",
            onClick: (event, rowData) => {
              handleOpenDelete(rowData);
              setIdElemento(rowData.id);
            },
            disabled: functions.indexOf("testsuite.delete") === -1,
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
                    Suite <b>{nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={id !== "" ? false : true}
                      onChange={(e) => setId(e.target.value)}
                      label="Id"
                      defaultValue={id}
                      InputProps={{
                        readOnly: modifica === true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={nome !== "" ? false : true}
                      onChange={(e) => setNome(e.target.value)}
                      label="Nome"
                      defaultValue={nome}
                      helperText={nome !== "" ? "" : "Inserire Nome"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Numero Test Case"
                      defaultValue={numTestCases}
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
                    justifyContent: "center",
                    padding: "2%",
                  }}
                >
                  <ButtonClickedGreen
                    size="medium"
                    nome={
                      modifica === false
                        ? "Vedi test associati"
                        : "Modifica test associati"
                    }
                    onClick={handleOpenTestCase}
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
                      error={modifiedBy !== "" ? false : true}
                      onChange={(e) => setModifiedBy(e.target.value)}
                      label="Modificato da"
                      defaultValue={modifiedBy}
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
                      error={modifiedDate !== "" ? false : true}
                      onChange={(e) => setModifiedDate(e.target.value)}
                      label="Data Modifica "
                      defaultValue={modifiedDate}
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
                      label="Data Creazione "
                      defaultValue={creationDate}
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
                      onClick={funzioneAggiornaTestSuite}
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
      {/* ------------------------MODALE TEST CASE ASSOCIATI-------------------- */}
      {modifica === false ? (
        //Modale Visualizza tabella testCases associati
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openTestCase}
          onClose={handleCloseTestCase}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openTestCase}>
            <div>
              <Paper className={classes.paperContainer2} elevation={1}>
                <div>
                  <ListItem>
                    <Typography className={classes.intestazione} variant="h4">
                      {modifica === false ? "Visualizza " : "Modifica "} i
                      TestCase associati
                    </Typography>
                  </ListItem>
                  <Divider className={classes.divider} />
                </div>

                <Form className={classes.contenutoModale}>
                  <>
                    <MaterialTable
                      icons={tableIcons}
                      style={{ boxShadow: "none" }}
                      title="Test Case"
                      data={arrayTestCase}
                      columns={columnsTestcases}
                      isLoading={caricamento2}
                      options={{
                        selection: false,
                        sorting: true,
                        actionsColumnIndex: -1,
                        search: true,
                        searchFieldVariant: "outlined",
                        filtering: true,
                        searchFieldAlignment: "left",
                        pageSizeOptions: [
                          5,
                          10,
                          20,
                          { value: data.length, label: "All" },
                        ],
                      }}
                      localization={{
                        header: {
                          actions: "Azioni",
                        },
                        body: {
                          emptyDataSourceMessage:
                            "Non è presente alcun dato da mostrare",
                        },
                      }}
                    />
                  </>
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
                      <ButtonClickedGreen size="medium" nome="Aggiorna" />
                    )}

                    <ButtonNotClickedGreen
                      className={classes.bottoneAnnulla}
                      onClick={handleCloseTestCase}
                      size="medium"
                      nome={modifica === false ? "Indietroaa" : "Annullaaa"}
                    />
                  </div>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
      ) : (
        //Modale Modifica tabella testCases associati
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openTestCase}
          onClose={handleCloseTestCase}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openTestCase}>
            <div>
              <Paper className={classes.paperContainer2} elevation={1}>
                <div>
                  <ListItem>
                    <Typography className={classes.intestazione} variant="h4">
                      {modifica === false ? "Visualizza " : "Modifica "} i
                      TestCase associati
                    </Typography>
                  </ListItem>
                  <Divider className={classes.divider} />
                </div>

                <Form className={classes.contenutoModale}>
                  <>
                    <MaterialTable
                      icons={tableIcons}
                      style={{ boxShadow: "none" }}
                      title="Test Case"
                      data={dataTestCases}
                      columns={columnsTestcases}
                      options={{
                        selection: true,
                        showTextRowsSelected: false,
                        selectionProps: (rowData) => ({
                          checked: testAssociati.includes(rowData.id),
                        }),
                        sorting: true,
                        actionsColumnIndex: -1,
                        search: true,
                        searchFieldVariant: "outlined",
                        filtering: true,
                        searchFieldAlignment: "left",
                        pageSizeOptions: [
                          5,
                          10,
                          20,
                          { value: dataTestCases.length, label: "All" },
                        ],
                      }}
                      onSelectionChange={(rows, testcase) => {
                        setSelectedRows(rows);
                        modificaTestSelezionati(testcase);
                      }}
                      localization={{
                        header: {
                          actions: "Azioni",
                        },
                      }}
                    />
                  </>
                </Form>
                <div className={classes.buttonModale}>
                  <Divider className={classes.divider} />
                  <div
                    className={classes.bottone}
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <ButtonClickedGreen
                      size="medium"
                      nome="Aggiorna"
                      onClick={funzioneAggiornaTestCaseAssociati}
                    />

                    <ButtonNotClickedGreen
                      className={classes.bottoneAnnulla}
                      onClick={handleCloseTestCase}
                      size="medium"
                      nome="Indietro"
                    />
                  </div>
                </div>
              </Paper>
            </div>
          </Fade>
        </Modal>
      )}
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
                    Elimina Test Suite <b>{nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                <Typography className={classes.typography}>
                  L'eliminazione del Test Suite selezionato, comporterà la
                  cancellazione dei Test Case ad esso associati.
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
      {/*------------------MODALE UPDATE--------------- */}
      <Modal
        className={classes.modal}
        open={openWarningUpdate}
        onClose={handleCloseWarningUpdate}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openWarningUpdate}>
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
                    onClick={handleCloseWarningUpdate}
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
export default TestSuiteTable;
