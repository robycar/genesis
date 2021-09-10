import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import "../styles/App.css";
import {
  MenuItem,
  Button,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import acccessControl from "../service/url.js";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";

function LineeGeneratore() {

  const [data, setData] = useState([]);
  const [appearLine, setAppearLine] = useState([]);
  const [modifiedBy, setModifiedBy] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [id, setId] = useState();
  const [numero, setNumero] = useState("");
  let ip;
  const [ip1, setIp1] = useState("");
  const [ip2, setIp2] = useState("");
  const [ip3, setIp3] = useState("");
  const [ip4, setIp4] = useState("");
  const [porta, setPorta] = useState();
  const [password, setPassword] = useState("");
  const [typeLinea, setTypeLinea] = useState();

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  /*----Get Type Linea ------*/

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

    fetch(`/api/typeLinea`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearLine(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  // -------get linea-----------

  const getLineaGeneratore = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/lineageneratore`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getLineaGeneratore();
    getAppearLine();
  }, []);

  //---------------------AGGIORNA UTENTE-------------------------

  const aggiornaLineaGeneratore = () => {
    ip = ip1 + "." + ip2 + "." + ip3 + "." + ip4;

    const invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        id: id,
        version: 1,
        ip: ip,
        porta: porta,
        typeLinea: {
          id: typeLinea,
        }
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/lineageratore`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          getLineaGeneratore();
        })
        .catch((error) => console.log("error", error));
    };
    if (ip !== "") invia();
  };

  const columns = [
    { title: "ID Linea", field: "id", defaultSort: "desc" },
    {
      title: "Path Csv",
      field: "pathCsv",
    },
    {
      title: "IP Linea",
      field: "ip",
    },
    // {
    //   title: "Numero",
    //   field: "numero",
    // },{
    //   title: "Password",
    //   field: "password",
    // },

    {
      title: "Porta",
      field: "porta",
    },
    {
      title: "Tipo Linea",
      field: "typeLinea.descrizione",
    },
    {
      title: "Creato da",
      field: "createdBy",
    },
    {
      title: "Modificato da",
      field: "modifiedBy",
    },
  ];

  const [open, setOpen] = React.useState(false);
  const [idElemento, setIdElemento] = React.useState(0);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setNumero(rowData.numero);
    setCreatedBy(rowData.createdBy);
    setModifiedBy(rowData.modifiedBy);

    var ipAppoggio = rowData.ip;
    ipAppoggio = ipAppoggio.split(".");
    setIp1(ipAppoggio[0].replace(".", ""));
    setIp2(ipAppoggio[1].replace(".", ""));
    setIp3(ipAppoggio[2].replace(".", ""));
    setIp4(ipAppoggio[3]);
    setPorta(rowData.porta);
    setPassword(rowData.password);
    setTypeLinea(rowData.typeLinea.id);
    setOpen(true);
  };

  const handleClose2 = () => {
    aggiornaLineaGeneratore();
    setOpen(false);
  };
  const handleClose = () => {
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

    fetch(`/api/lineageneratore`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        getLineaGeneratore();
      })
      .catch((error) => console.log("error", error));
    handleCloseDelete();
  };

  //------------ funzione apri modale

  const handleOpenDelete = (rowData) => {
    setNumero(rowData.numero);
    setOpenDelete(true);
  };

  //---------- funzione chiudi modale
  const handleCloseDelete = () => {
   
    setOpenDelete(false);
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
    bottoni: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      marginLeft: "55px",
      marginTop: "4%",
      marginBottom: "2%",
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
      padding: "4%",
      width: "fit-content",
      height: "80%",
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
    col: {
      padding: "5%",
    },
    row: {
      width: "600px",
    },
    textField: {
      width: "200px",
    },
    bottone: {
      marginLeft: "55px",
      marginTop: "5%",
      // marginBottom: "2%",
    },
    bottoneAnnulla: {
      width: "128px",
    },
    divIp: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      marginLeft: "5%",
    },
    separatoreIp: {
      marginRight: "2%",
      marginLeft: "2%",
      // marginBottom: "2%",
      fontWeight: "600px",
      lineHeigth: "2%",
      //fontSize: "2px",
    },
    textFieldIp: {
      width: "80px",
    },
    paperContent: {
      marginTop: "1%",
      marginBottom: "1%",
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Lines"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          exportButton: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          // selection: true,
          // columnsButton: true,
          filtering: true,
        }}
        
        actions={[
          {
            icon: () => (
              <Button
                className="button-green"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="/editing/linee/crealineageneratore"
                startIcon={<AddIcon />}
              >
                LINEA GENERATORE{" "}
              </Button>
            ),
            tooltip: "Crea Linea",
            // onClick: (event, rowData) => alert("Load Test Suite"),
            isFreeAction: true,
          },
          {
            icon: () => <EditIcon />,
            tooltip: "Edit",
            onClick: (event, rowData) => handleOpen(rowData),

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
          <Paper className={classes.paperModale} elevation={1}>
            <div>
              <ListItem button>
                <Typography className={classes.intestazione} variant="h4">
                  Modifica la <b>Linea {id}</b>
                </Typography>
              </ListItem>
              <Divider className={classes.divider} />
            </div>

            <Paper className={classes.paperContent} elevation={0}>
              <Row className={classes.row}>
                {/* NUMERO */}
                {/* <Col className={classes.col}>
                  <TextField
                    type="number"
                    className={classes.textField}
                    error={numero !== "" ? false : true}
                    onChange={(e) => setNumero(e.target.value)}
                    required
                    label="Numero"
                    defaultValue={numero}
                    helperText={numero !== "" ? "" : "Il Numero è richiesto"}
                  />
                </Col> */}

                <Col className={classes.col}>
                  <TextField
                    error={
                      porta !== "" && porta > 1000 && porta < 100000
                        ? false
                        : true
                    }
                    onChange={(e) => setPorta(e.target.value)}
                    label="Porta"
                    type="number"
                    required
                    defaultValue={porta}
                    helperText={
                      porta !== "" && porta > 1000 && porta < 100000
                        ? ""
                        : "La Porta deve essere compresa tra 4 e 5 digit"
                    }
                  />
                </Col>
              </Row>

              {/* <Row className={classes.row}> */}
              <div className={classes.divIp}>
                <TextField
                  className={classes.textFieldIp}
                  error={
                    ip1 <= 255 && ip1 !== "" && ip1.length < 4 ? false : true
                  }
                  onChange={(e) => setIp1(e.target.value)}
                  label="Ip1 Linea"
                  type="number"
                  required
                  defaultValue={ip1}
                  helperText={
                    ip1 <= 255 && ip1 !== "" && ip1.length < 4
                      ? ""
                      : "IP richiesto e compreso tra 0 e 255"
                  }
                />
                <Typography className={classes.separatoreIp}>.</Typography>

                <TextField
                  className={classes.textFieldIp}
                  error={
                    ip2 <= 255 && ip2 !== "" && ip2.length < 4 ? false : true
                  }
                  onChange={(e) => setIp2(e.target.value)}
                  label="Ip2 Linea"
                  type="number"
                  required
                  defaultValue={ip2}
                  helperText={
                    ip2 <= 255 && ip2 !== "" && ip2.length < 4
                      ? ""
                      : "IP richiesto e compreso tra 0 e 255"
                  }
                />
                <Typography className={classes.separatoreIp}>.</Typography>

                <TextField
                  className={classes.textFieldIp}
                  error={
                    ip3 <= 255 && ip3 !== "" && ip3.length < 4 ? false : true
                  }
                  onChange={(e) => setIp3(e.target.value)}
                  label="Ip3 Linea"
                  type="number"
                  required
                  defaultValue={ip3}
                  helperText={
                    ip3 <= 255 && ip3 !== "" && ip3.length < 4
                      ? ""
                      : "IP richiesto e compreso tra 0 e 255"
                  }
                />
                <Typography className={classes.separatoreIp}>.</Typography>

                <TextField
                  className={classes.textFieldIp}
                  error={
                    ip4 <= 255 && ip4 !== "" && ip4.length < 4 ? false : true
                  }
                  onChange={(e) => setIp4(e.target.value)}
                  label="Ip4 Linea"
                  type="number"
                  required
                  defaultValue={ip4}
                  helperText={
                    ip4 <= 255 && ip4 !== "" && ip4.length < 4
                      ? ""
                      : "IP richiesto e compreso tra 0 e 255"
                  }
                />
              </div>
              {/* </Row>  */}

              <Row className={classes.row}>
                {/* PASSWORD */}
                {/* <Col className={classes.col}>
                  <TextField
                    error={password !== "" ? false : true}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    required
                    defaultValue={password}
                    helperText={
                      password !== "" ? "" : "La Password è richiesta"
                    }
                  />
                </Col> */}

                <Col className={classes.col}>
                  <TextField
                    select
                    label="Tipo Linea"
                    value={appearLine.id}
                    defaultValue={typeLinea}
                    onChange={(e) => setTypeLinea(e.target.value)}
                  >
                    {appearLine.map((typeLinea) => (
                      <MenuItem key={typeLinea.id} value={typeLinea.id}>
                        {typeLinea.descrizione}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>
              </Row>

              <Divider className={classes.divider} />
              <div
                className={classes.bottone}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {ip1 <= 255 &&
                ip1 !== "" &&
                ip1.length < 4 &&
                ip2 <= 255 &&
                ip2 !== "" &&
                ip2.length < 4 &&
                ip3 <= 255 &&
                ip3 !== "" &&
                ip3.length < 4 &&
                ip4 <= 255 &&
                ip4 !== "" &&
                ip4.length < 4 &&
                password !== "" &&
                numero !== "" &&
                porta !== "" &&
                porta > 1000 &&
                porta < 100000 ? (
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleClose2}
                    // disabled={handleBtn}
                  />
                ) : (
                  <ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleClose2}
                    disabled="true"
                  />
                )}

                <ButtonNotClickedGreen
                  className={classes.bottoneAnnulla}
                  onClick={handleClose}
                  nome="Annulla"
                />
              </div>
            </Paper>
          </Paper>
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
                    Elimina Linea N° <b>{numero}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />

                <Typography  className={classes.typography}>
                  L'eliminazione della Linea selezionata, comporterà la
                  cancellazione del Test Generatore ad essa collegato.
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
export default LineeGeneratore;
