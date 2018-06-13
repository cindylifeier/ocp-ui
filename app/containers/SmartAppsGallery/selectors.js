import { createSelector } from 'reselect';

/**
 * Direct selector to the smartAppsGallery state domain
 */
const selectSmartAppsGalleryDomain = (state) => state.get('smartAppsGallery');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SmartAppsGallery
 */

const makeSelectSmartAppsGallery = () => createSelector(
  selectSmartAppsGalleryDomain,
  (substate) => substate.toJS()
);

export default makeSelectSmartAppsGallery;
export {
  selectSmartAppsGalleryDomain,
};
