/**
 *
 * ManagePatientPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Divider from 'material-ui/Divider';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectManagePatientPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import ManagePatient from '../../components/ManagePatient';

export class ManagePatientPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(values) {
    // Todo: remove it
    console.log(values);
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Helmet>
          <title>Manage Patient</title>
          <meta name="description" content="Manage patient page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.card}>
          <h4 className={styles.font}>
            {match.params.id ? <FormattedMessage {...messages.editHeader} /> : <FormattedMessage {...messages.createHeader} />}
          </h4>
          <Divider />
          <ManagePatient onSave={this.handleSave} />
        </div>
      </div>
    );
  }
}

ManagePatientPage.propTypes = {
  match: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  managepatientpage: makeSelectManagePatientPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managePatientPage', reducer });
const withSaga = injectSaga({ key: 'managePatientPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePatientPage);
