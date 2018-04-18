import { Grid } from 'styled-css-grid';

const PatientDetailsGrid = Grid.extend`
  border-radius: 6px;
  border: 3px solid rgba(0, 153, 153, 1);
  height: 100px;
  font-size: 13px;
  margin-bottom: 6px;
`;

PatientDetailsGrid.propTypes = {};

export default PatientDetailsGrid;
