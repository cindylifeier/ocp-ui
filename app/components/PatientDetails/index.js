/**
 *
 * PatientDetails
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Cell, Grid } from 'styled-css-grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Avatar from 'material-ui/Avatar';
import Flag from '@material-ui/icons/Flag';
import upperFirst from 'lodash/upperFirst';

import patientAvatar from 'images/patient-avatar.png';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import { CARE_COORDINATOR_ROLE_CODE, MANAGE_PATIENT_URL } from 'containers/App/constants';
import StyledText from 'components/StyledText';
import StyledIconButton from 'components/StyledIconButton';
import StyledTooltip from 'components/StyledTooltip';
import PatientBanner from './PatientBanner';
import ExpansionDetails from './ExpansionDetails';
import messages from './messages';

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
      <PatientBanner>
        <Grid columns="0.1fr 0.15fr repeat(4, 1fr)">
          <Cell middle center>
            <StyledTooltip title={<FormattedMessage {...messages.viewDetails} />} placement="bottom">
              <StyledIconButton svgIconSize="large" size="x-small" onClick={this.handlePanelOpen}>
                {this.state.expansionPanelOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </StyledIconButton>
            </StyledTooltip>
          </Cell>
          <Cell><Avatar size={40} src={patientAvatar} /></Cell>
          <Cell>
            <StyledText>Name</StyledText>
            <StyledText whiteSpace fontWeight="700">
              {name}
            </StyledText>
          </Cell>
          <Cell>
            <StyledText>Gender</StyledText>
            <StyledText whiteSpace fontWeight="700">
              {upperFirst(genderCode)}
            </StyledText>
          </Cell>
          <Cell>
            <StyledText>Contacts</StyledText>
            <StyledText whiteSpace fontWeight="700">
              {phones}
            </StyledText>
          </Cell>
          {flags.length > 0 &&
          <ShowHideWrapper allowedRoles={CARE_COORDINATOR_ROLE_CODE}>
            <Cell>
              <Link to={`${MANAGE_PATIENT_URL}/${id}`}>
                <Flag />
                <strong>Advisory</strong>
              </Link>
            </Cell>
          </ShowHideWrapper>
          }
        </Grid>
        <ExpansionDetails expanded={this.state.expansionPanelOpen}>
          Test
        </ExpansionDetails>
      </PatientBanner>
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
