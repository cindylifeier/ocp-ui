import styled from 'styled-components';
import PropType from 'prop-types';

const StyledTableRowDetails = styled.div`
  margin-top: -2px;
  overflow: hidden;
  background-color: rgba(242, 242, 242, 1);
  border: 1px solid rgba(204, 204, 204, 1);
  transition: height 300ms;
  height: ${(props) => props.expanded ? props.height : '0px'};
`;

StyledTableRowDetails.propTypes = {
  height: PropType.string.isRequired,
  expanded: PropType.bool.isRequired,
};

StyledTableRowDetails.defaultProps = {
  expanded: false,
  height: '0px',
};

export default StyledTableRowDetails;
