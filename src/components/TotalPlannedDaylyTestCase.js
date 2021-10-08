import React from "react";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { postGenerale } from "../service/api";
//import Title from "./Titl

const useStyles = makeStyles({
  title: {
    color: "#E2783C",
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

export default function TotalPlannedDaylyTestCase() {
  const classes = useStyles();

  const [dataGiorni, setDataGiorni] = useState([]);
  const [dataSettimana, setDataSettimana] = useState([]);

  const objDashInfoTestCase = {
    "includeRiepilogoTestCase": true,
    "includeRiepilogoTestSuite": null,
    "includeTestCaseOfType": "COMPLETED",
    "includeTestSuiteOfType": null,
    "includeTestGeneratoreOfType": null
  };

  const getDataForTestCase = () => {
    (async () => {
      setDataGiorni((await postGenerale("dashboard/info", objDashInfoTestCase)).riepilogoTestCaseGiorni);
      //setDataSettimana((await postGenerale("dashboard/info", objDashInfoTestCase)).riepilogoTestCaseSettimana);
    })();
  }

  useEffect(() => {
    getDataForTestCase();
  }, []);

  return (
    <React.Fragment>
      <Typography className={classes.title}>
        TOTAL TEST CASE PIANIFICATI/GIORNO
      </Typography>
      <Typography
        component="p"
        variant="h5"
        m={2}
        className={classes.secondTitle}
      >
        % COMPLETATI
        <Typography>
          <h5>{dataGiorni?.percentualeCompletati}</h5>
        </Typography>
      </Typography>
      <Typography
        color="textSecondary"
        component="p"
        variant="h5"
        className={classes.secondTitle}
      >
        % SUCCESSO
        <Typography>
          <h5>{dataGiorni?.percentualeSuccesso}</h5>
        </Typography>
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
