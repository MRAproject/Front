import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
// import AddCar from "./components/addCar/addCar";
// import RemoveCar from './components/removeCar/removeCar';
import EditUser from './components/editUser/editUser'
import ManageCars from './components/manageCars/manageCars'
import Login from "./components/login/login";
import Navbar from './components/common/navbar/navbar'
import { Provider } from "react-redux";
import store from "./store/store";
import './sass/main.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      
        <BrowserRouter>
          <div>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/addcar" component={AddCar} />
            <Route exact path="/removecar" component={RemoveCar} /> */}
            <Route exact path="/edituser" component={EditUser} />
            <Route exact path="/manageCars" component={ManageCars} />
          </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
