/**
 *
 * PatientsPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import renderPatientsComponent from '../Patients/render';
import renderCareTeamsComponent from '../CareTeams/render';
import renderTasksComponent from '../Tasks/render';
import renderRelatedPersonsComponent from '../RelatedPersons/render';
import GoldenLayout from '../../components/GoldenLayout';
import PatientsPageStyledGrid from './PatientsPageStyledGrid';
import PatientsPageStyledCell from './PatientsPageStyledCell';

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
            title: 'Patients',
            type: 'component',
            componentName: 'patients',
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
            title: 'Tasks',
            type: 'component',
            componentName: 'tasks',
            isClosable: true,
            reorderEnabled: true,
          },
          ],
        },
        ],
      },
      {
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
            title: 'Care Teams',
            type: 'component',
            componentName: 'careTeams',
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
            title: 'Related Persons',
            type: 'component',
            componentName: 'relatedPersons',
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
  { name: 'patients', text: 'Patients', factoryMethod: renderPatientsComponent },
  { name: 'careTeams', text: 'Care Teams', factoryMethod: renderCareTeamsComponent },
  { name: 'tasks', text: 'Tasks', factoryMethod: renderTasksComponent },
  { name: 'relatedPersons', text: 'Related Persons', factoryMethod: renderRelatedPersonsComponent },
];

export class PatientsPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Patients</title>
          <meta name="description" content="Patients page of Omnibus Care Plan application" />
        </Helmet>
        <PatientsPageStyledGrid gap="5px" columns="1">
          <PatientsPageStyledCell>
            <GoldenLayout
              containerId="golden-patients"
              componentMetadata={componentMetadata}
              stateMetadata={initialStateMetadata}
            />
          </PatientsPageStyledCell>
        </PatientsPageStyledGrid>
      </div>
    );
  }
}

PatientsPage.propTypes = {};

export default PatientsPage;
