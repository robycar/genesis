import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BarChartIcon from "@material-ui/icons/BarChart";

const useStyles = makeStyles((theme) => ({
  report: {
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "35px",
    color: "#66788A",
    lineHeight: "20px",
  },
}));

function NavbarItemReport() {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon className={classes.listItemIcon}>
        <BarChartIcon fontSize="large" />
      </ListItemIcon>
      <Typography className={classes.report}> Report </Typography>
    </ListItem>
  );
}
export default NavbarItemReport;
