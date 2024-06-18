import FeatureToggles, { ToggleFunction, Toggles } from "../src/index";

describe("FeatureToggles", () => {
  let featureToggles: FeatureToggles;
  let toggles: Toggles;

  beforeEach(() => {
    featureToggles = new FeatureToggles();
    toggles = {
      feature1: true,
      feature2: false,
      feature3: ((req: any, res: any) => true) as ToggleFunction,
      feature4: ((req: any, res: any) => false) as ToggleFunction,
    };
    featureToggles.load(toggles);
  });

  test("isFeatureEnabled returns correct boolean value", () => {
    expect(featureToggles.isFeatureEnabled("feature1")).toBe(true);
    expect(featureToggles.isFeatureEnabled("feature2")).toBe(false);
  });

  test("isFeatureEnabled executes toggle function correctly", () => {
    expect(featureToggles.isFeatureEnabled("feature3")).toBe(true);
    expect(featureToggles.isFeatureEnabled("feature4")).toBe(false);
  });

  test("isFeatureEnabled returns false for non-existing feature", () => {
    expect(featureToggles.isFeatureEnabled("nonExistingFeature")).toBe(false);
  });

  test("middleware sets isFeatureEnabled function on response.locals", () => {
    const request = {};
    const response: {
      locals: { isFeatureEnabled: (feature: string) => boolean };
    } = { locals: { isFeatureEnabled: (feature: string) => true } };
    const next = jest.fn();

    featureToggles.middleware(request, response, next);

    expect(typeof response.locals.isFeatureEnabled).toBe("function");
    expect(response.locals.isFeatureEnabled("feature1")).toBe(true);
    expect(next).toBeCalled();
  });
});
