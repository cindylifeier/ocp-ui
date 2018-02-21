/**
 *
 * StyledUltimatePagination
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import CenterAlign from '../Align/CenterAlign';

function StyledUltimatePagination(props) {
  return (<CenterAlign><UltimatePagination {...props} /></CenterAlign>);
}

StyledUltimatePagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  boundaryPagesRange: PropTypes.number,
  siblingPagesRange: PropTypes.number,
  hidePreviousAndNextPageLinks: PropTypes.bool,
  hideFirstAndLastPageLinks: PropTypes.bool,
  hideEllipsis: PropTypes.bool,
};

StyledUltimatePagination.defaultProps = {
  boundaryPagesRange: 1,
  siblingPagesRange: 1,
  hidePreviousAndNextPageLinks: false,
  hideFirstAndLastPageLinks: false,
  hideEllipsis: false,
};

export default StyledUltimatePagination;
