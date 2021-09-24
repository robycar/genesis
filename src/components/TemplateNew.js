import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Paper, Typography, Link } from "@material-ui/core";
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
import SettingsIcon from "@material-ui/icons/Settings";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";
import acccessControl from "../service/url.js";

function Template() {
  const [data, setData] = useState([]);

  const bearer = `Bearer ${localStorage.getItem("token")}`;

  const [id, setId] = useState();
  const [template, setTemplate] = useState({});
  const [version, setVersion] = useState();
  const [nome, setNome] = useState();
  const [durata, setDurata] = useState();
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [typeTemplate, setTypeTemplate] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [nomeTitolo, setNomeTitolo] = useState("");
  const [caricamento, setCaricamento] = useState(false);
  const [appearFile, setAppearFile] = useState([]);
  const [chiamato, setChiamato] = useState();
  const [chiamanti, setChiamanti] = useState([]);

  //----- GET TEMPLATE -------

  const getTemplate = () => {
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

    fetch(`/api/template`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result.list);
        setCaricamento(false);
      })
      .catch((error) => console.log("error", error));
  };
  //----- GET TEMPLATE BY ID -------

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
        console.log(result)
        setTemplate(result.template);
        impostaChiama(result.template)
      })
      .catch((error) => console.log("error", error));
  };

  //----- GET FILE -------

  const getAppearFile = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/fs/entityfolder/TEMPLATE/` + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearFile(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  //----- UPDATE CHIAMA -------

  const updateChiama = () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      id: id,
      version: version,
      fileLinks: {
        CHIAMATO: [{
          id: chiamato
        }]
      }
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`/api/template`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getTemplateById(id)
        handleCloseChiama()
      })
      .catch((error) => console.log("error", error));
  };

  //----- ADD FILE -------

  const addFile = (files) => {

    var arrayFile = Object.values(files)

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var formdata = new FormData();
    formdata.append("file", arrayFile[0], arrayFile[0]?.name);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch(`/api/fs/entityfolder/TEMPLATE/` + id, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getAppearFile(id)
      })
      .catch((error) => console.log("error", error));
  };


  useEffect(() => {
    getTemplate();
  }, []);

  const columns = [
    {
      title: "ID Template",
      field: "id",
      editable: "never",
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
      title: "Tipo Template",
      field: "typeTemplate",
    },
    {
      title: "Durata",
      field: "durata",
    },
    {
      title: "Versione",
      field: "version",
      editable: "never",
      hidden: true,
    },
    {
      title: "Data modifica",
      field: "modifiedDate",
    },
    {
      title: "Data creazione",
      field: "creationDate",
    },
    {
      title: "Modificato da",
      field: "modifiedBy",
    },
    {
      title: "Creato da",
      field: "createdBy",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [modifica, setModifica] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);
  const [openChiama, setOpenChiama] = useState(false)
  const [openFile, setOpenFile] = useState(false)

  const handleOpen = (rowData) => {
    setId(rowData.id);
    getTemplateById(rowData.id)
    setNomeTitolo(rowData.nome);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersion(rowData.version);
    setDurata(rowData.durata);
    setCreatedBy(rowData.createdBy);
    setModifiedBy(rowData.modifiedBy);
    setCreationDate(rowData.creationDate);
    setModifiedDate(rowData.modifiedDate);
    setTypeTemplate(rowData.typeTemplate);
    getAppearFile(rowData.id)
    setOpen(true);
  };

  const impostaChiama = (templ) => {

    setChiamato(templ.fileLinks.CHIAMATO[0].id)

    var appoggio = []

    if (templ.fileLinks.CHIAMANTE) {
      for (let i = 0; i < templ.fileLinks.CHIAMANTE.length; i++) {
        appoggio.push(templ.fileLinks.CHIAMANTE[i].id)
      }
    }
    setChiamanti(appoggio)
  }

  const openModifica = (rowData) => {
    setModifica(true);
    handleOpen(rowData);
  };
  const openVisualizza = (rowData) => {
    setModifica(false);
    handleOpen(rowData);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenChiama = () => {
    setOpenChiama(true)
  }
  const handleCloseChiama = () => {
    setOpenChiama(false)
  }

  //-------------------MODIFICA FILE-------------------------

  const handleOpenFile = () => {
    setOpenFile(true)
  }
  const handleCloseFile = () => {
    setOpenFile(false)
  }
  const changeHandler = (event) => {
    addFile(event.target.files)
  };
  const handleSubmission = () => { };

  /*--------------MODALE DELETE TEMPLATE -----------*/
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
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

    fetch(`/api/template`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.error !== null) {
          setOpenWarning(true);
          if (result.error.code === "TEST-0011") {
            setWarning(
              "Impossibile eliminare un template che non appartiene al proprio gruppo"
            );

            if (result.error.status === 500) {
              setWarning(
                "Impossibile eliminare il template poichè associato ad uno o più Test Case"
              );
            }
          } else {
            setWarning(
              "Codice errore : " +
              result.error.code +
              "Descrizione: " +
              result.error.description
            );
          }
        } else {
          setOpenWarning(false);
          getTemplate();
        }
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

  const aggiornaTemplate = () => {
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
        durata: durata,
        typeTemplate: typeTemplate,
        descrizione: descrizione
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/template`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          getTemplate();
          handleClose();
        })
        .catch((error) => console.log("error", error));
    };
    invia();
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
      height: 700,
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
    contenutoModaleChiama: {
      height: 200,
      overflowX: "hidden",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <MaterialTable
        detailPanel={rowData => {
          return (
            <div
              style={{
                fontSize: 16,
                marginLeft: 2,
              }}
            >
              {"  "} {rowData.descrizione}
            </div>
          )
        }}
        style={{ boxShadow: "none", maxWidth: '100%' }}
        title="Template"
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
                  to="/editing/template/createmplate"
                  startIcon={<AddIcon />}
                >
                  template
                </Button>
              </div>
            ),
            tooltip: "Carica Template",
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
            tooltip: "Rimuovi Template",
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

      {/*-------------- MODALE MODIFICA/VISUALIZZA---------- */}
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
                    {modifica === false ? "Visualizza " : "Modifica "} Template{" "}
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
                      helperText={nome !== "" ? "" : "Il Nome è richiesto"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      onChange={(e) => {
                        e.target.value === "" ? setDescrizione(" ") : setDescrizione(e.target.value)
                      }}
                      label="Descrizione"
                      defaultValue={descrizione}
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
                      error={durata !== "" ? false : true}
                      onChange={(e) => setDurata(e.target.value)}
                      label="Durata"
                      defaultValue={durata}
                      helperText={durata !== "" ? "" : "La Durata è richiesta"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Creato Da"
                      defaultValue={createdBy}
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
                      label="Modificato Da"
                      defaultValue={modifiedBy}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      label="Data Creazione"
                      defaultValue={creationDate}
                      className={classes.textField}
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
                      label="Data Modifica"
                      defaultValue={modifiedDate}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>

                  <Col className={classes.col}>
                    <ButtonClickedGreen
                      size="medium"
                      nome={
                        modifica === false
                          ? "vedi file"
                          : "modifica File"
                      }
                      onClick={(handleOpenChiama)}
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
                      onClick={aggiornaTemplate}
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

      {/* ------------------------MODALE CHIAMA--------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openChiama}
        onClose={handleCloseChiama}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openChiama}>
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

              <div >
                <Col >
                  <Typography className={classes.intestazione} variant="h6">
                    Chiamato
                  </Typography>
                  <TextField
                    className={classes.textField}
                    select
                    label="Linea "
                    value={chiamato}
                    onChange={(e) => setChiamato(e.target.value)}
                    InputProps={{
                      readOnly: modifica === false ? true : false,
                    }}
                  >
                    {appearFile.map((file) => (
                      <MenuItem disabled={chiamato === file.id || chiamanti[0] === file.id || chiamanti[1] === file.id || chiamanti[2] === file.id} key={file.id} value={file.id}>
                        {file.path}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>
              </div>

              <Divider style={{ display: chiamanti.length === 0 ? "none" : "" }} className={classes.divider} />
              <div>
                <Form className={classes.contenutoModaleChiama}>
                  {chiamanti.map((chiamante, index) => (
                    <div style={{ float: "left" }}>
                      <Col >
                        <Typography className={classes.intestazione} variant="h6">
                          Chiamante <b>{index + 1}</b>
                        </Typography>
                        <TextField
                          className={classes.textField}
                          select
                          label="File "
                          value={chiamanti[index]}
                          onChange={(e) => {
                            var x = [...chiamanti]
                            x[index] = e.target.value
                            setChiamanti(x)
                          }}
                          InputProps={{
                            readOnly: modifica === false ? true : false,
                          }}
                        >
                          {appearFile.map((file) => (
                            <MenuItem disabled={chiamato === file.id || chiamanti[0] === file.id || chiamanti[1] === file.id || chiamanti[2] === file.id} key={file.id} value={file.id}>
                              {file.path}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Col>

                    </div>
                  ))}
                </Form>
              </div>
              <div className={classes.buttonModale}>
                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  {modifica === false ? (
                    ""
                  ) : (
                    <>
                      <ButtonClickedGreen
                        size="medium"
                        nome="File"
                        onClick={handleOpenFile}
                      />
                      <ButtonClickedGreen
                        size="medium"
                        nome="Aggiorna"
                        onClick={updateChiama}
                      />
                    </>
                  )}

                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseChiama}
                    size="medium"
                    nome={modifica === false ? "Indietro" : "Annulla"}
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>

      {/* ------------------------MODALE FILE--------------------- */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openFile}
        onClose={handleCloseFile}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openFile}>
          <div>
            <Paper className={classes.paperModaleDelete} elevation={1}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    Modifica file
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
                <div>
                  {appearFile.map((file) => (
                    <MenuItem disabled={chiamato === file.id || chiamanti[0] === file.id || chiamanti[1] === file.id || chiamanti[2] === file.id} key={file.id} value={file.id}>
                      {file.path}
                    </MenuItem>
                  ))}
                </div>

                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <input
                    // accept=".xml"
                    style={{ display: "none" }}
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    name="file"
                    onChange={changeHandler}
                  />
                  <label htmlFor="contained-button-file">
                    <ButtonClickedGreen
                      color="primary"
                      size="medium"
                      nome="Carica"
                    />
                  </label>
                  <ButtonNotClickedGreen
                    onClick={handleCloseFile}
                    className={classes.bottoneAnnulla}
                    size="medium"
                    nome="Indietro"
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
                    Elimina Template <b>{nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                <Typography className={classes.typography}>
                  L'eliminazione del Template selezionato, comporterà la
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
    </div>
  );
}
export default Template;
