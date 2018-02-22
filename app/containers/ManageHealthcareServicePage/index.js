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
import find from 'lodash/find';
import merge from 'lodash/merge';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectHealthcareServiceCategories,
  makeSelectHealthcareServiceReferralMethods,
  makeSelectHealthcareServiceSpecialities, makeSelectHealthcareServiceStatuses,
  makeSelectHealthcareServiceTypes,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
} from '../App/lookupSelectors';
import { makeSelectOrganization } from '../Locations/selectors';
import { getLookupsAction } from '../App/actions';
import { createHealthcareService, editHealthcareService, getHealthcareServiceById } from './actions';
import reducer from './reducer';
import saga from './saga';
import ManageHealthcareService from '../../components/ManageHealthcareService';
import {
  HEALTHCARESERVICECATEGORY,
  HEALTHCARESERVICEREFERRALMETHOD,
  HEALTHCARESERVICESPECIALITY,
  HEALTHCARESERVICESTATUS,
  HEALTHCARESERVICETYPE,
  TELECOMSYSTEM,
  TELECOMUSE,
} from '../App/constants';
import messages from '../ManageHealthcareServicePage/messages';
import styles from './styles.css';
import { makeSelectHealthcareServices } from '../HealthcareServices/selectors';

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
    const hcsDataToSubmit = {};
    const {
      name, hcsProgramName, category, hcsType, hcsSpecialty, hcsStatus, hcsReferralMethod, telecomType, telecomValue,
    } = healthcareServiceFormData;

    hcsDataToSubmit.name = name;

    const programName = [];
    programName.push(hcsProgramName);
    hcsDataToSubmit.programName = programName;

    let code;
    code = category;
    hcsDataToSubmit.category = find(this.props.healthcareServiceCategories, { code });

    code = hcsType;
    const selectedType = find(this.props.healthcareServiceTypes, { code });
    const type = [];
    type.push(selectedType);
    hcsDataToSubmit.type = type;

    code = hcsSpecialty;
    const selectedSpeciality = find(this.props.healthcareServiceSpecialities, { code });
    const specialty = [];
    specialty.push(selectedSpeciality);
    hcsDataToSubmit.specialty = specialty;

    code = hcsReferralMethod;
    const selectedReferralMethod = find(this.props.healthcareServiceReferralMethods, { code });
    const referralMethod = [];
    referralMethod.push(selectedReferralMethod);
    hcsDataToSubmit.referralMethod = referralMethod;

    hcsDataToSubmit.telecom = [{
      system: telecomType,
      value: telecomValue,
    }];

    const logicalId = this.props.match.params.id;
    if (logicalId) {
      hcsDataToSubmit.active = hcsStatus;
      merge(hcsDataToSubmit, { logicalId });
      this.props.editHealthcareService(hcsDataToSubmit, () => actions.setSubmitting(false));
    } else {
      hcsDataToSubmit.active = true;
      this.props.createHealthcareService(hcsDataToSubmit, () => actions.setSubmitting(false));
    }
  }

  render() {
    const {
      match,
      healthcareServiceCategories,
      healthcareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      healthcareServiceStatuses,
      telecomSystems,
      telecomUses,
      organization,
    } = this.props;
    const logicalId = this.props.match.params.id;
    const editMode = !isUndefined(match.params.id);
    let currentHealthcareService = null;
    if (editMode) {
      currentHealthcareService = find(this.props.healthcareServices, { logicalId });
    }
    const formProps = {
      healthcareServiceCategories,
      healthcareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      healthcareServiceStatuses,
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
  healthcareServiceStatuses: PropTypes.array,
  telecomSystems: PropTypes.array,
  telecomUses: PropTypes.array,
  organization: PropTypes.object,
  healthcareServices: PropTypes.any,
  createHealthcareService: PropTypes.func,
  editHealthcareService: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  healthcareServiceCategories: makeSelectHealthcareServiceCategories(),
  healthcareServiceTypes: makeSelectHealthcareServiceTypes(),
  healthcareServiceReferralMethods: makeSelectHealthcareServiceReferralMethods(),
  healthcareServiceSpecialities: makeSelectHealthcareServiceSpecialities(),
  healthcareServiceStatuses: makeSelectHealthcareServiceStatuses(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  organization: makeSelectOrganization(),
  healthcareServices: makeSelectHealthcareServices(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([HEALTHCARESERVICECATEGORY, HEALTHCARESERVICETYPE, HEALTHCARESERVICEREFERRALMETHOD, HEALTHCARESERVICESPECIALITY, HEALTHCARESERVICESTATUS, TELECOMSYSTEM, TELECOMUSE])),
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
