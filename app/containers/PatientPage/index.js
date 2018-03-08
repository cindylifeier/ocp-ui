/**
 *
 * PatientPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import makeSelectSelectedPatient from '../App/sharedDataSelectors';
import { getPatient } from '../App/actions';
import renderNotFoundComponent from '../NotFoundPage/render';
import renderTasksComponent from '../Tasks/render';
import renderCommunicationsComponent from '../Communications/render';
import GoldenLayout from '../../components/GoldenLayout';
import PatientPageGrid from './PatientPageGrid';
import PatientPageCell from './PatientPageCell';

const initialStateMetadata =
  {
    settings: {
      hasHeaders: true,
      constrainDragToContainer: false,
      reorderEnabled: true,
      selectionEnabled: false,
      popoutWholeStack: false,
      blockedPopoutsThrowError: true,
      closePopoutsOnUnload: true,
      showPopoutIcon: false,
      showMaximiseIcon: true,
      showCloseIcon: true,
      responsiveMode: 'onload',
      tabOverlapAllowance: 0,
      reorderOnTabMenuClick: true,
      tabControlOffset: 10,
    },
    dimensions: {
      borderWidth: 5,
      borderGrabWidth: 15,
      minItemHeight: 10,
      minItemWidth: 10,
      headerHeight: 20,
      dragProxyWidth: 300,
      dragProxyHeight: 200,
    },
    labels: {
      close: 'close',
      maximise: 'maximise',
      minimise: 'minimise',
      popout: 'open in new window',
      popin: 'pop in',
      tabDropdown: 'additional tabs',
    },
    content: [{
      type: 'row',
      isClosable: true,
      reorderEnabled: true,
      title: '',
      content: [{
        type: 'column',
        isClosable: true,
        reorderEnabled: true,
        title: '',
        width: 100,
        content: [{
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          height: 50,
          content: [{
            title: 'Tasks',
            type: 'component',
            componentName: 'tasks',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        }, {
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          height: 50,
          content: [{
            title: 'Communications',
            type: 'component',
            componentName: 'communications',
            isClosable: true,
            reorderEnabled: true,
          }],
        }, {
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          height: 50,
          content: [{
            title: 'My Appointments',
            type: 'component',
            componentName: 'appointments',
            isClosable: true,
            reorderEnabled: true,
          }],
        },
        ],
      },
      ],
    },
    ],
    isClosable: true,
    reorderEnabled: true,
    title: '',
    openPopouts: [],
    maximisedItemId: null,
  };

const componentMetadata = [
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasksComponent },
  { name: 'communications', text: 'Communications', factoryMethod: renderCommunicationsComponent },
  // TODO: will replace with Communications and Appointments render component
  { name: 'appointments', text: 'My Appointments', factoryMethod: renderNotFoundComponent },
];

export class PatientPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const patientId = this.props.match.params.id;
    if (patientId) {
      this.props.getPatient(patientId);
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Patient</title>
          <meta name="description" content="Patient page of Omnibus Care Plan application" />
        </Helmet>

        <PatientPageGrid columns={1}>
          <PatientPageCell>
            <h3>Patient Details Placeholder</h3>
          </PatientPageCell>
          <PatientPageCell>
            <GoldenLayout
              containerId="golden-patient"
              containerHeight="200vh"
              componentMetadata={componentMetadata}
              stateMetadata={initialStateMetadata}
            />
          </PatientPageCell>
        </PatientPageGrid>
      </div>
    );
  }
}

PatientPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
    path: PropTypes.string,
    url: PropTypes.string,
  }),
  getPatient: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedPatient: makeSelectSelectedPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPatient: (patientId) => dispatch(getPatient(patientId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(PatientPage);
