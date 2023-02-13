import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login/";
import About from "./pages/About/";
import UserEdit from "./pages/UserEdit";
import UserRegister from "./pages/UserRegister";
import RegisterPatient from "./pages/RegisterPatient";
import EditPatient from "./pages/EditPatient";
import ChoicePatientEdit from "./pages/EditPatient/choicePatient";
import Monitoring from "./pages/Monitoring/";
import ChoicePatientOnReports from "./pages/Reports/Choice";
import Report from "./pages/Reports/Report";
import RegisterDoctor from "./pages/RegisterDoctor/";
import { isAuthenticated } from "./services/auth";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ListPatient from "./pages/ListPatient";

/* Função destinada para possibilitar acesso somente as rotas com autenticação */
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <Switch>
      {/* Rotas acessadas sem autenticação */}
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={() => <h1>SignUp</h1>} />
      <>
        {/*<Navbar/>*/}
        <Sidebar>
          {/* Rotas acessadas somente com autenticação */}
          <PrivateRoute path="/login" component={Login} />
          <PrivateRoute path="/about" component={About} />
          <PrivateRoute path="/registerdoctor" component={RegisterDoctor} />
          <PrivateRoute path="/registerpatient" component={RegisterPatient} />
          <PrivateRoute
            path="/choice-patient-monitoring"
            component={ListPatient}
          />
          <PrivateRoute
            path="/choice-patient-reports"
            component={ChoicePatientOnReports}
          />
          <PrivateRoute
            path="/choice-patient-edit"
            component={ChoicePatientEdit}
          />
          <PrivateRoute
            path="/editpatient/:patientId"
            component={EditPatient}
          />
          <PrivateRoute path="/monitoring/:patientId" component={Monitoring} />
          <PrivateRoute path="/report/:patientId" component={Report} />
          <PrivateRoute path="/userregister" component={UserRegister} />
          <PrivateRoute path="/useredit/:id" component={UserEdit} />
          <Footer />
        </Sidebar>
      </>
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  );
}
