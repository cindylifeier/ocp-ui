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
import isEqual from 'lodash/isEqual';

import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { getCommunications } from 'containers/Communications/actions';
import { DEFAULT_START_PAGE_NUMBER, MANAGE_COMMUNICATION_URL, PATIENT_ROLE_VALUE } from 'containers/App/constants';
import Card from 'components/Card';
import PanelToolbar from 'components/PanelToolbar';
import CommunicationsTable from 'components/CommunicationsTable';
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
    const { selectedPatient } = this.props;
    if (selectedPatient) {
      this.props.getCommunications(DEFAULT_START_PAGE_NUMBER);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedPatient } = this.props;
    const { selectedPatient: newOrganization } = nextProps;
    if (!isEqual(selectedPatient, newOrganization)) {
      this.props.getCommunications(DEFAULT_START_PAGE_NUMBER);
    }
  }

  handlePageClick(pageNumber) {
    this.props.getCommunications(pageNumber);
  }

  render() {
    const { communications, selectedPatient, user } = this.props;
    const addNewItem = user.role === PATIENT_ROLE_VALUE ? undefined : {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_COMMUNICATION_URL,
    };
    const communicationsData = {
      manageCommunicationBaseUrl: MANAGE_COMMUNICATION_URL,
      selectedPatientId: selectedPatient.id,
      loading: communications.loading,
      data: communications.data,
    };
    return (
      <Card>
        <PanelToolbar addNewItem={addNewItem} />
        <CommunicationsTable
          communicationsData={communicationsData}
          handleChangePage={this.handlePageClick}
        />
      </Card>
    );
  }
}

Communications.propTypes = {
  getCommunications: PropTypes.func.isRequired,
  communications: PropTypes.shape({
    data: PropTypes.shape({
      currentPage: PropTypes.number,
      totalNumberOfPages: PropTypes.number,
      currentPageSize: PropTypes.number,
      totalElements: PropTypes.number,
      elements: PropTypes.array,
    }),
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
  selectedPatient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  communications: makeSelectCommunications(),
  selectedPatient: makeSelectPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCommunications: (pageNumber) => dispatch(getCommunications(pageNumber)),
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
