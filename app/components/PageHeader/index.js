/**
 *
 * PageHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'material-ui';

import PageHeaderWrapper from './PageHeaderWrapper';

function PageHeader({ children }) {
  return (
    <div>
      <PageHeaderWrapper>{children}</PageHeaderWrapper>
      <Divider />
    </div>
  );
}

PageHeader.propTypes = {
  children: PropTypes.node,
};

export default PageHeader;
