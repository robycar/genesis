import React, { useEffect, useState } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import ButtonClickeGreen from "./ButtonClickedGreen";
import "../styles/App.css";
import { MenuItem, Button, Paper, Typography, Select } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import acccessControl from "../service/url.js";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Divider } from "@material-ui/core";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { CheckBox } from "@material-ui/icons";

function Obp() {
  const [data, setData] = useState([]);
  const [appearLine, setAppearLine] = useState([]);

  const [id, setId] = useState();
  const [numero, setNumero] = useState("");
  let ipDestinazione;
  const [ip1, setIp1] = useState("");
  const [ip2, setIp2] = useState("");
  const [ip3, setIp3] = useState("");
  const [ip4, setIp4] = useState("");
  const [porta, setPorta] = useState();
  const [descrizione, setDescrizione] = useState("");
  const [typeLinea, setTypeLinea] = useState([]);

  console.log(appearLine.id);

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

  const aggiornaUtente = () => {
    ipDestinazione = ip1 + "." + ip2 + "." + ip3 + "." + ip4;

    const invia = () => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", bearer);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Access-Control-Allow-Origin", acccessControl);
      myHeaders.append("Access-Control-Allow-Credentials", "true");

      var raw = JSON.stringify({
        id: id,
        ipDestinazione: ipDestinazione,
        descrizione: descrizione,
        porta: porta === "" ? 5060 : porta,

        // typeLinea: {
        //   id: typeLinea.id,
        // },

        typeLinee: typeLinea,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`/api/obp`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          getObp();
        })
        .catch((error) => console.log("error", error));
    };
    if (ipDestinazione != "") invia();
  };

  const columns = [
    { title: "ID OBP", field: "id", defaultSort:"desc" },
    {
      title: "Proxy IP Address",
      field: "ipDestinazione",
    },
    {
      title: "Tipo Linea",
      field: "typeLinee[0].descrizione",
    },
    {
      title: "Porta",
      field: "porta",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
    {
      title: "Creato da",
      field: "creato",
    },
    {
      title: "Modificato da",
      field: "modificato",
    },
  ];

  const bearer = `Bearer ${localStorage.getItem("token").replace(/"/g, "")}`;

  useEffect(() => {
    getObp();
    getAppearLine();
  }, []);

  const getObp = () => {
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
        console.log(result);
        setData(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const [open, setOpen] = React.useState(false);

  const handleOpen = (rowData) => {
    console.log(rowData);
    setId(rowData.id);

    var ipAppoggio = rowData.ipDestinazione;
    ipAppoggio = ipAppoggio.split(".");
    setIp1(ipAppoggio[0].replace(".", ""));
    setIp2(ipAppoggio[1].replace(".", ""));
    setIp3(ipAppoggio[2].replace(".", ""));
    setIp4(ipAppoggio[3]);

    setPorta(rowData.porta);
    setDescrizione(rowData.descrizione);
    setTypeLinea([...typeLinea, rowData.typeLinee[0].id]);
    setOpen(true);
    console.log(typeLinea, "type");
  };

  const handleChange = (event) => {
    // if (typeLinea.length < 2) {
    //   setTypeLinea([event.target.value]);
    // } else {
    //   setTypeLinea([...typeLinea, event.target.value]);
    //   [...typeLinea, event.target.value];
    // }
    // console.log(typeLinea, "typeLineaId");

    setTypeLinea(event.target.value);
  };

  const handleRenderValue = (selected) => {
    selected.join(", ");
  };

  const handleClose2 = () => {
    aggiornaUtente();
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
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
      marginTop: "5%",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-end",
      marginLeft: "4%",
      marginBottom: "4",
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
        title="Outbound Proxy"
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
        }}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              //Backend call
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

              fetch(`/api/obp`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  getObp();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
        }}
        actions={[
          {
            icon: () => (
              <Button
                className="button-green"
                component={NavLink}
                activeClassName="button-green-active"
                exact
                to="/editing/outboundproxy/creaobp"
                startIcon={<AddIcon />}
              >
                Outbound Proxy{" "}
              </Button>
            ),
            tooltip: "Crea Obp",
            // onClick: (event, rowData) => alert("Load Test Suite"),
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
          <Paper className={classes.paperModale} elevation={1}>
            <div>
              <ListItem button>
                <Typography className={classes.intestazione} variant="h4">
                  Modifica l'<b>OBP nÂ°{id}</b>
                </Typography>
              </ListItem>
              <Divider className={classes.divider} />
            </div>

            <Paper className={classes.paperContent} elevation={0}>
              <div className={classes.divIp}>
                <TextField
                  className={classes.textFieldIp}
                  error={
                    ip1 <= 255 && ip1 != "" && ip1.length < 4 ? false : true
                  }
                  onChange={(e) => setIp1(e.target.value)}
                  label="Ip1 Linea"
                  type="number"
                  required
                  defaultValue={ip1}
                  helperText={
                    ip1 <= 255 && ip1 != "" && ip1.length < 4
                      ? ""
                      : "IP richiesto e compreso tra 0 e 255"
                  }
                />
                <Typography className={classes.separatoreIp}>.</Typography>

                <TextField
                  className={classes.textFieldIp}
                  error={
                    ip2 <= 255 && ip2 != "" && ip2.length < 4 ? false : true
                  }
                  onChange={(e) => setIp2(e.target.value)}
                  label="Ip2 Linea"
                  type="number"
                  required
                  defaultValue={ip2}
                  helperText={
                    ip2 <= 255 && ip2 != "" && ip2.length < 4
                      ? ""
                      : "IP richiesto e compreso tra 0 e 255"
                  }
                />
                <Typography className={classes.separatoreIp}>.</Typography>

                <TextField
                  className={classes.textFieldIp}
                  error={
                    ip3 <= 255 && ip3 != "" && ip3.length < 4 ? false : true
                  }
                  onChange={(e) => setIp3(e.target.value)}
                  label="Ip3 Linea"
                  type="number"
                  required
                  defaultValue={ip3}
                  helperText={
                    ip3 <= 255 && ip3 != "" && ip3.length < 4
                      ? ""
                      : "IP richiesto e compreso tra 0 e 255"
                  }
                />
                <Typography className={classes.separatoreIp}>.</Typography>

                <TextField
                  className={classes.textFieldIp}
                  error={
                    ip4 <= 255 && ip4 != "" && ip4.length < 4 ? false : true
                  }
                  onChange={(e) => setIp4(e.target.value)}
                  label="Ip4 Linea"
                  type="number"
                  required
                  defaultValue={ip4}
                  helperText={
                    ip4 <= 255 && ip4 != "" && ip4.length < 4
                      ? ""
                      : "IP richiesto e compreso tra 0 e 255"
                  }
                />
              </div>

              <Row className={classes.row}>
                <Col className={classes.col}>
                  <TextField
                    SelectProps={{
                      multiple: true,
                      onChange: handleChange,
                      // renderValue: (selected) => {
                      //   selected.join(", ");
                      // },
                    }}
                    select
                    label="Tipo Linea"
                    value={appearLine.id}
                    defaultValue={typeLinea}
                    // renderValue={(selected) => {
                    //   selected.join(", ");
                    // }}
                    onChange={(e) => {
                      setTypeLinea(e.target.value);

                      console.log(typeLinea);
                    }}
                    // onChange={handleChange}
                  >
                    {appearLine.map((linea) => (
                      <MenuItem key={linea.id} value={linea.id}>
                        {/* <Checkbox checked={typeLinea.indexOf(linea.id) > -1} /> */}

                        {linea.descrizione}

                        {/* <ListItemText primary={linea.descrizione} /> */}
                      </MenuItem>
                    ))}
                  </TextField>
                </Col>

                <Col className={classes.col}>
                  <TextField
                    error={
                      porta === "" || (porta > 1000 && porta < 100000)
                        ? false
                        : true
                    }
                    onChange={(e) => setPorta(e.target.value)}
                    placeholder="5060"
                    label="Porta"
                    type="number"
                    required
                    defaultValue={porta}
                    helperText={
                      porta === "" || (porta > 1000 && porta < 100000)
                        ? ""
                        : "Porta compresa tra i 4 e i 5 digit"
                    }
                  />
                </Col>
              </Row>

              <Row className={classes.row}>
                <Col className={classes.col}>
                  <TextField
                    error={descrizione != "" ? false : true}
                    onChange={(e) => setDescrizione(e.target.value)}
                    label="descrizione"
                    required
                    defaultValue={descrizione}
                    helperText={
                      descrizione != "" ? "" : "La descrizione Ã¨ richiesta"
                    }
                  />
                </Col>
              </Row>
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
            </Paper>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}
export default Obp;
