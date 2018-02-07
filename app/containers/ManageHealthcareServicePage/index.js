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
import { getLookupsAction } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
import ManageHealthcareService from '../../components/ManageHealthcareService';
import { HEALTHCARESERVICECATEGORY, HEALTHCARESERVICETYPE, HEALTHCARESERVICEREFERRALMETHOD, HEALTHCARESERVICESPECIALITY, TELECOMSYSTEM, TELECOMUSE } from '../App/constants';


export class ManageHealthcareServicePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getLookups();
  }

  render() {
    const {
      healthCareServiceCategories,
      healthCareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      telecomSystems,
      telecomUses,
      } = this.props;
    const hcsProps = {
      healthCareServiceCategories,
      healthCareServiceTypes,
      healthcareServiceReferralMethods,
      healthcareServiceSpecialities,
      telecomSystems,
      telecomUses,
    };
    return (
      <div>
        <Helmet>
          <title>ManageHealthcareServicePage</title>
          <meta name="description" content="Description of ManageHealthcareServicePage" />
        </Helmet>
        <ManageHealthcareService {...hcsProps} />
      </div>
    );
  }
}

ManageHealthcareServicePage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  healthCareServiceCategories: PropTypes.array,
  healthCareServiceTypes: PropTypes.array,
  healthcareServiceReferralMethods: PropTypes.array,
  healthcareServiceSpecialities: PropTypes.array,
  telecomSystems: PropTypes.array,
  telecomUses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  healthCareServiceCategories: makeSelectHealthcareServiceCategories(),
  healthCareServiceTypes: makeSelectHealthcareServiceTypes(),
  healthcareServiceReferralMethods: makeSelectHealthcareServiceReferralMethods(),
  healthcareServiceSpecialities: makeSelectHealthcareServiceSpecialities(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([HEALTHCARESERVICECATEGORY, HEALTHCARESERVICETYPE, HEALTHCARESERVICEREFERRALMETHOD, HEALTHCARESERVICESPECIALITY, TELECOMSYSTEM, TELECOMUSE])),

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
