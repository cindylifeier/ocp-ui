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
  statusCode: 'active',
  statusDisplay: 'Active',
  reasonCodes: [{
    code: '109006',
    display: 'Anxiety disorder of childhood OR adolescence',
  }, {
    code: '122003',
    display: 'Choroidal hemorrhage',
  },
  ],
  categoryCode: 'encounter',
  categoryDisplay: 'Encounter',
  subjectId: '11111',
  subjectFirstName: 'Adam',
  subjectLastName: 'Smith',
  startDate: '01/01/2017',
  endDate: '02/01/2017',
  participants: [{
    roleCode: '112247003',
    roleDisplay: 'Medical doctor',
    memberId: '700551',
    memberFirstName: 'Gregory', // if not organization
    memberLastName: 'House', // if not organization
    memberType: 'practitioner', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
    onBehalfOfId: '143191',
    onBehalfOfName: 'Great Cross Hospital',

  }, {
    roleCode: '394765007',
    roleDisplay: 'Prison practice',
    memberId: '650858',
    memberName: 'Great Cross Hospital', // if organization
    memberType: 'organization', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
    onBehalfOfId: '143191',
    onBehalfOfName: 'Great Cross Hospital',
  },
  ],
}, {
  id: '222222',
  name: 'My Care Team Two',
  statusCode: 'suspended',
  statusDisplay: 'Suspended',
  reasonCodes: [{
    code: '134006',
    display: 'Decreased hair growth',
  },
  ],
  categoryCode: 'condition',
  categoryDisplay: 'Condition',
  subjectId: '11111',
  subjectFirstName: 'Adam',
  subjectLastName: 'Smith',
  startDate: '04/01/2017',
  endDate: '08/01/2017',
  participants: [{
    roleCode: '113157001',
    roleDisplay: 'Grand-mother',
    memberId: '121212',
    memberFirstName: 'Granny', // if not organization
    memberLastName: 'Smith', // if not organization
    memberType: 'relatedPerson', // can be one of `patient`, `practitioner`, `organization` or `relatedPerson`
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
    expect(renderedComponent.contains('Gregory House / Medical doctor')).toBe(true);
    expect(renderedComponent.contains('Great Cross Hospital / Prison practice')).toBe(true);
    expect(renderedComponent.contains('Granny Smith / Grand-mother')).toBe(true);
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
    expect(renderedComponent.contains('Condition')).toBe(true);
  });

  it('should contain statuses', () => {
    // Act
    const renderedComponent = shallow(<CareTeamTable elements={mockElements} />);

    // Assert
    expect(renderedComponent.contains('Active')).toBe(true);
    expect(renderedComponent.contains('Suspended')).toBe(true);
  });

  it('should contain ids', () => {
    // Act
    const renderedComponent = shallow(<CareTeamTable elements={mockElements} />);

    // Assert
    expect(renderedComponent.contains('111111')).toBe(true);
    expect(renderedComponent.contains('222222')).toBe(true);
  });
});
