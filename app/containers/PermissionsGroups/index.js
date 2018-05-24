/**
 *
 * PermissionsGroups
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { PanelToolbar } from 'components/PanelToolbar';
import PermissionGroupsTable from 'components/PermissionGroupsTable';
import makeSelectPermissionsGroups from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class PermissionsGroups extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const addNewPermissionGroup = {
      labelName: <FormattedMessage {...messages.newPermissionsGroup} />,
    };
    return (
      <div>
        <PanelToolbar
          addNewPermissionGroup={addNewPermissionGroup}
        />
        <PermissionGroupsTable />
      </div>
    );
  }
}

PermissionsGroups.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  permissionsgroups: makeSelectPermissionsGroups(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'permissionsGroups', reducer });
const withSaga = injectSaga({ key: 'permissionsGroups', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PermissionsGroups);
