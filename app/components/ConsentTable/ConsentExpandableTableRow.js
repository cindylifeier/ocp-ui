import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell } from 'styled-css-grid';
import { Link } from 'react-router-dom';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import Chevron from 'material-ui/svg-icons/navigation/chevron-right';
import Expand from 'material-ui/svg-icons/navigation/expand-more';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';

import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import StyledChip from 'components/StyledChip';
import StyledIconButton from 'components/StyledIconButton';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import ConsentPurposeList from './ConsentPurposeList';
import messages from './messages';
import ConsentDetailsGrid from './ConsentDetailsGrid';


class ConsentExpandableTableRow extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isShowAccordion: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const show = this.state.isShowAccordion;
    this.setState({
      isShowAccordion: !show,
    });
  }

  render() {
    const { consent, tableColumns } = this.props;
    const { logicalId, fromActor, toActor, status, period, fromGeneralDesignation, toGeneralDesignation, purpose } = consent;
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
          <TableRowColumn>{fromGeneralDesignation || fromActor.map(({ display }) =>
            (
              <div key={uniqueId()}>
                {display}
                <br />
              </div>
            ),
          )}</TableRowColumn>
          <TableRowColumn>{toGeneralDesignation || toActor.map(({ display }) =>
            (
              <div key={uniqueId()}>
                {display}
                <br />
              </div>
            ),
          )}</TableRowColumn>
          <TableRowColumn>{period && period.start}-{period && period.end} </TableRowColumn>
          <TableRowColumn>{status && status.display}</TableRowColumn>
          <TableRowColumn>
            <NavigationStyledIconMenu>
              <MenuItem
                primaryText={<FormattedMessage {...messages.edit} />}
                containerElement={<Link to={`/ocp-ui/manage-consent/${logicalId}`} />}
              />
              <MenuItem
                primaryText={<FormattedMessage {...messages.preview} />}
                containerElement={<Link to={`/ocp-ui/manage-consent/${logicalId}`} />}
              />
              <MenuItem
                primaryText={<FormattedMessage {...messages.view} />}
                containerElement={<Link to={`/ocp-ui/manage-consent/${logicalId}`} />}
              />
              <MenuItem
                primaryText={<FormattedMessage {...messages.attest} />}
                containerElement={<Link to={`/ocp-ui/manage-consent/${logicalId}`} />}
              />
              <MenuItem
                primaryText={<FormattedMessage {...messages.remove} />}
              />
            </NavigationStyledIconMenu>
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
};

export default ConsentExpandableTableRow;
