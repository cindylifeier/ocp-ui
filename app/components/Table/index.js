/**
 *
 * Table
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Table = styled.div`
  margin: 10px;
  background-color: white;
  min-width: 450px;
`;


Table.propTypes = {
  children: PropTypes.node,
};

export default Table;
