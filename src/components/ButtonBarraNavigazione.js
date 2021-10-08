import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    marginBottom: "20px",
  },
}));

var functions = localStorage.getItem("funzioni")?.split(",");

export function ButtonAmministrazione() {
  const classes = useStyles();
  return (
    <div className={classes.buttonContainer}>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
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
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/amministrazione/ruoli"
      >
        RUOLI
      </Button>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
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
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/amministrazione/gruppo"
      >
        GRUPPO
      </Button>
    </div>
  );
}

export function ButtonEditing() {
  const classes = useStyles();
  return (
    <div className={classes.buttonContainer}>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/editing/linee"
      >
        LINEE
      </Button>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/editing/outboundproxy"
      >
        OUTBOUND PROXY
      </Button>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/editing/template"
      >
        TEMPLATE
      </Button>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/editing/testcase"
      >
        TEST
      </Button>
    </div>
  );
}
export function ButtonEditingTest() {
  const classes = useStyles();
  return (
    <div className={classes.buttonTestContainer}>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/editing/testcase"
      >
        TEST CASE
      </Button>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/editing/testsuite"
      >
        TEST SUITE
      </Button>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/editing/testgeneratore"
      >
        TEST GENERATORE
      </Button>
    </div>
  );
}
export function ButtonEditingLinee() {
  const classes = useStyles();
  return (
    <>
      {/* <div className={classes.buttonContainer}>
        <Button
          className="button-green"
          component={NavLink}
          activeClassName="button-green-active"
          exact
          to="/editing/linee"
        >
          LINEE
        </Button>
        <Button
          className="button-green"
          component={NavLink}
          activeClassName="button-green-active"
          exact
          to="/editing/outboundproxy"
        >
          OUTBOUND PROXY
        </Button>
        <Button
          className="button-green"
          component={NavLink}
          activeClassName="button-green-active"
          exact
          to="/editing/template"
        >
          TEMPLATE
        </Button>
        <Button
          className="button-green"
          component={NavLink}
          activeClassName="button-green-active"
          exact
          to="/editing/testcase"
        >
          TEST
        </Button>
      </div> */}
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/editing/linee"
      >
        LINEE SIMULATORE
      </Button>
      <Button
        className="button-green"
        component={NavLink}
        activeClassName="button-green-active"
        exact
        to="/editing/lineegeneratore"
      >
        LINEE GENERATORE
      </Button>
    </>
  );
}
