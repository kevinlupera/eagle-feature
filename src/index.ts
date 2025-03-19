export type ToggleFunction = (request: any, response: any) => boolean;
export type Toggles = { [featureName: string]: boolean | ToggleFunction };

class FeatureToggles {
  private _toggles: Toggles;

  constructor() {
    this._toggles = {};
  }

  load(toggles: Toggles): void {
    this._toggles = toggles;
  }

  get(): Toggles {
    return this._toggles;
  }

  isFeatureEnabled(
    featureName: string,
    request?: any,
    response?: any
  ): boolean {
    let toggle = this._toggles[featureName];
    if (typeof toggle === "function") {
      try {
        toggle = (toggle as ToggleFunction)(request, response);
      } catch (error) {
        return false;
      }
    }
    return toggle === true;
  }

  middleware(request: any, response: any, next: () => void): void {
    response.locals.isFeatureEnabled = (featureName: string) => {
      return this.isFeatureEnabled(featureName, request, response);
    };
    next();
  }
}

export { FeatureToggles as default };

// Export types and functions from loader
export { 
  FeatureToggleOptions,
  initializeFeatureToggles,
  isFeatureEnabled,
  getFeatureToggles
} from './loader';
