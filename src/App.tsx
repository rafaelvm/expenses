import ExpensesTable from "./components/ExpensesTable/ExpensesTable";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/despesas">
          <ExpensesTable />
        </Route>
        <Redirect to={{ pathname: "/despesas" }} />
      </Switch>
    </Router>
  );
}

export default App;
