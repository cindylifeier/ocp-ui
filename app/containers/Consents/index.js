/**
 *
 * Consents
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { MANAGE_CONSENT_URL } from 'containers/App/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Card from 'components/Card';
import { PanelToolbar } from 'components/PanelToolbar';
import isEmpty from 'lodash/isEmpty';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import makeSelectConsents from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Consents extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { selectedPatient } = this.props;
    const patientId = selectedPatient ? selectedPatient.id : null;
    const isPatient = !isEmpty(selectedPatient);
    let CREATE_CONSENT_URL = '';
    if (patientId) {
      CREATE_CONSENT_URL = `${MANAGE_CONSENT_URL}?patientId=${patientId}`;
    }
    const addNewItem = isPatient ? {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: CREATE_CONSENT_URL,
    } : undefined;

    return (
      <Card>
        <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} showFilter={false} />
      </Card>
    );
  }
}

Consents.propTypes = {
  selectedPatient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  consents: makeSelectConsents(),
  selectedPatient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'consents', reducer });
const withSaga = injectSaga({ key: 'consents', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Consents);
