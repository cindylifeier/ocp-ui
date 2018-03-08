import { Grid } from 'styled-css-grid';

const ManagePatientFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "firstName"
    "lastName"
    "birthDate"
    "genderCode"
    "birthSex"
    "race"
    "ethnicity"
    "language"
    "identifierGroup"
    "contactGroup"
    "address1"
    "address2"
    "city"
    "state"
    "postalCode"
    "country"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "firstName lastName"
      "birthDate genderCode"
      "birthSex race"
      "ethnicity language"
      "identifierGroup identifierGroup"
      "contactGroup contactGroup"
      "address1 ."
      "address2 ."
      "city state"
      "postalCode country"
      "buttonGroup .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "firstName firstName firstName firstName lastName lastName lastName lastName . . . ."
      "birthDate birthDate birthDate birthDate genderCode genderCode birthSex birthSex . . . ."
      "race race ethnicity ethnicity ethnicity language language . . . . ."
      "identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup . . . . . . ."
      "contactGroup contactGroup contactGroup contactGroup contactGroup . . . . . . ."
      "address1 address1 address1 address1 address2 address2 address2 address2 . . . ."
      "city city city city state state state postalCode postalCode . . ."
      "country country country country . . . . . . . ."
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManagePatientFormGrid.propTypes = Grid.propTypes;

export default ManagePatientFormGrid;
