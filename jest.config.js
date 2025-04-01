/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
      url: "https://noaa.js/"
  },
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  verbose: true
};