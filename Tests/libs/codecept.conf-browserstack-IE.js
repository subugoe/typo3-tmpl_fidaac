exports.config = {
    "output": "../output",
    "helpers": {
        "WebDriverIO": {
            "smartWait": 20000,
            "restart": false,
            "url": "http://localhost:8001",
            "user": process.env.BROWSERSTACK_USERNAME,
            "key": process.env.BROWSERSTACK_ACCESS_KEY,
            "url": "http://localhost:8001",
            "browser": "IE",
            "desiredCapabilities": {
                "browserstack.local": "true",
                "browserstack.debug": "true",
                "os": "Windows",
                "os_version": "10",
                "browser_version": "11.0",
                "resolution": "1680x1050"
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


