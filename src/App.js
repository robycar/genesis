import { BrowserRouter, Switch, Route } from "react-router-dom";
import Amministrazione from "./pages/Amministrazione";
import Dashboard from "./pages/Dashboard";
import Editing from "./pages/Editing";
import Launching from "./pages/Launching";
import Report from "./pages/Report";
import Supporto from "./pages/Supporto";
import Documentation from "./pages/Documentation";
import ProvaModale from "./pages/ProvaModale";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/launching" exact component={Launching} />
        <Route path="/editing" exact component={Editing} />
        <Route path="/amministrazione" exact component={Amministrazione} />
        <Route path="/report" exact component={Report} />
        <Route path="/supporto" exact component={Supporto} />
        <Route path="/documentation" exact component={Documentation} />
        <Route path="/provaModale" exact component={ProvaModale} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
