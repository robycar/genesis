import React, { useState, useEffect } from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import ButtonClickeGreen from "./ButtonClickedGreen";
import "../styles/App.css";
import { Button, Paper, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import ModalDescriptionTestCase from "./ModalDescriptionTestCase";
import acccessControl from "../service/url.js";
import Divider from "@material-ui/core/Divider";
import { MenuItem } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
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

function TestCaseTable() {

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const [data, setData] = useState([]);
  const [testCase, setTestCase] = useState([]);

  const [id, setId] = useState();
  const [nomeTitolo, setNomeTitolo] = useState("");
  const [nome, setNome] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [versione, setVersione] = useState();
  const [durata, setDurata] = useState();
  const [creatoDa, setCreatoDa] = useState("");
  const [modificatoDa, setModificatoDa] = useState("");
  const [dataCreazione, setDataCreazione] = useState("");
  const [dataModifica, setDataModifica] = useState("");
  const [chiamato, setchiamato] = useState([]);
  const [chiamante, setchiamante] = useState([]);
  const [chiamanti, setChiamanti] = useState([]);
  const [template, setTemplate] = useState([]);



  //-----------GET USER----------------------
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
        setOpen(true);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestCase();
  }, []);

  const columns = [
    {
      title: "ID",
      field: "id",
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
      title: "Versione",
      field: "version",
    },
    {
      title: "Durata",
      field: "expectedDuration",
    }
  ];

  const [open, setOpen] = React.useState(false);
  const [modifica, setModifica] = React.useState(false);
  const [openChiamato, setOpenChiamato] = React.useState(false);
  const [openChiamante, setOpenChiamante] = React.useState(false);

  const openModifica = (rowData) =>{
    setModifica(true);
    handleOpen(rowData)
  }
  const openVisualizza = (rowData) =>{
    setModifica(false)
    handleOpen(rowData)
  }

  const handleOpen = (rowData) => {
    setId(rowData.id);
    setNomeTitolo(rowData.nome);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersione(rowData.version);
    setDurata(rowData.expectedDuration);
    setCreatoDa(rowData.createdBy);
    setModificatoDa(rowData.modifiedBy);
    setDataCreazione(rowData.creationDate);
    setDataModifica(rowData.modifiedDate);
    getTestCaseById(rowData.id)


  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    //aggiornaUtente();
    setOpen(false);
  };
  //-----------MODALE CHIAMATO------------------
  const handleOpenChiamato = () => {
    var appoggioChiamato;
    appoggioChiamato = Object.values(testCase.chiamato)
    for (let i = 0; i < appoggioChiamato.length; i++) {
      chiamato.push(appoggioChiamato[i].id)

    }
    console.log(chiamato)
    setOpenChiamato(true);
  };

  const handleCloseChiamato = () => {
    setOpenChiamato(false);
  };

  const handleCloseChiamato2 = () => {
    //aggiornaUtente();
    setOpenChiamato(false);
  };
  //---------MODALE CHIAMANTE--------------------
  const handleOpenChiamante = () => {
    var appoggioChiamante;
    appoggioChiamante = testCase.chiamanti

    for (let i = 0; i < appoggioChiamante.length; i++) {
      chiamante[i]=[0, 0, 0, 0]
    }
    for (let i = 0; i < appoggioChiamante.length; i++) {
      chiamante[i][0] = appoggioChiamante[i]["proxy"].id
      chiamante[i][1] = appoggioChiamante[i]["linea"].id
      chiamante[i][2] = appoggioChiamante[i]["file"].id
      chiamante[i][3] = i
    }
    console.log(chiamante)
    setOpenChiamante(true);
  };

  const handleCloseChiamante = () => {
    setOpenChiamante(false);
  };

  const handleCloseChiamante2 = () => {
    //aggiornaUtente();
    setOpenChiamante(false);
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
      position: "relative"
    },
    contenutoModale: {
      height: 370,
      overflowX: "hidden"
    },
    buttonModale: {
      bottom: 0
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
        title="Test Case"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          filtering: true,
          searchFieldAlignment: "left",
          pageSizeOptions: [5, 10, 20, { value: data.length, label: "All" }],
        }}
        actions={[
          // {
          //   icon: () => (
          //     <div className={classes.buttonRight}>
          //       <Button
          //         className="button-green"
          //         component={NavLink}
          //         activeClassName="button-green-active"
          //         exact
          //         to="/amministrazione/addutente"
          //       >
          //         CREA UTENTE
          //       </Button>
          //     </div>
          //   ),
          //   tooltip: "Load Test Suite",
          //   //onClick: () => funzioneFor(),
          //   isFreeAction: true,
          // },
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
        ]}
        localization={{
          header: {
            actions: "Actions",
          },
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

              fetch(`/api/user` + "?id=" + oldData.id, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  getAllTestCase();
                  resolve();
                })
                .catch((error) => console.log("error", error));
            }),
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
                <ListItem >
                  <Typography className={classes.intestazione} variant="h4">
                    Modifica TestCase <b>{nomeTitolo}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Row >
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={nome != "" ? false : true}
                      onChange={(e) => setNome(e.target.value)}
                      label="Nome"
                      defaultValue={nome}
                      helperText={nome != "" ? "" : "Il Nome è richiesto"}
                      InputProps={{
                        readOnly: modifica===false ?true:false,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={versione != "" ? false : true}
                      onChange={(e) => setVersione(e.target.value)}
                      label="Versione"
                      defaultValue={versione}
                      helperText={versione != "" ? "" : "Il Cognome è richiesto"}
                      InputProps={{
                        readOnly: modifica===false ?true:false,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={descrizione != "" ? false : true}
                      onChange={(e) => setDescrizione(e.target.value)}
                      label="Descrizione"
                      defaultValue={descrizione}
                      helperText={descrizione != "" ? "" : "Il Cognome è richiesto"}
                      InputProps={{
                        readOnly: modifica===false ?true:false,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={durata != "" ? false : true}
                      onChange={(e) => setDurata(e.target.value)}
                      label="Durata"
                      defaultValue={durata}
                      helperText={durata != "" ? "" : "La Durata è richiesta"}
                      InputProps={{
                        readOnly: modifica===false ?true:false,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <ButtonClickedGreen
                      size="medium"
                      nome={ modifica===false ?"vedi chiamato":"modifica chiamato"}
                      onClick={handleOpenChiamato}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <ButtonClickedGreen
                      size="medium"
                      nome={ modifica===false ?"vedi chiamanti":"modifica chiamanti"}
                      onClick={handleOpenChiamante}
                    />
                  </Col>
                </Row>
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
                      defaultValue={dataModifica}
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
                 { modifica===false ? "":<ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleClose2}
                  />}
                  
                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleClose}
                    size="medium"
                    nome={ modifica===false ?"Indietro":"Annulla"}
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
            <Paper className={classes.paperModale} >
              <div>
                <ListItem >
                  <Typography className={classes.intestazione} variant="h4">
                    Modifica Chiamato <b>{nomeTitolo}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>

                <Row >
                  {chiamato.forEach(element => {
                    <TextField className={classes.textField} label="prova" />

                  })}

                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      // select
                      // onChange={(e) => setNome(e.target.value)}

                      label="Linea/e N°"
                      defaultValue={chiamato[1]}
                      InputProps={{
                        readOnly: modifica===false ?true:false,
                      }}
                    />
                    {/* {appearGroup.map((gruppo) => (
                      <MenuItem key={gruppo.id} value={gruppo.id}>
                        {gruppo.nome}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      // select
                      // onChange={(e) => setNome(e.target.value)}
                      label="Proxy N°"
                      defaultValue={chiamato[0]}
                      InputProps={{
                        readOnly: modifica===false ?true:false,
                      }}
                    />
                    {/* {appearGroup.map((gruppo) => (
                      <MenuItem key={gruppo.id} value={gruppo.id}>
                        {gruppo.nome}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  </Col>
                </Row>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      // select
                      // onChange={(e) => setNome(e.target.value)}
                      label="File N°"
                      defaultValue={chiamato[2]}
                      InputProps={{
                        readOnly: modifica===false ?true:false,
                      }}
                    />
                    {/* {appearGroup.map((gruppo) => (
                      <MenuItem key={gruppo.id} value={gruppo.id}>
                        {gruppo.nome}
                      </MenuItem>
                    ))}
                  </TextField> */}
                  </Col>
                </Row>
              </Form>
              <div className={classes.buttonModale}>
                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  { modifica===false ? "":<ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleCloseChiamato2}
                  />}
                  
                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseChiamato}
                    size="medium"
                    nome={ modifica===false ?"Indietro":"Annulla"}
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
        open={openChiamante}
        onClose={handleCloseChiamante}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openChiamante}>
          <div>
            <Paper className={classes.paperModale} elevation={1}>
              <div>
                <ListItem >
                  <Typography className={classes.intestazione} variant="h4">
                    Modifica Chiamanti <b>{nomeTitolo}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                {chiamante.map((chiamante) => (
                  <>
                    <Typography className={classes.intestazione} variant="h6">
                      Chiamante <b>{chiamante[3] + 1}</b>
                    </Typography>
                    <Row >
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          // select
                          // onChange={(e) => setNome(e.target.value)}
                          label="Linea N°"
                          defaultValue={chiamante[1]}
                          InputProps={{
                            readOnly: modifica===false ?true:false,
                          }}
                        />
                        {/* {appearGroup.map((gruppo) => (
                      <MenuItem key={gruppo.id} value={gruppo.id}>
                        {gruppo.nome}
                      </MenuItem>
                    ))}
                  </TextField> */}
                      </Col>
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          // select
                          // onChange={(e) => setNome(e.target.value)}
                          label="Proxy N°"
                          defaultValue={chiamante[0]}
                          InputProps={{
                            readOnly: modifica===false ?true:false,
                          }}
                        />
                        {/* {appearGroup.map((gruppo) => (
                      <MenuItem key={gruppo.id} value={gruppo.id}>
                        {gruppo.nome}
                      </MenuItem>
                    ))}
                  </TextField> */}
                      </Col>
                    </Row>
                    <Row>
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          // select
                          // onChange={(e) => setNome(e.target.value)}
                          label="File N°"
                          defaultValue={chiamante[2]}
                          InputProps={{
                            readOnly: modifica===false ?true:false,
                          }}
                        />
                        {/* {appearGroup.map((gruppo) => (
                      <MenuItem key={gruppo.id} value={gruppo.id}>
                        {gruppo.nome}
                      </MenuItem>
                    ))}
                  </TextField> */}
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
                  { modifica===false ? "":<ButtonClickedGreen
                    size="medium"
                    nome="Aggiorna"
                    onClick={handleCloseChiamante2}
                  />}
                  
                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseChiamante}
                    size="medium"
                    nome={ modifica===false ?"Indietro":"Annulla"}
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
