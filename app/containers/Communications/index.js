/**
 *
 * Communication
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Card from 'components/Card';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import { getCommunications } from 'containers/Communications/actions';
import makeSelectSelectedPatient from 'containers/App/sharedDataSelectors';
import CommunicationsTable from 'components/CommunicationsTable';
import CardHeader from 'components/CardHeader';
import StyledFlatButton from 'components/StyledFlatButton';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import { MANAGE_COMMUNICATION_URL } from 'containers/App/constants';
import Link from 'react-router-dom/es/Link';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectCommunications from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class Communications extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  componentDidMount() {
    const pageNumber = 1;
    const patientId = this.props.selectedPatient.id;
    this.props.getCommunications(patientId, pageNumber);
  }

  handlePageClick(pageNumber) {
    const patientId = this.props.selectedPatient.id;
    this.props.getCommunications(patientId, pageNumber);
  }
  render() {
    const { data, selectedPatient } = this.props;
    const listOfCommunications = data && data.elements ? data.elements : [];
    const manageCommunicationBaseUrl = MANAGE_COMMUNICATION_URL;
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />}>
          <StyledFlatButton
            label={<FormattedMessage {...messages.buttonLabelCreateNew} />}
            icon={<ContentAddCircle />}
            containerElement={<Link to={MANAGE_COMMUNICATION_URL} />}
          />
        </CardHeader>
        {data && data.elements &&
        (
          <div>
            <CommunicationsTable
              communications={listOfCommunications}
              selectedPatientId={selectedPatient.id}
              manageCommunicationBaseUrl={manageCommunicationBaseUrl}
            >
            </CommunicationsTable>
            <CenterAlignedUltimatePagination
              currentPage={data.currentPage}
              totalPages={data.totalNumberOfPages}
              boundaryPagesRange={1}
              siblingPagesRange={1}
              hidePreviousAndNextPageLinks={false}
              hideFirstAndLastPageLinks={false}
              hideEllipsis={false}
              onChange={this.handlePageClick}
            >
            </CenterAlignedUltimatePagination>
          </div>
        )
        }

      </Card>
    );
  }
}

Communications.propTypes = {
  getCommunications: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  selectedPatient: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectCommunications(),
  selectedPatient: makeSelectSelectedPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCommunications: (patientId, pageNumber) => dispatch(getCommunications(patientId, pageNumber)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'communications', reducer });
const withSaga = injectSaga({ key: 'communications', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Communications);
