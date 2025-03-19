# Eagle Feature Toggle

A lightweight and flexible feature toggle system for Node.js applications.

## Installation

```bash
npm install eagle-feature
# or
yarn add eagle-feature
```

## Quick Start

```typescript
import { initializeFeatureToggles, isFeatureEnabled } from 'eagle-feature';

// Initialize at application startup
await initializeFeatureToggles({
  environment: process.env.NODE_ENV
});

// Use in your application
if (isFeatureEnabled('newFeature')) {
  // Feature is enabled
}
```

## Configuration

Create environment-specific feature toggle configurations in your project:

```typescript
// src/features/environments/development.ts
import { Toggles } from 'eagle-feature';

const developmentToggles: Toggles = {
  newFeature: true,
  betaFeature: false,
  userSpecificFeature: (request) => {
    return request.user?.role === 'admin';
  }
};

export default developmentToggles;
```

Then initialize the feature toggles with your configuration path:

```typescript
await initializeFeatureToggles({
  environment: process.env.NODE_ENV,
  configPath: './src/features/environments/development'
});
```

## API Reference

### `initializeFeatureToggles(options: FeatureToggleOptions): Promise<void>`

Initializes the feature toggle system with environment-specific configurations.

```typescript
interface FeatureToggleOptions {
  environment: string;
  configPath?: string; // Optional custom path to your configuration
}

// Basic usage
await initializeFeatureToggles({
  environment: 'development'
});

// With custom configuration path
await initializeFeatureToggles({
  environment: 'development',
  configPath: './src/features/environments/development'
});
```

### `isFeatureEnabled(featureName: string, context?: any): boolean`

Checks if a feature is enabled.

```typescript
// Simple boolean toggle
isFeatureEnabled('newFeature');

// Context-aware toggle
isFeatureEnabled('userSpecificFeature', { user: { role: 'admin' } });
```

### `getFeatureToggles(): FeatureToggles`

Returns the feature toggles instance.

```typescript
const toggles = getFeatureToggles();
```

## Feature Toggle Types

### Boolean Toggles
```typescript
{
  simpleFeature: true,
  disabledFeature: false
}
```

### Function Toggles
```typescript
{
  userSpecificFeature: (request) => {
    return request.user?.role === 'admin';
  },
  timeBasedFeature: (request) => {
    return new Date().getHours() > 12;
  }
}
```

## Error Handling

The system will throw errors in the following cases:
- When trying to use feature toggles before initialization
- When there's an error loading the environment configuration
- When a feature toggle function throws an error (returns false by default)

## Best Practices

1. Initialize feature toggles at application startup
2. Keep your feature toggle configurations in your project's source code
3. Use environment-specific configurations
4. Keep feature toggle names descriptive and consistent
5. Use TypeScript for better type safety
6. Handle errors appropriately in your application

## Example Usage with Express

```typescript
import express from 'express';
import { initializeFeatureToggles, isFeatureEnabled } from 'eagle-feature';

const app = express();

// Initialize feature toggles
await initializeFeatureToggles({
  environment: process.env.NODE_ENV,
  configPath: './src/features/environments/development'
});

app.get('/api/feature', (req, res) => {
  if (isFeatureEnabled('newFeature', req)) {
    res.json({ message: 'New feature is enabled' });
  } else {
    res.json({ message: 'Feature is disabled' });
  }
});
```

## License

MIT
