// jest.setup.js
import '@testing-library/jest-dom';

globalThis.importMetaEnv = {
    VITE_API_URL: 'http://localhost:3000',  // Example mock of environment variables
  };
  