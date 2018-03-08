import { Grid } from 'styled-css-grid';
import { SYSTEM, VALUE } from './constants';

const IdentifierGroupGrid = Grid.extend`
  grid-template-columns: 1fr;
  grid-template-areas:
    "${SYSTEM}"
    "${VALUE}";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    grid-template-areas: "${SYSTEM} ${VALUE}";
  }
`;

IdentifierGroupGrid.propTypes = {
  ...Grid.propTypes,
};

export default IdentifierGroupGrid;
