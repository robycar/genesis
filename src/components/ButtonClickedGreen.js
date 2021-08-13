import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    '&:hover': {
      backgroundColor: "white",
      color: "#47B881",
  },
    backgroundColor: "#47B881",
    color: "white",
    border: "1px solid #47B881",
    marginRight: "10px",
    marginLeft: "10px",
    //width: "200px",
  },
}));

function ButtonClickedGreen(props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      size="large"
      onClick={props.onClick}
    >
      {props.nome}
    </Button>
  );
}
export default ButtonClickedGreen;
