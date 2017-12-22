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
import { Switch, Route } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PatientDetailsPage from 'containers/PatientDetailsPage/Loadable';

import css from './App.css';
import { LoginPage } from '../LoginPage/index';


export default function App() {
  return (
    <div className={css.App}>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/patients/:id" component={PatientDetailsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
