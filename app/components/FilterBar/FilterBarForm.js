import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import FilterSection from 'components/FilterBar/FilterSection';
import FilterContainerGrid from 'components/FilterBar/FilterContainerGrid';
import FilterHeader from 'components/FilterBar/FilterHeader';
import StyledRaisedButton from 'components/StyledRaisedButton';
import SelectField from 'components/SelectField';
import messages from './messages';

function FilterBarForm(props) {
  const { dirty, isSubmitting, isValid, filterTypes, filterValueHintText, showFilter } = props;
  return (
    <Form>
      {showFilter &&
      <FilterSection>
        <FilterHeader>
          <FilterIcon color={'#336666'} />
          <FormattedMessage {...messages.filterHeader} />
        </FilterHeader>
        <FilterContainerGrid gap="5px" columns="250px 300px">
          {showFilter &&
          <SelectField
            fullWidth
            name="dateRangeCode"
            hintText={filterValueHintText}
            floatingLabelText={filterValueHintText}
          >
            {filterTypes && filterTypes.map((filterType) =>
              <MenuItem key={uniqueId()} value={filterType.value} primaryText={filterType.display} />,
            )}
          </SelectField>
          }
        </FilterContainerGrid>
        <FilterContainerGrid gap="5px" columns="120px 1fr">
          {showFilter &&
          <StyledRaisedButton
            fullWidth
            type="submit"
            disabled={!dirty || isSubmitting || !isValid}
          >
            <FormattedMessage {...messages.filterButtonLabel} />
          </StyledRaisedButton>
          }
        </FilterContainerGrid>
      </FilterSection>
      }
    </Form>
  );
}

FilterBarForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  showFilter: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  filterTypes: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    display: PropTypes.node,
  })),
  filterValueHintText: PropTypes.node,
};

export default FilterBarForm;
