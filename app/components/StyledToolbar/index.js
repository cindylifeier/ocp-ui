/**
 *
 * StyledToolbar
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Toolbar } from 'material-ui/Toolbar';

const StyledToolbar = styled(Toolbar)`
  background-color: ${(props) => props.backgroundColor || 'rgba(32, 60, 85, 1)'} !important;
  height: ${(props) => props.height || '40px'} !important;
`;

StyledToolbar.propTypes = {
  backgroundColor: PropTypes.string,
  height: PropTypes.string,
};

export default StyledToolbar;
