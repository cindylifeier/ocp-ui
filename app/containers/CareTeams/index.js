/**
 *
 * CareTeams
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCareTeams from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import CareTeamTable from '../../components/CareTeamTable';

export class CareTeams extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { careTeams: { loading, data, patientName } } = this.props;
    return (
      <div className={styles.card}>
        <h3><FormattedMessage {...messages.header} /></h3>

        {isEmpty(data) &&
        <h4><FormattedMessage {...messages.patientNotSelected} /></h4>}

        {!loading && data && <div><strong>Patient:</strong> {patientName}</div>}

        {loading &&
        <RefreshIndicatorLoading />}

        {!isEmpty(data) && !isEmpty(data.elements) &&
        <CareTeamTable elements={data.elements} />}
      </div>
    );
  }
}

CareTeams.propTypes = {
  // TODO: remove eslint disable once dispatch functions are clarified
  dispatch: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  careTeams: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  careTeams: makeSelectCareTeams(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'careTeams', reducer });
const withSaga = injectSaga({ key: 'careTeams', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CareTeams);
