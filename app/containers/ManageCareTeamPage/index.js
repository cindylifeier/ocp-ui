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
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getPatient, initializeManageCareTeam } from './actions';
import { makeSelectPatient } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ManageCareTeam from '../../components/ManageCareTeam';
import messages from './messages';
import styles from './styles.css';

export class ManageCareTeamPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    const queryObj = queryString.parse(this.props.location.search);
    this.props.getPatient(queryObj.patientId);
  }

  componentWillUnmount() {
    this.props.initializeManageCareTeam();
  }

  // TODO: will implement it
  handleSearch() {
  }

  // TODO: will implement it
  handleSave(careTeamFormData) {
    console.log(careTeamFormData);
  }

  render() {
    const { match, selectedPatient } = this.props;
    const editMode = !isUndefined(match.params.id);
    const manageCareTeamProps = {
      selectedPatient,
    };
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
            <ManageCareTeam {...manageCareTeamProps} onSave={this.handleSave} onSearch={this.handleSearch} />
          </div>
        </div>
      </div>
    );
  }
}

ManageCareTeamPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  selectedPatient: PropTypes.object,
  getPatient: PropTypes.func.isRequired,
  initializeManageCareTeam: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedPatient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManageCareTeam: () => dispatch(initializeManageCareTeam()),
    getPatient: (patientId) => dispatch(getPatient(patientId)),
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
