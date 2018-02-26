import { Grid } from 'styled-css-grid';

const TableHeaderGrid = Grid.extend`
  border-bottom: 1px outset rgb(51, 51, 51);

  &:first-child {
    background-color: #f2f2f2;
    font-size: 20px;
  }

  &:nth-child(odd) {
    background-color: #f2f2f2;
  }
`;

TableHeaderGrid.propTypes = {};

export default TableHeaderGrid;
