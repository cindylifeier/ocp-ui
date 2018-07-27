/**
*
* AutoSuggestion
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Field } from 'formik';
import ErrorMessage from 'components/AutoSuggestion/ErrorMessage';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

class AutoSuggestionBridge extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      suggestion: null,
      defaultRequiredMessage: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    const defaultMessage = (!selectedOption) || (selectedOption && selectedOption.value === null) ? 'Required' : null;
    this.setState({ suggestion: selectedOption, defaultRequiredMessage: defaultMessage });
  }

  render() {
    const { suggestions, disabled, field: { name, value }, form: { setFieldValue, setFieldTouched, errors }, ...rest } = this.props;
    this.defaultMessage = errors && errors[name] && errors[name].props && errors[name].props.defaultMessage ? errors[name].props.defaultMessage : '';
    return (
      <span>
        <Select
          name={name}
          options={suggestions}
          value={value || this.state.suggestion}
          disabled={disabled}
          onChange={(event) => {
            setFieldValue(name, event && event.value);
            this.handleChange(event);
          }}
          onClick={() => setFieldTouched(name)}
          errorText={errors[name]}
          {...rest}

        />
        {(this.defaultMessage && this.defaultMessage.length > 0) || this.state.defaultRequiredMessage ?
          <ErrorMessage>
            <FormattedMessage {...messages.required} />
          </ErrorMessage> : ''
        }
      </span>
    );
  }
}


function AutoSuggestionField(props) {
  const { name, ...rest } = props;
  return (
    <Field
      name={name}
      render={(p) => (<AutoSuggestionBridge {...p} {...rest} />)}
    />);
}

AutoSuggestionBridge.propTypes = {
  suggestions: PropTypes.array,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
  }).isRequired,
  form: PropTypes.shape({
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    errors: PropTypes.object,
  }).isRequired,
};

AutoSuggestionField.propTypes = {
  name: PropTypes.string,
};

export default AutoSuggestionField;
