import Section from 'components/Section';

const SliderContentSection = Section.extend`
  margin: 10px;
  border-radius: 5px;

  &:hover {
    border: 1px solid rgba(0, 165, 153, 1);
    border-radius: 5px;
  }
`;

SliderContentSection.propTypes = {};

export default SliderContentSection;
