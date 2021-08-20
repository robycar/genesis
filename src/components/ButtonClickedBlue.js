import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#1665D8",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },
}));

function ButtonClickedBlue(props) {

  return (
    <Button className={props.className} id={props.id} onClick={props.onClick} variant="contained" color="primary">
      {props.nome}
    </Button>
  );
}
export default ButtonClickedBlue;
