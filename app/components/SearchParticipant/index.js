/**
*
* SeaachParticipant
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import { teal500, white } from 'material-ui/styles/colors';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import styles from './styles.css';
import messages from './messages';
import TextField from '../TextField';
import SelectField from '../SelectField';
import { fieldStyle, floatingLabelStyle, iconButtonStyle } from './constants';

class SearchParticipant extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }
  handleOpen() {
    this.setState({ open: true });
  }
  handleSearch() {
    this.props.onSearch();
  }
  render() {
    const actionsButtons = [
      <FlatButton
        label={<FormattedMessage {...messages.addParticipantDialogCancelBtnLabel} />}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div className={styles.root} >
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <div className={styles.buttonGroup}>
              <RaisedButton
                backgroundColor={teal500}
                labelColor={white}
                onClick={this.handleOpen}
                label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
                primary
              />
            </div>
          </div>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <p> Participant Table goes here!!</p>
          </div>
        </div>
        <Dialog
          title={<FormattedMessage {...messages.addParticipantDialogTitle} />}
          actions={actionsButtons}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div className={styles.gridContainer}>
            <div className={styles.gridItem}>
              <TextField
                name="name"
                style={fieldStyle}
                floatingLabelStyle={floatingLabelStyle}
                hintText={<FormattedMessage {...messages.PractitionerNameHintText} />}
                floatingLabelText={<FormattedMessage {...messages.PractitionerNameFloatingLabelText} />}
              />
            </div>
            <div className={styles.gridItem}>
              <SelectField
                name="member"
                floatingLabelText={<FormattedMessage {...messages.PractitionerMemberFloatingLabel} />}
              >
                <MenuItem key="1" value="test" primaryText="Test" />
              </SelectField>
            </div>
            <div className={styles.gridItem}>
              <IconButton
                style={iconButtonStyle}
                tooltip={<FormattedMessage {...messages.searchButtonTooltip} />}
                type="button"
                onClick={this.handleSearch}
                // disabled={!dirty || isSubmitting || !isValid}
              >
                <ActionSearch />
              </IconButton>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

SearchParticipant.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchParticipant;
