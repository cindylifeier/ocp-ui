import React from 'react';
import PropTypes from 'prop-types';
import { Cell } from 'styled-css-grid';

import { VALUE } from './constants';

function SystemCell({ area, children, ...rest }) {
  return (
    <Cell area={area} {...rest}>
      {children}
    </Cell>);
}

SystemCell.propTypes = {
  ...Cell.propTypes,
  children: PropTypes.node,
  area: PropTypes.string,
};

SystemCell.defaultProps = {
  area: VALUE,
};

export default SystemCell;
