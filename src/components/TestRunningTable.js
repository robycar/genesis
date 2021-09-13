import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import "../styles/App.css";
import acccessControl from "../service/url.js";

const TestRunningTable = () => {
  let bearer = `Bearer ${localStorage.getItem("token")}`;

  if (bearer != null) {
    bearer = bearer.replace(/"/g, "");
  }

  const [data, setData] = useState([]);


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

  useEffect(() => {
    getAllTestCase();
  }, []);

  //---------TABLE COLUMNS------------------
  const columns = [
    {
      title: "ID",
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
    {
      title: "Versione",
      field: "version",
    },
    {
      title: "Durata",
      field: "expectedDuration",
    }
  ];
 

  return (
    <div>
      <MaterialTable
        style={{ boxShadow: "none" }}
        title="Total Test Case Running"
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
            icon: () => <PieChartOutlinedIcon />,
            tooltip: "Report",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.id),
            position: "row",
          },
          {
            icon: "play_circle_outlined",
            tooltip: "Launch",
            onClick: (event, rowData) =>
              alert("Ho cliccato " + rowData.id),
            position: "row",
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

export default TestRunningTable;
