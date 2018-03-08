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
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import isEmpty from 'lodash/isEmpty';
import injectSaga from 'utils/injectSaga';
import { getPatientName } from 'utils/patientUtils';
import injectReducer from 'utils/injectReducer';
import makeSelectRelatedPersons, { makeSelectRelatedPersonsSearchLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getRelatedPersons, initializeRelatedPersons } from './actions';
import RelatedPersonTable from '../../components/RelatedPersonTable';
import styles from './styles.css';
import RefreshIndicatorLoading from '../../components/RefreshIndicatorLoading/index';
import makeSelectSelectedPatient from '../App/sharedDataSelectors';


export class RelatedPersons extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    this.props.initializeRelatedPersons();
  }
  // getPatientName(patient) {
  //   const name = !isEmpty(patient) && !isEmpty(patient.name) ? (patient.name) : '';
  //   const fullName = name.length > 0 ? (name[0].firstName.concat(' ').concat(name[0].lastName)) : '';
  //   return fullName;
  // }
  handlePageClick(pageNumber) {
    this.props.getRelatedPersons(this.props.selectedPatient.id, true, pageNumber);
  }
  render() {
    const { data, selectedPatient, loading } = this.props;
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <FormattedMessage {...messages.header} />
        </div>
        {isEmpty(data.elements) ?
          <h4><FormattedMessage {...messages.noRelatedPersonSelected} /></h4> :
          <div className={styles.gridContainer}>
            <div className={styles.patientInfoSection}>
              <div className={styles.patientLabel}>
                Patient&nbsp;:&nbsp;
              </div>
              {getPatientName(selectedPatient)}
            </div>
            {loading && <RefreshIndicatorLoading />}
            <RelatedPersonTable relatedPersons={data.elements} selectedPatientId={selectedPatient.id}></RelatedPersonTable>
            <div className={styles.textCenter}>
              <UltimatePagination
                currentPage={data.currentPage}
                totalPages={data.totalNumberOfPages}
                boundaryPagesRange={1}
                siblingPagesRange={1}
                hidePreviousAndNextPageLinks={false}
                hideFirstAndLastPageLinks={false}
                hideEllipsis={false}
                onChange={this.handlePageClick}
              />
            </div>
          </div>
        }
      </div>
    );
  }
}

RelatedPersons.propTypes = {
  getRelatedPersons: PropTypes.func.isRequired,
  initializeRelatedPersons: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  selectedPatient: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectRelatedPersons(),
  selectedPatient: makeSelectSelectedPatient(),
  loading: makeSelectRelatedPersonsSearchLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRelatedPersons: (patientId, showInActive, pageNumber) => dispatch(getRelatedPersons(patientId, showInActive, pageNumber)),
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
