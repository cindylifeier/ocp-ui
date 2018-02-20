import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { MenuItem, RaisedButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { teal500, white } from 'material-ui/styles/colors';
import messages from './messages';

import TextField from '../TextField';
import Checkbox from '../Checkbox';
import SelectField from '../SelectField';
import SearchSection from './SearchSection';
import SearchHeader from './SearchHeader';
import SearchContainerStyledGrid from './SearchContainerStyledGrid';
import SearchButtonContainerStyledGrid from './SearchButtonContainerStyledGrid';

export const SEARCH_BY_NAME = 'name';
export const SEARCH_BY_ID = 'logicalId';

function SearchBarForm(props) {
  const { isSubmitting, dirty, isValid } = props;
  return (
    <Form>
      <SearchSection>
        <SearchHeader>
          <ActionSearch color={'#336666'} />
          <FormattedMessage {...messages.searchHeader} />
        </SearchHeader>
        <SearchContainerStyledGrid gap="5px" columns="250px 300px">
          <SelectField
            fullWidth
            name="searchType"
          >
            <MenuItem value={SEARCH_BY_NAME} primaryText={<FormattedMessage {...messages.searchByName} />} />
            <MenuItem value={SEARCH_BY_ID} primaryText={<FormattedMessage {...messages.searchById} />} />
          </SelectField>
          <TextField
            fullWidth
            name="searchValue"
            hintText={<FormattedMessage {...messages.hintText} />}
          />
        </SearchContainerStyledGrid>
        <SearchContainerStyledGrid gap="5px" columns="70px 300px">
          <div>
            <FormattedMessage {...messages.filterLabel} />
          </div>
          <Checkbox
            name="showInactive"
            label={<FormattedMessage {...messages.includeInactive} />}
          />
        </SearchContainerStyledGrid>
        <SearchButtonContainerStyledGrid gap="5px" columns="120px 1fr">
          <RaisedButton
            fullWidth
            label="Search"
            backgroundColor={teal500}
            labelColor={white}
            type="submit"
            disabled={!dirty || isSubmitting || !isValid}
          />
        </SearchButtonContainerStyledGrid>
      </SearchSection>
    </Form>
  );
}

SearchBarForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default SearchBarForm;
