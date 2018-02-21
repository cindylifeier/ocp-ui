import { Cell } from 'styled-css-grid';

const PatientsPageStyledCell = Cell.extend`
  background-color: #fff;
  color: rgb(51, 51, 51);
  border-radius: 5px;
  padding: 3px;
  font-size: 100%;
`;

PatientsPageStyledCell.propTypes = {};

export default PatientsPageStyledCell;
