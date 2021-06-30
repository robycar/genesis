import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Editing from "./pages/editing/Editing";
import Launching from "./pages/Launching";
import Report from "./pages/Report";
import Supporto from "./pages/Supporto";
import DashboardTestCase from "./pages/dashboard/DashboardTestCase";
import DashboardTestSuite from "./pages/dashboard/DashboardTestSuite";
import Documentation from "./pages/Documentation";
import ProvaModale from "./pages/ProvaModale";
import CreaLinea from "./pages/CreaLinea";
import EditingLinee from "./pages/editing/EditingLinee";
import EditingOutboundProxy from "./pages/editing/EditingOutboundProxy";
import EditingTemplate from "./pages/editing/EditingTemplate";
import EditingTest from "./pages/editing/EditingTest";
import Amministrazione from "./pages/amministrazione/Amministrazione";
import AmministrazioneAutorizzazioni from "./pages/amministrazione/AmministrazioneAutorizzazioni";
import AmministrazioneRuoli from "./pages/amministrazione/AmministrazioneRuoli";
import AmministrazioneUtenze from "./pages/amministrazione/AmministrazioneUtenze";

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
        <Route path="/editing/linee" exact component={EditingLinee} />
        <Route
          path="/editing/outboundproxy"
          exact
          component={EditingOutboundProxy}
        />
        <Route path="/editing/template" exact component={EditingTemplate} />
        <Route path="/editing/test" exact component={EditingTest} />
        <Route path="/amministrazione" exact component={Amministrazione} />
        <Route
          path="/amministrazione/utenze"
          exact
          component={AmministrazioneUtenze}
        />
        <Route
          path="/amministrazione/ruoli"
          exact
          component={AmministrazioneRuoli}
        />
        <Route
          path="/amministrazione/autorizzazioni"
          exact
          component={AmministrazioneAutorizzazioni}
        />

        <Route path="/report" exact component={Report} />
        <Route path="/supporto" exact component={Supporto} />

        <Route path="/documentation" exact component={Documentation} />
        <Route path="/provaModale" exact component={ProvaModale} />
        <Route path="/creaLinea" exact component={CreaLinea} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
