/**
 *
 * AttestConsentPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AttestConsent from 'components/AttestConsent';
import reducer from './reducer';
import saga from './saga';
import { getConsent } from './actions';
import { makeSelectConsent } from './selectors';

export class AttestConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  componentDidMount() {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getConsent(logicalId);
    }
  }

  handleSubmit() {
    console.log('submitted');
  }

  checkPassword(password) {
    console.log(password);
  }

  render() {
    const { consent } = this.props;
    console.log(consent);
    return (
      <div>
        <Helmet>
          <title>AttestConsentPage</title>
          <meta name="description" content="Sign consent" />
        </Helmet>
        <AttestConsent
          onSubmit={this.handleSubmit}
          checkPassword={this.checkPassword}
        />
      </div>
    );
  }
}

AttestConsentPage.propTypes = {
  match: PropTypes.object,
  getConsent: PropTypes.func,
  consent: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  consent: makeSelectConsent(),
});

function mapDispatchToProps(dispatch) {
  return {
    getConsent: (logicalId) => dispatch(getConsent(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'attestConsentPage', reducer });
const withSaga = injectSaga({ key: 'attestConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AttestConsentPage);
