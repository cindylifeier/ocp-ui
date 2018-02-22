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
import find from 'lodash/find';
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
import makeSelectRelatedPersons from '../RelatedPersons/selectors';

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
  handleSave(relatedPerson, actions) {
    const relatedPersonId = this.props.match.params.id;
    if (relatedPersonId) {
      const relatedPersonWithId = { ...relatedPerson, relatedPersonId };
      this.props.updateRelatedPerson(relatedPersonWithId, () => actions.setSubmitting(false));
    } else {
      this.props.createRelatedPerson(relatedPerson, () => actions.setSubmitting(false));
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
    const relatedPersonId = this.props.match.params.id;
    const selectedRelatedPerson = find(this.props.relatedPeronsData.elements, { relatedPersonId });
    const manageRelatedPersonProps = {
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      telecomSystems,
      telecomUses,
      relationshipTypes,
      selectedPatient,
      selectedRelatedPerson,
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
  match: PropTypes.object,
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
  relatedPeronsData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  patientIdentifierSystems: makeSelectPatientIdentifierSystems(),
  administrativeGenders: makeSelectAdministrativeGenders(),
  telecomSystems: makeSelectTelecomSystems(),
  relationshipTypes: makeSelectRelatedPersonPatientRelationshipTypes(),
  selectedPatient: makeSelectPatient(),
  telecomUses: makeSelectTelecomUses(),
  relatedPeronsData: makeSelectRelatedPersons(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, PATIENTIDENTIFIERSYSTEM, ADMINISTRATIVEGENDER, TELECOMUSE, TELECOMSYSTEM, RELATEDPERSONPATIENTRELATIONSHIPTYPES])),
    getPatient: (patientId) => dispatch(getPatient(patientId)),
    createRelatedPerson: (relatedPerson, handleSubmitting) => dispatch(createRelatedPerson(relatedPerson, handleSubmitting)),
    updateRelatedPerson: (relatedPerson, handleSubmitting) => dispatch(updateRelatedPerson(relatedPerson, handleSubmitting)),
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
