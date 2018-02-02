// import React from 'react';
// import { shallow } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

import CareTeamTable from '../index';
import messages from '../messages';
import TableHeaderColumn from '../../TableHeaderColumn';

const mockElements = [{
  id: '111111',
  name: 'My Care Team One',
  // identifiers : [],
  status: {
    code: 'active',
    system: 'http://hl7.org/fhir/care-team-status',
    definition: 'The care team is currently participating in the coordination and delivery of care.',
    display: 'Active',
  },
  categories: [{
    code: 'encounter',
    display: 'Encounter',
    definition: 'This type of team focuses on one specific encounter. The encounter is determined by the context of use. For example, during an inpatient encounter, the nutrition support care team',
  }, {
    code: 'episode',
    display: 'Episode',
    definition: 'This type of team focuses on one specific episode of care with a defined time period or self-limiting process (e.g. 10 visits). The episode of care is determined by the context of use. For example, a maternity care team over 9 months.',
  },
  ],
  subject: {
    id: '11111',
    firstName: 'Patient',
    lastName: 'One',
  }, // patient
  participants: [{
    role: {
      code: '112247003',
      display: 'Medical doctor',
      definition: null,
    },
    // only one of `patient`, `practitioner`, `organization` or `relatedPerson` can exist at a time
    member: {
      type: 'practitioner', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
      id: '700551',
      firstName: 'Tom2', // if not organization
      lastName: 'provider', // if not organization
      // name, // if organization
    },
    onBehalfOf: {
      id: '143191',
      name: 'Great Cross Hospital',
    },
  }, {
    role: {
      code: '394745000',
      display: 'General practice (organisation)',
      definition: null,
    },
    // only one of `patient`, `practitioner`, `organization` or `relatedPerson` can exist at a time
    member: {
      type: 'organization', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
      id: '650858',
      // firstName: 'Tom2', // if not organization
      // lastName: 'provider', // if not organization
      name: 'Great Cross Hospital', // if organization
    },
    onBehalfOf: {
      id: '143191',
      name: 'Great Cross Hospital',
    },
  },
  ],
}, {
  id: '222222',
  name: 'My Care Team Two',
  // identifiers : [],
  status: {
    code: 'active',
    system: 'http://hl7.org/fhir/care-team-status',
    definition: 'The care team is currently participating in the coordination and delivery of care.',
    display: 'Active',
  },
  categories: [{
    code: 'condition',
    display: 'Condition',
    definition: 'This type of team focuses on one specific condition. The condition is determined by the context of use. For example, a disease management team focused on one condition (e.g. diabetes).',
  },
  ],
  subject: {
    id: '11111',
    firstName: 'Patient',
    lastName: 'One',
  }, // patient
  participants: [{
    role: {
      code: '113157001',
      display: 'Grand-mother',
      definition: null,
    },
    // only one of `patient`, `practitioner`, `organization` or `relatedPerson` can exist at a time
    member: {
      type: 'relatedPerson', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
      id: '121212',
      firstName: 'Her', // if not organization
      lastName: 'Grandmother', // if not organization
      // name, // if organization
    },
  },
  ],
},
];

describe('<CareTeamTable />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(<CareTeamTable elements={mockElements} />);

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should contain table header columns', () => {
    // Act
    const renderedComponent = shallow(<CareTeamTable elements={mockElements} />);

    // Assert
    expect(renderedComponent.contains(
      <TableHeaderColumn><FormattedMessage {...messages.columnHeaderId} /></TableHeaderColumn>)).toBe(true);
    expect(renderedComponent.contains(
      <TableHeaderColumn><FormattedMessage {...messages.columnHeaderName} /></TableHeaderColumn>)).toBe(true);
    expect(renderedComponent.contains(
      <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>)).toBe(true);
    expect(renderedComponent.contains(
      <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategories} /></TableHeaderColumn>)).toBe(true);
    expect(renderedComponent.contains(
      <TableHeaderColumn><FormattedMessage {...messages.columnHeaderParticipantsAndRoles} /></TableHeaderColumn>)).toBe(true);
  });

  it('should contain participants', () => {
    // Act
    const renderedComponent = shallow(<CareTeamTable elements={mockElements} />);

    // Assert
    expect(renderedComponent.contains('Tom2 provider / Medical doctor')).toBe(true);
    expect(renderedComponent.contains('Great Cross Hospital / General practice (organisation)')).toBe(true);
    expect(renderedComponent.contains('Her Grandmother / Grand-mother')).toBe(true);
  });

  it('should contain care team names', () => {
    // Act
    const renderedComponent = shallow(<CareTeamTable elements={mockElements} />);

    // Assert
    expect(renderedComponent.contains('My Care Team One')).toBe(true);
    expect(renderedComponent.contains('My Care Team Two')).toBe(true);
  });

  it('should contain categories', () => {
    // Act
    const renderedComponent = shallow(<CareTeamTable elements={mockElements} />);

    // Assert
    expect(renderedComponent.contains('Encounter')).toBe(true);
    expect(renderedComponent.contains('Episode')).toBe(true);
    expect(renderedComponent.contains('Condition')).toBe(true);
  });

  it('should contain statuses', () => {
    // Act
    const renderedComponent = shallow(<CareTeamTable elements={mockElements} />);

    // Assert
    expect(renderedComponent.contains('Active')).toBe(true);
  });

  it('should contain ids', () => {
    // Act
    const renderedComponent = shallow(<CareTeamTable elements={mockElements} />);

    // Assert
    expect(renderedComponent.contains('111111')).toBe(true);
    expect(renderedComponent.contains('222222')).toBe(true);
  });
});
