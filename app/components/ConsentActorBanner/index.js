/**
 *
 * ConsentActorBanner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Banner from './Banner';


function ConsentActorBanner({ name, identifiers, addresses, telecoms }) {
  return (
    <Banner>
      {name}
      {identifiers}
      {addresses}
      {telecoms}
    </Banner>
  );
}

ConsentActorBanner.propTypes = {
  name: PropTypes.string.isRequired,
  identifiers: PropTypes.string.isRequired,
  addresses: PropTypes.string,
  telecoms: PropTypes.string,
};

export default ConsentActorBanner;
