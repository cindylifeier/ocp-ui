/**
 *
 * RecordsRange
 *
 */

import React from 'react';
import CenterAlign from 'components/Align/CenterAlign';
import PropTypes from 'prop-types';

function recordStart(currentPage, currentPageSize) {
  return (((currentPage - 1) * currentPageSize) + 1);
}

function recordEnd(currentPage, currentPageSize) {
  return (((currentPage - 1) * currentPageSize) + currentPageSize);
}

function RecordsRange(props) {
  const lastPage = (props.currentPage === props.totalPages);
  return (
    <div>
      <CenterAlign>
        {lastPage ? (
          <div>
            &lt;{(props.totalElements - props.currentPageSize) + 1}
            -{props.totalElements}&gt;
            / {props.totalElements}
          </div>
        ) : (
          <div>
            &lt;{recordStart(props.currentPage, props.currentPageSize)}
            -{recordEnd(props.currentPage, props.currentPageSize)}&gt;
            / {props.totalElements}
          </div>
        )}
      </CenterAlign>
    </div>
  );
}

RecordsRange.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  totalElements: PropTypes.number,
  currentPageSize: PropTypes.number,
};

export default RecordsRange;
