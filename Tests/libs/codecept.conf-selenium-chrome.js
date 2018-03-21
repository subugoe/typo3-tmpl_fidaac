exports.config = {
    "output": "../output",
    "helpers": {
        "WebDriverIO": {
            "smartWait": 10000,
            "restart": false,
            "url": "http://localhost:8001",
            "browser": "Chrome"
        },
        "GeneratedHelper": {
            "require": "../CustomHelper.js"
        }
    },
    "include": {
        "I": "./steps_file.js"
    },
    "tests": "../*.test.js"
}


