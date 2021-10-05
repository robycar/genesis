import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { IconButton } from "@material-ui/core";
import ButtonClickedBlue from "./ButtonClickedBlue";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import FilterListIcon from "@material-ui/icons/FilterList";
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

const TestGeneratoreComplete = () => {
  const columns = [
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
  const [idToRun, setIdToRun] = useState();
  const [nome, setNome] = useState("");
  const [creationDate, setCreationDate] = useState();
  const [modifiedDate, setModifiedDate] = useState();
  const [data, setData] = useState();
  const [createdBy, setCreatedBy] = useState("");

  const [appearTest, setAppearTest] = useState([]);

  const [dataLoad, setTestCaseLoad] = useState(null);
  const [dataRun, setIdTestCaseRun] = useState(null);
  const [dataCase, setDataCase] = useState();

  const handleOpen = () => {
    setOpen(true);
    getAllTestCaseModal();
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

  let bearer = `Bearer ${localStorage.getItem("token")}`;

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
        title="Test Generatore Conclusi"
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
        actions={
          [
            // {
            //   icon: () => (
            //     <div>
            //       <Button
            //       size="small"
            //       variant="contained"
            //       color="secondary"
            //       >EXPORT</Button>
            //     </div>
            //   ),
            //   tooltip: "Export Test Generatore Table",
            //   onClick: () => handleOpen(),
            //   isFreeAction: true,
            // },
          ]
        }
        localization={{
          header: {
            actions: "Azioni",
          },
        }}
      />
    </div>
  );
};

export default TestGeneratoreComplete;
