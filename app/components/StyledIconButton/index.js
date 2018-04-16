/**
 *
 * StyledIconButton
 *
 */
import styled from 'styled-components';
import IconButton from 'material-ui-next/IconButton';

const StyledIconButton = styled(IconButton)`
  &&:hover {
    background-color: inherit;
  }

  &&:hover svg {
    background-color: #91bdba;
    border-radius: 5px;
  }
`;

StyledIconButton.propTypes = {};

export default StyledIconButton;
