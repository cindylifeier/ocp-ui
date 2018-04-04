import { Grid } from 'styled-css-grid';

const ManageConsentFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "patientName"
    "careTeamGroup"
    "medicalInfoGroup"
    "purposeOfUseGroup"
    "consentTermGroup"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "careTeamGroup ."
      "medicalInfoGroup ."
      "purposeOfUseGroup ."
      "consentTermGroup ."
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle . . . ."
      "patientName patientName patientName patientName . . . . . . . ."
      "careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup careTeamGroup . . . ."
      "medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup medicalInfoGroup . . . ."
      "purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup purposeOfUseGroup . . . ."
      "consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup consentTermGroup . . . ."
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;


ManageConsentFormGrid.propTypes = Grid.propTypes;

export default ManageConsentFormGrid;