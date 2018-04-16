import React from 'react';
import PropTypes from 'prop-types';

import SliderHeaderSection from './SliderHeaderSection';

function OrganizationSliderHeader(props) {
  const { organization: { name, identifiers, active } } = props;
  return (
    <SliderHeaderSection padding="15px 20px">
      <p>{name}</p>
      <p>{identifiers}</p>
      <p>{active}</p>
    </SliderHeaderSection>
  );
}

OrganizationSliderHeader.propTypes = {
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    })),
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }).isRequired,
};

export default OrganizationSliderHeader;
