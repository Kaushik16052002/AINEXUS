import React from "react";
import Signup from "./Signup";
import "./App.css";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import Home from './components/pages/Home';


import DataGenerationPage from './components/pages/DataGenerationPage';
import DemandForecasting from './components/pages/DemandForecasting';
import FinancialForecasting from "./components/pages/FinancialForecasting";
import Cards from "./components/Cards";

function App() {
  return (
    
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/home" exact component={Home} />
              <Route path="/services" component={Services} />
              <Route path="/products" component={Products} />

              <Route path="/data-generation" component={DataGenerationPage} />
              <Route path="/demandforecasting" component={DemandForecasting} />
              <Route path="/financialforecasting" component={FinancialForecasting} />

            </Switch>
          </AuthProvider>
        </Router>
      </div>
   
  );
}

export default App;
