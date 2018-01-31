/**
 *
 * ManageCareTeamPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Divider from 'material-ui/Divider';
import { FormattedMessage } from 'react-intl';
import isUndefined from 'lodash/isUndefined';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManageCareTeamPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import ManageCareTeam from '../../components/ManageCareTeam';
import messages from './messages';
import styles from './styles.css';

export class ManageCareTeamPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { match } = this.props;
    const editMode = !isUndefined(match.params.id);
    return (
      <div>
        <Helmet>
          <title>Manage CareTeam</title>
          <meta name="description" content="Manage CareTeam page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <h4 className={styles.font}>
              {editMode ? <FormattedMessage {...messages.editHeader} />
                : <FormattedMessage {...messages.createHeader} />}
            </h4>
            <Divider />
            <ManageCareTeam />
          </div>
        </div>
      </div>
    );
  }
}

ManageCareTeamPage.propTypes = {
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  managecareteampage: makeSelectManageCareTeamPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageCareTeamPage', reducer });
const withSaga = injectSaga({ key: 'manageCareTeamPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageCareTeamPage);
