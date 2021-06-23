import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#47B881",
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
      color="primary"
      size="large"
    >
      {props.nome}
    </Button>
  );
}
export default ButtonClickedGreen;
