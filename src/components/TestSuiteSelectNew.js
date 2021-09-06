import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import acccessControl from "../service/url.js";


function TestSuiteSelect() {

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
  const [template, setTemplate] = useState(""); 
  const [createdBy, setCreatedBy] = useState("");
  const [modifiedBy, setModifiedBy] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [modifiedDate, setModifiedDate] = useState("");
  const [chiamato, setChiamato] = useState([]);
  const [chiamanti, setChiamanti] = useState([]);
  const [appearLine, setAppearLine] = useState([]);
  const [appearOBP, setAppearOBP] = useState([]);
  const [appearFile, setAppearFile] = useState([]);
  const [open, setOpen] = React.useState(false);



  //-----------GET TEST CASE----------------------
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
//--------------GET LINE------------------------------
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
//--------------GET OBP------------------------------
  const getAppearOBP = () => {
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
        setAppearOBP(result.list);
      })
      .catch((error) => console.log("error", error));
  };

//--------------GET TEMPLATE------------------------------
  const getAppearFile = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", bearer);
    myHeaders.append("Access-Control-Allow-Origin", acccessControl);
    myHeaders.append("Access-Control-Allow-Credentials", "true");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`/api/fs/entityfolder/TEMPLATE/1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAppearFile(result.list);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getAllTestCase();
    getAppearLine();
    getAppearOBP();
    getAppearFile();
  }, []);


  const columns = [
    {
      title: "ID Test",
      field: "id",
      defaultSort:"desc"
    },
    {
      title: "Nome",
      field: "nome",
    },
    {
      title: "Descrizione",
      field: "descrizione",
    },
    // {
    //   title: "Template",
    //   field: "version",
    // },
    {
      title: "Data Creazione",
      field: "creationDate",
    },
    {
      title: "Data Modifica",
      field: "modifiedDate",
    },
    {
      title: "Creato da",
      field: "createdBy",
    },
    {
      title: "Modificato da",
      field: "modifiedBy",
    },
    {
      title: "Template",
      field: "template"
    }
  
  ];

    
  return (
    <div>
      <MaterialTable
        style={{
          boxShadow: "none",
        }}
        title="Test Case"
        data={data}
        columns={columns}
        localization={{
          pagination: {
            labelDisplayedRows: "1 of 10",
            //labelRowsPerPage: "5",
          },
        }}
        options={{
          //tableLayout: "fixed",
          pageSizeOptions: [5],
          actionsColumnIndex: -1,
          search: true,
          paging: true,
          //exportButton: true,
          searchFieldVariant: "outlined",
          searchFieldAlignment: "left",
          selection: true,
          // columnsButton: true,
          // filtering: true,
          headerStyle: {
            backgroundColor: "#1976d2",
            height: "20px",
          },
          cellStyle: {
            height: "20px",
          },
        }}
      />
    </div>
  );
}
export default TestSuiteSelect;
