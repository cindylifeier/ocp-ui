/**
 *
 * ConsentCard
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Dialog, { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import Button from 'material-ui-next/Button';
import CloseIcon from '@material-ui/icons/Close';
import { Cell, Grid } from 'styled-css-grid';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import Util from 'utils/Util';
import StyledRaisedButton from 'components/StyledRaisedButton';
import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledDialog from 'components/StyledDialog';
import messages from './messages';

const CONSENT_STATUS_DRAFT = 'DRAFT';
const CONSENT_STATUS_ACTIVE = 'ACTIVE';

class ConsentOptions extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isManageConsentDialogOpen: false,
      isPreviewConsentDialogOpen: false,
      isDeleteConsentDialogOpen: false,
      numPages: null,
      pageNumber: 1,
    };
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handlePreviewConsentOpen = this.handlePreviewConsentOpen.bind(this);
    this.handlePreviewConsentClose = this.handlePreviewConsentClose.bind(this);
    this.handleDeleteConsentOpen = this.handleDeleteConsentOpen.bind(this);
    this.handleDeleteConsentClose = this.handleDeleteConsentClose.bind(this);
    this.handleDeleteConsentOk = this.handleDeleteConsentOk.bind(this);
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  onDocumentLoadSuccess(numPages) {
    this.setState({ numPages });
  }

  handleOpenDialog() {
    this.setState({ isManageConsentDialogOpen: true });
  }

  handleCloseDialog() {
    this.setState({ isManageConsentDialogOpen: false });
  }

  handlePreviewConsentClose() {
    this.setState({ isPreviewConsentDialogOpen: false });
  }

  handlePreviewConsentOpen() {
    this.setState({
      isManageConsentDialogOpen: false,
      isPreviewConsentDialogOpen: true,
    });
  }

  handleDeleteConsentOpen() {
    this.setState({
      isDeleteConsentDialogOpen: true,
    });
  }

  handleDeleteConsentClose() {
    this.setState({ isDeleteConsentDialogOpen: false });
  }

  handleDeleteConsentOk() {
    const { consent } = this.props;
    if (this.state.isDeleteConsentDialogOpen) {
      this.props.handleDeleteConsent(consent);
      this.setState({
        isDeleteConsentDialogOpen: false,
        isManageConsentDialogOpen: false,
      });
    }
  }

  render() {
    const { consent } = this.props;
    const { logicalId, status } = consent;
    return (
      <div>
        <StyledRaisedButton onClick={this.handleOpenDialog}>
          <FormattedMessage {...messages.manageConsentButton} />
        </StyledRaisedButton>
        <StyledDialog open={this.state.isManageConsentDialogOpen} onClose={this.handleCloseDialog} fullWidth>
          <DialogTitle>
            <FormattedMessage {...messages.consentDialog.title} />
          </DialogTitle>
          <DialogContent>
            <Grid columns={1}>
              {
                Util.equalsIgnoreCase(status, CONSENT_STATUS_DRAFT) &&
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    component={Link}
                    to={`/c2s-sof-ui/manage-consent/${logicalId}`}
                  >
                    <FormattedMessage {...messages.consentDialog.editConsentOption} />
                  </Button>
                </Cell>
              }
              {
                Util.equalsIgnoreCase(status, CONSENT_STATUS_DRAFT) &&
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    component={Link}
                    to={`/c2s-sof-ui/attest-consent/${logicalId}`}
                  >
                    <FormattedMessage {...messages.consentDialog.attestConsentOption} />
                  </Button>
                </Cell>
              }
              {
                Util.equalsIgnoreCase(status, CONSENT_STATUS_DRAFT) &&
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    onClick={this.handleDeleteConsentOpen}
                  >
                    <FormattedMessage {...messages.consentDialog.deleteConsentOption} />
                  </Button>
                </Cell>
              }
              <Cell>
                <Button
                  variant="raised"
                  fullWidth
                  onClick={this.handlePreviewConsentOpen}
                >
                  <FormattedMessage {...messages.consentDialog.previewConsentOption} />
                </Button>
              </Cell>
              {
                Util.equalsIgnoreCase(status, CONSENT_STATUS_ACTIVE) &&
                <Cell>
                  <Button
                    variant="raised"
                    fullWidth
                    component={Link}
                    to={`/c2s-sof-ui/revoke-consent/${logicalId}`}
                  >
                    <FormattedMessage {...messages.consentDialog.revokeConsentOption} />
                  </Button>
                </Cell>
              }
            </Grid>
          </DialogContent>
        </StyledDialog>
        <Dialog open={this.state.isPreviewConsentDialogOpen} fullScreen>
          <Button onClick={this.handlePreviewConsentClose}>
            <CloseIcon />
            <FormattedMessage {...messages.consentDialog.closeButton} />
          </Button>
          <DialogContent>
            <Document
              file={`data:application/pdf;base64,${this.props.consent.sourceAttachment}`}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              <Page pageNumber={this.state.pageNumber} scale={2} />
            </Document>
          </DialogContent>
        </Dialog>
        <StyledDialog open={this.state.isDeleteConsentDialogOpen} onClose={this.handleDeleteConsentClose} fullWidth>
          <DialogTitle>
            <FormattedMessage {...messages.consentDialog.deleteConsentTitle} />
          </DialogTitle>
          <DialogContent>
            <FormattedMessage {...messages.consentDialog.deleteConsentMessage} />
            <HorizontalAlignment position={'end'}>
              <Grid columns={2} alignContent="space-between">
                <Cell>
                  <StyledRaisedButton fullWidth onClick={this.handleDeleteConsentOk}>
                    <FormattedMessage {...messages.consentDialog.okButton} />
                  </StyledRaisedButton>
                </Cell>
                <Cell>
                  <StyledRaisedButton fullWidth onClick={this.handleDeleteConsentClose}>
                    <FormattedMessage {...messages.consentDialog.cancelButton} />
                  </StyledRaisedButton>
                </Cell>
              </Grid>
            </HorizontalAlignment>
          </DialogContent>
        </StyledDialog>
      </div>
    );
  }
}

ConsentOptions.propTypes = {
  consent: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    status: PropTypes.string,
    fromActor: PropTypes.array,
    toActor: PropTypes.array,
    period: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    sourceAttachment: PropTypes.string,
  }).isRequired,
  handleDeleteConsent: PropTypes.func.isRequired,
};

export default ConsentOptions;
