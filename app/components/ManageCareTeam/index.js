/**
 *
 * ManageCareTeam
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import styles from './styles.css';
import { mapToPatientName } from '../../containers/ManagePatientPage/api';
import ManageCareTeamForm from './ManageCareTeamForm';
import messages from './messages';
import { TEXT_MIN_LENGTH } from '../../containers/App/constants';

function ManageCareTeam(props) {
  const {
    selectedPatient,
    careTeamCategories,
    participantTypes,
    participantRoles,
    careTeamStatuses,
    hasParticipants,
    handleOpen,
    onSave,
  } = props;
  const minimumLength = TEXT_MIN_LENGTH;
  const propsFromContainer = {
    careTeamCategories,
    participantTypes,
    participantRoles,
    careTeamStatuses,
    hasParticipants,
    handleOpen,
  };
  return (
    <div>
      {selectedPatient &&
      <div>
        <div className={styles.title}>
          <FormattedMessage {...messages.title} />
        </div>
        <div className={styles.patientInfoSection}>
          <div>Patient:</div>
          <div className={styles.patientName}>
            <strong>{mapToPatientName(selectedPatient)}</strong>
          </div>
        </div>
        <Formik
          onSubmit={(values, actions) => {
            onSave(values, actions);
          }}
          validationSchema={() =>
            yup.lazy((values) => {
              let startDate = new Date();
              if (values.startDate) {
                startDate = values.startDate;
              }
              return yup.object().shape({
                careTeamName: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(minimumLength, (
                    <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
                category: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
                status: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
                startDate: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(new Date(), (<FormattedMessage {...messages.validation.minStartDate} />)),
                endDate: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(startDate, (<FormattedMessage {...messages.validation.minEndDate} />)),
              });
            })}
          render={(formikProps) => <ManageCareTeamForm {...formikProps} {...propsFromContainer} />}
        />
      </div>
      }
    </div>
  );
}

ManageCareTeam.propTypes = {
  hasParticipants: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedPatient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  careTeamCategories: PropTypes.array.isRequired,
  participantTypes: PropTypes.array.isRequired,
  participantRoles: PropTypes.array.isRequired,
  careTeamStatuses: PropTypes.array.isRequired,
};

export default ManageCareTeam;
