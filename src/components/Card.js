import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TotalTestSuite from "../Components/TotalTestSuite";
import TotalTestCase from "../Components/TotalTestCase";
import TotalLines from "../Components/TotalLines";
import Table from "../Components/Table";

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
      <Grid container spacing={3}>
        <Grid item xs={20} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <TotalTestCase />
          </Paper>
        </Grid>
        {/* Total Test Suite */}
        <Grid item xs={20} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <TotalTestSuite />
          </Paper>
        </Grid>
        {/* Total Test Case */}
        <Grid item xs={20} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <TotalLines />
          </Paper>
        </Grid>
        {/* Total Lines */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Table />
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}></Box>
    </Container>
  );
}
export default Card;
