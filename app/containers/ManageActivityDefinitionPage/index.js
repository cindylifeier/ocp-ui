/**
 *
 * ManageActivityDefinitionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Divider from 'material-ui/Divider';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLookupsAction } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import ManageActivityDefinition from '../../components/ManageActivityDefinition';
import {
  ACTION_PARTICIPANT_ROLE,
  ACTION_PARTICIPANT_TYPE,
  DEFINITION_TOPIC,
  PUBLICATION_STATUS,
  RESOURCE_TYPE,
} from '../App/constants';
import { makeSelectOrganization } from '../Locations/selectors';
import { createActivityDefinition } from '../ManageActivityDefinitionPage/actions';
import {
  makeSelectActionParticipantRoles,
  makeSelectActionParticipantTypes,
  makeSelectDefinitionTopics,
  makeSelectPublicationStatuses,
  makeSelectResourceTypes,
} from '../App/lookupSelectors';

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
      organization,
    } = this.props;
    const activityDefinitionProps = {
      publicationStatuses,
      definitionTopics,
      resourceTypes,
      actionParticipantTypes,
      actionParticipantRoles,
      organization,
    };
    return (
      <div>
        <Helmet>
          <title>Manage Activity Definition</title>
          <meta name="description" content="Manage ActivityDefinition page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <FormattedMessage {...messages.createHeader} />
          </div>
          <Divider />
          <ManageActivityDefinition {...activityDefinitionProps} onSave={this.handleSave} />
        </div>
      </div>
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
  organization: PropTypes.object,
  onSaveForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  publicationStatuses: makeSelectPublicationStatuses(),
  definitionTopics: makeSelectDefinitionTopics(),
  resourceTypes: makeSelectResourceTypes(),
  actionParticipantTypes: makeSelectActionParticipantTypes(),
  actionParticipantRoles: makeSelectActionParticipantRoles(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([PUBLICATION_STATUS, DEFINITION_TOPIC, RESOURCE_TYPE, ACTION_PARTICIPANT_TYPE, ACTION_PARTICIPANT_ROLE])),
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
