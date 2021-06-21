import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "white",
    border: "1px solid #47B881",
    color: "#47B881",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },
}));

function ButtonNotClickedGreen(props) {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" color="primary">
      {props.nome}
    </Button>
  );
}
export default ButtonNotClickedGreen;
