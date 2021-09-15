import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import { IconButton, Paper, Typography } from "@material-ui/core";
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
import GetAppIcon from "@material-ui/icons/GetApp";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

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
  const [template, setTemplate] = useState(0);
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [chiamato, setChiamato] = useState([]);
  let arrAppoggio = chiamato;
  const [chiamanti, setChiamanti] = useState([]);
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
  //--------------GET TEMPLATE------------------------------
  const getTemplateById = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/template/` + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.list);
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
    // {
    //   title: "Durata Attesa",
    //   field: "expectedDuration",
    // },
    // {
    //   title: "Versione",
    //   field: "version",
    // },
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
    setTemplate("Templete", rowData.template.id);
    getTestCaseById(rowData.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    aggiornaTestCase();
    setOpen(false);
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
        getAllTestCase();
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

  //-----------MODALE CHIAMATO------------------
  const handleOpenChiamato = () => {
    var appoggioChiamato;
    appoggioChiamato = Object.values(testCase.chiamato);
    for (let i = 0; i < appoggioChiamato.length; i++) {
      chiamato.push(appoggioChiamato[i].id);
    }
    console.log(chiamato);
    setOpenChiamato(true);
  };

  const handleCloseChiamato = () => {
    setOpenChiamato(false);
  };

  const handleCloseChiamato2 = () => {
    //aggiornaUtente();
    setOpenChiamato(false);
  };
  //---------MODALE CHIAMANTi--------------------
  const handleOpenChiamanti = () => {
    var appoggioChiamanti;
    appoggioChiamanti = testCase.chiamanti;

    for (let i = 0; i < appoggioChiamanti.length; i++) {
      chiamanti[i] = [0, 0, 0, 0];
    }
    for (let i = 0; i < appoggioChiamanti.length; i++) {
      chiamanti[i][0] = appoggioChiamanti[i]["proxy"].id;
      chiamanti[i][1] = appoggioChiamanti[i]["linea"].id;
      chiamanti[i][2] = appoggioChiamanti[i]["file"].id;
      chiamanti[i][3] = i;
    }
    console.log(chiamanti);
    setOpenChiamanti(true);
  };

  const handleCloseChiamanti = () => {
    setOpenChiamanti(false);
  };

  const handleCloseChiamanti2 = () => {
    //aggiornaUtente();
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
        expectedDuration: expectedDuration,
        nome: nome,
        descrizione: descrizione,
        // chiamato: {
        //   linea: {
        //     id: id,
        //   },
        //   proxy: {
        //     id: 1,
        //   },
        // },
        // chiamanti: [
        //   {
        //     linea: {
        //       id: id,
        //     },
        //     proxy: {
        //       id: id,
        //     },
        //   },
        //   {
        //     linea: {
        //       id: id,
        //     },
        //     proxy: {
        //       id: id,
        //     },
        //   },
        //   {
        //     linea: {
        //       id: id,
        //     },
        //     proxy: {
        //       id: id,
        //     },
        //   },
        // ],
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
    buttonModale: {
      bottom: 0,
    },
    col: {
      padding: "3%",
      height: "106px"
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
    textField: {
      width: "200px",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <MaterialTable
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
                      error={descrizione !== "" ? false : true}
                      onChange={(e) => setDescrizione(e.target.value)}
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
                <Row>
                  <Col className={classes.col}>
                    <ButtonClickedGreen
                      size="medium"
                      nome={
                        modifica === false
                          ? "vedi chiamato"
                          : "modifica chiamato"
                      }
                      onClick={handleOpenChiamato}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <ButtonClickedGreen
                      size="medium"
                      nome={
                        modifica === false
                          ? "vedi chiamanti"
                          : "modifica chiamanti"
                      }
                      onClick={handleOpenChiamanti}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Template"
                      value={template}
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
                      value={creationDate.replace(".000+00:00", "").replace("T", " | ")}
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
                      value={modifiedDate.replace(".000+00:00", "").replace("T", " | ")}
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
                        arrAppoggio[1] = e.target.value;
                        console.log(arrAppoggio)
                        setChiamato(arrAppoggio)
                        console.log(chiamato)
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
                {chiamanti.map((chiamanti) => (
                  <>
                    <Typography className={classes.intestazione} variant="h6">
                      Chiamanti <b>{chiamanti[3] + 1}</b>
                    </Typography>
                    <Row>
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          select
                          onChange={(e) => {
                            chiamanti[1] = e.target.value;
                          }}
                          label="Linea N°"
                          value={chiamanti[1]}
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
                            chiamanti[0] = e.target.value;
                          }}
                          label="Outboundproxy N°"
                          value={chiamanti[0]}
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
                      onClick={handleCloseChiamanti2}
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
    </div>
  );
}
export default TestCaseTable;
