/**
 *
 * RelatedPersons
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
import makeSelectRelatedPersons from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getRelatedPersons, initializeRelatedPersons } from './actions';
import RelatedPersonTable from '../../components/RelatedPersonTable';
import { makeSelectPatient } from '../App/selectors';

export class RelatedPersons extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.props.initializeRelatedPersons();
  }

  handlePageClick(showInActive) {
    this.props.getRelatedPersons(this.props.selectedPatient.id, showInActive);
  }

  render() {
    const { data } = this.props;
    console.log(data);

    return (
      <div>
        <FormattedMessage {...messages.header} />
        <RelatedPersonTable></RelatedPersonTable>
      </div>
    );
  }
}

RelatedPersons.propTypes = {
  getRelatedPersons: PropTypes.func.isRequired,
  initializeRelatedPersons: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  selectedPatient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectRelatedPersons(),
  selectedPatient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRelatedPersons: (patientId, showInActive) => dispatch(getRelatedPersons(patientId, showInActive)),
    initializeRelatedPersons: () => dispatch(initializeRelatedPersons()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'relatedPersons', reducer });
const withSaga = injectSaga({ key: 'relatedPersons', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RelatedPersons);
