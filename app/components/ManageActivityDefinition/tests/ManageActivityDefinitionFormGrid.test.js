import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManageActivityDefinitionFormGrid from '../ManageActivityDefinitionFormGrid';

configure({ adapter: new Adapter() });

describe('<ManageActivityDefinitionFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding-left', '0.5vw');
      expect(renderedComponent).toHaveStyleRule('margin', '2vh 1vw');
      expect(renderedComponent).toHaveStyleRule('grid-column-gap', '2vw');
      expect(renderedComponent).toHaveStyleRule('grid-row-gap', '2vh');
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle"    "selectedOrganization"    "version"    "systemName"    "displayName"    "description"    "lastPublishDate"    "effectivePeriodStart"    "effectivePeriodEnd"    "duration"    "frequency"    "status"    "topic"    "kind"    "participantType"    "participantRole"    "relatedArtifactSubtitle"    "addArtifactsButton"    "relatedArtifactsSection"    "buttonGroup"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 768px)';

      // Act
      const renderedComponent = shallow(<ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 1fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle"      "selectedOrganization selectedOrganization"      "version version"      "systemName systemName"      "displayName displayName"      "description description"      "lastPublishDate lastPublishDate"      "effectivePeriodStart effectivePeriodEnd"      "duration frequency"      "status status"      "topic topic"      "kind kind"      "participantType participantRole"      "relatedArtifactSubtitle relatedArtifactSubtitle"      "addArtifactsButton addArtifactsButton"      "relatedArtifactsSection relatedArtifactsSection"      "buttonGroup  ."', { media });
    });

    it('should have styles in min-width: 1200px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 1200px)';

      // Act
      const renderedComponent = shallow(<ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', 'repeat(12, 1fr)', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"      "selectedOrganization selectedOrganization selectedOrganization . . . . . . . . ."      "version version version systemName systemName systemName displayName displayName displayName description description description"      "effectivePeriodStart effectivePeriodStart effectivePeriodStart effectivePeriodEnd effectivePeriodEnd effectivePeriodEnd duration duration duration frequency frequency frequency"      "lastPublishDate lastPublishDate lastPublishDate lastPublishDate lastPublishDate lastPublishDate . . . . . ."      "status status status status topic topic topic topic kind kind kind kind"      "participantType participantType participantType participantRole participantRole participantRole . . . . . ."      "relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle relatedArtifactSubtitle"      "addArtifactsButton addArtifactsButton . . . . . . . . . ."      "relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection"      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."', { media });
    });
  });
});
