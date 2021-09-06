import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";
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
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";
import acccessControl from "../service/url.js";

function Template() {
  const [data, setData] = useState([]);

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  const [id, setId] = useState();
  const [versione, setVersione] = useState();
  const [nome, setNome] = useState();
  const [durata, setDurata] = useState();
  const [creatoDa, setCreatoDa] = useState("");
  const [modificatoDa, setModificatoDa] = useState("");
  const [dataModifica, setDataModifica] = useState("");
  const [dataCreazione, setDataCreazione] = useState("");
  const [tipoTemplate, setTipoTemplate] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [nomeTitolo, setNomeTitolo] = useState("");

  //----- GET TEMPLATE -------

  const getTemplate = () => {
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
        console.log(result);
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

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
    {
      title: "Versione",
      field: "version",
    },
    {
      title: "Tipo",
      field: "typeTemplate",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
    {
      title: "Durata",
      field: "durata",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [modifica, setModifica] = React.useState(false);

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setNomeTitolo(rowData.nome);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersione(rowData.version);
    setDurata(rowData.durata);
    setCreatoDa(rowData.createdBy);
    setModificatoDa(rowData.modifiedBy);
    setDataCreazione(rowData.creationDate);
    setDataModifica(rowData.modifiedDate);
    setTipoTemplate(rowData.typeTemplate);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getTemplate();
  }, []);

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
    contenutoModale: {
      height: 370,
      overflowX: "hidden",
    },
    buttonModale: {
      bottom: 0,
    },
    col: {
      padding: "5%",
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
  }));

  const classes = useStyles();

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Template"
        data={data}
        columns={columns}
        options={{
          sorting: true,
          actionsColumnIndex: -1,
          search: true,
          exportButton: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          filtering: true,
          headerStyle: {
            backgroundColor: "#f50057",
          },
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              //Backend call
              var myHeaders = new Headers();
              myHeaders.append("Authorization", bearer);
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Access-Control-Allow-Origin", acccessControl);
              myHeaders.append("Access-Control-Allow-Credentials", "true");

              var raw = JSON.stringify({
                id: id,
                version: versione,
                nome: nome,
                durata: durata,
                createdBy: creatoDa,
                modifiedBy: modificatoDa,
                modifiedDate: dataModifica,
                creationDate: dataCreazione,
                typeTemplate: tipoTemplate,
                descrizione: descrizione,
                // folder: newData.folder,
                // fileLinks: {},
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
                  console.log(response);
                  getTemplate();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
          isDeletable: (row) => false,
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              //backend call
              var myHeaders = new Headers();
              myHeaders.append("Authorization", bearer);
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Access-Control-Allow-Origin", acccessControl);
              myHeaders.append("Access-Control-Allow-Credentials", "true");

              var raw = JSON.stringify({
                id: oldData.id,
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
                  getTemplate();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
        }}
        actions={[
          // {
          //   icon: () => (
          //     <Button
          //       color="secondary"
          //       size="medium"
          //       variant="contained"
          //       className="button-red"
          //       component={NavLink}
          //       activeClassName="button-red-active"
          //       exact
          //       to="/editing/template/carica"
          //     >
          //       CARICA{" "}
          //     </Button>
          //   ),
          //   tooltip: "Carica Template",
          //   // onClick: (event, rowData) => alert("Load Test Suite"),
          //   isFreeAction: true,
          // },
          {
            icon: () => (
              <Button
                color="secondary"
                size="medium"
                variant="contained"
                className="button-red"
                component={NavLink}
                activeClassName="button-red-active"
                exact
                to="/editing/template/createmplate"
              >
                CREA{" "}
              </Button>
            ),
            tooltip: "Crea Template",
            // onClick: (event, rowData) => alert("Load Test Suite"),
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
            onClick: (event, rowData) => handleOpen(rowData),
          },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
        }}
        // options={{
        //   headerStyle: {
        //     backgroundColor: "#f50057",
        //   },
        // }}
      />

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
                      error={versione !== "" ? false : true}
                      onChange={(e) => setVersione(e.target.value)}
                      label="Versione"
                      defaultValue={versione}
                      helperText={versione !== "" ? "" : "Inserire versione"}
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
                </Row>
                {/* <Row>
                  <Col className={classes.col}>
                    <ButtonClickedGreen
                      size="medium"
                      nome={
                        modifica === false
                          ? "vedi chiamato"
                          : "modifica chiamato"
                      }
                      // onClick={handleOpenChiamato}
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
                      // onClick={handleOpenChiamanti}
                    />
                  </Col>
                </Row> */}
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Creato Da"
                      defaultValue={creatoDa}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Modificato Da"
                      defaultValue={modificatoDa}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      label="Data Creazione"
                      type="datetime-local"
                      defaultValue={dataCreazione.replace(".000+00:00", "")}
                      className={classes.textField}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Data Modifica"
                      type="datetime-local"
                      defaultValue={dataModifica.replace(".000+00:00", "")}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <Link href="#" variant="body2">
                      Download files
                    </Link>
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
                      // onClick={handleClose2}
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
    </div>
  );
}
export default Template;
