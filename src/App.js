import { BrowserRouter, Switch, Route } from "react-router-dom";
import Amministrazione from "./pages/Amministrazione";
import Dashboard from "./pages/Dashboard";
import Editing from "./pages/Editing";
import Launching from "./pages/Launching";
import Report from "./pages/Report";
import Supporto from "./pages/Supporto";

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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
