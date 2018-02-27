exports.config = {
    "output": "../output",
    "helpers": {
        "WebDriverIO": {
            "smartWait": 10000,
            "restart": false,
            "url": "http://localhost:8001",
            "browser": "Chrome",
            "desiredCapabilities": {
                "chromeOptions": {
                    "args": ["--window-size=1400,1100"]
                }
            }
        },
        "GeneratedHelper": {
            "require": "../PositionHelper.js"
        }
    },
    "include": {
        "I": "./steps_file.js"
    },
    "tests": "../*.test.js"
}


