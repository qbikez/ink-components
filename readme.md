# Debugging TUIR

1. Edit [tuir.ts](./src/tuir.ts) and reexport from your local tuir repo, i.e.:

```typescript
export * from "../../../github/tuir/src/index.js";
```

2. remove `node_modules/react` from `tuir` repo, and put instead:

```javascript
// node_modules/react/index.js

export * from "../../../../hmdev/ink-components/node_modules/react";
export { default } from "../../../../hmdev/ink-components/node_modules/react";
```

Along with a package.json specifying `"type": "module"`.

# Common issues

## ERR_REQUIRE_CYCLE_MODULE

Make sure your project has `"type": "module"` set in `package.json`.