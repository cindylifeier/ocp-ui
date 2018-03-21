/**
 *
 * TableHeaderColumn
 *
 */


import PropTypes from 'prop-types';
import styled from 'styled-components';

const TableHeaderColumn = styled.div`
  color: rgb(51, 51, 51);
  font-family: "Arial Bold", "Arial", sans-serif;
  font-style: normal;
  font-size: 15px;
  font-weight: 700;
  line-height: normal;
  text-align: left;
  margin: 0;
  word-break: break-word;
  padding: 2px;
`;

TableHeaderColumn.propTypes = {
  children: PropTypes.node,
};

export default TableHeaderColumn;
