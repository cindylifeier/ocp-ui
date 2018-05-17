import { Grid } from 'styled-css-grid';

const ManagePouFormGrid = Grid.extend`
  font-weight: bold;
  color: #366;
  padding: 5px 20px;
  font-size: 1.1rem;
  background-color: #eee;
`;


ManagePouFormGrid.propTypes = Grid.propTypes;

export default ManagePouFormGrid;
