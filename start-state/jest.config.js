module.exports = {
    "globals": {
        "ts-jest": {
            "tsConfig": "tsconfig.json",
        }
    },
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "transformIgnorePatterns": ["<rootDir>/node_modules/"],
    "watchPathIgnorePatterns": ["<rootDir>/node_modules/"],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "testMatch": [
        "./**/*.test.ts?(x)"
    ],
    "testPathIgnorePatterns": [
        "/node_modules/"
    ],
    "testEnvironment": "jsdom"
};
