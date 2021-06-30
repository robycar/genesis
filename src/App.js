import { BrowserRouter, Switch, Route } from "react-router-dom";
import Amministrazione from "./pages/Amministrazione";
import Dashboard from "./pages/dashboard/Dashboard";
import Editing from "./pages/Editing";
import Launching from "./pages/Launching";
import Report from "./pages/Report";
import Supporto from "./pages/Supporto";
import DashboardTestCase from "./pages/dashboard/DashboardTestCase";
import DashboardTestSuite from "./pages/dashboard/DashboardTestSuite";
import Documentation from "./pages/Documentation";
import ProvaModale from "./pages/ProvaModale";
import CreaLinea from "./pages/CreaLinea";
import OutboundProxy from "./pages/OutboundProxy";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/dashboard/testcase" exact component={DashboardTestCase} />
        <Route
          path="/dashboard/testsuite"
          exact
          component={DashboardTestSuite}
        />
        <Route path="/launching" exact component={Launching} />
        <Route path="/editing" exact component={Editing} />
        <Route path="/amministrazione" exact component={Amministrazione} />
        <Route path="/report" exact component={Report} />
        <Route path="/supporto" exact component={Supporto} />
        <Route path="/documentation" exact component={Documentation} />
        <Route path="/provaModale" exact component={ProvaModale} />
        <Route path="/creaLinea" exact component={CreaLinea} />
        <Route path="/outboundProxy" exact component={OutboundProxy} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
