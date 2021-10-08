import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TotalPlannedWeeKlyTestSuite from "./TotalPlannedWeeKlyTestSuite";
import TotalPlannedWeeKlyTestCase from "./TotalPlannedWeeKlyTestCase";
import TotalPlannedDaylyTestCase from "./TotalPlannedDaylyTestCase";
import TotalPlannedDaylyTestSuite from "./TotalPlannedDaylyTestSuite";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function Card() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={4}>
        <Grid item xs={20} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <TotalPlannedDaylyTestCase />
          </Paper>
        </Grid>
        <Grid item xs={20} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <TotalPlannedWeeKlyTestCase />
          </Paper>
        </Grid>
        {/* Total Test Suite */}
        <Grid item xs={20} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <TotalPlannedDaylyTestSuite />
          </Paper>
        </Grid>
        {/* Total Test Case */}
        <Grid item xs={20} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            <TotalPlannedWeeKlyTestSuite />
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}></Box>

    </Container>
  );
}
export default Card;
