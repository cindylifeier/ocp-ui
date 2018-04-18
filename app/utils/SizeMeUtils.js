
import sizeMe from 'react-sizeme';

// Create config for SizeMe
const config = {
  monitorWidth: true,
  monitorHeight: false,
  refreshRate: 250,
};

// Call SizeMe with the config to get back the SizeMe HOC.
const sizeMeHOC = sizeMe(config);

export default sizeMeHOC;
