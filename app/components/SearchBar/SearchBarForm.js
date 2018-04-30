import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import ActionSearch from '@material-ui/icons/Search';
import MenuItem from 'material-ui/MenuItem';
import uniqueId from 'lodash/uniqueId';
import { Cell } from 'styled-css-grid';

import StyledFormikCheckbox from 'components/StyledFormikCheckbox';
import StyledRaisedButton from 'components/StyledRaisedButton';
import SearchSection from './SearchSection';
import SearchContainerGrid from './SearchContainerGrid';
import SearchButtonContainerGrid from './SearchButtonContainerGrid';
import StyledSearchField from './StyledSearchField';
import StyledTextField from './StyledTextField';
import messages from './messages';

function SearchBarForm(props) {
  const { isSubmitting, dirty, isValid, searchField: { searchTypes, searchValueHintText }, showToDoSpecificFilters } = props;
  return (
    <Form>
      <SearchSection>
        <div>
        </div>
        <SearchContainerGrid gap="5px" columns={'30px 130px 150px 100px'}>
          <ActionSearch color={'#336666'} />
          <StyledSearchField
            fullWidth
            name="searchType"
          >
            {searchTypes && searchTypes.map((searchType) =>
              <MenuItem key={uniqueId()} value={searchType.value} primaryText={searchType.display} />,
            )}
          </StyledSearchField>
          <StyledTextField
            fullWidth
            name="searchValue"
            hintText={searchValueHintText}
          />
        </SearchContainerGrid>
        <SearchContainerGrid gap="5px" columns="60px 140px 140px 140px">
          {!showToDoSpecificFilters &&
          <div>
            <FormattedMessage {...messages.filterLabel} />
          </div>
          }
          {!showToDoSpecificFilters &&
          <StyledFormikCheckbox
            name="showInactive"
            label={<FormattedMessage {...messages.includeInactive} />}
          />
          }
          {showToDoSpecificFilters &&
          <Cell>
            <FormattedMessage {...messages.filterLabel} />
          </Cell>
          }
          {showToDoSpecificFilters &&
          <Cell>
            <StyledFormikCheckbox
              name="dueToday"
              label={<FormattedMessage {...messages.status.dueToday} />}
            />
          </Cell>
          }
          {showToDoSpecificFilters &&
          <Cell>
            <StyledFormikCheckbox
              name="upcoming"
              label={<FormattedMessage {...messages.status.upcoming} />}
            />
          </Cell>
          }
          {showToDoSpecificFilters &&
          <Cell>
            <StyledFormikCheckbox
              name="overDue"
              label={<FormattedMessage {...messages.status.overDue} />}
            />
          </Cell>
          }
        </SearchContainerGrid>

        <SearchButtonContainerGrid gap="5px" columns="120px 1fr">
          <StyledRaisedButton
            fullWidth
            type="submit"
            disabled={!dirty || isSubmitting || !isValid}
          >
            <FormattedMessage {...messages.searchButton} />
          </StyledRaisedButton>
        </SearchButtonContainerGrid>
      </SearchSection>
    </Form>
  );
}

SearchBarForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  showToDoSpecificFilters: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  searchField: PropTypes.shape({
    searchTypes: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      display: PropTypes.node.isRequired,
    })).isRequired,
    searchValueHintText: PropTypes.node.isRequired,
  }).isRequired,
};

export default SearchBarForm;
