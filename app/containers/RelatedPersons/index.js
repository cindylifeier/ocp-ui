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
import uniqueId from 'lodash/uniqueId';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';

import injectSaga from 'utils/injectSaga';
import { getPatientName } from 'utils/PatientUtils';
import injectReducer from 'utils/injectReducer';
import RelatedPersonTable from 'components/RelatedPersonTable';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import NoResultsFoundText from 'components/NoResultsFoundText';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import makeSelectRelatedPersons, { makeSelectRelatedPersonsSearchLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getRelatedPersons, initializeRelatedPersons } from './actions';

export class RelatedPersons extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  }

  componentDidMount() {
    this.props.initializeRelatedPersons();
    const { patient } = this.props;
    if (patient) {
      this.props.getRelatedPersons(true, 1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient } = this.props;
    const { patient: newPatient } = nextProps;
    if (!isEqual(patient, newPatient)) {
      this.props.getRelatedPersons(true, 1);
    }
  }

  handlePageClick(pageNumber) {
    this.props.getRelatedPersons(true, pageNumber);
  }

  render() {
    const { data, patient, loading } = this.props;
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        {isEmpty(patient) && (
          <h4><FormattedMessage {...messages.noRelatedPersonSelected} /></h4>)}
        {!isEmpty(patient) && (
          <InfoSection>
            <InlineLabel htmlFor={this.PATIENT_NAME_HTML_ID}>
              <FormattedMessage {...messages.labelPatientName} />&nbsp;
            </InlineLabel>
            <span id={this.PATIENT_NAME_HTML_ID}>{getPatientName(patient)}</span>
          </InfoSection>)}
        {!isEmpty(patient) && (isEmpty(data) || isEmpty(data.elements)) && (
          <NoResultsFoundText><FormattedMessage {...messages.noRelatedPersonFound} /></NoResultsFoundText>)
        }
        {!isEmpty(patient) && !isEmpty(data.elements) && (
          <div>
            {loading && <RefreshIndicatorLoading />}
            <RelatedPersonTable
              relatedPersons={data.elements}
              patientId={patient.id}
            />
            <CenterAlignedUltimatePagination
              currentPage={data.currentPage}
              totalPages={data.totalNumberOfPages}
              onChange={this.handlePageClick}
            />
          </div>)
        }
      </Card>
    );
  }
}

RelatedPersons.propTypes = {
  getRelatedPersons: PropTypes.func.isRequired,
  initializeRelatedPersons: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  patient: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectRelatedPersons(),
  patient: makeSelectPatient(),
  loading: makeSelectRelatedPersonsSearchLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRelatedPersons: (showInActive, pageNumber) => dispatch(getRelatedPersons(showInActive, pageNumber)),
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
