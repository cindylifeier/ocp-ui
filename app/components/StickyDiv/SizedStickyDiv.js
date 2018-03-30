import PropTypes from 'prop-types';
import sizeMe from 'react-sizeme';
import StickyDiv from './index';

// Create the config for SizeMe
const config = {
  monitorWidth: false,
  monitorHeight: true,
  refreshRate: 250,
};

const sizeMeHOC = sizeMe(config);

const SizedStickyDiv = sizeMeHOC(StickyDiv);

SizedStickyDiv.propTypes = {
  onSize: PropTypes.func,
  ...StickyDiv.propTypes,
};

export default SizedStickyDiv;
