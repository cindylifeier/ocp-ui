/**
 *
 * SelectConsentActors
 *
 */

import React from 'react';
import InfoSection from 'components/InfoSection';
import { Cell, Grid } from 'styled-css-grid';
import union from 'lodash/union';

import ConsentFromActors from 'components/ConsentFromActors';
import ConsentToActors from 'components/ConsentToActors';
import PropTypes from 'prop-types';


function SelectConsentActors(props) {
  const { consentFromActors, consentToActors } = props;
  const addedActors = union(consentFromActors, consentToActors);
  return (
    <InfoSection>
      <Grid columns={2} gap={'20px'}>
        <Cell>
          <ConsentFromActors consentFromActors={consentFromActors} addedActors={addedActors} />
        </Cell>
        <Cell>
          <ConsentToActors consentToActors={consentToActors} addedActors={addedActors} />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

SelectConsentActors.propTypes = {
  consentFromActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
  consentToActors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  })),
};

export default SelectConsentActors;