/**
*
* TodoCardGrid
*
*/

import { Grid } from 'styled-css-grid';

const TodoCardGrid = Grid.extend`
  color: #444;
  width: auto;
  margin: 0 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
`;

TodoCardGrid.propTypes = {};

export default TodoCardGrid;
