import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import InputRadio from "./InputRadio";
import DeleteIcon from "@material-ui/icons/Delete";
import { Paper, Typography } from "@material-ui/core";
import acccessControl from "../service/url.js";
import Divider from "@material-ui/core/Divider";
import { MenuItem } from "@material-ui/core";
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
import Tooltip from "@material-ui/core/Tooltip";

function TestSuiteTable() {
  const [data, setData] = useState([]);
  const [testCases, setTestCases] = useState([]);
  const [id, setId] = useState();
  const [nome, setNome] = useState("");
  const [version, setVersion] = useState();
  const [descrizione, setDescrizione] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataTestCases, setDataTestCases] = useState([]);
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [durataComplessiva, setDurataComplessiva] = useState("");
  const [testSuite, setTestSuite] = useState([]);
  const [caricamento, setCaricamento] = useState(false);
  const [caricamento2, setCaricamento2] = useState(false);
  const arrayTestCase = testSuite?.testCases;
  //Array di case checked + quelli seza checked
  const newArr1 = arrayTestCase?.map((v) => ({
    ...v,
    tableData: { checked: true },
  }));
  // console.log(newArr1, " Array di test case modificato");

  console.log(dataTestCases, "Lista di test cases");

  // Prova
  // const arrayEmpty = [];
  // for (let index = 0; index < dataTestCases.length; index++) {
  //   const elemento = dataTestCases[index];

  //   for (let index = 0; index < newArr1?.length; index++) {
  //     if (elemento.id === newArr1[index].id) {
  //       arrayEmpty.push(newArr1[index]);
  //     }
  //   }

  //   if (!arrayEmpty.includes(elemento)) {
  //     arrayEmpty.push(elemento);

  //     console.log(!arrayEmpty.includes(elemento.id));
  //   }

  //   console.log(dataTestCases[index], "data");
  //   newArr1?.push(elemento);
  // }

  // Sostituzione array checked con quelli senza check che hanno lo seddo id
  const res = dataTestCases.map(
    (obj) => newArr1?.find((o) => o.id === obj.id) || obj
  );

  /// Array di testCase associati con il flag

  // for (let index = 0; index < dataTestCases.length; index++) {
  //   const elemento = dataTestCases[index];

  //   // console.log(dataTestCases[index], "data");
  //   newArr1?.push(elemento);
  // }

  // console.log(dataTestCases, "dataTestCases");

  /*------- arrayIdTestCase -----------*/
  const arrayIdTestCase = [];
  for (let index = 0; index < selectedRows?.length; index++) {
    const element = selectedRows[index]?.id;
    arrayIdTestCase?.push(element);
  }

  // console.log(selectedRows, " Righe selezionati");
  console.log(arrayTestCase, " Array di test case");

  var arrayId = [];
  arrayTestCase?.forEach(function (obj) {
    arrayId?.push(obj.id);
  });
  console.log(arrayId, "ID associati");

  console.log(arrayIdTestCase, "Id test case selezionati");

  //Pusho gli ID associati nell'array di test Case
  // for (let index = 0; index < arrayId.length; index++) {
  //   const element = arrayId[index];
  //   arrayIdTestCase?.push(element);
  // }
  // console.log(arrayIdTestCase, "Id test case totali");
  //Tolgo gli ID duplicati
  // const uniqueArray = [...new Set(arrayIdTestCase)];

  // console.log(uniqueArray);

  //----Bearer-------------------------

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  //-----------GET TEST SUITE----------------------
  const getAllTestSuite = () => {
    setCaricamento(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testsuite`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.list);
        setCaricamento(false);
      })
      .catch((error) => console.log("error", error));
  };
  //------------------------- GET TEST SUITE BY ID ------------------------------

  const getTestSuiteById = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testsuite/` + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestSuite(result.testSuite);
        setOpen(true);
      })
      .catch((error) => console.log("error", error));
  };

  //-----------GET TEST CASE----------------------
  const getAllTestCase = () => {
    setCaricamento2(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setDataTestCases(result.list);
        setCaricamento2(false);
      })
      .catch((error) => console.log("error", error));
  };

  //---------------- MODIFICA TEST SUITE---------------------
  const aggiornaTestCaseAssociati = () => {
    const Invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        id: id,
        version: version,
        nome: nome,
        descrizione: descrizione,
        testCases: arrayIdTestCase,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/testsuite`, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      getAllTestSuite();
      // window.location = "/editing/testsuite";
    };
  };

  //----------------------------------------------------------
  useEffect(() => {
    getAllTestSuite();
    getAllTestCase();
    // Invia();
  }, []);

  // console.log(testSuite.testCases, "sono test suite");

  const columns = [
    {
      title: "ID Test",
      field: "id",
      defaultSort: "desc",
      // tableData: { checked: true },
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
      title: "Numero di Test Case",
      field: "numTestCases",
      // render: (rowData) => {
      //   let prova = "!";
      //   for (let index = 0; index < rowData.testCases.length; index++){
      //     prova += ", " +rowData.testCases[index].nome;
      //   }
      //   return prova.replace("!, ", "")
      // },
    },
    {
      title: "Durata Complessiva",
      field: "durata",
    },
    // {
    //   title: "Gruppo",
    //   field: "gruppo.nome",
    // },
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
    // {
    //   title: "Durata Attesa",
    //   field: "expectedDuration",
    // },
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
      field: "file",
    },
  ];
  // console.log(columns.field);
  const [open, setOpen] = React.useState(false);
  const [modifica, setModifica] = React.useState(false);
  const [openTestSuite, SetOpenTestSuite] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);
  const [openTestCase, SetOpenTestCase] = React.useState(false);

  const openModifica = (rowData) => {
    setModifica(true);
    handleOpen(rowData);
  };
  const openVisualizza = (rowData) => {
    setModifica(false);
    handleOpen(rowData);
  };

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersion(rowData.version);
    // setTestCases([...testCases, rowData.testCases[0].nome]);
    setCreatedBy(rowData.createdBy);
    setModifiedBy(rowData.modifiedBy);
    setCreationDate(rowData.creationDate);
    setModifiedDate(rowData.modifiedDate);
    // setOpen(true);
    getTestSuiteById(rowData.id);
  };

  const handleOpenTestCase = () => {
    SetOpenTestCase(true);
  };

  const handleCloseTestCase = () => {
    SetOpenTestCase(false);
  };

  const handleCloseTestCaseUpdated = () => {
    SetOpenTestCase(false);
    aggiornaTestCaseAssociati();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    aggiornaTestSuite();
    setOpen(false);
  };

  //------------ FUNZIONE DELETE ------------

  const functionDelete = () => {
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

    fetch(`/api/testsuite`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error !== null) {
          setOpenWarning(true);
          if (result.error.code === "Internal Server Error") {
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
          getAllTestSuite();
        }
      })
      .catch((error) => console.log("error", error));
    handleCloseDelete();
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

  const [warningUpdate, setWarningUpdate] = useState("");
  const [openWarningUpdate, setOpenWarningUpdate] = useState(false);

  const handleCloseWarningUpdate = () => {
    setOpenWarningUpdate(false);
  };

  //-------AGGIORNA TEST SUITE----------------------------

  const aggiornaTestSuite = () => {
    const invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        id: id,
        version: version,
        nome: nome,
        descrizione: descrizione,
        testCases: arrayIdTestCase,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/testsuite`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.error !== null) {
            setOpenWarningUpdate(true);
            if (result.error.code === "") {
              setWarningUpdate(
                "Impossibile aggiornare il Test Suite poichè l'utente non dispone delle autorizzazioni necessarie"
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
            setOpenWarningUpdate(false);
            getAllTestSuite();
          }
        })
        .catch((error) => console.log("error", error));
    };
    invia();
  };

  //-----------MODALE TEST SUITE------------------

  // const handleOpenTestSuite= () => {
  //   var appoggioChiamato;
  //   appoggioChiamato = Object.values(testCase.chiamato);
  //   for (let i = 0; i < appoggioChiamato.length; i++) {
  //     chiamato.push(appoggioChiamato[i].id);
  //   }
  //   console.log(chiamato);
  //   setOpenChiamato(true);
  // };

  // const handleCloseChiamato = () => {
  //   setOpenChiamato(false);
  // };

  // const handleCloseChiamato2 = () => {
  //   //aggiornaUtente();
  //   setOpenChiamato(false);
  // };

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
      // marginBottom: "2%",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    // divider: {
    //   marginTop: "3%",
    //   marginBottom: "5",
    // },
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
      // position: "relative",
    },

    paperContainer2: {
      flexDirection: "column",
      padding: "20px",
      // marginBottom: "10%",
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
      // width: "15%",
      // height: "15%",
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
                >
                  TEST SUITE
                </Button>
              </div>
            ),
            tooltip: "Load Test Suite",
            //onClick: () => funzioneFor(),
            isFreeAction: true,
          },
          {
            icon: (dat) => (
              <a>
                <VisibilityIcon />
              </a>
            ),
            tooltip: "Visualizza tutti i dati",
            position: "row",
            onClick: (event, rowData) => openVisualizza(rowData),
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Modifica",
            onClick: (event, rowData) => openModifica(rowData),
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Remove all selected test",
            onClick: (event, rowData) => {
              handleOpenDelete(rowData);
              setIdElemento(rowData.id);
            },
          },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
          body: {
            emptyDataSourceMessage: "Non è presente alcun dato da mostrare",
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
                      // helperText={nome !== "" ? "" : "Lo status è richiesto"}
                      InputProps={{
                        readOnly: modifica === true,
                        // readOnly: modifica === false ? true : false,
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
                      error={version !== "" ? false : true}
                      onChange={(e) => setVersion(e.target.value)}
                      label="Versione"
                      defaultValue={version}
                      helperText={version !== "" ? "" : "Inserire versione"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={testCases !== "" ? false : true}
                      // onChange={(e) => setTestCases(e.target.value)}
                      label="Numero Test Case"
                      defaultValue={arrayTestCase?.length}
                      helperText={testCases !== "" ? "" : "Test Case"}
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

                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", padding: "2%"}}>
                  
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
                      onClick={handleClose2}
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
                      // actions={[
                      //   {
                      //     icon: (dat) => (
                      //       <a>
                      //         <VisibilityIcon />
                      //       </a>
                      //     ),
                      //     tooltip: "Visualizza tutti i dati",
                      //     position: "row",
                      //     onClick: (event, rowData) => openVisualizza(rowData),
                      //   },
                      // ]}
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
                      <ButtonClickedGreen
                        size="medium"
                        nome="Aggiorna"
                        // onClick={handleCloseChiamato2}
                      />
                    )}

                    <ButtonNotClickedGreen
                      className={classes.bottoneAnnulla}
                      onClick={handleCloseTestCase}
                      size="medium"
                      nome={modifica === false ? "Indietro" : "Annulla"}
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
                      style={{ boxShadow: "none" }}
                      title="Test Case"
                      data={dataTestCases}
                      columns={columnsTestcases}
                      options={{
                        selection: true,
                        // selectionProps: (rowData) => ({
                        //   checked: (rowData.tableData === rowData.id) === 1,
                        // }),
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
                      onSelectionChange={
                        (rows) => {
                          setSelectedRows(rows);
                          console.log(rows, "Row");
                        }
                        // for (let i = 0; i < rows.length; i++) {
                        //   // console.log(rows[i].id);
                        //   return selectedRows.push(rows[i].id);
                        // }
                      }
                      // actions={[
                      //   {
                      //     icon: (dat) => (
                      //       <a>
                      //         <VisibilityIcon />
                      //       </a>
                      //     ),
                      //     tooltip: "Visualizza tutti i dati",
                      //     position: "row",
                      //     onClick: (event, rowData) => openVisualizza(rowData),
                      //   },
                      // ]}
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
                    {/* {arrayIdTestCase.length < 0 ? () : ()} */}
                    <ButtonClickedGreen
                      size="medium"
                      nome="Aggiorna"
                      disabled={arrayIdTestCase.length === 0 ? "true" : ""}
                      onClick={handleCloseTestCaseUpdated}
                    />

                    <ButtonNotClickedGreen
                      className={classes.bottoneAnnulla}
                      onClick={handleCloseTestCase}
                      size="medium"
                      nome={modifica === false ? "Indietro" : "Annulla"}
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
