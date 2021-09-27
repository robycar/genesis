import { BrowserRouter, Switch, Route } from "react-router-dom";
import Editing from "./pages/editing/Editing";
import Launching from "./pages/launching/Launching";
import Report from "./pages/report/Report";
import ReportTestSuite from "./pages/report/ReportTestSuite";
import ReportTestCase from "./pages/report/ReportTestCase";
//import Supporto from "./pages/Supporto";
import DashboardTestCase from "./pages/dashboard/DashboardTestCase";
import DashboardTestSuite from "./pages/dashboard/DashboardTestSuite";
import DashboardTestGeneratore from "./pages/dashboard/DashboardTestGeneratore";
import Documentation from "./pages/Documentation";
import ProvaModale from "./pages/ProvaModale";
import EditingLinee from "./pages/editing/EditingLinee";
import EditingOutboundProxy from "./pages/editing/EditingOutboundProxy";
import EditingOutboundProxyCreaOBP from "./pages/editing/EditingOutboundProxyCreaOBP";
import EditingTemplate from "./pages/editing/EditingTemplate";
import EditingTemplateCreaTemplate from "./pages/editing/EditingTemplateCreaTemplate";
// import EditingTest from "./pages/editing/EditingTest";
import Amministrazione from "./pages/amministrazione/Amministrazione";
import AmministrazioneAutorizzazioni from "./pages/amministrazione/AmministrazioneAutorizzazioni";
import AmministrazioneRuoli from "./pages/amministrazione/AmministrazioneRuoli";
import AmministrazioneUtenze from "./pages/amministrazione/AmministrazioneUtenze";
import Supporto from "./pages/supporto/Supporto";
import EditingLineeCreaLinea from "./pages/editing/EditingLineeCreaLinea";
import EditingTestCase from "./pages/editing/EditingTestCase";
import EditingTestCreaTestCase from "./pages/editing/EditingTestCreaTestCase";
import EditingTestSuite from "./pages/editing/EditingTestSuite";
import EditingTestSuiteCreaTestSuite from "./pages/editing/EditingTestSuiteCreaTestSuite";
import AmministrazioneGruppo from "./pages/amministrazione/AmministrazioneGruppo";
import AmministrazioneAddUtente from "./pages/amministrazione/AmministrazioneAddUtente";
import AmministrazioneCreaRuolo from "./pages/amministrazione/AmministrazioneCreaRuolo";
import AmministrazioneViewGruppo from "./pages/amministrazione/AmministrazioneViewGruppo";
import AmministrazioneViewGruppoCreaGruppo from "./pages/amministrazione/AmministrazioneViewGruppoCreaGruppo";
import AmministrazioneViewGruppoAddPartecipante from "./pages/amministrazione/AmministrazioneViewGruppoAddPartecipante";
// import LoginChiara from "./pages/login/LoginChiara";
import Login from "./pages/Login";
import EditingLineeGeneratore from "./pages/editing/EditingLineeGeneratore";
import EditingTestGeneratore from "./pages/editing/EditingTestGeneratore";
import EditingLineaCreaLineaGeneratore from "./pages/editing/EditingLineaCreaLineaGeneratore";
import EditingTestGeneratoreCreaTestGeneratore from "./pages/editing/EditingTestGeneratoreCreaTestGeneratore";

import LaunchingTetsCase from "./pages/launching/LaunchingTestCase";
import LaunchingTetsSuite from "./pages/launching/LaunchingTestSuite";
import LaunchingTestGeneratore from "./pages/launching/LaunchingTestGeneratore";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" exact component={Dashboard} /> */}
        <Route path="/" exact component={Login} />
        <Route path="/dashboard/testcase" exact component={DashboardTestCase} />
        <Route
          path="/dashboard/testsuite"
          exact
          component={DashboardTestSuite}
        />
         <Route
          path="/dashboard/testgeneratore"
          exact
          component={DashboardTestGeneratore}
        />
        <Route path="/launching" exact component={LaunchingTetsCase} />
        <Route path="/launching/testcase" exact component={LaunchingTetsCase} />
        <Route path="/launching/testsuite" exact component={LaunchingTetsSuite} />
        <Route path="/launching/testgeneratore" exact component={LaunchingTestGeneratore} />
        <Route path="/editing" exact component={Editing} />
        <Route path="/editing/linee" exact component={EditingLinee} />
        <Route
          path="/editing/linee/crealinea"
          exact
          component={EditingLineeCreaLinea}
        />
        <Route
          path="/editing/outboundproxy"
          exact
          component={EditingOutboundProxy}
        />
        <Route
          path="/editing/outboundproxy/creaobp"
          exact
          component={EditingOutboundProxyCreaOBP}
        />
        <Route path="/editing/template" exact component={EditingTemplate} />
        <Route
          path="/editing/template/createmplate"
          exact
          component={EditingTemplateCreaTemplate}
        />
        {/* <Route
          path="/editing/test/testcase"
          exact
          component={EditingTestTestCase}
        /> */}
        <Route path="/editing/testcase" exact component={EditingTestCase} />
        <Route path="/editing/testsuite" exact component={EditingTestSuite} />
        <Route
          path="/editing/testgeneratore"
          exact
          component={EditingTestGeneratore}
        />
        <Route
          path="/editing/linee/crealineageneratore"
          exact
          component={EditingLineaCreaLineaGeneratore}
        />

        <Route
          path="/editing/testcreatestcase"
          exact
          component={EditingTestCreaTestCase}
        />

        <Route
          path="/editing/testgeneratore/createstgeneratore"
          exact
          component={EditingTestGeneratoreCreaTestGeneratore}
        />


        <Route
          path="/editing/testsuite/createstsuite"
          exact
          component={EditingTestSuiteCreaTestSuite}
        />
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
        <Route
          path="/amministrazione/gruppo"
          exact
          component={AmministrazioneGruppo}
        />
        <Route
          path="/amministrazione/addutente"
          exact
          component={AmministrazioneAddUtente}
        />
        <Route
          path="/amministrazione/crearuolo"
          exact
          component={AmministrazioneCreaRuolo}
        />
        <Route path="/report" exact component={Report} />
        <Route path="/report/testsuite" exact component={ReportTestSuite} />
        <Route path="/report/testcase" exact component={ReportTestCase} />
        <Route path="/supporto" exact component={Supporto} />
        <Route path="/supporto/support" exact component={Supporto} />
        <Route path="/documentation" exact component={Documentation} />
        <Route path="/provaModale" exact component={ProvaModale} />
        <Route
          path="/amministrazione/viewgruppo"
          exact
          component={AmministrazioneViewGruppo}
        />
        <Route
          path="/amministrazione/creagruppo"
          exact
          component={AmministrazioneViewGruppoCreaGruppo}
        />
        <Route
          path="/amministrazione/addpartecipante"
          exact
          component={AmministrazioneViewGruppoAddPartecipante}
        />
        <Route
          path="/editing/lineegeneratore"
          exact
          component={EditingLineeGeneratore}
        />
        {/* <Route path="/login" exact component={LoginChiara} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;