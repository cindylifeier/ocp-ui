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
import { Route, Switch } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PatientDetailsPage from 'containers/PatientDetailsPage/Loadable';
import { LoginPage } from '../LoginPage/index';
import { ManagePractitionerPage } from '../ManagePractitionerPage';
import Layout from '../../components/Layout';

import styles from './styles.css';


export default function App() {
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
          <Route exact path="/" component={LoginPage} />
          <Route path="/login" component={LoginPage} />
          <Layout>
            <Route path="/home" component={HomePage} />
            <Route exact path="/manage-practitioner" component={ManagePractitionerPage} />
            <Route path="/manage-practitioner/:id" component={ManagePractitionerPage} />
            <Route path="/patients/:id" component={PatientDetailsPage} />
          </Layout>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  );
}
