import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  support: {
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "35px",
    color: "#66788A",
    lineHeight: "20px",
  },
}));

function NavbarItemLaunch() {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon className={classes.listItemIcon}>
        <HelpOutlineIcon fontSize="large" />
      </ListItemIcon>
      <Typography className={classes.support}> Support </Typography>
    </ListItem>
  );
}
export default NavbarItemLaunch;
