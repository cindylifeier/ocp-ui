/**
 *
 * CardHeader
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import CardHeaderContainerStyledGrid from './CardHeaderContainerStyledGrid';
import CardHeaderContainerStyledCell from './CardHeaderContainerStyledCell';
import CardTitle from './CardTitle';

function CardHeader({ title, children }) {
  const childrenCount = React.Children.count(children);
  return (
    <CardHeaderContainerStyledGrid columns={`1fr repeat(${childrenCount}, 150px)`}>
      <CardHeaderContainerStyledCell>
        <CardTitle>{title}</CardTitle>
      </CardHeaderContainerStyledCell>
      {React.Children.map(children, (child) => (
        <CardHeaderContainerStyledCell key={uniqueId()}>
          {child}
        </CardHeaderContainerStyledCell>
      ))}
    </CardHeaderContainerStyledGrid>);
}

CardHeader.propTypes = {
  title: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default CardHeader;
