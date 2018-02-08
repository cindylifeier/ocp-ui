import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import { CareTeams } from '../index';

configure({ adapter: new Adapter() });

describe('<CareTeams />', () => {
  describe('Snapshots testing', () => {
    it('should match snapshot', () => {
      // Arrange
      const initializeLookups = jest.fn();
      const getCareTeams = jest.fn();
      const query = { a1: 'a1', a2: 'a2' };
      const patientName = 'patientName';
      const statusList = ['active', 'inactive'];
      const loading = false;
      const elements = [{
        id: '1',
        name: 'a',
        subjectId: 'subjectId1',
        subjectFirstName: 'subjectFirstName1',
        subjectLastName: 'subjectLastName1',
      }, {
        id: '2',
        name: 'b',
        subjectId: 'subjectId2',
        subjectFirstName: 'subjectFirstName2',
        subjectLastName: 'subjectLastName2',
      }];
      const currentPage = 10;
      const totalNumberOfPages = 100;
      const data = {
        elements,
        currentPage,
        totalNumberOfPages,
      };
      const careTeams = {
        loading,
        data,
        query,
        patientName,
        statusList,
      };
      const careTeamStatuses = [{
        code: 'active',
        display: 'Active',
      }, {
        code: 'inactive',
        display: 'Inactive',
      }, {
        code: 'suspended',
        display: 'suspended',
      }];
      const props = {
        getCareTeams,
        initializeLookups,
        careTeams,
        careTeamStatuses,
      };

      // Act
      const renderedComponent = shallow(<CareTeams {...props} />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  it('should contain patient name', () => {
    // Arrange
    const initializeLookups = jest.fn();
    const getCareTeams = jest.fn();
    const query = { a1: 'a1', a2: 'a2' };
    const patientName = 'patientName';
    const statusList = ['active', 'inactive'];
    const loading = false;
    const elements = [{
      id: '1',
      name: 'a',
      subjectId: 'subjectId1',
      subjectFirstName: 'subjectFirstName1',
      subjectLastName: 'subjectLastName1',
    }, {
      id: '2',
      name: 'b',
      subjectId: 'subjectId2',
      subjectFirstName: 'subjectFirstName2',
      subjectLastName: 'subjectLastName2',
    }];
    const currentPage = 10;
    const totalNumberOfPages = 100;
    const data = {
      elements,
      currentPage,
      totalNumberOfPages,
    };
    const careTeams = {
      loading,
      data,
      query,
      patientName,
      statusList,
    };
    const careTeamStatuses = [{
      code: 'active',
      display: 'Active',
    }, {
      code: 'inactive',
      display: 'Inactive',
    }, {
      code: 'suspended',
      display: 'suspended',
    }];
    const props = {
      getCareTeams,
      initializeLookups,
      careTeams,
      careTeamStatuses,
    };

    // Act
    const renderedComponent = shallow(<CareTeams {...props} />);

    // Assert
    expect(renderedComponent.contains(patientName)).toBe(true);
  });

  it('should call initializeLookups', () => {
    // Arrange
    const initializeLookups = jest.fn();
    const getCareTeams = jest.fn();
    const query = { a1: 'a1', a2: 'a2' };
    const patientName = 'patientName';
    const statusList = ['active', 'inactive'];
    const loading = false;
    const elements = [{
      id: '1',
      name: 'a',
      subjectId: 'subjectId1',
      subjectFirstName: 'subjectFirstName1',
      subjectLastName: 'subjectLastName1',
    }, {
      id: '2',
      name: 'b',
      subjectId: 'subjectId2',
      subjectFirstName: 'subjectFirstName2',
      subjectLastName: 'subjectLastName2',
    }];
    const currentPage = 10;
    const totalNumberOfPages = 100;
    const data = {
      elements,
      currentPage,
      totalNumberOfPages,
    };
    const careTeams = {
      loading,
      data,
      query,
      patientName,
      statusList,
    };
    const careTeamStatuses = [{
      code: 'active',
      display: 'Active',
    }, {
      code: 'inactive',
      display: 'Inactive',
    }, {
      code: 'suspended',
      display: 'suspended',
    }];
    const props = {
      getCareTeams,
      initializeLookups,
      careTeams,
      careTeamStatuses,
    };

    // Act
    shallow(<CareTeams {...props} />);

    // Assert
    expect(initializeLookups).toHaveBeenCalledTimes(1);
  });
});
