import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';

import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import AddParticipantORServiceFormGrid from 'components/AddParticipantOrServiceDialog/AddParticipantOrServiceDialogGrid';
import DialogHeader from 'components/DialogHeader';
import messages from './messages';

function AddParticipantOrServiceForm(props) {
  const {
    handleDialogClose,
  } = props;
  // const today = new Date();

  function setInitialValues() {
    return {
    };
  }
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          console.log(actions);
          console.log(values);
        }}
        initialValues={setInitialValues({})}
        validationSchema={() =>
          yup.lazy((values) => {
            console.log(values);
            return yup.object().shape({
            });
          })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <AddParticipantORServiceFormGrid gap="1vw" >
              <Cell area="dialogTitle" >
                <DialogHeader>
                  {<FormattedMessage {...messages.addParticipantOrServiceDialogTitle} />}
                </DialogHeader>
              </Cell>
              <Cell area="serviceCareTeamNonCareTeamTab" >

              </Cell>
              <Cell area="actionButtons">
                <Grid columns={2}>
                  <Cell>
                    <StyledRaisedButton
                      type="submit"
                      disabled={!dirty || isSubmitting || !isValid}
                    >
                      <FormattedMessage {...messages.saveButton} />
                    </StyledRaisedButton>
                  </Cell>
                  <Cell>
                    <StyledFlatButton type="reset" onClick={handleDialogClose}>
                      <FormattedMessage {...messages.cancelButton} />
                    </StyledFlatButton>
                  </Cell>
                </Grid>
              </Cell>
            </AddParticipantORServiceFormGrid>
          </Form>
        )}
      />
    </div>
  );
}

AddParticipantOrServiceForm.propTypes = {
  handleDialogClose: PropTypes.func.isRequired,

};

export default AddParticipantOrServiceForm;

