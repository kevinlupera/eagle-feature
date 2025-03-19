import { Toggles } from '../index';

const developmentToggles: Toggles = {
  newFeature: true,
  betaFeature: false,
  userSpecificFeature: (request) => {
    return request.user?.role === 'admin';
  }
};

export default developmentToggles; 