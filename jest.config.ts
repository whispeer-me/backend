import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["tests/**/*.test.ts"],
  moduleNameMapper: {
    "^@interfaces/(.*)$": "<rootDir>/src/interfaces/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@db/(.*)$": "<rootDir>/src/db/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@jobs/(.*)$": "<rootDir>/src/jobs/$1",
  },
};

export default config;
