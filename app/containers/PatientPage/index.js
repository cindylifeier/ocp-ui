/**
 *
 * PatientPage
 *
 */

import GoldenLayout from 'components/GoldenLayout';
import PatientDetails from 'components/PatientDetails';
import { getPatient } from 'containers/App/actions';
import renderAppointmentsComponent from 'containers/Appointments/render';
import { getTasks } from 'containers/Tasks/actions';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { mapToPatientName } from 'utils/PatientUtils';

import makeSelectSelectedPatient from '../App/sharedDataSelectors';
import renderNotFoundComponent from '../NotFoundPage/render';
import renderTasksComponent from '../Tasks/render';
import PatientPageCell from './PatientPageCell';
import PatientPageGrid from './PatientPageGrid';

export const initialStateMetadata =
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
            title: 'Communication',
            type: 'component',
            componentName: 'communication',
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

export const componentMetadata = [
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasksComponent },
  // TODO: will replace with Communication and Appointments render component
  { name: 'communication', text: 'Communication', factoryMethod: renderNotFoundComponent },
  { name: 'appointments', text: 'My Appointments', factoryMethod: renderAppointmentsComponent },
];

export class PatientPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    const patientId = this.props.match.params.id;
    if (patientId) {
      this.props.getPatient(patientId);
      const searchType = 'patientId';
      const query = { searchValue: patientId, searchType };
      const selectedPatientName = mapToPatientName(this.props.selectedPatient);
      // TODO: Resolve delay issue
      // To delay to call dispatch getTasks in order to ensure goldenLayout instance get mount
      setTimeout(() => this.props.getTasks(query, selectedPatientName), 500);
    }
  }

  render() {
    const { selectedPatient } = this.props;
    const patientDetailsProps = { selectedPatient };
    return (
      <div>
        <Helmet>
          <title>Patient</title>
          <meta name="description" content="Patient page of Omnibus Care Plan application" />
        </Helmet>

        <PatientPageGrid columns={1}>
          <PatientPageCell>
            <PatientDetails {...patientDetailsProps} />
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
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  getPatient: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  selectedPatient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
};

const mapStateToProps = createStructuredSelector({
  selectedPatient: makeSelectSelectedPatient(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPatient: (patientId) => dispatch(getPatient(patientId)),
    getTasks: (query, patientName) => dispatch(getTasks(query, patientName)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(PatientPage);
