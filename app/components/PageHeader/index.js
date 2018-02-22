/**
 *
 * PageHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'material-ui';

import PageTitle from './PageTitle';
import PageSubtitle from './PageSubtitle';

function PageHeader({ title, subtitle }) {
  return (
    <div>
      <PageTitle>{title}</PageTitle>
      <Divider />
      {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
};

export default PageHeader;
