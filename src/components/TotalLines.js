import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
//import Title from "./Title";
 
function preventDefault(event) {
  event.preventDefault();
}
 
const useStyles = makeStyles({
  title: {
    color: "#1665D8",
    fontWeight: 700,
    fontSize: "24px",
    lineHeight: "16px",
    fontStyle: "normal",
  },
});
 
export default function TotalLines() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography className={classes.title}>Total Lines</Typography>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary">on 15 March, 2019</Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}