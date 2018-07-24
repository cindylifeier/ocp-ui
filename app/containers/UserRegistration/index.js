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
import { searchResources } from './actions';

export class UserRegistration extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isShowSearchResult: false,
      search: {
        resourceType: 'Practitioner',
        searchType: 'name',
        searchValue: '',
        includeInactive: false,
        currentPage: 1,
      },
      relativeTop: 0,
      currentPage: 1,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.onSize = this.onSize.bind(this);
  }
  onSize(size) {
    this.setState({ relativeTop: size.height });
  }
  handleSearch(searchValue, includeInactive, searchType, resourceType) {
    this.setState({
      isShowSearchResult: true,
      search: { searchType, searchValue, includeInactive, resourceType },
    });
    this.props.resourceTypes(searchType, searchValue, resourceType, includeInactive, this.state.search.currentPage);
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
          showSearchBarByDefault
        />
      </div>
    );
  }
}

UserRegistration.propTypes = {
  resourceTypes: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  resources: makeSelectUserRegistration(),
});

function mapDispatchToProps(dispatch) {
  return {
    resourceTypes: (searchType, searchValue, resourceType, includeInactive, currentPage, organization) => dispatch(searchResources(searchType, searchValue, resourceType, includeInactive, currentPage, organization)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userRegistration', reducer });
const withSaga = injectSaga({ key: 'userRegistration', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserRegistration);
