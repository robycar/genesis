import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useEffect, useState } from "react";
import { postGenerale } from "../../service/api";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "#ff2b4b",
    fontWeight: 800,
    fontSize: "15px",
    lineHeight: "20px",
    fontStyle: "normal",
    marginBottom: "20px",
    textAlign: "center",
  },

  secondTitle: {
    marginBottom: "5x",
    textAlign: "center",
    fontSize: "15px",
  },
  thirdTitle: {
    marginBottom: "5px",
    textAlign: "center",
  },

  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: "100%",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  dataAlignCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function ReportCardTestGenGeneral() {
  const classes = useStyles();

  const [dataGiorni, setDataGiorni] = useState([]);
  const [dataSettimana, setDataSettimana] = useState([]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const objDashInfoTestGen = {
    "includeRiepilogoTestCase": false,
  "includeRiepilogoTestSuite": false,
  "includeRiepilogoTestGeneratore": true,
  "includeTestCaseOfType": null,
  "includeTestSuiteOfType": null,
  "includeTestGeneratoreOfType": "COMPLETED"
  };

  const getDataForTestGen = () => {
    (async () => {
      setDataGiorni((await postGenerale("dashboard/info", objDashInfoTestGen)).riepilogoTestGeneratoreGiorno);
      setDataSettimana((await postGenerale("dashboard/info", objDashInfoTestGen)).riepilogoTestGeneratoreSettimana);
    })();
  }

  useEffect(() => {
    getDataForTestGen();
  }, []);


  return (
    <React.Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Typography className={classes.title}>
          TOTAL TEST GENERATORE INFO GIORNO/SETTIMANA
        </Typography>
        <Grid container spacing={4}>

          <Grid item xs={20} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Typography
                component="p"
                variant="h5"
                m={2}
                className={classes.secondTitle}
              >
                CARICATI GIORNO
              </Typography>
              <Typography className={classes.dataAlignCenter}>
                <h5><b>{dataGiorni.caricati}</b></h5>
              </Typography>

              <Typography
                component="p"
                variant="h5"
                m={2}
                className={classes.secondTitle}
              >
                CARICATI SETTIMANA
              </Typography>
              <Typography className={classes.dataAlignCenter}>
                <h5><b>{dataSettimana.caricati}</b></h5>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={20} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Typography
                component="p"
                variant="h5"
                m={2}
                className={classes.secondTitle}
              >
                SCHEDULATI GIORNO
              </Typography>
              <Typography className={classes.dataAlignCenter}>
                <h5><b>{dataGiorni.schedulati}</b></h5>
              </Typography>

              <Typography
                component="p"
                variant="h5"
                m={2}
                className={classes.secondTitle}
              >
                SCHEDULATI SETTIMANA
              </Typography>
              <Typography className={classes.dataAlignCenter}>
                <h5><b>{dataSettimana.schedulati}</b></h5>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={20} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Typography
                component="p"
                variant="h5"
                m={2}
                className={classes.secondTitle}
              >
                PIANIFICATI GIORNO
              </Typography>
              <Typography className={classes.dataAlignCenter}>
                <h5><b>{dataGiorni.pianificati}</b></h5>
              </Typography>

              <Typography
                component="p"
                variant="h5"
                m={2}
                className={classes.secondTitle}
              >
                PIANIFICATI SETTIMANA
              </Typography>
              <Typography className={classes.dataAlignCenter}>
                <h5><b>{dataSettimana.pianificati}</b></h5>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={20} md={4} lg={3}>
            <Paper className={fixedHeightPaper}>
              <Typography
                component="p"
                variant="h5"
                m={2}
                className={classes.secondTitle}
              >
                COMPLETATI GIORNO
              </Typography>
              <Typography className={classes.dataAlignCenter}>
                <h5><b>{dataGiorni.completati}</b></h5>
              </Typography>

              <Typography
                component="p"
                variant="h5"
                m={2}
                className={classes.secondTitle}
              >
                COMPLETATI SETTIMANA
              </Typography>
              <Typography className={classes.dataAlignCenter}>
                <h5><b>{dataSettimana.completati}</b></h5>
              </Typography>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </React.Fragment>
  );
}