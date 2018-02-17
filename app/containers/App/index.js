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

import React from 'react';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PatientsPage from 'containers/PatientsPage/Loadable';

import styles from './styles.css';
import LoginPage from '../LoginPage';
import Layout from '../../components/Layout';
import ManageLocationPage from '../ManageLocationPage';
import ManagePractitionerPage from '../ManagePractitionerPage';
import ManageOrganizationPage from '../ManageOrganizationPage';
import ManageCareTeamPage from '../ManageCareTeamPage';
import ManageHealthcareServicePage from '../ManageHealthcareServicePage';
import Notification from '../Notification';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import ManagePatientPage from '../ManagePatientPage/index';
import AssignHealthCareServiceToLocationPage from '../AssignHealthcareServiceToLocationPage';
import { AuthenticatedRoute } from '../../components/AuthenticatedRoute';


export function App() {
  return (
    <div>
      <Helmet
        titleTemplate="%s - Omnibus Care Plan"
        defaultTitle="Omnibus Care Plan"
      >
        <meta name="description" content="Omnibus Care Plan application" />
      </Helmet>
      <div className={styles.App}>
        <Switch>
          <Redirect exact from="/" to="/ocp-ui/login" />
          <Route exact path="/ocp-ui" component={LoginPage} />
          <Route path="/ocp-ui/login" component={LoginPage} />
          <Layout>
            <AuthenticatedRoute path="/ocp-ui/home" component={HomePage} />
            <AuthenticatedRoute path="/ocp-ui/patients" component={PatientsPage} />
            <AuthenticatedRoute path="/ocp-ui/manage-organization/:id?" component={ManageOrganizationPage} />
            <AuthenticatedRoute path="/ocp-ui/manage-practitioner/:id?" component={ManagePractitionerPage} />
            <AuthenticatedRoute path="/ocp-ui/manage-patient/:id?" component={ManagePatientPage} />
            <AuthenticatedRoute path="/ocp-ui/manage-location/:id?" component={ManageLocationPage} />
            <AuthenticatedRoute path="/ocp-ui/manage-care-team/:id?" component={ManageCareTeamPage} />
            <AuthenticatedRoute
              path="/ocp-ui/manage-health-care-service/:id?"
              component={ManageHealthcareServicePage}
            />
            <AuthenticatedRoute
              path="/ocp-ui/assign-healthcareservice-location/:id?"
              component={AssignHealthCareServiceToLocationPage}
            />
          </Layout>
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
