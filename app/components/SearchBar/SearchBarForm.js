import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { IconButton, MenuItem } from 'material-ui';
import { FormattedMessage } from 'react-intl';

import styles from './styles.css';
import messages from './messages';

import TextField from '../TextField';
import Checkbox from '../Checkbox';
import SelectField from '../SelectField';

// Material UI Styles
const iconButtonStyle = { top: '26px', height: '30px' };
const checkboxStyle = { marginTop: '40px', height: '30px' };
const dropdownMenuStyle = { top: '24px', width: '100%' };
const searchTextFieldStyle = { width: '150px' };
const searchTextFieldFloatingLabelStyle = { fontFamily: 'Roboto, sans-serif' };

export const SEARCH_BY_NAME = 'name';
export const SEARCH_BY_ID = 'logicalId';

function SearchBarForm(props) {
  const { isSubmitting, dirty, isValid } = props;
  return (
    <Form>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          <TextField
            name="searchValue"
            style={searchTextFieldStyle}
            floatingLabelStyle={searchTextFieldFloatingLabelStyle}
            hintText={<FormattedMessage {...messages.hintText} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText} />}
          />
        </div>
        <div className={styles.gridItem}>
          <SelectField
            name="searchType"
            style={dropdownMenuStyle}
          >
            <MenuItem value={SEARCH_BY_NAME} primaryText={<FormattedMessage {...messages.searchByName} />} />
            <MenuItem value={SEARCH_BY_ID} primaryText={<FormattedMessage {...messages.searchById} />} />
          </SelectField>
        </div>
        <div className={styles.gridItem}>
          <Checkbox
            name="showInactive"
            label={<FormattedMessage {...messages.includeInactive} />}
            style={checkboxStyle}
          />
        </div>
        <div className={styles.gridItem}>
          <IconButton
            style={iconButtonStyle}
            iconClassName="fa fa-search"
            tooltip={<FormattedMessage {...messages.buttonTooltip} />}
            type="submit"
            disabled={!dirty || isSubmitting || !isValid}
          />
        </div>
      </div>
    </Form>
  );
}

SearchBarForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default SearchBarForm;
