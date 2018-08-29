import { Grid } from 'styled-css-grid';

const AddParticipantORServiceFormGrid = Grid.extend`
  width: auto;
  margin: 1vh 1vw;
  grid-row-gap: 0.5vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "serviceCareTeamNonCareTeamTab"
    "buttonGroup";

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "serviceCareTeamNonCareTeamTab serviceCareTeamNonCareTeamTab serviceCareTeamNonCareTeamTab serviceCareTeamNonCareTeamTab"
      "buttonGroup . . .";
  }
`;

AddParticipantORServiceFormGrid.propTypes = {};

export default AddParticipantORServiceFormGrid;
