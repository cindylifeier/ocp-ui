/**
 *
 * ManageRelatedPersonDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DialogActions, DialogContent, DialogTitle } from 'material-ui-next/Dialog';

import StyledDialog from 'components/StyledDialog';
import StyledFlatButton from 'components/StyledFlatButton';
import SearchRelatedPersonsField from './SearchRelatedPersonsField';
import ManageRelatedPersonTable from './ManageRelatedPersonTable';
import messages from './messages';

function ManageRelatedPersonDialog(props) {
  const { dialogOpen, onDialogClose, onRelatedPersonsSearch, relatedPersonsData } = props;
  return (
    <div>
      <StyledDialog open={dialogOpen} fullScreen>
        <DialogTitle>
          <FormattedMessage {...messages.manageRelatedPersonDialogTitle} />
        </DialogTitle>
        <DialogContent>
          <SearchRelatedPersonsField onSearch={onRelatedPersonsSearch} />
          <ManageRelatedPersonTable relatedPersonsData={relatedPersonsData} />
        </DialogContent>
        <DialogActions>
          <StyledFlatButton onClick={onDialogClose}>
            <FormattedMessage {...messages.cancelButton} />
          </StyledFlatButton>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}

ManageRelatedPersonDialog.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  onRelatedPersonsSearch: PropTypes.func.isRequired,
  relatedPersonsData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      memberFirstName: PropTypes.string,
      memberLastName: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      roleCode: PropTypes.string,
      roleDisplay: PropTypes.string,
    })).isRequired,
  }),
};

export default ManageRelatedPersonDialog;

