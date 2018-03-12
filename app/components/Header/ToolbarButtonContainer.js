import styled from 'styled-components';

const ToolbarButtonContainer = styled.span`
  & > * {
    color: #9cc !important;
  }

  & svg {
    fill: #9cc !important;
    transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  }

  &:hover svg {
    fill: white !important;
  }
`;

ToolbarButtonContainer.propTypes = {};

export default ToolbarButtonContainer;
