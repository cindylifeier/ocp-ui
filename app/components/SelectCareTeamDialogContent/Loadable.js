/**
 *
 * Asynchronously loads the component for SelectCareTeamDialogContent
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
