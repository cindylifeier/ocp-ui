/**
 *
 * ManageActivityDefinitionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ManageActivityDefinition from 'components/ManageActivityDefinition';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import { getLookupsAction } from 'containers/App/actions';
import {
  ACTION_PARTICIPANT_ROLE,
  ACTION_PARTICIPANT_TYPE,
  DEFINITION_TOPIC,
  PUBLICATION_STATUS,
  RELATED_ARTIFACT_TYPE,
  RESOURCE_TYPE,
} from 'containers/App/constants';
import { makeSelectOrganization } from 'containers/Locations/selectors';
import { createActivityDefinition } from 'containers/ManageActivityDefinitionPage/actions';
import {
  makeSelectActionParticipantRoles,
  makeSelectActionParticipantTypes,
  makeSelectDefinitionTopics,
  makeSelectPublicationStatuses,
  makeSelectRelatedArtifactTypes,
  makeSelectResourceTypes,
} from 'containers/App/lookupSelectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageActivityDefinitionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    this.props.getLookups();
  }

  handleSave(activityDefinitionFormData, actions) {
    this.props.onSaveForm(activityDefinitionFormData, () => actions.setSubmitting(false));
  }

  render() {
    const {
      publicationStatuses,
      definitionTopics,
      resourceTypes,
      actionParticipantTypes,
      actionParticipantRoles,
      relatedArtifactTypes,
      organization,
    } = this.props;
    const activityDefinitionProps = {
      publicationStatuses,
      definitionTopics,
      resourceTypes,
      actionParticipantTypes,
      actionParticipantRoles,
      relatedArtifactTypes,
      organization,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Activity Definition</title>
          <meta name="description" content="Manage ActivityDefinition page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.createHeader} />} />
        <PageContent>
          <ManageActivityDefinition {...activityDefinitionProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageActivityDefinitionPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  publicationStatuses: PropTypes.array,
  definitionTopics: PropTypes.array,
  resourceTypes: PropTypes.array,
  actionParticipantTypes: PropTypes.array,
  actionParticipantRoles: PropTypes.array,
  relatedArtifactTypes: PropTypes.array,
  organization: PropTypes.object,
  onSaveForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  publicationStatuses: makeSelectPublicationStatuses(),
  definitionTopics: makeSelectDefinitionTopics(),
  resourceTypes: makeSelectResourceTypes(),
  actionParticipantTypes: makeSelectActionParticipantTypes(),
  actionParticipantRoles: makeSelectActionParticipantRoles(),
  relatedArtifactTypes: makeSelectRelatedArtifactTypes(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([PUBLICATION_STATUS, DEFINITION_TOPIC, RESOURCE_TYPE, ACTION_PARTICIPANT_TYPE, ACTION_PARTICIPANT_ROLE, RELATED_ARTIFACT_TYPE])),
    onSaveForm: (activityDefinitionFormData, handleSubmitting) => dispatch(createActivityDefinition(activityDefinitionFormData, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageActivityDefinitionPage', reducer });
const withSaga = injectSaga({ key: 'manageActivityDefinitionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageActivityDefinitionPage);
