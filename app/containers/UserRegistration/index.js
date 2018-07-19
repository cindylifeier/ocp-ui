/**
 *
 * UserRegistration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { PanelToolbar } from 'components/PanelToolbar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUserRegistration from './selectors';
import reducer from './reducer';
import saga from './saga';

export class UserRegistration extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      relativeTop: 0,
      currentPage: 1,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onSize = this.onSize.bind(this);
  }
  onSize(size) {
    this.setState({ relativeTop: size.height });
  }
  handleSearch() {
    console.log('Handle Search');
  }

  render() {
    return (
      <div>
        <PanelToolbar
          onSearch={this.handleSearch}
          onSize={this.onSize}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
          showUserRegistrationRoleSelection
        />
      </div>
    );
  }
}

UserRegistration.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userregistration: makeSelectUserRegistration(),
});

function mapDispatchToProps() {
  return {};
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userRegistration', reducer });
const withSaga = injectSaga({ key: 'userRegistration', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserRegistration);
