/**
 *
 * ManageRelatedPersonPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import find from 'lodash/find';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import ManageRelatedPerson from 'components/ManageRelatedPerson';
import {
  ADMINISTRATIVEGENDER,
  PATIENTIDENTIFIERSYSTEM,
  RELATEDPERSONPATIENTRELATIONSHIPTYPES,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
} from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import {
  makeSelectAdministrativeGenders,
  makeSelectPatientIdentifierSystems,
  makeSelectRelatedPersonPatientRelationshipTypes,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
  makeSelectUspsStates,
} from 'containers/App/lookupSelectors';
import makeSelectRelatedPersons from 'containers/RelatedPersons/selectors';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import reducer from './reducer';
import saga from './saga';
import { createRelatedPerson, updateRelatedPerson } from './actions';
import messages from './messages';

export class ManageRelatedPersonPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    // TODO: refresh patient context?
    // const queryObj = queryString.parse(this.props.location.search);
    // const patientId = queryObj.patientId;
    // if (patientId) {
    //   this.props.getPatient(patientId);
    // }
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
      history,
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      telecomSystems,
      telecomUses,
      relationshipTypes,
      patient,
    } = this.props;
    const relatedPersonId = this.props.match.params.id;
    const selectedRelatedPerson = find(this.props.relatedPeronsData.elements, { relatedPersonId });
    const manageRelatedPersonProps = {
      history,
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      telecomSystems,
      telecomUses,
      relationshipTypes,
      patient,
      selectedRelatedPerson,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Related Person</title>
          <meta name="description" content="Description of ManageRelatedPersonPage" />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          <ManageRelatedPerson {...manageRelatedPersonProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageRelatedPersonPage.propTypes = {
  uspsStates: PropTypes.array,
  match: PropTypes.object,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  createRelatedPerson: PropTypes.func.isRequired,
  updateRelatedPerson: PropTypes.func.isRequired,
  getLookups: PropTypes.func.isRequired,
  patientIdentifierSystems: PropTypes.array,
  administrativeGenders: PropTypes.array,
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
  relationshipTypes: PropTypes.array,
  patient: PropTypes.object,
  relatedPeronsData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  patientIdentifierSystems: makeSelectPatientIdentifierSystems(),
  administrativeGenders: makeSelectAdministrativeGenders(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  relationshipTypes: makeSelectRelatedPersonPatientRelationshipTypes(),
  patient: makeSelectPatient(),
  relatedPeronsData: makeSelectRelatedPersons(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([USPSSTATES, PATIENTIDENTIFIERSYSTEM, ADMINISTRATIVEGENDER, TELECOMUSE, TELECOMSYSTEM, RELATEDPERSONPATIENTRELATIONSHIPTYPES])),
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
