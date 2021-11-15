import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import { Fade, Paper, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Form from "react-bootstrap/Form";
import ListItem from "@material-ui/core/ListItem";
import { Divider } from "@material-ui/core";
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import acccessControl from "../service/url.js";
import { IconButton } from "@material-ui/core";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { Doughnut } from "react-chartjs-2";
import { tableIcons } from "../components/Icons";
import WhireShark from "../assets/logoShark2.png";
import "../styles/App.css";

const TestSuiteComplete = () => {
  const columns = [
    {
      title: "Id",
      field: "id",
      defaultSort: "desc",
      headerStyle: {
        backgroundColor: "beige",
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
      field: "callId",
    },
    {
      title: "Trace",
      field: "pathInstance",
      render: () => <img className={classes.img} src={WhireShark} />,
    },
  ];

  const columnsVisualizzaTestcases = [
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
    {
      title: "Versione",
      field: "version",
      hidden: true,
    },
    {
      title: "Data Caricamento",
      field: "loadedWhen",
    },
    {
      title: "Caricato Da",
      field: "loadedBy",
    },
    {
      title: "Data Fine",
      field: "endDate",
    },
    {
      title: "Stato",
      field: "stato",
    },
    {
      title: "Template",
      field: "template.nome",
    },
  ];

  const columnsTestcases = [
    {
      title: "Id",
      field: "id",
      defaultSort: "desc",
    },
    {
      title: "Nome Test",
      field: "nome",
    },
    {
      title: "Risultato",
      field: "result",
    },
    {
      title: "Trace",
      field: "trace",
    },
    {
      title: "Call-Id",
      field: "callId",
    },
    // {
    //   title: "Action",
    //   field: "action",
    // },
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
    paperModale: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "5%",
      height: "fit-content",
      width: 800,
      position: "relative",
    },
    paperContainer2: {
      flexDirection: "column",
      padding: "20px",
      height: "fit-content",
      // marginBottom: "10%",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
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
    bottone: {
      marginTop: "2%",
      // marginBottom: "2%",
    },
    intestazione: {
      color: "#47B881",
      marginTop: "3%",
      flexDirection: "row",
      marginBottom: "2%",
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
    contenutoModaleGrafico: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      overflowX: "hidden",
      height: "fit-content",
      overflowX: "hidden"

    },
    img: {
      width: "30px",
      height: "30px",
      borderRadius: "15px",
    },
    bottoneAnnulla: {
      marginTop: "2%",
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState(0);
  const [descrizione, setDescrizione] = useState("");
  const [nome, setNome] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loadedBy, setLoadedBy] = useState("");
  const [loadedWhen, setLoadedWhen] = useState("");
  const [data, setData] = useState();
  const [testCases, setTestCases] = useState([]);
  const [testSuite, setTestSuite] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [version, setVersion] = useState();
  const [openTestCase, SetOpenTestCase] = React.useState(false);
  const arrayTestCaseAssociati = testSuite?.testCases;

  const [caricamento2, setCaricamento2] = useState(false);
  const [openGrafico, setOpenGrafico] = useState(false);
  const [dataTestCases, setDataTestCases] = useState();
  const [testCaseAssociati, setTestCaseAssociati] = useState([]);

  const [testCase, setTestCase] = useState({});
  const [openTestCaseSel, setOpenTestCaseSel] = useState(false);

  const [openChiamato, setOpenChiamato] = React.useState(false);
  const [openChiamanti, setOpenChiamanti] = React.useState(false);

  const [prova, setProva] = useState([]);

  const setTestCaseAssociatiArray = (testsuite) => {
    let x = [];

    for (let i = 0; i < testsuite.testCases.length; i++) {
      x.push(testsuite.testCases[i].id);
    }
    setProva(x);
  };

  //---------------------------------------------------------------------------------------------------------------------------------

  /*------- arrayIdTestCase -----------*/
  const arrayIdTestCase = [];
  for (let index = 0; index < selectedRows?.length; index++) {
    const element = selectedRows[index]?.id;
    arrayIdTestCase?.push(element);
  }

  var arrayId = [];
  arrayTestCaseAssociati?.forEach(function (obj) {
    arrayId?.push(obj.id);
  });

  const handleOpen = (rowData) => {
    setOpen(true);
    setId(rowData.id);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersion(rowData.version);
    setStartDate(rowData.startDate);
    setEndDate(rowData.endDate);
    setLoadedBy(rowData.loadedBy);
    setLoadedWhen(rowData.loadedWhen);
    getTestSuiteCompletedById(rowData.id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openVisualizza = (rowData) => {
    handleOpen(rowData);
  };

  const openVisualizzaTestcaseSel = (rowData) => {
    getTestCaseById(rowData.testCase.id);
  };
  const handleCloseTestCaseSel = () => {
    setOpenTestCaseSel(false);
  };
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
  const handleOpenGrafico = (rowData) => {
    setId(rowData.id);
    getTestSuiteCompleteById(rowData.id, true);
  };

  const handleCloseGrafico = () => {
    setOpenGrafico(false);
  };

  const handleOpenTestCase = () => {
    SetOpenTestCase(true);
  };

  const handleCloseTestCase = () => {
    getTestSuiteCompletedById(id);
    SetOpenTestCase(false);
  };

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  //------------------------- GET TEST SUITE COMPLETED BY ID ------------------------------

  const getTestSuiteCompletedById = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testsuite/loaded/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestSuite(result.testSuite);
        setTestCaseAssociati(result.testSuite.testCases);
        setTestCaseAssociatiArray(result.testSuite);
        cicloFor(result.testSuite.testCases);
        setOpen(true);
        SetOpenTestCase(false);
      })
      .catch((error) => console.log("error", error));
  };

  //-----------GET TEST SUITE COMPLETE----------------------
  const getAllTestSuiteComplete = () => {
    var consta = "COMPLETED";

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var raw = JSON.stringify({
      includeTestCaseOfType: null,
      includeTestSuiteOfType: consta,
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
        setData(result.testSuiteList);
      })
      .catch((error) => console.log("error", error));
  };

  //-----------GET TEST CASE ASSOCIATI----------------------
  const getAllTestCase = () => {
    //setCaricamento2(true);
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
        setDataTestCases(result.list);
        setCaricamento2(false);
      })
      .catch((error) => console.log("error", error));
  };

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
        setTestCase(result.testCase);
        setOpenTestCaseSel(true);
      })
      .catch((error) => console.log("error", error));
  };
  //------------------------- GET TEST SUITE BY ID ------------------------------

  const getTestSuiteCompleteById = (id, open) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/testsuite/loaded/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTestSuite(result.testSuite);
        setTestCaseAssociati(result.testSuite.testCases);
        setTestCaseAssociatiArray(result.testSuite);
        cicloFor(result.testSuite.testCases);
        setOpenGrafico(open);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestSuiteComplete();
    getAllTestCase();
  }, []);

  /*------ Funzione calcolo percentuali -------*/

  const [ok, setOk] = useState(0);
  const [ko, setKo] = useState(0);

  function cicloFor(data) {
    var appOk = 0;
    var appKo = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].result === "KO") {
        appKo += 1;
      } else {
        appOk += 1;
      }
    }
    setOk(appOk);
    setKo(appKo);
  }

  const chart = {
    labels: ["KO", "OK"],
    datasets: [
      {
        label: "# of Test Case",
        data: [ko, ok],
        backgroundColor: ["red", "green"],
      },
    ],
    options: {
      maintainAspectRatio: false,
    },
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Ultimi 30 Test Suite Completati"
        data={data}
        columns={columns}
        options={{
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          selection: true,
          filtering: true,
          exportButton: true,
          headerStyle: {
            backgroundColor: "beige",
          },
          pageSizeOptions: [5, 10, 20, { value: data?.length, label: "All" }],
        }}
        actions={[
          {
            icon: (dat) => (
              <a>
                <VisibilityIcon />
              </a>
            ),
            tooltip: "Visualizza Test Suite",
            position: "row",
            onClick: (event, rowData) => openVisualizza(rowData),
          },
          {
            icon: (dat) => (
              <a>
                <PieChartOutlinedIcon />
              </a>
            ),
            tooltip: "Visualizza Grafico",
            position: "row",
            onClick: (event, rowData) => handleOpenGrafico(rowData),
          },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
        }}
      />
      {/*------------ MODALE VISUALIZZA TEST CASE ASSOCIATI --------------------*/}
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
                    Test Suite <b>{nome}</b>
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
                        readOnly: true,
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
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  {/* <Col className={classes.col}>
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
                  </Col> */}
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={testCases !== "" ? false : true}
                      // onChange={(e) => setTestCases(e.target.value)}
                      label="Numero Test Case"
                      defaultValue={arrayTestCaseAssociati?.length}
                      helperText={testCases !== "" ? "" : "Test Case"}
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
                      error={descrizione !== "" ? false : true}
                      onChange={(e) => setDescrizione(e.target.value)}
                      label="Descrizione"
                      defaultValue={descrizione}
                      helperText={
                        descrizione !== "" ? "" : "Descrizione richiesta"
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                </Row>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2%",
                  }}
                >
                  <ButtonClickedGreen
                    size="medium"
                    nome={"Vedi test Case associati"}
                    onClick={handleOpenTestCase}
                  />
                </div>

                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={loadedBy !== "" ? false : true}
                      onChange={(e) => setLoadedBy(e.target.value)}
                      label="Caricato da"
                      defaultValue={loadedBy}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={loadedWhen !== "" ? false : true}
                      onChange={(e) => setLoadedWhen(e.target.value)}
                      label="Data caricamento"
                      defaultValue={loadedWhen}
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
                      error={endDate !== "" ? false : true}
                      onChange={(e) => setEndDate(e.target.value)}
                      label="Data Fine "
                      defaultValue={endDate}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Col>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      error={startDate !== "" ? false : true}
                      onChange={(e) => setStartDate(e.target.value)}
                      label="Data Inizio "
                      defaultValue={startDate}
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
                    onClick={handleClose}
                    size="medium"
                    nome="Indietro"
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>
      {/* ------------------------MODALE TEST CASE ASSOCIATI-------------------- */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openTestCase}
        onClose={handleCloseTestCase}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openTestCase}>
          <div>
            <Paper className={classes.paperContainer2} elevation={1}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    Visualizza i Test Case associati
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <>
                  <MaterialTable
                    icons={tableIcons}
                    style={{ boxShadow: "none" }}
                    title="Test Case"
                    data={arrayTestCaseAssociati}
                    columns={columnsVisualizzaTestcases}
                    isLoading={caricamento2}
                    options={{
                      selection: false,
                      sorting: true,
                      actionsColumnIndex: -1,
                      search: true,
                      searchFieldVariant: "outlined",
                      filtering: true,
                      searchFieldAlignment: "left",
                      pageSizeOptions: [
                        5,
                        10,
                        20,
                        { value: data?.length, label: "All" },
                      ],
                    }}
                    localization={{
                      header: {
                        actions: "Azioni",
                      },
                      body: {
                        emptyDataSourceMessage:
                          "Non è presente alcun dato da mostrare",
                      },
                    }}
                  />
                </>
              </Form>
              <div className={classes.buttonModale}>
                <Divider className={classes.divider} />
                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <ButtonNotClickedGreen
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseTestCase}
                    size="medium"
                    nome="Indietro"
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>

      {/*---------------- MODALE VISUALIZZA GRAFICO ------------------*/}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openGrafico}
        onClose={handleCloseGrafico}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openGrafico}>
          <div>
            <Paper className={classes.paperContainer2} elevation={1}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    Test Case KO/OK associati al Test Suite{" "}
                    <b>{testSuite.nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <div className={classes.contenutoModaleGrafico}>
                <MaterialTable
                  icons={tableIcons}
                  style={{ boxShadow: "none" }}
                  title="Test Case Associati"
                  data={testCaseAssociati}
                  columns={columnsTestcases}
                  isLoading={caricamento2}
                  options={{
                    selection: false,
                    sorting: true,
                    actionsColumnIndex: -1,
                    search: true,
                    searchFieldVariant: "outlined",
                    filtering: true,
                    searchFieldAlignment: "left",
                    exportButton: true,
                    pageSizeOptions: [
                      5,
                      10,
                      20,
                      { value: data?.length, label: "All" },
                    ],
                  }}
                  actions={[
                    {
                      icon: (dat) => (
                        <a>
                          <VisibilityIcon />
                        </a>
                      ),
                      tooltip: "Visualizza tutti i dati",
                      position: "row",
                      onClick: (event, rowData) =>
                        openVisualizzaTestcaseSel(rowData),
                    },
                  ]}
                  localization={{
                    header: {
                      actions: "Azioni",
                    },
                    body: {
                      emptyDataSourceMessage:
                        "Non è presente alcun dato da mostrare",
                    },
                  }}
                />

                <div>
                  <Doughnut data={chart} className={classes.grafico} />
                </div>
              </div>
              <Divider className={classes.divider} />

              <div
                className={classes.bottone}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  onClick={handleCloseGrafico}
                  size="medium"
                  color="secondary"
                  variant="outlined"
                >
                  {" "}
                  Chiudi
                </Button>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal>

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
                        readOnly: true,
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
                        readOnly: true,
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
                      value={testCase?.creationDate
                        ?.replace("T", " / ")
                        ?.replace(".000+00:00", "")}
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
                      value={testCase?.modifiedDate
                        ?.replace("T", " / ")
                        ?.replace(".000+00:00", "")}
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
                          value={
                            testCase?.chiamanti[index]?.linea?.campiConcatenati
                          }
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Col>
                      <Col className={classes.col}>
                        <TextField
                          className={classes.textField}
                          label="Outboundproxy"
                          value={
                            testCase?.chiamanti[index]?.proxy?.campiConcatenati
                          }
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

export default TestSuiteComplete;
