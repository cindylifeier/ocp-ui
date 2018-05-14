import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';

import Organizations from 'containers/Organizations';
import Practitioners from 'containers/Practitioners';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import FromOrganizationActors from './FromOrganizationActors';
import FromPractitionerActors from './FromPractitionerActors';
import messages from './messages';

class AddFromActors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPractitioner: null,
      selectedOrganization: null,
    };
    this.handleOrganizationSelect = this.handleOrganizationSelect.bind(this);
    this.handlePractitionerSelect = this.handlePractitionerSelect.bind(this);
    this.handleAddSelectedActors = this.handleAddSelectedActors.bind(this);
  }

  handleOrganizationSelect(selectedOrganization) {
    this.setState({
      selectedOrganization,
    });
  }

  handlePractitionerSelect(selectedPractitioner) {
    this.setState({ selectedPractitioner });
  }

  handleAddSelectedActors() {
    const selectedActors = {
      practitioner: this.state.selectedPractitioner,
      organization: this.state.selectedOrganization,
    };
    this.props.onAddFromActors(selectedActors);
    this.props.onCloseDialog();
  }

  render() {
    const {
      onCloseDialog,
    } = this.props;
    return (
      <div>
        <Grid columns={1}>
          <Cell>
            <Organizations
              component={FromOrganizationActors}
              pageSize={3}
              onOrganizationClick={this.handleOrganizationSelect}
            />
          </Cell>
          <Cell>
            <Practitioners
              component={FromPractitionerActors}
              pageSize={3}
              onPractitionerSelect={this.handlePractitionerSelect}
            />
          </Cell>
          <Cell>
            <HorizontalAlignment position="end">
              <Grid columns={2}>
                <Cell>
                  <StyledRaisedButton fullWidth onClick={this.handleAddSelectedActors}>
                    <FormattedMessage {...messages.saveButton} />
                  </StyledRaisedButton>
                </Cell>
                <Cell>
                  <StyledFlatButton fullWidth onClick={onCloseDialog}>
                    <FormattedMessage {...messages.cancelButton} />
                  </StyledFlatButton>
                </Cell>
              </Grid>
            </HorizontalAlignment>
          </Cell>
        </Grid>
      </div>
    );
  }
}

AddFromActors.propTypes = {
  onCloseDialog: PropTypes.func.isRequired,
  onAddFromActors: PropTypes.func.isRequired,
};

export default AddFromActors;
