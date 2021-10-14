import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ChartReport from "../components/ChartReport";
import TextField from "@material-ui/core/TextField";
import ButtonClickedBlue from "./ButtonClickedBlue";
import FilterListIcon from "@material-ui/icons/FilterList";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
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
import ButtonNotClickedGreen from "../components/ButtonNotClickedGreen";
import ButtonClickedGreen from "../components/ButtonClickedGreen";
import acccessControl from "../service/url.js";
import { IconButton } from "@material-ui/core";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { Doughnut } from "react-chartjs-2";


const TestSuiteComplete = () => {
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
      title: "Report",
      field: "pathInstance",
      render: () => (
        <IconButton>
          <PostAddOutlinedIcon onClick={(event) => alert("Show Report")} />
        </IconButton>
      ),
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
      title: "Risultato",
      field: "result",
    },
    {
      title: "Trace",
      field: "trace",
    },
    {
      title: "Call-Id",
      field: "loadedBy",
    },
    {
      title: "Action",
      field: "action",
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
      // marginBottom: "10%",
    },
    contenutoModale: {
      height: 370,
      // width: 500,
      overflowX: "hidden",
      padding:10,
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
    contenutoModaleGrafico: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      height: 370,
      overflowX: "hidden",
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
  const [data, setData] = useState();
  const [testCases, setTestCases] = useState([]);
  const [testSuite, setTestSuite] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [version, setVersion] = useState();
  const [openTestCase, SetOpenTestCase] = React.useState(false);
  const arrayTestCaseAssociati = testSuite?.testCases; 

  const arrayTestCase = testSuite?.testCases;
  const [appearTest, setAppearTest] = useState([]);
  const [openExport, setOpenExport] = useState(false);
  const [dataLoad, setTestCaseLoad] = useState(null);
  const [dataRun, setIdTestCaseRun] = useState(null);
  const [dataCase, setDataCase] = useState();
  const [caricamento, setCaricamento] = useState(false);
  const [caricamento2, setCaricamento2] = useState(false);
  const [openGrafico, setOpenGrafico] = useState(false);
  const [dataTestCases, setDataTestCases] = useState();
  const [testCaseAssociati, setTestCaseAssociati] = useState([]);


  const [prova, setProva] = useState([]);

  const setTestCaseAssociatiArray = (testsuite) => {
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
  arrayTestCaseAssociati?.forEach(function (obj) {
    arrayId?.push(obj.id);
  });

  const handleOpenExport = () => {
    setOpenExport(true);
    getAllTestCaseModal();
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setId(rowData.id);
    setNome(rowData.nome);
    setDescrizione(rowData.descrizione);
    setVersion(rowData.version);
    // setTestCases([...testCases, rowData.testCases[0].nome]);
    setStartDate(rowData.startDate);
    setEndDate(rowData.endDate);
    setLoadedBy(rowData.loadedBy);
    setLoadedWhen(rowData.loadedWhen);
    // setOpen(true);
    getTestSuiteCompletedById(rowData.id);
  };

  const handleClose = () => {
    setOpen(false);
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

  // const testCaseLoader = () => {
  //   loadTestCase(id);
  //   handleClose();
  //   getAllTestCase();
  // };

  // const runCaseLoder = () => {
  //   runTestCase(idToRun);
  //   handleCloseRun();
  //   //alert("Run test id :  "+ idToRun);
  // };

  const openVisualizza = (rowData) => {
    //getTestSuiteById();
    handleOpen(rowData);
  };

  const handleOpenGrafico = () => {
    setOpenGrafico(true);
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
        console.log(result);
        //setAppearTest(result.testCaseList);
        setData(result.testSuiteList);
      })
      .catch((error) => console.log("error", error));
  };

  //-------------   GET TEST SUITE BY ID -------------

  // const getTestSuiteById = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", bearer);

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(`/api/testsuite/${id}`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log("error", error));
  // };

  /*--------------- GET TEST CASE -------------------*/

  const getAllTestCaseModal = () => {
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
        console.log(result);
        setAppearTest(result.list);
        setDataCase(result.list);
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

  //-----------GET TEST SUITE----------------------
  // const getAllTestSuite = () => {
  //   setCaricamento(true);
  //   var myHeaders = new Headers();
  //   myHeaders.append("Authorization", bearer);
  //   myHeaders.append("Access-Control-Allow-Origin", acccessControl);
  //   myHeaders.append("Access-Control-Allow-Credentials", "true");

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow",
  //   };

  //   fetch(`/api/testsuite`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setData(result.list);
  //       setCaricamento(false);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  useEffect(() => {
    getAllTestSuiteComplete();
    //getAllTestSuite();
    getAllTestCase();
    //getTestSuiteCompletedById();
  }, []);

  const tableIcons = {
    Export: React.forwardRef((props, ref) => (
      <Button size="small" variant="contained" color="secondary">
        EXPORT
      </Button>
    )),
  };


   /*------ Funzione calcolo percentuali -------*/

   const [ok, setOk] = useState(0);
   const [ko, setKo] = useState(0);
 
   function cicloFor(data) {
     console.log(data);
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
         backgroundColor: [
           "red",
           "green",
           // "rgba(75, 192, 192)",
           // "rgba(153, 102, 255)",
         ],
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
        title="Ultimi 30 Test Suite Completi"
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
          //   tooltip: "Export Test Suite Table",
          //   onClick: () => handleOpenExport(),
          //   isFreeAction: true,
          // },
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
                      // pageSizeOptions: [
                      //   5,
                      //   10,
                      //   20,
                      //   { value: data.length, label: "All" },
                      // ],
                    }}
                    // actions={[
                    //   {
                    //     icon: (dat) => (
                    //       <a>
                    //         <VisibilityIcon />
                    //       </a>
                    //     ),
                    //     tooltip: "Visualizza tutti i dati",
                    //     position: "row",
                    //     onClick: (event, rowData) => openVisualizza(rowData),
                    //   },
                    // ]}
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
                    Test Case KO/OK associati
                  </Typography>
                </ListItem>
                <Divider className={classes.divider} />
              </div>

              {/* <Form className={classes.contenutoModale}>
                <div className={classes.chart}><ChartReport /></div>
              </Form> */}

              <div className={classes.contenutoModaleGrafico}>
                <MaterialTable
                  style={{ boxShadow: "none" }}
                  title="Test Case"
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
                    // pageSizeOptions: [
                    //   5,
                    //   10,
                    //   20,
                    //   { value: data.length, label: "All" },
                    // ],
                  }}
                  // actions={[
                  //   {
                  //     icon: (dat) => (
                  //       <a>
                  //         <VisibilityIcon />
                  //       </a>
                  //     ),
                  //     tooltip: "Visualizza tutti i dati",
                  //     position: "row",
                  //     onClick: (event, rowData) => openVisualizza(rowData),
                  //   },
                  // ]}
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
      </Modal>
    </div>
  );
};

export default TestSuiteComplete;
