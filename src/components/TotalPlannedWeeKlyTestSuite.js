import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//import Title from "./Title";

import { useEffect, useState } from "react";
import { postGenerale } from "../service/api"

const useStyles = makeStyles({
  title: {
    color: "#F7D154",
    fontWeight: 800,
    fontSize: "15px",
    lineHeight: "20px",
    fontStyle: "normal",
    marginBottom: "20px",
    textAlign: "center",
  },
  secondTitle: {
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "15px",
  },
  thirdTitle: {
    marginBottom: "10px",
    textAlign: "center",
  },
});

export default function TotalPlannedWeeKlyTestSuite() {
  const classes = useStyles();

  //const [dataGiorni, setDataGiorni] = useState([]);
  const [dataSettimana, setDataSettimana] = useState([]);

  const objDashInfoTestSuite = {
    "includeRiepilogoTestCase": null,
    "includeRiepilogoTestSuite": true,
    "includeTestCaseOfType": null,
    "includeTestSuiteOfType": "COMPLETED",
    "includeTestGeneratoreOfType": null
  };

  const getDataForTestSuite = () => {
    (async () => {
      //setDataGiorni((await postGenerale("dashboard/info", objDashInfoTestCase)).riepilogoTestCaseGiorni);
      setDataSettimana((await postGenerale("dashboard/info", objDashInfoTestSuite)).riepilogoTestSuiteSettimana);
    })();
  }

  useEffect(() => {
    getDataForTestSuite();
  }, []);


  return (
    <React.Fragment>
      <Typography className={classes.title}>
        TOTAL TEST SUITE PIANIFICATI/SETTIMANA 
      </Typography>
      <Typography
        component="p"
        variant="h5"
        m={2}
        className={classes.secondTitle}
      >
        COMPLETATI
        <Typography>
          <h5>{dataSettimana?.completate}</h5>
        </Typography>
      </Typography>
      {/*<Typography
        color="textSecondary"
        component="p"
        variant="h5"
        className={classes.secondTitle}
      >
        % SUCCESSO
        <Typography>
          <h5>{dataSettimana?.testOK}</h5>
        </Typography>
      </Typography>
       <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
