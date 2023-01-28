import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
	verbose: true,
	collectCoverage: true,
	bail: true,
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.{js,ts}', '!<rootDir>/node_modules/'],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	testMatch: ['<rootDir>/test/**/**.test.ts'],
};

export default config;
