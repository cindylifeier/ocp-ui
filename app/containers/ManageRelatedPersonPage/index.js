/**
 *
 * ManageRelatedPersonPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  makeSelectAdministrativeGenders, makeSelectPatient, makeSelectPatientIdentifierSystems,
  makeSelectRelatedPersonPatientRelationshipTypes,
  makeSelectTelecomSystems, makeSelectTelecomUses,
  makeSelectUspsStates,
} from '../App/selectors';
import {
  ADMINISTRATIVEGENDER, PATIENTIDENTIFIERSYSTEM, RELATEDPERSONPATIENTRELATIONSHIPTYPES, TELECOMSYSTEM, TELECOMUSE,
  USPSSTATES,
} from '../App/constants';
import { getLookupsAction, getPatient } from '../App/actions';
import ManageRelatedPerson from '../../components/ManageRelatedPerson';
import { createRelatedPerson, updateRelatedPerson } from './actions';

export class ManageRelatedPersonPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillMount() {
    this.props.getLookups();
    const queryObj = queryString.parse(this.props.location.search);
    const patientId = queryObj.patientId;
    if (patientId) {
      this.props.getPatient(patientId);
    }
  }
  handleSave(relatedPerson) {
    const queryObj = queryString.parse(this.props.location.search);
    const relatedPersonId = queryObj.id;
    if (relatedPersonId) {
      this.props.updateRelatedPerson(relatedPerson);
    } else {
      this.props.createRelatedPerson(relatedPerson);
    }
  }
  render() {
    const {
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      telecomSystems,
      telecomUses,
      relationshipTypes,
      selectedPatient } = this.props;
    const manageRelatedPersonProps = {
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      telecomSystems,
      telecomUses,
      relationshipTypes,
      selectedPatient,
    };
    return (
      <div>
        <Helmet>
          <title>Manage Related Person</title>
          <meta name="description" content="Description of ManageRelatedPersonPage" />
        </Helmet>
        <ManageRelatedPerson {...manageRelatedPersonProps} onSave={this.handleSave} />
      </div>
    );
  }
}

ManageRelatedPersonPage.propTypes = {
  uspsStates: PropTypes.array,
  getPatient: PropTypes.func.isRequired,
  createRelatedPerson: PropTypes.func.isRequired,
  updateRelatedPerson: PropTypes.func.isRequired,
  location: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  patientIdentifierSystems: PropTypes.array,
  administrativeGenders: PropTypes.array,
  telecomSystems: PropTypes.array,
  relationshipTypes: PropTypes.array,
  selectedPatient: PropTypes.object,
  telecomUses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  patientIdentifierSystems: makeSelectPatientIdentifierSystems(),
  administrativeGenders: makeSelectAdministrativeGenders(),
  telecomSystems: makeSelectTelecomSystems(),
  relationshipTypes: makeSelectRelatedPersonPatientRelationshipTypes(),
  selectedPatient: makeSelectPatient(),
  telecomUses: makeSelectTelecomUses(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, PATIENTIDENTIFIERSYSTEM, ADMINISTRATIVEGENDER, TELECOMUSE, TELECOMSYSTEM, RELATEDPERSONPATIENTRELATIONSHIPTYPES])),
    getPatient: (patientId) => dispatch(getPatient(patientId)),
    createRelatedPerson: (relatedPerson) => dispatch(createRelatedPerson(relatedPerson)),
    updateRelatedPerson: (relatedPerson) => dispatch(updateRelatedPerson(relatedPerson)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageRelatedPersonPage', reducer });
const withSaga = injectSaga({ key: 'manageRelatedPersonPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageRelatedPersonPage);
