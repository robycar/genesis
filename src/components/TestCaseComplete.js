import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import acccessControl from "../service/url.js";
import Backdrop from "@material-ui/core/Backdrop";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Divider } from "@material-ui/core";
import { Fade, Paper, Typography } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Form from "react-bootstrap/Form";
import TextField from "@material-ui/core/TextField";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import { tableIcons } from "../components/Icons";
import ButtonClickedGreen from "./ButtonClickedGreen";
import WhireShark from "../assets/logoShark2.png";


const TestCaseComplete = () => {
  const columns = [
    {
      title: "Id",
      field: "id",
      defaultSort: "desc",
      headerStyle: {
        backgroundColor: "beige",
        //color: "#FFF"
      },
    },
    {
      title: "Nome Test",
      field: "nome",
    },
    {
      title: "Loader",
      field: "loadedBy",
    },
    {
      title: "Data Inizio",
      field: "startDate",
    },
    {
      title: "Data Fine",
      field: "endDate",
    },
    {
      title: "Status",
      field: "stato",
    },
    {
      title: "Risultato",
      field: "result",
    },
    {
      title: "Call-Id",
      field: "loadedBy",
    },
    {
      title: "Trace",
      field: "pathInstance",
      render: () => (
         <img className={classes.img} src={WhireShark} />
      ),
    },
  ];

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
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
      // width: 500,
      overflowX: "hidden",
      padding: 10,
    },
    divTextarea: {
      marginTop: "20px",
    },
    textArea: {
      width: "660px",
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
    bottone: {
      marginLeft: "55px",
      marginTop: "5%",
      // marginBottom: "2%",
    },
    img: {
      width: "30px",
      height: "30px",
      borderRadius: "15px"
    }
  }));

  const classes = useStyles();
  const [data, setData] = useState();

  const [testCase, setTestCase] = useState({})
  const [openTestCaseSel, setOpenTestCaseSel] = useState(false)

  const [openChiamato, setOpenChiamato] = React.useState(false);
  const [openChiamanti, setOpenChiamanti] = React.useState(false);

  const openVisualizza = (rowData) => {
    getTestCaseById(rowData.testCase.id)
  };


  let bearer = `Bearer ${localStorage.getItem("token")}`;

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

    fetch(`/api/testcase/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestCase(result.testCase)
        setOpenTestCaseSel(true)
      })
      .catch((error) => console.log("error", error));
  };


  //-----------GET TEST CASE COMPLETED----------------------
  const getAllTestCase = () => {
    var consta = "COMPLETED";

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      includeTestCaseOfType: consta,
      includeTestSuiteOfType: null,
      includeTestGeneratoreOfType: null,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`/api/dashboard/info`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        //setAppearTest(result.testCaseList);
        setData(result.testCaseList);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestCase();
  }, []);


  const handleCloseTestCaseSel = () => {
    setOpenTestCaseSel(false)
  }

  const handleOpenChiamato = () => {
    setOpenChiamato(true);
  };
  const handleOpenChiamanti = () => {
    setOpenChiamanti(true);
  };

  const handleCloseChiamato = () => {
    setOpenChiamato(false);
  };
  const handleCloseChiamanti = () => {
    setOpenChiamanti(false);
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Ultimi 30 Test Case Completati"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "center",
          exportButton: true,
          headerStyle: {
            backgroundColor: "beige",
          },
        }}
        actions={[
          {
            icon: (dat) => (
              <a>
                <VisibilityIcon />
              </a>
            ),
            tooltip: "Visualizza Test Case",
            position: "row",
            onClick: (event, rowData) => openVisualizza(rowData),
          },
        ]}
        localization={{
          header: {
            actions: "Azioni",
            backgrounColor: "beige",
          },
        }}
      />

      {/*------------------ MODALE TestCaseSel -------------*/}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openTestCaseSel}
        onClose={handleCloseTestCaseSel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openTestCaseSel}>
          <div>
            <Paper className={classes.paperModale} elevation={1}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    TestCase <b>{testCase.nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Nome"
                      defaultValue={testCase.nome}
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Template"
                      defaultValue={testCase?.template?.nome}
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
                      label="Descrizione"
                      defaultValue={testCase.descrizione}
                      InputProps={{
                        readOnly: true
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
                    nome="Vedi Chiamato"
                    onClick={handleOpenChiamato}
                  />
                  <ButtonClickedGreen
                    size="medium"
                    nome="Vedi Chiamante/i"
                    onClick={handleOpenChiamanti}
                  />
                </div>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Creato Da"
                      value={testCase.createdBy}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Data di creazione"
                      value={testCase?.creationDate?.replace("T", " / ")?.replace(".000+00:00", "")}
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
                      value={testCase.modifiedBy}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Data di Modifica"
                      value={testCase?.modifiedDate?.replace("T", " / ")?.replace(".000+00:00", "")}
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

                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseTestCaseSel}
                    size="medium"
                    nome="Indietro"
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
                    Chiamato <b>{testCase.nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Linea"
                      value={testCase?.chiamato?.linea?.campiConcatenati}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      label="Outboundproxy"
                      value={testCase?.chiamato?.proxy?.campiConcatenati}
                      InputProps={{
                        readOnly: true
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

                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseChiamato}
                    size="medium"
                    nome="Indietro"
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
                    Chiamante/i <b>{testCase.nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                {testCase?.chiamanti?.map((chiamante, index) => (
                  <>
                    <Typography className={classes.intestazione} variant="h6">
                      Chiamante <b>{index + 1}</b>
                    </Typography>
                    <Row>
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          label="Linea "
                          value={testCase?.chiamanti[index]?.linea?.campiConcatenati}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Col>
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          label="Outboundproxy"
                          value={testCase?.chiamanti[index]?.proxy?.campiConcatenati}
                          InputProps={{
                            readOnly: true,
                          }}
                        />
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

                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseChiamanti}
                    size="medium"
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
};

export default TestCaseComplete;
