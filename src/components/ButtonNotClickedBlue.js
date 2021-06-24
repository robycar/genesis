import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // button: {
  //   backgroundColor: "white",
  //   border: "1px solid #1665D8",
  //   color: "#1665D8",
  //   marginLeft: "10px",
  //   marginRight: "10px",
  //   width: "200px",
  //   height: "40px",
  // },
}));

function ButtonNotClickedBlue(props) {
  const classes = useStyles();

  return (
    <Button
      onClick={props.onClick}
      className={props.className}
      variant="contained"
      // color="primary"
    >
      {props.nome}
    </Button>
  );
}
export default ButtonNotClickedBlue;
