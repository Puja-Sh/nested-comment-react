import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Comments from "./components/Comments";

function App() {
  return (
    <>
      <Router>
        <Switch>
          {/* <Route path="/" exact>
            <Home />
          </Route> */}
          <Route path="/" exact>
            <Comments />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
