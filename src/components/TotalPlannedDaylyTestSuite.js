import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//import Title from "./Title";

const useStyles = makeStyles({
  title: {
    color: "#1665D8",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "20px",
    fontStyle: "normal",
    marginBottom: "20px",
    textAlign: "center",
  },
  secondTitle: {
    marginBottom: "20px",
    textAlign: "center",
  },
  thirdTitle: {
    marginBottom: "20px",
    textAlign: "center",
  },
});

export default function TotalPlannedDaylyTestSuite() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography className={classes.title}>
        TOTAL TEST SUITE GIORNALIERE
      </Typography>
      <Typography
        component="p"
        variant="h5"
        m={2}
        className={classes.secondTitle}
      >
        %COMPLETED
      </Typography>
      <Typography
        color="textSecondary"
        component="p"
        variant="h5"
        className={classes.secondTitle}
      >
        %SUCCESS
      </Typography>
      {/* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}
