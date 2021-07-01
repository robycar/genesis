import { BrowserRouter, Switch, Route } from "react-router-dom";
import Amministrazione from "./pages/amministrazione/Amministrazione";
import AmministrazioneUtenze from "./pages/amministrazione/AmministrazioneUtenze";
import AmministrazioneRuoli from "./pages/amministrazione/AmministrazioneRuoli";
import AmministrazioneAutorizzazioni from "./pages/amministrazione/AmministrazioneAutorizzazioni";
import AmministrazioneGruppo from "./pages/amministrazione/AmministrazioneGruppo";
import AmministrazioneAddUtente from "./pages/amministrazione/AmministrazioneAddUtente";
import AmministrazioneCreaRuolo from "./pages/amministrazione/AmministrazioneCreaRuolo";
import Dashboard from "./pages/dashboard/Dashboard";
import Editing from "./pages/editing/Editing";
import Launching from "./pages/Launching";
import Report from "./pages/report/Report";
import ReportTestSuite from "./pages/report/ReportTestSuite";
import ReportTestCase from "./pages/report/ReportTestCase";
import Supporto from "./pages/Supporto";
import DashboardTestCase from "./pages/dashboard/DashboardTestCase";
import DashboardTestSuite from "./pages/dashboard/DashboardTestSuite";
import Documentation from "./pages/Documentation";
import ProvaModale from "./pages/ProvaModale";
import CreaLinea from "./pages/CreaLinea";
import OutboundProxy from "./pages/OutboundProxy";
import EditingLinee from "./pages/editing/EditingLinee";
import EditingOutboundProxy from "./pages/editing/EditingOutboundProxy";
import EditingTemplate from "./pages/editing/EditingTemplate";
import EditingTest from "./pages/editing/EditingTest";

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
        <Route path="/amministrazione/utenze" exact component={AmministrazioneUtenze} />
        <Route path="/amministrazione/ruoli" exact component={AmministrazioneRuoli} />
        <Route path="/amministrazione/autorizzazioni" exact component={AmministrazioneAutorizzazioni} /> 
        <Route path="/amministrazione/gruppo" exact component={AmministrazioneGruppo} /> 
        <Route path="/amministrazione/addutente" exact component={AmministrazioneAddUtente} /> 
        <Route path="/amministrazione/crearuolo" exact component={AmministrazioneCreaRuolo} /> 
        <Route path="/report" exact component={Report} />
        <Route path="/report/testsuite" exact component={ReportTestSuite} />
        <Route path="/report/testcase" exact component={ReportTestCase} />
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
