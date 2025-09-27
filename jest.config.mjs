export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/_tests_/**/*.ts',
    '**/*.(test|spec).ts'
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/server.ts'
  ],
  moduleFileExtensions: ['ts', 'js', 'json']
};
