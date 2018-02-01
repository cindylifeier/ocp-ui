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
      name: '',
      member: '',
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }
  handleOpen() {
    this.setState({ open: true });
  }
  handleSearch() {
    const { name, member } = this.state;
    this.props.onSearch({ name, member });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleMemberChange(event, index, value) {
    this.setState({ member: value });
  }
  render() {
    const actionsButtons = [
      <FlatButton
        label={<FormattedMessage {...messages.addParticipantDialogCancelBtnLabel} />}
        onClick={this.handleClose}
      />,
    ];
    const { participantTypes } = this.props;
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
                value={this.state.name}
                onChange={this.handleNameChange}
                floatingLabelStyle={floatingLabelStyle}
                hintText={<FormattedMessage {...messages.PractitionerNameHintText} />}
                floatingLabelText={<FormattedMessage {...messages.PractitionerNameFloatingLabelText} />}
              />
            </div>
            <div className={styles.gridItem}>
              <SelectField
                name="member"
                value={this.state.member}
                onChange={this.handleMemberChange}
                floatingLabelText={<FormattedMessage {...messages.PractitionerMemberFloatingLabel} />}
              >
                {participantTypes && participantTypes.map((member) =>
                  <MenuItem key={member.code} value={member.code} primaryText={member.display} />,
                )}
              </SelectField>
            </div>
            <div className={styles.gridItem}>
              <IconButton
                style={iconButtonStyle}
                tooltip={<FormattedMessage {...messages.searchButtonTooltip} />}
                type="button"
                onClick={this.handleSearch}
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
  participantTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),
};

export default SearchParticipant;
