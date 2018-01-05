/**
*
* DataTable
*
*/

import React from 'react';

import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class DataTable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createTableHeaderColumns() {
    return this.props.headers.map((header) => (
      <TableHeaderColumn key={`${header.id}`}>{header.name}</TableHeaderColumn>
    ));
  }
  createTableRows() {
    return this.props.items.map((item) => (
      <TableRow key={`tr-${item.id}`}>{item.name}
        {
          Object.keys(item).filter((key) => key !== 'id')
            .map((key) => (
              <TableRowColumn key={`td-${key}`}>{item[key]}</TableRowColumn>
            ))
        }
      </TableRow>
    ));
  }

  render() {
    return (
      <div>
        <Table >
          <TableHeader
            displaySelectAll={this.props.displaySelectAll}
            adjustForCheckbox={this.props.adjustForCheckbox}
          >
            <TableRow>
              {this.createTableHeaderColumns()}
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.props.displayRowCheckbox}
            stripedRows={this.props.stripedRows}
            showRowHover={this.props.showRowHover}
          >
            {this.createTableRows()}
          </TableBody>
        </Table>
      </div>
    );
  }
}


DataTable.defaultProps = {
  displaySelectAll: false,
  adjustForCheckbox: false,
  displayRowCheckbox: false,
  stripedRows: true,
  showRowHover: true,
};

DataTable.propTypes = {
  displaySelectAll: PropTypes.bool,
  adjustForCheckbox: PropTypes.bool,
  displayRowCheckbox: PropTypes.bool,
  stripedRows: PropTypes.bool,
  showRowHover: PropTypes.bool,
  headers: PropTypes.arrayOf(PropTypes.object),
  items: PropTypes.arrayOf(PropTypes.object),
};

export default DataTable;
