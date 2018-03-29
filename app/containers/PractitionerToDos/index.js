/**
 *
 * PractitionerToDos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { TO_DO_DEFINITION } from 'containers/PractitionerToDos/constants';
import isEmpty from 'lodash/isEmpty';
import { getPractitionerToDos } from 'containers/PractitionerToDos/actions';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectPractitionerToDos, makeSelectSearchLoading } from 'containers/PractitionerToDos/selectors';
import { CARE_COORDINATOR_ROLE_VALUE } from 'containers/App/constants';
import { PanelToolbar } from 'components/PanelToolbar';
import ToDoList from 'components/ToDoList';
import Card from 'components/Card';
import NoResultsFoundText from 'components/NoResultsFoundText';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class PractitionerToDos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    const definition = TO_DO_DEFINITION;
    const practitionerId = this.getPractitionerId();
    if (practitionerId) {
      this.props.getPractitionerToDos(practitionerId, definition);
    }
  }
  getPractitionerId() {
    const { user } = this.props;
    const practitionerId = user && (user.role === CARE_COORDINATOR_ROLE_VALUE) ? user.resource.logicalId : null;
    return practitionerId;
  }
  render() {
    const { toDos, loading } = this.props;
    return (
      <Card>
        {loading && <RefreshIndicatorLoading />}
        <PanelToolbar showFilter={false} />
        {!loading && isEmpty(toDos) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noToDosFound} />
        </NoResultsFoundText>}
        {!isEmpty(toDos) &&
        <div>
          <ToDoList
            isPractitioner
            toDos={toDos}
          />
        </div>
        }
      </Card>
    );
  }
}

PractitionerToDos.propTypes = {
  toDos: PropTypes.array.isRequired,
  getPractitionerToDos: PropTypes.func.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toDos: makeSelectPractitionerToDos(),
  loading: makeSelectSearchLoading(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPractitionerToDos: (practitionerId, definition) => dispatch(getPractitionerToDos(practitionerId, definition)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerToDos', reducer });
const withSaga = injectSaga({ key: 'practitionerToDos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerToDos);
