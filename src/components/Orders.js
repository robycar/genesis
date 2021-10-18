import React, { useState } from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import ButtonNotClickedBlue from "../components/ButtonNotClickedBlue";
import "../styles/App.css";
import TestRunningTable from "./TestRunningTable";
import TestCaricatiTable from "./TestCaricatiTable";
import TestSchedulatiTable from "./TestSchedulatiTable";
import TestConclusiTable from "./TestConclusiTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
    marginBottom: "10px",
  },
  buttonClickedBlue: {
    backgroundColor: "#1665D8",
    color: "primary",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },

  buttonNotClickedBlue: {
    backgroundColor: "whute",
    border: "1px solid #1665D8",
    variant: "contained",
    color: "#1665D8",
    marginLeft: "10px",
    marginRight: "10px",
    width: "200px",
    height: "40px",
  },

  buttonRight: {
    display: "flex",
    justifyContent: "flex-end",
  },
  box: {
    width: "200px",
    height: "200px",
    margin: "10px",
    border: "1px solid black",
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();

  const [appState, changeState] = useState({
    activeObject: null,
    objects: [
      { id: 1, name: "Test Case Caricati" },
      { id: 2, name: "Test Case Schedulati" },
      { id: 3, name: "Test Case Running" },
      { id: 4, name: "Test Case Conclusi" },
    ],
  });

  function toggleActive(index) {
    changeState({ ...appState, activeObject: appState.objects[index] });
  }

  function toggleActiveStyles(index) {
    if (appState.objects[index] === appState.activeObject) {
      return "box nav-table-active";
    } else {
      return "box nav-table-inactive";
    }
  }

  return (
    <>
      <div className={classes.buttonContainer}>
        {appState.objects.map((elements, index) => (
          <ButtonNotClickedBlue
            key={index}
            nome={elements.name}
            className={toggleActiveStyles(index)}
            onClick={() => {
              toggleActive(index);
            }}
          />
        ))}
      </div>
      {appState.activeObject === null && <TestCaricatiTable />}
      {appState.objects[2] === appState.activeObject && <TestRunningTable />}
      {appState.objects[3] === appState.activeObject && <TestConclusiTable />}
      {appState.objects[0] === appState.activeObject && <TestCaricatiTable />}
      {appState.objects[1] === appState.activeObject && <TestSchedulatiTable />}
    </>
  );
}
