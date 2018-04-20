/**
 *
 * ExpansionTableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import TableRowColumn from 'components/TableRowColumn';
import TableRow from 'components/TableRow';
import StyledIconButton from 'components/StyledIconButton';
import StyledTableRowDetails from './StyledTableRowDetails';

class ExpansionTableRow extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      expansionRowOpen: false,
    };
    this.handleRowOpen = this.handleRowOpen.bind(this);
  }

  handleRowOpen() {
    this.setState({ expansionRowOpen: !this.state.expansionRowOpen });
  }

  render() {
    const {
      children,
      columns,
      onClick,
      onKeyPress,
      role,
      tabIndex,
      expansionTableRowDetails: { expansionRowContent, expansionRowHeight },
      ...other
    } = this.props;
    return (
      <div>
        <TableRow
          columns={columns}
          role={role}
          onClick={onClick}
          onKeyPress={onKeyPress}
          tabIndex={tabIndex}
          {...other}
        >
          <TableRowColumn>
            <StyledIconButton size="small" onClick={this.handleRowOpen}>
              {this.state.expansionRowOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </StyledIconButton>
          </TableRowColumn>
          {children}
        </TableRow>
        <StyledTableRowDetails expanded={this.state.expansionRowOpen} height={`${expansionRowHeight}px`}>
          {expansionRowContent}
        </StyledTableRowDetails>
      </div>
    );
  }
}

ExpansionTableRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf([TableRowColumn]),
  })),
  columns: PropTypes.string,
  onClick: PropTypes.func,
  onKeyPress: PropTypes.func,
  role: PropTypes.string,
  tabIndex: PropTypes.string,
  expansionTableRowDetails: PropTypes.shape({
    expansionRowContent: PropTypes.node.isRequired,
    expansionRowHeight: PropTypes.number.isRequired,
  }).isRequired,
};

export default ExpansionTableRow;
