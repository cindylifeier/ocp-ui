/**
 *
 * TabContainer
 *
 */

import React from 'react';
import { Typography } from 'material-ui-next/es';
import PropTypes from 'prop-types';

function TabContainer(props) {
  return (
    <Typography component="div" >
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TabContainer;
