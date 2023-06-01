import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import About from "./pages/About";
import UserEdit from "./pages/UserEdit";
import UserRegister from "./pages/UserRegister";
import RegisterPatient from "./pages/RegisterPatient";
import EditPatient from "./pages/EditPatient";
import ChoicePatientEdit from "./pages/EditPatient/choicePatient";
import EditHospital from "./pages/EditHospital";
import ChoiceHospitalEdit from "./pages/EditHospital/choiceHospital";
import RegisterHospital from "./pages/RegisterHospital";
import EditDoctor from "./pages/EditDoctor";
import ChoiceDoctorEdit from "./pages/EditDoctor/choiceDoctor";
import Monitoring from "./pages/Monitoring";
import ChoicePatientOnReports from "./pages/Reports/Choice";
import Report from "./pages/Reports/Report";
import RegisterDoctor from "./pages/RegisterDoctor";
import { isAuthenticated } from "./services/auth";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ListPatient from "./pages/ListPatient";
import RegisterRaspberry from "./pages/RegisterRaspberry";
import ChoiceRaspberryMonitoring from "./pages/ListRaspberry";
import RaspberryMonitoring from "./pages/MonitoringRaspberry";
import ChoiceRaspberryReport from "./pages/RaspberryReport/Choice";

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
                    <PrivateRoute path="/about" component={About}
                    />
                    <PrivateRoute path="/registerhospital" component={RegisterHospital} />
                    <PrivateRoute path="/registerdoctor" component={RegisterDoctor} />
                    <PrivateRoute path="/registerpatient" component={RegisterPatient} />
                    <PrivateRoute path="/userregister" component={UserRegister} />
                    <PrivateRoute
                        path="/choice-patient-monitoring"
                        component={ListPatient}
                    />
                    <PrivateRoute path="/registermodule" component={RegisterRaspberry} />
                    <PrivateRoute path="/choice-module-monitoring" component={ChoiceRaspberryMonitoring} />
                    <PrivateRoute path="/monitoring-module/:moduleId" component={RaspberryMonitoring} />
                    <PrivateRoute
                        path="/choice-patient-reports"
                        component={ChoicePatientOnReports}
                    />
                    <PrivateRoute
                        path="/choice-patient-edit"
                        component={ChoicePatientEdit}
                    />
                    <PrivateRoute
                        path="/choice-doctor-edit"
                        component={ChoiceDoctorEdit}
                    />
                    <PrivateRoute
                        path="/choice-hospital-edit"
                        component={ChoiceHospitalEdit}
                    />
                    <PrivateRoute
                        path="/choice-raspberry-reports"
                        component={ChoiceRaspberryReport}
                    />

                    <PrivateRoute
                        path="/editpatient/:patientId"
                        component={EditPatient}
                    />

                    <PrivateRoute
                        path="/editdoctor/:doctorId"
                        component={EditDoctor}

                    />

                    <PrivateRoute
                        path="/useredit/:userId"
                        component={UserEdit}

                    />

                    <PrivateRoute
                        path="/edithospital/:hospitalId"
                        component={EditHospital}

                    />
                    <PrivateRoute path="/monitoring/:patientId" component={Monitoring} />
                    <PrivateRoute path="/report/:patientId" component={Report} />
                    
                    <Footer />
                </Sidebar>
            </>
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    );
}
