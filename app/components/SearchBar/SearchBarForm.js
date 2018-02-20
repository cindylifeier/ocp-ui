import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { MenuItem, RaisedButton } from 'material-ui';
import { FormattedMessage } from 'react-intl';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { teal500, white } from 'material-ui/styles/colors';
import styles from './styles.css';
import messages from './messages';

import TextField from '../TextField';
import Checkbox from '../Checkbox';
import SelectField from '../SelectField';
import SearchSection from './SearchSection';

export const SEARCH_BY_NAME = 'name';
export const SEARCH_BY_ID = 'logicalId';

function SearchBarForm(props) {
  const { isSubmitting, dirty, isValid } = props;
  return (
    <Form>
      <SearchSection>
        <div className={styles.searchHeader}>
          <ActionSearch color={'#336666'} />
          <FormattedMessage {...messages.searchHeader} />
        </div>
        <div className={styles.searchGridContainer}>
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
        </div>
        <div className={styles.filterGridContainer}>
          <div>
            <FormattedMessage {...messages.filterLabel} />
          </div>
          <Checkbox
            name="showInactive"
            label={<FormattedMessage {...messages.includeInactive} />}
          />
        </div>
        <div className={styles.buttonGridContainer}>
          <RaisedButton
            fullWidth
            label="Search"
            backgroundColor={teal500}
            labelColor={white}
            type="submit"
            disabled={!dirty || isSubmitting || !isValid}
          />
        </div>
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
