/**
*
* CommunicationsTableDialog
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog from 'material-ui/Dialog';
import DialogHeader from 'components/DialogHeader';
import StyledFlatButton from 'components/StyledFlatButton';
import CommunicationsTable from 'components/CommunicationsTable';
import { Cell, Grid } from 'styled-css-grid';
import isEmpty from 'lodash/isEmpty';
import messages from './messages';

class CommunicationsTableDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      open,
      handleDialogClose,
      handleChangePage,
      data,
      selectedPatient,
      manageCommunicationBaseUrl,
      isLoading,
    } = this.props;
    const loading = !isEmpty(isLoading) ? isLoading : false;
    const communicationTableData = {
      loading,
      data,
      selectedPatient,
      handleChangePage,
      manageCommunicationBaseUrl,
    };

    return (
      <div>
        <Dialog
          modal={false}
          open={open}
          autoScrollBodyContent
        >
          <DialogHeader>
            {<FormattedMessage {...messages.communicationDialogTitle} />}
          </DialogHeader>

          <CommunicationsTable {...communicationTableData}></CommunicationsTable>
          <Grid columns="repeat(2, 1fr)">
            <Cell>
              <StyledFlatButton type="reset" onClick={handleDialogClose}>
                <FormattedMessage {...messages.cancelButton} />
              </StyledFlatButton>
            </Cell>
          </Grid>
        </Dialog>
      </div>
    );
  }
}

CommunicationsTableDialog.propTypes = {
  open: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleDialogClose: PropTypes.func,
  // communications: PropTypes.object,
  // relativeTop: PropTypes.number,
  handleChangePage: PropTypes.func,
  data: PropTypes.object,
  selectedPatient: PropTypes.object,
  manageCommunicationBaseUrl: PropTypes.string,
};

export default CommunicationsTableDialog;
