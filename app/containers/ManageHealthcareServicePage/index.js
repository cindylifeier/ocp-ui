/**
 *
 * ManageHealthcareServicePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectHealthcareServiceCategories,
        makeSelectHealthcareServiceTypes,
        makeSelectHealthcareServiceReferralMethods,
        makeSelectHealthcareServiceSpecialities,
        makeSelectTelecomSystems,
        makeSelectTelecomUses } from '../App/selectors';
import { makeSelectOrganization } from '../Locations/selectors';
import { getLookupsAction } from '../App/actions';
import { createHealthcareService } from './actions';
import reducer from './reducer';
import saga from './saga';
import ManageHealthcareService from '../../components/ManageHealthcareService';
import { HEALTHCARESERVICECATEGORY, HEALTHCARESERVICETYPE, HEALTHCARESERVICEREFERRALMETHOD, HEALTHCARESERVICESPECIALITY, TELECOMSYSTEM, TELECOMUSE } from '../App/constants';


export class ManageHealthcareServicePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillMount() {
    this.props.getLookups();
  }
  handleSave(healthcareServiceFormData, actions) {
    this.props.onSaveForm(healthcareServiceFormData, () => actions.setSubmitting(false));
  }
  render() {
    const {
      healthcareServiceCategories,
      healthcareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      telecomSystems,
      telecomUses,
      organization,
    } = this.props;
    const hcsProps = {
      healthcareServiceCategories,
      healthcareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      telecomSystems,
      telecomUses,
      organization,
    };
    return (
      <div>
        <Helmet>
          <title>ManageHealthcareServicePage</title>
          <meta name="description" content="Description of ManageHealthcareServicePage" />
        </Helmet>
        <ManageHealthcareService {...hcsProps} onSave={this.handleSave} />
      </div>
    );
  }
}

ManageHealthcareServicePage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  healthcareServiceCategories: PropTypes.array,
  healthcareServiceTypes: PropTypes.array,
  healthcareServiceReferralMethods: PropTypes.array,
  healthcareServiceSpecialities: PropTypes.array,
  telecomSystems: PropTypes.array,
  telecomUses: PropTypes.array,
  organization: PropTypes.object,
  onSaveForm: PropTypes.func,
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
    onSaveForm: (healthcareServiceFormData, handleSubmitting) => dispatch(createHealthcareService(healthcareServiceFormData, handleSubmitting)),
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
