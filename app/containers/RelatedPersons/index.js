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

export class RelatedPersons extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.props.initializeRelatedPersons();
  }

  handlePageClick() {
    // const { query, patientName, statusList } = this.props.relatedPersons;
    // this.props.getCareTeams({ ...query, pageNumber: page }, patientName, statusList);
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.header} />
        <RelatedPersonTable></RelatedPersonTable>
      </div>
    );
  }
}

RelatedPersons.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  initializeRelatedPersons: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  relatedpersons: makeSelectRelatedPersons(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRelatedPersons: (query, patientName, statusList) => dispatch(getRelatedPersons(query, patientName, statusList)),
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
