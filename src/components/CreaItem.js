import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  titolo: {
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "24px",
    color: "#66788A",
    lineHeight: "20px",
  },
  icon: {
    color: "rgba(71, 184, 129, 1)",
  },
}));

function CreaItem(props) {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemIcon>
        <AddIcon fontSize="large" className={classes.icon} />
      </ListItemIcon>
      <Typography className={classes.titolo}> {props.titolo} </Typography>
    </ListItem>
  );
}
export default CreaItem;
