/**
 *
 * PermissionAssignments
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StyledDialog from 'components/StyledDialog';
import { makeSelectOrganization } from 'containers/App/contextSelectors';
import { FieldArray } from 'formik';
import PermissionAssignmentTable from 'components/PermissionAssignmentTable';
import AddAssignRolesForm from 'components/AddAssignRolesForm';
import messages from './messages';
import { makeSelectUsers, makeSelectGroups } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getUsers, getGroups, initializePermissionAssignment, assignUserRole } from './actions';

export class PermissionAssignments extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      selectedUser: null,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleEditAssignRoles = this.handleEditAssignRoles.bind(this);
    this.handleAssignRole = this.handleAssignRole.bind(this);
  }
  componentWillMount() {
    this.props.initializePermissionAssignment();
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.getGroups();
  }

  handleOpenDialog() {
    this.setState({ isDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({
      isDialogOpen: false,
      editingAssignRoles: null,
    });
  }

  handleEditAssignRoles(user) {
    this.setState((prevState) => ({
      isDialogOpen: !prevState.isDialogOpen,
      selectedUser: user,
    }));
  }

  handleAssignRole(values, actions) {
    const userId = this.state.selectedUser.id;
    const groupId = values.role;
    this.props.onAssignRole(userId, groupId, () => {
      actions.setSubmitting(false);
    });
  }

  render() {
    const { users, groups, organization } = this.props;
    return (
      <div>
        <FieldArray
          name="assignRoles"
          render={() => (
            <div>
              <StyledDialog
                fullWidth
                open={this.state.isDialogOpen}
              >
                <DialogTitle>
                  <FormattedMessage {...messages.assignRole} />
                </DialogTitle>
                <DialogContent>
                  <AddAssignRolesForm
                    initialValues={this.state.selectedUser}
                    handleCloseDialog={this.handleCloseDialog}
                    handleAssignRole={this.handleAssignRole}
                    organization={organization}
                    groups={groups}
                  />
                </DialogContent>
              </StyledDialog>
            </div>
          )}
        />
        <PermissionAssignmentTable users={users} handleEditAssignRoles={this.handleEditAssignRoles} />
      </div>
    );
  }
}

PermissionAssignments.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  onAssignRole: PropTypes.func.isRequired,
  initializePermissionAssignment: PropTypes.func.isRequired,
  users: PropTypes.array,
  groups: PropTypes.array,
  organization: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  groups: makeSelectGroups(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => dispatch(getUsers()),
    getGroups: () => dispatch(getGroups()),
    onAssignRole: (userId, groupId) => dispatch(assignUserRole(userId, groupId)),
    initializePermissionAssignment: () => dispatch(initializePermissionAssignment()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'permissionAssignments', reducer });
const withSaga = injectSaga({ key: 'permissionAssignments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PermissionAssignments);
