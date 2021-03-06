/**
 *
 * PatientDetails
 *
 */

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Flag from '@material-ui/icons/Flag';
import PatientBannerSection from 'components/PatientBannerSection';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledIconButton from 'components/StyledIconButton';
import StyledText from 'components/StyledText';
import StyledTooltip from 'components/StyledTooltip';
import UserAvatar from 'components/UserAvatar';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  MANAGE_PATIENT_URL,
  PCP_ROLE_CODE,
} from 'containers/App/constants';

import ShowHideWrapper from 'containers/ShowHideWrapper';
import upperFirst from 'lodash/upperFirst';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Cell, Grid } from 'styled-css-grid';
import ExpansionDetails from './ExpansionDetails';
import messages from './messages';
import StyledExpansionDetails from './StyledExpansionDetails';

class PatientDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expansionPanelOpen: false,
    };
    this.handlePanelOpen = this.handlePanelOpen.bind(this);
  }

  handlePanelOpen() {
    this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen });
  }

  render() {
    const { patient, flattenPatientData } = this.props;
    const flattenPatient = flattenPatientData(patient);
    const { id, name, phones, genderCode, flags } = flattenPatient;
    return (
      <PatientBannerSection>
        <Grid columns="0.1fr 0.1fr repeat(2, 0.7fr) 1fr 1fr">
          <Cell middle center>
            <StyledTooltip title={<FormattedMessage {...messages.viewDetails} />} placement="bottom">
              <StyledIconButton svgIconSize="large" size="x-small" onClick={this.handlePanelOpen}>
                {this.state.expansionPanelOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </StyledIconButton>
            </StyledTooltip>
          </Cell>
          <Cell><UserAvatar genderCode={genderCode} /></Cell>
          <Cell middle>
            <StyledText>
              <FormattedMessage {...messages.name} />
              <StyledText whiteSpace fontWeight="700">{name}</StyledText>
            </StyledText>
          </Cell>
          <Cell middle>
            <StyledText>
              <FormattedMessage {...messages.gender} />
              <StyledText whiteSpace fontWeight="700">
                {upperFirst(genderCode)}
              </StyledText>
            </StyledText>
          </Cell>
          <Cell middle>
            <StyledText>
              <FormattedMessage {...messages.phone} />
              <StyledText whiteSpace fontWeight="700">
                {phones}
              </StyledText>
            </StyledText>
          </Cell>
          {flags.length > 0 &&
          <Cell middle>
            <ShowHideWrapper allowedRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE, PCP_ROLE_CODE]}>
              <StyledFlatButton color="primary" component={Link} to={`${MANAGE_PATIENT_URL}/${id}`}>
                <StyledIconButton size="small" svgIconSize="large" disableIconHover>
                  <Flag />
                </StyledIconButton>
                <FormattedMessage {...messages.advisory} />
              </StyledFlatButton>
            </ShowHideWrapper>
          </Cell>
          }
        </Grid>
        <StyledExpansionDetails expanded={this.state.expansionPanelOpen}>
          <ExpansionDetails patient={flattenPatient} />
        </StyledExpansionDetails>
      </PatientBannerSection>
    );
  }
}

PatientDetails.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  flattenPatientData: PropTypes.func.isRequired,
};

export default PatientDetails;
