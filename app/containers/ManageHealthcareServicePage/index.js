/**
 *
 * ManageHealthcareServicePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Divider from 'material-ui/Divider';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import isUndefined from 'lodash/isUndefined';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectHealthcareServiceCategories, makeSelectHealthcareServiceReferralMethods, makeSelectHealthcareServiceSpecialities, makeSelectHealthcareServiceTypes, makeSelectTelecomSystems, makeSelectTelecomUses } from '../App/selectors';
import { makeSelectOrganization } from '../Locations/selectors';
import { getLookupsAction } from '../App/actions';
import { createHealthcareService, editHealthcareService, getHealthcareServiceById } from './actions';
import reducer from './reducer';
import saga from './saga';
import ManageHealthcareService from '../../components/ManageHealthcareService';
import { HEALTHCARESERVICECATEGORY, HEALTHCARESERVICEREFERRALMETHOD, HEALTHCARESERVICESPECIALITY, HEALTHCARESERVICETYPE, TELECOMSYSTEM, TELECOMUSE } from '../App/constants';
import messages from '../ManageHealthcareServicePage/messages';
import styles from './styles.css';

export class ManageHealthcareServicePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    this.props.getLookups();
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getSelectedHealthcareService(logicalId);
    }
  }

  handleSave(healthcareServiceFormData, actions) {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.editHealthcareService(healthcareServiceFormData, () => actions.setSubmitting(false));
    } else {
      this.props.createHealthcareService(healthcareServiceFormData, () => actions.setSubmitting(false));
    }
  }

  render() {
    const {
      match,
      healthcareServiceCategories,
      healthcareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      telecomSystems,
      telecomUses,
      organization,
      selectedHealthcareService,
    } = this.props;
    const logicalId = this.props.match.params.id;
    const editMode = !isUndefined(match.params.id);
    let currentHealthcareService = null;
    if (editMode && selectedHealthcareService) {
      currentHealthcareService = selectedHealthcareService;
    }
    const formProps = {
      healthcareServiceCategories,
      healthcareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      telecomSystems,
      telecomUses,
      organization,
      editMode,
      currentHealthcareService,
    };
    return (
      <div>
        <Helmet>
          <title>Manage Healthcare Service</title>
          <meta name="description" content="Manage Healthcare Service page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            {logicalId ? <FormattedMessage {...messages.editHeader} />
              : <FormattedMessage {...messages.createHeader} />}
          </div>
          <Divider />
          <ManageHealthcareService {...formProps} onSave={this.handleSave} />
        </div>
      </div>
    );
  }
}

ManageHealthcareServicePage.propTypes = {
  match: PropTypes.object,
  getLookups: PropTypes.func.isRequired,
  getSelectedHealthcareService: PropTypes.func.isRequired,
  healthcareServiceCategories: PropTypes.array,
  healthcareServiceTypes: PropTypes.array,
  healthcareServiceReferralMethods: PropTypes.array,
  healthcareServiceSpecialities: PropTypes.array,
  telecomSystems: PropTypes.array,
  telecomUses: PropTypes.array,
  organization: PropTypes.object,
  selectedHealthcareService: PropTypes.object,
  createHealthcareService: PropTypes.func,
  editHealthcareService: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  healthcareServiceCategories: makeSelectHealthcareServiceCategories(),
  healthcareServiceTypes: makeSelectHealthcareServiceTypes(),
  healthcareServiceReferralMethods: makeSelectHealthcareServiceReferralMethods(),
  healthcareServiceSpecialities: makeSelectHealthcareServiceSpecialities(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  organization: makeSelectOrganization(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([HEALTHCARESERVICECATEGORY, HEALTHCARESERVICETYPE, HEALTHCARESERVICEREFERRALMETHOD, HEALTHCARESERVICESPECIALITY, TELECOMSYSTEM, TELECOMUSE])),
    createHealthcareService: (healthcareServiceFormData, handleSubmitting) => dispatch(createHealthcareService(healthcareServiceFormData, handleSubmitting)),
    editHealthcareService: (healthcareServiceFormData, handleSubmitting) => dispatch(editHealthcareService(healthcareServiceFormData, handleSubmitting)),
    getSelectedHealthcareService: (logicalId) => dispatch(getHealthcareServiceById(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageHealthcareServicePage', reducer });
const withSaga = injectSaga({ key: 'manageHealthcareServicePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageHealthcareServicePage);
