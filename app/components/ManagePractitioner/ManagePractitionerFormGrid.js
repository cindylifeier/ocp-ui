import { Grid } from 'styled-css-grid';

const ManagePractitionerFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "firstName"
    "middleName"
    "lastName"
    "identifierGroup"
    "address1"
    "address2"
    "city"
    "state"
    "postalCode"
    "country"
    "contactGroup"
    "associateOrganizationSection"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "firstName lastName"
      "middleName ."
      "identifierGroup identifierGroup"
      "address1 ."
      "address2 ."
      "city state"
      "postalCode country"
      "contactGroup contactGroup"
      "associateOrganizationSection associateOrganizationSection"
      "buttonGroup .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "firstName firstName firstName firstName middleName middleName middleName middleName lastName lastName lastName lastName"
      "identifierGroup identifierGroup identifierGroup identifierGroup . . . . . . . ."
      "address1 address1 address1 address1 address2 address2 address2 address2 . . . ."
      "city city city city state state state postalCode postalCode . . ."
      "country country country country . . . . . . . ."
      "contactGroup contactGroup contactGroup contactGroup contactGroup . . . . . . ."
      "associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManagePractitionerFormGrid.propTypes = Grid.propTypes;

export default ManagePractitionerFormGrid;
