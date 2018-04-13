/**
 *
 * AddArtifactForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import Yup from 'yup';
import MenuItem from 'material-ui/MenuItem';

import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import messages from './messages';

const FormTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #444;
  background-color: #f2f2f2;
`;

function AddArtifactForm({ onAddArtifact, onRemoveArtifact, relatedArtifactTypes, callback, initialValues }) {
  return (
    <div>
      <FormTitle><FormattedMessage {...messages.header} /></FormTitle>
      <Formik
        onSubmit={(values) => {
          if (initialValues) {
            onRemoveArtifact(initialValues.index);
          }
          onAddArtifact(values);
          if (callback) {
            callback();
          }
        }}
        initialValues={{ ...(initialValues || {}).artifact }}
        validationSchema={Yup.object().shape({
          display: Yup.string().required('Required'),
          type: Yup.string().required('Required'),
        })}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <TextField name="display" floatingLabelText={<FormattedMessage {...messages.displayLabel} />} fullWidth />
            <SelectField name="type" floatingLabelText={<FormattedMessage {...messages.displayLabel} />} fullWidth>
              {relatedArtifactTypes.map(({ code, system, display }) => (
                <MenuItem key={`${system}|${code}`} value={code} primaryText={display} />
              ))}
            </SelectField>
            <StyledRaisedButton type="submit" disabled={!dirty || isSubmitting || !isValid}>
              <FormattedMessage {...messages.saveButtonLabel} />
            </StyledRaisedButton>
            <StyledFlatButton type="reset" onClick={callback}>
              <FormattedMessage {...messages.cancelButtonLabel} />
            </StyledFlatButton>
          </Form>
        )}
      />
    </div>
  );
}

AddArtifactForm.propTypes = {
  onAddArtifact: PropTypes.func.isRequired,
  onRemoveArtifact: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    index: PropTypes.number.isRequired,
    artifact: PropTypes.object.isRequired,
  }),
  relatedArtifactTypes: PropTypes.array,
  callback: PropTypes.func,
};

AddArtifactForm.defaultProps = {
  relatedArtifactTypes: [],
};

export default AddArtifactForm;
