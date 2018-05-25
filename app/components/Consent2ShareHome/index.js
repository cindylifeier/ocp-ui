/**
 *
 * Consent2ShareHome
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page';
import PatientBanner from './PatientBanner';
import ConsentPanel from './ConsentPanel';


function Consent2ShareHome(props) {
  return (
    <Page color="secondary">
      <PatientBanner patient={props.patient} />
      <ConsentPanel />
    </Page>
  );
}

Consent2ShareHome.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }).isRequired,
};

export default Consent2ShareHome;
