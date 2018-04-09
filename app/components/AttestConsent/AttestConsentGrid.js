import { Grid } from 'styled-css-grid';

const AttestConsentGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "patientName"
    "patientDob"
    "authorization"
    "disclose"
    "healthInfo"
    "consentTerm"
    "start"
    "end"
    "agreement"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "header header"
      "patientName patientDob"
      "authorization authorization"
      "disclose disclose"
      "healthInfo healthInfo"
      "consentTerm consentTerm"
      "start end"
      "agreement agreement"
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "header header header header header header header header header header header header"
      "patientName patientName patientName patientName patientName patientName patientDob patientDob patientDob patientDob patientDob patientDob"
      "authorization authorization authorization authorization authorization authorization authorization authorization authorization authorization authorization authorization"
      "disclose disclose disclose disclose disclose disclose disclose disclose disclose disclose disclose disclose"
      "healthInfo healthInfo healthInfo healthInfo healthInfo healthInfo healthInfo healthInfo healthInfo healthInfo healthInfo healthInfo"
      "consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm consentTerm"
      "start start start start start start end end end end end end"
      "agreement agreement agreement agreement agreement agreement agreement agreement agreement agreement agreement agreement"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;


AttestConsentGrid.propTypes = Grid.propTypes;

export default AttestConsentGrid;
