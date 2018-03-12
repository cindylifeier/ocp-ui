/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import Authentication from 'containers/Authentication';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage';
import ManageAppointmentPage from 'containers/ManageAppointmentPage';
import ManageCareTeamPage from 'containers/ManageCareTeamPage';
import ManageHealthcareServicePage from 'containers/ManageHealthcareServicePage';
import ManageLocationPage from 'containers/ManageLocationPage';
import ManageOrganizationPage from 'containers/ManageOrganizationPage';
import ManagePatientPage from 'containers/ManagePatientPage/index';
import ManagePractitionerPage from 'containers/ManagePractitionerPage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PatientPage from 'containers/PatientPage';
import PatientsPage from 'containers/PatientsPage/Loadable';
import 'font-awesome/css/font-awesome.min.css';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Redirect, Route, Switch } from 'react-router-dom';
import { compose } from 'redux';
import CareCoordinatorPage from 'containers/CareCoordinatorPage';
import AssignHealthCareServiceToLocationPage from 'containers/AssignHealthcareServiceToLocationPage';
import ManageTaskPage from 'containers/ManageTaskPage';
import ManageActivityDefinitionPage from 'containers/ManageActivityDefinitionPage';
import ManageRelatedPersonPage from 'containers/ManageRelatedPersonPage';
import Notification from 'containers/Notification';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import './styles.css';
import ManageCommunicationPage from '../ManageCommunicationPage';

export function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - Omnibus Care Plan"
        defaultTitle="Omnibus Care Plan"
      >
        <meta name="description" content="Omnibus Care Plan application" />
      </Helmet>
      <div>
        <Switch>
          <Redirect exact from="/" to="/ocp-ui/login" />
          <Route exact path="/ocp-ui" component={LoginPage} />
          <Route path="/ocp-ui/login" component={LoginPage} />
          {/* Import all security page MUST put inside Authorization component */}
          <Authentication>
            <Route path="/ocp-ui/home" component={HomePage} />
            <Route exact path="/ocp-ui/patients" component={PatientsPage} />
            <Route exact path="/ocp-ui/care-coordinator" component={CareCoordinatorPage} />
            <Route exact path="/ocp-ui/patients/:id" component={PatientPage} />
            <Route path="/ocp-ui/manage-organization/:id?" component={ManageOrganizationPage} />
            <Route path="/ocp-ui/manage-practitioner/:id?" component={ManagePractitionerPage} />
            <Route path="/ocp-ui/manage-patient/:id?" component={ManagePatientPage} />
            <Route path="/ocp-ui/manage-location/:id?" component={ManageLocationPage} />
            <Route path="/ocp-ui/manage-care-team/:id?" component={ManageCareTeamPage} />
            <Route path="/ocp-ui/manage-healthcare-service/:id?" component={ManageHealthcareServicePage} />
            <Route
              path="/ocp-ui/assign-healthcareservice-location/:id?"
              component={AssignHealthCareServiceToLocationPage}
            />
            <Route path="/ocp-ui/manage-task/:id?" component={ManageTaskPage} />
            <Route path="/ocp-ui/manage-activity-definition/:id?" component={ManageActivityDefinitionPage} />
            <Route path="/ocp-ui/manage-related-person/:id?" component={ManageRelatedPersonPage} />
            <Route path="/ocp-ui/manage-appointment/:id?" component={ManageAppointmentPage} />
            <Route path="/ocp-ui/manage-communication/:id?" component={ManageCommunicationPage} />
          </Authentication>
          <Route component={NotFoundPage} />
        </Switch>
        <Notification />
      </div>
    </div>
  );
}

const withSaga = injectSaga({ key: 'App', saga });

export default compose(
  withSaga,
)(App);
