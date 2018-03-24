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

import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { getCommunications } from 'containers/Communications/actions';
import StickyDiv from 'components/StickyDiv';
import { MANAGE_COMMUNICATION_URL, PATIENT_ROLE_VALUE } from 'containers/App/constants';
import { PanelToolbar } from 'components/PanelToolbar';
import CommunicationsTable from 'components/CommunicationsTable';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
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
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_COMMUNICATION_URL,
    };
    const { data, selectedPatient, user } = this.props;
    const listOfCommunications = data && data.elements ? data.elements : [];
    return (
      <Card>
        <StickyDiv>
          <PanelToolbar
            addNewItem={addNewItem}
            showNewItem={user.role !== PATIENT_ROLE_VALUE}
          />
        </StickyDiv>
        {data && data.elements &&
        (
          <div>
            <CommunicationsTable
              communications={listOfCommunications}
              selectedPatientId={selectedPatient.id}
              manageCommunicationBaseUrl={MANAGE_COMMUNICATION_URL}
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
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  data: makeSelectCommunications(),
  selectedPatient: makeSelectPatient(),
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
