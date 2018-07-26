/**
 *
 * ManageUserRegistration
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ManageUser from 'components/ManageUser';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import reducer from './reducer';
import saga from './saga';
import { getGroups, getUser, saveUser } from './actions';
import { makeSelectGroups, makeSelectUser } from './selectors';
import messages from './messages';

export class ManageUserRegistration extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { match, location } = this.props;
    const resourceId = match.params.id;
    const queryObj = queryString.parse(location.search);
    const resourceType = queryObj.resourceType;
    this.props.getUser(resourceType, resourceId);
    this.props.getGroups();
  }

  handleSave(userFormData, actions) {
    this.props.onSaveUser(userFormData, () => actions.setSubmitting(false));
  }

  render() {
    const { user, groups } = this.props;
    const manageUserProps = {
      groups,
      user,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage User Registration</title>
          <meta name="description" content="Manage user registration" />
        </Helmet>
        <PageHeader
          title={<FormattedMessage {...messages.title} />}
        />
        <PageContent>
          <ManageUser {...manageUserProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageUserRegistration.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  user: PropTypes.object,
  groups: PropTypes.array,
  getUser: PropTypes.func,
  getGroups: PropTypes.func,
  onSaveUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  groups: makeSelectGroups(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUser: (resourceType, resourceId) => dispatch(getUser(resourceType, resourceId)),
    getGroups: () => dispatch(getGroups()),
    onSaveUser: (userFormData, handleSubmitting) => dispatch(saveUser(userFormData, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageUserRegistration', reducer });
const withSaga = injectSaga({ key: 'manageUserRegistration', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageUserRegistration);
