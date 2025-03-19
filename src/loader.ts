import FeatureToggles from './index';

let featureToggles: FeatureToggles | null = null;

export interface FeatureToggleOptions {
  environment: string;
  configPath?: string;
}

export async function initializeFeatureToggles(options: FeatureToggleOptions): Promise<void> {
  try {
    const env = options.environment.toLowerCase();
    const configPath = options.configPath || `./environments/${env}`;
    const featureModule = await import(configPath);
    featureToggles = new FeatureToggles();
    featureToggles.load(featureModule.default);
  } catch (error) {
    console.error('Error loading feature toggles:', error);
    throw new Error(error instanceof Error ? error.message : 'Error loading feature toggles');
  }
}

export function isFeatureEnabled(featureName: string, context?: any): boolean {
  if (!featureToggles) {
    throw new Error('Feature toggles not initialized. Call initializeFeatureToggles first.');
  }
  return featureToggles.isFeatureEnabled(featureName, context);
}

export function getFeatureToggles(): FeatureToggles {
  if (!featureToggles) {
    throw new Error('Feature toggles not initialized. Call initializeFeatureToggles first.');
  }
  return featureToggles;
} 