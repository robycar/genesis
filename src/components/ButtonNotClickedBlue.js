import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    // backgroundColor: "white",
    // border: "1px solid #1665D8",
    // color: "#1665D8",
    // marginLeft: "10px",
    // marginRight: "10px",
    // width: "200px",
    // height: "40px",
    // lineHeight: "20px",
  },
}));

function ButtonNotClickedBlue(props) {

  return (
    <Button
      onClick={props.onClick}
      className={props.className}
      variant="contained"
      spacing={2}
      // color="primary"
    >
      {props.nome}
    </Button>
  );
}
export default ButtonNotClickedBlue;
