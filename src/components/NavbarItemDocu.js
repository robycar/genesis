import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles((theme) => ({
  documentation: {
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "35px",
    color: "#66788A",
    lineHeight: "20px",
  },
}));

function NavbarItemDocu() {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon className={classes.listItemIcon}>
        <DescriptionIcon fontSize="large" />
      </ListItemIcon>
      <Typography className={classes.documentation}> Documentation </Typography>
    </ListItem>
  );
}
export default NavbarItemDocu;
