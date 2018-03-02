/**
 *
 * ConfirmPatientModal
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { PATIENTS_URL } from 'containers/App/constants';
import messages from './messages';

function ConfirmPatientModal(props) {
  return (
    <div>
      <Dialog open={props.isPatientModalOpen}>
        <RaisedButton
          label="Cancel"
          onClick={props.handlePatientModalClose}
        />
        <FormattedMessage {...messages.header} />
        <RaisedButton
          label="Continue"
          onClick={props.handlePatientModalClose}
          containerElement={<Link to={`${PATIENTS_URL}/${props.patientId}`} />}
        />
      </Dialog>
    </div>
  );
}

ConfirmPatientModal.propTypes = {
  isPatientModalOpen: PropTypes.bool.isRequired,
  handlePatientModalClose: PropTypes.func.isRequired,
  patientId: PropTypes.string.isRequired,
};

export default ConfirmPatientModal;
