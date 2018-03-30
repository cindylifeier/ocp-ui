/**
 *
 * Table
 *
 */

import PropTypes from 'prop-types';
import styled from 'styled-components';

const Table = styled.div`
  padding: 0 2px 2px 2px;
  background-color: white;
`;


Table.propTypes = {
  children: PropTypes.node,
};

export default Table;
