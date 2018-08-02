import { Grid } from 'styled-css-grid';

const ManageUserFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "firstName"
    "lastName"
    "username"
    "password"
    "repeatPassword"
    "assignPermissionGroup"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "firstName firstName"
      "lastName lastName"
      "username username"
      "password password"
      "repeatPassword repeatPassword"
      "assignPermissionGroup assignPermissionGroup"
      "buttonGroup .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "firstName firstName firstName firstName . . . . . . . ."
      "lastName lastName lastName lastName . . . . . . . ."
      "username username username username . . . . . . . ."
      "password password password password . . . . . . . ."
      "repeatPassword repeatPassword repeatPassword repeatPassword . . . . . . . ."
      "assignPermissionGroup assignPermissionGroup assignPermissionGroup assignPermissionGroup . . . . . . . ."
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManageUserFormGrid.propTypes = Grid.propTypes;

export default ManageUserFormGrid;
