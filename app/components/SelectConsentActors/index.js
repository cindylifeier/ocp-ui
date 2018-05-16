/**
 *
 * SelectConsentActors
 *
 */

import React from 'react';
import InfoSection from 'components/InfoSection';
import { Cell, Grid } from 'styled-css-grid';
import ConsentFromActors from 'components/ConsentFromActors';
import ConsentToActors from 'components/ConsentToActors';
import PropTypes from 'prop-types';


function SelectConsentActors(props) {
  const { consentFromActors, consentToActors } = props;
  return (
    <InfoSection>
      <Grid columns={2} gap={'20px'}>
        <Cell>
          <ConsentFromActors consentFromActors={consentFromActors} />
        </Cell>
        <Cell>
          <ConsentToActors consentToActors={consentToActors} />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

SelectConsentActors.propTypes = {
  consentFromActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
  })),
  consentToActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
  })),
};

export default SelectConsentActors;
