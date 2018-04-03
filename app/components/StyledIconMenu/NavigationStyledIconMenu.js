import React from 'react';
import NavigationMenu from 'material-ui/svg-icons/navigation/more-horiz';

import StyledIconMenu from './index';
import StyledIconButton from '../StyledIconButton';

const NavigationStyledIconMenu = StyledIconMenu.extend.attrs({
  iconButtonElement: (<StyledIconButton><NavigationMenu /></StyledIconButton>),
})('');

NavigationStyledIconMenu.propTypes = {};

export default NavigationStyledIconMenu;
