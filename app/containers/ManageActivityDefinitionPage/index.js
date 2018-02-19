/**
 *
 * ManageActivityDefinitionPage
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
import makeSelectManageActivityDefinitionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';

export class ManageActivityDefinitionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Manage Activity Definition</title>
          <meta name="description" content="Manage ActivityDefinition page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <FormattedMessage {...messages.createHeader} />
          </div>
        </div>
      </div>
    );
  }
}

ManageActivityDefinitionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  manageactivitydefinitionpage: makeSelectManageActivityDefinitionPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageActivityDefinitionPage', reducer });
const withSaga = injectSaga({ key: 'manageActivityDefinitionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageActivityDefinitionPage);
