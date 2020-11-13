import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import Register from './pages/register/register.component';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
