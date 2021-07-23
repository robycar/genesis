import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
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
  container: {
    marginBottom: "3%",
  },
}));

function NavbarItemAdmin() {
  const classes = useStyles();

  return (
    <ListItem className={classes.container}>
      <ListItemIcon className={classes.listItemIcon}>
        <LockIcon fontSize="large" />
      </ListItemIcon>
      <Typography className={classes.edit}> Amministrazione </Typography>
    </ListItem>
  );
}
export default NavbarItemAdmin;
