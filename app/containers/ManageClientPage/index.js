/**
 *
 * ManageClientPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PageHeader from 'components/PageHeader';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import ManageClient from 'components/ManageClient';
import makeSelectManageClientPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { saveClient } from './actions';

export class ManageClientPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(clientFormData, actions) {
    this.props.onSaveForm(clientFormData, () => {
      actions.setSubmitting(false);
    });
  }
  render() {
    return (
      <Page>
        <Helmet>
          <title>Manage SMART apps</title>
          <meta name="description" content="Description of Manage SMART applications" />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          <ManageClient onSaveClient={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageClientPage.propTypes = {
  onSaveForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  manageclientpage: makeSelectManageClientPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveForm: (clientFormData, handleSubmitting) => {
      dispatch(saveClient(clientFormData, handleSubmitting));
    },
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageClientPage', reducer });
const withSaga = injectSaga({ key: 'manageClientPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageClientPage);
