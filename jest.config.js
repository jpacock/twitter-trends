module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  roots: ['src'],
  testRegex: '/__tests__/.*\\.spec\\.(ts|js)$',
  testEnvironmentOptions: {
    url: 'https://localhost:8080',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['\\.d\\.ts$', 'index\\.[tj]s$', '/types/', 'src/data-access/redis/redisClient\\.ts', 'src/util/logger\\.ts'],
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  coverageThreshold: {
    // global: {
    //   branches: 100,
    //   functions: 100,
    //   lines: 100,
    //   statements: 100,
    // },
  },
  clearMocks: true,
};
