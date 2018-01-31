/**
*
* SeaachParticipant
*
*/

import React from 'react';
import yup from 'yup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { Formik } from 'formik';
import { teal500, white } from 'material-ui/styles/colors';
import styles from './styles.css';
import messages from './messages';

class SearchParticipant extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleOpen() {
    this.setState({ open: true });
  }
  render() {
    const { onSearch } = this.props;
    const actionsButtons = [
      <FlatButton
        label={<FormattedMessage {...messages.addParticipantDialogCancelBtnLabel} />}
        onClick={this.handleClose}
      />,
    ];
    return (
      <div className={styles.root} >
        <Formik
          initialValues={{}}
          onSubmit={(values, actions) => {
            onSearch(values);
            actions.setSubmitting(false);
          }}
          validationSchema={yup.object().shape({
          })}
          render={() => (
            <form>
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <div className={styles.buttonGroup}>
                    <RaisedButton
                      backgroundColor={teal500}
                      labelColor={white}
                      onClick={this.handleOpen}
                      label={<FormattedMessage {...messages.addParticipantBtnLabel} />}
                      primary
                    />
                    <Dialog
                      title={<FormattedMessage {...messages.addParticipantDialogTitle} />}
                      actions={actionsButtons}
                      modal={false}
                      open={this.state.open}
                      onRequestClose={this.handleClose}
                      autoScrollBodyContent
                    >
                      <p>Test</p>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <p> Participant Table goes here!!</p>
                </div>
              </div>
            </form>
          )
          }
        />
      </div>
    );
  }
}

SearchParticipant.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchParticipant;
