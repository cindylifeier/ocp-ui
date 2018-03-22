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

import messages from './messages';
import SearchBarForm from './SearchBarForm';

const SEARCH_BY_NAME = 'name';
const SEARCH_BY_ID = 'identifier';
const initialValues = { showInactive: false, searchType: SEARCH_BY_NAME };

function SearchBar(props) {
  const { minimumLength, onSearch, searchTypes } = props;
  const searchFormProps = { searchTypes };
  return (
    <div>
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
            .required((<FormattedMessage {...messages.validation.required} />)),
          showInactive: yup.boolean(),
        })}
        render={(formikProps) => <SearchBarForm {...formikProps} {...searchFormProps} />}
      />
    </div>
  );
}

SearchBar.propTypes = {
  minimumLength: PropTypes.number,
  onSearch: PropTypes.func.isRequired,
  searchTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    display: PropTypes.node.isRequired,
  })),
};

SearchBar.defaultProps = {
  minimumLength: 3,
  searchTypes: [
    {
      value: SEARCH_BY_NAME,
      display: <FormattedMessage {...messages.searchByName} />,
    },
    {
      value: SEARCH_BY_ID,
      display: <FormattedMessage {...messages.searchById} />,
    },
  ],
};

export default SearchBar;
