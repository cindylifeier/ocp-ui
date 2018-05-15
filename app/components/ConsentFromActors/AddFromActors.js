import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import union from 'lodash/union';

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
      selectedPractitioners: [],
      selectedOrganizations: [],
    };
    this.handleOrganizationSelect = this.handleOrganizationSelect.bind(this);
    this.handlePractitionerSelect = this.handlePractitionerSelect.bind(this);
    this.handleAddSelectedActors = this.handleAddSelectedActors.bind(this);
  }

  handleOrganizationSelect(selectedOrganization) {
    const orgReference = {
      reference: `Organization/${selectedOrganization.logicalId}`,
      display: selectedOrganization.name,
    };
    this.setState({
      selectedOrganizations: [...this.state.selectedOrganizations, orgReference],
    });
  }

  handlePractitionerSelect(selectedPractitioner) {
    const practitionerReference = {
      reference: `Practitioner/${selectedPractitioner.logicalId}`,
      display: mapToName(selectedPractitioner.name),
    };
    this.setState({
      selectedPractitioners: [...this.state.selectedPractitioners, practitionerReference],
    });
  }

  handleAddSelectedActors() {
    const fromActors = union(this.state.selectedPractitioners, this.state.selectedOrganizations);
    this.props.onAddFromActors(fromActors);
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
                    <FormattedMessage {...messages.confirmButton} />
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

function mapToName(nameArray) {
  let name;
  if (!isEmpty(nameArray)) {
    const [{ firstName, lastName }] = nameArray;
    name = [firstName, lastName].filter(identity).join(' ');
  }
  return name;
}

AddFromActors.propTypes = {
  onCloseDialog: PropTypes.func.isRequired,
  onAddFromActors: PropTypes.func.isRequired,
};

export default AddFromActors;
