import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputSelect from "../components/InputSelect";
import InputBase from "@material-ui/core/InputBase";
import { DialogTitle, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginLeft: "5%",
      marginRight: "5%",
      display: "flex",
      flexDirections: "column",
      padding: "1%",
    },
  },
  input: {
    display: "none",
  },
  inputAndButton: {
    display: "flex",
    alignItems: "center",
    flexDirections: "column",
  },
  buttonUpload: {
    marginTop: "1.5%",
  },
  inputSelect: {
    width: "250px",
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    // padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
  label: {
    mariginTop: "2%",
  },
}));

export default function UploadButtons(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>{props.label}</Typography>
      <div className={classes.inputAndButton}>
        <InputSelect />
        <label htmlFor="icon-button-file" className={classes.buttonUpload}>
          <Button
            variant="contained"
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            Upload
          </Button>
        </label>
      </div>
    </div>
  );
}
