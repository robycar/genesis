import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#47B881",
    width: "200px",
    height: "40px",
    marginRight: "10px",
  },
}));

function ButtonClickedGreen(props) {
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" color="primary">
      {props.nome}
    </Button>
  );
}
export default ButtonClickedGreen;
