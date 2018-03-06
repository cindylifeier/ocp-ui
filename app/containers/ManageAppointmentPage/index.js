/**
 *
 * ManageAppointmentPage
 *
 */

import Page from 'components/Page';
import PageContent from 'components/PageContent';
import PageHeader from 'components/PageHeader';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManageAppointmentPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageAppointmentPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Page>
        <Helmet>
          <title>Manage Appointment</title>
          <meta name="description" content="Manage Appointment" />
        </Helmet>
        <PageHeader
          title={<FormattedMessage {...messages.createModeTitle} />}
          subtitle={<FormattedMessage {...messages.subtitle} />}
        />
        <PageContent>
        </PageContent>
      </Page>
    );
  }
}

ManageAppointmentPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageappointmentpage: makeSelectManageAppointmentPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageAppointmentPage', reducer });
const withSaga = injectSaga({ key: 'manageAppointmentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageAppointmentPage);
