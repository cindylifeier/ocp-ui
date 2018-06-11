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
import { PATIENT_ROLE_CODE } from 'containers/App/constants';
import CoverageTable from 'components/CoverageTable';
import makeSelectCoverages from './selectors';
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
  }

  handleClick() {
    console.log('Click new button');
    this.setState({ open: true });
  }

  handleDialogClose() {
    this.setState({ open: false });
    // this.props.handleClose();
  }
  render() {
    const addNewItem = {
      addNewItem: {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        onClick: this.handleClick,
      },
    };

    const addCoverageDialogProps = {
      open: this.state.open,
      handleDialogClose: this.handleDialogClose,
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  coverages: makeSelectCoverages(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
