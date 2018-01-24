/**
*
* ManageLocation
*
*/

import React from 'react';
// import styled from 'styled-components';

// import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';
// import messages from './messages';
import styles from './styles.css';
import ManageLocationForm from './ManageLocationForm';


const initialValues = { };

function ManageLocation(props) {
  // const { onCreateLocation } = props;
  return (
    <div className={styles.root} >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // const { searchValue, showInactive, searchType } = values;
          // onCreateLocation();
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({})}
        render={() => <ManageLocationForm {...props} />}
      />
    </div>
  );
}

ManageLocation.propTypes = {

};

export default ManageLocation;
