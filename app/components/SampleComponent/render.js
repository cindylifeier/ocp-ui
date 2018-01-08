import ReactDOM from 'react-dom';
import withContext from '../../utils/withContext';
import SampleComponent from './index';

export default function renderSampleComponent(location) {
  ReactDOM.render(
    withContext(SampleComponent),
    document.getElementById(location)
  );
}
