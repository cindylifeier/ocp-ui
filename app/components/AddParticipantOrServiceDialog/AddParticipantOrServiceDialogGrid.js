import { Grid } from 'styled-css-grid';

const AddParticipantORServiceFormGrid = Grid.extend`
  width: auto;
  margin: 1vh 1vw;
  grid-row-gap: 0.5vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "dialogTitle"
    "serviceCareTeamNonCareTeamTab"
    "actionButtons";

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "dialogTitle"
      "serviceCareTeamNonCareTeamTab"
      "actionButtons";
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "dialogTitle dialogTitle dialogTitle ."
      "serviceCareTeamNonCareTeamTab serviceCareTeamNonCareTeamTab serviceCareTeamNonCareTeamTab serviceCareTeamNonCareTeamTab"
      "actionButtons . . .";
  }
`;

AddParticipantORServiceFormGrid.propTypes = {};

export default AddParticipantORServiceFormGrid;
