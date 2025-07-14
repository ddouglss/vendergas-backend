module.exports = {
    preset: '@shelf/jest-mongodb',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.js'],
    globalSetup: '<rootDir>/tests/setup.js',
    testTimeout: 30000
};
