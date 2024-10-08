module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)?$': 'babel-jest',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
};
