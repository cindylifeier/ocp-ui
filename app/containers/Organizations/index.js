/**
 *
 * Organizations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectOrganizations from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { loadOrganizations } from './actions';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading';
import styles from './Organizations.css';

export class Organizations extends React.PureComponent {
  componentDidMount() {
    this.props.loadOrganizations();
  }

  render() {
    const { organizations } = this.props;
    return (
      <div className={styles.root}>
        <h3><FormattedMessage {...messages.header} /></h3>
        {organizations.loading && <RefreshIndicatorLoading />}
        {organizations.data && organizations.data.length > 0 &&
        <ul>
          {organizations.data
            .map((organization) => (
              <li key={`${organization.identifier.system}|${organization.identifier.value}`}>
                <span>{organization.name}</span>
              </li>
            ))}
        </ul>}
      </div>
    );
  }
}

Organizations.propTypes = {
  loadOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizations(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadOrganizations: () => dispatch(loadOrganizations()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'organizations', reducer });
const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Organizations);
