import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import { IconButton, Paper, Typography, Link } from "@material-ui/core";
import acccessControl from "../service/url.js";
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
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SettingsIcon from "@material-ui/icons/Settings";
import GetAppIcon from "@material-ui/icons/GetApp";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

import loading from "../../src/assets/load.gif";

function TestCaseTable() {
  const [file, setFile] = useState([]);
  const [data, setData] = useState([]);
  const [testCase, setTestCase] = useState([]);
  const [id, setId] = useState();
  const [nomeTitolo, setNomeTitolo] = useState("");
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [version, setVersion] = useState();
  const [expectedDuration, setExpectedDuration] = useState();
  const [durata, setDurata] = useState();
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [template, setTemplate] = useState(0);
  const [testSuite, setTestSuite] = useState();
  const [opzioni, setOpzioni] = useState();
  const [lastResult, setLastResult] = useState();
  const [status, setStatus] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [chiamato, setChiamato] = useState({});
  let arrAppoggioChiamato = { linea: 0, proxy: 0 };
  const [chiamanti, setChiamanti] = useState([]);
  let arrAppoggioChiamanti = {};
  const [prova, setProva] = useState([]);
  const [appearLine, setAppearLine] = useState([]);
  const [appearOBP, setAppearOBP] = useState([]);
  const [appearFile, setAppearFile] = useState([]);

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  //-----------GET TEST CASE----------------------
  const getAllTestCase = () => {
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
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  //--------------TEST CASE BY ID-----------------------
  const getTestCaseById = (id) => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testcase/` + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestCase(result.testCase);
        var p1 = result.testCase;
        var p2 = p1.chiamanti;
        setChiamanti(p2);
        setOpen(true);
      })
      .catch((error) => console.log("error", error));
  };
  //--------------GET LINE------------------------------
  const getAppearLine = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/linea`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearLine(result.list);
      })
      .catch((error) => console.log("error", error));
  };
  //--------------GET OBP------------------------------
  const getAppearOBP = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/obp`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearOBP(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  //------------UPDATE CHIAMATO-----------------
  const updateChiamato = () => {
    console.log("prova", chiamato);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      id: id,
      version: version,
      chiamato: {
        linea: {
          id: chiamato.linea,
        },
        proxy: {
          id: chiamato.proxy,
        },
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        getTestCaseById(id);
        handleCloseChiamato();
      })
      .catch((error) => console.log("error", error));
  };

  //------------UPDATE CHIAMANTE-----------------
  const updateChiamante = () => {
    console.log("prova", chiamanti);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      id: id,
      version: version,
      chiamante: chiamanti,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        getAllTestCase();
        handleCloseChiamanti();
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestCase();
    getAppearLine();
    getAppearOBP();
  }, []);

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
    getTestCaseById(rowData.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*------- OPEN WARNING DELETE ------------ */

  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  /*---------MODALE DELETE-------*/

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

    fetch(`/api/testcase`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error !== null) {
          setOpenWarning(true);
          if (result.error === "TEST-0009") {
            setWarning(
              "Non è possibile eliminare un test case che non appartiene al proprio gruppo"
            );
          }
          if (result.error === "Internal Server Error") {
            setWarning(
              "Non è possibile eliminare un test case che è legato a una o più Test Suite"
            );
          } else {
            setWarning(
              "Codice errore:" +
                result.error.code +
                "Descrizione" +
                result.error.description
            );
          }
        } else {
          setOpenWarning(false);
          getAllTestCase();
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

  //-----------MODALE CHIAMATO------------------
  const handleOpenChiamato = () => {
    var appoggioChiamato;
    appoggioChiamato = testCase.chiamato;
    console.log(appoggioChiamato);
    arrAppoggioChiamato.linea = appoggioChiamato.linea.id;
    arrAppoggioChiamato.proxy = appoggioChiamato.proxy.id;
    setChiamato(arrAppoggioChiamato);
    console.log(arrAppoggioChiamato);
    setOpenChiamato(true);
  };

  const handleCloseChiamato = () => {
    setOpenChiamato(false);
  };

  //---------MODALE CHIAMANTi--------------------
  const handleOpenChiamanti = () => {
    var appoggioChiamanti;
    appoggioChiamanti = testCase.chiamanti;
    setProva([]);
    for (let i = 0; i < appoggioChiamanti.length; i++) {
      prova.push(i);
      arrAppoggioChiamanti[i] = { proxy: { id: 0 }, linea: { id: 0 } };
    }
    for (let i = 0; i < appoggioChiamanti.length; i++) {
      arrAppoggioChiamanti[i].proxy.id = appoggioChiamanti[i].proxy.id;
      arrAppoggioChiamanti[i].linea.id = appoggioChiamanti[i].linea.id;
      arrAppoggioChiamanti[i].indice = i;
    }
    setChiamanti(arrAppoggioChiamanti);
    console.log("ciao", arrAppoggioChiamanti);
    setOpenChiamanti(true);
  };

  const handleCloseChiamanti = () => {
    setOpenChiamanti(false);
  };

  //-------AGGIORNA TEST CASE----------------------------

  const aggiornaTestCase = () => {
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
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/testcase`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          getAllTestCase();
          handleClose();
        })
        .catch((error) => console.log("error", error));
    };
    invia();
  };

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
    textArea: {
      width: "660px",
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
        detailPanel={(rowData) => {
          return (
            <div
              style={{
                fontSize: 16,
                marginLeft: 3,
              }}
            >
              {"  "} {rowData.descrizione}
            </div>
          );
        }}
        style={{ boxShadow: "none" }}
        title="Test Case"
        data={data}
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
                >
                  TEST CASE
                </Button>
              </div>
            ),
            tooltip: "Load Test Case",
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
            emptyDataSourceMessage: (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "10vh",
                  width: "10vh",
                  margin: "0 auto",
                }}
              >
                <img src={loading} alt="loading" />
              </div>
            ),
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
                      multiline={true}
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
                      onChange={(e) => {
                        e.target.value === ""
                          ? setDescrizione(" ")
                          : setDescrizione(e.target.value);
                      }}
                      label="Descrizione"
                      defaultValue={descrizione}
                      helperText={
                        descrizione !== "" ? "" : "La descrizione è richiesta"
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
                      onChange={(e) => setCreatedBy(e.target.value)}
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
                      onChange={(e) => setCreationDate(e.target.value)}
                      value={creationDate}
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
                      onChange={(e) => setModifiedBy(e.target.value)}
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
                      onChange={(e) => setModifiedDate(e.target.value)}
                      value={modifiedDate}
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
                      onClick={aggiornaTestCase}
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
                      onChange={(e) => {
                        arrAppoggioChiamato.linea = e.target.value;
                        chiamato.linea = arrAppoggioChiamato.linea;
                      }}
                      label="Linea"
                      value={chiamato[1]}
                      defaultValue={() => {
                        var p1 = testCase.chiamato;
                        var p2 = p1.linea;
                        return p2.id;
                      }}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    >
                      {appearLine.map((linea) => (
                        <MenuItem key={linea.id} value={linea.id}>
                          {linea.campiConcatenati}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      select
                      onChange={(e) => {
                        arrAppoggioChiamato.proxy = e.target.value;
                        chiamato.proxy = arrAppoggioChiamato.proxy;
                      }}
                      label="Outboundproxy"
                      value={chiamato[0]}
                      defaultValue={() => {
                        var p1 = testCase.chiamato;
                        var p2 = p1.proxy;
                        return p2.id;
                      }}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    >
                      {appearOBP.map((obp) => (
                        <MenuItem key={obp.id} value={obp.id}>
                          {obp.campiConcatenati}
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
                      onClick={updateChiamato}
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
                {prova.map((chiamante) => (
                  <>
                    <Typography className={classes.intestazione} variant="h6">
                      Chiamante <b>{chiamante + 1}</b>
                    </Typography>
                    <Row>
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          select
                          label="Linea "
                          value={chiamanti[chiamante].linea.id}
                          onChange={(e) => {
                            var p1 = chiamanti;
                            p1[chiamante].linea.id = e.target.value;
                            console.log(p1);
                            // impostaChiamanti(p1);
                          }}
                          InputProps={{
                            readOnly: modifica === false ? true : false,
                          }}
                        >
                          {appearLine.map((linea) => (
                            <MenuItem key={linea.id} value={linea.id}>
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
                          value={() => {
                            var p1 = chiamanti.proxy;
                            return p1.id;
                          }}
                          defaultValue={() => {
                            var p1 = testCase.chiamanti;
                            var p2 = p1[chiamante].proxy;
                            return p2.id;
                          }}
                          onChange={(e) => {
                            arrAppoggioChiamanti[chiamante].proxy.id =
                              e.target.value;
                            setChiamanti(arrAppoggioChiamanti);
                          }}
                          InputProps={{
                            readOnly: modifica === false ? true : false,
                          }}
                        >
                          {appearOBP.map((obp) => (
                            <MenuItem key={obp.id} value={obp.id}>
                              {obp.campiConcatenati}
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
                      onClick={updateChiamante}
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
                  L'eliminazione del Test Case selezionato, comporterà la
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
export default TestCaseTable;
