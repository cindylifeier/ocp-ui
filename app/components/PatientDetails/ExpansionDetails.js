import styled from 'styled-components';
import PropType from 'prop-types';

const ExpansionDetails = styled.div`
  margin-top: 5px;
  background-color: rgba(240, 248, 250, 1);
  border: ${(props) => props.expanded && '1px solid rgba(204, 204, 204, 1)'};
  overflow: hidden;
  transition: height 300ms;
  height: ${(props) => props.expanded ? '100px' : '0px'};
`;

ExpansionDetails.propTypes = {
  expanded: PropType.bool.isRequired,
};

ExpansionDetails.defaultProps = {
  expanded: false,
};

export default ExpansionDetails;
