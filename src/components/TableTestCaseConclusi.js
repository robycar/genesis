import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { IconButton } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import ChartReport from "../components/ChartReport";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
import VisibilityIcon from "@material-ui/icons/Visibility";
import "../styles/App.css";
import { Fade, Paper, Typography } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import BackupIcon from "@material-ui/icons/Backup";
import FormControl from "@material-ui/core/FormControl";
import Form from "react-bootstrap/Form";
import Select from "@material-ui/core/Select";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { MenuItem } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import loading from "../../src/assets/load.gif";
import ButtonNotClickedGreen from "./ButtonNotClickedGreen";
import ButtonClickedGreen from "./ButtonClickedGreen";
import acccessControl from "../service/url.js";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";

const TotalTestCaseConclusi = () => {
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
    // {
    //   title: "Report",
    //   field: "pathInstance",
    //   render: () => (
    //     <IconButton>
    //       <PostAddOutlinedIcon onClick={(event) => alert("Show Report")} />
    //     </IconButton>
    //   ),
    // },
  ];

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
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
      //flexDirection: "column",
      padding: "20px",
      // marginBottom: "10%",
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    contenutoModale: {
      height: 370,
      overflowX: "hidden",
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
      marginLeft: "55px",
      marginTop: "5%",
      // marginBottom: "2%",
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
  }));

  const handleChange = () => {
    setFilter(!filter);
  };
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openSchedula, setOpenSchedula] = React.useState(false);
  const [openRun, setOpenRun] = React.useState(false);
  const [value, setValue] = React.useState(new Date("2014-08-18T21:11:54"));
  const [filter, setFilter] = useState(false);
  const [id, setId] = useState();
  const [descrizione, setDescrizione] = useState("");
  const [idToRun, setIdToRun] = useState();
  const [nome, setNome] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loadedBy, setLoadedBy] = useState("");
  const [loadedWhen, setLoadedWhen] = useState("");
  const [creationDate, setCreationDate] = useState();
  const [modifiedDate, setModifiedDate] = useState();
  const [data, setData] = useState();
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [testCases, setTestCases] = useState([]);
  const [testSuite, setTestSuite] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [version, setVersion] = useState();
  const [openTestCase, SetOpenTestCase] = React.useState(false);

  const arrayTestCase = testSuite?.testCases;
  const [appearTest, setAppearTest] = useState([]);
  const [openExport, setOpenExport] = useState(false);
  const [dataLoad, setTestCaseLoad] = useState(null);
  const [dataRun, setIdTestCaseRun] = useState(null);
  const [dataCase, setDataCase] = useState();
  const [caricamento, setCaricamento] = useState(false);
  const [caricamento2, setCaricamento2] = useState(false);
  const [openGrafico, setOpenGrafico] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [prova, setProva] = useState([]);

  const setTestCaseAssociati = (testsuite) => {
    let x = [];

    //console.log("--------"+testsuite)
    for (let i = 0; i < testsuite.testCases.length; i++) {
      x.push(testsuite.testCases[i].id);
    }
    setProva(x);
  };

  let y = [...prova];

  const modificaTestSelezionati = (testcase) => {
    if (prova.includes(testcase.id)) {
      y.splice(y.indexOf(testcase.id), 1);
    } else {
      y.push(testcase.id);
    }
    setProva(y);
    // aggiornaTestCaseAssociati(x);
  };

  //---------------------------------------------------------------------------------------------------------------------------------

  /*------- arrayIdTestCase -----------*/
  const arrayIdTestCase = [];
  for (let index = 0; index < selectedRows?.length; index++) {
    const element = selectedRows[index]?.id;
    arrayIdTestCase?.push(element);
  }

  // console.log(selectedRows, " Righe selezionati");
  //console.log(arrayTestCase, " Array di test case");

  var arrayId = [];
  arrayTestCase?.forEach(function (obj) {
    arrayId?.push(obj.id);
  });

  const handleOpenExport = () => {
    setOpenExport(true);
    // getAllTestCaseModal();
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setId(rowData.id);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersion(rowData.version);
    // setTestCases([...testCases, rowData.testCases[0].nome]);
    setCreatedBy(rowData.createdBy);
    setModifiedBy(rowData.modifiedBy);
    setCreationDate(rowData.creationDate);
    setModifiedDate(rowData.modifiedDate);
    setOpenReport(true);
    setStartDate(rowData.startDate);
    setEndDate(rowData.endDate);
    setLoadedBy(rowData.loadedBy);
    setLoadedWhen(rowData.loadedWhen);
    // setOpen(true);
    getTestCaseCompleteById(rowData.id);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenReport(false);
  };

  const handleOpenGrafico = () => {
    setOpenGrafico(true);
  };

  const handleCloseGrafico = () => {
    setOpenGrafico(false);
  };

  const handleOpenSchedula = () => {
    setOpenSchedula(true);
    setOpen(false);
  };

  const handleCloseSchedula = () => {
    setOpenSchedula(false);
  };

  const handleOpenRun = (idRun_) => {
    setIdToRun(idRun_);
    setOpenRun(true);
    setOpen(false);
  };

  const handleCloseRun = () => {
    setOpenRun(false);
  };

  const handleChangeData = (newValue) => {
    setValue(newValue);
  };

  const testCaseLoader = () => {
    loadTestCase(id);
    handleClose();
    getAllTestCase();
  };

  const runCaseLoder = () => {
    runTestCase(idToRun);
    handleCloseRun();
    //alert("Run test id :  "+ idToRun);
  };

  const openVisualizza = (rowData) => {
    handleOpen(rowData);
  };

  const handleOpenTestCase = () => {
    SetOpenTestCase(true);
  };

  const handleCloseTestCase = () => {
    // getTestSuiteById(id);
    SetOpenTestCase(false);
  };

  let bearer = `Bearer ${localStorage.getItem("token")}`;

  //------------------------- GET TEST SUITE BY ID ------------------------------

 //--------------- GET TEST CASE BY ID ------------------------

 const getTestCaseCompleteById = () => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", bearer);
  myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  myHeaders.append("Access-Control-Allow-Credentials", "true");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`/api/testcase/loaded/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

  //-----------GET TEST SUITE COMPLETE----------------------
  // const getAllTestSuiteComplete = () => {
  //   var consta = "COMPLETED";

  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", bearer);
  //   myHeaders.append("Content-Type", "application/json");
  //   myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  //   myHeaders.append("Access-Control-Allow-Credentials", "true");

  //   var raw = JSON.stringify({
  //     includeTestCaseOfType: null,
  //     includeTestSuiteOfType: consta,
  //     includeTestGeneratoreOfType: null,
  //   });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };

  //   fetch(`/api/dashboard/info`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       console.log(result);
  //       //setAppearTest(result.testCaseList);
  //       setData(result.testSuiteList);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  /*--------------- LOAD TEST CASE -------------------*/

  const loadTestCase = (id) => {
    var urlLoad = `/api/testcase/load/${id}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(urlLoad, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTestCaseLoad(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  /*--------------- RUN TEST CASE -------------------*/

  const runTestCase = (idRun) => {
    var urlLoad = `/api/testcase/runloaded/${idRun}`;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(urlLoad, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setIdTestCaseRun(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  const hadleLoadData = (rowDataaa) => {
    //console.log(rowDataaa.id);
    //setIdToRun(rowDataaa.id);
    runCaseLoder(rowDataaa.id);
  };

  //-----------GET TEST CASE----------------------
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

  const tableIcons = {
    Export: React.forwardRef((props, ref) => (
      <Button size="small" variant="contained" color="secondary">
        EXPORT
      </Button>
    )),
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Tutti i Test Case Conclusi"
        data={data}
        columns={columns}
        options={{
          //tableLayout: "fixed",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "center",
          exportButton: true,

          // selection: true,
          // columnsButton: true,
          // filtering: true,
          headerStyle: {
            backgroundColor: "beige",
            //color: '#FFF'
          },
        }}
        actions={[
          // {
          //   icon: () => (
          //     <div>
          //       <Button size="small" variant="contained" color="secondary">
          //         EXPORT
          //       </Button>
          //     </div>
          //   ),
          //   tooltip: "Export Test Case Table",
          //   onClick: () => handleOpenExport(),
          //   isFreeAction: true,
          // },
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
          // {
          //   icon: (dat) => (
          //     <a>
          //       <PieChartOutlinedIcon />
          //     </a>
          //   ),
          //   tooltip: "Visualizza Grafico",
          //   position: "row",
          //   onClick: (event, rowData) => handleOpenGrafico(rowData),
          // },
        ]}
        localization={{
          header: {
            actions: "Azioni",
          },
        }}
      />
      {/*------------ MODALE VISUALIZZA TEST CASE  --------------------*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openReport}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openReport}>
          <div>
            <Paper className={classes.paperModale} elevation={1}>
              <div>
                <ListItem>
                  <Typography className={classes.intestazione} variant="h4">
                    Test Case <b>{nome}</b>
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <Row>
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      onChange={(e) => setId(e.target.value)}
                      label="Id"
                      defaultValue={id}
                      InputProps={{
                        readOnly: true,
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
                  <Col className={classes.col}>
                    <TextField
                      className={classes.textField}
                      onChange={(e) => setVersion(e.target.value)}
                      label="Versione"
                      defaultValue={version}
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
                      onChange={(e) => setDescrizione(e.target.value)}
                      label="Descrizione"
                      defaultValue={descrizione}
                      
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

      {/* ---------------- MODALE VISUALIZZA GRAFICO ------------------

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
                    Test Case KO-OK
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              <Form className={classes.contenutoModale}>
                <div className={classes.chart}>
                  <ChartReport />
                </div>
              </Form>
              <div className={classes.buttonModale}>
                <Divider className={classes.divider} />

                <div
                  className={classes.bottone}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <Button
                    className={classes.bottoneAnnulla}
                    onClick={handleCloseGrafico}
                    size="medium"
                    color="secondary"
                    variant="outlined"
                  >
                    {" "}
                    Chiudi
                  </Button>
                </div>
              </div>
            </Paper>
          </div>
        </Fade>
      </Modal> */}
    </div>
  );
};

export default TotalTestCaseConclusi;
