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

class AutoSuggestionBridge extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      suggestion: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedOption) {
    this.setState({ suggestion: selectedOption });
  }

  render() {
    const { suggestions, field: { name, value }, form: { setFieldValue, setFieldTouched, errors }, ...rest } = this.props;
    return (
      <Select
        name={name}
        options={suggestions}
        value={value || this.state.suggestion}
        onChange={(event) => {
          this.handleChange(event);
          setFieldValue(name, event && event.value);
        }}
        onClick={() => setFieldTouched(name)}
        errorText={errors[name]}
        {...rest}

      />
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
  suggestions: PropTypes.array.isRequired,
  name: PropTypes.string,
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
