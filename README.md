# EagleFeature

EagleFeature es una biblioteca para gestionar las funcionalidades de tu aplicación.

## Installation

To install EagleFeature, run the following command in your terminal:

```bash
npm install eagle-feature
```

## Usage

First, import EagleFeature into your file:

```typescript
import FeatureToggles, { ToggleFunction } from "eagle-feature";
```

Then, create a new instance of EagleFeature and load your feature toggles:

```typescript
const featureToggles = new FeatureToggles();

const toggles = {
  feature1: true,
  feature2: false,
  feature3: ((req: any, res: any) => true) as ToggleFunction,
  feature4: ((req: any, res: any) => false) as ToggleFunction,
};

featureToggles.load(toggles);
```

Now you can check if a feature is enabled using isFeatureEnabled:

```typescript
if (featureToggles.isFeatureEnabled("feature1")) {
  console.log("Feature 1 is enabled");
} else {
  console.log("Feature 1 is disabled");
}
```

You can also use middleware to add an isFeatureEnabled function to response.locals in an Express middleware:

```typescript
app.use(featureToggles.middleware);
```

Now you can use isFeatureEnabled in your views:

```typescript
if isFeatureEnabled('feature1')
  // p La característica 1 está habilitada
```

## Tests

To run the tests, use the following command:

```bash
npm test
```

## Contribute

Contributions are welcome. Please, open an issue or a pull request.

## License

MIT
