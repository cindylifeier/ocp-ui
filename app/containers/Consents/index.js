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
import { PanelToolbar } from 'components/PanelToolbar';
import makeSelectConsents from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class Consents extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_CONSENT_URL,
    };
    return (
      <div>
        <PanelToolbar addNewItem={addNewItem} onSearch={this.handleSearch} showFilter={false} />
      </div>
    );
  }
}

Consents.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  consents: makeSelectConsents(),
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
