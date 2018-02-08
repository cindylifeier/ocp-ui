import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import styles from './styles.css';
import messages from './messages';


function ManageHealthcareServiceForm(props) {
  const { organization } = props;
  return (
    <div>
      <div className={styles.title}>
        <FormattedMessage {...messages.title} />
      </div>
      <Form>
        <div className={styles.organizationName}>
          {<FormattedMessage {...messages.hintText.organizationNameLabel} />}
          <strong> {organization.name}</strong>
        </div>
      </Form>
    </div>
  );
}

ManageHealthcareServiceForm.propTypes = {
  organization: PropTypes.object.isRequired,
};

export default ManageHealthcareServiceForm;
