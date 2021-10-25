import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../styles/App.css"

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginBottom: "20px",
  },
  buttonTestContainer: {
    marginBottom: "10px",
  },
  buttonLinee: {
    marginBottom: "10px",
  }
}));

var functions = localStorage.getItem("funzioni")?.split(",");

export function ButtonAmministrazione(props) {
  const classes = useStyles();
  return (
    <div className={classes.buttonContainer}>
      <Button
        className={props.nome==="utenze"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/amministrazione/utenze"
        disabled={
          functions.indexOf("user.view") === -1 &&
          (functions.indexOf("group.view") === -1 ||
            functions.indexOf("level.view") === -1)
        }
      >
        UTENZE
      </Button>
      <Button
        className={props.nome==="ruoli"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/amministrazione/ruoli"
      >
        RUOLI
      </Button>
      <Button
        className={props.nome==="autorizzazioni"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/amministrazione/autorizzazioni"
        disabled={
          functions.indexOf("level.view") === -1 ||
          functions.indexOf("level.edit") === -1
        }
      >
        AUTORIZZAZIONI
      </Button>
      <Button
        className={props.nome==="gruppo"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/amministrazione/gruppo"
      >
        GRUPPO
      </Button>
    </div>
  );
}

export function ButtonEditing(props) {
  const classes = useStyles();
  return (
    <div className={classes.buttonContainer}>
      <Button
        className={props.nome ==="linee" ?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/editing/linee"
        disabled={
          functions.indexOf("linea.view") === -1 &&
          functions.indexOf("linea.create") === -1 &&
          functions.indexOf("linea.view") === -1 &&
          functions.indexOf("linea.create") === -1
        }
      >
        LINEE
      </Button>
      <Button
        className={props.nome==="obp"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/editing/outboundproxy"
      >
        OUTBOUND PROXY
      </Button>
      <Button
        className={props.nome==="template"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/editing/template"
      >
        TEMPLATE
      </Button>
      <Button
        className={props.nome==="test"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/editing/testcase"
      >
        TEST
      </Button>
    </div>
  );
}
export function ButtonEditingTest(props) {
  const classes = useStyles();
  return (
    <div className={classes.buttonTestContainer}>
      <Button
        className={props.nome==="testcase"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/editing/testcase"
      >
        TEST CASE
      </Button>
      <Button
        className={props.nome==="testsuite"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/editing/testsuite"
      >
        TEST SUITE
      </Button>
      <Button
        className={props.nome==="testgeneratore"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/editing/testgeneratore"
      >
        TEST GENERATORE
      </Button>
    </div>
  );
}
export function ButtonEditingLinee(props) {
  const classes = useStyles();
  return (
     <div className={classes.buttonLinee}>
      <Button
        className={props.nome==="simulatore"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/editing/linee"
        disabled={
          functions.indexOf("linea.view") === -1 &&
          functions.indexOf("linea.create") === -1
        }
      >
        LINEE SIMULATORE
      </Button>
      <Button
        className={props.nome==="generatore"?"button-green-active":"button-green"}
        component={NavLink}
        exact
        to="/editing/lineegeneratore"
        disabled={
          functions.indexOf("lineagen.view") === -1 &&
          functions.indexOf("lineagen.create") === -1
        }
      >
        LINEE GENERATORE
      </Button>
      </div>
    
  );
}
