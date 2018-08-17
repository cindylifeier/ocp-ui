import { Grid } from 'styled-css-grid';

const CreatePractitionerForm = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "firstName"
    "lastName"
    "identifierGroup"
    "button";

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "firstName firstName firstName firstName firstName firstName lastName lastName lastName lastName lastName lastName"
      "identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup . . . ."
      "button button button button button button button . . . . .";
  }
`;

CreatePractitionerForm.propTypes = {};

export default CreatePractitionerForm;
