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
import { Route, Switch } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PatientDetailsPage from 'containers/PatientDetailsPage/Loadable';

import styles from './styles.css';
import { LoginPage } from '../LoginPage/index';
import Layout from '../../components/Layout';
import ManageLocationPage from '../ManageLocationPage/index';
import saga from './saga';
import injectSaga from '../../utils/injectSaga';
import ManageOrganizationPage from '../ManageOrganizationPage';
import Notification from '../Notification';


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
          <Route exact path="/ocp-ui" component={LoginPage} />
          <Route path="/ocp-ui/login" component={LoginPage} />
          <Layout>
            <Route path="/ocp-ui/home" component={HomePage} />
            <Route path="/ocp-ui/patients/:id" component={PatientDetailsPage} />
            <Route path="/manage-organization" component={ManageOrganizationPage} />
            <Route path="/ocp-ui/manage-location/" component={ManageLocationPage} />
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
