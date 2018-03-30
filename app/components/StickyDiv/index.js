/**
 *
 * StickyDiv
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';


const StickyDiv = styled.div`
  position: sticky;
  top: ${({ top }) => top};
  z-index: 9;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

StickyDiv.propTypes = {
  top: PropTypes.string,
  backgroundColor: PropTypes.string,
};

StickyDiv.defaultProps = {
  top: '0',
  backgroundColor: '#fff',
};

export default StickyDiv;
