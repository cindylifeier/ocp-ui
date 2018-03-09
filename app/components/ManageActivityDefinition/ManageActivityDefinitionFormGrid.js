import { Grid } from 'styled-css-grid';

const ManagePractitionerFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "selectedOrganization"
    "version"
    "systemName"
    "displayName"
    "description"
    "lastPublishDate"
    "effectivePeriodStart"
    "effectivePeriodEnd"
    "duration"
    "frequency"
    "status"
    "topic"
    "kind"
    "participantType"
    "participantRole"
    "relatedArtifactSubtitle"
    "addArtifactsButton"
    "relatedArtifactsSection"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "selectedOrganization selectedOrganization"
      "version version"
      "systemName systemName"
      "displayName displayName"
      "description description"
      "lastPublishDate lastPublishDate"
      "effectivePeriodStart effectivePeriodEnd"
      "duration frequency"
      "status status"
      "topic topic"
      "kind kind"
      "participantType participantRole"
      "relatedArtifactSubtitle relatedArtifactSubtitle"
      "addArtifactsButton addArtifactsButton"
      "relatedArtifactsSection relatedArtifactsSection"
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "selectedOrganization selectedOrganization selectedOrganization . . . . . . . . ."
      "version version version systemName systemName systemName displayName displayName displayName description description description"
      "effectivePeriodStart effectivePeriodStart effectivePeriodStart effectivePeriodEnd effectivePeriodEnd effectivePeriodEnd duration duration duration frequency frequency frequency"
      "lastPublishDate lastPublishDate lastPublishDate lastPublishDate lastPublishDate lastPublishDate . . . . . ."
      "status status status status topic topic topic topic kind kind kind kind"
      "participantType participantType participantType participantRole participantRole participantRole . . . . . ."
      "relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle"
      "addArtifactsButton addArtifactsButton . . . . . . . . . ."
      "relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManagePractitionerFormGrid.propTypes = Grid.propTypes;

export default ManagePractitionerFormGrid;
