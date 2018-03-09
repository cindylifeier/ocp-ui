import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManagePractitionerFormGrid from '../ManagePractitionerFormGrid';

configure({ adapter: new Adapter() });

describe('<ManagePractitionerFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManagePractitionerFormGrid>{children}</ManagePractitionerFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManagePractitionerFormGrid>{children}</ManagePractitionerFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManagePractitionerFormGrid>{children}</ManagePractitionerFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManagePractitionerFormGrid>{children}</ManagePractitionerFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding-left', '0.5vw');
      expect(renderedComponent).toHaveStyleRule('margin', '2vh 1vw');
      expect(renderedComponent).toHaveStyleRule('grid-column-gap', '2vw');
      expect(renderedComponent).toHaveStyleRule('grid-row-gap', '2vh');
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle"    "firstName"    "middleName"    "lastName"    "identifierGroup"    "address1"    "address2"    "city"    "state"    "postalCode"    "country"    "contactGroup"    "associateOrganizationSection"    "buttonGroup"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 768px)';

      // Act
      const renderedComponent = shallow(<ManagePractitionerFormGrid>{children}</ManagePractitionerFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 1fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle"      "firstName lastName"      "middleName ."      "identifierGroup identifierGroup"      "address1 ."      "address2 ."      "city state"      "postalCode country"      "contactGroup contactGroup"      "associateOrganizationSection associateOrganizationSection"      "buttonGroup ."', { media });
    });

    it('should have styles in min-width: 1200px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 1200px)';

      // Act
      const renderedComponent = shallow(<ManagePractitionerFormGrid>{children}</ManagePractitionerFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', 'repeat(12, 1fr)', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"      "firstName firstName firstName firstName middleName middleName middleName middleName lastName lastName lastName lastName"      "identifierGroup identifierGroup identifierGroup identifierGroup . . . . . . . ."      "address1 address1 address1 address1 address2 address2 address2 address2 . . . ."      "city city city city state state state postalCode postalCode . . ."      "country country country country . . . . . . . ."      "contactGroup contactGroup contactGroup contactGroup contactGroup . . . . . . ."      "associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection associateOrganizationSection"      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."', { media });
    });
  });
});
