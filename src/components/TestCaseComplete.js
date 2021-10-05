import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable, { MTableHeader } from "material-table";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import acccessControl from "../service/url.js";
import { IconButton } from "@material-ui/core";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";


const TestCaseComplete = () => {
  const columns = [
    
    {
      title: "Id",
      field: "id",
      defaultSort: "desc",
      headerStyle: {
        backgroundColor: 'beige',
        //color: "#FFF"
      }
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
          <PostAddOutlinedIcon onClick={(event)=> alert("Show Report")}/>
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

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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
        title="Ultimi 30 Test Case Conclusi"
        data={data}
        columns={columns}
        options={{
          //tableLayout: "fixed",
          actionsColumnIndex: -1,
          search: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "center",
          exportButton: true,
          headerStyle: {
            backgroundColor: 'beige',
            //color: '#FFF'
          }

          // selection: true,
          // columnsButton: true,
          // filtering: true,
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
          //   // onClick: () => handleOpen(),
          //   isFreeAction: true,
          // },
        ]}
        localization={{
          header: {
            actions: "Azioni",
            backgrounColor: "beige"
          },
        }}
      
      />
    </div>
  );
};

export default TestCaseComplete;
