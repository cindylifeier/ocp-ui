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
import { makeSelectPublicationStatuses, makeSelectDefinitionTopics, makeSelectResourceTypes, makeSelectActionParticipantTypes, makeSelectActionParticipantRoles } from '../App/selectors';
import { getLookupsAction } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import ManageActivityDefinition from '../../components/ManageActivityDefinition';
import { PUBLICATION_STATUS, DEFINITION_TOPIC, RESOURCE_TYPE, ACTION_PARTICIPANT_TYPE, ACTION_PARTICIPANT_ROLE } from '../App/constants';

export class ManageActivityDefinitionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.getLookups();
  }

  render() {
    const {
      publicationStatuses,
      definitionTopics,
      resourceTypes,
      actionParticipantTypes,
      actionParticipantRoles,
    } = this.props;
    const activityDefinitionProps = {
      publicationStatuses,
      definitionTopics,
      resourceTypes,
      actionParticipantTypes,
      actionParticipantRoles,
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
          <ManageActivityDefinition {...activityDefinitionProps} />
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
};

const mapStateToProps = createStructuredSelector({
  publicationStatuses: makeSelectPublicationStatuses(),
  definitionTopics: makeSelectDefinitionTopics(),
  resourceTypes: makeSelectResourceTypes(),
  actionParticipantTypes: makeSelectActionParticipantTypes(),
  actionParticipantRoles: makeSelectActionParticipantRoles(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([PUBLICATION_STATUS, DEFINITION_TOPIC, RESOURCE_TYPE, ACTION_PARTICIPANT_TYPE, ACTION_PARTICIPANT_ROLE])),
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
