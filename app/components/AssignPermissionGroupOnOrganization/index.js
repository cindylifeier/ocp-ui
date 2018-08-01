/**
 *
 * AssignPermissionGroupOnOrganization
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import StyledAddCircleIcon from 'components/StyledAddCircleIcon';
import StyledFlatButton from 'components/StyledFlatButton';
import teal from 'material-ui-next/colors/teal';
import messages from './messages';


class AssignPermissionGroupOnOrganization extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      editingPermissionGroup: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditPermissionGroup = this.handleEditPermissionGroup.bind(this);
  }

  handleOpenDialog() {
    this.setState({ dialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      dialogOpen: false,
      editingPermissionGroup: null,
    });
  }

  handleEditPermissionGroup(index, permissionGroup) {
    this.setState((prevState) => ({
      dialogOpen: !prevState.dialogOpen,
      editingPermissionGroup: { index, permissionGroup },
    }));
  }


  render() {
    const { groups, assignedPermissionGroup } = this.props;
    console.log(groups, assignedPermissionGroup);
    return (
      <div>
        <StyledFlatButton color="primary" fontWeight="bold" fontSize="15px" onClick={this.handleOpenDialog}>
          <StyledAddCircleIcon color={teal['500']} />
          <FormattedMessage {...messages.assignPermissionGroupButton} />
        </StyledFlatButton>
      </div>
    );
  }
}

AssignPermissionGroupOnOrganization.propTypes = {
  groups: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    description: PropTypes.string,
    scopes: PropTypes.array.isRequired,
  })),
  assignedPermissionGroup: PropTypes.shape({
    organizationReference: PropTypes.object,
    groupId: PropTypes.string,
  }),
};

export default AssignPermissionGroupOnOrganization;
