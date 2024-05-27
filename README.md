# eslint-plugin-jsx-no-semi

An ESLint plugin to prevent the insertion of semicolons directly within JSX elements, eliminating human errors in JSX markup. This plugin ensures cleaner and more consistent JSX code by disallowing unnecessary semicolons within JSX elements.

## Features

- **No JSX Semicolons Rule**: Prevents the use of semicolons directly inside JSX elements.
- **Configurable**: Easily integrate with your existing ESLint configuration.

## Installation

```bash
npm install eslint-plugin-jsx-no-semi --save-dev
```

## Usage

Add `jsx-no-semi` to the plugins section and `jsx-no-semi/no-semicolons` to the rules section of your ESLint configuration.

.eslintrc.json

```json
{
  "plugins": ["jsx-no-semi"],
  "rules": {
    "jsx-no-semi/no-semicolons": "error"
  }
}
```

Example:

```jsx
// Incorrect
const App = () => {
  return (
    <div>
      <h1>Hello World</h1>;
    </div>
  );
};

// Correct
const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};
```

## License

MIT
```
