/**
 *
 * SearchBar
 *
 */

import { SEARCH_BY_DATE, SEARCH_BY_DUE_DATE, SEARCH_BY_ID, SEARCH_BY_NAME } from 'components/SearchBar/constants';
import { Formik } from 'formik';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';
import messages from './messages';

import SearchBarForm from './SearchBarForm';

function SearchBar(props) {
  const { minimumLength, onSearch, searchField, showToDoSpecificFilters, showUserRegistrationRoleSelection } = props;
  const composedSearchFields = getToDoSpecificSearchField(searchField, showToDoSpecificFilters);
  const searchFormProps = { searchField: composedSearchFields, showToDoSpecificFilters, showUserRegistrationRoleSelection };

  function getToDoSpecificSearchField(searchFieldObject, showAdditionalSearchFields) {
    const newSearchTypes = !showAdditionalSearchFields ? searchFieldObject.searchTypes : [...searchFieldObject.searchTypes,
      {
        value: SEARCH_BY_DATE,
        display: <FormattedMessage {...messages.searchByDate} />,
      }, {
        value: SEARCH_BY_DUE_DATE,
        display: <FormattedMessage {...messages.searchByDueDate} />,
      },
    ];

    return {
      searchTypes: newSearchTypes,
      searchValueHintText: searchFieldObject.searchValueHintText,
    };
  }

  function initialFormValues() {
    let initialValues = { showInactive: false, searchType: SEARCH_BY_NAME };
    if (!isEmpty(searchField.searchTypes)) {
      initialValues = {
        showInactive: false,
        searchType: head(searchField.searchTypes).value,
      };
    }
    return initialValues;
  }

  return (
    <div>
      <Formik
        initialValues={initialFormValues(searchField)}
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
  showToDoSpecificFilters: PropTypes.bool,
  showUserRegistrationRoleSelection: PropTypes.bool,
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })).isRequired,
    searchValueHintText: PropTypes.node.isRequired,
  }),
};

SearchBar.defaultProps = {
  minimumLength: 3,
  showToDoSpecificFilters: false,
  showUserRegistrationRoleSelection: false,
  searchField: {
    searchTypes: [{
      value: SEARCH_BY_NAME,
      display: <FormattedMessage {...messages.searchByName} />,
    }, {
      value: SEARCH_BY_ID,
      display: <FormattedMessage {...messages.searchById} />,
    }],
    searchValueHintText: <FormattedMessage {...messages.hintText} />,
  },
};

export default SearchBar;
