/**
 *
 * StyledMenuItem
 *
 */

import styled from 'styled-components';
import PropTypes from 'prop-types';
import MenuItem from 'material-ui/MenuItem';


const StyledMenuItem = styled(MenuItem)`
  display: inline-block;
`;

StyledMenuItem.propTypes = {
  /**
   * Inherited propTypes for the styled Material UI MenuItem.
   * See https://raw.githubusercontent.com/mui-org/material-ui/v0.19.4/src/MenuItem/MenuItem.js
   */
  /**
   * Location of the anchor for the popover of nested `MenuItem`
   * elements.
   * Options:
   * horizontal: [left, middle, right]
   * vertical: [top, center, bottom].
   */
  anchorOrigin: PropTypes.origin,
  /**
   * Override the default animation component used.
   */
  animation: PropTypes.func,
  /**
   * If true, a left check mark will be rendered.
   */
  checked: PropTypes.bool,
  /**
   * Elements passed as children to the underlying `ListItem`.
   */
  children: PropTypes.node,
  /**
   * @ignore
   * If true, the menu item will render with compact desktop
   * styles.
   */
  desktop: PropTypes.bool,
  /**
   * If true, the menu item will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The focus state of the menu item. This prop is used to set the focus
   * state of the underlying `ListItem`.
   */
  focusState: PropTypes.oneOf([
    'none',
    'focused',
    'keyboard-focused',
  ]),
  /**
   * Override the inline-styles of the inner div.
   */
  innerDivStyle: PropTypes.object,
  /**
   * If true, the children will be indented.
   * This is only needed when there is no `leftIcon`.
   */
  insetChildren: PropTypes.bool,
  /**
   * The `SvgIcon` or `FontIcon` to be displayed on the left side.
   */
  leftIcon: PropTypes.element,
  /**
   * `MenuItem` elements to nest within the menu item.
   */
  menuItems: PropTypes.node,
  /**
   * Callback function fired when the menu item is touch-tapped.
   *
   * @param {object} event TouchTap event targeting the menu item.
   */
  onClick: PropTypes.func,
  /**
   * Can be used to render primary text within the menu item.
   */
  primaryText: PropTypes.node,
  /**
   * The `SvgIcon` or `FontIcon` to be displayed on the right side.
   */
  rightIcon: PropTypes.element,
  /**
   * Can be used to render secondary text within the menu item.
   */
  secondaryText: PropTypes.node,
  /**
   * Override the inline-styles of the root element.
   */
  style: PropTypes.object,
  /**
   * Location on the popover of nested `MenuItem` elements that will attach
   * to the anchor's origin.
   * Options:
   * horizontal: [left, middle, right]
   * vertical: [top, center, bottom].
   */
  targetOrigin: PropTypes.origin,
  /**
   * The value of the menu item.
   */
  value: PropTypes.any,
};

export default StyledMenuItem;
