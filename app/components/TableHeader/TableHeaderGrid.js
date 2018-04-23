import { Grid } from 'styled-css-grid';

const TableHeaderGrid = Grid.extend`
  border-bottom: 2px outset #000;

  &:first-child {
    background-color: white;
    font-size: 20px;
  }

  &:nth-child(odd) {
    background-color: white;
  }
`;

TableHeaderGrid.propTypes = {};

export default TableHeaderGrid;
