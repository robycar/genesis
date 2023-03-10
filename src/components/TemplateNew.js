import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import FormControl from "@material-ui/core/FormControl";
import { Paper, Typography, Link } from "@material-ui/core";
import Select from "@material-ui/core/Select";
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
import Alert from "@material-ui/lab/Alert";
import SettingsIcon from "@material-ui/icons/Settings";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";
import acccessControl from "../service/url.js";
import fileDownload from "js-file-download";
import axios from "axios";
import {
  getGenerale,
  getByIdGenerale,
  postGenerale,
  postAddFile,
  postModificaFiles,
  deleteGenerale,
  deleteFiles,
} from "../service/api";
import { tableIcons } from "../components/Icons";

function Template() {
  var functions = localStorage.getItem("funzioni").split(",");

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
  const [caricamentoDel, setCaricamentoDel] = useState(false);
  const [appearFile, setAppearFile] = useState([]);
  const [appearFileNaturaChiamato, setAppearFileNaturaChiamato] = useState([]);
  const [appearFileNaturaChiamanti, setAppearFileNaturaChiamanti] = useState(
    []
  );
  const [chiamato, setChiamato] = useState();
  const [chiamanti, setChiamanti] = useState([]);
  const [chiamantiNatura, setChiamantiNatura] = useState([]);
  const [url, setUrl] = useState("");
  const [contenutoFile, setContenutoFile] = useState("");
  const [visualizzaContenutoFile, setVisualizzaContenutoFile] = useState(false);
  const [modificaContenutoFile, setModificaContenutoFile] = useState(false);
  const [scrittaTabella, setScrittaTabella] = useState("");
  const [tipoTemplate, setTipoTemplate] = useState("");
  const [naturaTemplateChiamato, setNaturaTemplateChiamato] = useState("");

  const funzioneGetAll = () => {
    if (functions.indexOf("template.view") !== -1) {
      //----GET ALL TEMPLATE----
      (async () => {
        setCaricamento(true);
        setData((await getGenerale("template")).list);
        setCaricamento(false);
      })();

      setScrittaTabella("Non ?? presente alcun dato da mostrare");
    } else {
      setScrittaTabella(
        "Non si dispone delle autorizzazioni per visualizzare i dati di questa tabella"
      );
    }
  };

  const funzioneGetTemplateById = (id) => {
    if (functions.indexOf("template.view") !== -1) {
      (async () => {
        let result = await getByIdGenerale("template", id);
        setTemplate(result.template);
        impostaChiama(result.template);
      })();
    }
  };

  const funzioneGetAppearFileById = (id) => {
    if (functions.indexOf("template.edit") !== -1) {
      (async () => {
        setCaricamentoDel(true);
        setAppearFile(
          (await getByIdGenerale("fs/entityfolder/TEMPLATE", id)).list
        );
        setCaricamentoDel(false);
      })();
    }
  };

  const funzioneGetAppearFileByIdNatura = (id) => {
    if (functions.indexOf("template.edit") !== -1) {
      (async () => {
        setCaricamentoDel(true);
        setAppearFileNaturaChiamato(
          (await getByIdGenerale("template", id)).template.fileLinks.CHIAMATO
        );
        setAppearFileNaturaChiamanti(
          (await getByIdGenerale("template", id)).template.fileLinks.CHIAMANTE
        );
      })();
    }
  };

  const funzioneAggiornaChiama = () => {
    if (functions.indexOf("template.edit") !== -1) {
      (async () => {
        await postGenerale("template", {
          id: id,
          version: version,
          fileLinks: { CHIAMATO: [{ id: chiamato }] },
        });
        funzioneGetTemplateById(id);
        handleCloseChiama();
      })();
    }
  };

  const funzioneAddFile = (files) => {
    if (functions.indexOf("template.view") !== -1) {
      (async () => {
        await postAddFile("fs/entityfolder/TEMPLATE", id, files);
        funzioneGetTemplateById(id);
        funzioneGetAppearFileById(id);
      })();
    }
  };

  const funzioneDeleteFile = (path) => {
    if (functions.indexOf("template.view") !== -1) {
      (async () => {
        setCaricamentoDel(true);
        await deleteFiles("fs/entityfolder/TEMPLATE", id, path);
        funzioneGetTemplateById(id);
        funzioneGetAppearFileById(id);
      })();
    }
  };

  const funzioneDelete = () => {
    if (functions.indexOf("template.delete") !== -1) {
      (async () => {
        let result = await deleteGenerale("template", idElemento);
        if (result.error !== null) {
          setOpenWarning(true);
          if (result.error.code === "TEST-0011") {
            setWarning(
              "Impossibile eliminare un template che non appartiene al proprio gruppo"
            );

            if (result.error.status === 500) {
              setWarning(
                "Impossibile eliminare il template poich?? associato ad uno o pi?? Test Case"
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
          funzioneGetAll();
          handleCloseDelete();
        }
      })();
    }
  };

  const funzioneLoadTemplateBYId = (id) => {
    if (functions.indexOf("template.view") !== -1) {
      (async () => {
        setTemplate((await getByIdGenerale("template", id)).template);
      })();
    }
  };

  const funzioneAggiornaTemplate = () => {
    if (functions.indexOf("template.edit") !== -1) {
      (async () => {
        await postGenerale("template", {
          id: id,
          version: version,
          nome: nome,
          durata: durata,
          typeTemplate: typeTemplate,
          descrizione: descrizione,
        });
        funzioneGetAll();
        handleClose();
      })();
    }
  };

  const funzioneGetDownloadFile = (url) => {
    if (functions.indexOf("template.edit") !== -1) {
      setCaricamentoDel(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`${url}`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          setContenutoFile(result);
          setVisualizzaContenutoFile(true);
          setCaricamentoDel(false);
        })
        .catch((error) => console.log("error", error));
    }
  };

  const funzioneModificaFiles = () => {
    if (functions.indexOf("template.edit") !== -1) {
      (async () => {
        await postModificaFiles(url, contenutoFile);
        handleCloseModificaContenutoFile();
      })();
    }
  };

  const handleChangeTipoTemplate = (e) => {
    setTipoTemplate(e.target.value);
  };

  useEffect(() => {
    funzioneGetAll();
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
      title: "Modificato da",
      field: "modifiedBy",
    },
    {
      title: "Creato da",
      field: "createdBy",
    },
  ];

  const columnsFile = [
    {
      title: "File",
      field: "path",
    },
    {
      title: "URL",
      field: "url",
      hidden: true,
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [modifica, setModifica] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);
  const [openChiama, setOpenChiama] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [path, setPath] = useState("");

  const handleOpen = (rowData) => {
    setId(rowData.id);
    funzioneGetTemplateById(rowData.id);
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
    funzioneGetAppearFileById(rowData.id);
    funzioneGetAppearFileByIdNatura(rowData.id);
    funzioneLoadTemplateBYId(rowData.id);
    setUrl(rowData.url);
    setOpen(true);
  };

  const impostaChiama = (templ) => {
    setChiamato(templ.fileLinks.CHIAMATO[0].id);

    var appoggio = [];

    if (templ.fileLinks.CHIAMANTE) {
      for (let i = 0; i < templ.fileLinks.CHIAMANTE.length; i++) {
        appoggio.push(templ.fileLinks.CHIAMANTE[i].id);
      }
    }
    setChiamanti(appoggio);
  };

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
    setOpenChiama(true);
  };
  const handleCloseChiama = () => {
    setOpenChiama(false);
  };

  //-------------------MODIFICA FILE-------------------------

  const handleOpenFile = () => {
    setOpenFile(true);
  };
  const handleCloseFile = () => {
    setOpenFile(false);
  };
  const changeHandler = (event) => {
    funzioneAddFile(event.target.files);
  };
  const handleSubmission = () => {};

  /*--------------MODALE VISUALIZZA CONTENUTO FILE -----------*/

  const handleOpenVisualizzaContenutoFile = (rowData) => {
    funzioneGetDownloadFile(rowData.url);
    setModificaContenutoFile(false);
    setPath(rowData.path);
  };

  const handleCloseVisualizzaContenutoFile = () => {
    setVisualizzaContenutoFile(false);
  };

  /*--------------MODALE MODIFICA CONTENUTO FILE -----------*/

  const handleOpenModificaContenutoFile = (rowData) => {
    funzioneGetDownloadFile(rowData.url);
    setModificaContenutoFile(true);
    setUrl(rowData.url);
    setPath(rowData.path);
  };

  const handleCloseModificaContenutoFile = () => {
    setVisualizzaContenutoFile(false);
  };

  /*--------------MODALE DELETE TEMPLATE -----------*/
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [warning, setWarning] = useState("");

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  //------------ FUNZIONE DELETE TEMPLATE------------
  //------------ funzione apri modale

  const handleOpenDelete = (rowData) => {
    setNome(rowData.nome);
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const downloadSingleFile = (folder) => {
    var config = {
      responseType: "blob",
      method: "get",
      url: folder.url,
      headers: {
        Authorization: bearer,
      },
    };

    axios(config)
      .then(function (response) {
        fileDownload(response.data, folder.path);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const aggiornaTemplate = () => {
    funzioneAggiornaTemplate();
  };

  ///////////////////////////////////////////////

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
      marginTop: "2%",
      flexDirection: "row",
      marginBottom: "3%",
    },
    icon: {
      transform: "scale(1.8)",
      color: "#47B881",
      marginTop: "9px",
    },
    bottone: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "4%",
      marginBottom: "2%",
    },
    bottoniModaleFile: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "4%",
      marginBottom: "2%",
    },
    bottoniModaleChiamanti: {
      display: "flex",
      justifyContent: "flex-end",
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
      width: 750,
      height: "fit-content",
      position: "relative",
    },
    paperModaleChiama: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      minHeight: "600px",
      height: "fit-content",
      width: "fit-content",
      minWidth: 750,
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
    paperModaleFile: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      minHeight: "300px",
      height: "fit-content",
      width: 650,
      position: "relative",
    },
    contenutoModale: {
      height: 370,
      overflowX: "hidden",
      padding: "2%",
    },

    col: {
      width: "110px",
      padding: "3%",
      height: "106px",
    },
    row: {
      width: "600px",
    },
    textField: {
      width: "270px",
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
    contenutoModaleChiama: {
      height: 350,
      overflowX: "hidden",
    },
    textArea: {
      width: 600,
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
        style={{ boxShadow: "none", maxWidth: "100%" }}
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
                  disabled={functions.indexOf("template.create") === -1}
                >
                  template
                </Button>
              </div>
            ),
            tooltip: "Crea Template",
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
            disabled: functions.indexOf("template.edit") === -1,
            position: "row",
          },
          {
            icon: () => <DeleteIcon />,
            tooltip: "Rimuovi Template",
            onClick: (event, rowData) => {
              handleOpenDelete(rowData);
              setIdElemento(rowData.id);
            },
            disabled: functions.indexOf("template.delete") === -1,
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
                <Row className={classes.row}>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={nome !== "" ? false : true}
                      onChange={(e) => setNome(e.target.value)}
                      label="Nome"
                      defaultValue={nome}
                      helperText={nome !== "" ? "" : "Il Nome ?? richiesto"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      onChange={(e) => {
                        e.target.value === ""
                          ? setDescrizione(" ")
                          : setDescrizione(e.target.value);
                      }}
                      label="Descrizione"
                      defaultValue={descrizione}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>
                </Row>
                <Row className={classes.row}>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={durata !== "" ? false : true}
                      onChange={(e) => setDurata(e.target.value)}
                      label="Durata"
                      defaultValue={durata}
                      helperText={durata !== "" ? "" : "La Durata ?? richiesta"}
                      InputProps={{
                        readOnly: modifica === false ? true : false,
                      }}
                    />
                  </Col>

                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Tipo Template"
                      defaultValue={typeTemplate}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>

                <Row className={classes.row}>
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
                  <Col className={classes.col}>
                    <TextField
                      label="Data Creazione"
                      defaultValue={creationDate
                        .replace("T", " / ")
                        .replace(".000+00:00", "")}
                      className={classes.textField}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>

                <Row className={classes.row}>
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
                      className={classes.textField}
                      label="Data Modifica"
                      defaultValue={modifiedDate
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
                    <ButtonClickedGreen
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      size="medium"
                      nome={modifica === false ? "vedi file" : "modifica File"}
                      onClick={handleOpenChiama}
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

      {/* ------------------------MODALE CHIAMATO/CHIAMANTI--------------------- */}
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
            <Paper className={classes.paperModaleChiama} elevation={1}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    {modifica === false ? "Visualizza " : "Modifica "}{" "}
                    Chiamato/Chiamanti <b>{nomeTitolo}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <div>
                <Form className={classes.contenutoModaleChiama}>
                  <Typography
                    style={{
                      color: "#47B881",
                      marginTop: "2%",
                      marginLeft: "16px",
                    }}
                    variant="h6"
                  >
                    Chiamato
                  </Typography>
                  <Row>
                    <Col className={classes.col}>
                      <TextField
                        className={classes.textField}
                        style={{ width: "300px" }}
                        select
                        label="File"
                        value={chiamato}
                        onChange={(e) => setChiamato(e.target.value)}
                        InputProps={{
                          readOnly: modifica === false ? true : false,
                        }}
                      >
                        {appearFile?.map((file) => (
                          <MenuItem
                            disabled={
                              chiamato === file.id ||
                              chiamanti[0] === file.id ||
                              chiamanti[1] === file.id ||
                              chiamanti[2] === file.id
                            }
                            key={file.id}
                            value={file.id}
                          >
                            {file.path}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Col>

                    <Col className={classes.col}>
                      <TextField
                        className={classes.textField}
                        style={{ width: "300px" }}
                        select
                        label="Natura Chiamato"
                        value={chiamato}
                        onChange={(e) => setChiamato(e.target.value)}
                        InputProps={{
                          readOnly: modifica === false ? true : false,
                        }}
                      >
                        {appearFileNaturaChiamato?.map((file) => (
                          <MenuItem
                            disabled={
                              chiamato === file.id ||
                              chiamanti[0] === file.id ||
                              chiamanti[1] === file.id ||
                              chiamanti[2] === file.id
                            }
                            key={file.id}
                            value={file.id}
                          >
                            {file.natura}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Col>
                  </Row>

                  {chiamanti.map((chiamante, index) => (
                    <div>
                      <Typography
                        style={{
                          color: "#47B881",
                          marginTop: "2%",
                          marginLeft: "16px",
                        }}
                        variant="h6"
                        variant="h6"
                      >
                        Chiamante <b>{index + 1}</b>
                      </Typography>
                      <Row>
                        <Col className={classes.col}>
                          <TextField
                            className={classes.textField}
                            style={{ width: "300px" }}
                            select
                            label="File"
                            value={chiamanti[index]}
                            onChange={(e) => {
                              var x = [...chiamanti];
                              x[index] = e.target.value;
                              setChiamanti(x);
                            }}
                            InputProps={{
                              readOnly: modifica === false ? true : false,
                            }}
                          >
                            {appearFile.map((file) => (
                              <MenuItem
                                disabled={
                                  chiamato === file.id ||
                                  chiamanti[0] === file.id ||
                                  chiamanti[1] === file.id ||
                                  chiamanti[2] === file.id
                                }
                                key={file.id}
                                value={file.id}
                              >
                                {file.path}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Col>

                        <Col className={classes.col}>
                          <TextField
                            className={classes.textField}
                            style={{ width: "300px" }}
                            select
                            label="Natura Chiamante "
                            value={chiamanti[index]}
                            onChange={(e) => {
                              var x = [...chiamanti];
                              x[index] = e.target.value;
                              setChiamanti(x);
                            }}
                            InputProps={{
                              readOnly: modifica === false ? true : false,
                            }}
                          >
                            {appearFileNaturaChiamanti.map((file) => (
                              <MenuItem
                                disabled={
                                  chiamato === file.id ||
                                  chiamanti[0] === file.id ||
                                  chiamanti[1] === file.id ||
                                  chiamanti[2] === file.id
                                }
                                key={file.id}
                                value={file.id}
                              >
                                {file.natura}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </Form>
              </div>

              <Divider className={classes.divider} />
              <div className={classes.bottoniModaleChiamanti}>
                {modifica === false ? null : (
                  <>
                    <ButtonClickedGreen
                      size="medium"
                      nome="File"
                      onClick={handleOpenFile}
                    />
                    <ButtonClickedGreen
                      size="medium"
                      nome="Aggiorna"
                      onClick={funzioneAggiornaChiama}
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
            <Paper className={classes.paperModaleFile} elevation={1}>
              <div>
                <Divider className={classes.divider} />
                <MaterialTable
                  icons={tableIcons}
                  title={
                    modifica === true ? "Modifica File" : "Visualizza File"
                  }
                  data={appearFile}
                  isLoading={caricamento}
                  columns={columnsFile}
                  isLoading={caricamentoDel}
                  options={{
                    sorting: true,
                    actionsColumnIndex: -1,
                    search: false,
                    pageSizeOptions: [
                      5,
                      10,
                      20,
                      { value: data?.length, label: "All" },
                    ],
                  }}
                  actions={[
                    {
                      icon: () => (
                        <a>
                          <DownloadIcon />
                        </a>
                      ),
                      tooltip: "Scarica il File",
                      position: "row",

                      onClick: (event, folder) => {
                        downloadSingleFile(folder);
                      },
                    },
                    {
                      icon: (dat) => (
                        <a>
                          <VisibilityIcon />
                        </a>
                      ),
                      tooltip: "Visualizza tutti i dati",
                      position: "row",
                      onClick: (event, rowData) => {
                        handleOpenVisualizzaContenutoFile(rowData);
                      },
                    },
                    {
                      icon: () => <EditIcon />,
                      tooltip: "Modifica il File",
                      onClick: (event, rowData) =>
                        handleOpenModificaContenutoFile(rowData),
                      position: "row",
                      hidden: modifica === false ? "true" : null,
                    },
                    (rowData) => ({
                      icon: () => <DeleteIcon />,
                      tooltip: "Elimina File",
                      onClick: (event, rowData) =>
                        funzioneDeleteFile(rowData.path),
                      disabled:
                        chiamato === rowData.id ||
                        chiamanti[0] === rowData.id ||
                        chiamanti[1] === rowData.id ||
                        chiamanti[2] === rowData.id,
                      hidden: modifica === false ? "true" : null,
                    }),
                  ]}
                />

                <Divider className={classes.divider} />
                <div className={classes.bottoniModaleFile}>
                  {modifica === true && (
                    <>
                      <input
                        style={{ display: "none" }}
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="file"
                        onChange={changeHandler}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          style={{ height: "36px", width: "87px" }}
                          variant="contained"
                          color="secondary"
                          component="span"
                          onClick={handleSubmission}
                        >
                          Carica
                        </Button>
                      </label>
                    </>
                  )}

                  <Button
                    style={{ marginLeft: "2%", height: "36px", width: "87px" }}
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={handleCloseFile}
                  >
                    Indietro
                  </Button>
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
                  L'eliminazione del Template selezionato, comporter?? la
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
      {/*------------------ MODALE VISUALIZZA / MODIFICA CONTENUTO FILE --------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={visualizzaContenutoFile}
        onClose={handleCloseVisualizzaContenutoFile}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visualizzaContenutoFile}>
          <div>
            <Paper className={classes.paperModale} elevation={1}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    {modificaContenutoFile === false
                      ? "Visualizza "
                      : "Modifica "}{" "}
                    Template <b>{path}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Row className={classes.rowContent}>
                  <Col className={classes.col}>
                    <TextField
                      multiline
                      rows={15}
                      className={classes.textArea}
                      value={contenutoFile}
                      onChange={(e) => setContenutoFile(e.target.value)}
                      label=""
                      InputProps={{
                        readOnly:
                          modificaContenutoFile === false ? true : false,
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
                  {modificaContenutoFile === false ? (
                    ""
                  ) : (
                    <ButtonClickedGreen
                      size="medium"
                      nome="Aggiorna"
                      onClick={funzioneModificaFiles}
                    />
                  )}

                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseVisualizzaContenutoFile}
                    size="medium"
                    nome={
                      modificaContenutoFile === false ? "Indietro" : "Annulla"
                    }
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
