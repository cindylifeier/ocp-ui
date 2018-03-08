import { Grid } from 'styled-css-grid';

const IdentifierGroupGrid = Grid.extend`
  grid-template-columns: 1fr;
  grid-template-areas:
    "identifierSystem"
    "identifierValue";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    grid-template-areas: "identifierSystem identifierValue";
  }
`;

IdentifierGroupGrid.propTypes = {
  ...Grid.propTypes,
};

export default IdentifierGroupGrid;
