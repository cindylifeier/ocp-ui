/**
*
* SearchRecipientDialogContent
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import FormGrid from 'components/FormGrid';
import FormCell from 'components/FormCell';
import { Cell, Grid } from 'styled-css-grid';
import RecipientsTable from 'components/RecipientsTable';
import PropTypes from 'prop-types';
import StyledIconButton from 'components/StyledIconButton';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import ActionSearch from 'material-ui/svg-icons/action/search';
import MenuItem from 'material-ui/MenuItem';
import { Form, Formik } from 'formik';
import yup from 'yup';
import messages from './messages';


function SearchRecipientDialogContent(props) {
  const {
    recipients,
    updateCheck,
    selectedRecipients,
    getRoleName,
    handleSearch,
    participantTypes,
  } = props;
  const localProps = {
    recipients,
    updateCheck,
    selectedRecipients,
    getRoleName,
  };
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          handleSearch(values);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
        })}
        render={(formikProps) => {
          const { isSubmitting } = formikProps;
          return (
            <Form>
              <FormGrid columns={12}>
                <FormCell top={1} left={1} width={7}>
                  <Grid columns="3fr 3fr 1fr" gap="">
                    <Cell>
                      <TextField
                        name="name"
                        fullWidth
                        hintText={<FormattedMessage {...messages.hintText.practitionerName} />}
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerName} />}
                      />
                    </Cell>
                    <Cell>
                      <SelectField
                        name="member"
                        fullWidth
                        floatingLabelText={<FormattedMessage {...messages.floatingLabelText.practitionerMember} />}
                      >
                        {participantTypes && participantTypes.map((member) =>
                          <MenuItem key={member.code} value={member.code} primaryText={member.display} />,
                        )}
                      </SelectField>
                    </Cell>
                    <Cell>
                      <StyledIconButton
                        tooltip={<FormattedMessage {...messages.searchButtonTooltip} />}
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <ActionSearch />
                      </StyledIconButton>
                    </Cell>
                  </Grid>
                </FormCell>
              </FormGrid>
            </Form>
          );
        }}
      />
      <RecipientsTable {...localProps} />
    </div>
  );
}

SearchRecipientDialogContent.propTypes = {
  recipients: PropTypes.array.isRequired,
  participantTypes: PropTypes.array.isRequired,
  selectedRecipients: PropTypes.array.isRequired,
  updateCheck: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  getRoleName: PropTypes.func.isRequired,
};

export default SearchRecipientDialogContent;
