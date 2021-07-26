import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#90caf9",
    color:"blue",
    border:"1px solid blue",
    marginRight: "10px",
    marginLeft: "10px",
    //width: "200px",
    '&:hover': {
      backgroundColor: "transparent",
   },
  },
  
}));

function ButtonExport(props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      size="large"
    >
      Export
    </Button>
  );
}
export default ButtonExport;
