import { Grid } from 'styled-css-grid';

const ManageActivityDefinitionFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "version"
    "selectedOrganization"
    "systemName"
    "displayName"
    "status"
    "lastPublishDate"
    "description"
    "effectivePeriodStart"
    "effectivePeriodEnd"
    "topic"
    "kind"
    "participantType"
    "participantRole"
    "duration"
    "frequency"
    "relatedArtifactsSection"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "version version"
      "selectedOrganization selectedOrganization"
      "systemName systemName"
      "displayName displayName"
      "status status"
      "description description"
      "lastPublishDate lastPublishDate"
      "effectivePeriodStart effectivePeriodEnd"
      "duration frequency"
      "topic topic"
      "kind kind"
      "participantType participantRole"
      "relatedArtifactsSection relatedArtifactsSection"
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "version version version version . . . . . . . ."
      "selectedOrganization selectedOrganization selectedOrganization selectedOrganization . . . . . . . ."
      "systemName systemName systemName systemName displayName displayName displayName displayName . . . ."
      "status status status status description description description description . . . ."
      "lastPublishDate lastPublishDate lastPublishDate lastPublishDate . . . . . . . ."
      "effectivePeriodStart effectivePeriodStart effectivePeriodStart effectivePeriodEnd effectivePeriodEnd effectivePeriodEnd duration duration duration frequency frequency frequency"
      "topic topic topic topic kind kind kind kind . . . ."
      "participantType participantType participantType participantRole participantRole participantRole . . . . . ."
      "relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManageActivityDefinitionFormGrid.propTypes = Grid.propTypes;

export default ManageActivityDefinitionFormGrid;
