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
`;

StickyDiv.propTypes = {
  top: PropTypes.string,
};

StickyDiv.defaultProps = {
  top: '10px',
};

export default StickyDiv;
