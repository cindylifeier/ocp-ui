/**
*
* FilterBar
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import yup from 'yup';
import FilterBarForm from 'components/FilterBar/FilterBarForm';
import messages from './messages';

function FilterBar(props) {
  const { onFilter, filterField, showFilter } = props;
  const filterFormProps = {
    filterField,
    showFilter,
  };
  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          const { dateRangeCode } = values;
          onFilter(dateRangeCode);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          dateRangeCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={(formikProps) => <FilterBarForm {...formikProps} {...filterFormProps} />}
      />
    </div>
  );
}

FilterBar.propTypes = {
  showFilter: PropTypes.bool,
  onFilter: PropTypes.func,
  filterField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      dateRangeCode: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })),
    filterValueHintText: PropTypes.node.isRequired,
  }),
};

export default FilterBar;
