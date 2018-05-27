/**
 *
 * ConsentCards
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';


function ConsentCards() {
  return (
    <div>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

ConsentCards.propTypes = {
  consentData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handlePageClick: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
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
    })).isRequired,
  }),
};

export default ConsentCards;
