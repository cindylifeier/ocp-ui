import styled from 'styled-components';
import StyledRaisedButton from 'components/StyledRaisedButton';

const StyledSearchButton = styled(StyledRaisedButton).attrs({
  variant: 'raised',
})`
  && {
    font-size: 12px;
    font-weight: bold;
    min-height: 10px;
    height: 30px;
    margin-left: 10px;
    top: -3px;
  }
`;

export default StyledSearchButton;
