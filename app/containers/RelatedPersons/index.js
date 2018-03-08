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
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import RelatedPersonTable from 'components/RelatedPersonTable';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
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
  }

  getPatientName(patient) {
    const name = !isEmpty(patient) && !isEmpty(patient.name) ? (patient.name) : '';
    const fullName = name.length > 0 ? (name[0].firstName.concat(' ').concat(name[0].lastName)) : '';
    return fullName;
  }

  handlePageClick(pageNumber) {
    this.props.getRelatedPersons(this.props.selectedPatient.id, true, pageNumber);
  }

  render() {
    const { data, selectedPatient, loading } = this.props;
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        {isEmpty(data.elements) ?
          <h4><FormattedMessage {...messages.noRelatedPersonSelected} /></h4> :
          <div>
            <InfoSection>
              <InlineLabel htmlFor={this.PATIENT_NAME_HTML_ID}>
                <FormattedMessage {...messages.labelPatientName} />&nbsp;
              </InlineLabel>
              <span id={this.PATIENT_NAME_HTML_ID}>{this.getPatientName(selectedPatient)}</span>
            </InfoSection>
            {loading && <RefreshIndicatorLoading />}
            <RelatedPersonTable
              relatedPersons={data.elements}
              selectedPatientId={selectedPatient.id}
            />
            <CenterAlignedUltimatePagination
              currentPage={data.currentPage}
              totalPages={data.totalNumberOfPages}
              onChange={this.handlePageClick}
            />
          </div>
        }
      </Card>
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
