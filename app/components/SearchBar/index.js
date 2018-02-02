/**
 *
 * SearchBar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';

import styles from './styles.css';
import messages from './messages';
import SearchBarForm, { SEARCH_BY_ID, SEARCH_BY_NAME } from './SearchBarForm';

const initialValues = { showInactive: false, searchType: SEARCH_BY_NAME };
const regexMatchesSearchTypes = new RegExp(`(${SEARCH_BY_NAME}|${SEARCH_BY_ID})`);

function SearchBar(props) {
  const { minimumLength, onSearch } = props;
  return (
    <div className={styles.root}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const { searchValue, showInactive, searchType } = values;
          onSearch(searchValue, showInactive, searchType);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          searchValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (<FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          searchType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .matches(regexMatchesSearchTypes, (<FormattedMessage {...messages.validation.invalid} />)),
          showInactive: yup.boolean(),
        })}
        render={SearchBarForm}
      />
    </div>
  );
}

SearchBar.propTypes = {
  minimumLength: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
