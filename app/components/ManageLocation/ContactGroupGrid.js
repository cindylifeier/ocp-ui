import { Grid } from 'styled-css-grid';

const ContactGroupGrid = Grid.extend`
  grid-template-columns: 1fr;
  grid-template-areas:
    "telecomSystem"
    "telecomSystemValue";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
    grid-template-areas: "telecomSystem telecomSystemValue";
  }
`;

ContactGroupGrid.propTypes = {};

export default ContactGroupGrid;
