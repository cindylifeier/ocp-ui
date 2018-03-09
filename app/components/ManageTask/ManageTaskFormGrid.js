import { Grid } from 'styled-css-grid';

const ManageTaskFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "activityDefinitions"
    "organization"
    "patientName"
    "requester"
    "authoredOn"
    "lastModifiedDate"
    "status"
    "priority"
    "intent"
    "context"
    "taskOwner"
    "performerType"
    "partOf"
    "taskStart"
    "taskEnd"
    "description"
    "comments"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "activityDefinitions activityDefinitions"
      "organization organization"
      "patientName patientName"
      "requester requester"
      "authoredOn lastModifiedDate"
      "status priority"
      "intent context"
      "taskOwner taskOwner"
      "performerType performerType"
      "partOf partOf"
      "taskStart taskEnd"
      "description description"
      "comments comments"
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "activityDefinitions activityDefinitions activityDefinitions activityDefinitions . . . . . . . ."
      "organization organization organization organization patientName patientName patientName patientName requester requester requester requester"
      "authoredOn authoredOn lastModifiedDate lastModifiedDate . . . . . . . ."
      "status status status priority priority priority intent intent intent context context context"
      "taskOwner taskOwner taskOwner taskOwner performerType performerType performerType performerType partOf partOf partOf partOf"
      "taskStart taskStart taskEnd taskEnd . . . . . . . ."
      "description description description . . . . . . . . ."
      "comments comments comments . . . . . . . . ."
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManageTaskFormGrid.propTypes = Grid.propTypes;

export default ManageTaskFormGrid;
