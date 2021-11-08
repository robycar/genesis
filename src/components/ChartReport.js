import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import acccessControl from "../service/url.js";

const columns = [
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
    field: "callId",
  },
  {
    title: "Action",
    field: "action",
  },
];

function ChartReport() {

  //-----------GET TEST CASE----------------------
  const getAllTestCase = () => {
    const bearer = `Bearer ${localStorage.getItem("token")}`;

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
        cicloFor(result.testCaseList);
      })
      .catch((error) => console.log("error", error));
  };


  useEffect(() => {
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
        backgroundColor: [
          "red",
          "green",
        ],
      },
    ],
  };

  return (
    <>
      <div>
        <Doughnut data={chart} />
      </div>
    </>
  );
}

export default ChartReport;
