import { Grid } from 'styled-css-grid';

const LocationGroupGrid = Grid.extend`
  grid-template-columns: 1fr;
  grid-template-areas:
    "physicalType"
    "managingLocationLogicalId";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    grid-template-areas: "physicalType managingLocationLogicalId";
  }
`;

LocationGroupGrid.propTypes = {};

export default LocationGroupGrid;
