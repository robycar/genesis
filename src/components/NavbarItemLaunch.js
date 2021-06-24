import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  launch: {
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
        <PlayCircleOutlineIcon fontSize="large" />
      </ListItemIcon>
      <Typography className={classes.launch}> Launch </Typography>
    </ListItem>
  );
}
export default NavbarItemLaunch;
