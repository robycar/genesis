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
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [durataComplessiva, setDurataComplessiva] = useState("");
  const [testSuite, setTestSuite] = useState([]);

  // const [gruppo, setGruppo] = useState([]);

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  //-----------GET TEST SUITE----------------------
  const getAllTestSuite = () => {
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

  useEffect(() => {
    getAllTestSuite();
  }, []);

  console.log(testSuite.testCases, "sono test suite");

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
      field: "testSuite.testCases",
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
  // console.log(columns.field);
  const [open, setOpen] = React.useState(false);
  const [modifica, setModifica] = React.useState(false);
  const [openTestSuite, SetOpenTestSuite] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);

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
        getAllTestSuite();
      })
      .catch((error) => console.log("error", error));
    handleCloseDelete();
  };

  //------------ funzione apri modale

  const handleOpenDelete = (rowData) => {
    setNome(rowData.nome);
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale
  const handleCloseDelete = () => {
    setOpenDelete(false);
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
        // testCases: [
        //   id
        // ],
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/testsuite`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          getAllTestSuite();
        })
        .catch((error) => console.log("error", error));
    };
    invia();
  };

  //-----------MODALE TEST SUITE------------------

  const arrayTestCases = testSuite.testCases;

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
      width: "200px",
    },
    bottoneAnnulla: {
      width: "128px",
    },
    typography: {
      padding: "3%",
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

                <Row>
                  {/* <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      //error={gruppo !== "" ? false : true}
                      //onChange={(e) => setGruppo(e.target.value)}
                      label="Durata Complessiva"
                      //defaultValue={gruppo}
                      //helperText={gruppo !== "" ? "" : "Il Nome è richiesto"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col> */}
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={testCases !== "" ? false : true}
                      // onChange={(e) => setTestCases(e.target.value)}
                      label="Numero Test Case"
                      defaultValue={testCases}
                      helperText={testCases !== "" ? "" : "Test Case"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>

                  <Col className={classes.col}>
                    <ButtonClickedGreen
                      size="medium"
                      nome={
                        modifica === false
                          ? "Vedi test associati"
                          : "Modifica test associati"
                      }
                      // onClick={handleOpenChiamato}
                    />
                  </Col>
                </Row>

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

      {/* ------------------------MODALE TEST SUITE--------------------- */}
      {/* <Modal
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
                        arrAppoggio[1] = e.target.value;
                        console.log(arrAppoggio);
                        setChiamato(arrAppoggio);
                        console.log(chiamato);
                      }}
                      label="Linea"
                      value={chiamato[1]}
                      defaultValue={chiamato[1]}
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
                        chiamato[0] = e.target.value;
                      }}
                      label="Outboundproxy"
                      value={chiamato[0]}
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
                      onClick={handleCloseChiamato2}
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
      </Modal> */}

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

                <Typography variant="h6" className={classes.typography}>
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
    </div>
  );
}
export default TestSuiteTable;
