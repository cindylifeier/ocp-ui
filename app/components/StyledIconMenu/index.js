/**
 *
 * StyledIconMenu
 *
 */

import styled from 'styled-components';
import IconMenu from 'material-ui/IconMenu';

const origin = { horizontal: 'right', vertical: 'top' };

const StyledIconMenu = styled(IconMenu).attrs({
  anchorOrigin: origin,
  targetOrigin: origin,
})('');

StyledIconMenu.propTypes = {};

export default StyledIconMenu;
