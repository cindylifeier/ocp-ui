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
import messages from './messages';


class CommunicationsTableDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    const {
      open,
      handleDialogClose,
      communicationsData,
      relativeTop,
      handlePageClick,
    } = this.props;


    return (
      <div>
        <Dialog
          modal={false}
          open={open}
          autoScrollBodyContent
        >
          <DialogHeader>
            {<FormattedMessage {...messages.addCoverageDialogTitle} />}
          </DialogHeader>

          <CommunicationsTable
            relativeTop={relativeTop}
            communicationsData={communicationsData}
            handleChangePage={handlePageClick}
          ></CommunicationsTable>
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
  handleDialogClose: PropTypes.func,
  communicationsData: PropTypes.object,
  relativeTop: PropTypes.number,
  handlePageClick: PropTypes.func,
};

export default CommunicationsTableDialog;
