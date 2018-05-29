/**
 *
 * SmartAppLauncher
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Apps from '@material-ui/icons/Apps';
import { DialogContent, DialogTitle } from 'material-ui-next/Dialog';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledDialog from 'components/StyledDialog';
import InfoSection from 'components/InfoSection';
import StickyDiv from 'components/StickyDiv';
import HorizontalAlignment from 'components/HorizontalAlignment';
import { CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE } from 'containers/App/constants';
import makeSelectContext from 'containers/App/contextSelectors';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import { makeSelectSmartApps } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { createLaunch, getClients } from './actions';
import messages from './messages';

export class SmartAppLauncher extends React.Component {
  static SMART_APP_LOGO_STYLE = { width: 50, height: 50 };
  static SMART_APP_LOGO_SRC_PREFIX = 'data:image/png;base64,';
  static SMART_APP_LOGO_ALT_SUFFIX = ' Logo';

  constructor(props) {
    super(props);
    this.state = {
      smartAppsDialogOpen: false,
    };
    this.handleSmartAppsDialogToggle = this.handleSmartAppsDialogToggle.bind(this);
    this.handleLaunch = this.handleLaunch.bind(this);
  }

  componentDidMount() {
    this.props.getClients();
  }

  handleSmartAppsDialogToggle() {
    this.setState(({ smartAppsDialogOpen }) => ({ smartAppsDialogOpen: !smartAppsDialogOpen }));
  }

  handleLaunch(clientId) {
    this.props.createLaunch(clientId);
  }

  render() {
    const { smartApps } = this.props;
    return (
      <ShowHideWrapper allowedRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE]}>
        <StyledFlatButton onClick={this.handleSmartAppsDialogToggle}>
          <Apps />
          <InfoSection fontSize="14px">
            <FormattedMessage {...messages.buttonLabel} />
          </InfoSection>
        </StyledFlatButton>
        <StyledDialog open={this.state.smartAppsDialogOpen} onClose={this.handleSmartAppsDialogToggle}>
          <InfoSection>
            <StickyDiv>
              <DialogTitle>
                <HorizontalAlignment position="center">
                  <FormattedMessage {...messages.buttonLabel} />
                </HorizontalAlignment>
              </DialogTitle>
            </StickyDiv>
            <DialogContent>
              <Grid columns={3} justifyContent="space-around" gap="16px">
                {smartApps.map(({ clientId, clientName, appIcon }) => (
                  <Cell key={clientId}>
                    <StyledFlatButton onClick={() => this.handleLaunch(clientId)}>
                      <Grid columns={1}>
                        <Cell>
                          {appIcon &&
                          <img
                            style={SmartAppLauncher.SMART_APP_LOGO_STYLE}
                            alt={`${clientName}${SmartAppLauncher.SMART_APP_LOGO_ALT_SUFFIX}`}
                            src={`${SmartAppLauncher.SMART_APP_LOGO_SRC_PREFIX}${appIcon}`}
                          />}
                        </Cell>
                        <Cell>
                          {clientName}
                        </Cell>
                      </Grid>
                    </StyledFlatButton>
                  </Cell>
                ))}
              </Grid>
            </DialogContent>
          </InfoSection>
        </StyledDialog>
      </ShowHideWrapper>
    );
  }
}

SmartAppLauncher.propTypes = {
  getClients: PropTypes.func.isRequired,
  createLaunch: PropTypes.func.isRequired,
  smartApps: PropTypes.arrayOf(PropTypes.shape({
    clientId: PropTypes.string.isRequired,
    clientName: PropTypes.string.isRequired,
    appIcon: PropTypes.string,
  })),
};

const mapStateToProps = createStructuredSelector({
  smartApps: makeSelectSmartApps(),
  context: makeSelectContext(),
});

function mapDispatchToProps(dispatch) {
  return {
    getClients: () => dispatch(getClients()),
    createLaunch: (clientId) => dispatch(createLaunch(clientId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'smartAppLauncher', reducer });
const withSaga = injectSaga({ key: 'smartAppLauncher', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SmartAppLauncher);
