import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import { Button } from "@material-ui/core";
import { Paper, Typography } from "@material-ui/core";
import "../styles/App.css";
import EditIcon from "@material-ui/icons/Edit";
import { NavLink } from "react-router-dom";
import VisibilityIcon from "@material-ui/icons/Visibility";
import acccessControl from "../service/url.js";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Divider from "@material-ui/core/Divider";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";

const GestioneRuoli = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");

  const bearer = `Bearer ${localStorage.getItem("token")}`;

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
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5%",
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
    bottone: {
      // display: "flex",
      // alignItems: "center",
      // justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
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
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
    },
    paperModale: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      width: "fit-content",
      height: "80%",
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
    paperContent: {
      marginTop: "2%",
      marginBottom: "2%",
    },
  }));

  const classes = useStyles();

  const columns = [
    {
      title: "Nome",
      field: "nome",
      defaultSort: "desc",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
  ];

  const getGruppi = () => {
    var myHeaders = new Headers();

    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/group`, requestOptions)
      .then((response) => response.json())
      .then((result) => setData(result.gruppi))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getGruppi();
  }, []);

  const aggiornaGruppo = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      gruppo: {
        id: id,
        nome: nome,
        descrizione: descrizione,
      },
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/group`, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        getGruppi();
      });

    // .catch((error) => console.log("error", error));
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    aggiornaGruppo();
    setOpen(false);
  };

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Gestione Gruppi"
        data={data}
        columns={columns}
        options={{
          // tableLayout: "",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          filtering: true,
          sorting: true,
        }}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
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

              fetch(`/api/group?id=` + oldData.id, requestOptions)
                .then((response) => {
                  if (response.status === 200) {
                    return response.json();
                  } else if (response.status === 400) {
                    return alert(
                      "Non può essere eliminato un gruppo associato a un utente esistente"
                    );
                  }
                })
                .then((result) => {
                  getGruppi();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
        }}
        actions={[
          {
            icon: (dat) => (
              //href="../amministrazione/viewgruppo"
              <a>
                <VisibilityIcon />
              </a>
            ),
            tooltip: "Visualizza",
            position: "row",
            onClick: (event, rowData) =>
              (window.location =
                "../amministrazione/viewgruppo?id=" + rowData.id),
          },
          {
            icon: () => (
              <div className={classes.buttonRight}>
                <Button
                  className="button-green"
                  component={NavLink}
                  activeClassName="button-green-active"
                  exact
                  to="/amministrazione/creagruppo"
                >
                  CREA GRUPPO
                </Button>
              </div>
            ),
            tooltip: "Load Test Suite",
            isFreeAction: true,
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Edit",
            onClick: (event, rowData) => handleOpen(rowData),

            position: "row",
          },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
        }}
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
                <ListItem button>
                  <Typography className={classes.intestazione} variant="h4">
                    Modifica Ruolo <b>{nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form>
                <Paper className={classes.paperContent} elevation={0}>
                  <Row className={classes.row}>
                    <Col className={classes.col}>
                      <TextField
                        className={classes.textField}
                        error={nome !== "" ? false : true}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        label="Nome"
                        defaultValue={nome}
                        helperText={nome !== "" ? "" : "Il Nome è richiesto"}
                      />
                    </Col>

                    <Col className={classes.col}>
                      <TextField
                        className={classes.textField}
                        error={descrizione !== "" ? false : true}
                        onChange={(e) => setDescrizione(e.target.value)}
                        required
                        label="Descrizione"
                        defaultValue="Inserisci descrizione"
                        helperText={
                          descrizione !== "" ? "" : "La descrizione è richiesta"
                        }
                      />
                    </Col>
                  </Row>
                </Paper>

                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleClose2}
                  />
                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleClose}
                    nome="Annulla"
                  />
                </div>
              </Form>
            </Paper>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default GestioneRuoli;
