/**
 *
 * ConsentCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import TextLabelGroup from 'components/TextLabelGroup';
import ConsentCardGrid from './ConsentCardGrid';
import ConsentCardHeaderCell from './ConsentCardHeaderCell';
import ConsentCartHeader from './ConsentCartHeader';
import ConsentCardContentCell from './ConsentCardContentCell';
import messages from './messages';


class ConsentCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { consent } = this.props;
    return (
      <ConsentCardGrid columns={1}>
        <ConsentCardHeaderCell>
          <ConsentCartHeader consent={consent} />
        </ConsentCardHeaderCell>
        <ConsentCardContentCell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.consentStatus} />}
            text={consent.status}
          />
        </ConsentCardContentCell>
      </ConsentCardGrid>
    );
  }
}

ConsentCard.propTypes = {
  consent: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    status: PropTypes.string,
    fromActor: PropTypes.array,
    toActor: PropTypes.array,
    period: PropTypes.shape({
      start: PropTypes.date,
      end: PropTypes.date,
    }),
  }).isRequired,
};

export default ConsentCard;
