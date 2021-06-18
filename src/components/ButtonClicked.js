import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  buttonClickedGreen: {
    backgroundColor: "#47B881",
    color: "primary",
    width: "200px",
    height: "40px",
    marginRight: "10px",
  },
}));

function ButtonClicked() {
  const classes = useStyles();

  return (
    <Button
      className={classes.buttonClickedGreen}
      variant="contained"
      color="primary"
    >
      Bottone{" "}
    </Button>
  );
}
export default ButtonClicked;
