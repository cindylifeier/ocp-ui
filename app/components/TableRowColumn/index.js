/**
 *
 * TableRowColumn
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableRowColumn = styled.div`
  color: rgb(51, 51, 51);
  font-family: "Arial Bold", "Arial", sans-serif;
  font-style: normal;
  font-size: 12px;
  font-weight: 700;
  line-height: normal;
  text-align: left;
  margin: 0;
  word-break: break-all;
  padding: 2px;
`;

TableRowColumn.propTypes = {
  children: PropTypes.node,
};

export default TableRowColumn;
