/**
 *
 * Coverages
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import AddCoverageDialog from 'components/AddCoverageDialog';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import PanelToolbar from 'components/PanelToolbar';
import CoverageTable from 'components/CoverageTable';
import { getLookupsAction } from 'containers/App/actions';
import {
  POLICYHOLDER_RELATIONSHIP,
  FM_STATUS,
  COVERAGE_TYPE,
  PATIENT_ROLE_CODE,
} from 'containers/App/constants';
import {
  makeSelectCoverageType,
  makeSelectCoverageFmStatus,
  makeSelectPolicyHolderRelationship,
} from 'containers/App/lookupSelectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';


export class Coverages extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleSaveCoverage = this.handleSaveCoverage.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
  }
  handleClick() {
    this.setState({ open: true });
  }

  handleDialogClose() {
    this.setState({ open: false });
  }
  handleSaveCoverage() {
    this.setState({ open: false });
  }
  render() {
    const { coverageType, coverageFmStatus, policyHolderRelationship } = this.props;
    const addNewItem = {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        onClick: this.handleClick,
      },
    };

    const addCoverageDialogProps = {
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      open: this.state.open,
      handleDialogClose: this.handleDialogClose,
      handleSaveCoverage: this.handleSaveCoverage,
    };
    return (
      <div>
        <PanelToolbar
          {...addNewItem}
          allowedAddNewItemRoles={[PATIENT_ROLE_CODE]}
        />
        <CoverageTable></CoverageTable>
        <AddCoverageDialog {...addCoverageDialogProps}></AddCoverageDialog>
      </div>
    );
  }
}

Coverages.propTypes = {
  getLookups: PropTypes.func.isRequired,
  coverageType: PropTypes.array.isRequired,
  coverageFmStatus: PropTypes.array.isRequired,
  policyHolderRelationship: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  policyHolderRelationship: makeSelectPolicyHolderRelationship(),
  coverageFmStatus: makeSelectCoverageFmStatus(),
  coverageType: makeSelectCoverageType(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([POLICYHOLDER_RELATIONSHIP, FM_STATUS, COVERAGE_TYPE])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'coverages', reducer });
const withSaga = injectSaga({ key: 'coverages', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Coverages);
