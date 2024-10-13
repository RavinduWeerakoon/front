
export default {
    testEnvironment: "jest-environment-jsdom",
    transform: {
      "^.+\\.jsx?$": "babel-jest", '\\.(svg|jpg|jpeg|png|gif)$': 'jest-transform-stub',// Transforms JSX and JS files using Babel
    },
    moduleNameMapper: {
      "\\.(css|scss)$": "identity-obj-proxy",  // Mock CSS imports
    },
    setupFilesAfterEnv: ["./jest.setup.js"],  // Extend Jest with DOM matchers
    moduleFileExtensions: ["js", "jsx"],
    transformIgnorePatterns: [
      "<rootDir>/assets/",
      "\\.(svg|jpg|jpeg|png|gif)$" // Ignore these file types
  ],
  };
  