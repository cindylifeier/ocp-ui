import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import SearchIcon from '@material-ui/icons/Search';
import { Cell, Grid } from 'styled-css-grid';

import Padding from 'components/Padding';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import messages from './messages';

class SearchParticipantReferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      searchType: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectType = this.handleSelectType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  handleSelectType(event, index, value) {
    this.setState({ searchType: value });
  }

  handleSearch() {
    const { searchType, searchValue } = this.state;
    this.props.onSearchParticipantReferences(searchType, searchValue);
  }

  render() {
    return (
      <Grid columns={3}>
        <Cell>
          <TextField
            fullWidth
            value={this.state.searchValue}
            onChange={this.handleChange}
            hintText={<FormattedMessage {...messages.hintText.participantName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.participantName} />}
          />
        </Cell>
        <Cell>
          <SelectField
            fullWidth
            value={this.state.searchType}
            onChange={this.handleSelectType}
            hintText={<FormattedMessage {...messages.hintText.participantType} />}
            floatingLabelText={
              <FormattedMessage {...messages.floatingLabelText.participantType} />}
          >
            <MenuItem
              value="practitioner"
              primaryText={<FormattedMessage {...messages.menuItemPractitioner} />}
            />
            <MenuItem
              value="relatedPerson"
              primaryText={<FormattedMessage {...messages.menuItemRelatedPerson} />}
            />
          </SelectField>
        </Cell>
        <Cell>
          <Padding top={30}>
            <StyledTooltip placement="right" title={<FormattedMessage {...messages.searchTooltip} />}>
              <StyledIconButton onClick={this.handleSearch}>
                <SearchIcon />
              </StyledIconButton>
            </StyledTooltip>
          </Padding>
        </Cell>
      </Grid>
    );
  }
}

SearchParticipantReferences.propTypes = {
  onSearchParticipantReferences: PropTypes.func.isRequired,
};

export default SearchParticipantReferences;
