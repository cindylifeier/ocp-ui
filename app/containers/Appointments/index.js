/**
 *
 * Appointments
 *
 */

import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import StyledFlatButton from 'components/StyledFlatButton';
import { MANAGE_APPOINTMENT_URL } from 'containers/App/constants';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';

import injectSaga from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectAppointments from './selectors';

export class Appointments extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />}>
          <StyledFlatButton
            label={<FormattedMessage {...messages.buttonLabelCreateNew} />}
            icon={<ContentAddCircle />}
            containerElement={<Link to={MANAGE_APPOINTMENT_URL} />}
          />
        </CardHeader>
      </Card>
    );
  }
}

Appointments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appointments: makeSelectAppointments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appointments', reducer });
const withSaga = injectSaga({ key: 'appointments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Appointments);
