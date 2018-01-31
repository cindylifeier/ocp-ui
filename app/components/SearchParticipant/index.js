/**
*
* SearchParticipant
*
*/

import React from 'react';
import yup from 'yup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import { Formik } from 'formik';
import { teal500, white } from 'material-ui/styles/colors';
import styles from './styles.css';
import messages from './messages';

function SearchParticipant(props) {
  const { onSearch } = props;
  return (
    <div className={styles.root} >
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          onSearch(values);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          // name: yup.string()
          //   .required((<FormattedMessage {...messages.validation.required} />))
          //   .min(minimumLength, (
          //     <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          // identifierValue: yup.string()
          //   .required((<FormattedMessage {...messages.validation.required} />))
          //   .min(minimumLength, (
          //     <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
        })}
        render={() => (
          <form>
            <div className={styles.gridContainer}>
              <div className={styles.gridItem}>
                <div className={styles.buttonGroup}>
                  <RaisedButton
                    backgroundColor={teal500}
                    labelColor={white}
                    label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
                    primary
                    // disabled={!dirty || isSubmitting || !isValid}
                  />
                </div>
              </div>
            </div>
            <div className={styles.gridContainer}>
              <div className={styles.gridItem}>
                <p> Participant Table goes here!!</p>
              </div>
            </div>
          </form>
          )
        }
      />
    </div>
  );
}

SearchParticipant.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchParticipant;
