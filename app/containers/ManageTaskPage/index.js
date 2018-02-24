/**
 *
 * ManageTaskPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Divider from 'material-ui/Divider';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import ManageTask from '../../components/ManageTask';
import { TASK_STATUS, REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE } from '../App/constants';
import { makeSelectPatient } from '../ManageCareTeamPage/selectors';
import { getLookupsAction } from '../App/actions';
import { makeSelectRequestIntents, makeSelectRequestPriorities, makeSelectTaskPerformerTypes, makeSelectTaskStatuses } from '../App/lookupSelectors';

export class ManageTaskPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getLookups();
  }

  render() {
    const {
      taskStatus,
      requestIntent,
      requestPriority,
      taskPerformerType,
      selectedPatient,
    } = this.props;
    const taskProps = {
      taskStatus,
      requestIntent,
      requestPriority,
      taskPerformerType,
      selectedPatient,
    };

    return (
      <div>
        <Helmet>
          <title>Manage Task</title>
          <meta name="description" content="Manage Task page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <FormattedMessage {...messages.createHeader} />
          </div>
          <Divider />
          <ManageTask {...taskProps} />
        </div>
      </div>
    );
  }
}

ManageTaskPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  taskStatus: PropTypes.array,
  requestIntent: PropTypes.array,
  requestPriority: PropTypes.array,
  taskPerformerType: PropTypes.array,
  selectedPatient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  taskStatus: makeSelectTaskStatuses(),
  requestIntent: makeSelectRequestIntents(),
  requestPriority: makeSelectRequestPriorities(),
  taskPerformerType: makeSelectTaskPerformerTypes(),
  selectedPatient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([TASK_STATUS, REQUEST_INTENT, REQUEST_PRIORITY, TASK_PERFORMER_TYPE])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageTaskPage', reducer });
const withSaga = injectSaga({ key: 'manageTaskPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageTaskPage);
