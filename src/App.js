import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import Register from './pages/register/register.component';
import Header from './components/header/header.component';
import Login from './pages/login/login.component';


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
