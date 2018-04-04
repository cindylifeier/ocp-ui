import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { MenuItem } from 'material-ui';
import { white } from 'material-ui/styles/colors';
import { FormattedMessage } from 'react-intl';
import FilterSection from 'components/FilterBar/FilterSection';
import FilterContainerGrid from 'components/FilterBar/FilterContainerGrid';
import FilterHeader from 'components/FilterBar/FilterHeader';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import StyledRaisedButton from 'components/StyledRaisedButton';
import uniqueId from 'lodash/uniqueId';
import SelectField from 'components/SelectField';
import messages from './messages';

function FilterBarForm(props) {
  const { dirty, isSubmitting, isValid, filterField: { filterTypes, filterValueHintText }, showFilter } = props;
  return (
    <Form>
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
                <MenuItem key={uniqueId()} value={filterType.dateRangeCode} primaryText={filterType.display} />,
              )}
            </SelectField>
          }
        </FilterContainerGrid>
        <FilterContainerGrid gap="5px" columns="120px 1fr">
          {showFilter &&
            <StyledRaisedButton
              fullWidth
              label={<FormattedMessage {...messages.filterButtonLabel} />}
              labelColor={white}
              type="submit"
              disabled={!dirty || isSubmitting || !isValid}
            />
          }
        </FilterContainerGrid>
      </FilterSection>
    </Form>
  );
}

FilterBarForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  showFilter: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  filterField: PropTypes.shape({
    filterTypes: PropTypes.arrayOf(PropTypes.shape({
      dateRangeCode: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })).isRequired,
    filterValueHintText: PropTypes.node.isRequired,
  }).isRequired,
};

export default FilterBarForm;
