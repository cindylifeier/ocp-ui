import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell } from 'styled-css-grid';
import { Link } from 'react-router-dom';
import uniqueId from 'lodash/uniqueId';
import capitalize from 'lodash/capitalize';
import Menu, { MenuItem } from 'material-ui-next/Menu';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Chevron from '@material-ui/icons/ChevronRight';
import Expand from '@material-ui/icons/ExpandMore';
import CheckCircle from '@material-ui/icons/CheckCircle';

import ShowHideWrapper from 'containers/ShowHideWrapper';
import Util from 'utils/Util';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import StyledChip from 'components/StyledChip';
import StyledIconButton from 'components/StyledIconButton';
import ConsentPurposeList from './ConsentPurposeList';
import messages from './messages';
import ConsentDetailsGrid from './ConsentDetailsGrid';

const CONSENT_STATUS_DRAFT = 'DRAFT';

class ConsentExpandableTableRow extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isShowAccordion: false,
      anchorEl: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickIconMenu = this.handleClickIconMenu.bind(this);
    this.handleCloseIconMenu = this.handleCloseIconMenu.bind(this);
  }

  handleClick() {
    const show = this.state.isShowAccordion;
    this.setState({
      isShowAccordion: !show,
    });
  }

  handleClickIconMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleCloseIconMenu() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { consent, tableColumns, allowedAttestConsentRoles, isExpanded } = this.props;
    const { logicalId, patient, fromActor, toActor, status, period, fromGeneralDesignation, toGeneralDesignation, purpose } = consent;
    const { anchorEl } = this.state;
    return (
      <div>
        <TableRow
          columns={tableColumns}
          role="button"
          tabIndex="0"
        >
          <TableRowColumn>
            {!this.state.isShowAccordion &&
            <StyledIconButton onClick={() => this.handleClick()}><Chevron /></StyledIconButton>}
            {this.state.isShowAccordion &&
            <StyledIconButton onClick={() => this.handleClick()}><Expand /></StyledIconButton>}
          </TableRowColumn>
          {isExpanded &&
          <TableRowColumn>{patient && patient.display}</TableRowColumn>
          }
          <TableRowColumn>{fromGeneralDesignation || fromActor.map(({ display }) =>
            (
              <div key={uniqueId()}>
                {display}
              </div>
            ),
          )}</TableRowColumn>
          {isExpanded &&
          <TableRowColumn>{toGeneralDesignation || toActor.map(({ display }) =>
            (
              <div key={uniqueId()}>
                {display}
              </div>
            ),
          )}</TableRowColumn>
          }
          <TableRowColumn>{period && period.start}-{period && period.end} </TableRowColumn>
          <TableRowColumn>{capitalize(status)}</TableRowColumn>
          <TableRowColumn>
            <StyledIconButton onClick={this.handleClickIconMenu}>
              <MoreHorizIcon />
            </StyledIconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleCloseIconMenu}
            >
              <MenuItem
                onClick={this.handleCloseIconMenu}
                component={Link}
                to={`/ocp-ui/manage-consent/${logicalId}`}
              >
                <FormattedMessage {...messages.edit} />
              </MenuItem>
              {Util.equalsIgnoreCase(status, CONSENT_STATUS_DRAFT) &&
              <ShowHideWrapper allowedRoles={allowedAttestConsentRoles}>
                <MenuItem
                  component={Link}
                  to={`/ocp-ui/sign-consent/${logicalId}`}
                  onClick={this.handleCloseIconMenu}
                >
                  <FormattedMessage {...messages.attest} />
                </MenuItem>
              </ShowHideWrapper>}
              <MenuItem
                onClick={this.handleCloseIconMenu}
                disabled
              >
                <FormattedMessage {...messages.remove} />
              </MenuItem>
            </Menu>
          </TableRowColumn>
        </TableRow>
        {this.state.isShowAccordion && <ConsentDetailsGrid columns={1}>
          <Cell>
            <FormattedMessage {...messages.purpose} />
          </Cell>
          <Cell>
            <ConsentPurposeList>
              {purpose.map(({ display }) =>
                (<StyledChip key={uniqueId()}>
                  <CheckCircle color="white" />
                  {display}
                </StyledChip>),
              )}
            </ConsentPurposeList>
          </Cell>
        </ConsentDetailsGrid>}
      </div>);
  }
}

ConsentExpandableTableRow.propTypes = {
  consent: PropTypes.object,
  tableColumns: PropTypes.string,
  allowedAttestConsentRoles: PropTypes.string,
  isExpanded: PropTypes.bool.isRequired,
};

export default ConsentExpandableTableRow;

