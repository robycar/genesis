import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  edit: {
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "35px",
    color: "#66788A",
    lineHeight: "20px",
  },
}));

function NavbarItemEdit() {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon className={classes.listItemIcon}>
        <EditIcon fontSize="large" />
      </ListItemIcon>
      <Typography className={classes.edit}> Edit </Typography>
    </ListItem>
  );
}
export default NavbarItemEdit;
