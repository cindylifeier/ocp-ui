/**
 *
 * Sticky
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';

const Sticky = styled.div`
  position: sticky;
  top: ${({ top }) => top};
`;

Sticky.propTypes = {
  top: PropTypes.string,
};

Sticky.defaultProps = {
  top: '10px',
};

export default Sticky;
