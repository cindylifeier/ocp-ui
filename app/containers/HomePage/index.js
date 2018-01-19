/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
// import { FormattedMessage } from 'react-intl';
import styles from './styles.css';
import Header from '../../components/Header/index';
import SideBar from '../../components/SideBar/index';
import GoldenLayout from '../../components/GoldenLayout/Loadable';
import renderSampleComponent from '../../components/SampleComponent/render';
import renderOrganizations from '../Organizations/render';
import renderPractitioners from '../Practitioners/render';
import renderLocationCreateEditComponent from '../../containers/LocationCreateEdit/render';
import renderPatientCreateEditComponent from '../../containers/PatientCreateEdit/render';
// import renderLocationsComponent from '../../containers/Locations/render';
// import renderPatientsComponent from '../Patients/render';

// import messages from './messages';

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
        width: 50,
        content: [{
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          height: 50,
          content: [{
            title: 'Organizations',
            type: 'component',
            componentName: 'organizations',
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
          width: 50,
          height: 50,
          content: [{
            title: 'Practitioners',
            type: 'component',
            componentName: 'practitioners',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        },
        ],
      }, {
        type: 'column',
        isClosable: true,
        reorderEnabled: true,
        title: '',
        width: 50,
        content: [{
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          height: 50,
          content: [{
            title: 'Location Create Edit',
            type: 'component',
            componentName: 'locationCreateEdit',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        }, {
          type: 'stack',
          width: 50,
          height: 50,
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 0,
          content: [{
            title: 'Patient Create Edit',
            type: 'component',
            componentName: 'patientCreateEdit',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
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
  { name: 'sample', text: 'Sample', factoryMethod: renderSampleComponent },
  { name: 'organizations', text: 'Organizations', factoryMethod: renderOrganizations },
  { name: 'practitioners', text: 'Practitioners', factoryMethod: renderPractitioners },
  { name: 'locationCreateEdit', text: 'LocationCreateEdit', factoryMethod: renderLocationCreateEditComponent },
  { name: 'patientCreateEdit', text: 'PatientCreateEdit', factoryMethod: renderPatientCreateEditComponent },
  // { name: 'locations', text: 'Locations', factoryMethod: renderLocationsComponent },
  // { name: 'patients', text: 'Patients', factoryMethod: renderPatientsComponent },
];

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.gridContainer}>
        <div className={`${styles.gridItem} ${styles.header}`}>
          <Header />
        </div>
        <div className={styles.content}>
          <GoldenLayout
            containerId="golden-home"
            componentMetadata={componentMetadata}
            stateMetadata={initialStateMetadata}
          />
        </div>
        <div className={`${styles.gridItem} ${styles.panel}`}>
          <SideBar />
        </div>
      </div>
    );
  }
}
