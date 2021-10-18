import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { IconButton } from "@material-ui/core";
import "../styles/App.css";
import acccessControl from "../service/url.js";
import { tableIcons } from "../components/Icons";
import WhireShark from "../assets/logoShark2.png";
import VisibilityIcon from "@material-ui/icons/Visibility";



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
      title: "Trace",
      field: "pathInstance",
      render: () => (
         <img className={classes.img} src={WhireShark} />
      ),
    },
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
    img: {
      width: "30px",
      height: "30px",
      borderRadius: "15px"
    }
  }));

  const classes = useStyles();
  const [data, setData] = useState();

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
        setData(result.testCaseList);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestCase();
  }, []);



  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        style={{ boxShadow: "none" }}
        title="Test Generatore Conclusi"
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
            tooltip: "Visualizza Test Generatore",
            position: "row",
            // onClick: (event, rowData) => openVisualizza(rowData),
          },
        ]}
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
