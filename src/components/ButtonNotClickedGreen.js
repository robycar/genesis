import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    '&:hover': {
      backgroundColor: "#47B881",
      color: "white",
    },
    backgroundColor: "white",
    border: "1px solid #47B881",
    color: "#47B881",
    marginLeft: "10px",
    marginRight: "10px",
    // width: "200px",
  },
}));

function ButtonNotClickedGreen(props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={props.onClick}
      id={props.id}
      size={props.size}
    >
      {props.nome}
    </Button>
  );
}
export default ButtonNotClickedGreen;
